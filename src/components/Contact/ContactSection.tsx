import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { contactInfo, socials, profile } from '../../data/portfolio'

type FormState = 'idle' | 'loading' | 'success' | 'error'

interface FormData {
  name: string
  email: string
  message: string
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  email: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
}

function SocialCard({ label, href, icon }: { label: string; href: string; icon: string }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="card p-6 flex flex-col items-center gap-3 group transition-all"
      data-cursor="hovering"
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center border border-[var(--border)] group-hover:border-accent/30 transition-colors"
        style={{ color: 'var(--text-secondary)' }}
      >
        {SOCIAL_ICONS[icon] ?? icon}
      </div>
      <div className="text-center">
        <div className="font-display font-semibold text-sm text-text-primary">{label}</div>
      </div>
    </motion.a>
  )
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' })
  const [formState, setFormState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    if (formData.message.trim().length < 10) newErrors.message = 'Message is too short'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setFormState('loading')

    try {
      // If VITE_FORMSPREE_ID is set, submit to Formspree
      if (contactInfo.formEndpoint) {
        const res = await fetch(contactInfo.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) throw new Error('Failed to send')
      } else {
        // No backend configured — simulate a brief delay and show info
        await new Promise((r) => setTimeout(r, 1000))
        console.info(
          '[Contact Form] No form endpoint configured.\n' +
          'Set VITE_FORMSPREE_ID in your .env file.\n' +
          'Form data:', formData
        )
      }
      setFormState('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setFormState('error')
    }
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const formContacts = [
    { label: 'Email', href: `mailto:${contactInfo.email}`, icon: 'email' },
    ...socials.filter((s) => ['GitHub', 'LinkedIn'].includes(s.label)),
  ]

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-bg-base">
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
          <span className="text-label text-text-muted">CONTACT</span>
        </motion.div>

        {/* Big statement */}
        <div className="mb-20">
          {["LET'S BUILD", 'SOMETHING', 'IMPOSSIBLE.'].map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: false }}
                className="text-heading font-display font-bold"
                style={{ color: i === 2 ? 'var(--accent)' : 'var(--text-primary)' }}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Social links + info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false }}
            className="space-y-8"
          >
            <p className="text-lg text-text-secondary leading-relaxed max-w-md">
              Have a project in mind or just want to say hello? I'm always open to interesting conversations and exciting opportunities.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {formContacts.map((c) => (
                <SocialCard key={c.label} label={c.label} href={c.href} icon={c.icon} />
              ))}
            </div>

            <div className="flex items-center gap-3 text-sm text-text-muted">
              <div className="status-dot" />
              <span>
                {profile.available
                  ? 'Currently available for new projects'
                  : 'Currently at capacity — open to future enquiries'}
              </span>
            </div>

            {/* Note about form */}
            {!contactInfo.formEndpoint && (
              <div className="text-xs text-text-muted font-mono bg-bg-surface-2 border border-[var(--border)] rounded-lg px-4 py-3">
                💡 To enable real form submissions, add <code className="text-accent">VITE_FORMSPREE_ID</code> to your <code>.env</code> file.
                Get yours free at <a href="https://formspree.io" target="_blank" rel="noopener" className="text-accent-cyan underline">formspree.io</a>
              </div>
            )}
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false }}
          >
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="card p-10 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto text-3xl">
                    ✓
                  </div>
                  <h3 className="font-display font-bold text-xl text-text-primary">Message Sent!</h3>
                  <p className="text-text-secondary text-sm">
                    Thanks for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="btn btn-secondary mt-4 text-sm"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="card p-8 space-y-6"
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="form-input"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      disabled={formState === 'loading'}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="form-input"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      disabled={formState === 'loading'}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="form-input resize-none"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      disabled={formState === 'loading'}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                    )}
                  </div>

                  {/* Error state */}
                  {formState === 'error' && (
                    <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
                      Something went wrong. Please try again or email me directly at{' '}
                      <a href={`mailto:${contactInfo.email}`} className="underline">
                        {contactInfo.email}
                      </a>
                    </div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={formState === 'loading'}
                    whileHover={{ scale: formState === 'loading' ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-primary w-full justify-center"
                  >
                    {formState === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
