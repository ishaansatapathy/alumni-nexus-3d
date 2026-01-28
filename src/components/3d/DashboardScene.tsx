import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.08;
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={meshRef} position={[2.5, 1, -2]}>
          <icosahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial 
            color="#00d4ff" 
            emissive="#00d4ff"
            emissiveIntensity={0.2}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>
      
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={torusRef} position={[-2, -1, -3]}>
          <torusGeometry args={[0.5, 0.15, 8, 24]} />
          <meshStandardMaterial 
            color="#8b5cf6" 
            emissive="#8b5cf6"
            emissiveIntensity={0.2}
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[0, 2, -4]}>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial 
            color="#10b981" 
            emissive="#10b981"
            emissiveIntensity={0.15}
            wireframe
            transparent
            opacity={0.2}
          />
        </mesh>
      </Float>
    </>
  );
}

export function DashboardScene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#080d1a']} />
        
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#00d4ff" />
        <pointLight position={[-10, -10, -5]} intensity={0.2} color="#8b5cf6" />
        
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}

export default DashboardScene;
