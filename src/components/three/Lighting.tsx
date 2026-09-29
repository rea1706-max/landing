import React, { MutableRefObject, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import type { PointerMotion } from './PerfumeCanvas';

interface LightingProps {
  mouse: MutableRefObject<PointerMotion>;
}

export const Lighting: React.FC<LightingProps> = ({ mouse }) => {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame((_, delta) => {
    const light = keyLightRef.current;
    if (!light) return;

    const weight = mouse.current.coarse ? 0 : mouse.current.active;
    light.position.x = THREE.MathUtils.damp(light.position.x, 3 + mouse.current.x * 1.35 * weight, 1.45, delta);
    light.position.y = THREE.MathUtils.damp(light.position.y, 3.8 - mouse.current.y * 0.75 * weight, 1.45, delta);
  });

  return (
    <>
      <ambientLight intensity={0.72} color="#d8d0c8" />
      <hemisphereLight color="#e8ddd2" groundColor="#171316" intensity={0.78} />
      <directionalLight ref={keyLightRef} position={[3, 3.8, 4.2]} intensity={2.15} color="#eadccd" />
      <directionalLight position={[-3.6, 1.5, 1.8]} intensity={0.72} color="#776e78" />
      <directionalLight position={[3.4, 2.4, -3.8]} intensity={1.65} color="#9eacbf" />
      <directionalLight position={[-2.8, 0.8, -2.4]} intensity={0.82} color="#8290a2" />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={3.4} color="#eadccd" position={[0, 4, -4]} scale={[5, 4, 1]} />
        <Lightformer form="rect" intensity={2.3} color="#9aa8b8" position={[-4, 1, 0]} rotation={[0, Math.PI / 2, 0]} scale={[2.5, 5, 1]} />
        <Lightformer form="rect" intensity={2} color="#c8a889" position={[4, 0.4, 1]} rotation={[0, -Math.PI / 2, 0]} scale={[2, 4, 1]} />
      </Environment>
    </>
  );
};
