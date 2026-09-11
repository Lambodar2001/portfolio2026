import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export default function Smartphone({ position = [0, 0, 0] as [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <group ref={meshRef} position={position} rotation={[0, -0.3, 0.1]} scale={0.8}>
      {/* Phone body */}
      <mesh castShadow>
        <boxGeometry args={[0.7, 1.4, 0.08]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[0.6, 1.25]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.25}
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* App icons / UI elements on screen */}
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          position={[
            -0.15 + (i % 3) * 0.15,
            0.3 - Math.floor(i / 3) * 0.3,
            0.052,
          ]}
        >
          <boxGeometry args={[0.1, 0.1, 0.005]} />
          <meshStandardMaterial
            color={['#6366f1', '#06b6d4', '#ec4899', '#8b5cf6', '#06b6d4', '#6366f1'][i]}
            emissive={['#6366f1', '#06b6d4', '#ec4899', '#8b5cf6', '#06b6d4', '#6366f1'][i]}
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}

      {/* Notch */}
      <mesh position={[0, 0.55, 0.045]}>
        <boxGeometry args={[0.2, 0.04, 0.01]} />
        <meshStandardMaterial color="#0a0a15" />
      </mesh>

      {/* Side button */}
      <mesh position={[0.36, 0.2, 0]}>
        <boxGeometry args={[0.02, 0.15, 0.04]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}
