import { Suspense } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import FluidBackground from './FluidBackground'
import { testimonials } from '../../data/portfolio'

export default function TestimonialsSection() {
  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* 3D fluid background */}
      <div className="absolute inset-0">
        <Suspense
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-dark via-dark to-neon-indigo/10" />
          }
        >
          <FluidBackground />
        </Suspense>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Client Testimonials & Let's Connect"
          subtitle="Trusted by startups, scale-ups, and enterprises. Ready to bring your vision to life?"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-6"
          >
            {testimonials.map((testimonial, idx) => (
              <GlassCard
                key={testimonial.id}
                hover={true}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg" style={{ color: '#fbbf24' }}>
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-slate-200 text-lg leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-indigo to-neon-purple flex items-center justify-center font-bold text-white text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-slate-400 text-sm">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </GlassCard>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <GlassCard className="sticky top-32">
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Let's Start Something Great
              </h3>
              <p className="text-slate-400 text-sm mb-8">
                Have a project in mind? Let's discuss how I can help bring your ideas to life.
              </p>

              <form className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Rajesh Mehta"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-neon-purple/50 focus:bg-white/10 transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="rajesh@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-neon-purple/50 focus:bg-white/10 transition-all duration-300"
                  />
                </div>

                {/* Project Scope */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Project Scope
                  </label>
                  <textarea
                    placeholder="Tell me about your project... (Web app, mobile, backend, etc.)"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-neon-purple/50 focus:bg-white/10 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-neon-indigo to-neon-purple text-white font-semibold hover:shadow-lg hover:shadow-neon-purple/30 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Send Message
                </button>
              </form>

              {/* Social links */}
              <div className="mt-8 pt-8 border-t border-white/5">
                <p className="text-slate-400 text-sm mb-4">Connect with me on</p>
                <div className="flex gap-4">
                  {[
                    { label: 'GitHub', icon: '↗' },
                    { label: 'LinkedIn', icon: '↗' },
                    { label: 'Twitter', icon: '↗' },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href="#"
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-neon-purple/30 transition-all duration-300"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
