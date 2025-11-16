import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Multi-layer starfield with no gaps
function StarLayer({ speed = 160, starCount = 400, size = 0.08, offset = 0 }) {
  const points = useRef();
  useFrame((_, delta) => {
    points.current.position.x -= speed * delta * 0.03;
    if (points.current.position.x < -30) points.current.position.x = offset;
  });

  // Generate more evenly distributed star positions
  const positions = [];
  for (let i = 0; i < starCount; i++) {
    positions.push(
      (Math.random() - 0.5) * 60 + offset, // Extra wide coverage with offset
      (Math.random() - 0.5) * 30, // Extra tall coverage
      Math.random() * 20 - 10 // Deep Z spread
    );
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starCount}
          array={new Float32Array(positions)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#fff" size={size} sizeAttenuation />
    </points>
  );
}

// Multiple star layers for complete coverage
function FastStars({ speed = 160 }) {
  return (
    <>
      <StarLayer speed={speed} starCount={500} size={0.12} offset={0} />
      <StarLayer speed={speed * 0.8} starCount={400} size={0.08} offset={15} />
      <StarLayer speed={speed * 1.2} starCount={300} size={0.06} offset={30} />
      <StarLayer speed={speed * 0.6} starCount={200} size={0.10} offset={45} />
    </>
  );
}

// Load and animate the Among Us spaceship
function RealAmongUsSpaceship({ url, moveSpeed = 10 }) {
  const group = useRef();
  const { scene } = useGLTF(url);

  useFrame((_, delta) => {
    group.current.position.x += moveSpeed * delta;
    // Smooth continuous movement - reset when completely off screen
    if (group.current.position.x > 15) group.current.position.x = -15;
    // Fixed rotation - pointing from left to right
    group.current.rotation.y = Math.PI / 2; // 90 degrees to point right
    group.current.rotation.x = 0;
  });

  return (
    <group ref={group} position={[-10, 0, 0]} scale={[0.6, 0.6, 0.6]}>
      <primitive object={scene} />
    </group>
  );
}

export default function SpaceshipLoadingAnimation() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "black" }}>
      <Canvas camera={{ fov: 60, position: [0, 0, 10] }}>
        <ambientLight intensity={0.8} />
        <directionalLight intensity={2.6} position={[10, 10, 7]} />
        <FastStars speed={215} />
        <RealAmongUsSpaceship url="/spaceship.glb" moveSpeed={14} />
      </Canvas>
    </div>
  );
}
