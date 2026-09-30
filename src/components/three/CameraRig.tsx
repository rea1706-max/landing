import React, { MutableRefObject, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { PerfumeModel } from './PerfumeModel';
import type { PointerMotion } from './PerfumeCanvas';

interface CameraRigProps {
  mouse: MutableRefObject<PointerMotion>;
  onModelReady: () => void;
}

const SECTION_IDS = ['hero', 'composition', 'object', 'final'];
const X_FACTORS = [0.23, -0.07, 0.03, 0];
const Y_FACTORS = [0, -0.01, -0.02, -0.04];
const SCALE_FACTORS = [0.82, 0.72, 0.78, 0.82];
const ROTATIONS = [0, 0.45, 0.82, Math.PI * 2];
const MAX_IDLE_YAW = THREE.MathUtils.degToRad(2);
const SCROLL_DAMPING = 1.55;
const ROTATION_DAMPING = 2.8;

const sampleStage = (values: number[], stage: number) => {
  const from = Math.min(Math.floor(stage), values.length - 1);
  const to = Math.min(from + 1, values.length - 1);
  return THREE.MathUtils.lerp(values[from], values[to], stage - from);
};

export const CameraRig: React.FC<CameraRigProps> = ({ mouse, onModelReady }) => {
  const { camera, viewport } = useThree();
  const modelRef = useRef<THREE.Group>(null);
  const sectionTops = useRef<number[]>([]);

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
    if (!model || tops.length !== SECTION_IDS.length) return;

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

    const idleYaw = mouse.current.coarse && stage < 1
      ? Math.sin(clock.elapsedTime * 0.13) * MAX_IDLE_YAW
      : 0;
    const baseYaw = sampleStage(ROTATIONS, stage);
    const heroPoseWeight = 1 - THREE.MathUtils.smoothstep(stage, 0.18, 1);
    const heldYaw = mouse.current.coarse ? idleYaw : mouse.current.yaw;
    const heldPitch = mouse.current.coarse ? 0 : mouse.current.pitch;
    const targetYaw = THREE.MathUtils.lerp(baseYaw, heldYaw, heroPoseWeight);
    const targetPitch = heldPitch * heroPoseWeight;

    const objectProgress = THREE.MathUtils.clamp(stage - 2, 0, 1);
    const sculpturalLift = Math.sin(objectProgress * Math.PI) * viewport.height * 0.04;
    const sculpturalDepth = Math.sin(objectProgress * Math.PI * 2) * 0.08;
    const targetX = sampleStage(X_FACTORS, stage) * viewport.width;
    const targetY = sampleStage(Y_FACTORS, stage) * viewport.height + sculpturalLift;
    const targetScale = sampleStage(SCALE_FACTORS, stage) * viewport.height;

    model.position.x = THREE.MathUtils.damp(model.position.x, targetX, SCROLL_DAMPING, delta);
    model.position.y = THREE.MathUtils.damp(model.position.y, targetY, SCROLL_DAMPING, delta);
    model.position.z = THREE.MathUtils.damp(model.position.z, sculpturalDepth, SCROLL_DAMPING, delta);
    model.rotation.x = THREE.MathUtils.damp(model.rotation.x, targetPitch, ROTATION_DAMPING, delta);
    model.rotation.y = THREE.MathUtils.damp(model.rotation.y, targetYaw, ROTATION_DAMPING, delta);

    const scale = THREE.MathUtils.damp(model.scale.x, targetScale, SCROLL_DAMPING, delta);
    model.scale.setScalar(scale);
  });

  const initialScale = viewport.height * SCALE_FACTORS[0];

  return (
    <group ref={modelRef} position={[viewport.width * X_FACTORS[0], 0, 0]} scale={initialScale}>
      <PerfumeModel onReady={onModelReady} />
    </group>
  );
};
