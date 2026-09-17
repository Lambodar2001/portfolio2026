import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  baseSize: number
  opacity: number
  color: string
  colorRgb: string
}

const COLORS = [
  { hex: '#e4ff00', rgb: '228,255,0' },
  { hex: '#00d4ff', rgb: '0,212,255' },
  { hex: '#8b5cf6', rgb: '139,92,246' },
]

const PARTICLE_COUNT = 100

function createParticle(w: number, h: number): Particle {
  const c = COLORS[Math.floor(Math.random() * COLORS.length)]
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    baseSize: 1.2 + Math.random() * 2,
    opacity: 0.2 + Math.random() * 0.3,
    color: c.hex,
    colorRgb: c.rgb,
  }
}

export default function HeroParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      const w = canvas.parentElement?.offsetWidth ?? 0
      const h = canvas.parentElement?.offsetHeight ?? 0
      if (w === 0 || h === 0) return
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      // Reinitialize particles for the new canvas dimensions
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(canvas.width, canvas.height)
      )
    }

    resize()

    // Track the Hero section's actual rendered size
    const heroEl = document.getElementById('hero')
    const observer = heroEl ? new ResizeObserver(resize) : null
    if (observer && heroEl) {
      observer.observe(heroEl)
    }

    const animate = () => {
      const w = canvas.width
      const h = canvas.height
      if (w === 0 || h === 0) {
        animRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, w, h)

      const particles = particlesRef.current
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Continuous drift — no stops, no restarts
        p.x += p.vx
        p.y += p.vy

        // Wrap around all edges — particles flow endlessly
        if (p.x < -20) p.x = w + 20
        else if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        else if (p.y > h + 20) p.y = -20

        // Soft glow halo
        const glowRadius = p.baseSize * 6
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius)
        gradient.addColorStop(0, `rgba(${p.colorRgb},${p.opacity * 0.5})`)
        gradient.addColorStop(0.5, `rgba(${p.colorRgb},${p.opacity * 0.1})`)
        gradient.addColorStop(1, `rgba(${p.colorRgb},0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Bright core dot
        ctx.globalAlpha = p.opacity
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.baseSize, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
        ctx.globalAlpha = 1
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animRef.current)
      if (observer) observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}
