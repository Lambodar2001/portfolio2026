import { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { skills } from '../../data/portfolio'

// Build deterministic positions — golden angle spiral for even distribution across all nodes
const SKILL_DATA = skills.map((skill, i) => {
  const total = skills.length
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)) // ~137.5°
  const theta = i * goldenAngle
  const y = 1 - (i / (total - 1)) * 2              // evenly from +1 to -1
  const radiusScale = Math.sqrt(1 - y * y)
  const r = 0.8 + radiusScale * 4.0                // range: 0.8–4.8 for wider spread
  return {
    ...skill,
    position: [
      r * Math.cos(theta),
      y * 2.8,                                      // taller spread on Y
      r * Math.sin(theta) * 0.65,                   // slightly flat on Z for readability
    ] as [number, number, number],
    floatSpeed: 0.6 + (i % 7) * 0.12,              // deterministic, varied float speeds
  }
})

function ConstellationLines() {
  const geometry = useMemo(() => {
    const positions: number[] = []
    for (let i = 0; i < SKILL_DATA.length; i++) {
      for (let j = i + 1; j < SKILL_DATA.length; j++) {
        const pi = SKILL_DATA[i].position
        const pj = SKILL_DATA[j].position
        const dist = Math.sqrt(
          (pi[0] - pj[0]) ** 2 +
          (pi[1] - pj[1]) ** 2 +
          (pi[2] - pj[2]) ** 2
        )
        if (dist < 3.8) {
          positions.push(...pi, ...pj)
        }
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#e4ff00" transparent opacity={0.12} />
    </lineSegments>
  )
}

function SkillNode({
  name,
  position,
  color,
  floatSpeed,
}: {
  name: string
  position: [number, number, number]
  color: string
  floatSpeed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    // Pulsing scale on the core
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(t * 1.2 + position[0] * 10) * 0.1)
    }
    // Slowly spinning ring
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.6
    }
  })

  return (
    <Float speed={floatSpeed} rotationIntensity={0.05} floatIntensity={0.6}>
      <group position={position}>
        {/* Core sphere */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.15, 20, 20]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.5}
            roughness={0}
            metalness={0.3}
          />
        </mesh>

        {/* Outer glow halo */}
        <mesh>
          <sphereGeometry args={[0.22, 20, 20]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            transparent
            opacity={0.12}
            roughness={0}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Spinning ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.26, 0.012, 8, 40]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>

        {/* HTML label — always readable, no font loading needed */}
        <Html
          center
          distanceFactor={8}
          position={[0, -0.38, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              fontWeight: 500,
              color: color,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              whiteSpace: 'nowrap',
              textShadow: `0 0 10px ${color}80`,
              userSelect: 'none',
            }}
          >
            {name}
          </div>
        </Html>
      </group>
    </Float>
  )
}

function Particles() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(200 * 3)
    for (let i = 0; i < 200; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.025
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#e4ff00"
        size={0.03}
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return
    // Smooth mouse-reactive rotation
    groupRef.current.rotation.y +=
      (pointer.x * 0.35 - groupRef.current.rotation.y) * 0.03
    groupRef.current.rotation.x +=
      (-pointer.y * 0.2 - groupRef.current.rotation.x) * 0.03
    // Slow idle spin when mouse isn't moving
    groupRef.current.rotation.y += 0.001
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[8, 8, 8]} intensity={1.5} color="#e4ff00" />
      <pointLight position={[-8, -5, 5]} intensity={1.0} color="#00d4ff" />
      <pointLight position={[0, 0, 8]} intensity={0.6} color="#ffffff" />

      <group ref={groupRef}>
        <ConstellationLines />
        {SKILL_DATA.map((skill) => (
          <SkillNode
            key={skill.name}
            name={skill.name}
            position={skill.position}
            color={skill.color}
            floatSpeed={skill.floatSpeed}
          />
        ))}
        <Particles />
      </group>

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.05}
          luminanceSmoothing={0.8}
          intensity={1.0}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

export default function SkillsConstellation() {
  return (
    <div className="w-full h-[540px] md:h-[640px]">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
