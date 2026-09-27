import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { initCursor } from './modules/cursor.js'
import { initPreloader } from './modules/preloader.js'
import { initTicker } from './modules/ticker.js'
import { initHero } from './modules/hero.js'
import { initSeam } from './modules/seam.js'
import { initCollection } from './modules/collection.js'
import { initConstruction } from './modules/construction.js'
import { initWaitlist } from './modules/waitlist.js'

gsap.registerPlugin(ScrollTrigger)

// ─── Lenis smooth scroll (linen physics — weighted, no bounce) ────────────────
const lenis = new Lenis({
  duration: 1.6,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  autoRaf: false,
})

lenis.on('scroll', () => ScrollTrigger.update())
;(function lenisLoop(time) { lenis.raf(time); requestAnimationFrame(lenisLoop) })(performance.now())

// ─── Boot sequence ────────────────────────────────────────────────────────────
initCursor()

initPreloader(() => {
  document.querySelector('#nav').classList.add('visible')
  initHero()
  initTicker()
  initSeam()
  initCollection()
  initConstruction()
  initWaitlist()
  ScrollTrigger.refresh()
})
