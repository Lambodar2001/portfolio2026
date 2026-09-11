import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skillGroups, stats } from '../../data/portfolio'

const SkillsConstellation = lazy(() => import('./SkillsConstellation'))

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })

  return (
    <div ref={ref} className="text-center py-10 border border-[var(--border)] rounded-2xl hover:border-[var(--border-hover)] transition-colors">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-bold text-4xl lg:text-5xl text-gradient mb-2"
      >
        {value}{suffix}
      </motion.div>
      <div className="text-sm text-text-muted">{label}</div>
    </div>
  )
}

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: false })

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section id="about" className="relative py-32 lg:py-40 overflow-hidden bg-bg-base">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-8 h-px bg-accent" />
          <span className="text-label text-text-muted">ABOUT</span>
        </motion.div>

        {/* Large statement */}
        <div className="mb-24">
          {['I BUILD', 'THINGS', 'THAT MATTER.'].map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: false }}
                className="text-heading font-display font-bold text-text-primary"
              >
                {line}
              </motion.div>
            </div>
          ))}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: false }}
            className="text-lg text-text-secondary max-w-xl mt-8 leading-relaxed"
          >
            Specialized in building scalable, intelligent systems that drive business value and user impact.
            I bring both engineering depth and product thinking to every project.
          </motion.p>
        </div>

        {/* Skill expertise cards */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid md:grid-cols-3 gap-6 mb-24"
        >
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.category}
              variants={item}
              whileHover={{ y: -6 }}
              className="card p-8 group cursor-default transition-all duration-300"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border)',
              }}
            >
              {/* Icon + accent indicator */}
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    background: `${group.accentColor}12`,
                    border: `1px solid ${group.accentColor}20`,
                  }}
                >
                  {group.icon}
                </div>
                <div
                  className="w-1.5 h-1.5 rounded-full mt-2"
                  style={{ background: group.accentColor, boxShadow: `0 0 8px ${group.accentColor}` }}
                />
              </div>

              {/* Content */}
              <h3 className="font-display font-semibold text-text-primary text-lg mb-2">
                {group.category}
              </h3>
              <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                {group.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {group.tech.map((tech) => (
                  <span
                    key={tech}
                    className="tag group-hover:border-white/15 transition-colors"
                    style={{ fontSize: '0.7rem' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Bottom accent line on hover */}
              <div
                className="h-px mt-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, ${group.accentColor}, transparent)` }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-24">
          {stats.slice(0, 3).map((stat) => (
            <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Skills constellation */}
        <div id="skills">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-8 h-px bg-accent" />
            <span className="text-label text-text-muted">TECHNOLOGY ECOSYSTEM</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
            className="text-text-muted text-sm mb-2 max-w-md"
          >
            An interactive constellation of technologies. Move your mouse to explore.
          </motion.p>

          <Suspense
            fallback={
              <div className="h-[400px] flex items-center justify-center text-text-muted text-sm">
                Loading constellation...
              </div>
            }
          >
            <SkillsConstellation />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
