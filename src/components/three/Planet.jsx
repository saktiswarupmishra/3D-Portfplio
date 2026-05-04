import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export default function Planet({ mouse }) {
  const groupRef = useRef()
  const wireframeRef = useRef()
  const glowRef = useRef()
  const ringsRef = useRef()

  // Orbiting satellites
  const satellites = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      radius: 2.2 + Math.random() * 0.8,
      speed: 0.3 + Math.random() * 0.4,
      offset: (i / 8) * Math.PI * 2,
      size: 0.04 + Math.random() * 0.06,
      color: i % 2 === 0 ? '#00f0ff' : '#8b5cf6',
    }))
  }, [])

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    // Rotate main sphere
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += delta * 0.15
      wireframeRef.current.rotation.x = Math.sin(time * 0.2) * 0.1
    }

    // Mouse influence on group
    if (groupRef.current && mouse) {
      groupRef.current.rotation.y += (mouse.x * 0.3 - groupRef.current.rotation.y) * 0.05
      groupRef.current.rotation.x += (-mouse.y * 0.2 - groupRef.current.rotation.x) * 0.05
    }

    // Rotate rings
    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.1
    }

    // Pulsing glow
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.15 + Math.sin(time * 1.5) * 0.05
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Core sphere — wireframe */}
        <mesh ref={wireframeRef}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshBasicMaterial
            wireframe
            color="#00f0ff"
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Inner solid sphere */}
        <mesh>
          <icosahedronGeometry args={[1.2, 2]} />
          <meshStandardMaterial
            color="#0a0a0f"
            emissive="#00f0ff"
            emissiveIntensity={0.05}
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>

        {/* Outer glow sphere */}
        <mesh ref={glowRef} scale={1.8}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Orbital ring */}
        <group ref={ringsRef} rotation={[Math.PI * 0.35, 0, 0.2]}>
          <mesh>
            <torusGeometry args={[2.5, 0.008, 8, 100]} />
            <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
          </mesh>
          <mesh rotation={[0.3, 0.5, 0]}>
            <torusGeometry args={[2.8, 0.005, 8, 100]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.2} />
          </mesh>
        </group>

        {/* Orbiting satellites */}
        {satellites.map((sat, i) => (
          <OrbitingSatellite key={i} {...sat} />
        ))}
      </group>
    </Float>
  )
}

function OrbitingSatellite({ radius, speed, offset, size, color }) {
  const ref = useRef()

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const angle = time * speed + offset
    ref.current.position.x = Math.cos(angle) * radius
    ref.current.position.z = Math.sin(angle) * radius
    ref.current.position.y = Math.sin(angle * 2) * 0.3
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}
