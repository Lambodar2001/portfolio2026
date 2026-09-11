import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

type CursorState = 'default' | 'hovering' | 'view' | 'explore' | 'drag'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [cursorState, setCursorState] = useState<CursorState>('default')
  const [isVisible, setIsVisible] = useState(false)
  const [label, setLabel] = useState('')

  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 }
  const ringSpringConfig = { damping: 20, stiffness: 200, mass: 0.8 }

  const dotX = useSpring(0, springConfig)
  const dotY = useSpring(0, springConfig)
  const ringX = useSpring(0, ringSpringConfig)
  const ringY = useSpring(0, ringSpringConfig)

  useEffect(() => {
    // Hide on touch devices
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouchDevice) return

    const updateCursor = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY

      dotX.set(x - 3)
      dotY.set(y - 3)
      ringX.set(x - 18)
      ringY.set(y - 18)

      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Detect interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const closest = target.closest('[data-cursor]') as HTMLElement | null

      if (closest) {
        const cursorType = closest.dataset.cursor as CursorState
        const cursorLabel = closest.dataset.cursorLabel ?? ''
        setCursorState(cursorType || 'hovering')
        setLabel(cursorLabel)
      } else if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]')
      ) {
        setCursorState('hovering')
        setLabel('')
      } else {
        setCursorState('default')
        setLabel('')
      }
    }

    document.addEventListener('mousemove', updateCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [dotX, dotY, ringX, ringY, isVisible])

  const isExpanded = cursorState === 'hovering' || cursorState === 'view' || cursorState === 'explore'
  const hasLabel = cursorState === 'view' || cursorState === 'explore'

  return (
    <>
      {/* Dot */}
      <motion.div
        ref={dotRef}
        className="cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          opacity: isVisible ? 1 : 0,
          scale: cursorState === 'hovering' ? 0 : 1,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />

      {/* Ring */}
      <motion.div
        ref={ringRef}
        style={{
          x: ringX,
          y: ringY,
          opacity: isVisible ? 1 : 0,
          width: isExpanded ? (hasLabel ? '80px' : '56px') : '36px',
          height: isExpanded ? (hasLabel ? '80px' : '56px') : '36px',
          borderRadius: isExpanded ? (hasLabel ? '10px' : '50%') : '50%',
          position: 'fixed',
          top: 0,
          left: 0,
          border: '1.5px solid rgba(228, 255, 0, 0.5)',
          pointerEvents: 'none',
          zIndex: 99998,
          mixBlendMode: 'difference',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformOrigin: 'center',
          marginLeft: isExpanded ? (hasLabel ? '-40px' : '-28px') : '-18px',
          marginTop: isExpanded ? (hasLabel ? '-40px' : '-28px') : '-18px',
        }}
        transition={{
          opacity: { duration: 0.2 },
          width: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          borderRadius: { duration: 0.3 },
          marginLeft: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          marginTop: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        {hasLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-label text-accent"
            style={{ fontSize: '0.55rem', letterSpacing: '0.1em' }}
          >
            {label || (cursorState === 'view' ? 'VIEW' : 'EXPLORE')}
          </motion.span>
        )}
      </motion.div>
    </>
  )
}
