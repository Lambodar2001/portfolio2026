import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SkillCard3DProps {
  icon: ReactNode
  title: string
  description: string
  skills: string[]
  color: string
  index: number
}

export default function SkillCard3D({ icon, title, description, skills, color, index }: SkillCard3DProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -90 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      viewport={{ once: false, margin: '-100px' }}
      whileHover={{
        y: -20,
        rotateY: 15,
        rotateX: 10,
        scale: 1.05
      }}
      className="h-full perspective"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div
        className="relative h-full p-8 rounded-2xl card-premium overflow-hidden group cursor-pointer"
        style={{
          background: `linear-gradient(135deg, ${color}08, ${color}04)`,
          border: `2px solid ${color}20`,
          backdropFilter: 'blur(10px)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Animated border on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${color}30, ${color}10)`,
            filter: `blur(20px)`,
          }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="text-6xl mb-6 inline-block p-4 rounded-xl"
            style={{
              background: `${color}15`,
              color: color,
            }}
            whileHover={{
              scale: 1.2,
              rotate: 10,
              color: color
            }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>

          {/* Title */}
          <h3
            className="font-display text-2xl font-bold mb-3"
            style={{ color: color }}
          >
            {title}
          </h3>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            {description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: index * 0.2 + idx * 0.05,
                  type: 'spring'
                }}
                viewport={{ once: false }}
                className="text-xs px-3 py-1.5 rounded-full font-mono"
                style={{
                  background: `${color}20`,
                  color: color,
                  border: `1px solid ${color}40`,
                }}
                whileHover={{ scale: 1.1, background: `${color}30` }}
              >
                {skill}
              </motion.span>
            ))}
          </div>

          {/* Hover line animation */}
          <motion.div
            className="h-0.5 mt-6 rounded-full"
            style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* 3D glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            boxShadow: `inset 0 0 0 2px ${color}20, 0 0 30px ${color}20`,
            opacity: 0,
          }}
          whileHover={{
            opacity: 1,
            boxShadow: `inset 0 0 0 2px ${color}40, 0 0 50px ${color}40`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}
