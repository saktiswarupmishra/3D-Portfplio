import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import ContactScene from '../components/three/ContactScene'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import useStore from '../store/useStore'

const socials = [
  { name: 'GitHub', url: 'https://github.com', icon: '⌘' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: '◉' },
  { name: 'Twitter', url: 'https://twitter.com', icon: '◈' },
  { name: 'Email', url: 'mailto:hello@sakti.dev', icon: '✉' },
]

export default function ContactSection() {
  const sectionRef = useIntersectionObserver('contact', 0.2)
  const { setCursorVariant } = useStore()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('sent')
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setStatus(null), 4000)
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" ref={sectionRef} className="section relative" style={{ background: 'var(--bg-primary)' }}>
      {/* 3D Background */}
      <ContactScene />

      <div className="section-content relative z-10">
        <SectionHeader title="Get In Touch" subtitle="Let's Connect" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-6 md:p-8 space-y-5"
          >
            <div>
              <label className="text-xs uppercase tracking-wider mb-2 block" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Name</label>
              <input
                type="text" name="name" required value={formData.name} onChange={handleChange}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:border-[var(--accent-cyan)]/40 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-primary)' }}
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider mb-2 block" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Email</label>
              <input
                type="email" name="email" required value={formData.email} onChange={handleChange}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:border-[var(--accent-cyan)]/40 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-primary)' }}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider mb-2 block" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Message</label>
              <textarea
                name="message" required rows={4} value={formData.message} onChange={handleChange}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-300 focus:border-[var(--accent-cyan)]/40 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-primary)' }}
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit" disabled={status === 'sending'}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="btn-primary w-full justify-center"
            >
              {status === 'sending' ? 'Sending...' : status === 'sent' ? '✓ Message Sent!' : 'Send Message'}
            </button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="gradient-text">Let's Build</span> Something Amazing
            </h3>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of something extraordinary. Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.name} href={s.url} target="_blank" rel="noreferrer"
                  whileHover={{ y: -4, scale: 1.05 }}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="w-12 h-12 rounded-xl glass flex items-center justify-center text-lg hover:border-[var(--accent-cyan)]/20 transition-all duration-300"
                  title={s.name}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
