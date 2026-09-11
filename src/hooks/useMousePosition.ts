import { useEffect, useRef } from 'react'

interface MousePosition {
  x: number
  y: number
  normalizedX: number // -1 to 1
  normalizedY: number // -1 to 1
}

export function useMousePosition(elementRef?: React.RefObject<HTMLElement>) {
  const position = useRef<MousePosition>({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 })
  const listeners = useRef<Set<(pos: MousePosition) => void>>(new Set())

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = elementRef?.current
      if (target) {
        const rect = target.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        position.current = {
          x,
          y,
          normalizedX: (x / rect.width - 0.5) * 2,
          normalizedY: (y / rect.height - 0.5) * 2,
        }
      } else {
        position.current = {
          x: e.clientX,
          y: e.clientY,
          normalizedX: (e.clientX / window.innerWidth - 0.5) * 2,
          normalizedY: (e.clientY / window.innerHeight - 0.5) * 2,
        }
      }
      listeners.current.forEach((fn) => fn(position.current))
    }

    const el = elementRef?.current ?? window
    el.addEventListener('mousemove', handleMouseMove as EventListener)
    return () => el.removeEventListener('mousemove', handleMouseMove as EventListener)
  }, [elementRef])

  const subscribe = (fn: (pos: MousePosition) => void) => {
    listeners.current.add(fn)
    return () => listeners.current.delete(fn)
  }

  return { position, subscribe }
}
