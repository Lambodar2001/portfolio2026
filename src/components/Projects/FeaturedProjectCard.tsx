import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { type Project } from '../../data/portfolio'
import { useTilt } from './useTilt'

interface Props { project: Project; index: number }

const CAR_IMAGES = [
  '/assets/projects/car4.png',
  '/assets/projects/car2.png',
  '/assets/projects/car3.png',
  '/assets/projects/car1.png',
]

export default function FeaturedProjectCard({ project }: Props) {
  const { rotateX, rotateY, light, onMouseMove, onMouseLeave } = useTilt(5, 7)
  const [hovered, setHovered] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % CAR_IMAGES.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -45 : 45,
    }),
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % CAR_IMAGES.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + CAR_IMAGES.length) % CAR_IMAGES.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: false, margin: '-80px' }}
      style={{ perspective: '1200px' }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { onMouseLeave(); setHovered(false) }}
      onMouseEnter={() => setHovered(true)}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full rounded-3xl overflow-hidden"
        data-cursor="view"
      >
        {/* ── Card shell ── */}
        <div
          className="relative"
          style={{
            background: 'var(--bg-surface)',
            border: `1px solid ${hovered ? project.accentColor + '35' : 'var(--border)'}`,
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: hovered
              ? `0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px ${project.accentColor}15, 0 0 80px ${project.accentColor}08`
              : '0 8px 40px rgba(0,0,0,0.3)',
            transition: 'border-color 0.4s, box-shadow 0.4s',
          }}
        >
          {/* Cursor spotlight */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: light.visible
                ? `radial-gradient(600px circle at ${light.x}% ${light.y}%, ${project.accentColor}06, transparent 60%)`
                : 'transparent',
              transition: light.visible ? 'none' : 'background 0.6s',
            }}
          />

          {/* Grid: image left + content right */}
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%]">

            {/* ── Left: 3D Image Carousel ── */}
            <div className="relative overflow-hidden" style={{ minHeight: 340, perspective: '1000px' }}>

              {/* Image carousel container */}
              <div className="absolute inset-0 w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.4 },
                      scale: { duration: 0.4 },
                      rotateY: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                    }}
                    className="absolute inset-0 w-full h-full"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.img
                      src={CAR_IMAGES[currentIndex]}
                      alt={`${project.title} - View ${currentIndex + 1}`}
                      className="w-full h-full object-contain"
                      style={{
                        padding: '1rem',
                      }}
                      animate={{
                        scale: hovered ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Animated gradient mesh overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-[5]"
                style={{
                  background: `linear-gradient(135deg, ${project.accentColor}18 0%, transparent 40%, ${project.accentColor}10 100%)`,
                  mixBlendMode: 'overlay',
                }}
                animate={{
                  opacity: hovered ? 0.9 : 0.5,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Holographic scanline effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-[5]"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${project.accentColor}08 2px, ${project.accentColor}08 4px)`,
                }}
                animate={{
                  opacity: hovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Radial glow pulse */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-[5]"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${project.accentColor}15, transparent 70%)`,
                }}
                animate={{
                  scale: hovered ? [1, 1.2, 1] : 1,
                  opacity: hovered ? [0.5, 0.8, 0.5] : 0.3,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Image overlays */}
              <div className="absolute inset-0 z-[6]" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.05), rgba(0,0,0,0.3) 100%)' }} />
              <div className="absolute inset-0 lg:hidden z-[6]" style={{ background: 'linear-gradient(to bottom, transparent 50%, var(--bg-surface))' }} />

              {/* Navigation Controls */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4 z-20">
                <motion.button
                  onClick={handlePrev}
                  whileHover={{ scale: 1.1, x: -4 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full backdrop-blur-xl flex items-center justify-center border transition-all"
                  style={{
                    background: `${project.accentColor}15`,
                    borderColor: `${project.accentColor}40`,
                    color: project.accentColor,
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.1, x: 4 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full backdrop-blur-xl flex items-center justify-center border transition-all"
                  style={{
                    background: `${project.accentColor}15`,
                    borderColor: `${project.accentColor}40`,
                    color: project.accentColor,
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>

              {/* Image indicators */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {CAR_IMAGES.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => {
                      setDirection(i > currentIndex ? 1 : -1)
                      setCurrentIndex(i)
                    }}
                    className="group relative"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div
                      className="w-2 h-2 rounded-full transition-all"
                      style={{
                        background: i === currentIndex ? project.accentColor : `${project.accentColor}30`,
                        boxShadow: i === currentIndex ? `0 0 12px ${project.accentColor}80` : 'none',
                      }}
                    />
                    {i === currentIndex && (
                      <motion.div
                        layoutId="indicator"
                        className="absolute inset-0 rounded-full border-2"
                        style={{ borderColor: project.accentColor }}
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Featured badge */}
              <div className="absolute top-5 left-5 z-20">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.65rem] font-mono font-bold backdrop-blur-md border"
                  style={{
                    background: `${project.accentColor}15`,
                    borderColor: `${project.accentColor}40`,
                    color: project.accentColor,
                    letterSpacing: '0.12em',
                  }}
                >
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: project.accentColor }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.6, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  FEATURED
                </div>
              </div>

              {/* Project number */}
              <div
                className="absolute bottom-5 left-6 font-display font-black select-none z-20"
                style={{
                  fontSize: '6rem',
                  lineHeight: 1,
                  color: `${project.accentColor}08`,
                  WebkitTextStroke: `1.5px ${project.accentColor}35`,
                  filter: `drop-shadow(0 0 30px ${project.accentColor}25) drop-shadow(0 0 60px ${project.accentColor}15)`,
                  transition: 'all 0.4s',
                }}
              >
                {project.number}
              </div>

              {/* Image counter */}
              <div
                className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-xs font-mono font-bold backdrop-blur-md border z-20"
                style={{
                  background: `${project.accentColor}10`,
                  borderColor: `${project.accentColor}30`,
                  color: project.accentColor,
                }}
              >
                {currentIndex + 1} / {CAR_IMAGES.length}
              </div>
            </div>

            {/* ── Right: Content ── */}
            <div className="relative flex flex-col justify-between p-8 lg:p-10 gap-6 z-10">

              {/* Top meta */}
              <div className="flex items-center justify-between">
                <span className="text-label text-text-muted">ENTERPRISE · BACKEND</span>
                <span className="text-label text-text-muted">2024</span>
              </div>

              {/* Title */}
              <div className="space-y-4">
                <motion.h2
                  className="font-display font-black leading-none"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
                  animate={{ color: hovered ? project.accentColor : 'var(--text-primary)' }}
                  transition={{ duration: 0.3 }}
                >
                  {project.title}
                </motion.h2>
                <p className="text-text-secondary leading-relaxed" style={{ fontSize: '0.92rem' }}>
                  {project.description}
                </p>
              </div>

              {/* Impact stat */}
              <div
                className="flex items-center gap-3 py-4 px-5 rounded-2xl border"
                style={{
                  background: `${project.accentColor}06`,
                  borderColor: `${project.accentColor}20`,
                }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${project.accentColor}15` }}>
                  <svg className="w-4 h-4" fill="none" stroke={project.accentColor} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-text-muted font-mono">KEY IMPACT</div>
                  <div className="font-display font-bold text-sm" style={{ color: project.accentColor }}>{project.impact}</div>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <div className="text-[0.6rem] font-mono text-text-muted tracking-widest">TECH STACK</div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      viewport={{ once: true }}
                      className="tag"
                      style={{
                        fontSize: '0.65rem',
                        borderColor: hovered ? `${project.accentColor}30` : 'var(--border)',
                        color: hovered ? `${project.accentColor}cc` : 'var(--text-muted)',
                        transition: 'all 0.3s',
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3">
                <motion.a
                  href={project.href ?? '#'}
                  target={project.href !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-sm transition-all"
                  style={{
                    background: project.accentColor,
                    color: '#080808',
                  }}
                >
                  View Project
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>

                <motion.a
                  href="#"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-sm border transition-all"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
