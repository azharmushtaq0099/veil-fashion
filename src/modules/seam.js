import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initSeam() {
  const eyebrow = document.querySelector('.seam-eyebrow')
  const quote   = document.querySelector('.seam-quote')
  const body    = document.querySelector('.seam-body')
  const bgText  = document.querySelector('.seam-bg-text')

  // ── Scrub-pin: seam section holds for 200vh of scroll ──────────────────────
  ScrollTrigger.create({
    trigger: '#seam',
    start: 'top top',
    end: '+=200%',
    pin: true,
    pinSpacing: true,
  })

  // ── Content fades in as section enters view ───────────────────────────────
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#seam',
      start: 'top 60%',
      toggleActions: 'play none none none',
    }
  })

  tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    .to(quote, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.4')
    .to(body, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5')

  gsap.set([eyebrow, quote, body], { y: 24 })

  // ── Background LABOR text subtle parallax ────────────────────────────────
  ScrollTrigger.create({
    trigger: '#seam',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate: self => {
      gsap.set(bgText, { yPercent: (self.progress - 0.5) * -15 })
    }
  })
}
