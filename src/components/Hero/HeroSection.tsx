import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { profile, stats } from '../../data/portfolio'
import HeroParticleCanvas from './HeroParticleCanvas'

const HeroOrb = lazy(() => import('./HeroOrb'))

// Word-by-word stagger animation for the big tagline
function HeroTagline() {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  }

  const word = {
    hidden: { opacity: 0, y: 60, rotateX: -40 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="text-hero font-display font-bold leading-none"
      style={{ perspective: '600px', transformStyle: 'preserve-3d' }}
    >
      {profile.tagline.map((line, i) => (
        <div key={i} style={{ overflow: 'hidden', display: 'block' }}>
          <motion.span
            variants={word}
            className="block"
            style={{
              color: i === profile.tagline.length - 1 ? 'var(--accent)' : 'var(--text-primary)',
            }}
          >
            {line}
          </motion.span>
        </div>
      ))}
    </motion.h1>
  )
}

// Portrait card with 3D tilt + HUD overlay effects
function PortraitCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [scanVisible, setScanVisible] = useState(false)
  const rafRef = useRef<number>()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const targetX = -(e.clientY - centerY) / (rect.height / 2) * 8
    const targetY = (e.clientX - centerX) / (rect.width / 2) * 8

    cancelAnimationFrame(rafRef.current!)
    rafRef.current = requestAnimationFrame(() => {
      setTilt({ x: targetX, y: targetY })
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
    setScanVisible(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    setScanVisible(true)
  }

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current!)
  }, [])

  return (
    <div className="perspective-1000">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? 'transform 0.1s linear' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
        }}
        className="relative"
        data-cursor="explore"
        data-cursor-label="EXPLORE"
      >
        {/* Main card */}
        <div
          className={`relative rounded-3xl overflow-hidden portrait-card ${scanVisible ? 'portrait-scan' : ''}`}
          style={{
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          {/* Holographic rim */}
          <div
            className="absolute inset-0 rounded-3xl z-10 pointer-events-none"
            style={{
              background: isHovered
                ? 'linear-gradient(135deg, rgba(228,255,0,0.06) 0%, transparent 50%, rgba(0,212,255,0.06) 100%)'
                : 'none',
              transition: 'background 0.4s ease',
            }}
          />

          {/* HUD corners */}
          <div className="hud-corner hud-corner-tl" style={{ opacity: isHovered ? 1 : 0.3, transition: 'opacity 0.3s' }} />
          <div className="hud-corner hud-corner-tr" style={{ opacity: isHovered ? 1 : 0.3, transition: 'opacity 0.3s' }} />
          <div className="hud-corner hud-corner-bl" style={{ opacity: isHovered ? 1 : 0.3, transition: 'opacity 0.3s' }} />
          <div className="hud-corner hud-corner-br" style={{ opacity: isHovered ? 1 : 0.3, transition: 'opacity 0.3s' }} />

          {/* Portrait image */}
          <img
            src={profile.image}
            alt={profile.fullName}
            className="w-full h-full object-cover block portrait-img"
            loading="eager"
            fetchPriority="high"
          />

          {/* Bottom gradient overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 lg:h-36 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 100%)',
            }}
          />

          {/* HUD data overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex-col items-end gap-1 hidden lg:flex"
          >
            {['DEVELOPER', 'AI · 3D', 'FULL STACK'].map((tag, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
                transition={{ delay: i * 0.07, duration: 0.2 }}
                className="text-label text-accent bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm"
                style={{ fontSize: '0.6rem' }}
              >
                {tag}
              </motion.div>
            ))}
          </motion.div>

          {/* Status badge */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 z-20">
            {profile.available && (
              <div className="flex items-center gap-2 surface-glass rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 w-fit">
                <div className="status-dot" />
                <div>
                  <div className="text-[0.7rem] sm:text-xs font-semibold text-text-primary font-display">
                    Available for Projects
                  </div>
                  <div className="text-[0.55rem] sm:text-[0.6rem] text-text-muted font-mono">
                    Open to opportunities
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating ambient glow behind card */}
        <div
          className="absolute -inset-2 rounded-3xl -z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(228,255,0,0.04) 0%, transparent 70%)',
            filter: 'blur(15px)',
          }}
        />
      </motion.div>
    </div>
  )
}

export default function HeroSection() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] max-h-[900px] sm:max-h-[1000px] flex flex-col overflow-hidden bg-bg-base"
    >
      {/* Same background for entire section */}
      <div className="absolute inset-0 bg-bg-base" aria-hidden="true" />

      {/* Animated background gradient mesh */}
      <div className="gradient-mesh" aria-hidden="true" />

      {/* Particle canvas — full width, overflow contained */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
        <HeroParticleCanvas />
      </div>

      {/* Scroll indicator */}
      <div
        className="hidden lg:flex absolute right-0 top-0 bottom-0 w-1/2 items-center justify-center pointer-events-none"
        style={{ zIndex: 14 }}
        aria-hidden="true"
      >
        <Suspense fallback={null}>
          <HeroOrb />
        </Suspense>
      </div>

      {/* Desktop-only: absolutely positioned portrait behind the orb area */}
      <div
        className="hidden lg:flex absolute right-0 top-0 bottom-0 w-1/2 items-center justify-center"
        style={{ zIndex: 16 }}
      >
        <PortraitCard />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full flex-1 flex items-center pt-16 pb-4 sm:pt-20 sm:pb-8 lg:pt-28 lg:pb-20 min-h-0">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-14 xl:gap-20 items-center">

            {/* Left — Text content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-4 sm:space-y-6 lg:space-y-8"
            >
              {/* Sub-label */}
              <motion.div variants={fadeUp}>
                <div className="inline-flex items-center gap-2.5 text-label text-text-muted">
                  <div className="status-dot" />
                  {profile.title.toUpperCase()} · {profile.subtitle.toUpperCase()}
                </div>
              </motion.div>

              {/* Main tagline */}
              <div>
                <HeroTagline />
              </div>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="text-sm sm:text-base lg:text-lg text-text-secondary max-w-md leading-relaxed"
              >
                {profile.description}
              </motion.p>

              {/* CTA buttons */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <motion.a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn btn-primary"
                >
                  View My Work
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>

                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn btn-secondary"
                >
                  Get In Touch
                </motion.a>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeUp} className="pt-1 sm:pt-3 lg:pt-4">
                <div className="flex gap-4 sm:gap-6 lg:gap-8 flex-wrap">
                  {stats.slice(0, 3).map((stat) => (
                    <div key={stat.label}>
                      <div className="font-display font-bold text-lg sm:text-xl lg:text-2xl text-text-primary">
                        {stat.value}{stat.suffix}
                      </div>
                      <div className="text-[0.65rem] sm:text-xs text-text-muted mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right — Portrait card (mobile: shown below text; desktop: hidden, handled by absolute div) */}
            <div className="flex justify-center lg:justify-end max-h-[28vh] sm:max-h-[35vh] lg:max-h-none">
              <div className="w-full max-w-[200px] sm:max-w-xs lg:w-auto">
                <PortraitCard />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden sm:flex absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
      >
        <div className="text-label text-text-muted" style={{ fontSize: '0.6rem' }}>SCROLL</div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 sm:h-12 origin-top"
          style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
