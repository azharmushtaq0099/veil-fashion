import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initProcess() {
  const title = document.querySelector('.process-title')
  const steps = document.querySelectorAll('.process-step')

  gsap.set([title, ...steps], { opacity: 0, y: 24 })

  ScrollTrigger.create({
    trigger: '#process',
    start: 'top 60%',
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' })
      gsap.to([...steps], {
        opacity: 1, y: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power3.out',
        delay: 0.3
      })
    }
  })
}
