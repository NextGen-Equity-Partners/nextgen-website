"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Environment, Text } from "@react-three/drei";
import * as THREE from "three";

const NODE_COUNT = 24;
const NEIGHBOUR_RADIUS = 1.7;
// Warm-to-cool depth gradient — deep blue-violet back, mulberry, brand
// orange mid, hot peach, bright sun-peach front.
const COL_BACK = new THREE.Color("#0d1430");
const COL_DEEP = new THREE.Color("#3a1a2a");
const COL_MID = new THREE.Color("#FB724E");
const COL_HOT = new THREE.Color("#FFA070");
const COL_FRONT = new THREE.Color("#FFE0B5");
const NODE_ACTIVE = new THREE.Color("#FFE3C2");
// Edge colors before/during a flash — warm baseline lifts to a near-white
// cream peak when a synapse fires.
const EDGE_DIM = new THREE.Color(0.18, 0.10, 0.06);
const EDGE_ACTIVE = new THREE.Color(2.6, 2.2, 1.6);

// Average synapse firings per second across the whole network.
const FIRE_RATE = 3.5;
// How fast an edge's flash fades back to dim (per second).
const EDGE_DECAY = 3.2;

type Node = { pos: THREE.Vector3; activeFor: number };
type Edge = [number, number];

function buildGraph() {
  const nodes: Node[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 1.55 + (Math.random() - 0.5) * 0.45;
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

function NetworkScene({
  bottomLightRef,
}: {
  bottomLightRef?: React.RefObject<THREE.PointLight | null>;
}) {
  const { nodes, edges } = useMemo(buildGraph, []);
  const groupRef = useRef<THREE.Group>(null);
  const tempColor = useMemo(() => new THREE.Color(), []);
  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const tempQuat = useMemo(() => new THREE.Quaternion(), []);

  // Per-edge flash intensity (0 = dim baseline, 1 = peak fire).
  const edgeActivations = useMemo(
    () => new Float32Array(edges.length),
    [edges.length],
  );

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const nodeMeshRef = useRef<THREE.InstancedMesh>(null);

  // Custom sphere geometry with vertex colors painted across two axes —
  // each individual bubble carries a cool/warm gradient (left-right) and
  // a top/bottom dim → bright shift, so every glass sphere shows internal
  // color flow instead of being uniformly tinted.
  const sphereGeo = useMemo(() => {
    const g = new THREE.SphereGeometry(0.18, 32, 32);
    const pos = g.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const tx = (x + 0.18) / 0.36;
      const ty = (y + 0.18) / 0.36;
      // Left -> right: cool blue side to warm peach side.
      // Bottom -> top: brighter (lit by the under-light) to dim (in shadow).
      const r = (0.65 + 0.35 * tx) * (1.0 - 0.18 * ty);
      const gC = (0.72 + 0.28 * tx) * (1.0 - 0.22 * ty);
      const b = (1.0 - 0.42 * tx) * (1.0 - 0.05 * ty);
      colors[i * 3 + 0] = r;
      colors[i * 3 + 1] = gC;
      colors[i * 3 + 2] = b;
    }
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, []);


  const lineGeometry = useMemo(() => {
    const positions = new Float32Array(edges.length * 6);
    const colors = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      positions[i * 6 + 0] = nodes[a].pos.x;
      positions[i * 6 + 1] = nodes[a].pos.y;
      positions[i * 6 + 2] = nodes[a].pos.z;
      positions[i * 6 + 3] = nodes[b].pos.x;
      positions[i * 6 + 4] = nodes[b].pos.y;
      positions[i * 6 + 5] = nodes[b].pos.z;
      for (let v = 0; v < 2; v++) {
        colors[i * 6 + v * 3 + 0] = EDGE_DIM.r;
        colors[i * 6 + v * 3 + 1] = EDGE_DIM.g;
        colors[i * 6 + v * 3 + 2] = EDGE_DIM.b;
      }
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [edges, nodes]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.06;
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.14;
      tempQuat.setFromEuler(groupRef.current.rotation);
    }

    // Animate the under-light so the highlights on the glass spheres slide.
    // Position drifts slowly side-to-side and forward-back; intensity breathes
    // — together this makes the reflections on every bubble feel alive.
    const bottomLight = bottomLightRef?.current;
    if (bottomLight) {
      bottomLight.position.x = Math.sin(t * 0.28) * 1.6;
      bottomLight.position.z = 1.4 + Math.cos(t * 0.22) * 0.9;
      bottomLight.position.y = -2.4 + Math.sin(t * 0.4) * 0.15;
      bottomLight.intensity = 4.2 + Math.sin(t * 0.65) * 0.7;
    }

    // Decay node activations.
    nodes.forEach((n) => {
      if (n.activeFor > 0) n.activeFor = Math.max(0, n.activeFor - dt * 1.6);
    });

    // Fire random synapses. Probability per frame = FIRE_RATE * dt.
    let firingsThisFrame = FIRE_RATE * dt;
    while (firingsThisFrame > 0) {
      if (Math.random() < firingsThisFrame) {
        const idx = Math.floor(Math.random() * edges.length);
        edgeActivations[idx] = 1;
        // Light up the two connected nodes too — the bubble briefly catches
        // the synaptic flash.
        const [a, b] = edges[idx];
        nodes[a].activeFor = Math.max(nodes[a].activeFor, 0.85);
        nodes[b].activeFor = Math.max(nodes[b].activeFor, 0.85);
      }
      firingsThisFrame -= 1;
    }

    // Decay edge activations.
    for (let i = 0; i < edges.length; i++) {
      if (edgeActivations[i] > 0) {
        edgeActivations[i] = Math.max(0, edgeActivations[i] - dt * EDGE_DECAY);
      }
    }

    // Update edge vertex colors from activations.
    const colorAttr = lineGeometry.attributes.color as THREE.BufferAttribute;
    const colorArr = colorAttr.array as Float32Array;
    for (let i = 0; i < edges.length; i++) {
      const a = edgeActivations[i];
      const r = EDGE_DIM.r + (EDGE_ACTIVE.r - EDGE_DIM.r) * a;
      const g = EDGE_DIM.g + (EDGE_ACTIVE.g - EDGE_DIM.g) * a;
      const b = EDGE_DIM.b + (EDGE_ACTIVE.b - EDGE_DIM.b) * a;
      for (let v = 0; v < 2; v++) {
        colorArr[i * 6 + v * 3 + 0] = r;
        colorArr[i * 6 + v * 3 + 1] = g;
        colorArr[i * 6 + v * 3 + 2] = b;
      }
    }
    colorAttr.needsUpdate = true;

    if (nodeMeshRef.current) {
      nodes.forEach((n, i) => {
        dummy.position.copy(n.pos);
        const speed = 0.42 + (i % 6) * 0.06;
        const breath =
          1 +
          0.07 * Math.sin(t * speed + i * 1.3) +
          0.03 * Math.sin(t * speed * 1.7 + i * 0.8);
        dummy.scale.setScalar(breath);
        dummy.updateMatrix();
        nodeMeshRef.current!.setMatrixAt(i, dummy.matrix);

        // Five-stop warm-cool depth ramp + per-bubble stable variance.
        tempVec.copy(n.pos).applyQuaternion(tempQuat);
        const depthFactor = THREE.MathUtils.clamp((tempVec.z + 1.6) / 3.2, 0, 1);
        const stage = depthFactor * 4;
        const idx = Math.min(3, Math.floor(stage));
        const local = stage - idx;
        const palette = [COL_BACK, COL_DEEP, COL_MID, COL_HOT, COL_FRONT];
        tempColor.copy(palette[idx]).lerp(palette[idx + 1], local);
        const variance = ((i * 7919) % 100) / 100 - 0.5;
        tempColor.r = THREE.MathUtils.clamp(tempColor.r * (1 + variance * 0.12), 0, 1);
        tempColor.g = THREE.MathUtils.clamp(tempColor.g * (1 + variance * 0.06), 0, 1);
        tempColor.b = THREE.MathUtils.clamp(tempColor.b * (1 - variance * 0.10), 0, 1);
        tempColor.lerp(NODE_ACTIVE, n.activeFor * 0.7);
        nodeMeshRef.current!.setColorAt(i, tempColor);
      });
      nodeMeshRef.current.instanceMatrix.needsUpdate = true;
      if (nodeMeshRef.current.instanceColor) nodeMeshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0.55, 0.3, 0]} scale={0.85}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </lineSegments>

      <instancedMesh
        ref={nodeMeshRef}
        args={[sphereGeo, undefined, NODE_COUNT]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          vertexColors
          transparent
          opacity={1}
          transmission={0.95}
          roughness={0.04}
          thickness={1.0}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0}
          specularIntensity={1}
          specularColor="#ffffff"
          iridescence={0.85}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[200, 500]}
          attenuationColor="#FF9A65"
          attenuationDistance={1.9}
          emissive="#FB724E"
          emissiveIntensity={0.09}
          envMapIntensity={2.2}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  );
}

