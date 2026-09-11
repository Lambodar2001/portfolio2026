import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, PresentationControls, Stars, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import Laptop from './Laptop'
import Smartphone from './Smartphone'

function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null)
  const { viewport } = useThree()

  useFrame(({ pointer }) => {
    if (lightRef.current) {
      lightRef.current.position.x = (pointer.x * viewport.width) / 2
      lightRef.current.position.y = (pointer.y * viewport.height) / 2
    }
  })

  return (
    <pointLight
      ref={lightRef}
      color="#8b5cf6"
      intensity={2}
      distance={10}
      position={[0, 2, 4]}
    />
  )
}

function Scene() {
  return (
    <>
      {/* Ambient */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#e0e7ff" />
      <pointLight position={[-3, 3, 2]} intensity={0.6} color="#6366f1" />
      <pointLight position={[3, -2, 3]} intensity={0.4} color="#06b6d4" />
      <MouseLight />

      {/* Stars background */}
      <Stars radius={50} depth={50} count={1500} factor={4} saturation={0} fade speed={1.5} />

      <PresentationControls
        global
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 300 }}
        rotation={[0.1, 0.1, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <Float
          speed={2}
          rotationIntensity={0.4}
          floatIntensity={1.5}
          floatingRange={[-0.1, 0.1]}
        >
          <Laptop position={[-0.3, 0.2, 0]} />
          <Smartphone position={[1.8, -0.2, 0.5]} />
        </Float>
      </PresentationControls>

      {/* Floor shadow */}
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={4}
        color="#6366f1"
      />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={0.8}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

export default function HeroScene() {
  return (
    <div className="canvas-wrapper w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
