import { useEffect, useRef } from 'react'
import useStore from '../store/useStore'

export default function useIntersectionObserver(sectionId, threshold = 0.3) {
  const ref = useRef(null)
  const setActiveSection = useStore((s) => s.setActiveSection)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(sectionId)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.unobserve(el)
  }, [sectionId, threshold, setActiveSection])

  return ref
}
