import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills } from '../../data/portfolio'

const CATEGORY_LABEL: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
  devops: 'DevOps',
  ai: 'AI / ML',
}

interface TechCardProps {
  name: string
  color: string
  level: number
  category: string
  index: number
}

function TechCard({ name, color, level, category, index }: TechCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="explore"
      style={{
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Card background */}
      <div
        className="relative p-5 h-full flex flex-col gap-3 border rounded-2xl transition-all duration-300"
        style={{
          background: hovered ? `${color}0a` : 'var(--bg-surface)',
          borderColor: hovered ? `${color}50` : 'var(--border)',
          boxShadow: hovered
            ? `0 0 0 1px ${color}30, 0 16px 48px ${color}12, 0 0 24px ${color}10`
            : 'none',
        }}
      >
        {/* Top row: dot + category */}
        <div className="flex items-center justify-between">
          {/* Animated glow dot */}
          <div className="relative">
            <div
              className="w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{
                background: color,
                boxShadow: hovered ? `0 0 12px ${color}, 0 0 24px ${color}60` : `0 0 4px ${color}60`,
              }}
            />
            {/* Pulse ring on hover */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2.4, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.2 }}
                  className="absolute inset-0 rounded-full"
                  style={{ background: color }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Category pill */}
          <motion.span
            animate={{
              color: hovered ? color : 'var(--text-muted)',
              borderColor: hovered ? `${color}40` : 'var(--border)',
            }}
            transition={{ duration: 0.2 }}
            className="text-[0.6rem] font-mono px-2 py-0.5 rounded-full border"
            style={{ background: hovered ? `${color}10` : 'transparent' }}
          >
            {CATEGORY_LABEL[category] ?? category}
          </motion.span>
        </div>

        {/* Tech name */}
        <motion.div
          animate={{ color: hovered ? color : 'var(--text-primary)' }}
          transition={{ duration: 0.25 }}
          className="font-display font-semibold text-sm leading-tight"
        >
          {name}
        </motion.div>

        {/* Level bar — slides in on hover */}
        <div className="space-y-1">
          <motion.div
            className="h-px w-full rounded-full overflow-hidden"
            style={{ background: 'var(--border)' }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hovered ? level / 100 : 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: hovered ? 0.05 : 0 }}
              className="h-full rounded-full origin-left"
              style={{ background: `linear-gradient(to right, ${color}80, ${color})` }}
            />
          </motion.div>

          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex justify-between items-center"
              >
                <span className="text-[0.55rem] font-mono" style={{ color: `${color}80` }}>
                  PROFICIENCY
                </span>
                <span
                  className="text-[0.6rem] font-mono font-semibold"
                  style={{ color }}
                >
                  {level}%
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Corner accent — top right on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 right-0 w-8 h-8 pointer-events-none"
            style={{
              background: `radial-gradient(circle at top right, ${color}30, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function TechGrid() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [defaultCount, setDefaultCount] = useState(8)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setDefaultCount(6)
      else if (w < 1024) setDefaultCount(10)
      else setDefaultCount(16)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const categories = [
    { id: null, label: 'All' },
    { id: 'ai', label: 'AI / ML' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'devops', label: 'DevOps' },
  ]

  const defaultSkills = [
    ...skills.filter((s) => s.category === 'ai'),
    ...skills.filter((s) => s.category !== 'ai'),
  ].slice(0, defaultCount)

  const filtered = activeCategory
    ? skills.filter((s) => s.category === activeCategory)
    : defaultSkills

  return (
    <div className="space-y-6">
      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <motion.button
              key={String(cat.id)}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-1.5 rounded-full text-xs font-mono border transition-all duration-200"
              style={{
                background: isActive ? 'var(--accent)' : 'transparent',
                borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                color: isActive ? '#080808' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {cat.label}
            </motion.button>
          )
        })}

        {/* Count badge */}
        <span className="ml-auto self-center text-xs font-mono text-text-muted">
          {activeCategory ? `${filtered.length} techs` : `${defaultCount} of ${skills.length}`}
        </span>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <TechCard
                name={skill.name}
                color={skill.color}
                level={skill.level}
                category={skill.category}
                index={i}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
