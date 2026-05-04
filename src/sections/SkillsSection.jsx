import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import SkillsScene from '../components/three/SkillsScene'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import useStore from '../store/useStore'
import { skills, skillCategories } from '../data/skills'

export default function SkillsSection() {
  const sectionRef = useIntersectionObserver('skills', 0.2)
  const [activeCategory, setActiveCategory] = useState('frontend')
  const { setCursorVariant } = useStore()

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="section-content">
        <SectionHeader title="Skills & Tech" subtitle="What I Work With" />

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 md:gap-4 mb-8">
          {skillCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className={`relative px-5 md:px-8 py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'text-[var(--accent-cyan)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
              {activeCategory === cat.key && (
                <motion.div
                  layoutId="skillTab"
                  className="absolute inset-0 rounded-xl -z-10"
                  style={{
                    background: 'rgba(0, 240, 255, 0.06)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* 3D Skills Scene */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(10, 10, 15, 0.5)',
            border: '1px solid rgba(255,255,255,0.03)',
          }}
        >
          <SkillsScene
            skills={skills[activeCategory]}
            category={activeCategory}
          />
        </motion.div>

        {/* Skills Grid (2D fallback / detail) */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8"
        >
          <AnimatePresence mode="popLayout">
            {skills[activeCategory].map((skill, i) => (
              <motion.div
                key={`${activeCategory}-${skill.name}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="glass rounded-xl p-4 group hover:border-[rgba(0,240,255,0.15)] transition-all duration-300"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {skill.name}
                  </span>
                  <span
                    className="text-xs font-mono"
                    style={{ color: skill.color }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.08, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
