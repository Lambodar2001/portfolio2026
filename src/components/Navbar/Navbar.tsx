import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, profile } from '../../data/portfolio'

interface NavbarProps {
  onCommandOpen: () => void
}

export default function Navbar({ onCommandOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3'
            : 'py-5'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-500 ${
            scrolled ? 'max-w-5xl' : ''
          }`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled
                ? 'surface-glass rounded-2xl px-6 py-3 shadow-card'
                : ''
            }`}
          >
            {/* Logo */}
            <motion.button
              onClick={() => handleNavClick('#hero')}
              whileHover={{ opacity: 0.8 }}
              whileTap={{ scale: 0.96 }}
              className="font-display font-bold text-text-primary text-lg tracking-tight"
            >
              {profile.name}
              <span className="text-accent">.</span>
            </motion.button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 font-display font-medium rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-3">
              {/* CMD+K hint */}
              <button
                onClick={onCommandOpen}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] text-text-muted hover:text-text-primary hover:border-[var(--border-hover)] transition-all duration-200 text-xs font-mono"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                </svg>
                <span>⌘K</span>
              </button>

              {/* CTA */}
              <motion.button
                onClick={() => handleNavClick('#contact')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn btn-primary text-sm py-2 px-5"
              >
                Let's Talk
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <button
              aria-label="Toggle navigation"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            >
              <motion.span
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
                transition={{ duration: 0.25 }}
                className="w-6 h-0.5 bg-text-primary block rounded-full"
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-0.5 bg-text-primary block rounded-full"
              />
              <motion.span
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
                transition={{ duration: 0.25 }}
                className="w-6 h-0.5 bg-text-primary block rounded-full"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-bg-base/80 backdrop-blur-md z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-bg-surface-2 border-l border-[var(--border)] z-50 flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-display font-bold text-text-primary">
                  {profile.name}<span className="text-accent">.</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-text-muted hover:text-text-primary transition-colors p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-2 flex-1">
                {navLinks.map((link, idx) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.07, duration: 0.3 }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left py-3 px-4 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all font-display font-medium text-lg"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="space-y-3 mt-auto">
                <button
                  onClick={() => {
                    setMobileOpen(false)
                    onCommandOpen()
                  }}
                  className="w-full py-3 px-4 border border-[var(--border)] rounded-xl text-text-secondary text-sm font-mono flex items-center gap-2"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                  </svg>
                  Command Menu ⌘K
                </button>
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="w-full btn btn-primary py-3"
                >
                  Let's Talk
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
