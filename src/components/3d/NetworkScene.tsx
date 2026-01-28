import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface NodeProps {
  position: [number, number, number];
  color: string;
  scale?: number;
}

function NetworkNode({ position, color, scale = 1 }: NodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Glow sphere */}
      <mesh position={position} scale={scale * 1.5}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.1}
        />
      </mesh>
    </Float>
  );
}

interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

function ConnectionLine({ start, end, color }: ConnectionLineProps) {
  const points = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2 + 0.5,
        (start[2] + end[2]) / 2
      ),
      new THREE.Vector3(...end)
    );
    return curve.getPoints(50);
  }, [start, end]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({ 
      color, 
      transparent: true, 
      opacity: 0.4 
    });
  }, [color]);

  const line = useMemo(() => {
    return new THREE.Line(lineGeometry, lineMaterial);
  }, [lineGeometry, lineMaterial]);

  return <primitive object={line} />;
}

function NetworkGraph() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const nodes: { pos: [number, number, number]; color: string; type: string }[] = [
    { pos: [-2, 1, 0], color: '#00d4ff', type: 'alumni' },
    { pos: [2, 0.5, -1], color: '#00d4ff', type: 'alumni' },
    { pos: [0, -1, 1], color: '#8b5cf6', type: 'student' },
    { pos: [-1.5, -0.5, -0.5], color: '#8b5cf6', type: 'student' },
    { pos: [1.5, 1.5, 0.5], color: '#8b5cf6', type: 'student' },
    { pos: [0, 1, -1.5], color: '#10b981', type: 'institution' },
    { pos: [-1, 0.5, 1.5], color: '#00d4ff', type: 'alumni' },
    { pos: [1, -0.5, 0], color: '#8b5cf6', type: 'student' },
  ];

  const connections: [number, number][] = [
    [0, 2], [0, 3], [1, 4], [1, 7], [2, 5], [3, 6], [4, 5], [6, 7], [0, 5], [1, 5]
  ];

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <NetworkNode key={i} position={node.pos} color={node.color} />
      ))}
      {connections.map(([startIdx, endIdx], i) => (
        <ConnectionLine 
          key={i} 
          start={nodes[startIdx].pos} 
          end={nodes[endIdx].pos}
          color="#00d4ff"
        />
      ))}
    </group>
  );
}

export function NetworkScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#080d1a']} />
        <fog attach="fog" args={['#080d1a', 5, 15]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00d4ff" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#8b5cf6" />
        
        <Stars 
          radius={50} 
          depth={50} 
          count={1000} 
          factor={2} 
          saturation={0} 
          fade 
          speed={0.5}
        />
        
        <NetworkGraph />
      </Canvas>
    </div>
  );
}

export default NetworkScene;
