import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false })

  const testimonials = [
    { name: 'Rajesh Mehta', role: 'CTO at TechVentures', text: 'Exceptional backend architect who delivers production-grade systems.' },
    { name: 'Sarah Chen', role: 'PM at FinFlow', text: 'Built an amazing mobile app that our users absolutely love.' },
    { name: 'Michael Torres', role: 'VP at GlobalCorp', text: 'Transformed our operations with a reliable, fast web portal.' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, rotateY: -90, y: 40 },
    visible: {
      opacity: 1,
      rotateY: 0,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  }

  return (
    <section ref={ref} id="contact" className="py-24 px-4 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Floating Blobs */}
      <motion.div
        className="absolute top-40 left-20 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-full blur-3xl blob-1"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 -right-20 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 rounded-full blur-3xl blob-2"
        animate={{ scale: [1.2, 1, 1.2] }}
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
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300">What clients say about my work</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Testimonials */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  y: -10,
                }}
                className="group perspective-container"
              >
                <div className="p-6 rounded-2xl border-2 border-cyan-400/30 glass-panel glass-panel-hover hover-lift relative overflow-hidden">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-yellow-400 text-lg"
                      >
                        ⭐
                      </motion.span>
                    ))}
                  </div>

                  {/* Quote */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-300 mb-4 italic text-sm"
                  >
                    "{testimonial.text}"
                  </motion.p>

                  {/* Author */}
                  <div className="pt-4 border-t border-cyan-400/20">
                    <p className="font-semibold text-white text-sm group-hover:text-cyan-400 transition">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-400 text-xs">{testimonial.role}</p>
                  </div>

                  {/* Animated Corner */}
                  <motion.div
                    whileHover={{ scale: 1.3, opacity: 0.8 }}
                    className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-cyan-500/30 to-blue-500/10 rounded-full blur-lg"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateZ: 5 }}
            whileInView={{ opacity: 1, x: 0, rotateZ: 0 }}
            transition={{ duration: 0.8 }}
            className="p-8 rounded-2xl border-2 border-cyan-400/30 glass-panel glass-panel-hover neon-border"
          >
            <h3 className="text-3xl font-bold text-white mb-2">Let's Work Together</h3>
            <p className="text-gray-400 mb-6">Tell me about your next project</p>

            <form className="space-y-4">
              {[
                { label: 'Name', type: 'text', placeholder: 'Your Name' },
                { label: 'Email', type: 'email', placeholder: 'your@email.com' }
              ].map((field, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <label className="block text-sm text-gray-300 mb-2">{field.label}</label>
                  <motion.input
                    whileFocus={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' }}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border-2 border-cyan-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-slate-800/50 transition"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm text-gray-300 mb-2">Message</label>
                <motion.textarea
                  whileFocus={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' }}
                  placeholder="Tell me about your project..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border-2 border-cyan-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-slate-800/50 transition resize-none"
                />
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(0, 217, 255, 0.5)',
                  textShadow: '0 0 10px rgba(0, 217, 255, 0.5)',
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-semibold hover:shadow-2xl transition neon-border relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="relative">Send Message</span>
              </motion.button>
            </form>

            {/* Social Links */}
            <div className="mt-8 pt-8 border-t border-cyan-400/20">
              <p className="text-gray-400 text-sm mb-4">Connect with me on social</p>
              <div className="flex gap-4">
                {['LinkedIn', 'GitHub', 'Twitter'].map((platform) => (
                  <motion.a
                    key={platform}
                    href="#"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition neon-border"
                  >
                    {platform[0]}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
