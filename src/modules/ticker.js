import { gsap } from 'gsap'

export function initTicker() {
  const track = document.getElementById('ticker')
  const width = track.scrollWidth / 2

  gsap.to(track, {
    x: -width,
    duration: 28,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % width)
    }
  })
}
