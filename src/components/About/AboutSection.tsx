import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false })

  const skills = [
    {
      title: 'AI + Development',
      desc: 'Machine Learning, Python, TensorFlow, Data Science, NLP, Computer Vision',
      icon: '🤖',
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Software Development',
      desc: 'Java, Spring Boot, Microservices, System Design, Database Design, Distributed Systems',
      icon: '⚙️',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Full-Stack Dev',
      desc: 'React, Next.js, Node.js, AWS, Docker, Kubernetes, DevOps',
      icon: '🚀',
      color: 'from-cyan-400 to-blue-500'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  }

  return (
    <section ref={ref} id="about" className="py-24 px-4 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Floating Blobs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-red-500/20 to-pink-500/10 rounded-full blur-3xl blob-1"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-full blur-3xl blob-2"
        animate={{ scale: [1.3, 1, 1.3] }}
        transition={{ duration: 10, repeat: Infinity }}
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
            About Me
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl">
            Full-stack software engineer specializing in scalable architectures and enterprise solutions.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{
                y: -20,
                rotateY: 15,
                rotateX: 10,
                scale: 1.05,
              }}
              className="group perspective-container"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="p-8 rounded-2xl border-2 border-cyan-400/30 glass-panel glass-panel-hover hover-lift relative overflow-hidden">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300" />

                {/* Icon */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-5xl mb-4 inline-block"
                >
                  {skill.icon}
                </motion.div>

                {/* Title */}
                <h3 className={`text-2xl font-semibold mb-3 bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                  {skill.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed relative z-10">
                  {skill.desc}
                </p>

                {/* Animated Border on Hover */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-3 gap-6 p-8 rounded-2xl glass-panel border-2 border-cyan-400/30 neon-border"
        >
          {[
            { num: '50+', label: 'Projects Delivered', icon: '📦' },
            { num: '100%', label: 'Client Satisfaction', icon: '⭐' },
            { num: '3+', label: 'Years Experience', icon: '⚡' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.15, y: -10 }}
              className="text-center hover-lift"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <motion.div
                animate={{ backgroundPosition: ['0%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-4xl font-bold gradient-text mb-2"
              >
                {stat.num}
              </motion.div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
