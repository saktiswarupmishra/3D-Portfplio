import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'

export default function PageLoader() {
  const { isLoading } = useStore()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isLoading) return
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        const increment = Math.random() * 15 + 5
        return Math.min(prev + increment, 100)
      })
    }, 200)
    return () => clearInterval(interval)
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg-primary)' }}
        >
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-12"
          >
            <div className="relative">
              <span className="text-7xl font-bold font-['Space_Grotesk'] gradient-text">
                S
              </span>
              <motion.div
                className="absolute -inset-4 rounded-full"
                style={{
                  border: '1px solid rgba(0, 240, 255, 0.2)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -inset-8 rounded-full"
                style={{
                  border: '1px solid rgba(139, 92, 246, 0.15)',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-48 h-[2px] rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
                width: `${progress}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Loading Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-sm tracking-[0.3em] uppercase"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
          >
            Loading Experience
          </motion.p>

          {/* Percentage */}
          <motion.p
            className="mt-2 text-xs"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
