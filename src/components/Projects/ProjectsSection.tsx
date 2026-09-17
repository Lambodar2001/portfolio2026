import { motion } from 'framer-motion'
import { projects } from '../../data/portfolio'
import FeaturedProjectCard from './FeaturedProjectCard'
import ProjectCard from './ProjectCard'

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-12 lg:py-28 bg-bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="flex items-center gap-4 mb-5"
        >
          <div className="w-8 h-px bg-accent" />
          <span className="text-label text-text-muted">FEATURED WORK</span>
        </motion.div>

        {/* ── Heading row ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false }}
            className="font-display font-black text-text-primary leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            Projects That
            <br />
            <span className="text-gradient">Ship.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: false }}
            className="text-text-secondary max-w-xs text-sm leading-relaxed md:text-right"
          >
            Real-world systems with measurable impact. Hover each card.
          </motion.p>
        </div>

        {/* ── Featured card (project 01) ── */}
        <div className="mb-6">
          <FeaturedProjectCard project={projects[0]} index={0} />
        </div>

        {/* ── Smaller cards (projects 02 & 03) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {projects.slice(1).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + 1} />
          ))}
        </div>

        {/* ── Bottom CTA bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
          className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-text-muted text-sm">
            More projects available on request — NDA protected.
          </p>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            whileHover={{ x: 4 }}
            className="flex items-center gap-2 text-sm font-display font-semibold text-accent hover:text-text-primary transition-colors"
          >
            Start a Project Together
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
