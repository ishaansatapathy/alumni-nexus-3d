import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, PerspectiveCamera, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const orbs = useMemo(() => [
    { position: [2, 1, 0] as [number, number, number], scale: 1.2, speed: 2, color: '#ffffff' },
    { position: [-2, -1, -1] as [number, number, number], scale: 0.8, speed: 1.5, color: '#cccccc' },
    { position: [0, 2, -2] as [number, number, number], scale: 1, speed: 1.8, color: '#e0e0e0' },
    { position: [3, -1.5, 1] as [number, number, number], scale: 0.6, speed: 2.2, color: '#f5f5f5' },
    { position: [-3, 0.5, -1.5] as [number, number, number], scale: 0.9, speed: 1.6, color: '#d0d0d0' },
  ], []);

  return (
    <group ref={groupRef}>
      {orbs.map((orb, index) => (
        <Float key={index} speed={orb.speed} rotationIntensity={0.5} floatIntensity={1.5}>
          <mesh position={orb.position} scale={orb.scale}>
            <sphereGeometry args={[0.5, 64, 64]} />
            <MeshDistortMaterial
              color={orb.color}
              attach="material"
              distort={0.3}
              speed={2}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          {/* Glow effect */}
          <mesh position={orb.position} scale={orb.scale * 1.3}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshBasicMaterial color={orb.color} transparent opacity={0.1} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function AnimatedTorus() {
  const torusRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={torusRef} position={[0, 0, 0]}>
      <torusGeometry args={[2, 0.4, 32, 100]} />
      <meshStandardMaterial
        color="#888888"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        
        <Environment preset="city" />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#cccccc" />
        
        <FloatingOrbs />
        <AnimatedTorus />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#050505', 5, 15]} />
      </Canvas>
    </div>
  );
}
