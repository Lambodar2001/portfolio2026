import { useState } from 'react'
import { motion } from 'framer-motion'
import { type Project } from '../../data/portfolio'
import { useTilt } from './useTilt'

const DEFAULT_PROJECT_IMAGE = '/img1.png'

interface Props { project: Project; index: number }

const CATEGORY: Record<number, string> = {
  2: 'MOBILE · MARKETPLACE',
  3: 'WEB · ANALYTICS',
}

const YEAR: Record<number, string> = {
  2: '2024',
  3: '2023',
}

export default function ProjectCard({ project, index }: Props) {
  const { rotateX, rotateY, light, onMouseMove, onMouseLeave } = useTilt(8, 12)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: (index - 1) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: false, margin: '-60px' }}
      style={{ perspective: '900px' }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { onMouseLeave(); setHovered(false) }}
      onMouseEnter={() => setHovered(true)}
      data-cursor="view"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full rounded-3xl overflow-hidden"
      >
        <div
          className="relative h-full flex flex-col"
          style={{
            background: 'var(--bg-surface)',
            border: `1px solid ${hovered ? project.accentColor + '35' : 'var(--border)'}`,
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: hovered
              ? `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${project.accentColor}12`
              : '0 4px 24px rgba(0,0,0,0.2)',
            transition: 'border-color 0.35s, box-shadow 0.35s',
          }}
        >
          {/* Cursor spotlight */}
          <div
            className="absolute inset-0 pointer-events-none z-10 rounded-[20px]"
            style={{
              background: light.visible
                ? `radial-gradient(400px circle at ${light.x}% ${light.y}%, ${project.accentColor}07, transparent 60%)`
                : 'transparent',
              transition: light.visible ? 'none' : 'background 0.5s',
            }}
          />

          {/* ── Image ── */}
          <div className="relative overflow-hidden flex-shrink-0" style={{ height: 210 }}>
            <motion.img
              src={project.image || DEFAULT_PROJECT_IMAGE}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Gradient fade to card background */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.0) 50%, var(--bg-surface) 100%)',
              }}
            />

            {/* Number + category row */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div
                className="font-display font-black text-xl select-none"
                style={{ color: `${project.accentColor}60` }}
              >
                {project.number}
              </div>
              <div
                className="text-[0.58rem] font-mono px-2.5 py-1 rounded-full border backdrop-blur-md"
                style={{
                  color: project.accentColor,
                  borderColor: `${project.accentColor}35`,
                  background: `${project.accentColor}10`,
                  letterSpacing: '0.1em',
                }}
              >
                {CATEGORY[project.id] ?? 'FULLSTACK'}
              </div>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="flex flex-col flex-1 p-5 gap-3">

            {/* Impact */}
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
                style={{ background: project.accentColor }}
              />
              <span
                className="text-[0.62rem] font-mono"
                style={{ color: `${project.accentColor}cc` }}
              >
                {project.impact}
              </span>
            </div>

            {/* Title */}
            <motion.h3
              className="font-display font-bold text-lg leading-snug"
              animate={{ color: hovered ? project.accentColor : 'var(--text-primary)' }}
              transition={{ duration: 0.25 }}
            >
              {project.title}
            </motion.h3>

            {/* Description */}
            <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 flex-1">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="tag"
                  style={{
                    fontSize: '0.6rem',
                    borderColor: hovered ? `${project.accentColor}28` : 'var(--border)',
                    color: hovered ? `${project.accentColor}bb` : 'var(--text-muted)',
                    transition: 'border-color 0.3s, color 0.3s',
                  }}
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="tag" style={{ fontSize: '0.6rem' }}>+{project.tags.length - 4}</span>
              )}
            </div>

            {/* Divider */}
            <motion.div
              className="h-px rounded-full origin-left"
              animate={{
                scaleX: hovered ? 1 : 0,
                opacity: hovered ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: `linear-gradient(to right, ${project.accentColor}, transparent)` }}
            />

            {/* CTA row */}
            <div className="flex items-center justify-between">
              <span className="text-[0.6rem] font-mono text-text-muted">{YEAR[project.id] ?? '2024'}</span>
              <motion.a
                href={project.href ?? '#'}
                target={project.href !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-display font-semibold"
                animate={{
                  color: hovered ? project.accentColor : 'var(--text-muted)',
                  x: hovered ? 3 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                View Project
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
