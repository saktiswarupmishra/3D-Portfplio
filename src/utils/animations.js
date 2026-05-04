import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const fadeInUp = (element, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay,
      ease: 'power3.out',
    }
  )
}

export const staggerReveal = (elements, stagger = 0.1) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger,
      ease: 'power3.out',
    }
  )
}

export const createScrollTrigger = (element, animation, start = 'top 80%') => {
  return ScrollTrigger.create({
    trigger: element,
    start,
    animation,
    toggleActions: 'play none none none',
  })
}

export const splitTextReveal = (element, delay = 0) => {
  const text = element.textContent
  element.textContent = ''
  element.style.visibility = 'visible'

  const chars = text.split('').map((char) => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.display = 'inline-block'
    span.style.opacity = '0'
    span.style.transform = 'translateY(40px) rotateX(-90deg)'
    element.appendChild(span)
    return span
  })

  return gsap.to(chars, {
    opacity: 1,
    y: 0,
    rotateX: 0,
    duration: 0.6,
    stagger: 0.02,
    delay,
    ease: 'back.out(1.7)',
  })
}

export const animateCounter = (element, target, duration = 2) => {
  const obj = { val: 0 }
  return gsap.to(obj, {
    val: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.val)
    },
  })
}
