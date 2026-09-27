import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initMaterials() {
  const imgWrap = document.querySelector('.materials-img-wrap')
  const title = document.querySelector('.materials-title')
  const bodies = document.querySelectorAll('.materials-body')
  const details = document.querySelector('.materials-detail-row')

  gsap.set([title, ...bodies, details], { opacity: 0, y: 28 })

  ScrollTrigger.create({
    trigger: '#materials',
    start: 'top 55%',
    once: true,
    onEnter: () => {
      imgWrap.classList.add('revealed')
      gsap.to(title, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.2 })
      gsap.to([...bodies], { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out', delay: 0.4 })
      gsap.to(details, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 })
    }
  })
}
