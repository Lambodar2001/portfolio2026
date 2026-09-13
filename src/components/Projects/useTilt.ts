import { useCallback, useState } from 'react'
import { useSpring } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

export function useTilt(maxX = 8, maxY = 12) {
  const reduced = useReducedMotion()
  const rotateX = useSpring(0, { stiffness: 160, damping: 22, mass: 0.5 })
  const rotateY = useSpring(0, { stiffness: 160, damping: 22, mass: 0.5 })
  const [light, setLight] = useState({ x: 50, y: 50, visible: false })

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reduced) return
      const rect = e.currentTarget.getBoundingClientRect()
      const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
      const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
      rotateY.set(nx * maxY)
      rotateX.set(-ny * maxX)
      setLight({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
        visible: true,
      })
    },
    [rotateX, rotateY, maxX, maxY, reduced]
  )

  const onMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    setLight((l) => ({ ...l, visible: false }))
  }, [rotateX, rotateY])

  return { rotateX, rotateY, light, onMouseMove, onMouseLeave }
}
