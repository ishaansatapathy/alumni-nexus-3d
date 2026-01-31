import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface Cube {
  id: number;
  position: [number, number, number];
  createdAt: number;
  mouseX: number;
  mouseY: number;
}

function AnimatedCube({ 
  position, 
  createdAt, 
  mouseX, 
  mouseY 
}: { 
  position: [number, number, number]; 
  createdAt: number;
  mouseX: number;
  mouseY: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      const age = state.clock.elapsedTime * 1000 - createdAt;
      const scale = Math.max(0, 1 - age / 2000);
      meshRef.current.scale.setScalar(scale);
      
      meshRef.current.rotation.x = state.clock.elapsedTime * 2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 3;
      
      // Float up slowly
      meshRef.current.position.y = position[1] + age / 5000;
      
      // Fade out
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        meshRef.current.material.opacity = scale;
      }
    }
  });

  // Gradient color based on position
  const colorValue = (mouseX + mouseY) / 2;
  const color = new THREE.Color().setHSL(0.5 + colorValue * 0.2, 0.8, 0.5);

  return (
    <Box
      ref={meshRef}
      position={position}
      args={[0.3, 0.3, 0.3]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 1 : 0.5}
        transparent
        opacity={1}
        wireframe
      />
    </Box>
  );
}

function CubeScene({ cubes }: { cubes: Cube[] }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#ff00ff" />
      
      {cubes.map((cube) => (
        <AnimatedCube
          key={cube.id}
          position={cube.position}
          createdAt={cube.createdAt}
          mouseX={cube.mouseX}
          mouseY={cube.mouseY}
        />
      ))}
    </>
  );
}

export function InteractiveCubes() {
  const [cubes, setCubes] = useState<Cube[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeIdRef = useRef(0);
  const lastSpawnTime = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      setMousePos({ x, y });
      
      // Spawn cubes on mouse movement (throttled)
      const now = Date.now();
      if (now - lastSpawnTime.current > 50) {
        const newCube: Cube = {
          id: cubeIdRef.current++,
          position: [
            x * 5 + (Math.random() - 0.5) * 0.5,
            y * 3 + (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 2
          ],
          createdAt: now,
          mouseX: (x + 1) / 2,
          mouseY: (y + 1) / 2,
        };
        
        setCubes(prev => [...prev.filter(c => now - c.createdAt < 2000), newCube]);
        lastSpawnTime.current = now;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Cleanup old cubes
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setCubes(prev => prev.filter(cube => now - cube.createdAt < 2000));
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <color attach="background" args={['transparent']} />
        <CubeScene cubes={cubes} />
      </Canvas>
      
      {/* Cursor glow effect */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(100, 200, 255, 0.15) 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
        animate={{
          left: mousePos.x * 50 + 50 + '%',
          top: mousePos.y * -50 + 50 + '%',
          x: '-50%',
          y: '-50%',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />
    </div>
  );
}
