import { Suspense } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import AnimatedCounter from '../ui/AnimatedCounter'
import SkillsScene from './SkillsScene'
import { stats } from '../../data/portfolio'

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-indigo/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Me"
          subtitle="Building scalable architectures and delivering impactful digital solutions"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* About text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              I'm a passionate software developer with deep expertise in{' '}
              <span className="text-white font-medium">Java backend systems</span>,{' '}
              <span className="text-white font-medium">modern web applications</span>, and{' '}
              <span className="text-white font-medium">cross-platform mobile development</span>.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              From designing microservices architectures that handle thousands of concurrent
              users to crafting pixel-perfect user interfaces, I bring end-to-end technical
              expertise to every project. My approach combines clean code principles with
              pragmatic engineering to deliver solutions that scale.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              I specialize in transforming complex business requirements into elegant,
              maintainable software systems. Whether it's a high-throughput backend API,
              a responsive web platform, or a performant mobile app — I architect solutions
              built to last.
            </p>

            {/* Tech categories */}
            <div className="flex flex-wrap gap-3 mt-8">
              {['Java Backend', 'Web Applications', 'Mobile Apps', 'Cloud & DevOps'].map(
                (cat) => (
                  <span
                    key={cat}
                    className="px-4 py-2 rounded-full text-sm font-medium glass text-neon-purple border-neon-purple/20"
                  >
                    {cat}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* 3D Skills constellation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Suspense
              fallback={
                <div className="w-full h-[400px] flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-neon-purple/30 border-t-neon-purple rounded-full animate-spin" />
                </div>
              }
            >
              <SkillsScene />
            </Suspense>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 glass rounded-2xl p-8 md:p-12"
        >
          {stats.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
