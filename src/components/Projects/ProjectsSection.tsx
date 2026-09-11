import { motion } from 'framer-motion'
import { projects } from '../../data/portfolio'
import ProjectCard from './ProjectCard'

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32 lg:py-40 bg-bg-base">
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
          <span className="text-label text-text-muted">FEATURED WORK</span>
        </motion.div>

        {/* Statement */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false }}
            className="text-heading font-display font-bold text-text-primary mb-4"
          >
            Projects That
            <br />
            <span className="text-gradient">Ship.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
            className="text-lg text-text-secondary max-w-2xl leading-relaxed"
          >
            Technical excellence combined with meaningful business impact.
            Each project is a story of solving real problems at scale.
          </motion.p>
        </div>

        {/* Project list */}
        <div className="space-y-16 lg:space-y-24">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: false }}
          className="mt-20 flex items-center justify-between border-t border-[var(--border)] pt-12"
        >
          <p className="text-text-muted text-sm">
            More projects available on request.
          </p>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            whileHover={{ scale: 1.03, x: 4 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 text-sm font-display font-semibold text-accent hover:text-text-primary transition-colors"
          >
            Work Together
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
