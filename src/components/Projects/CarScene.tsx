import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  MeshReflectorMaterial,
  Float,
  Environment,
  ContactShadows,
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// ─────────────────────────────────────────────────────────────────
// REALISTIC ALLOY WHEEL
// ─────────────────────────────────────────────────────────────────
function Wheel({ accent }: { accent: string }) {
  const SPOKES = 7
  const R_OUTER = 0.33
  const R_INNER = 0.12
  const W = 0.22

  const spokeAngles = useMemo(
    () => Array.from({ length: SPOKES }, (_, i) => (i / SPOKES) * Math.PI * 2),
    []
  )

  return (
    <group>
      {/* Tyre */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R_OUTER - 0.04, 0.1, 32, 64]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} metalness={0} />
      </mesh>

      {/* Tyre sidewall inner */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[R_OUTER - 0.04, R_OUTER - 0.04, W * 0.92, 40, 1, true]} />
        <meshStandardMaterial color="#111" roughness={1} side={THREE.BackSide} />
      </mesh>

      {/* Rim barrel */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[R_OUTER - 0.14, R_OUTER - 0.14, W, 36, 1, true]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Rim face outer ring (chrome) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R_OUTER - 0.14, 0.018, 12, 36]} />
        <meshStandardMaterial color="#c8c8c8" metalness={1} roughness={0.05} />
      </mesh>

      {/* 7 Spokes */}
      {spokeAngles.map((angle, i) => {
        const spokeLen = (R_OUTER - 0.14 - R_INNER) * 0.88
        return (
          <mesh key={i} rotation={[Math.PI / 2, 0, angle]}>
            <boxGeometry args={[0.032, spokeLen, 0.025]} />
            <meshStandardMaterial color="#bebebe" metalness={1} roughness={0.08} />
          </mesh>
        )
      })}

      {/* Hub cap */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[R_INNER, R_INNER, W * 0.6, 24]} />
        <meshStandardMaterial color={accent} metalness={1} roughness={0.1} emissive={accent} emissiveIntensity={0.4} />
      </mesh>

      {/* Inner accent ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R_INNER + 0.01, 0.01, 8, 24]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.5} />
      </mesh>
    </group>
  )
}

// ─────────────────────────────────────────────────────────────────
// HEADLIGHT CLUSTER (DRL + glass lens)
// ─────────────────────────────────────────────────────────────────
function HeadlightCluster({ accent, side = 1 }: { accent: string; side?: number }) {
  return (
    <group position={[1.44, 0.18, side * 0.36]}>
      {/* Glass lens housing */}
      <mesh rotation={[0, -side * 0.22, 0]}>
        <boxGeometry args={[0.05, 0.1, 0.22]} />
        <meshPhysicalMaterial
          color="#050505"
          transmission={0.9}
          thickness={0.5}
          roughness={0}
          metalness={0}
          ior={1.52}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* DRL strip — white LED bar */}
      <mesh position={[0.02, 0.07, 0]}>
        <boxGeometry args={[0.02, 0.014, 0.19]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Main beam projector */}
      <mesh position={[0.02, -0.01, 0]}>
        <sphereGeometry args={[0.032, 10, 10]} />
        <meshBasicMaterial color={accent} />
      </mesh>
    </group>
  )
}

