import { gsap } from 'gsap'

export function initPreloader(onComplete) {
  const preloader = document.getElementById('preloader')
  const letters   = [...preloader.querySelectorAll('.preloader-word span')]
  const line      = preloader.querySelector('.preloader-line')
  const heroImg   = document.getElementById('hero-img')

  // Preload hero image
  const img = new Image()
  img.src = heroImg.src
  img.onload = () => heroImg.classList.add('loaded')

  // Set starting state via JS (not CSS) so GSAP can manage it
  gsap.set(letters, { y: '110%', opacity: 0 })
  gsap.set(line, { width: 0 })

  const tl = gsap.timeline({ delay: 0.3 })

  tl.to(letters, {
    y: '0%',
    opacity: 1,
    stagger: 0.08,
    duration: 1.0,
    ease: 'power3.out',
  })
  .to(line, {
    width: 120,
    duration: 0.8,
    ease: 'power3.out',
  }, '-=0.4')
  .to({}, { duration: 0.9 }) // hold pause
  .to(preloader, {
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    onComplete: () => {
      preloader.style.display = 'none'
      onComplete()
    }
  })
}
