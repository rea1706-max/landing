import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { CameraRig } from './CameraRig';
import { Lighting } from './Lighting';

export interface PointerMotion {
  x: number;
  y: number;
  active: number;
  coarse: boolean;
  dragging: boolean;
  yaw: number;
  pitch: number;
  lastX: number;
  lastY: number;
}

export const PerfumeCanvas: React.FC = () => {
  const pointer = useRef<PointerMotion>({
    x: 0,
    y: 0,
    active: 0,
    coarse: false,
    dragging: false,
    yaw: 0,
    pitch: 0,
    lastX: 0,
    lastY: 0,
  });
  const [modelReady, setModelReady] = useState(false);
  const handleModelReady = useCallback(() => setModelReady(true), []);

  useEffect(() => {
    const coarseQuery = window.matchMedia('(pointer: coarse)');

    const releaseDrag = () => {
      pointer.current.dragging = false;
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    const resetPointer = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
      pointer.current.active = 0;
      releaseDrag();
    };

    const updatePointerMode = () => {
      pointer.current.coarse = coarseQuery.matches;
      if (coarseQuery.matches) resetPointer();
    };

    const isInsideObjectZone = (clientX: number, clientY: number) => {
      const hero = document.getElementById('hero');
      if (!hero) return false;

      const bounds = hero.getBoundingClientRect();
      const insideHero = clientY >= bounds.top + bounds.height * 0.08
        && clientY <= bounds.bottom - bounds.height * 0.05;
      const insideModelZone = clientX >= window.innerWidth * 0.5
        && clientX <= window.innerWidth * 0.96;

      return insideHero && insideModelZone;
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (pointer.current.coarse || event.button !== 0 || !isInsideObjectZone(event.clientX, event.clientY)) return;

      event.preventDefault();
      pointer.current.dragging = true;
      pointer.current.active = 1;
      pointer.current.lastX = event.clientX;
      pointer.current.lastY = event.clientY;
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (pointer.current.coarse) return;

      pointer.current.x = Math.min(1, Math.max(-1, (event.clientX / window.innerWidth) * 2 - 1));
      pointer.current.y = Math.min(1, Math.max(-1, (event.clientY / window.innerHeight) * 2 - 1));

      if (pointer.current.dragging) {
        const deltaX = event.clientX - pointer.current.lastX;
        const deltaY = event.clientY - pointer.current.lastY;
        pointer.current.yaw += deltaX * 0.012;
        pointer.current.pitch = Math.min(
          Math.PI * 0.1,
          Math.max(-Math.PI * 0.1, pointer.current.pitch + deltaY * 0.006),
        );
        pointer.current.lastX = event.clientX;
        pointer.current.lastY = event.clientY;
        pointer.current.active = 1;
        document.body.style.cursor = 'grabbing';
        return;
      }

      const insideObjectZone = isInsideObjectZone(event.clientX, event.clientY);
      pointer.current.active = insideObjectZone ? 1 : 0;
      document.body.style.cursor = insideObjectZone ? 'grab' : '';
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!pointer.current.dragging) return;
      pointer.current.dragging = false;
      pointer.current.active = isInsideObjectZone(event.clientX, event.clientY) ? 1 : 0;
      document.body.style.userSelect = '';
      document.body.style.cursor = pointer.current.active ? 'grab' : '';
    };

    updatePointerMode();
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', resetPointer);
    window.addEventListener('blur', resetPointer);
    document.documentElement.addEventListener('mouseleave', resetPointer);
    coarseQuery.addEventListener('change', updatePointerMode);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', resetPointer);
      window.removeEventListener('blur', resetPointer);
      document.documentElement.removeEventListener('mouseleave', resetPointer);
      coarseQuery.removeEventListener('change', updatePointerMode);
      releaseDrag();
    };
  }, []);

  return (
    <div
      data-hero-scene
      className="pointer-events-none fixed inset-0 z-10 hidden overflow-hidden md:block"
      aria-hidden="true"
    >
      <img
        src="/plumage-perfume.png"
        alt=""
        className={`absolute left-[49%] top-1/2 h-[82vh] w-[48vw] -translate-y-1/2 object-contain transition-opacity duration-1000 ${
          modelReady ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 32, near: 0.1, far: 100 }}
        dpr={[1, 1.3]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1.08;
        }}
      >
        <Lighting mouse={pointer} />
        <Suspense fallback={null}>
          <CameraRig mouse={pointer} onModelReady={handleModelReady} />
          <Environment preset="warehouse" environmentIntensity={0.68} />
        </Suspense>
      </Canvas>
    </div>
  );
};
