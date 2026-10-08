import React, { MutableRefObject, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { PerfumeModel } from './PerfumeModel';
import type { PointerMotion } from './PerfumeCanvas';

interface CameraRigProps {
  mouse: MutableRefObject<PointerMotion>;
  compact: boolean;
  modelUrl: string;
  onModelReady: () => void;
}

const SECTION_IDS = ['hero', 'composition', 'object', 'final'];
const ROTATIONS = [0, 0.45, 0.82, Math.PI * 2];
const MAX_IDLE_YAW = THREE.MathUtils.degToRad(2);
const MAX_HOVER_YAW = THREE.MathUtils.degToRad(5);
const MAX_HOVER_PITCH = THREE.MathUtils.degToRad(1.5);
const SCROLL_DAMPING = 1.55;
const ROTATION_DAMPING = 2.8;

interface MotionProfile {
  x: number[];
  y: number[];
  scale: number[];
}

const MOBILE_PROFILE: MotionProfile = {
  x: [0, -0.02, 0, 0],
  y: [0.16, 0.07, 0.08, -0.16],
  scale: [0.44, 0.38, 0.44, 0.5],
};

const TABLET_PROFILE: MotionProfile = {
  x: [0, -0.03, 0, 0],
  y: [0.16, 0.07, 0.02, -0.14],
  scale: [0.48, 0.42, 0.58, 0.54],
};

const DESKTOP_PROFILE: MotionProfile = {
  x: [0.23, -0.07, 0.03, 0],
  y: [0, -0.01, -0.02, -0.04],
  scale: [0.82, 0.72, 0.78, 0.82],
};

const getMotionProfile = (width: number) => {
  if (width < 768) return MOBILE_PROFILE;
  if (width < 1024) return TABLET_PROFILE;
  return DESKTOP_PROFILE;
};

const sampleStage = (values: number[], stage: number) => {
  const from = Math.min(Math.floor(stage), values.length - 1);
  const to = Math.min(from + 1, values.length - 1);
  return THREE.MathUtils.lerp(values[from], values[to], stage - from);
};

export const CameraRig: React.FC<CameraRigProps> = ({ mouse, compact, modelUrl, onModelReady }) => {
  const { camera, size, viewport } = useThree();
  const modelRef = useRef<THREE.Group>(null);
  const sectionTops = useRef<number[]>([]);
  const renderedFrames = useRef(0);
  const readySignalled = useRef(false);
  const readyFrame = useRef<number>();
  const profile = getMotionProfile(size.width);

  useEffect(() => {
    renderedFrames.current = 0;
    readySignalled.current = false;
    return () => {
      if (readyFrame.current !== undefined) cancelAnimationFrame(readyFrame.current);
    };
  }, [modelUrl]);

  useEffect(() => {
    const measureSections = () => {
      sectionTops.current = SECTION_IDS.map((id) => document.getElementById(id)?.offsetTop ?? 0);
    };

    measureSections();
    window.addEventListener('load', measureSections);
    window.addEventListener('resize', measureSections);

    camera.position.set(0, 0, 5.2);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    return () => {
      window.removeEventListener('load', measureSections);
      window.removeEventListener('resize', measureSections);
    };
  }, [camera]);

  useFrame(({ clock }, delta) => {
    const model = modelRef.current;
    const tops = sectionTops.current;
    if (!model) return;

    if (!readySignalled.current) {
      renderedFrames.current += 1;
      if (renderedFrames.current >= 3) {
        readySignalled.current = true;
        readyFrame.current = requestAnimationFrame(() => {
          readyFrame.current = undefined;
          onModelReady();
        });
      }
    }

    if (tops.length !== SECTION_IDS.length) return;

    const scrollY = window.scrollY;
    let stage = 0;

    for (let index = 0; index < tops.length - 1; index += 1) {
      const current = tops[index];
      const next = tops[index + 1];
      if (scrollY >= current && scrollY < next) {
        stage = index + THREE.MathUtils.clamp((scrollY - current) / Math.max(next - current, 1), 0, 1);
        break;
      }
      if (scrollY >= tops[tops.length - 1]) stage = tops.length - 1;
    }

    const heroInteraction = 1 - THREE.MathUtils.smoothstep(stage, 0.18, 0.95);
    const objectInteraction = THREE.MathUtils.smoothstep(stage, 1.88, 2.12);
    const interactionWeight = Math.max(heroInteraction, objectInteraction);
    const idleYaw = mouse.current.coarse && !mouse.current.dragging && interactionWeight > 0
      ? Math.sin(clock.elapsedTime * 0.13) * MAX_IDLE_YAW
      : 0;
    const baseYaw = sampleStage(ROTATIONS, stage);
    const hoverWeight = !mouse.current.coarse && !mouse.current.dragging
      ? mouse.current.active * interactionWeight
      : 0;
    const hoverYaw = mouse.current.x * MAX_HOVER_YAW * hoverWeight;
    const hoverPitch = -mouse.current.y * MAX_HOVER_PITCH * hoverWeight;
    const targetYaw = baseYaw + (mouse.current.yaw + hoverYaw + idleYaw) * interactionWeight;
    const targetPitch = (mouse.current.pitch + hoverPitch) * interactionWeight;

    const objectProgress = THREE.MathUtils.clamp(stage - 2, 0, 1);
    const sculpturalLift = Math.sin(objectProgress * Math.PI) * viewport.height * 0.04;
    const sculpturalDepth = Math.sin(objectProgress * Math.PI * 2) * 0.08;
    const targetX = sampleStage(profile.x, stage) * viewport.width;
    const targetY = sampleStage(profile.y, stage) * viewport.height + sculpturalLift;
    const targetScale = sampleStage(profile.scale, stage) * viewport.height;

    model.position.x = THREE.MathUtils.damp(model.position.x, targetX, SCROLL_DAMPING, delta);
    model.position.y = THREE.MathUtils.damp(model.position.y, targetY, SCROLL_DAMPING, delta);
    model.position.z = THREE.MathUtils.damp(model.position.z, sculpturalDepth, SCROLL_DAMPING, delta);
    model.rotation.x = THREE.MathUtils.damp(model.rotation.x, targetPitch, ROTATION_DAMPING, delta);
    model.rotation.y = THREE.MathUtils.damp(model.rotation.y, targetYaw, ROTATION_DAMPING, delta);

    const scale = THREE.MathUtils.damp(model.scale.x, targetScale, SCROLL_DAMPING, delta);
    model.scale.setScalar(scale);
  });

  const initialScale = viewport.height * profile.scale[0];

  return (
    <group
      ref={modelRef}
      position={[viewport.width * profile.x[0], viewport.height * profile.y[0], 0]}
      scale={initialScale}
    >
      <PerfumeModel compact={compact} modelUrl={modelUrl} />
    </group>
  );
};
