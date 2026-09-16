import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// Clean floating orb — big and bold
function OrbCore() {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime

    // Smooth follow the cursor with gentle inertia
    groupRef.current.rotation.y += (pointer.x * 0.3 - groupRef.current.rotation.y) * 0.04
    groupRef.current.rotation.x += (-pointer.y * 0.2 - groupRef.current.rotation.x) * 0.04

    // Wireframe rotates independently for depth
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.12
      wireRef.current.rotation.x = Math.sin(t * 0.08) * 0.15
    }

    // Subtle breathing scale
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(t * 0.6) * 0.025)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Inner solid core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 3]} />
        <meshStandardMaterial
          color="#080818"
          emissive="#003344"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>

      {/* Wireframe shell — sharp and visible, matching particle color */}
      <mesh ref={wireRef} scale={1.35}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshBasicMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.06}
        />
      </mesh>
    </group>
  )
}

function OrbScene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={1.0} color="#00d4ff" />
      <pointLight position={[-4, -3, 3]} intensity={0.8} color="#00d4ff" />
      <pointLight position={[0, 0, 5]} intensity={0.3} color="#ffffff" />

      <OrbCore />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.12}
          luminanceSmoothing={0.85}
          intensity={1.2}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

export default function HeroOrb() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <OrbScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
