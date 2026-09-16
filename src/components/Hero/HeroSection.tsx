import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { profile, stats } from '../../data/portfolio'

const HeroOrb = lazy(() => import('./HeroOrb'))
import ParticleDots from './ParticleDots'

// Accent glow line + typing cursor
function AccentLine() {
  return (
    <div className="flex items-center gap-3 my-4">
      <motion.div
        className="h-[2px] w-14 rounded-full"
        style={{
          background: 'var(--accent)',
          boxShadow: '0 0 12px var(--accent)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="inline-block w-[6px] h-[6px] rounded-full"
        style={{ background: 'var(--accent)', boxShadow: '0 0 12px var(--accent)' }}
        animate={{ opacity: [1, 0.2, 1], scale: [1, 0.8, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
      />
    </div>
  )
}

// Magnetic CTA button wrapper
function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18 })
  const sy = useSpring(y, { stiffness: 250, damping: 18 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = e.clientX - rect.left - rect.width / 2
    const py = e.clientY - rect.top - rect.height / 2
    x.set(px * 0.25)
    y.set(py * 0.25)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Individual word stagger animation
function HeroTagline() {
  const allWords = profile.tagline
    .map((line, lineIdx) => {
      const words = line.split(' ')
      return words.map((word, wordIdx) => ({
        word,
        isLastLine: lineIdx === profile.tagline.length - 1,
        isLastWordOfLine: wordIdx === words.length - 1,
      }))
    })
    .flat()

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.055,
        delayChildren: 0.5,
      },
    },
  }

  const word = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -40,
      filter: 'blur(8px)',
    },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const accentWord = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -40,
      filter: 'blur(8px)',
    },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  // Group words by line to preserve line breaks
  let wordIndex = 0
  const lineElements = profile.tagline.map((line, lineIdx) => {
    const words = line.split(' ')
    const wordEls = words.map((w) => {
      const isLast = lineIdx === profile.tagline.length - 1
      const variant = isLast ? accentWord : word
      const el = (
        <motion.span
          key={wordIndex}
          variants={variant}
          className="inline-block"
          style={{
            color: isLast ? 'var(--accent)' : 'var(--text-primary)',
            marginRight: '0.25em',
            transformOrigin: 'top left',
          }}
        >
          {w}
        </motion.span>
      )
      wordIndex++
      return el
    })
    return (
      <div key={lineIdx} style={{ display: 'block', overflow: 'hidden' }}>
        {wordEls}
      </div>
    )
  })

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="font-display font-black leading-[0.9]"
      style={{
        fontSize: 'clamp(2.6rem, 7.5vw, 6.5rem)',
        perspective: '800px',
        transformStyle: 'preserve-3d',
        letterSpacing: '-0.045em',
        maxWidth: '14ch',
      }}
    >
      {lineElements}
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
    <div className="perspective-1000 w-full max-w-sm mx-auto lg:mx-0">
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
            boxShadow: isHovered
              ? '0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(228,255,0,0.08)'
              : '0 24px 80px rgba(0,0,0,0.7)',
            border: '1px solid rgba(255,255,255,0.08)',
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
            className="w-full h-full object-cover block"
            style={{ aspectRatio: '3/4', minHeight: '400px', maxHeight: '520px' }}
            loading="eager"
            fetchPriority="high"
          />

          {/* Bottom gradient overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 100%)',
            }}
          />

          {/* HUD data overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1"
          >
            {/* Name tag — appears first */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
              transition={{ delay: 0, duration: 0.2 }}
              className="text-label bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm"
              style={{
                fontSize: '0.65rem',
                color: 'var(--text-primary)',
                border: '1px solid rgba(228,255,0,0.25)',
                letterSpacing: '0.1em',
              }}
            >
              {profile.fullName.toUpperCase()}
            </motion.div>

            {/* Thin separator */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: isHovered ? 1 : 0, scaleX: isHovered ? 1 : 0 }}
              transition={{ delay: 0.05, duration: 0.2 }}
              className="w-full h-px bg-accent/30 rounded origin-right"
            />

            {['DEVELOPER', 'AI · 3D', 'FULL STACK'].map((tag, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
                transition={{ delay: (i + 1) * 0.07, duration: 0.2 }}
                className="text-label text-accent bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm"
                style={{ fontSize: '0.6rem' }}
              >
                {tag}
              </motion.div>
            ))}
          </motion.div>

          {/* Status badge */}
          <div className="absolute bottom-5 left-5 right-5 z-20">
            {profile.available && (
              <div className="flex items-center gap-2 surface-glass rounded-xl px-4 py-2.5 w-fit">
                <div className="status-dot" />
                <div>
                  <div className="text-xs font-semibold text-text-primary font-display">
                    Available for Projects
                  </div>
                  <div className="text-[0.6rem] text-text-muted font-mono">
                    Open to opportunities
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating ambient glow behind card */}
        <div
          className="absolute -inset-6 rounded-[32px] -z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(228,255,0,0.08) 0%, rgba(0,212,255,0.04) 40%, transparent 70%)',
            filter: 'blur(30px)',
            transition: 'opacity 0.4s',
            opacity: isHovered ? 1 : 0.7,
          }}
        />

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-6 right-6 h-[2px] z-15 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, var(--accent)40, transparent)`,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s',
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
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-base"
    >
      {/* Animated background gradient mesh */}
      <div className="gradient-mesh" aria-hidden="true" />

      {/* Particle dots — full hero background */}
      <div className="absolute inset-0 w-full h-full opacity-50 lg:opacity-70 pointer-events-none" aria-hidden="true">
        <ParticleDots />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left — Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Sub-label with live indicator */}
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2.5 text-label" style={{ color: 'var(--text-muted)' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: 'var(--accent)' }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--accent)' }} />
                </span>
                <span style={{ color: 'var(--accent)' }}>LAMBODAR</span>
                <span>/</span>
                <span>{profile.title.toUpperCase()}</span>
              </div>
            </motion.div>

            {/* Main tagline */}
            <HeroTagline />

            {/* Accent glow line */}
            <AccentLine />

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-base lg:text-lg max-w-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {profile.description}
            </motion.p>

            {/* CTA buttons with glow */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <MagneticButton className="relative">
                <motion.a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn btn-primary relative flex items-center gap-2.5"
                  style={{
                    boxShadow: '0 0 40px rgba(228,255,0,0.15)',
                  }}
                >
                  View My Work
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </MagneticButton>

              <MagneticButton className="relative">
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn btn-secondary"
                  style={{ borderColor: 'rgba(228,255,0,0.2)' }}
                >
                  Get In Touch
                </motion.a>
              </MagneticButton>
            </motion.div>

            {/* Stats row with divider lines */}
            <motion.div variants={fadeUp} className="pt-8">
              <div className="flex gap-0 flex-wrap" style={{ borderTop: '1px solid var(--border)' }}>
                {stats.slice(0, 4).map((stat, i) => (
                  <div
                    key={stat.label}
                    className="flex-1 min-w-[120px] py-4"
                    style={{
                      borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                      paddingLeft: i === 0 ? 0 : '1.5rem',
                    }}
                  >
                    <div className="font-display font-bold text-2xl lg:text-3xl" style={{ color: 'var(--text-primary)' }}>
                      {stat.value}<span style={{ color: 'var(--accent)' }}>{stat.suffix}</span>
                    </div>
                    <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Portrait with orb behind it */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center"
          >
            {/* 3D Orb — portrait ratio to match the image, centered */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: '50%',
                left: '50%',
                width: 'min(130%, 560px)',
                aspectRatio: '3 / 4',
                transform: 'translate(-50%, -50%)',
                opacity: 0.85,
                zIndex: 0,
              }}
              aria-hidden="true"
            >
              <Suspense fallback={null}>
                <HeroOrb />
              </Suspense>
            </div>

            {/* Portrait card sits on top, centered over the orb */}
            <div className="relative z-10 flex items-center justify-center">
              <PortraitCard />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-label" style={{ fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.2em' }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 origin-top rounded-full"
          style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
