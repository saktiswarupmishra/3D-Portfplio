import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SectionHeader({ title, subtitle, id }) {
  const containerRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        }
      )

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          delay: 0.3,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="text-center mb-16 md:mb-20">
      {subtitle && (
        <p
          className="text-xs md:text-sm tracking-[0.3em] uppercase mb-4"
          style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}
        >
          {subtitle}
        </p>
      )}
      <h2
        className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        <span className="gradient-text">{title}</span>
      </h2>
      <div
        ref={lineRef}
        className="mx-auto w-24 h-[2px] origin-left"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--accent-cyan), var(--accent-purple), transparent)',
        }}
      />
    </div>
  )
}
