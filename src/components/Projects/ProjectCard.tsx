import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  icon: string
  color: string
}

export default function ProjectCard({ title, description, tags, icon, color }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * 10
    const rotateY = ((centerX - x) / centerX) * 10

    setMousePosition({ x: rotateY, y: rotateX })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      style={{
        perspective: '1000px',
      }}
      className="h-full"
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) translateZ(20px)`
            : 'rotateX(0) rotateY(0) translateZ(0)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}
        className={`
          relative h-full p-8 rounded-2xl glass
          group overflow-hidden
          border border-white/10 hover:border-white/20
          transition-all duration-300
          cursor-pointer
        `}
      >
        {/* Background gradient glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 50 + 50}% ${mousePosition.y * 50 + 50}%, ${color}15, transparent 70%)`,
          }}
        />

        {/* Border glow on hover */}
        <div
          className={`
            absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
            ${isHovered ? 'animate-pulse' : ''}
          `}
          style={{
            boxShadow: `inset 0 0 30px ${color}30, 0 0 40px ${color}20`,
          }}
        />

        <div className="relative z-10">
          {/* Icon and color accent */}
          <div className="flex items-start justify-between mb-6">
            <div
              className="text-4xl p-3 rounded-xl"
              style={{
                background: `${color}20`,
                color: color,
              }}
            >
              {icon}
            </div>
            <div
              className="w-1 h-8 rounded-full"
              style={{ background: `linear-gradient(to bottom, ${color}, transparent)` }}
            />
          </div>

          {/* Content */}
          <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300" style={{
            backgroundImage: isHovered ? `linear-gradient(135deg, ${color}, #06b6d4)` : 'none',
          }}>
            {title}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full font-mono"
                style={{
                  background: `${color}15`,
                  color: color,
                  border: `1px solid ${color}30`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm font-medium group/link">
            <span
              className="text-white group-hover/link:translate-x-1 transition-transform"
              style={{ color }}
            >
              View Project
            </span>
            <span className="text-lg opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" style={{ color }}>
              →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
