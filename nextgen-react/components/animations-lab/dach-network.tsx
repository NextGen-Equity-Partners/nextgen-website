"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { LabCanvas } from "./_canvas";

/**
 * Scene 5 · DACH-Netz
 * Story: Aktive Beziehungen quer durch DACH — drei Standorte, dazwischen
 * fließen Daten, Kapital und Kontakte als Pulse.
 *
 * Tech: 3 anchor spheres positioned roughly DE/AT/CH, three quadratic Bezier
 * tubes connecting them, a wireframe ground plane for spatial reference, and
 * instanced point particles racing along each tube. Slight bloom for the lift.
 */

type Anchor = { name: string; pos: THREE.Vector3 };

const ANCHORS: Anchor[] = [
  { name: "DE", pos: new THREE.Vector3(-1.9, 1.05, 0) },
  { name: "AT", pos: new THREE.Vector3(1.55, -0.6, 0.4) },
  { name: "CH", pos: new THREE.Vector3(-0.9, -1.2, -0.4) },
];

const PARTICLES_PER_LANE = 18;

type Lane = {
  curve: THREE.QuadraticBezierCurve3;
  tube: THREE.TubeGeometry;
};

function makeLanes(): Lane[] {
  const pairs: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 0],
  ];
  return pairs.map(([a, b]) => {
    const start = ANCHORS[a].pos;
    const end = ANCHORS[b].pos;
    const mid = start.clone().add(end).multiplyScalar(0.5);
    // Lift the bend up out of the plane for an arc.
    const lift = start.distanceTo(end) * 0.55;
    mid.z += lift * (0.55 + Math.random() * 0.4);
    mid.y += 0.3 * (Math.random() - 0.5);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const tube = new THREE.TubeGeometry(curve, 64, 0.008, 8, false);
    return { curve, tube };
  });
}

function Anchors() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current?.children.forEach((child, i) => {
      const breath = 1 + Math.sin(t * 1.3 + i * 1.7) * 0.06;
      (child as THREE.Object3D).scale.setScalar(breath);
    });
  });
  return (
    <group ref={groupRef}>
      {ANCHORS.map((a) => (
        <mesh key={a.name} position={a.pos}>
          <sphereGeometry args={[0.13, 24, 24]} />
          <meshStandardMaterial
            color="#ffd9ad"
            emissive="#ffb37a"
            emissiveIntensity={2.2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function FlowingParticles({ lanes }: { lanes: Lane[] }) {
  const total = lanes.length * PARTICLES_PER_LANE;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // per-particle: which lane, base offset, speed
  const data = useMemo(() => {
    const arr: { lane: number; offset: number; speed: number }[] = [];
    for (let l = 0; l < lanes.length; l++) {
      for (let i = 0; i < PARTICLES_PER_LANE; i++) {
        arr.push({
          lane: l,
          offset: i / PARTICLES_PER_LANE + Math.random() * (1 / PARTICLES_PER_LANE) * 0.4,
          speed: 0.06 + Math.random() * 0.1,
        });
      }
    }
    return arr;
  }, [lanes]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!meshRef.current) return;
    data.forEach((p, i) => {
      const tt = (p.offset + t * p.speed) % 1;
      const point = lanes[p.lane].curve.getPoint(tt);
      dummy.position.copy(point);
      dummy.scale.setScalar(0.025 + (1 - Math.abs(tt - 0.5) * 2) * 0.015);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, total]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial color="#ffeacc" toneMapped={false} />
    </instancedMesh>
  );
}

function GroundGrid() {
  const ref = useRef<THREE.GridHelper>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = -1.7;
  });
  // GridHelper expects (size, divisions, color1, color2)
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(7, 14, "#243a6e", "#101e44");
    (g.material as THREE.LineBasicMaterial).transparent = true;
    (g.material as THREE.LineBasicMaterial).opacity = 0.55;
    return g;
  }, []);
  return <primitive ref={ref} object={grid} />;
}

function CameraPath() {
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.06;
    state.camera.position.x = Math.sin(t) * 0.6;
    state.camera.position.y = 0.3 + Math.sin(t * 1.3) * 0.2;
    state.camera.position.z = 4.5 + Math.cos(t) * 0.4;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene() {
  const lanes = useMemo(makeLanes, []);
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 5, 4]} intensity={0.9} color="#cfd9ff" />
      <CameraPath />
      <GroundGrid />
      {lanes.map((l, i) => (
        <mesh key={i} geometry={l.tube}>
          <meshBasicMaterial color="#7da3ff" transparent opacity={0.55} toneMapped={false} />
        </mesh>
      ))}
      <Anchors />
      <FlowingParticles lanes={lanes} />
    </>
  );
}

export function DachNetworkAnimation() {
  return (
    <LabCanvas camera={[0, 0.3, 4.6]} fov={45}>
      <Scene />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.9} luminanceThreshold={0.25} luminanceSmoothing={0.45} mipmapBlur />
      </EffectComposer>
    </LabCanvas>
  );
}
