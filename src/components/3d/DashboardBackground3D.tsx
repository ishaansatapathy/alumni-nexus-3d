import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

function GeometricShapes() {
  const group1 = useRef<THREE.Group>(null);
  const group2 = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group1.current) {
      group1.current.rotation.x = state.clock.elapsedTime * 0.1;
      group1.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (group2.current) {
      group2.current.rotation.x = -state.clock.elapsedTime * 0.08;
      group2.current.rotation.z = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={group1} position={[3, 2, -4]}>
          <Sphere args={[0.5, 32, 32]}>
            <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.2} />
          </Sphere>
        </group>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <group ref={group2} position={[-3, -2, -5]}>
          <Box args={[0.8, 0.8, 0.8]}>
            <meshStandardMaterial color="#cccccc" wireframe transparent opacity={0.15} />
          </Box>
        </group>
      </Float>

      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
        <group position={[0, 3, -6]}>
          <mesh>
            <octahedronGeometry args={[0.6, 0]} />
            <meshStandardMaterial color="#e0e0e0" wireframe transparent opacity={0.18} />
          </mesh>
        </group>
      </Float>

      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
        <group position={[-4, 1, -3]}>
          <mesh>
            <torusGeometry args={[0.5, 0.2, 16, 32]} />
            <meshStandardMaterial color="#d0d0d0" wireframe transparent opacity={0.12} />
          </mesh>
        </group>
      </Float>
    </>
  );
}

export function DashboardBackground3D() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.2} color="#888888" />
        <GeometricShapes />
      </Canvas>
    </div>
  );
}
