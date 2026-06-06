/// <reference types="@react-three/fiber" />
"use client";

import { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Environment,
  Sparkles,
  useScroll,
  ScrollControls,
  MeshDistortMaterial,
} from "@react-three/drei";
import * as THREE from "three";

// Rose petal geometry
function RosePetal({
  position,
  rotation,
  scale,
  color,
  scrollProgress,
  index,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  scrollProgress: number;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const delay = index * 0.15;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // Gentle breathing animation
    meshRef.current.rotation.y = rotation[1] + Math.sin(t * 0.3 + delay) * 0.05;
    meshRef.current.rotation.z = rotation[2] + Math.cos(t * 0.2 + delay) * 0.03;

    // Unfold based on scroll
    const unfold = Math.min(1, scrollProgress * 3 - delay);
    if (unfold > 0) {
      meshRef.current.rotation.x = rotation[0] - unfold * 0.6;
      meshRef.current.position.x = position[0] * (1 + unfold * 0.3);
      meshRef.current.position.y = position[1] * (1 + unfold * 0.2);
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <torusGeometry args={[0.8, 0.3, 8, 16, Math.PI]} />
      <MeshDistortMaterial
        color={color}
        roughness={0.4}
        metalness={0.1}
        distort={0.1}
        speed={1.5}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// Rose core
function RoseCore({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.1;
    const scale = 0.85 + scrollProgress * 0.15;
    groupRef.current.scale.setScalar(scale);
  });

  const petalColors = [
    "#C4897B", "#D4967E", "#BE7E6F",
    "#CA8E80", "#B87368", "#D0958A",
    "#C09080", "#BA8070",
  ];

  const petals = [
    { pos: [0, 0, 0.9], rot: [0.3, 0, 0] },
    { pos: [0.85, 0, 0.45], rot: [0.3, 0, -1.05] },
    { pos: [0.52, 0, -0.72], rot: [0.3, 0, -2.1] },
    { pos: [-0.52, 0, -0.72], rot: [0.3, 0, 2.1] },
    { pos: [-0.85, 0, 0.45], rot: [0.3, 0, 1.05] },
    { pos: [0, 0.3, 0.6], rot: [0.6, 0, 0] },
    { pos: [0.52, 0.3, 0.3], rot: [0.6, 0, -1.05] },
    { pos: [-0.52, 0.3, 0.3], rot: [0.6, 0, 1.05] },
  ];

  return (
    <group ref={groupRef}>
      {petals.map((p, i) => (
        <RosePetal
          key={i}
          position={p.pos as [number, number, number]}
          rotation={p.rot as [number, number, number]}
          scale={0.6 + (i % 3) * 0.1}
          color={petalColors[i % petalColors.length]}
          scrollProgress={scrollProgress}
          index={i}
        />
      ))}
      {/* Stem */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 2.5, 8]} />
        <meshStandardMaterial color="#4A5E3A" roughness={0.8} />
      </mesh>
      {/* Sepal */}
      <mesh position={[0, -0.6, 0]}>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshStandardMaterial color="#3D4F2E" roughness={0.8} />
      </mesh>
    </group>
  );
}

// Floating particles
function FloatingParticles() {
  return (
    <Sparkles
      count={80}
      scale={[8, 6, 8]}
      size={0.6}
      speed={0.3}
      opacity={0.4}
      color="#C9A96E"
    />
  );
}

// Camera controller
function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mouseX = (state.pointer.x * 0.3);
    const mouseY = (state.pointer.y * 0.2);

    camera.position.x += (mouseX - camera.position.x) * 0.03;
    camera.position.y += (2 + mouseY - camera.position.y) * 0.03;
    camera.position.z = 5 - scrollProgress * 1.5;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function RoseScene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color="#FFF5E6"
        castShadow
      />
      <pointLight position={[-3, 4, 3]} intensity={0.6} color="#C4897B" />
      <pointLight position={[3, -2, 4]} intensity={0.4} color="#C9A96E" />

      <Environment preset="studio" />

      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
        <RoseCore scrollProgress={scrollProgress} />
      </Float>

      <FloatingParticles />
      <CameraRig scrollProgress={scrollProgress} />
    </>
  );
}

// Fallback for low-performance devices
function RoseFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-[180px] opacity-20 animate-float select-none">🌹</div>
    </div>
  );
}

export function HeroScene({ scrollY }: { scrollY: number }) {
  const [isLowPerf, setIsLowPerf] = useState(false);
  const scrollProgress = Math.min(1, scrollY / 600);

  useEffect(() => {
    // Detect low-performance device
    const memory = (navigator as { deviceMemory?: number }).deviceMemory;
    if (memory && memory < 4) {
      setIsLowPerf(true);
    }
  }, []);

  if (isLowPerf) return <RoseFallback />;

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <RoseScene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
