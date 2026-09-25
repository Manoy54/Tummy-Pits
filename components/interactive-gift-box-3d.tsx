"use client";

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

// Vibrant, richer pink colors to match the reference and avoid looking pale
const BOX_COLOR = "#ff7096"; // vibrant bubblegum pink
const RIBBON_COLOR = "#ff477e"; // slightly deeper, saturated pink for ribbons
const MATERIAL_PROPS = {
  roughness: 0.1, // very smooth
  metalness: 0.15, // slightly metallic/satin
  clearcoat: 1.0, // very shiny
  clearcoatRoughness: 0.1,
};

const BowLoop = ({ angleY, angleZ, loopLength, position }: any) => {
  return (
    <group position={position} rotation={[0, angleY, angleZ]}>
      {/* 
        In local space, cylinder height is along Y. 
        Scale Z by 0.05 to squash it flat (thickness).
        Scale X by loopLength to stretch it long.
        Rotate X by Math.PI/2 to lay it down (height goes to Z, which is ribbon width).
        Translate X by 0.5 * loopLength so the pivot is at the edge.
      */}
      <mesh position={[0.5 * loopLength, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[loopLength, 1, 0.05]}>
        {/* radius = 0.5, height = 0.6 (ribbon width), openEnded = true */}
        <cylinderGeometry args={[0.5, 0.5, 0.6, 64, 1, true]} />
        <meshPhysicalMaterial color={RIBBON_COLOR} {...MATERIAL_PROPS} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const BowTail = ({ angleY }: any) => {
  return (
    <group rotation={[0, angleY, 0]} position={[0, 0.1, 0]}>
      <mesh position={[0.6, -0.3, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <planeGeometry args={[1.2, 0.65]} />
        <meshPhysicalMaterial color={RIBBON_COLOR} {...MATERIAL_PROPS} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const Bow = () => {
  return (
    <group position={[0, 0.28, 0]}>
      {/* Center knot: an open cylinder wrapped around the middle */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} scale={[1, 1, 0.2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.65, 32, 1, true]} />
        <meshPhysicalMaterial color={RIBBON_COLOR} {...MATERIAL_PROPS} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Main outer loops (Lower tier) */}
      <BowLoop angleY={0} angleZ={Math.PI / 8} loopLength={1.4} position={[0, 0, 0]} />
      <BowLoop angleY={Math.PI / 2} angleZ={Math.PI / 8} loopLength={1.4} position={[0, 0, 0]} />
      <BowLoop angleY={Math.PI} angleZ={Math.PI / 8} loopLength={1.4} position={[0, 0, 0]} />
      <BowLoop angleY={-Math.PI / 2} angleZ={Math.PI / 8} loopLength={1.4} position={[0, 0, 0]} />
      
      {/* Inner loops (Middle tier) */}
      <BowLoop angleY={Math.PI / 4} angleZ={Math.PI / 5} loopLength={1.1} position={[0, 0.05, 0]} />
      <BowLoop angleY={Math.PI / 4 + Math.PI / 2} angleZ={Math.PI / 5} loopLength={1.1} position={[0, 0.05, 0]} />
      <BowLoop angleY={Math.PI / 4 + Math.PI} angleZ={Math.PI / 5} loopLength={1.1} position={[0, 0.05, 0]} />
      <BowLoop angleY={Math.PI / 4 - Math.PI / 2} angleZ={Math.PI / 5} loopLength={1.1} position={[0, 0.05, 0]} />
      
      {/* Top fluffy loops (Upper tier) */}
      <BowLoop angleY={Math.PI / 8} angleZ={Math.PI / 2.5} loopLength={0.8} position={[0, 0.15, 0]} />
      <BowLoop angleY={Math.PI / 8 + Math.PI} angleZ={Math.PI / 2.5} loopLength={0.8} position={[0, 0.15, 0]} />

      {/* Ribbon tails hanging down */}
      <BowTail angleY={Math.PI / 6} />
      <BowTail angleY={Math.PI - Math.PI / 6} />
    </group>
  );
};

const GiftBoxModel = ({ isOpened, isHovered, onClick }: any) => {
  const groupRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const boxBaseRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !lidRef.current) return;

    // Hover Wiggle
    if (!isOpened && isHovered) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        Math.sin(state.clock.elapsedTime * 12) * 0.06,
        0.1
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        Math.sin(state.clock.elapsedTime * 8) * 0.04,
        0.1
      );
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 1.05, 0.1));
    } else {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.1);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.1));
    }

    // Lid Open Animation
    if (isOpened) {
      // Move lid up and rotate wildly like it popped off
      lidRef.current.position.y = THREE.MathUtils.lerp(lidRef.current.position.y, 3.5, 0.08);
      lidRef.current.position.x = THREE.MathUtils.lerp(lidRef.current.position.x, 1.5, 0.08);
      lidRef.current.position.z = THREE.MathUtils.lerp(lidRef.current.position.z, -1, 0.08);
      
      lidRef.current.rotation.z = THREE.MathUtils.lerp(lidRef.current.rotation.z, -Math.PI / 3, 0.08);
      lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, Math.PI / 4, 0.08);
      lidRef.current.rotation.y = THREE.MathUtils.lerp(lidRef.current.rotation.y, Math.PI / 2, 0.08);
      
      // Scale down base slightly to simulate box reacting to lid flying off
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 0.9, 0.05));
    } else {
      // Animate lid back to closed position smoothly
      lidRef.current.position.y = THREE.MathUtils.lerp(lidRef.current.position.y, 1.25, 0.15);
      lidRef.current.position.x = THREE.MathUtils.lerp(lidRef.current.position.x, 0, 0.15);
      lidRef.current.position.z = THREE.MathUtils.lerp(lidRef.current.position.z, 0, 0.15);
      
      lidRef.current.rotation.z = THREE.MathUtils.lerp(lidRef.current.rotation.z, 0, 0.15);
      lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, 0, 0.15);
      lidRef.current.rotation.y = THREE.MathUtils.lerp(lidRef.current.rotation.y, 0, 0.15);
    }
  });

  // Ribbon width adjusted to 0.7 to match the wide ribbons in the image
  // Thickness reduced to 0.01 so they sit perfectly flush like flat ribbon wraps
  return (
    <group ref={groupRef} onClick={onClick} onPointerOver={() => { document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = 'auto'; }}>
      {/* BASE (Hollow) */}
      <group position={[0, 0, 0]} ref={boxBaseRef}>
        {/* Left Wall & Ribbon */}
        <mesh castShadow receiveShadow position={[-0.95, 0, 0]}>
          <boxGeometry args={[0.1, 2, 2]} />
          <meshPhysicalMaterial color={BOX_COLOR} {...MATERIAL_PROPS} />
        </mesh>
        <mesh castShadow receiveShadow position={[-1.005, 0, 0]}>
          <boxGeometry args={[0.01, 2, 0.7]} />
          <meshPhysicalMaterial color={RIBBON_COLOR} {...MATERIAL_PROPS} />
        </mesh>

        {/* Right Wall & Ribbon */}
        <mesh castShadow receiveShadow position={[0.95, 0, 0]}>
          <boxGeometry args={[0.1, 2, 2]} />
          <meshPhysicalMaterial color={BOX_COLOR} {...MATERIAL_PROPS} />
        </mesh>
        <mesh castShadow receiveShadow position={[1.005, 0, 0]}>
          <boxGeometry args={[0.01, 2, 0.7]} />
          <meshPhysicalMaterial color={RIBBON_COLOR} {...MATERIAL_PROPS} />
        </mesh>

        {/* Front Wall & Ribbon */}
        <mesh castShadow receiveShadow position={[0, 0, 0.95]}>
          <boxGeometry args={[1.8, 2, 0.1]} />
          <meshPhysicalMaterial color={BOX_COLOR} {...MATERIAL_PROPS} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0, 1.005]}>
          <boxGeometry args={[0.7, 2, 0.01]} />
          <meshPhysicalMaterial color={RIBBON_COLOR} {...MATERIAL_PROPS} />
        </mesh>

        {/* Back Wall & Ribbon */}
        <mesh castShadow receiveShadow position={[0, 0, -0.95]}>
          <boxGeometry args={[1.8, 2, 0.1]} />
          <meshPhysicalMaterial color={BOX_COLOR} {...MATERIAL_PROPS} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0, -1.005]}>
          <boxGeometry args={[0.7, 2, 0.01]} />
          <meshPhysicalMaterial color={RIBBON_COLOR} {...MATERIAL_PROPS} />
        </mesh>

        {/* Bottom Wall & Ribbons */}
        <mesh castShadow receiveShadow position={[0, -0.95, 0]}>
          <boxGeometry args={[1.8, 0.1, 1.8]} />
          <meshPhysicalMaterial color={BOX_COLOR} {...MATERIAL_PROPS} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, -1.005, 0]}>
          <boxGeometry args={[2.02, 0.01, 0.7]} />
          <meshPhysicalMaterial color={RIBBON_COLOR} {...MATERIAL_PROPS} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, -1.005, 0]}>
          <boxGeometry args={[0.7, 0.01, 2.02]} />
          <meshPhysicalMaterial color={RIBBON_COLOR} {...MATERIAL_PROPS} />
        </mesh>
        
        {/* Interior darker ambient floor for depth */}
        <mesh position={[0, -0.89, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.8, 1.8]} />
          <meshPhysicalMaterial color="#d47996" roughness={0.8} />
        </mesh>
      </group>

      {/* LID (Hollow) */}
      <group ref={lidRef} position={[0, 1.25, 0]}>
        {/* Top Panel & Ribbons */}
        <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
          <boxGeometry args={[2.1, 0.1, 2.1]} />
          <meshPhysicalMaterial color={BOX_COLOR} {...MATERIAL_PROPS} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.305, 0]}>
          <boxGeometry args={[2.12, 0.01, 0.7]} />
          <meshPhysicalMaterial color={RIBBON_COLOR} {...MATERIAL_PROPS} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.305, 0]}>
          <boxGeometry args={[0.7, 0.01, 2.12]} />
          <meshPhysicalMaterial color={RIBBON_COLOR} {...MATERIAL_PROPS} />
        </mesh>

        {/* Lid Left Lip */}
        <mesh castShadow receiveShadow position={[-1.0, 0, 0]}>
          <boxGeometry args={[0.1, 0.4, 2.1]} />
          <meshPhysicalMaterial color={BOX_COLOR} {...MATERIAL_PROPS} />
        </mesh>
        <mesh castShadow receiveShadow position={[-1.055, 0, 0]}>
          <boxGeometry args={[0.01, 0.4, 0.7]} />
          <meshPhysicalMaterial color={RIBBON_COLOR} {...MATERIAL_PROPS} />
        </mesh>

        {/* Lid Right Lip */}
        <mesh castShadow receiveShadow position={[1.0, 0, 0]}>
          <boxGeometry args={[0.1, 0.4, 2.1]} />
          <meshPhysicalMaterial color={BOX_COLOR} {...MATERIAL_PROPS} />
        </mesh>
        <mesh castShadow receiveShadow position={[1.055, 0, 0]}>
          <boxGeometry args={[0.01, 0.4, 0.7]} />
          <meshPhysicalMaterial color={RIBBON_COLOR} {...MATERIAL_PROPS} />
        </mesh>

        {/* Lid Front Lip */}
        <mesh castShadow receiveShadow position={[0, 0, 1.0]}>
          <boxGeometry args={[1.9, 0.4, 0.1]} />
          <meshPhysicalMaterial color={BOX_COLOR} {...MATERIAL_PROPS} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0, 1.055]}>
          <boxGeometry args={[0.7, 0.4, 0.01]} />
          <meshPhysicalMaterial color={RIBBON_COLOR} {...MATERIAL_PROPS} />
        </mesh>

        {/* Lid Back Lip */}
        <mesh castShadow receiveShadow position={[0, 0, -1.0]}>
          <boxGeometry args={[1.9, 0.4, 0.1]} />
          <meshPhysicalMaterial color={BOX_COLOR} {...MATERIAL_PROPS} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0, -1.055]}>
          <boxGeometry args={[0.7, 0.4, 0.01]} />
          <meshPhysicalMaterial color={RIBBON_COLOR} {...MATERIAL_PROPS} />
        </mesh>

        {/* The Bow */}
        <group position={[0, 0.08, 0]}>
          <Bow />
        </group>
      </group>
    </group>
  );
};

