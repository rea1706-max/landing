import React, { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface PerfumeModelProps {
  onReady: () => void;
}

export const PerfumeModel: React.FC<PerfumeModelProps> = ({ onReady }) => {
  const { scene } = useGLTF('/models/peacock-lantern.glb');

  const prepared = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = false;
      child.receiveShadow = false;
      const sourceMaterials = Array.isArray(child.material) ? child.material : [child.material];
      const materials = sourceMaterials.map((source) => {
        const material = source.clone();
        if (material instanceof THREE.MeshStandardMaterial) {
          material.envMapIntensity = 0.75;
          material.needsUpdate = true;
        }
        return material;
      });
      child.material = Array.isArray(child.material) ? materials : materials[0];
    });

    clone.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    clone.position.sub(center);

    return {
      clone,
      normalizationScale: size.y > 0 ? 1 / size.y : 1,
    };
  }, [scene]);

  useEffect(() => {
    onReady();
    return () => {
      prepared.clone.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material) => material.dispose());
      });
    };
  }, [onReady, prepared]);

  return (
    <>
      <group scale={prepared.normalizationScale}>
        <primitive object={prepared.clone} />
      </group>
      <pointLight position={[0, -0.06, 0.16]} color="#d9ad78" intensity={0.85} distance={1.8} decay={2} />
    </>
  );
};
