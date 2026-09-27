import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initCollection() {
  const rail  = document.getElementById('collection-rail')
  const wraps = document.querySelectorAll('.piece-img-wrap')

  // ── FORGE-09: Horizontal scroll rail ─────────────────────────────────────
  const getScrollAmount = () => {
    return -(rail.scrollWidth - window.innerWidth + 96)
  }

  // containerAnimation requires a GSAP tween (not a ScrollTrigger instance)
  const hTween = gsap.to(rail, {
    x: () => getScrollAmount(),
    ease: 'none',
    scrollTrigger: {
      trigger: '#collection-rail-wrap',
      start: 'top top',
      end: () => `+=${Math.abs(getScrollAmount())}`,
      pin: true,
      pinSpacing: true,
      scrub: 1.2,
      invalidateOnRefresh: true,
    }
  })

  // ── Clip-path reveal: each piece wipes in as it enters the horizontal view ─
  wraps.forEach(wrap => {
    ScrollTrigger.create({
      trigger: wrap,
      containerAnimation: hTween,
      start: 'left 90%',
      onEnter: () => wrap.classList.add('revealed'),
    })
  })
}
