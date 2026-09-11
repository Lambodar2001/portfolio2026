import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const inputs = [
    { label: 'Name', type: 'text', id: 'name', placeholder: 'Your name' },
    { label: 'Email', type: 'email', id: 'email', placeholder: 'you@company.com' },
  ]

  return (
    <section id="contact" className="relative py-32 px-6 lg:px-8 bg-gradient-to-b from-[#0f0f1e] to-[#1a1a2e]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-heading text-white mb-4">Let's Connect</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Drop a message and let's talk.
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: '📧', label: 'Email', value: 'hello@lambodar.dev' },
            { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/lambodar' },
            { icon: '🔗', label: 'GitHub', value: 'github.com/lambodar' },
          ].map((contact, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: false }}
            >
              <motion.div
                whileHover={{ y: -4 }}
                className="card-premium text-center"
              >
                <div className="text-4xl mb-4">{contact.icon}</div>
                <div className="text-sm text-gray-500 mb-2">{contact.label}</div>
                <div className="text-white font-semibold text-sm">{contact.value}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="card-premium max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {inputs.map((input, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">{input.label}</label>
                <motion.input
                  type={input.type}
                  id={input.id}
                  placeholder={input.placeholder}
                  whileFocus={{ boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.2)' }}
                  onChange={(e) => setFormState({ ...formState, [input.id]: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent-primary transition-colors"
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <motion.textarea
                placeholder="Tell me about your project..."
                rows={5}
                whileFocus={{ boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.2)' }}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent-primary transition-colors resize-none"
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-premium btn-primary"
            >
              {submitted ? 'Message Sent! ✓' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
