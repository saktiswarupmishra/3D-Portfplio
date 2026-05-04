import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import useStore from '../store/useStore'

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const { setCursorVariant, setSelectedProject } = useStore()
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -15, y: x * 15 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setCursorVariant('default')
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={() => setSelectedProject(project)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl overflow-hidden"
      style={{ perspective: '1000px', cursor: 'none' }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative rounded-2xl overflow-hidden p-6 md:p-8 h-full"
        style={{
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`, opacity: 0.6 }} />
        <span className="text-xs font-mono mb-4 block" style={{ color: project.color }}>{'0' + (index + 1)}</span>
        <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-white" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{project.title}</h3>
        <p className="text-sm mb-4" style={{ color: project.color, fontFamily: 'var(--font-mono)' }}>{project.subtitle}</p>
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>{project.description.substring(0, 120)}...</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="text-[10px] px-2.5 py-1 rounded-full font-medium" style={{ background: `${project.color}10`, color: project.color, border: `1px solid ${project.color}25` }}>{tech}</span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs font-medium group-hover:gap-3 transition-all" style={{ color: project.color }}>
          View Details
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, ${project.color}08, transparent 70%)` }} />
      </motion.div>
    </motion.div>
  )
}
