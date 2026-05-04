import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'

export default function Footer() {
  const { setCursorVariant, easterEggFound, setEasterEggFound } = useStore()
  const [easterEggClicks, setEasterEggClicks] = useState(0)

  const handleEasterEgg = () => {
    const next = easterEggClicks + 1
    setEasterEggClicks(next)
    if (next >= 5) {
      setEasterEggFound(true)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-12 px-6" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + Easter Egg */}
          <div className="flex items-center gap-3">
            <button onClick={handleEasterEgg} className="text-xl font-bold font-['Space_Grotesk'] gradient-text" title="🤔">S.</button>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} Sakti. All rights reserved.
            </span>
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl transition-all duration-300"
            style={{ color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            Back to top
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
          </motion.button>
        </div>

        {/* Built with */}
        <div className="text-center mt-8">
          <p className="text-[10px] tracking-wider" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Built the Sakti Swarup Mishra.....
          </p>
        </div>

        {/* Easter Egg */}
        <AnimatePresence>
          {easterEggFound && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed bottom-8 right-8 z-50 glass rounded-2xl p-6 max-w-xs"
              style={{ border: '1px solid rgba(0,240,255,0.2)', boxShadow: 'var(--glow-cyan)' }}
            >
              <button onClick={() => setEasterEggFound(false)} className="absolute top-2 right-3 text-xs" style={{ color: 'var(--text-muted)' }}>✕</button>
              <p className="text-2xl mb-2">🎉</p>
              <p className="text-sm font-semibold gradient-text mb-1">You found the Easter Egg!</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>You're clearly someone who pays attention to detail. We'd probably get along great — let's build something together!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </footer>
  )
}
