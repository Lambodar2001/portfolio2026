import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { type Project } from '../../data/portfolio'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = -(e.clientY - rect.top - rect.height / 2) / (rect.height / 2) * 4
    const y = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2) * 4
    setTilt({ x, y })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: false, margin: '-80px' }}
    >
      {/* Project number */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="font-display font-bold text-[5rem] lg:text-[7rem] leading-none select-none"
          style={{ color: 'var(--bg-surface-3)', WebkitTextStroke: `1px ${project.accentColor}20` }}
        >
          {project.number}
        </div>
        <div className="h-px flex-1"
          style={{ background: `linear-gradient(to right, ${project.accentColor}30, transparent)` }}
        />
      </div>

      {/* Card with tilt */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false) }}
        data-cursor="view"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? 'transform 0.1s linear' : 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="relative card overflow-hidden p-8 lg:p-10 group"
          style={{
            borderColor: isHovered ? `${project.accentColor}25` : 'var(--border)',
            transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
            boxShadow: isHovered ? `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${project.accentColor}08` : '0 4px 40px rgba(0,0,0,0.3)',
          }}
        >
          {/* Background accent on hover */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background: `radial-gradient(ellipse at top right, ${project.accentColor}06 0%, transparent 60%)`,
              opacity: isHovered ? 1 : 0,
            }}
          />

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {/* Main content */}
            <div className="md:col-span-2 space-y-4">
              <h3
                className="font-display font-bold text-2xl lg:text-3xl transition-colors duration-300"
                style={{ color: isHovered ? project.accentColor : 'var(--text-primary)' }}
              >
                {project.title}
              </h3>

              <p className="text-text-secondary leading-relaxed">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag"
                    style={{
                      borderColor: isHovered ? `${project.accentColor}30` : 'var(--border)',
                      color: isHovered ? project.accentColor : 'var(--text-muted)',
                      transition: 'border-color 0.3s, color 0.3s',
                      fontSize: '0.7rem',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Impact + CTA */}
            <div className="flex flex-col justify-between gap-6">
              <div>
                <div className="text-label text-text-muted mb-2" style={{ fontSize: '0.6rem' }}>IMPACT</div>
                <div
                  className="font-display font-semibold text-xl"
                  style={{ color: project.accentColor }}
                >
                  {project.impact}
                </div>
              </div>

              <motion.a
                href={project.href ?? '#'}
                target={project.href && project.href !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ x: 6 }}
                className="flex items-center gap-2 text-sm font-display font-semibold transition-colors duration-200"
                style={{ color: isHovered ? project.accentColor : 'var(--text-muted)' }}
              >
                View Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
