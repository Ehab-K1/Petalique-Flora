'use client';

// Procedural rose. Petals are curved geometry grids arranged in concentric
// whorls (golden-angle offset so nothing aligns). A single `bloom` value (0..1)
// drives a staggered unravel — outermost whorl peels open first, the bud last —
// so scrolling makes the rose physically open. No external model, no textures.

import { useMemo, useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

// One shared petal geometry: a grid from base (y=0) to tip (y=1.5), cupped
// across its width and recurved near the tip for a natural fold.
function makePetalGeometry(seg = 18) {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let j = 0; j <= seg; j++) {
    const v = j / seg; // 0 base → 1 tip
    const widthProfile = Math.sin(Math.PI * Math.min(1, v * 1.12)) * 0.6 * (1 - 0.22 * v);
    const len = v * 1.5;
    for (let i = 0; i <= seg; i++) {
      const u = i / seg; // 0..1 across
      const cx = (u - 0.5) * 2;
      const x = cx * widthProfile;
      const y = len;
      const cup = -Math.pow(cx, 2) * 0.5 * (0.35 + 0.65 * v);
      const recurve = Math.pow(Math.max(0, v - 0.55), 2) * 0.7;
      const z = cup + recurve;
      positions.push(x, y, z);
      uvs.push(u, v);
    }
  }
  for (let j = 0; j < seg; j++) {
    for (let i = 0; i < seg; i++) {
      const a = j * (seg + 1) + i;
      const b = a + 1;
      const c = a + (seg + 1);
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}

interface LayerDef {
  count: number;
  radius: number;
  scale: number;
  tiltClosed: number;
  tiltOpen: number;
  color: string;
}

const LAYERS: LayerDef[] = [
  { count: 3, radius: 0.1, scale: 0.5, tiltClosed: 0.05, tiltOpen: 0.32, color: '#5a2a22' },
  { count: 5, radius: 0.3, scale: 0.7, tiltClosed: 0.1, tiltOpen: 0.64, color: '#6b3128' },
  { count: 8, radius: 0.54, scale: 0.92, tiltClosed: 0.14, tiltOpen: 0.98, color: '#8a4a3f' },
  { count: 11, radius: 0.8, scale: 1.1, tiltClosed: 0.18, tiltOpen: 1.3, color: '#a0584b' },
  { count: 14, radius: 1.05, scale: 1.28, tiltClosed: 0.22, tiltOpen: 1.62, color: '#bd7e70' },
];

const GOLDEN = 2.39996; // radians

interface Petal {
  layer: number;
  aroundY: number;
  radius: number;
  scale: number;
  tiltClosed: number;
  tiltOpen: number;
  start: number;
  twist: number;
}

export function Rose({ bloomRef }: { bloomRef?: MutableRefObject<number> }) {
  const geometry = useMemo(() => makePetalGeometry(), []);
  const materials = useMemo(
    () =>
      LAYERS.map(
        (l) =>
          new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(l.color),
            roughness: 0.52,
            metalness: 0,
            sheen: 0.7,
            sheenRoughness: 0.55,
            sheenColor: new THREE.Color('#e9c9bd'),
            clearcoat: 0.12,
            clearcoatRoughness: 0.6,
            side: THREE.DoubleSide,
          }),
      ),
    [],
  );

  const petals = useMemo<Petal[]>(() => {
    const out: Petal[] = [];
    LAYERS.forEach((l, li) => {
      const N = LAYERS.length - 1;
      const start = ((N - li) / N) * 0.45; // outer whorls start first
      for (let i = 0; i < l.count; i++) {
        out.push({
          layer: li,
          aroundY: i * ((Math.PI * 2) / l.count) + li * GOLDEN,
          radius: l.radius,
          scale: l.scale,
          tiltClosed: l.tiltClosed,
          tiltOpen: l.tiltOpen,
          start,
          twist: (i % 2 === 0 ? 1 : -1) * 0.1,
        });
      }
    });
    return out;
  }, []);

  const innerRefs = useRef<(THREE.Group | null)[]>([]);
  const spinRef = useRef<THREE.Group>(null);
  const pointerRef = useRef<THREE.Group>(null);
  const current = useRef(0.0);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const target = bloomRef ? clamp01(bloomRef.current) : 0.62;
    current.current = lerp(current.current, target, 1 - Math.pow(0.0015, dt));
    const bloom = current.current;

    for (let k = 0; k < petals.length; k++) {
      const g = innerRefs.current[k];
      if (!g) continue;
      const p = petals[k];
      const local = smoothstep(p.start, p.start + 0.6, bloom);
      g.rotation.x = lerp(p.tiltClosed, p.tiltOpen, local);
      g.rotation.z = lerp(0, p.twist, local);
      g.position.z = lerp(0.02, p.radius, local);
      g.position.y = lerp(0, p.layer * 0.03, local);
      const s = p.scale * lerp(0.82, 1, local);
      g.scale.setScalar(s);
    }

    if (spinRef.current) spinRef.current.rotation.y += dt * 0.08;
    if (pointerRef.current) {
      const px = state.pointer.x;
      const py = state.pointer.y;
      pointerRef.current.rotation.y = lerp(pointerRef.current.rotation.y, px * 0.28, 0.05);
      pointerRef.current.rotation.x = lerp(pointerRef.current.rotation.x, -py * 0.2, 0.05);
    }
  });

  let idx = 0;
  return (
    <group ref={pointerRef} position={[0, -0.35, 0]}>
      {/* tilt the bloom so the camera looks slightly into the flower */}
      <group rotation={[-Math.PI * 0.46, 0, 0]}>
        <group ref={spinRef}>
          {/* core */}
          <mesh position={[0, 0.05, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#4a221b" roughness={0.7} />
          </mesh>
          {petals.map((p) => {
            const myIdx = idx++;
            return (
              <group key={myIdx} rotation={[0, p.aroundY, 0]}>
                <group
                  ref={(el) => {
                    innerRefs.current[myIdx] = el;
                  }}
                >
                  <mesh geometry={geometry} material={materials[p.layer]} />
                </group>
              </group>
            );
          })}
        </group>
      </group>
    </group>
  );
}