export default function InteractiveGiftBox3D() {
  const [isOpened, setIsOpened] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showKiss, setShowKiss] = useState(false);

  const handleOpen = (e: any) => {
    e.stopPropagation();
    
    // Toggle opened state
    setIsOpened(!isOpened);

    // If we are opening it, trigger confetti
    if (!isOpened) {
      setShowKiss(true);
      setTimeout(() => setShowKiss(false), 2500);

      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      const duration = 2500;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 35, spread: 360, ticks: 60, zIndex: 100 };

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: Math.max(0, x - 0.05), y: y },
          colors: ["#ffb7b2", "#ffdac1", "#e2f0cb", "#b5ead7", "#c7ceea"],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: Math.min(1, x + 0.05), y: y },
          colors: ["#ff9a9e", "#fecfef", "#fbc2eb", "#a18cd1", "#fbc2eb"],
        });
      }, 250);
    }
  };

  return (
    <div 
      className="relative w-full h-[500px] sm:h-[600px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {showKiss && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: -20, scale: 1.2 }}
            exit={{ opacity: 0, y: -80, scale: 1.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50 drop-shadow-2xl"
          >
            <div className="text-8xl sm:text-9xl mb-2 animate-bounce">💋</div>
            <div 
              className="text-5xl sm:text-6xl font-bold text-pink-500 font-[family-name:var(--font-cute)] tracking-wider" 
              style={{ WebkitTextStroke: '2px white', textShadow: '0px 4px 10px rgba(255,105,180,0.5)' }}
            >
              Kiss!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Canvas
        camera={{ position: [0, 3, 7], fov: 40 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 10, 5]} 
            intensity={0.8} 
            castShadow 
            shadow-mapSize={1024}
          />
          {/* Soft fill light from the opposite side, tinted pink to enrich colors */}
          <pointLight position={[-5, 2, -5]} intensity={0.6} color="#ff7096" />
          
          {/* 'studio' preset provides higher contrast and richer colors than 'city' */}
          <Environment preset="studio" />
          
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
            <group position={[0, -0.5, 0]} scale={1.2}>
              <GiftBoxModel 
                isOpened={isOpened} 
                isHovered={isHovered} 
                onClick={handleOpen} 
              />
            </group>
          </Float>

          <ContactShadows 
            position={[0, -1.8, 0]} 
            opacity={0.5} 
            scale={15} 
            blur={2.5} 
            far={4} 
            color="#a3546a"
          />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
