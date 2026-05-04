import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import useStore from '../store/useStore'

export default function CustomCursor() {
  const cursorVariant = useStore((s) => s.cursorVariant)
  const isMobile = useStore((s) => s.isMobile)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (isMobile) return

    const handleMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`
      }
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove)
    const raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(raf)
    }
  }, [isMobile])

  if (isMobile) return null

  const isHover = cursorVariant === 'hover'

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-[width,height,background] duration-200"
        style={{
          width: isHover ? 6 : 8,
          height: isHover ? 6 : 8,
          borderRadius: '50%',
          background: isHover ? 'var(--accent-cyan)' : 'var(--accent-cyan)',
          boxShadow: '0 0 10px var(--accent-cyan)',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-[width,height,border-color,opacity] duration-300"
        style={{
          width: isHover ? 50 : 40,
          height: isHover ? 50 : 40,
          borderRadius: '50%',
          border: `1.5px solid ${isHover ? 'var(--accent-purple)' : 'rgba(0, 240, 255, 0.4)'}`,
          background: isHover ? 'rgba(0, 240, 255, 0.05)' : 'transparent',
          marginLeft: isHover ? -5 : 0,
          marginTop: isHover ? -5 : 0,
        }}
      />
    </>
  )
}
