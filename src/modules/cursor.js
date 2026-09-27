// Tailor's needle cursor + SVG thread trail (FORGE-04 extended)
export function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return

  const cursor = document.getElementById('cursor')
  const path   = document.getElementById('thread-path')

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  const target = { x: pos.x, y: pos.y }

  // Trail: ring buffer of the last 60 points
  const TRAIL_MAX = 60
  const trail = []
  let animId = null
  let trailFadeTimer = null

  function buildPathData() {
    if (trail.length < 2) return ''
    let d = `M ${trail[0].x} ${trail[0].y}`
    for (let i = 1; i < trail.length; i++) {
      d += ` L ${trail[i].x} ${trail[i].y}`
    }
    return d
  }

  // Smooth cursor follows mouse with lag
  function lerp(a, b, t) { return a + (b - a) * t }

  function tick() {
    pos.x = lerp(pos.x, target.x, 0.12)
    pos.y = lerp(pos.y, target.y, 0.12)
    gsapSetCursor(pos.x, pos.y)

    trail.push({ x: pos.x, y: pos.y })
    if (trail.length > TRAIL_MAX) trail.shift()
    path.setAttribute('d', buildPathData())

    animId = requestAnimationFrame(tick)
  }

  animId = requestAnimationFrame(tick)

  document.addEventListener('mousemove', e => {
    target.x = e.clientX
    target.y = e.clientY

    // Reset fade timer
    path.style.opacity = '0.6'
    clearTimeout(trailFadeTimer)
    trailFadeTimer = setTimeout(() => {
      path.style.opacity = '0'
      setTimeout(() => { trail.length = 0; path.setAttribute('d', '') }, 2200)
    }, 80)
  })

  // Hover state
  document.addEventListener('mouseover', e => {
    const el = e.target.closest('a, button, .piece, .piece-img-wrap, input')
    if (el) cursor.classList.add('is-hovering')
  })
  document.addEventListener('mouseout', e => {
    const el = e.target.closest('a, button, .piece, .piece-img-wrap, input')
    if (el) cursor.classList.remove('is-hovering')
  })

  // Leave/enter window
  document.addEventListener('mouseleave', () => cursor.style.opacity = '0')
  document.addEventListener('mouseenter', () => cursor.style.opacity = '1')
}

// Minimal wrapper — avoids importing gsap just for transform
function gsapSetCursor(x, y) {
  const el = document.getElementById('cursor')
  if (el) el.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`
}
