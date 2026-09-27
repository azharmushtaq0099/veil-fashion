import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initConstruction() {
  const wrap   = document.getElementById('construction-img-wrap')
  const loupe  = document.getElementById('loupe')
  const title  = document.querySelector('.construction-title')
  const body   = document.querySelector('.construction-body')
  const stat   = document.querySelector('.construction-stat')
  const counter = document.getElementById('stitch-counter')

  gsap.set([title, body, stat], { opacity: 0, y: 28 })

  // ── Text reveal on scroll enter ───────────────────────────────────────────
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#construction',
      start: 'top 55%',
      toggleActions: 'play none none none',
    }
  })

  tl.to(title, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' })
    .to(body,   { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5')
    .to(stat,   { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')

  // ── Clip-path reveal on construction photo ────────────────────────────────
  ScrollTrigger.create({
    trigger: '#construction',
    start: 'top 50%',
    onEnter: () => wrap.classList.add('revealed'),
  })

  // ── Loupe cursor (rectangular, 0.4 aspect = hand loupe) ──────────────────
  wrap.addEventListener('mousemove', e => {
    const rect = wrap.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    gsap.to(loupe, {
      left: x, top: y,
      duration: 0.12,
      ease: 'power3.out'
    })
  })

  // ── Stitch counter animation ──────────────────────────────────────────────
  ScrollTrigger.create({
    trigger: '#construction',
    start: 'top 60%',
    once: true,
    onEnter: () => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: 147,
        duration: 1.8,
        ease: 'power3.out',
        onUpdate() { counter.textContent = Math.round(obj.val) }
      })
    }
  })
}
