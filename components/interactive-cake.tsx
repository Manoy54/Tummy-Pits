"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float, Billboard, Image } from "@react-three/drei";
import * as THREE from "three";
import confetti from "canvas-confetti";

// Colors based on reference image
const LIGHT_PURPLE = "#c7b8d8";
const DARK_PURPLE = "#8766a8";
const SCROLL_COLOR = "#5c3d7a";
const SILVER = "#e0e0e0";
const PEARL = "#ffffff";
const ROSE_COLOR = "#7a5099";

// Dimensions
const TIER1_R = 2.4, TIER1_H = 1.6;
const TIER2_R = 1.9, TIER2_H = 1.6;
const TIER3_R = 1.4, TIER3_H = 1.6;

const TIER1_Y = 0;
const TIER2_Y = TIER1_Y + TIER1_H / 2 + TIER2_H / 2;
const TIER3_Y = TIER2_Y + TIER2_H / 2 + TIER3_H / 2;

// --- Subcomponents ---

function Flame({ isBlownOut }: { isBlownOut: boolean }) {
  const flameGroupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  // Store the time when it was blown out for the animation
  const blowoutTimeRef = useRef<number | null>(null);

  useFrame((state) => {
    if (flameGroupRef.current && !isBlownOut) {
      // Flickering effect
      flameGroupRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 20) * 0.05;
      flameGroupRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 25) * 0.1;
      flameGroupRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 20) * 0.05;
      // Gentle wavering
      flameGroupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 5) * 0.05;
      flameGroupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 6) * 0.05;
    } else if (flameGroupRef.current && isBlownOut) {
      if (blowoutTimeRef.current === null) {
         blowoutTimeRef.current = state.clock.elapsedTime;
      }
      const timeSinceBlowout = state.clock.elapsedTime - blowoutTimeRef.current;
      
      // Wind blowing effect: lean over strongly and shrink quickly
      const targetRotationZ = -Math.PI / 3; // lean right
      flameGroupRef.current.rotation.z = THREE.MathUtils.lerp(flameGroupRef.current.rotation.z, targetRotationZ, 0.15);
      
      // Shrink to 0
      const scale = Math.max(0, 1 - timeSinceBlowout * 4); // Disappear in 0.25s
      flameGroupRef.current.scale.setScalar(scale);
    }

    if (lightRef.current && !isBlownOut) {
      lightRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 15) * 0.3;
    } else if (lightRef.current && isBlownOut) {
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, 0, 0.2);
    }
  });

  return (
    <group position={[0, TIER3_Y + TIER3_H / 2 + 1.35, 0]}>
      <pointLight ref={lightRef} color="#ffaa00" distance={15} decay={1.5} intensity={4} />
      
      <group ref={flameGroupRef}>
        {/* Outer Orange Flame */}
        <mesh position={[0, 0.1, 0]}>
          <coneGeometry args={[0.06, 0.2, 16]} />
          <meshBasicMaterial color="#ff7700" transparent opacity={0.8} />
        </mesh>
        
        {/* Inner Yellow/White Flame */}
        <mesh position={[0, 0.08, 0]}>
          <coneGeometry args={[0.03, 0.12, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>

        {/* Soft Radiance Glow 1 */}
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshBasicMaterial color="#ffcc00" transparent opacity={0.2} depthWrite={false} />
        </mesh>

        {/* Soft Radiance Glow 2 (Larger, more subtle) */}
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#ff8800" transparent opacity={0.08} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

function Smoke({ isBlownOut }: { isBlownOut: boolean }) {
  const particles = useMemo(() => Array.from({ length: 15 }), []);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (isBlownOut && groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        if (mesh.userData.active) {
          mesh.position.y += delta * (0.5 + Math.random() * 0.5);
          mesh.position.x += Math.sin(state.clock.elapsedTime * 2 + i) * delta * 0.5;
          mesh.scale.setScalar(Math.max(0, mesh.scale.x - delta * 0.5));
          (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, (mesh.material as THREE.MeshBasicMaterial).opacity - delta);
        }
      });
    }
  });

  if (!isBlownOut) return null;

  return (
    <group ref={groupRef} position={[0, TIER3_Y + TIER3_H / 2 + 2, 0]}>
      {particles.map((_, i) => (
        <mesh
          key={i}
          position={[(Math.random() - 0.5) * 0.5, Math.random() * 0.5, (Math.random() - 0.5) * 0.5]}
          userData={{ active: true }}
        >
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#aaaaaa" transparent opacity={0.6} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function PearlRing({ y, radius, count, scale = 1 }: { y: number, radius: number, count: number, scale?: number }) {
  const pearls = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
    });
  }, [y, radius, count]);

  return (
    <group>
      {pearls.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow receiveShadow>
          <sphereGeometry args={[0.07 * scale, 16, 16]} />
          <meshPhysicalMaterial color={PEARL} roughness={0.1} clearcoat={1} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

function SilverDragees({ radius, yCenter, height, count }: { radius: number, yCenter: number, height: number, count: number }) {
  const dragees = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const y = yCenter - height / 2 + 0.2 + Math.random() * (height - 0.4);
      return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
    });
  }, [radius, yCenter, height, count]);

  return (
    <group>
      {dragees.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow receiveShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshPhysicalMaterial color={SILVER} roughness={0.1} metalness={0.8} clearcoat={1} />
        </mesh>
      ))}
    </group>
  );
}

