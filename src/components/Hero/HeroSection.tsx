import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { HiArrowDown, HiOutlineCode } from 'react-icons/hi'
import HeroScene from './HeroScene'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-neon-indigo/10" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-purple/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-blue/10 rounded-full blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-neon-purple">
                <HiOutlineCode className="text-lg" />
                <span>Available for Freelance Projects</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            >
              Hi, I am{' '}
              <span className="gradient-text text-glow">
                Lambodar Vijay Waghmare
              </span>
              <span className="text-neon-purple">.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-slate-400 text-lg sm:text-xl max-w-lg mb-8 leading-relaxed"
            >
              Freelance Software Developer | Architecting robust{' '}
              <span className="text-white font-medium">Web</span>,{' '}
              <span className="text-white font-medium">Mobile</span> &{' '}
              <span className="text-white font-medium">Java Backend</span> Solutions.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-neon-indigo to-neon-purple text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-neon-purple/30 hover:scale-105 flex items-center gap-2"
              >
                View My Work
                <HiArrowDown className="group-hover:translate-y-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition-all duration-300 hover:border-neon-purple/30"
              >
                Get In Touch
              </a>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              variants={itemVariants}
              className="flex gap-8 mt-12 pt-8 border-t border-white/5"
            >
              {[
                { value: '50+', label: 'Projects' },
                { value: '100%', label: 'Satisfaction' },
                { value: '3+', label: 'Years' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-slate-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="order-1 lg:order-2 h-[400px] sm:h-[500px] lg:h-[600px]"
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-neon-purple/30 border-t-neon-purple rounded-full animate-spin" />
                </div>
              }
            >
              <HeroScene />
            </Suspense>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <HiArrowDown />
        </motion.div>
      </motion.div>
    </section>
  )
}
