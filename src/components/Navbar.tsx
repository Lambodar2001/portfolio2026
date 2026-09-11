import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl font-bold text-white tracking-tight"
          >
            Lambodar
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                whileHover={{ color: '#8b5cf6' }}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block btn-premium btn-primary text-sm"
          >
            Let's Talk
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-white/5 py-4 space-y-2"
          >
            {navItems.map((item, idx) => (
              <a key={idx} href={item.href} className="block px-4 py-2 text-gray-400 hover:text-white transition-colors">
                {item.label}
              </a>
            ))}
            <a href="#contact" className="block px-4 py-2 btn-premium btn-primary text-sm mt-4">
              Let's Talk
            </a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
