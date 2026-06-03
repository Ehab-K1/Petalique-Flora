'use client';

// The WebGL stage for the rose: a warm key / cool rim / ember up-light rig plus
// an in-memory studio environment (Lightformers — no CDN fetch) for the velvet
// sheen, and a restrained bloom pass. Transparent canvas so the hero's CSS
// gradient shows through.

import { Suspense, type MutableRefObject } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer, AdaptiveDpr } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Rose } from './Rose';

export default function RoseScene({
  bloomRef,
  effects = true,
}: {
  bloomRef?: MutableRefObject<number>;
  effects?: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 38 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 4, 5]} intensity={2.3} color="#fff1e4" />
      <directionalLight position={[-4, 2, -3]} intensity={1.1} color="#bcd0e8" />
      <pointLight position={[0, -2.5, 3]} intensity={0.7} color="#8a4a3f" />

      <Suspense fallback={null}>
        <Environment resolution={64}>
          <Lightformer intensity={1.4} form="ring" color="#ffe9d6" scale={6} position={[0, 3, 4]} />
          <Lightformer intensity={0.8} form="rect" color="#d9e3f0" scale={[8, 3, 1]} position={[-5, 1, -2]} />
          <Lightformer intensity={0.6} form="circle" color="#caa49a" scale={4} position={[4, -1, 2]} />
        </Environment>
        <Rose bloomRef={bloomRef} />
      </Suspense>

      {effects && (
        <EffectComposer enableNormalPass={false}>
          <Bloom mipmapBlur luminanceThreshold={0.72} luminanceSmoothing={0.3} intensity={0.5} radius={0.6} />
        </EffectComposer>
      )}
      <AdaptiveDpr pixelated={false} />
    </Canvas>
  );
}
