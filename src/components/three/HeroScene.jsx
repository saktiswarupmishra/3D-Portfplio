import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Sparkles, Stars } from '@react-three/drei'
import Planet from './Planet'
import FloatingParticles from './FloatingParticles'
import useMousePosition from '../../hooks/useMousePosition'
import useStore from '../../store/useStore'

export default function HeroScene() {
  const { normalizedPosition } = useMousePosition()
  const isMobile = useStore((s) => s.isMobile)

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#00f0ff" />
      <pointLight position={[-5, -3, 3]} intensity={0.3} color="#8b5cf6" />
      <pointLight position={[0, 5, -5]} intensity={0.2} color="#f472b6" />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a0f', 5, 20]} />

      <Suspense fallback={null}>
        {/* Central planet */}
        <Planet mouse={normalizedPosition} />

        {/* Floating particles */}
        <FloatingParticles count={isMobile ? 100 : 200} />

        {/* Sparkle effects */}
        <Sparkles
          count={isMobile ? 40 : 80}
          scale={12}
          size={1.5}
          speed={0.3}
          color="#00f0ff"
          opacity={0.5}
        />

        {/* Background stars */}
        <Stars
          radius={50}
          depth={80}
          count={isMobile ? 1000 : 3000}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />
      </Suspense>
    </Canvas>
  )
}
