import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { useRef, useState } from 'react'

export default function HeroSection() {
  const imageRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    setMousePosition({ x: x * 20, y: y * 20 })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Floating Blobs */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-full blur-3xl blob-1"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 rounded-full blur-3xl blob-2"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              Hi, I'm{' '}
              <span className="gradient-text text-reveal">
                Lambodar
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 leading-relaxed"
          >
            Full-Stack Developer & Enterprise Architect. Building scalable systems and crafting beautiful web experiences.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-400"
          >
            Specialized in Java backend systems, React web applications, and cloud infrastructure. Trusted by startups and enterprises to architect systems that drive growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-4 pt-4 flex-wrap"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 217, 255, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-semibold hover:shadow-2xl transition flex items-center gap-2 hover:lift"
            >
              View My Work
              <HiArrowRight className="group-hover:translate-x-1 transition" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, borderColor: '#00d9ff' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400/10 transition neon-border"
            >
              Get In Touch
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex gap-12 pt-8 border-t border-gray-700"
          >
            {[
              { num: '50+', label: 'Projects Delivered' },
              { num: '100%', label: 'Client Satisfaction' },
              { num: '3+', label: 'Years Experience' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1, y: -5 }}
                className="hover-lift"
              >
                <div className="text-3xl font-bold gradient-text">{stat.num}</div>
                <div className="text-gray-400 text-sm mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image with 3D Effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateZ: -10 }}
          animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          ref={imageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative perspective-container"
        >
          {/* 3D Image Container */}
          <motion.div
            animate={{
              rotateX: mousePosition.y,
              rotateY: mousePosition.x,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1200px'
            }}
            className="relative w-full aspect-square"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-cyan-400/50 bg-gradient-to-br from-cyan-500/30 to-blue-500/20 shadow-2xl glow-cyan-box">
              <img
                src="/myimg.png"
                alt="Lambodar"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40" />

              {/* Shimmer Effect */}
              <div className="absolute inset-0 shimmer opacity-60" />
            </div>

            {/* Orbiting Circles */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-8 rounded-full border border-cyan-400/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-16 rounded-full border border-blue-500/10"
            />
          </motion.div>

          {/* Available Badge */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -bottom-6 right-6 glass-panel rounded-xl p-4 glass-panel-hover neon-border"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold pulse-glow"
              >
                ✓
              </motion.div>
              <div>
                <div className="font-semibold text-white text-sm">Available Now</div>
                <div className="text-gray-400 text-xs">Open for Opportunities</div>
              </div>
            </div>
          </motion.div>

          {/* Floating Particles Around Image */}
          {[...Array(6)].map((_, idx) => (
            <motion.div
              key={idx}
              animate={{
                x: [Math.cos(idx * 60 * Math.PI / 180) * 100, Math.cos(idx * 60 * Math.PI / 180) * 120],
                y: [Math.sin(idx * 60 * Math.PI / 180) * 100, Math.sin(idx * 60 * Math.PI / 180) * 120],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-2 h-2 rounded-full bg-cyan-400/60 blur-sm"
              style={{
                left: '50%',
                top: '50%',
                marginLeft: '-4px',
                marginTop: '-4px'
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-cyan-400 text-sm z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span>Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-cyan-400 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
