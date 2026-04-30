"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { LabCanvas } from "./_canvas";

/**
 * Scene 2 · Neuronales Netzwerk
 * Story: KI / Daten und Wissen, das durch das Unternehmen fließt.
 * 3D constellation of nodes connected by edges. Signal pulses ride the edges
 * and ignite nodes when they arrive — recipient briefly flashes warm before
 * cooling back to ambient cyan.
 *
 * Tech: random sphere of nodes, a precomputed nearest-neighbour edge graph,
 * pulse particles that hop edge-to-edge with eased traversal, bloom for glow.
 */

const NODE_COUNT = 42;
const PULSE_COUNT = 14;
const NEIGHBOUR_RADIUS = 1.3;
const NODE_BASE_COLOR = new THREE.Color("#5e7eff");
const NODE_ACTIVE_COLOR = new THREE.Color("#ffb37a");

type Node = { pos: THREE.Vector3; activeFor: number };
type Edge = [number, number];
type Pulse = { edge: number; t: number; speed: number; reverse: boolean };

function buildGraph() {
  const nodes: Node[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    // Distribute on a unit sphere with golden-angle stratification, then slightly jitter inward.
    const phi = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 1.6 + (Math.random() - 0.5) * 0.4;
    const pos = new THREE.Vector3(
      Math.cos(theta) * Math.sin(phi),
      Math.sin(theta) * Math.sin(phi),
      Math.cos(phi),
    ).multiplyScalar(r);
    nodes.push({ pos, activeFor: 0 });
  }

  const edges: Edge[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (nodes[i].pos.distanceTo(nodes[j].pos) < NEIGHBOUR_RADIUS) {
        edges.push([i, j]);
      }
    }
  }

  return { nodes, edges };
}

function NetworkScene() {
  const { nodes, edges } = useMemo(buildGraph, []);
  const groupRef = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);
  const nodeMeshRef = useRef<THREE.InstancedMesh>(null);
  const pulseMeshRef = useRef<THREE.InstancedMesh>(null);

  // Static line geometry for all edges (low alpha, threaded through scene).
  const lineGeometry = useMemo(() => {
    const positions = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      positions[i * 6 + 0] = nodes[a].pos.x;
      positions[i * 6 + 1] = nodes[a].pos.y;
      positions[i * 6 + 2] = nodes[a].pos.z;
      positions[i * 6 + 3] = nodes[b].pos.x;
      positions[i * 6 + 4] = nodes[b].pos.y;
      positions[i * 6 + 5] = nodes[b].pos.z;
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [edges, nodes]);

  // Initial pulses spread across edges.
  const pulses = useMemo<Pulse[]>(() => {
    return Array.from({ length: PULSE_COUNT }, () => ({
      edge: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      speed: 0.35 + Math.random() * 0.45,
      reverse: Math.random() > 0.5,
    }));
  }, [edges.length]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    // Decay node activations.
    nodes.forEach((n) => {
      if (n.activeFor > 0) n.activeFor = Math.max(0, n.activeFor - dt * 1.4);
    });

    // Advance pulses; on arrival, ignite the node and hop to a connected edge.
    pulses.forEach((p) => {
      p.t += dt * p.speed * (p.reverse ? -1 : 1);
      if (p.t >= 1 || p.t <= 0) {
        const [a, b] = edges[p.edge];
        const arrivedAt = p.t >= 1 ? b : a;
        nodes[arrivedAt].activeFor = 1;
        // Pick another edge that touches this node, prefer non-current.
        const candidates = edges
          .map((e, idx) => ({ idx, e }))
          .filter(({ idx, e }) => idx !== p.edge && (e[0] === arrivedAt || e[1] === arrivedAt));
        if (candidates.length) {
          const next = candidates[Math.floor(Math.random() * candidates.length)];
          p.edge = next.idx;
          p.reverse = next.e[1] === arrivedAt;
          p.t = p.reverse ? 1 : 0;
          p.speed = 0.35 + Math.random() * 0.55;
        } else {
          // Dead end — bounce.
          p.reverse = !p.reverse;
          p.t = THREE.MathUtils.clamp(p.t, 0, 1);
        }
      }
    });

    // Update node instances (color reflects activation).
    if (nodeMeshRef.current) {
      nodes.forEach((n, i) => {
        dummy.position.copy(n.pos);
        const breath = 1 + 0.05 * Math.sin(t * 0.8 + i);
        dummy.scale.setScalar(breath * (1 + n.activeFor * 0.6));
        dummy.updateMatrix();
        nodeMeshRef.current!.setMatrixAt(i, dummy.matrix);
        tempColor.copy(NODE_BASE_COLOR).lerp(NODE_ACTIVE_COLOR, n.activeFor);
        nodeMeshRef.current!.setColorAt(i, tempColor);
      });
      nodeMeshRef.current.instanceMatrix.needsUpdate = true;
      if (nodeMeshRef.current.instanceColor) nodeMeshRef.current.instanceColor.needsUpdate = true;
    }

    // Update pulse positions.
    if (pulseMeshRef.current) {
      pulses.forEach((p, i) => {
        const [a, b] = edges[p.edge];
        const tt = THREE.MathUtils.clamp(p.t, 0, 1);
        dummy.position.lerpVectors(nodes[a].pos, nodes[b].pos, tt);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        pulseMeshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      pulseMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    // Slow group rotation.
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.18;
      groupRef.current.rotation.x = Math.sin(t * 0.17) * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#7da3ff"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      <instancedMesh ref={nodeMeshRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[0.06, 14, 14]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      <instancedMesh ref={pulseMeshRef} args={[undefined, undefined, PULSE_COUNT]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#ffd9ad" toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

export function NeuralNetworkAnimation() {
  return (
    <LabCanvas camera={[0, 0, 5.6]} fov={42}>
      <NetworkScene />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.95} luminanceThreshold={0.18} luminanceSmoothing={0.4} mipmapBlur />
      </EffectComposer>
    </LabCanvas>
  );
}
