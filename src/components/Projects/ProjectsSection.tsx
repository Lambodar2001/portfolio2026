import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function ProjectsSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false })

  const projects = [
    {
      title: 'E-Commerce Backend',
      desc: 'Java Spring Boot microservices handling 10K+ concurrent users',
      tags: ['Java', 'Spring Boot', 'Microservices', 'Redis'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Fintech Mobile App',
      desc: 'Cross-platform mobile app for peer-to-peer payments',
      tags: ['React Native', 'TypeScript', 'Node.js', 'AWS'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Corporate Web Portal',
      desc: 'Full-stack enterprise portal with real-time dashboards',
      tags: ['React', 'Next.js', 'Java', 'Docker'],
      gradient: 'from-green-500 to-teal-500'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -90, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 12,
        duration: 0.8,
      },
    },
  }

  return (
    <section ref={ref} id="projects" className="py-24 px-4 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Floating Blobs */}
      <motion.div
        className="absolute -top-40 right-20 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-full blur-3xl blob-2"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 9, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 -left-20 w-96 h-96 bg-gradient-to-br from-green-500/20 to-cyan-500/10 rounded-full blur-3xl blob-1"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 11, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 gradient-text">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300">
            Real-world solutions built with modern technologies and best practices.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{
                y: -15,
                scale: 1.05,
                rotateZ: 2,
                rotateY: 10,
              }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl border-2 border-cyan-400/30 glass-panel glass-panel-hover hover-lift overflow-hidden h-full">
                {/* Gradient Background */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${project.gradient} transition-all duration-300`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    initial={{ rotateZ: 0, scale: 1 }}
                    whileHover={{ rotateZ: 10, scale: 1.2 }}
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white font-bold mb-4`}
                  >
                    {idx === 0 ? '💼' : idx === 1 ? '📱' : '🌐'}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-white mb-3 group-hover:gradient-text transition">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    {project.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIdx) => (
                      <motion.span
                        key={tag}
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: tagIdx * 0.1 }}
                        whileHover={{ scale: 1.1, y: -3 }}
                        className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Animated Bottom Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 origin-left"
                />

                {/* Corner Accent */}
                <motion.div
                  whileHover={{ scale: 1.2, opacity: 0.8 }}
                  className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-full blur-xl"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-semibold neon-border hover-lift"
          >
            View All Projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
