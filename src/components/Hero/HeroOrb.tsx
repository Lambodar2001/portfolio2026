import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// Abstract floating 3D object — icosahedron core + wireframe shell + particles
function OrbCore() {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime

    // Subtle mouse-reactive rotation
    groupRef.current.rotation.y += (pointer.x * 0.3 - groupRef.current.rotation.y) * 0.05
    groupRef.current.rotation.x += (-pointer.y * 0.2 - groupRef.current.rotation.x) * 0.05

    // Gentle idle rotation on top of mouse rotation
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.15
      wireRef.current.rotation.x = Math.sin(t * 0.1) * 0.2
    }

    // Pulse scale
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.03)
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
        {/* Solid inner core */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.02}
            transparent
            opacity={0}
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>

        {/* Wireframe outer shell */}
        <mesh ref={wireRef} scale={1.35}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshBasicMaterial
            color="#ffffff"
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>

        {/* Second wireframe layer */}
        <mesh scale={1.6} rotation={[0.5, 0.3, 0.1]}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshBasicMaterial
            color="#6366f1"
            wireframe
            transparent
            opacity={0.06}
          />
        </mesh>

        {/* Inner glow sphere */}
        <mesh>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color="#6366f1"
            emissive="#6366f1"
            emissiveIntensity={0.08}
            transparent
            opacity={0.03}
            roughness={0}
            metalness={1}
          />
        </mesh>
      </Float>
    </group>
  )
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, colors } = (() => {
    const count = 300
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Distribute in a sphere shell
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.5 + Math.random() * 2.5
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      // Alternate between accent colors
      const t = Math.random()
      if (t < 0.5) {
        col[i * 3] = 0.894; col[i * 3 + 1] = 1.0; col[i * 3 + 2] = 0.0
      } else {
        col[i * 3] = 0.0; col[i * 3 + 1] = 0.831; col[i * 3 + 2] = 1.0
      }
    }
    return { positions: pos, colors: col }
  })()

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.04
      pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.025) * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  )
}

function OrbScene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
      <pointLight position={[-5, -3, 3]} intensity={0.2} color="#8b5cf6" />
      <pointLight position={[0, 0, 4]} intensity={0.15} color="#6366f1" />

      <OrbCore />
      <ParticleField />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.35}
          luminanceSmoothing={0.95}
          intensity={0.3}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

export default function HeroOrb() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent', width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <OrbScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
