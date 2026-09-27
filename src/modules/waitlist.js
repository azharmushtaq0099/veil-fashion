import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initWaitlist() {
  const numEl    = document.getElementById('waitlist-count')
  const labelTop = document.querySelector('.waitlist-label-top')
  const labelBot = document.querySelector('.waitlist-label-bottom')
  const statement = document.querySelector('.waitlist-statement')
  const form      = document.querySelector('.waitlist-form')
  const footnote  = document.querySelector('.waitlist-footnote')
  const wlForm    = document.getElementById('waitlist-form')

  gsap.set([labelTop, numEl, labelBot, statement, form, footnote], { opacity: 0, y: 16 })

  // ── Entrance: dead stop — zero animation, then elements appear cleanly ────
  ScrollTrigger.create({
    trigger: '#waitlist',
    start: 'top 55%',
    once: true,
    onEnter: () => {
      gsap.to([labelTop, numEl, labelBot], {
        opacity: 1, y: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
      })
      gsap.to([statement, form, footnote], {
        opacity: 1, y: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.2,
      })
    }
  })

  // ── Form submit ───────────────────────────────────────────────────────────
  wlForm.addEventListener('submit', e => {
    e.preventDefault()
    const btn = wlForm.querySelector('.btn-label')

    // Optimistic UI — increment count
    const current = parseInt(numEl.textContent, 10)
    gsap.to({ val: current }, {
      val: current + 1,
      duration: 0.6,
      ease: 'power3.out',
      onUpdate() { numEl.textContent = Math.round(this.targets()[0].val) }
    })

    btn.textContent = 'You\'re on the list.'
    wlForm.querySelector('input').value = ''
    wlForm.querySelector('input').setAttribute('disabled', 'true')
    wlForm.querySelector('.waitlist-btn').setAttribute('disabled', 'true')
  })
}