function Scrollwork({ radius, yCenter }: { radius: number, yCenter: number }) {
  // A few decorative scroll accents placed around the front and sides
  const scrolls = useMemo(() => {
    const items: { position: [number, number, number]; rotation: [number, number, number] }[] = [];
    const angles = [Math.PI / 4, Math.PI * 0.75, -Math.PI / 4, -Math.PI * 0.75]; // Front right, front left, back right, back left
    
    angles.forEach(angle => {
      // Offset slightly outward so it embeds cleanly in the side
      const r = radius; 
      items.push({
        position: [Math.cos(angle) * r, yCenter, Math.sin(angle) * r] as [number, number, number],
        rotation: [0, -angle + Math.PI/2, 0] as [number, number, number] // Point normal outward
      });
    });
    return items;
  }, [radius, yCenter]);

  return (
    <group>
      {scrolls.map((s, i) => (
        <group key={i} position={s.position} rotation={s.rotation}>
          {/* Main big scroll */}
          <mesh position={[0, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.3, 0.02, 16, 32, Math.PI * 1.5]} />
            <meshPhysicalMaterial color={SCROLL_COLOR} roughness={0.3} />
          </mesh>
          {/* Small inner scroll */}
          <mesh position={[0.3, -0.5, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <torusGeometry args={[0.15, 0.02, 16, 32, Math.PI * 1.2]} />
            <meshPhysicalMaterial color={SCROLL_COLOR} roughness={0.3} />
          </mesh>
          {/* Small top scroll */}
          <mesh position={[-0.3, 0.1, 0]} rotation={[0, 0, -Math.PI / 1.5]}>
            <torusGeometry args={[0.15, 0.02, 16, 32, Math.PI * 1.2]} />
            <meshPhysicalMaterial color={SCROLL_COLOR} roughness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function PurpleRose({ position, rotation, scale = 1 }: { position: [number, number, number], rotation: [number, number, number], scale?: number }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Center core */}
      <mesh castShadow receiveShadow>
         <dodecahedronGeometry args={[0.3, 1]} />
         <meshPhysicalMaterial color={ROSE_COLOR} roughness={0.5} clearcoat={0.1} />
      </mesh>
      {/* Outer petals (stylized overlapping spheres) */}
      {Array.from({length: 6}).map((_, i) => (
        <mesh key={i} position={[Math.cos(i*Math.PI/3)*0.15, 0.05, Math.sin(i*Math.PI/3)*0.15]} rotation={[0.4, i*Math.PI/3, 0]} castShadow receiveShadow>
           <sphereGeometry args={[0.25, 16, 16]} />
           <meshPhysicalMaterial color={ROSE_COLOR} roughness={0.5} clearcoat={0.1} />
        </mesh>
      ))}
    </group>
  );
}

function WhiteFlower({ position, rotation, scale = 1 }: { position: [number, number, number], rotation: [number, number, number], scale?: number }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
       {/* center */}
       <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
         <sphereGeometry args={[0.08, 16, 16]} />
         <meshPhysicalMaterial color="#fef08a" roughness={0.4} />
       </mesh>
       {/* petals */}
       {Array.from({length: 5}).map((_, i) => (
        <mesh key={i} position={[Math.cos(i*Math.PI*0.4)*0.12, 0, Math.sin(i*Math.PI*0.4)*0.12]} rotation={[0, -i*Math.PI*0.4, 0]} castShadow receiveShadow>
           <cylinderGeometry args={[0.1, 0.1, 0.04, 16]} />
           <meshPhysicalMaterial color={PEARL} roughness={0.3} clearcoat={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Leaf({ position, rotation, scale = 1 }: { position: [number, number, number], rotation: [number, number, number], scale?: number }) {
   return (
      <mesh position={position} rotation={rotation} scale={[scale * 0.4, scale * 0.05, scale * 1.2]} castShadow receiveShadow>
         <sphereGeometry args={[1, 16, 16]} />
         <meshPhysicalMaterial color={PEARL} roughness={0.4} />
      </mesh>
   );
}

function FloralCascade() {
  return (
    <group>
      {/* Top tier cluster */}
      <PurpleRose position={[0.4, TIER3_Y + TIER3_H/2 + 0.3, 0.4]} rotation={[0.2, 0, 0]} scale={1.2} />
      <WhiteFlower position={[0.8, TIER3_Y + TIER3_H/2 + 0.1, 0]} rotation={[0, 0.5, 0.2]} scale={1.5} />
      <WhiteFlower position={[0.1, TIER3_Y + TIER3_H/2 + 0.2, 0.9]} rotation={[0.2, 0, 0.4]} scale={1.2} />
      <Leaf position={[1.1, TIER3_Y + TIER3_H/2 + 0.05, 0.3]} rotation={[0, -0.5, -0.3]} scale={0.4} />
      <Leaf position={[-0.2, TIER3_Y + TIER3_H/2 + 0.1, 1.2]} rotation={[0, 1.5, -0.2]} scale={0.4} />

      {/* Wrapping down middle tier */}
      <PurpleRose position={[TIER2_R + 0.1, TIER2_Y + 0.4, 0.5]} rotation={[0, Math.PI/2, Math.PI/4]} scale={1.4} />
      <WhiteFlower position={[TIER2_R + 0.1, TIER2_Y - 0.1, 0.9]} rotation={[0, Math.PI/4, Math.PI/3]} scale={1.3} />
      <WhiteFlower position={[TIER2_R - 0.2, TIER2_Y + 0.8, 1.2]} rotation={[0, Math.PI/3, Math.PI/5]} scale={1.2} />
      <Leaf position={[TIER2_R + 0.2, TIER2_Y + 0.8, 0]} rotation={[Math.PI/2, -0.5, 0]} scale={0.5} />

      {/* Wrapping down bottom tier */}
      <PurpleRose position={[TIER1_R * 0.8, TIER1_Y + 0.2, TIER1_R * 0.6]} rotation={[0, Math.PI/4, Math.PI/6]} scale={1.5} />
      <WhiteFlower position={[TIER1_R * 0.9, TIER1_Y - 0.3, TIER1_R * 0.8]} rotation={[0, Math.PI/4, Math.PI/4]} scale={1.4} />
      <WhiteFlower position={[TIER1_R * 0.6, TIER1_Y + 0.6, TIER1_R * 0.85]} rotation={[0, Math.PI/3, Math.PI/4]} scale={1.2} />
      <Leaf position={[TIER1_R * 0.9, TIER1_Y - 0.5, TIER1_R * 0.4]} rotation={[0, 0, Math.PI/4]} scale={0.5} />
      <Leaf position={[TIER1_R * 0.4, TIER1_Y - 0.6, TIER1_R * 0.9]} rotation={[0, Math.PI/2, Math.PI/6]} scale={0.5} />

      {/* --- New Left Side Cascade --- */}
      {/* Left Top Tier */}
      <PurpleRose position={[-0.7, TIER3_Y + TIER3_H/2 + 0.2, 0.5]} rotation={[0.1, -Math.PI/4, -0.2]} scale={1.1} />
      <WhiteFlower position={[-1.0, TIER3_Y + TIER3_H/2 + 0.05, 0.2]} rotation={[0, -0.5, -0.3]} scale={1.3} />
      <Leaf position={[-1.0, TIER3_Y + TIER3_H/2 - 0.1, 0.5]} rotation={[0, -1.2, 0.2]} scale={0.4} />

      {/* Left Middle Tier (Near Kuromi) */}
      <PurpleRose position={[-TIER2_R + 0.2, TIER2_Y - 0.3, 0.8]} rotation={[-0.2, -Math.PI/3, Math.PI/5]} scale={1.3} />
      <WhiteFlower position={[-TIER2_R - 0.1, TIER2_Y + 0.4, 0.5]} rotation={[0.1, -Math.PI/2, Math.PI/4]} scale={1.2} />
      <Leaf position={[-TIER2_R - 0.2, TIER2_Y + 0.2, 0.2]} rotation={[-Math.PI/4, -0.8, -0.2]} scale={0.5} />

      {/* Left Bottom Tier (Near Peko-chan) */}
      <PurpleRose position={[-TIER1_R * 0.8, TIER1_Y - 0.2, 0.9]} rotation={[0.2, -Math.PI/4, -Math.PI/6]} scale={1.4} />
      <WhiteFlower position={[-TIER1_R * 0.9, TIER1_Y + 0.5, 0.5]} rotation={[-0.1, -Math.PI/3, Math.PI/5]} scale={1.5} />
      <WhiteFlower position={[-TIER1_R * 0.6, TIER1_Y - 0.5, 1.3]} rotation={[0.2, -Math.PI/6, -0.2]} scale={1.2} />
      <Leaf position={[-TIER1_R * 0.8, TIER1_Y + 0.7, 0.3]} rotation={[Math.PI/6, -1.0, -0.3]} scale={0.5} />
    </group>
  );
}

function HelloKittyFigure({ position, rotation, scale = 1 }: { position: [number, number, number], rotation: [number, number, number], scale?: number }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Body / Red Dress */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <coneGeometry args={[0.18, 0.3, 32]} />
        <meshPhysicalMaterial color="#cc0000" roughness={0.8} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.15, 0.2, 0]} rotation={[0, 0, 0.5]} castShadow>
        <capsuleGeometry args={[0.04, 0.08, 16, 16]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.6} />
      </mesh>
      <mesh position={[0.15, 0.2, 0]} rotation={[0, 0, -0.5]} castShadow>
        <capsuleGeometry args={[0.04, 0.08, 16, 16]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.6} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.45, 0]} castShadow scale={[1.3, 1, 1.1]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.5} />
      </mesh>
      {/* Ears */}
      <mesh position={[-0.15, 0.62, 0]} rotation={[0, 0, 0.2]} castShadow>
        <coneGeometry args={[0.08, 0.18, 16]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.5} />
      </mesh>
      <mesh position={[0.15, 0.62, 0]} rotation={[0, 0, -0.2]} castShadow>
        <coneGeometry args={[0.08, 0.18, 16]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.5} />
      </mesh>
      {/* Red Bow */}
      <group position={[0.16, 0.58, 0.12]} rotation={[0.2, 0, -0.2]}>
        <mesh position={[-0.06, 0, 0]} castShadow>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshPhysicalMaterial color="#cc0000" roughness={0.4} />
        </mesh>
        <mesh position={[0.06, 0, 0]} castShadow>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshPhysicalMaterial color="#cc0000" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.02]} castShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshPhysicalMaterial color="#cc0000" roughness={0.4} />
        </mesh>
      </group>
      {/* Eyes */}
      <mesh position={[-0.1, 0.45, 0.23]} castShadow scale={[1, 1.4, 1]}>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0.1, 0.45, 0.23]} castShadow scale={[1, 1.4, 1]}>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* Nose */}
      <mesh position={[0, 0.4, 0.24]} castShadow scale={[1.2, 0.8, 1]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color="#ffcc00" />
      </mesh>
      {/* Whiskers */}
      {[0.42, 0.46, 0.50].map((y, i) => (
        <group key={i}>
          <mesh position={[-0.22, y, 0.15]} rotation={[0, 0, (i-1)*0.2]} castShadow>
            <cylinderGeometry args={[0.003, 0.003, 0.08]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
          <mesh position={[0.22, y, 0.15]} rotation={[0, 0, -(i-1)*0.2]} castShadow>
            <cylinderGeometry args={[0.003, 0.003, 0.08]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function HachiwareFigure({ position, rotation, scale = 1 }: { position: [number, number, number], rotation: [number, number, number], scale?: number }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Body */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.8} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.35, 0]} castShadow scale={[1.3, 1.1, 1.2]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.8} />
      </mesh>
      {/* Blue Cap (Hachiware Pattern) */}
      <mesh position={[0, 0.42, 0]} castShadow scale={[1.31, 0.8, 1.21]}>
        <sphereGeometry args={[0.2, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
        <meshPhysicalMaterial color="#6699cc" roughness={0.8} />
      </mesh>
      {/* Blue Ears */}
      <mesh position={[-0.18, 0.52, 0]} castShadow rotation={[0, 0, 0.2]}>
        <coneGeometry args={[0.07, 0.15, 16]} />
        <meshPhysicalMaterial color="#6699cc" roughness={0.8} />
      </mesh>
      <mesh position={[0.18, 0.52, 0]} castShadow rotation={[0, 0, -0.2]}>
        <coneGeometry args={[0.07, 0.15, 16]} />
        <meshPhysicalMaterial color="#6699cc" roughness={0.8} />
      </mesh>
      {/* Big Eyes */}
      <group position={[-0.08, 0.35, 0.22]}>
        <mesh castShadow scale={[1, 1.2, 1]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0.005, 0.01, 0.02]} castShadow>
          <sphereGeometry args={[0.008, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
      <group position={[0.08, 0.35, 0.22]}>
        <mesh castShadow scale={[1, 1.2, 1]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[-0.005, 0.01, 0.02]} castShadow>
          <sphereGeometry args={[0.008, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
      {/* Blush Lines (Pink cheeks) */}
      <mesh position={[-0.14, 0.3, 0.2]} castShadow scale={[1.5, 0.8, 1]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#ff99cc" />
      </mesh>
      <mesh position={[0.14, 0.3, 0.2]} castShadow scale={[1.5, 0.8, 1]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#ff99cc" />
      </mesh>
      {/* Tiny W Mouth */}
      <mesh position={[-0.02, 0.3, 0.24]} rotation={[0, 0, 0.5]} castShadow>
        <capsuleGeometry args={[0.003, 0.015, 8, 8]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.02, 0.3, 0.24]} rotation={[0, 0, -0.5]} castShadow>
        <capsuleGeometry args={[0.003, 0.015, 8, 8]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      {/* Blue Tail */}
      <mesh position={[0.1, 0.1, -0.15]} rotation={[0.5, 0, -0.5]} castShadow>
        <capsuleGeometry args={[0.03, 0.1, 16, 16]} />
        <meshPhysicalMaterial color="#6699cc" roughness={0.8} />
      </mesh>
    </group>
  );
}

function KuromiFigure({ position, rotation, scale = 1 }: { position: [number, number, number], rotation: [number, number, number], scale?: number }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Body */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.14, 0.25, 16]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.7} />
      </mesh>
      {/* Jester Collar */}
      <group position={[0, 0.26, 0]}>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <mesh key={i} rotation={[1.2, i * Math.PI / 3, 0]} position={[Math.cos(i*Math.PI/3)*0.08, 0, Math.sin(i*Math.PI/3)*0.08]}>
            <coneGeometry args={[0.05, 0.12, 3]} />
            <meshPhysicalMaterial color="#1a1a1a" roughness={0.8} />
          </mesh>
        ))}
      </group>
      {/* Head Base (White) */}
      <mesh position={[0, 0.45, 0]} castShadow scale={[1.2, 1, 1.1]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.5} />
      </mesh>
      {/* Black Hood */}
      <mesh position={[0, 0.48, -0.02]} castShadow scale={[1.25, 1.1, 1.15]}>
        <sphereGeometry args={[0.2, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      {/* Pink Skull on Hood */}
      <group position={[0, 0.65, 0.18]} rotation={[0.2, 0, 0]}>
        <mesh castShadow scale={[1.2, 1, 1]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshPhysicalMaterial color="#ff99cc" roughness={0.6} />
        </mesh>
        <mesh position={[-0.015, 0.01, 0.035]} castShadow>
          <sphereGeometry args={[0.008, 8, 8]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0.015, 0.01, 0.035]} castShadow>
          <sphereGeometry args={[0.008, 8, 8]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>
      </group>
      {/* Jester Ears */}
      <mesh position={[-0.18, 0.65, -0.05]} rotation={[0, 0, 0.5]} castShadow>
        <coneGeometry args={[0.08, 0.3, 16]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      <mesh position={[0.18, 0.65, -0.05]} rotation={[0, 0, -0.5]} castShadow>
        <coneGeometry args={[0.08, 0.3, 16]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      {/* Ear Pompoms */}
      <mesh position={[-0.26, 0.78, -0.05]} castShadow>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshPhysicalMaterial color="#ff99cc" roughness={0.5} />
      </mesh>
      <mesh position={[0.26, 0.78, -0.05]} castShadow>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshPhysicalMaterial color="#ff99cc" roughness={0.5} />
      </mesh>
      {/* Tail */}
      <group position={[0, 0.15, -0.15]}>
        <mesh rotation={[1.5, 0, 0]} position={[0, 0.1, -0.1]}>
          <cylinderGeometry args={[0.01, 0.01, 0.2]} />
          <meshPhysicalMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 0.2, -0.2]} rotation={[0.5, 0, 0]}>
          <coneGeometry args={[0.04, 0.08, 4]} />
          <meshPhysicalMaterial color="#1a1a1a" />
        </mesh>
      </group>
      {/* Eyes & Nose (Winking) */}
      <mesh position={[-0.08, 0.42, 0.21]} castShadow scale={[1, 1.4, 1]}>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      {/* Winking eye */}
      <mesh position={[0.08, 0.42, 0.21]} rotation={[0, 0, 0.2]} castShadow>
        <boxGeometry args={[0.03, 0.005, 0.005]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.08, 0.42, 0.21]} rotation={[0, 0, -0.2]} castShadow>
        <boxGeometry args={[0.03, 0.005, 0.005]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      {/* Nose */}
      <mesh position={[0, 0.38, 0.22]} castShadow>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshBasicMaterial color="#ff99cc" />
      </mesh>
    </group>
  );
}

function PekoChanFigure({ position, rotation, scale = 1 }: { position: [number, number, number], rotation: [number, number, number], scale?: number }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Yellow Shirt */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.2, 16]} />
        <meshPhysicalMaterial color="#ffcc00" roughness={0.8} />
      </mesh>
      {/* Red Overalls */}
      <mesh position={[0, 0.12, 0.01]} castShadow>
        <cylinderGeometry args={[0.11, 0.13, 0.12, 16]} />
        <meshPhysicalMaterial color="#cc0000" roughness={0.8} />
      </mesh>
      {/* Overall Straps & Buttons */}
      <mesh position={[-0.06, 0.22, 0.09]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.02, 0.12, 0.01]} />
        <meshPhysicalMaterial color="#cc0000" roughness={0.8} />
      </mesh>
      <mesh position={[0.06, 0.22, 0.09]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.02, 0.12, 0.01]} />
        <meshPhysicalMaterial color="#cc0000" roughness={0.8} />
      </mesh>
      {/* Buttons */}
      <mesh position={[-0.06, 0.18, 0.11]} castShadow>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshPhysicalMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.06, 0.18, 0.11]} castShadow>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshPhysicalMaterial color="#ffffff" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.42, 0]} castShadow scale={[1.2, 1, 1.1]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshPhysicalMaterial color="#ffddcc" roughness={0.4} />
      </mesh>
      {/* Hair (Brown cap & bangs) */}
      <mesh position={[0, 0.46, 0]} castShadow scale={[1.25, 1.05, 1.15]}>
        <sphereGeometry args={[0.2, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshPhysicalMaterial color="#4a2511" roughness={0.9} />
      </mesh>
      {/* Pigtails */}
      <mesh position={[-0.22, 0.45, -0.05]} castShadow rotation={[0, 0, 0.5]}>
        <coneGeometry args={[0.06, 0.15, 16]} />
        <meshPhysicalMaterial color="#4a2511" roughness={0.9} />
      </mesh>
      <mesh position={[0.22, 0.45, -0.05]} castShadow rotation={[0, 0, -0.5]}>
        <coneGeometry args={[0.06, 0.15, 16]} />
        <meshPhysicalMaterial color="#4a2511" roughness={0.9} />
      </mesh>
      {/* Red Bows */}
      <mesh position={[-0.2, 0.5, -0.05]} castShadow scale={[1.5, 1, 1]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshPhysicalMaterial color="#cc0000" />
      </mesh>
      <mesh position={[0.2, 0.5, -0.05]} castShadow scale={[1.5, 1, 1]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshPhysicalMaterial color="#cc0000" />
      </mesh>
      {/* Eyes */}
      <group position={[-0.08, 0.43, 0.2]}>
        <mesh castShadow scale={[1, 1.2, 1]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[-0.005, 0.005, 0.015]} castShadow>
          <sphereGeometry args={[0.006, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
      <group position={[0.08, 0.43, 0.2]}>
        <mesh castShadow scale={[1, 1.2, 1]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[-0.005, 0.005, 0.015]} castShadow>
          <sphereGeometry args={[0.006, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
      {/* Nose */}
      <mesh position={[0, 0.38, 0.21]} castShadow>
        <sphereGeometry args={[0.008, 16, 16]} />
        <meshPhysicalMaterial color="#e6af98" />
      </mesh>
      {/* Tongue Sticking Out */}
      <mesh position={[0.04, 0.34, 0.2]} castShadow rotation={[0.2, 0.2, 0]} scale={[1, 1.3, 0.5]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#ff3333" />
      </mesh>
    </group>
  );
}

function SnoopyFigure({ position, rotation, scale = 1 }: { position: [number, number, number], rotation: [number, number, number], scale?: number }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Body */}
      <mesh position={[0, 0.15, 0]} castShadow scale={[0.9, 1, 0.9]}>
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.8} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.4, 0.08]} castShadow scale={[0.9, 1, 1.4]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.8} />
      </mesh>
      {/* Snout/Nose */}
      <mesh position={[0, 0.45, 0.32]} castShadow>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      {/* Floppy Ears */}
      <mesh position={[-0.15, 0.35, 0]} castShadow scale={[0.3, 1, 0.5]} rotation={[0, 0.2, 0.4]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      <mesh position={[0.15, 0.35, 0]} castShadow scale={[0.3, 1, 0.5]} rotation={[0, -0.2, -0.4]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      {/* Sleepy Eyes */}
      <mesh position={[-0.06, 0.48, 0.18]} rotation={[0.2, 0, -0.2]} castShadow>
        <boxGeometry args={[0.03, 0.005, 0.005]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.06, 0.48, 0.18]} rotation={[0.2, 0, 0.2]} castShadow>
        <boxGeometry args={[0.03, 0.005, 0.005]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      {/* Big Red Heart */}
      <group position={[0, 0.2, 0.15]} rotation={[0.2, 0, 0]} scale={1.2}>
        <mesh position={[-0.06, 0.06, 0]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshPhysicalMaterial color="#cc0000" roughness={0.5} />
        </mesh>
        <mesh position={[0.06, 0.06, 0]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshPhysicalMaterial color="#cc0000" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI]} castShadow>
          <coneGeometry args={[0.11, 0.16, 16]} />
          <meshPhysicalMaterial color="#cc0000" roughness={0.5} />
        </mesh>
      </group>
      {/* Arms holding heart */}
      <mesh position={[-0.12, 0.22, 0.1]} rotation={[0, 0.5, -0.5]} castShadow>
        <capsuleGeometry args={[0.03, 0.08, 16, 16]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.8} />
      </mesh>
      <mesh position={[0.12, 0.22, 0.1]} rotation={[0, -0.5, 0.5]} castShadow>
        <capsuleGeometry args={[0.03, 0.08, 16, 16]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.8} />
      </mesh>
    </group>
  );
}

function CharacterToppings() {
  const T1_Y = TIER1_Y + TIER1_H / 2;
  const T2_Y = TIER2_Y + TIER2_H / 2;
  const T3_Y = TIER3_Y + TIER3_H / 2;

  return (
    <group>
      {/* Top Tier (Center-Front) */}
      <HelloKittyFigure position={[0, T3_Y, 0.7]} rotation={[0, 0, 0]} scale={1.2} />
      
      {/* Middle Tier */}
      <KuromiFigure position={[-1.2, T2_Y, 1.2]} rotation={[0, Math.PI / 6, 0]} scale={1.1} />
      <HachiwareFigure position={[1.4, T2_Y, 1.0]} rotation={[0, -Math.PI / 5, 0]} scale={1.1} />
      
      {/* Bottom Tier */}
      <PekoChanFigure position={[-1.6, T1_Y, 1.6]} rotation={[0, Math.PI / 5, 0]} scale={1.1} />
      <SnoopyFigure position={[1.7, T1_Y, 1.4]} rotation={[0, -Math.PI / 4, 0]} scale={1.1} />
    </group>
  );
}

function ElegantCakeStand() {
  return (
    <group position={[0, -1.8, 0]}>
      {/* Top Plate */}
      <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.9, 3.1, 0.15, 64]} />
        <meshPhysicalMaterial color="#d4af37" metalness={0.8} roughness={0.2} clearcoat={1} />
      </mesh>
      
      {/* Ornate Pillar */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 1.2, 1.6, 32]} />
        <meshPhysicalMaterial color="#d4af37" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Pillar Ribs */}
      {Array.from({ length: 12 }).map((_, i) => (
         <mesh key={i} position={[0, 0.15, 0]} rotation={[0, (i * Math.PI) / 6, 0]} castShadow>
           <boxGeometry args={[0.1, 1.55, 2.0]} />
           <meshPhysicalMaterial color="#b5952f" metalness={0.9} roughness={0.2} />
         </mesh>
      ))}
      
      {/* Base Foot */}
      <mesh position={[0, -0.7, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.8, 2.6, 0.3, 64]} />
        <meshPhysicalMaterial color="#d4af37" metalness={0.8} roughness={0.2} clearcoat={1} />
      </mesh>
    </group>
  );
}

function TableSetting() {
  return (
    <group position={[0, -2.65, 0]}>
      {/* Scattered Confetti / Sprinkles around the stand base */}
      {Array.from({ length: 80 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 3.5 + Math.random() * 8; // Spread around the stand
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const colors = ["#ff99cc", "#c7b8d8", "#ffffff", "#ffcc00", "#ff66b2"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const isStar = Math.random() > 0.7;
        
        return (
          <mesh key={i} position={[x, 0.26, z]} rotation={[Math.PI / 2, 0, Math.random() * Math.PI]} receiveShadow>
            {isStar ? (
              <cylinderGeometry args={[0.15, 0.15, 0.02, 5]} />
            ) : (
              <capsuleGeometry args={[0.04, 0.12, 4, 8]} />
            )}
            <meshPhysicalMaterial color={color} roughness={0.4} clearcoat={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}

function Cake({ isBlownOut, onBlowOut }: { isBlownOut: boolean; onBlowOut: () => void }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Reactive tilt based on mouse position
      const targetRotationX = (state.pointer.y * Math.PI) / 16;
      const targetRotationY = (state.pointer.x * Math.PI) / 16;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.8, 0]} onClick={onBlowOut} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1} floatingRange={[-0.05, 0.05]}>
        
        {/* Elegant Gold Cake Stand */}
        <ElegantCakeStand />
        
        {/* Table Surface with Decorations */}
        <TableSetting />

        {/* Bottom Tier (Light Purple) */}
        <mesh position={[0, TIER1_Y, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[TIER1_R, TIER1_R, TIER1_H, 64]} />
          <meshPhysicalMaterial color={LIGHT_PURPLE} roughness={0.6} /> 
        </mesh>
        <PearlRing y={TIER1_Y - TIER1_H / 2} radius={TIER1_R + 0.05} count={80} scale={1.1} />
        <SilverDragees yCenter={TIER1_Y} height={TIER1_H} radius={TIER1_R} count={40} />
        <Scrollwork yCenter={TIER1_Y} radius={TIER1_R} />
        
        {/* Middle Tier (Dark Purple) */}
        <mesh position={[0, TIER2_Y, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[TIER2_R, TIER2_R, TIER2_H, 64]} />
          <meshPhysicalMaterial color={DARK_PURPLE} roughness={0.6} />
        </mesh>
        <PearlRing y={TIER2_Y - TIER2_H / 2} radius={TIER2_R + 0.05} count={65} scale={1} />
        <SilverDragees yCenter={TIER2_Y} height={TIER2_H} radius={TIER2_R} count={30} />
        <Scrollwork yCenter={TIER2_Y} radius={TIER2_R} />

        {/* Top Tier (Light Purple) */}
        <mesh position={[0, TIER3_Y, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[TIER3_R, TIER3_R, TIER3_H, 64]} />
          <meshPhysicalMaterial color={LIGHT_PURPLE} roughness={0.6} />
        </mesh>
        <PearlRing y={TIER3_Y - TIER3_H / 2} radius={TIER3_R + 0.05} count={50} scale={1} />
        <SilverDragees yCenter={TIER3_Y} height={TIER3_H} radius={TIER3_R} count={20} />
        <Scrollwork yCenter={TIER3_Y} radius={TIER3_R} />

        {/* Floral Cascade */}
        <FloralCascade />

        {/* Character Toppings */}
        <CharacterToppings />

        {/* Elegant Candle */}
        <group position={[0, TIER3_Y + TIER3_H/2 + 0.6, 0]}>
          {/* Candle Body */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.06, 0.06, 1.2, 16]} />
            <meshPhysicalMaterial color="#ffffff" roughness={0.2} clearcoat={0.5} />
          </mesh>
          {/* Candle Spiral Texture */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.065, 0.065, 1.2, 16]} />
            <meshPhysicalMaterial color={SILVER} roughness={0.2} transparent opacity={0.6} />
            <meshStandardMaterial color={SILVER} wireframe />
          </mesh>
        </group>
        {/* Candle Wick */}
        <mesh position={[0, TIER3_Y + TIER3_H/2 + 1.25, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
          <meshBasicMaterial color="#333" />
        </mesh>

        <Flame isBlownOut={isBlownOut} />
        <Smoke isBlownOut={isBlownOut} />
      </Float>
    </group>
  );
}

export default function InteractiveCake() {
  const [isBlownOut, setIsBlownOut] = useState(false);

  const handleBlowOut = () => {
    if (!isBlownOut) {
      setIsBlownOut(true);
      // Trigger confetti
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#8766a8', '#c7b8d8', '#ffffff', '#e0e0e0']
      });
      setTimeout(() => confetti({
        particleCount: 80,
        spread: 120,
        origin: { x: 0.3, y: 0.5 },
        colors: ['#8766a8', '#ffffff']
      }), 250);
      setTimeout(() => confetti({
        particleCount: 80,
        spread: 120,
        origin: { x: 0.7, y: 0.5 },
        colors: ['#c7b8d8', '#ffffff']
      }), 500);
    }
  };

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center pt-12 pb-12 overflow-visible">
      <div className="w-full text-center z-10 pointer-events-none drop-shadow-md mb-2">
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#4a365f] font-[family-name:var(--font-cute)] drop-shadow-md">
          Make a Wish!
        </h2>
      </div>

      <div className="w-full flex-grow relative z-0 flex items-center justify-center min-h-[800px] h-[90vh] overflow-visible">
        <Canvas shadows camera={{ position: [0, -0.5, 14.5], fov: 45 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.7} />
          <directionalLight castShadow position={[6, 12, 6]} intensity={1.5} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
          <directionalLight position={[-5, 5, -5]} intensity={0.5} />
          
          <Cake isBlownOut={isBlownOut} onBlowOut={handleBlowOut} />
          
          <ContactShadows position={[0, -4.0, 0]} opacity={0.5} scale={18} blur={2.5} far={10} color="#4a365f" />
        </Canvas>
      </div>
    </div>
  );
}
