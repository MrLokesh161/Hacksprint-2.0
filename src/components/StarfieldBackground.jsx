import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Static stars component using drei
const StaticStars = () => {
  return (
    <Stars
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0}
      fade={true}
      speed={0}
    />
  );
};

// Static star particles
const StaticStarParticles = () => {
  // Generate random star positions (fixed positions)
  const particlesCount = 1000;
  const positions = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 200;
    positions[i3 + 1] = (Math.random() - 0.5) * 200;
    positions[i3 + 2] = (Math.random() - 0.5) * 200;
  }
  
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        color="#ffffff"
        transparent={true}
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
};

const StarfieldBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        className="w-full h-full"
      >
        <color attach="background" args={['#000000']} />
        <StaticStars />
        <StaticStarParticles />
      </Canvas>
    </div>
  );
};

export default StarfieldBackground;
