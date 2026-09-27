import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initConcept() {
  const heading = document.querySelector('.concept-heading')
  const bodies = document.querySelectorAll('.concept-body')
  const stats = document.querySelector('.concept-stat-row')

  gsap.set([heading, ...bodies, stats], { opacity: 0, y: 30 })

  ScrollTrigger.create({
    trigger: '#concept',
    start: 'top 60%',
    once: true,
    onEnter: () => {
      gsap.to(heading, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' })
      gsap.to([...bodies], { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out', delay: 0.2 })
      gsap.to(stats, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 })
    }
  })
}
