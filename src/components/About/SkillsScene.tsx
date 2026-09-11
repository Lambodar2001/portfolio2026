import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const SKILLS = [
  { name: 'Java', pos: [0, 2, 0] as [number, number, number], color: '#f89820' },
  { name: 'Spring Boot', pos: [2.5, 1, -1] as [number, number, number], color: '#6db33f' },
  { name: 'React', pos: [-2.5, 1.5, 0.5] as [number, number, number], color: '#61dafb' },
  { name: 'TypeScript', pos: [1.5, -1, 1] as [number, number, number], color: '#3178c6' },
  { name: 'Node.js', pos: [-1.5, -1.5, -0.5] as [number, number, number], color: '#68a063' },
  { name: 'PostgreSQL', pos: [3, -0.5, 0] as [number, number, number], color: '#336791' },
  { name: 'Docker', pos: [-3, 0, -1] as [number, number, number], color: '#2496ed' },
  { name: 'AWS', pos: [0, -2, 0.5] as [number, number, number], color: '#ff9900' },
  { name: 'React Native', pos: [-2, -0.5, 1] as [number, number, number], color: '#61dafb' },
  { name: 'Microservices', pos: [2, 2, -0.5] as [number, number, number], color: '#8b5cf6' },
  { name: 'Redis', pos: [-1, 2.5, 0] as [number, number, number], color: '#d82c20' },
  { name: 'GraphQL', pos: [0, 0, 2] as [number, number, number], color: '#e535ab' },
  { name: 'Kafka', pos: [-2.5, -2, 0] as [number, number, number], color: '#06b6d4' },
  { name: 'Next.js', pos: [1, 1, 1.5] as [number, number, number], color: '#ffffff' },
  { name: 'Tailwind', pos: [2.5, -2, -0.5] as [number, number, number], color: '#38bdf8' },
]

function SkillNode({ name, position, color }: { name: string; position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <Float speed={1.5 + Math.random()} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        {/* Glowing sphere */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
          />
        </mesh>
        {/* Outer glow ring */}
        <mesh>
          <ringGeometry args={[0.18, 0.22, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
        {/* Label */}
        <Text
          position={[0, -0.35, 0]}
          fontSize={0.18}
          color={color}
          anchorX="center"
          anchorY="top"
          font="https://fonts.gstatic.com/s/inter/v18/UcCo3FwrK3iLTcviYwY.woff2"
        >
          {name}
        </Text>
      </group>
    </Float>
  )
}

function ConstellationLines() {
  const lineRef = useRef<THREE.LineSegments>(null)

  const geometry = useMemo(() => {
    const positions: number[] = []
    for (let i = 0; i < SKILLS.length; i++) {
      for (let j = i + 1; j < SKILLS.length; j++) {
        const dist = Math.sqrt(
          (SKILLS[i].pos[0] - SKILLS[j].pos[0]) ** 2 +
          (SKILLS[i].pos[1] - SKILLS[j].pos[1]) ** 2 +
          (SKILLS[i].pos[2] - SKILLS[j].pos[2]) ** 2
        )
        if (dist < 3) {
          positions.push(...SKILLS[i].pos, ...SKILLS[j].pos)
        }
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [])

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.15} />
    </lineSegments>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)

  const [positions] = useMemo(() => {
    const pos = new Float32Array(200 * 3)
    for (let i = 0; i < 200; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return [pos]
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#6366f1"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function SkillsConstellationScene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#6366f1" />
      <pointLight position={[-5, -3, 3]} intensity={0.3} color="#06b6d4" />

      <group ref={groupRef}>
        <ConstellationLines />
        {SKILLS.map((skill) => (
          <SkillNode
            key={skill.name}
            name={skill.name}
            position={skill.pos}
            color={skill.color}
          />
        ))}
        <FloatingParticles />
      </group>

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          intensity={0.6}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

export default function SkillsScene() {
  return (
    <div className="canvas-wrapper w-full h-[400px] md:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SkillsConstellationScene />
      </Canvas>
    </div>
  )
}
