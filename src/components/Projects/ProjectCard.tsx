import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HiArrowRight, HiExternalLink } from 'react-icons/hi'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  icon: string
  color: string
}

export default function ProjectCard({ title, description, tags, icon, color }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <div
        className={`
          relative h-full p-8 rounded-2xl card-premium
          group overflow-hidden
          border border-gray-200 hover:border-brand-primary/20
          transition-all duration-300
          cursor-pointer
        `}
      >
        {/* Gradient accent on hover */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-2xl opacity-0"
          style={{
            background: `linear-gradient(135deg, ${color}08, ${color}04)`,
          }}
        />

        <div className="relative z-10">
          {/* Icon and accent line */}
          <div className="flex items-start justify-between mb-6">
            <div
              className="text-4xl p-3 rounded-xl"
              style={{
                background: `${color}15`,
                color: color,
              }}
            >
              {icon}
            </div>
            <motion.div
              animate={{ width: isHovered ? '40px' : '0px' }}
              transition={{ duration: 0.3 }}
              className="h-1 rounded-full"
              style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
            />
          </div>

          {/* Content */}
          <h3 className="font-display text-2xl font-bold text-text-primary mb-3">
            {title}
          </h3>

          <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full font-mono"
                style={{
                  background: `${color}12`,
                  color: color,
                  border: `1px solid ${color}30`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-sm font-semibold group/link"
          >
            <span style={{ color }} className="flex items-center gap-2">
              View Project
              <HiArrowRight className="w-4 h-4" />
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
