import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'

export default function ProjectModal() {
  const { selectedProject, setSelectedProject, setCursorVariant } = useStore()

  if (!selectedProject) return null

  const p = selectedProject

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedProject(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }} />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl p-6 md:p-8"
            style={{ background: 'var(--bg-secondary)', border: `1px solid ${p.color}25` }}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedProject(null)}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              ✕
            </button>

            <span className="text-xs font-mono" style={{ color: p.color }}>Featured Project</span>
            <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-1" style={{ fontFamily: 'var(--font-display)' }}>{p.title}</h3>
            <p className="text-sm mb-6" style={{ color: p.color }}>{p.subtitle}</p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>{p.description}</p>

            {/* Features */}
            <h4 className="text-sm font-semibold mb-3 gradient-text">Key Features</h4>
            <ul className="space-y-2 mb-6">
              {p.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: p.color }}>▹</span> {f}
                </li>
              ))}
            </ul>

            {/* Tech Stack */}
            <h4 className="text-sm font-semibold mb-3 gradient-text">Tech Stack</h4>
            <div className="flex flex-wrap gap-2 mb-8">
              {p.techStack.map((t) => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-full" style={{ background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}30` }}>{t}</span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4">
              <a href={p.github} target="_blank" rel="noreferrer"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="btn-primary text-sm py-2.5 px-6">
                GitHub
              </a>
              <a href={p.demo} target="_blank" rel="noreferrer"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="btn-primary text-sm py-2.5 px-6" style={{ borderColor: p.color, color: p.color }}>
                Live Demo
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
