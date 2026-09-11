import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-white">
              L
            </div>
            <span className="font-bold text-white text-lg hidden sm:block">Lambodar</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#hero" className="text-gray-300 hover:text-cyan-400 transition">Home</a>
            <a href="#about" className="text-gray-300 hover:text-cyan-400 transition">About</a>
            <a href="#projects" className="text-gray-300 hover:text-cyan-400 transition">Projects</a>
            <a href="#contact" className="text-gray-300 hover:text-cyan-400 transition">Contact</a>
            <a href="#contact" className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition">
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-cyan-400 text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/60 backdrop-blur-md border-t border-cyan-500/20 py-4"
        >
          <div className="max-w-7xl mx-auto px-4 space-y-3">
            <a href="#hero" className="block text-gray-300 hover:text-cyan-400 py-2">Home</a>
            <a href="#about" className="block text-gray-300 hover:text-cyan-400 py-2">About</a>
            <a href="#projects" className="block text-gray-300 hover:text-cyan-400 py-2">Projects</a>
            <a href="#contact" className="block text-gray-300 hover:text-cyan-400 py-2">Contact</a>
            <a href="#contact" className="block px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-semibold text-center">
              Hire Me
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
