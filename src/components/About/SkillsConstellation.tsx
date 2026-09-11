import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { skills } from '../../data/portfolio'

const SKILL_DATA = skills.map((s, i) => {
  const theta = (i / skills.length) * Math.PI * 2
  const phi = Math.acos((Math.random() - 0.5) * 2)
  const r = 2.8 + Math.random() * 1.2
  return {
    ...s,
    position: [
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi),
    ] as [number, number, number],
  }
})

function ConstellationLines() {
  const geometry = (() => {
    const positions: number[] = []
    for (let i = 0; i < SKILL_DATA.length; i++) {
      for (let j = i + 1; j < SKILL_DATA.length; j++) {
        const pi = SKILL_DATA[i].position
        const pj = SKILL_DATA[j].position
        const dist = Math.sqrt(
          (pi[0] - pj[0]) ** 2 + (pi[1] - pj[1]) ** 2 + (pi[2] - pj[2]) ** 2
        )
        if (dist < 3.5) {
          positions.push(...pi, ...pj)
        }
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  })()

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#e4ff00" transparent opacity={0.06} />
    </lineSegments>
  )
}

function SkillNode({ name, position, color }: { name: string; position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.5 + position[0]) * 0.08)
    }
  })

  return (
    <Float speed={1 + Math.random()} rotationIntensity={0.1} floatIntensity={0.4}>
      <group position={position}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
        </mesh>

        {/* Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.16, 0.012, 8, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  )
}

function Particles() {
  const ref = useRef<THREE.Points>(null)

  const positions = (() => {
    const pos = new Float32Array(150 * 3)
    for (let i = 0; i < 150; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return pos
  })()

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.03
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={150} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#e4ff00" size={0.02} transparent opacity={0.3} sizeAttenuation />
    </points>
  )
}

function ConstellationScene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock, pointer }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (pointer.x * 0.2 - groupRef.current.rotation.y) * 0.02
      groupRef.current.rotation.x += (-pointer.y * 0.1 - groupRef.current.rotation.x) * 0.02
    }
  })

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#e4ff00" />
      <pointLight position={[-5, -3, 3]} intensity={0.3} color="#00d4ff" />

      <group ref={groupRef}>
        <ConstellationLines />
        {SKILL_DATA.map((skill) => (
          <SkillNode
            key={skill.name}
            name={skill.name}
            position={skill.position}
            color={skill.color}
          />
        ))}
        <Particles />
      </group>

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.8} mipmapBlur />
      </EffectComposer>
    </>
  )
}

export default function SkillsConstellation() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ConstellationScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
