import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import useStore from '../../store/useStore'

function FloatingShape({ position, geometry, color, speed, distort }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.rotation.x = t * speed * 0.3
    ref.current.rotation.y = t * speed * 0.5
  })

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref} position={position}>
        {geometry === 'torus' && <torusGeometry args={[0.6, 0.2, 16, 32]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[0.5]} />}
        {geometry === 'tetrahedron' && <tetrahedronGeometry args={[0.5]} />}
        {geometry === 'sphere' && <sphereGeometry args={[0.4, 32, 32]} />}
        <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={0.15} metalness={0.8} roughness={0.2} transparent opacity={0.7} distort={distort} speed={2} />
      </mesh>
    </Float>
  )
}

export default function ContactScene() {
  const isMobile = useStore((s) => s.isMobile)
  if (isMobile) return null

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 3]} intensity={0.4} color="#00f0ff" />
      <pointLight position={[-3, -2, 2]} intensity={0.3} color="#8b5cf6" />
      <fog attach="fog" args={['#0a0a0f', 3, 10]} />
      <FloatingShape position={[-2, 1, -1]} geometry="torus" color="#00f0ff" speed={1.2} distort={0.3} />
      <FloatingShape position={[2.5, -0.5, -2]} geometry="octahedron" color="#8b5cf6" speed={0.8} distort={0.2} />
      <FloatingShape position={[-1.5, -1.5, -1.5]} geometry="tetrahedron" color="#f472b6" speed={1} distort={0.25} />
      <FloatingShape position={[1, 1.5, -3]} geometry="sphere" color="#3b82f6" speed={0.6} distort={0.4} />
    </Canvas>
  )
}
