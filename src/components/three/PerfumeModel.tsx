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

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = false;
      child.receiveShadow = false;
      const sourceMaterials = Array.isArray(child.material) ? child.material : [child.material];
      const materials = sourceMaterials.map((source) => {
        const material = source.clone();
        if (material instanceof THREE.MeshStandardMaterial) {
          material.envMapIntensity = compact ? 0.98 : 0.82;
          if (material.name === 'Bottle - Warm Ivory Frosted Glass') {
            // Diffuse the warm internal light across the frosted shade while preserving its texture.
            material.onBeforeCompile = (shader) => {
              shader.vertexShader = shader.vertexShader
                .replace('#include <common>', '#include <common>\nvarying vec3 vLampLocalPosition;')
                .replace('#include <begin_vertex>', '#include <begin_vertex>\nvLampLocalPosition = position;');
              shader.fragmentShader = shader.fragmentShader
                .replace('#include <common>', '#include <common>\nvarying vec3 vLampLocalPosition;')
                .replace(
                  '#include <emissivemap_fragment>',
                  `#include <emissivemap_fragment>
                  vec2 lampGlowPoint = vec2(vLampLocalPosition.x / 0.60, (vLampLocalPosition.y + 0.28) / 0.85);
                  float lampGlow = exp(-1.2 * dot(lampGlowPoint, lampGlowPoint));
                  totalEmissiveRadiance += vec3(0.95, 0.48, 0.19) * lampGlow;`,
                );
            };
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

    return {
      clone,
      normalizationScale: size.y > 0 ? 1 / size.y : 1,
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
    <>
      <group scale={prepared.normalizationScale}>
        <primitive object={prepared.clone} />
      </group>
      <pointLight position={[0, -0.06, 0.16]} color="#d9ad78" intensity={0.85} distance={1.8} decay={2} />
    </>
  );
};
