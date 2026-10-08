import React, { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface PerfumeModelProps {
  compact: boolean;
  modelUrl: string;
}

export const PerfumeModel: React.FC<PerfumeModelProps> = ({ compact, modelUrl }) => {
  const { scene } = useGLTF(modelUrl);

  const prepared = useMemo(() => {
    const clone = scene.clone(true);
    const shadeBounds = new THREE.Box3();
    clone.updateMatrixWorld(true);

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = false;
      child.receiveShadow = false;
      const sourceMaterials = Array.isArray(child.material) ? child.material : [child.material];
      const materials = sourceMaterials.map((source) => {
        const material = source.clone();
        if (material instanceof THREE.MeshStandardMaterial) {
          material.envMapIntensity = compact ? 0.98 : 0.82;
          if (material instanceof THREE.MeshPhysicalMaterial
            && material.name === 'Bottle - Warm Ivory Frosted Glass') {
            shadeBounds.union(new THREE.Box3().setFromObject(child));
            // The shade transmits a separate light source inside the model.
            material.emissive.setRGB(0, 0, 0);
            material.transmission = 0.7;
            material.roughness = 0.9;
            material.thickness = 0.18;
            material.attenuationColor.set('#ffe9c8');
            material.attenuationDistance = 1.6;
          }
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
    const shadeSize = shadeBounds.getSize(new THREE.Vector3());
    const lightCenter = shadeBounds.getCenter(new THREE.Vector3()).sub(center);
    lightCenter.y = shadeBounds.min.y + shadeSize.y * 0.45 - center.y;

    return {
      clone,
      normalizationScale: size.y > 0 ? 1 / size.y : 1,
      lightCenter,
      lightScale: new THREE.Vector3(shadeSize.x * 0.27, shadeSize.y * 0.3, shadeSize.z * 0.27),
    };
  }, [compact, scene]);

  useEffect(() => {
    return () => {
      prepared.clone.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material) => material.dispose());
      });
    };
  }, [prepared]);

  return (
    <group scale={prepared.normalizationScale}>
      <primitive object={prepared.clone} />
      <mesh position={prepared.lightCenter} scale={prepared.lightScale}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshBasicMaterial color={[18, 10, 4.2]} toneMapped={false} />
      </mesh>
      <pointLight position={prepared.lightCenter} color="#ffd294" intensity={0.65} distance={1.1} decay={2} />
    </group>
  );
};
