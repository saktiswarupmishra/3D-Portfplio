import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../components/SectionHeader'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import useStore from '../store/useStore'
import { experiences } from '../data/experience'

gsap.registerPlugin(ScrollTrigger)

const typeColors = { work: '#00f0ff', internship: '#8b5cf6', education: '#f472b6' }
const typeLabels = { work: 'Work', internship: 'Internship', education: 'Education' }

export default function ExperienceSection() {
  const sectionRef = useIntersectionObserver('experience', 0.1)
  const timelineRef = useRef(null)
  const { setCursorVariant } = useStore()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line growth
      gsap.fromTo('.timeline-line-fill', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: timelineRef.current, start: 'top 60%', end: 'bottom 40%', scrub: 1 }
      })

      // Animate each entry
      gsap.utils.toArray('.timeline-entry').forEach((entry, i) => {
        gsap.fromTo(entry, { opacity: 0, x: i % 2 === 0 ? -50 : 50 }, {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: entry, start: 'top 80%' }
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-content">
        <SectionHeader title="Experience" subtitle="My Journey" />

        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="timeline-line-fill absolute inset-0 origin-top" style={{ background: 'linear-gradient(180deg, var(--accent-cyan), var(--accent-purple), var(--accent-pink))' }} />
          </div>

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0
            const color = typeColors[exp.type]

            return (
              <div key={exp.id} className={`timeline-entry relative flex items-start mb-12 md:mb-16 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10 mt-6" style={{ background: color, boxShadow: `0 0 15px ${color}60` }} />

                {/* Spacer */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <motion.div
                  whileHover={{ y: -4 }}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="ml-10 md:ml-0 md:w-1/2 glass rounded-2xl p-6 hover:border-[rgba(0,240,255,0.12)] transition-all duration-300"
                  style={{ [isLeft ? 'marginRight' : 'marginLeft']: window.innerWidth >= 768 ? '2rem' : '0' }}
                >
                  {/* Type badge */}
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium mb-3 inline-block" style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                    {typeLabels[exp.type]}
                  </span>

                  <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{exp.role}</h3>
                  <p className="text-sm mb-1" style={{ color }}>{exp.company}</p>
                  <p className="text-xs mb-4 font-mono" style={{ color: 'var(--text-muted)' }}>{exp.period}</p>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{exp.description}</p>

                  {/* Achievements */}
                  <ul className="space-y-1.5 mb-4">
                    {exp.achievements.slice(0, 3).map((a, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <span style={{ color }}>▹</span>{a}
                      </li>
                    ))}
                  </ul>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.techUsed.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}>{t}</span>
                    ))}
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
