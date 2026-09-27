import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initAtelier() {
  const imgWrap = document.querySelector('.atelier-img-wrap')
  const title = document.querySelector('.atelier-title')
  const bodies = document.querySelectorAll('.atelier-body')

  gsap.set([title, ...bodies], { opacity: 0, y: 28 })

  ScrollTrigger.create({
    trigger: '#atelier',
    start: 'top 55%',
    once: true,
    onEnter: () => {
      imgWrap.classList.add('revealed')
      gsap.to(title, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' })
      gsap.to([...bodies], { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out', delay: 0.3 })
    }
  })
}
