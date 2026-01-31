import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Card3DBackgroundProps {
  variant?: 'primary' | 'secondary';
}

function FloatingShape({ variant = 'primary' }: Card3DBackgroundProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <RoundedBox ref={meshRef} args={[1.2, 1.2, 0.3]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color={variant === 'primary' ? '#ffffff' : '#999999'}
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.15}
        />
      </RoundedBox>
    </Float>
  );
}

export function Card3DBackground({ variant = 'primary' }: Card3DBackgroundProps) {
  return (
    <div className="absolute inset-0 -z-10 opacity-40">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.3} />
        <FloatingShape variant={variant} />
      </Canvas>
    </div>
  );
}
