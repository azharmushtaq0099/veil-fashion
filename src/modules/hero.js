import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initHero() {
  const title   = document.getElementById('hero-title')
  const eyebrow = document.querySelector('.hero-eyebrow')
  const sub     = document.querySelector('.hero-sub')
  const hint    = document.querySelector('.hero-scroll-hint')
  const heroBg  = document.getElementById('hero-bg')

  // ── Set initial states ────────────────────────────────────────────────────
  gsap.set([eyebrow, sub, hint], { opacity: 0, y: 18 })
  gsap.set(title, { opacity: 0 })
  title.style.fontVariationSettings = "'wght' 100"

  // ── FORGE-08: Variable font weight drive ─────────────────────────────────
  // Weight drives 100→400 via JS, synced with GSAP timeline
  gsap.to(title, {
    opacity: 1,
    duration: 0.6,
    ease: 'power3.out',
    delay: 0.2,
  })

  const weightProxy = { w: 100 }
  gsap.to(weightProxy, {
    w: 400,
    duration: 1.4,
    ease: 'power3.out',
    delay: 0.2,
    onUpdate() { title.style.fontVariationSettings = `'wght' ${Math.round(weightProxy.w)}` }
  })

  // Eyebrow and sub stagger in
  gsap.to([eyebrow, sub, hint], {
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 1.0,
    ease: 'power3.out',
    delay: 0.8,
  })

  // ── Hero parallax (Layer 0 — bg at 0.3× scroll speed) ────────────────────
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: self => {
      gsap.set(heroBg, {
        yPercent: self.progress * 30 // 0.3× speed
      })
    }
  })
}
