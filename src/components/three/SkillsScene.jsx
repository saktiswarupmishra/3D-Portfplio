import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import useStore from '../../store/useStore'

function SkillSphere({ position, skill, index, isActive }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  const color = new THREE.Color(skill.color)

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime

    // Gentle floating
    meshRef.current.position.y = position[1] + Math.sin(time * 0.8 + index * 0.5) * 0.15

    // Rotation
    meshRef.current.rotation.y += delta * 0.3
    meshRef.current.rotation.x += delta * 0.1

    // Scale animation
    const targetScale = hovered ? 1.4 : 1
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    )
  })

  if (!isActive) return null

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={hovered ? 0.8 : 0.2}
          metalness={0.7}
          roughness={0.2}
          wireframe={!hovered}
        />
      </mesh>

      {/* Glow sphere */}
      <mesh scale={hovered ? 0.6 : 0.45}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={hovered ? 0.12 : 0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Tooltip */}
      {hovered && (
        <Html
          center
          distanceFactor={6}
          style={{ pointerEvents: 'none' }}
        >
          <div
            className="px-3 py-2 rounded-lg text-center whitespace-nowrap"
            style={{
              background: 'rgba(10, 10, 15, 0.9)',
              border: `1px solid ${skill.color}40`,
              boxShadow: `0 0 20px ${skill.color}20`,
              backdropFilter: 'blur(10px)',
            }}
          >
            <p className="text-xs font-semibold" style={{ color: skill.color }}>
              {skill.name}
            </p>
            <div className="w-full h-1 rounded-full mt-1" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${skill.level}%`, background: skill.color }}
              />
            </div>
            <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
              {skill.level}%
            </p>
          </div>
        </Html>
      )}
    </group>
  )
}

export default function SkillsScene({ skills, category }) {
  const isMobile = useStore((s) => s.isMobile)

  // Calculate positions in a 3D cloud/spiral
  const positions = useMemo(() => {
    return skills.map((_, i) => {
      const angle = (i / skills.length) * Math.PI * 2
      const radius = 1.8 + (i % 3) * 0.5
      const y = (i / skills.length - 0.5) * 2
      return [
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius,
      ]
    })
  }, [skills])

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      style={{ height: '400px', width: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={0.6} color="#00f0ff" />
      <pointLight position={[-3, -2, 2]} intensity={0.4} color="#8b5cf6" />
      <fog attach="fog" args={['#0a0a0f', 4, 12]} />

      <group rotation={[0.1, 0, 0]}>
        {skills.map((skill, i) => (
          <SkillSphere
            key={`${category}-${skill.name}`}
            position={positions[i]}
            skill={skill}
            index={i}
            isActive={true}
          />
        ))}
      </group>

      <Sparkles
        count={isMobile ? 20 : 40}
        scale={8}
        size={1}
        speed={0.2}
        color="#00f0ff"
        opacity={0.3}
      />
    </Canvas>
  )
}
