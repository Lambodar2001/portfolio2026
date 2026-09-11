import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'

export default function FloatingContactButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past hero (500px)
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="#contact"
          initial={{
            y: -100,
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1
          }}
          exit={{
            y: -100,
            opacity: 0,
            scale: 0.8
          }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
            mass: 0.8
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-6 right-6 z-[9999] group"
        >
          {/* Main button */}
          <motion.div
            className="glass-panel px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer"
            animate={{
              boxShadow: isHovering
                ? '0 0 30px rgba(0, 217, 255, 0.6), inset 0 0 20px rgba(0, 217, 255, 0.15)'
                : '0 0 20px rgba(0, 217, 255, 0.3), inset 0 0 10px rgba(0, 217, 255, 0.08)'
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Glowing background circle */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary opacity-0 -z-10"
              animate={{ opacity: isHovering ? 0.1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Pulsing ring effect */}
            {isHovering && (
              <motion.div
                className="absolute inset-0 rounded-full border border-brand-primary"
                animate={{
                  scale: [1, 1.2],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
              />
            )}

            {/* Text and icon */}
            <span className="font-semibold text-text-primary text-sm relative z-10">
              Contact Me
            </span>
            <motion.div
              animate={{ x: isHovering ? 4 : 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <HiArrowRight className="w-4 h-4 text-brand-primary" />
            </motion.div>
          </motion.div>

          {/* Tooltip on hover */}
          <AnimatePresence>
            {isHovering && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 right-0 bg-dark-surface/90 px-4 py-2 rounded-lg whitespace-nowrap text-xs text-text-secondary border border-brand-primary/30"
              >
                Let's create something amazing
              </motion.div>
            )}
          </AnimatePresence>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
