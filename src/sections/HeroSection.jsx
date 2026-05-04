import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import HeroScene from '../components/three/HeroScene'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import useStore from '../store/useStore'

export default function HeroSection() {
  const sectionRef = useIntersectionObserver('hero', 0.3)
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const { setCursorVariant } = useStore()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.2 })

      tl.fromTo(
        '.hero-greeting',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
        .fromTo(
          '.hero-name',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.hero-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.2'
        )
        .fromTo(
          '.hero-scroll',
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          '-=0.2'
        )
    })

    return () => ctx.revert()
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* 3D Background */}
      <HeroScene />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,15,0.6) 70%)',
      }} />

      {/* Content */}
      <div className="relative z-[2] text-center px-6 max-w-4xl">
        <p
          className="hero-greeting text-sm md:text-base tracking-[0.35em] uppercase mb-4 opacity-0"
          style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}
        >
          Welcome to my universe
        </p>

        <h1
          ref={headingRef}
          className="hero-name text-5xl md:text-7xl lg:text-8xl font-bold mb-4 opacity-0"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span style={{ color: 'var(--text-primary)' }}>I'm </span>
          <span className="gradient-text">Sakti Swarup Mishra</span>
        </h1>

        <p
          ref={subRef}
          className="hero-title text-lg md:text-2xl lg:text-3xl mb-10 opacity-0"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}
        >
          Full-Stack Developer & Creative Engineer
        </p>

        <div className="hero-cta opacity-0">
          <button
            onClick={scrollToAbout}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="btn-primary"
          >
            Explore My Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2 opacity-0">
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-[var(--text-muted)]/30 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1 h-1 rounded-full"
            style={{ background: 'var(--accent-cyan)' }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[1]" style={{
        background: 'linear-gradient(to top, var(--bg-primary), transparent)',
      }} />
    </section>
  )
}
