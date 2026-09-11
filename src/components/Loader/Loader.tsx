import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoaderProps {
  onComplete: () => void
}

const STEPS = ['00', '01', '02', '03']

export default function Loader({ onComplete }: LoaderProps) {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      onComplete()
      return
    }

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return p + 2
      })
    }, 16)

    // Cycle through steps
    const stepIntervals: ReturnType<typeof setTimeout>[] = []
    STEPS.forEach((_, i) => {
      const t = setTimeout(() => setStep(i), i * 250)
      stepIntervals.push(t)
    })

    // Exit after ~1.2s
    const exitTimer = setTimeout(() => {
      setExiting(true)
      setTimeout(onComplete, 500)
    }, 1200)

    return () => {
      clearInterval(progressInterval)
      stepIntervals.forEach(clearTimeout)
      clearTimeout(exitTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-bg-base flex flex-col items-center justify-center"
        >
          {/* Counter */}
          <div className="relative mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[8rem] font-bold leading-none tracking-tighter text-bg-surface-3 select-none"
                style={{ WebkitTextStroke: '1px rgba(228, 255, 0, 0.15)' }}
              >
                {STEPS[step]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-label text-text-muted mb-8 tracking-wider"
          >
            INITIALIZING EXPERIENCE
          </motion.p>

          {/* Progress track */}
          <div className="w-48 h-px bg-bg-surface-3 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              style={{ transformOrigin: 'left' }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>

          {/* Dots */}
          <div className="flex gap-2 mt-8">
            {STEPS.map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{ background: i <= step ? 'var(--accent)' : 'var(--bg-surface-3)' }}
                animate={{ opacity: i <= step ? 1 : 0.3 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
