import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import ProjectCard from './ProjectCard'
import { projects } from '../../data/portfolio'

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Featured Projects"
          subtitle="Transforming complex business requirements into scalable, elegant solutions"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              icon={project.icon}
              color={project.color}
            />
          ))}
        </div>

        {/* View all projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 hover:border-neon-purple/30 transition-all duration-300 hover:shadow-lg hover:shadow-neon-purple/10"
          >
            View All Projects
            <span className="text-lg">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