// Stable random binary stream — generated once. Each line gets a random
// length so the right-aligned block has a ragged left edge.
function generateBinaryRows(rows = 95, minLen = 24, maxLen = 90) {
  let seed = 1234567;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const lines: string[] = [];
  for (let r = 0; r < rows; r++) {
    const len = Math.floor(minLen + rand() * (maxLen - minLen));
    let line = "";
    for (let c = 0; c < len; c++) {
      line += rand() > 0.5 ? "1" : "0";
    }
    lines.push(line);
  }
  return lines.join("\n");
}

// "Writers" — short binary fragments that get typed in like code being
// written, each at its own row and stagger. Stable across renders.
function generateWriters() {
  let seed = 7654321;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: 7 }, () => {
    const len = 6 + Math.floor(rand() * 9); // 6..14 chars
    let text = "";
    for (let i = 0; i < len; i++) text += rand() > 0.5 ? "1" : "0";
    return {
      top: 6 + rand() * 86,
      right: 1 + rand() * 38,
      text,
      delay: rand() * 14,
      duration: 8 + rand() * 6,
    };
  });
}

export function HeroNeuralNetwork() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const bottomLightRef = useRef<THREE.PointLight | null>(null);
  const binaryText = useMemo(() => generateBinaryRows(), []);
  const writers = useMemo(() => generateWriters(), []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "200px 0px", threshold: 0 },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="hero-network-stage" aria-hidden="true">
      <div className="hero-network-binary">
        <pre className="stream">{binaryText}</pre>
        {writers.map((w, i) => (
          <span
            key={i}
            className="writer"
            style={{
              top: `${w.top}%`,
              right: `${w.right}%`,
              animationDelay: `${w.delay}s`,
              animationDuration: `${w.duration}s`,
            }}
          >
            <span className="writer-text">{w.text}</span>
            <span className="writer-caret">▌</span>
          </span>
        ))}
      </div>
      <Canvas
        shadows
        dpr={[1, 1.25]}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 4.6], fov: 44 }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          scene.fog = null;
        }}
      >
        <ambientLight intensity={0.12} />
        <directionalLight
          castShadow
          position={[2.5, 4.5, 3.5]}
          intensity={1.5}
          color="#FFE0BE"
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={0.1}
          shadow-camera-far={14}
          shadow-camera-left={-3}
          shadow-camera-right={3}
          shadow-camera-top={3}
          shadow-camera-bottom={-3}
          shadow-bias={-0.0005}
        />
        {/* Primary light source — sits below the cluster (the NextGen
            wordmark direction) and drifts slightly each frame, so the
            specular reflections on the glass spheres slide around. */}
        <pointLight
          ref={bottomLightRef}
          position={[0, -2.4, 1.4]}
          intensity={4.2}
          color="#FFB07A"
          distance={9}
          decay={1.6}
        />
        <pointLight position={[-3, -0.5, 2.2]} intensity={1.0} color="#7ab8ff" />
        {/* Custom env map — re-rendered every frame so the NextGen text
            and the colored accent zones are picked up as live reflections
            on the glass spheres as they rotate past. */}
        <Environment frames={Infinity} resolution={256} background={false}>
          {/* Deep warm backdrop sphere — gives the glass a grounded warm tone */}
          <mesh scale={50}>
            <sphereGeometry args={[1, 24, 24]} />
            <meshBasicMaterial color="#150804" side={THREE.BackSide} toneMapped={false} />
          </mesh>
          {/* NextGen wordmark, glowing peach, sits below the cluster — it
              passes across the bubbles' reflections as the group rotates. */}
          <Text
            position={[0, -1.2, 0]}
            fontSize={0.42}
            color="#FFB07A"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.005}
            outlineColor="#FB724E"
            letterSpacing={0.04}
          >
            NextGen
          </Text>
          {/* Warm bottom band — strongest under-glow, the brand light source */}
          <mesh position={[0, -2.4, 0]}>
            <planeGeometry args={[6, 1.2]} />
            <meshBasicMaterial color="#FB724E" toneMapped={false} />
          </mesh>
          {/* Cool cyan accent on the upper left for chromatic contrast */}
          <mesh position={[-2.6, 1.6, -1.8]}>
            <sphereGeometry args={[0.55, 16, 16]} />
            <meshBasicMaterial color="#5ea9ff" toneMapped={false} />
          </mesh>
          {/* Warm cream highlight on the upper right */}
          <mesh position={[2.2, 1.4, 1.5]}>
            <sphereGeometry args={[0.45, 16, 16]} />
            <meshBasicMaterial color="#FFE0BE" toneMapped={false} />
          </mesh>
          {/* Subtle deep-blue counter-light from the back */}
          <mesh position={[0, 0.5, -3.5]}>
            <sphereGeometry args={[0.7, 16, 16]} />
            <meshBasicMaterial color="#284878" toneMapped={false} />
          </mesh>
        </Environment>
        <NetworkScene bottomLightRef={bottomLightRef} />
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.85} luminanceThreshold={0.22} luminanceSmoothing={0.5} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

