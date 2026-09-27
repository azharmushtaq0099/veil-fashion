import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initCursor } from './modules/cursor.js'
import { initPreloader } from './modules/preloader.js'
import { initTicker } from './modules/ticker.js'
import { initHero } from './modules/hero.js'
import { initSeam } from './modules/seam.js'
import { initCollection } from './modules/collection.js'
import { initConstruction } from './modules/construction.js'
import { initWaitlist } from './modules/waitlist.js'
import { initConcept } from './modules/concept.js'
import { initMaterials } from './modules/materials.js'
import { initAtelier } from './modules/atelier.js'
import { initProcess } from './modules/process.js'

gsap.registerPlugin(ScrollTrigger)

initCursor()

initPreloader(() => {
  document.querySelector('#nav').classList.add('visible')
  initHero()
  initTicker()
  initConcept()
  initSeam()
  initCollection()
  initMaterials()
  initConstruction()
  initAtelier()
  initProcess()
  initWaitlist()
  ScrollTrigger.refresh()
})
