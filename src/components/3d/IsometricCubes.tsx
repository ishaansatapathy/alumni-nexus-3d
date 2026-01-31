import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CubeTrail {
  id: number;
  x: number;
  y: number;
  z: number;
  timestamp: number;
  hue: number;
}

function IsometricCube({ 
  position, 
  timestamp, 
  hue 
}: { 
  position: [number, number, number]; 
  timestamp: number;
  hue: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outlineRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && outlineRef.current) {
      const age = state.clock.elapsedTime * 1000 - timestamp;
      const progress = age / 1500;
      
      if (progress < 1) {
        // Scale animation
        const scale = 1 - progress;
        meshRef.current.scale.setScalar(scale);
        outlineRef.current.scale.setScalar(scale * 1.1);
        
        // Rotation
        meshRef.current.rotation.x = age * 0.002;
        meshRef.current.rotation.y = age * 0.003;
        outlineRef.current.rotation.x = age * 0.002;
        outlineRef.current.rotation.y = age * 0.003;
        
        // Float effect
        const floatOffset = Math.sin(age * 0.005) * 0.3;
        meshRef.current.position.y = position[1] + progress * 2 + floatOffset;
        outlineRef.current.position.y = position[1] + progress * 2 + floatOffset;
        
        // Opacity
        if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
          meshRef.current.material.opacity = 1 - progress;
        }
        if (outlineRef.current.material instanceof THREE.MeshBasicMaterial) {
          outlineRef.current.material.opacity = (1 - progress) * 0.8;
        }
      }
    }
  });

  // Create gradient color
  const baseColor = new THREE.Color().setHSL(hue, 0.8, 0.6);
  const emissiveColor = new THREE.Color().setHSL(hue, 1, 0.5);

  return (
    <group position={position}>
      {/* Outline/Wireframe */}
      <mesh ref={outlineRef}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshBasicMaterial
          color={emissiveColor}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Solid cube with glow */}
      <mesh ref={meshRef}>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={emissiveColor}
          emissiveIntensity={0.5}
          transparent
          opacity={1}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh position={[0, 0, 0]} scale={0.6}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshBasicMaterial
          color={emissiveColor}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

function CubeTrailScene({ trails }: { trails: CubeTrail[] }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#ff00ff" />
      <pointLight position={[0, 5, -5]} intensity={0.3} color="#00ffff" />
      
      {trails.map((trail) => (
        <IsometricCube
          key={trail.id}
          position={[trail.x, trail.y, trail.z]}
          timestamp={trail.timestamp}
          hue={trail.hue}
        />
      ))}
    </>
  );
}

export function IsometricCubes() {
  const [trails, setTrails] = useState<CubeTrail[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const trailIdRef = useRef(0);
  const lastSpawnTime = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const now = Date.now();
      if (now - lastSpawnTime.current < 40) return; // Throttle
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 10 - 5;
      const y = -((e.clientY - rect.top) / rect.height) * 6 + 3;
      
      // Calculate hue based on position (creates gradient effect)
      const hue = ((e.clientX / window.innerWidth) * 0.3) + 0.5; // Blue to purple range
      
      const newTrail: CubeTrail = {
        id: trailIdRef.current++,
        x: x + (Math.random() - 0.5) * 0.8,
        y: y + (Math.random() - 0.5) * 0.8,
        z: (Math.random() - 0.5) * 3,
        timestamp: now,
        hue: hue,
      };
      
      setTrails(prev => [...prev.filter(t => now - t.timestamp < 1500), newTrail]);
      lastSpawnTime.current = now;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Cleanup old trails
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTrails(prev => prev.filter(trail => now - trail.timestamp < 1500));
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    >
      <Canvas 
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <color attach="background" args={['transparent']} />
        <fog attach="fog" args={['#000000', 8, 20]} />
        <CubeTrailScene trails={trails} />
      </Canvas>
    </div>
  );
}
