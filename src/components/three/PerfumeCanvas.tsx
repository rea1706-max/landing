import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
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
  startX: number;
  startY: number;
}

interface PerfumeCanvasProps {
  onModelReady: () => void;
  onModelUnavailable: () => void;
}

const isCompactDevice = () => (
  window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches
);

export const PerfumeCanvas: React.FC<PerfumeCanvasProps> = ({
  onModelReady,
  onModelUnavailable,
}) => {
  const [compact, setCompact] = useState(isCompactDevice);
  const compactRef = useRef(compact);
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
    startX: 0,
    startY: 0,
  });

  useEffect(() => {
    const coarseQuery = window.matchMedia('(pointer: coarse)');
    const updateDeviceProfile = () => {
      const nextCompact = isCompactDevice();
      if (compactRef.current === nextCompact) return;
      compactRef.current = nextCompact;
      onModelUnavailable();
      setCompact(nextCompact);
    };

    window.addEventListener('resize', updateDeviceProfile);
    coarseQuery.addEventListener('change', updateDeviceProfile);
    return () => {
      window.removeEventListener('resize', updateDeviceProfile);
      coarseQuery.removeEventListener('change', updateDeviceProfile);
    };
  }, [onModelUnavailable]);

  useEffect(() => {
    const coarseQuery = window.matchMedia('(pointer: coarse)');
    const interactionZones = Array.from(
      document.querySelectorAll<HTMLElement>('[data-model-interaction-zone]'),
    );

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
    };

    const isInsideObjectZone = (clientX: number, clientY: number) => {
      return interactionZones.some((zone) => {
        const bounds = zone.getBoundingClientRect();
        return bounds.width > 0
          && bounds.height > 0
          && clientX >= bounds.left
          && clientX <= bounds.right
          && clientY >= bounds.top
          && clientY <= bounds.bottom;
      });
    };

    const handlePointerDown = (event: PointerEvent) => {
      const isPrimaryMouseButton = event.pointerType !== 'mouse' || event.button === 0;
      if (!isPrimaryMouseButton || pointer.current.dragging || !isInsideObjectZone(event.clientX, event.clientY)) return;

      if (event.pointerType === 'mouse' && event.cancelable) event.preventDefault();
      pointer.current.dragging = true;
      pointer.current.active = 1;
      pointer.current.x = Math.min(1, Math.max(-1, (event.clientX / window.innerWidth) * 2 - 1));
      pointer.current.y = Math.min(1, Math.max(-1, (event.clientY / window.innerHeight) * 2 - 1));
      pointer.current.lastX = event.clientX;
      pointer.current.lastY = event.clientY;
      pointer.current.startX = event.clientX;
      pointer.current.startY = event.clientY;
      document.body.style.userSelect = 'none';
      if (event.pointerType === 'mouse') document.body.style.cursor = 'grabbing';
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && !pointer.current.dragging) return;

      pointer.current.x = Math.min(1, Math.max(-1, (event.clientX / window.innerWidth) * 2 - 1));
      pointer.current.y = Math.min(1, Math.max(-1, (event.clientY / window.innerHeight) * 2 - 1));

      if (pointer.current.dragging) {
        const totalX = event.clientX - pointer.current.startX;
        const totalY = event.clientY - pointer.current.startY;

        if (
          event.pointerType !== 'mouse'
          && Math.abs(totalY) > 10
          && Math.abs(totalY) > Math.abs(totalX) * 1.15
        ) {
          pointer.current.active = 0;
          releaseDrag();
          return;
        }

        if (event.cancelable) event.preventDefault();
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
        if (event.pointerType === 'mouse') document.body.style.cursor = 'grabbing';
        return;
      }

      const insideObjectZone = isInsideObjectZone(event.clientX, event.clientY);
      pointer.current.active = insideObjectZone ? 1 : 0;
      if (event.pointerType === 'mouse') document.body.style.cursor = insideObjectZone ? 'grab' : '';
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!pointer.current.dragging) return;
      pointer.current.dragging = false;
      pointer.current.active = isInsideObjectZone(event.clientX, event.clientY) ? 1 : 0;
      document.body.style.userSelect = '';
      document.body.style.cursor = event.pointerType === 'mouse' && pointer.current.active ? 'grab' : '';
    };

    updatePointerMode();
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove, { passive: false });
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

  const modelUrl = compact
    ? '/models/peacock-lantern-mobile.glb'
    : '/models/peacock-lantern-desktop.glb';

  return (
      <Canvas
        key={modelUrl}
        className="absolute inset-0"
        camera={{ position: [0, 0, 5.2], fov: 32, near: 0.1, far: 100 }}
        dpr={compact ? 1 : [1, 1.25]}
        performance={{ min: 0.55 }}
        gl={{ antialias: !compact, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = compact ? 1.04 : 1.08;
          gl.domElement.addEventListener('webglcontextlost', onModelUnavailable, { once: true });
        }}
      >
        <Lighting mouse={pointer} compact={compact} />
        <Suspense fallback={null}>
          <CameraRig
            mouse={pointer}
            compact={compact}
            modelUrl={modelUrl}
            onModelReady={onModelReady}
          />
        </Suspense>
      </Canvas>
  );
};
