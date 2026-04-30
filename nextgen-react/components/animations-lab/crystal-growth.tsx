"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Bloom, ChromaticAberration, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { LabCanvas } from "./_canvas";

/**
 * Scene 6 · Kristall-Wachstum
 * Story: Substanz wächst — organisch, in mehreren Richtungen, aus einem Kern.
 * A fractal branch system grows out from the center, holds, then resets.
 *
 * Tech: A small recursive branch tree (depth 4) is generated once. Each branch
 * is rendered as an instanced cylinder. Per-branch growth phase staggered by
 * depth so the structure assembles from root outward. Iridescent physical
 * material + bloom + slight chromatic aberration for the cinematic feel.
 */

type Branch = {
  position: THREE.Vector3;
  rotation: THREE.Quaternion;
  length: number;
  thickness: number;
  depth: number; // 0 = root
};

const MAX_DEPTH = 4;
const ROOT_LENGTH = 0.8;
const TAPER = 0.66;
const SPLIT_ANGLE = 0.55;
const CHILDREN = 3;

function generate(): Branch[] {
  const out: Branch[] = [];

  const grow = (
    parentEnd: THREE.Vector3,
    parentDir: THREE.Vector3,
    length: number,
    thickness: number,
    depth: number,
  ) => {
    // Cylinder default points along +Y. Build an orientation that aligns +Y with parentDir.
    const up = new THREE.Vector3(0, 1, 0);
    const q = new THREE.Quaternion().setFromUnitVectors(up, parentDir.clone().normalize());

    out.push({
      position: parentEnd.clone().add(parentDir.clone().multiplyScalar(length / 2)),
      rotation: q,
      length,
      thickness,
      depth,
    });

    if (depth >= MAX_DEPTH) return;

    const newEnd = parentEnd.clone().add(parentDir.clone().multiplyScalar(length));
    const newLength = length * TAPER;
    const newThickness = thickness * 0.66;

    // Pick a stable basis perpendicular to parentDir for spreading children.
    const perp = new THREE.Vector3();
    if (Math.abs(parentDir.y) < 0.95) {
      perp.crossVectors(parentDir, up).normalize();
    } else {
      perp.set(1, 0, 0);
    }

    const goldenAngle = (Math.PI * 2) / CHILDREN;
    for (let i = 0; i < CHILDREN; i++) {
      const phi = goldenAngle * i + depth * 0.6;
      // Rotate parentDir away by SPLIT_ANGLE around the perp axis spun by phi.
      const axis = perp.clone().applyAxisAngle(parentDir, phi).normalize();
      const childDir = parentDir.clone().applyAxisAngle(axis, SPLIT_ANGLE);
      grow(newEnd, childDir, newLength, newThickness, depth + 1);
    }
  };

  grow(new THREE.Vector3(0, -0.6, 0), new THREE.Vector3(0, 1, 0), ROOT_LENGTH, 0.045, 0);
  return out;
}

function Crystal() {
  const branches = useMemo(generate, []);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const CYCLE = 11;
    const cy = (t % CYCLE) / CYCLE;
    // 0..0.6 grow, 0.6..0.85 hold, 0.85..1.0 collapse
    let grow: number;
    if (cy < 0.6) grow = cy / 0.6;
    else if (cy < 0.85) grow = 1;
    else grow = 1 - (cy - 0.85) / 0.15;

    if (meshRef.current) {
      branches.forEach((b, i) => {
        // Stagger growth by depth so children spawn after parents.
        const startAt = b.depth / (MAX_DEPTH + 1);
        const local = THREE.MathUtils.clamp((grow - startAt) / (1 - startAt), 0, 1);
        const eased = 1 - Math.pow(1 - local, 3);

        dummy.position.copy(b.position);
        dummy.quaternion.copy(b.rotation);
        // Scale Y = grown length, X/Z = thickness.
        dummy.scale.set(b.thickness, b.length * eased, b.thickness);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.18;
      groupRef.current.rotation.x = Math.sin(t * 0.21) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, branches.length]}>
        <cylinderGeometry args={[1, 1, 1, 10, 1, false]} />
        <meshPhysicalMaterial
          color="#dde6ff"
          metalness={0.55}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.04}
          iridescence={1}
          iridescenceIOR={1.55}
          iridescenceThicknessRange={[100, 720]}
        />
      </instancedMesh>
    </group>
  );
}

export function CrystalGrowthAnimation() {
  return (
    <LabCanvas camera={[0, 0.3, 4.6]} fov={42}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} color="#ffeacc" />
      <directionalLight position={[-5, -2, -3]} intensity={0.6} color="#9ec0ff" />
      <Environment preset="dawn" environmentIntensity={0.55} />
      <Crystal />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.65} luminanceThreshold={0.32} luminanceSmoothing={0.45} mipmapBlur />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0008, 0.0012]}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </LabCanvas>
  );
}