// ─────────────────────────────────────────────────────────────────
// TAIL-LIGHT (full-width LED bar)
// ─────────────────────────────────────────────────────────────────
function TailLight({ accent }: { accent: string }) {
  return (
    <group position={[-1.45, 0.14, 0]}>
      {/* Housing with tinted lens */}
      <mesh>
        <boxGeometry args={[0.04, 0.12, 1.0]} />
        <meshPhysicalMaterial color="#050505" transmission={0.7} roughness={0} ior={1.45} transparent opacity={0.8} />
      </mesh>
      {/* Full-width LED accent bar */}
      <mesh position={[0.022, 0.04, 0]}>
        <boxGeometry args={[0.012, 0.018, 0.88]} />
        <meshBasicMaterial color={accent} />
      </mesh>
      {/* Reverse strip */}
      <mesh position={[0.022, -0.03, 0]}>
        <boxGeometry args={[0.012, 0.01, 0.4]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

// ─────────────────────────────────────────────────────────────────
// REALISTIC CAR BODY
// ─────────────────────────────────────────────────────────────────
function Car({ accentColor }: { accentColor: string }) {
  const carRef = useRef<THREE.Group>(null)
  const wheelsRef = useRef<(THREE.Group | null)[]>([])

  useFrame(({ clock }) => {
    if (!carRef.current) return
    const t = clock.elapsedTime
    // Gentle showcase yaw
    carRef.current.rotation.y = -0.3 + Math.sin(t * 0.22) * 0.22
    // Spin wheels
    wheelsRef.current.forEach((w) => { if (w) w.rotation.x = t * 2.8 })
  })

  // Shared PBR clearcoat paint material props
  const paint = {
    color: '#0d0d0f',
    metalness: 0.96,
    roughness: 0.06,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    envMapIntensity: 2,
    reflectivity: 1,
  } as const

  const wheelConfig: [number, number, number][] = [
    [ 0.92, -0.16,  0.58],
    [ 0.92, -0.16, -0.58],
    [-0.92, -0.16,  0.58],
    [-0.92, -0.16, -0.58],
  ]

  return (
    <Float speed={1.2} rotationIntensity={0} floatIntensity={0.28}>
      <group ref={carRef} position={[0, 0.1, 0]}>

        {/* ── CHASSIS / UNDERBODY ── */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.1, 0.14, 1.24]} />
          <meshPhysicalMaterial color="#080808" metalness={0.8} roughness={0.18} />
        </mesh>

        {/* ── Side sills (rocker panels) ── */}
        {[-0.65, 0.65].map((z, i) => (
          <mesh key={i} position={[0, 0.04, z]} castShadow>
            <boxGeometry args={[2.9, 0.14, 0.08]} />
            <meshPhysicalMaterial {...paint} />
          </mesh>
        ))}

        {/* ── LOWER BODY (door panels + fenders) ── */}
        <mesh position={[0, 0.26, 0]} castShadow>
          <boxGeometry args={[3.1, 0.28, 1.22]} />
          <meshPhysicalMaterial {...paint} />
        </mesh>

        {/* ── Wheel arch cutouts ── */}
        {wheelConfig.map(([x, , z], i) => (
          <mesh key={i} position={[x, 0.26, z > 0 ? 0.62 : -0.62]} castShadow>
            <cylinderGeometry args={[0.44, 0.44, 0.32, 32, 1, false, 0, Math.PI]} />
            <meshPhysicalMaterial color="#050505" metalness={0.6} roughness={0.3} />
          </mesh>
        ))}

        {/* ── CABIN shoulder line ── */}
        <mesh position={[-0.08, 0.51, 0]} castShadow>
          <boxGeometry args={[1.72, 0.12, 1.18]} />
          <meshPhysicalMaterial {...paint} />
        </mesh>

        {/* ── CABIN main box ── */}
        <mesh position={[-0.14, 0.7, 0]} castShadow>
          <boxGeometry args={[1.48, 0.38, 1.08]} />
          <meshPhysicalMaterial {...paint} />
        </mesh>

        {/* ── ROOF ── */}
        <mesh position={[-0.18, 0.91, 0]} castShadow>
          <boxGeometry args={[1.28, 0.1, 0.98]} />
          <meshPhysicalMaterial {...paint} />
        </mesh>

        {/* ── A-pillar (front windscreen rake) ── */}
        <mesh position={[0.58, 0.72, 0]} rotation={[0, 0, -0.68]} castShadow>
          <boxGeometry args={[0.62, 0.06, 1.05]} />
          <meshPhysicalMaterial {...paint} />
        </mesh>

        {/* ── C-pillar (rear screen rake) ── */}
        <mesh position={[-0.79, 0.74, 0]} rotation={[0, 0, 0.58]} castShadow>
          <boxGeometry args={[0.52, 0.06, 1.05]} />
          <meshPhysicalMaterial {...paint} />
        </mesh>

        {/* ── FRONT WINDSCREEN (glass) ── */}
        <mesh position={[0.55, 0.75, 0]} rotation={[0, 0, -0.68]}>
          <boxGeometry args={[0.56, 0.008, 0.96]} />
          <meshPhysicalMaterial color="#1a2535" transmission={0.85} roughness={0} metalness={0} ior={1.52} transparent opacity={0.7} />
        </mesh>

        {/* ── REAR SCREEN (glass) ── */}
        <mesh position={[-0.76, 0.77, 0]} rotation={[0, 0, 0.58]}>
          <boxGeometry args={[0.46, 0.008, 0.96]} />
          <meshPhysicalMaterial color="#1a2535" transmission={0.85} roughness={0} metalness={0} ior={1.52} transparent opacity={0.65} />
        </mesh>

        {/* ── SIDE WINDOWS (glass) ── */}
        {[-0.545, 0.545].map((z, i) => (
          <mesh key={i} position={[-0.12, 0.72, z]}>
            <boxGeometry args={[1.35, 0.3, 0.008]} />
            <meshPhysicalMaterial color="#1a2535" transmission={0.85} roughness={0} metalness={0} ior={1.52} transparent opacity={0.6} />
          </mesh>
        ))}

        {/* ── HOOD (bonnet) ── */}
        <mesh position={[0.98, 0.42, 0]} rotation={[0, 0, -0.12]} castShadow>
          <boxGeometry args={[1.1, 0.06, 1.16]} />
          <meshPhysicalMaterial {...paint} />
        </mesh>

        {/* ── Hood power bulge / crease ── */}
        <mesh position={[0.98, 0.457, 0]} rotation={[0, 0, -0.12]} castShadow>
          <boxGeometry args={[0.9, 0.02, 0.22]} />
          <meshPhysicalMaterial {...paint} />
        </mesh>

        {/* ── FRONT GRILLE surround ── */}
        <mesh position={[1.5, 0.28, 0]}>
          <boxGeometry args={[0.06, 0.32, 1.12]} />
          <meshPhysicalMaterial color="#0a0a0a" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Grille horizontal bars */}
        {[0.18, 0.1, 0.02, -0.06, -0.1].map((dy, i) => (
          <mesh key={i} position={[1.535, 0.26 + dy, 0]}>
            <boxGeometry args={[0.018, 0.012, 0.96]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
        {/* Grille badge */}
        <mesh position={[1.545, 0.26, 0]}>
          <cylinderGeometry args={[0.048, 0.048, 0.015, 16]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} metalness={1} roughness={0.1} />
        </mesh>

        {/* ── TRUNK / BOOT LID ── */}
        <mesh position={[-1.04, 0.42, 0]} rotation={[0, 0, 0.08]} castShadow>
          <boxGeometry args={[0.82, 0.06, 1.16]} />
          <meshPhysicalMaterial {...paint} />
        </mesh>

        {/* ── REAR DIFFUSER ── */}
        <mesh position={[-1.5, 0.05, 0]}>
          <boxGeometry args={[0.06, 0.18, 1.12]} />
          <meshPhysicalMaterial color="#060606" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Diffuser fins */}
        {[-0.35, -0.12, 0.12, 0.35].map((z, i) => (
          <mesh key={i} position={[-1.51, 0.04, z]}>
            <boxGeometry args={[0.06, 0.12, 0.016]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}

        {/* ── EXHAUST TIPS ── */}
        {[-0.28, 0.28].map((z, i) => (
          <group key={i} position={[-1.52, -0.04, z]}>
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <cylinderGeometry args={[0.038, 0.044, 0.06, 14]} />
              <meshStandardMaterial color="#2a2a2a" metalness={1} roughness={0.12} />
            </mesh>
            <mesh rotation={[0, Math.PI / 2, 0]} position={[0.042, 0, 0]}>
              <torusGeometry args={[0.038, 0.006, 8, 14]} />
              <meshStandardMaterial color="#606060" metalness={1} roughness={0.06} />
            </mesh>
          </group>
        ))}

        {/* ── NEON SIDE STRIPS ── */}
        {[-0.635, 0.635].map((z, i) => (
          <mesh key={i} position={[0, 0.13, z]}>
            <boxGeometry args={[2.8, 0.014, 0.01]} />
            <meshBasicMaterial color={accentColor} />
          </mesh>
        ))}

        {/* ── UNDERCAR GLOW ── */}
        <mesh position={[0, -0.075, 0]}>
          <planeGeometry args={[2.8, 1.0]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.18} side={THREE.DoubleSide} />
        </mesh>

        {/* ── LIGHTS ── */}
        <HeadlightCluster accent={accentColor} side={1} />
        <HeadlightCluster accent={accentColor} side={-1} />
        <TailLight accent={accentColor} />

        {/* ── WHEELS × 4 ── */}
        {wheelConfig.map(([x, y, z], i) => (
          <group
            key={i}
            position={[x, y, z]}
            ref={(el) => { wheelsRef.current[i] = el }}
          >
            <Wheel accent={accentColor} />
          </group>
        ))}

        {/* ── DOOR HANDLES (chrome strips) ── */}
        {[-0.545, 0.545].map((z, i) => (
          <group key={i}>
            <mesh position={[0.36, 0.42, z]}>
              <boxGeometry args={[0.14, 0.022, 0.012]} />
              <meshStandardMaterial color="#aaaaaa" metalness={1} roughness={0.05} />
            </mesh>
            <mesh position={[-0.32, 0.42, z]}>
              <boxGeometry args={[0.14, 0.022, 0.012]} />
              <meshStandardMaterial color="#aaaaaa" metalness={1} roughness={0.05} />
            </mesh>
          </group>
        ))}

        {/* ── SIDE MIRRORS ── */}
        {[-0.68, 0.68].map((z, i) => (
          <group key={i} position={[0.65, 0.6, z]}>
            <mesh rotation={[0, 0, 0.12]}>
              <boxGeometry args={[0.1, 0.04, 0.04]} />
              <meshPhysicalMaterial color="#0d0d0d" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0.05, 0, z > 0 ? 0.04 : -0.04]}>
              <boxGeometry args={[0.1, 0.06, 0.016]} />
              <meshPhysicalMaterial color="#111" metalness={1} roughness={0} />
            </mesh>
          </group>
        ))}

      </group>
    </Float>
  )
}

// ─────────────────────────────────────────────────────────────────
// AMBIENT SHOWROOM DUST
// ─────────────────────────────────────────────────────────────────
function ShowroomDust({ accent }: { accent: string }) {
  const ref = useRef<THREE.Points>(null)
  const COUNT = 120
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 8
      arr[i * 3 + 1] = Math.random() * 3.5 - 0.4
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.018
      ref.current.position.y = Math.sin(clock.elapsedTime * 0.12) * 0.04
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={accent} size={0.016} transparent opacity={0.35} sizeAttenuation />
    </points>
  )
}

// ─────────────────────────────────────────────────────────────────
// SCENE SETUP
// ─────────────────────────────────────────────────────────────────
function Scene({ accentColor }: { accentColor: string }) {
  return (
    <>
      <color attach="background" args={['#050507']} />
      <fog attach="fog" args={['#050507', 14, 30]} />

      <ambientLight intensity={0.08} />

      {/* Key light — studio top-left */}
      <spotLight
        position={[5, 9, 4]}
        intensity={3.5}
        angle={0.28}
        penumbra={0.85}
        castShadow
        shadow-mapSize={[1024, 1024]}
        color="#ffffff"
      />

      {/* Rim light — cool blue from rear */}
      <spotLight
        position={[-5, 4, -3]}
        intensity={2.2}
        angle={0.4}
        penumbra={1}
        color="#3080ff"
      />

      {/* Accent colour fill */}
      <pointLight position={[-2, 1.5, 2]} intensity={2.8} color={accentColor} />
      <pointLight position={[ 3, 0.5, -2]} intensity={1.4} color="#1040ff" />

      {/* Undercar neon glow */}
      <pointLight position={[0, -0.4, 0]} intensity={1.5} color={accentColor} distance={3} />

      <Suspense fallback={null}>
        <Car accentColor={accentColor} />
        <ShowroomDust accent={accentColor} />

        {/* High-quality reflective showroom floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.62, 0]} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <MeshReflectorMaterial
            blur={[512, 128]}
            resolution={512}
            mixBlur={1.0}
            mixStrength={60}
            roughness={0.9}
            depthScale={1.4}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.6}
            color="#04040a"
            metalness={0.9}
            mirror={0}
          />
        </mesh>

        {/* Soft contact shadow */}
        <ContactShadows
          position={[0, -0.61, 0]}
          opacity={0.7}
          scale={8}
          blur={2.5}
          far={1}
          color="#000000"
        />

        {/* Night studio HDRI */}
        <Environment preset="night" />
      </Suspense>

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.06}
          luminanceSmoothing={0.9}
          intensity={2.2}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────
// CANVAS — ACES Filmic tone mapping for cinematic look
// ─────────────────────────────────────────────────────────────────
export default function CarScene({ accentColor }: { accentColor: string }) {
  return (
    <Canvas
      shadows
      camera={{ position: [3.4, 1.6, 4.2], fov: 36 }}
      dpr={[1, 1.8]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      style={{ background: '#050507' }}
    >
      <Scene accentColor={accentColor} />
    </Canvas>
  )
}
