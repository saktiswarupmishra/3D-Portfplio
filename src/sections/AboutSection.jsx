import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../components/SectionHeader'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import useStore from '../store/useStore'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { label: 'Years Experience', value: 4 },
  { label: 'Projects Completed', value: 30 },
  { label: 'Technologies', value: 25 },
  { label: 'GitHub Stars', value: 500 },
]

export default function AboutSection() {
  const sectionRef = useIntersectionObserver('about', 0.2)
  const textRef = useRef(null)
  const statsRef = useRef(null)
  const { setCursorVariant } = useStore()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text lines reveal
      gsap.utils.toArray('.about-line').forEach((line, i) => {
        gsap.fromTo(
          line,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 75%',
            },
          }
        )
      })

      // Stats counter animation
      gsap.utils.toArray('.stat-value').forEach((el) => {
        const target = parseInt(el.dataset.value)
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + (target >= 100 ? '+' : '+')
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="section-content">
        <SectionHeader title="About Me" subtitle="Who I Am" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Avatar / Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glowing avatar placeholder */}
              <div
                className="w-64 h-64 md:w-80 md:h-80 rounded-3xl flex items-center justify-center overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,240,255,0.08), rgba(139,92,246,0.08))',
                  border: '1px solid rgba(0,240,255,0.15)',
                  boxShadow: '0 0 60px rgba(0,240,255,0.08), inset 0 0 60px rgba(0,240,255,0.03)',
                }}
              >
                <span className="text-8xl md:text-9xl font-bold gradient-text font-['Space_Grotesk']">
                  S
                </span>
              </div>

              {/* Decorative orbiting elements */}
              <div
                className="absolute -top-3 -right-3 w-6 h-6 rounded-full"
                style={{
                  background: 'var(--accent-cyan)',
                  boxShadow: '0 0 20px var(--accent-cyan)',
                  animation: 'pulse-glow 3s ease-in-out infinite',
                }}
              />
              <div
                className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full"
                style={{
                  background: 'var(--accent-purple)',
                  boxShadow: '0 0 15px var(--accent-purple)',
                  animation: 'pulse-glow 3s ease-in-out infinite 1.5s',
                }}
              />
            </div>
          </motion.div>

          {/* Right — Text */}
          <div ref={textRef}>
            <p className="about-line text-lg md:text-xl leading-relaxed mb-6" style={{ color: 'var(--text-primary)' }}>
              I'm a <span className="gradient-text font-semibold">Full-Stack Developer</span> passionate about building
              immersive digital experiences that push the boundaries of what's possible on the web.
            </p>
            <p className="about-line text-base md:text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              With expertise spanning from pixel-perfect UIs to scalable backend architectures, I specialize in
              creating applications that are both visually stunning and technically robust. I thrive at the
              intersection of design and engineering.
            </p>
            <p className="about-line text-base md:text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              When I'm not coding, you'll find me exploring new 3D rendering techniques, contributing to open-source
              projects, or experimenting with creative coding to push artistic boundaries.
            </p>

            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="about-line btn-primary inline-flex"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Let's Connect
            </motion.a>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl p-6 text-center hover:border-[var(--accent-cyan)]/20 transition-all duration-300"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <p
                className="stat-value text-3xl md:text-4xl font-bold gradient-text mb-2"
                data-value={stat.value}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                0
              </p>
              <p className="text-xs md:text-sm" style={{ color: 'var(--text-secondary)' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
