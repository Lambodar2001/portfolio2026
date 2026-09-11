import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export default function Laptop({ position = [0, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position} scale={0.8}>
      {/* Base / Keyboard */}
      <mesh position={[0, -0.15, 0]} castShadow>
        <boxGeometry args={[2.4, 0.1, 1.6]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Keyboard surface detail */}
      <mesh position={[0, -0.09, 0]}>
        <boxGeometry args={[2.0, 0.02, 1.2]} />
        <meshStandardMaterial
          color="#12121a"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, -0.08, 0.35]}>
        <boxGeometry args={[0.8, 0.015, 0.4]} />
        <meshStandardMaterial
          color="#0a0a15"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Screen (angled) */}
      <group position={[0, 0.75, -0.75]} rotation={[-0.3, 0, 0]}>
        {/* Screen frame */}
        <mesh castShadow>
          <boxGeometry args={[2.4, 1.6, 0.08]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Screen display */}
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[2.1, 1.35]} />
          <meshStandardMaterial
            color="#6366f1"
            emissive="#6366f1"
            emissiveIntensity={0.3}
            metalness={0.1}
            roughness={0.9}
          />
        </mesh>
        {/* Code lines on screen */}
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[-0.3 + (i % 3) * 0.1, 0.4 - i * 0.15, 0.05]}>
            <boxGeometry args={[0.6 + Math.random() * 0.8, 0.04, 0.01]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#8b5cf6' : '#06b6d4'}
              emissive={i % 2 === 0 ? '#8b5cf6' : '#06b6d4'}
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Hinge */}
      <mesh position={[0, -0.05, -0.75]}>
        <cylinderGeometry args={[0.04, 0.04, 2.2, 8]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}
