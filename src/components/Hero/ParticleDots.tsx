import { useMemo } from 'react'

function Dot({ x, y, size, delay, color }: {
  x: number; y: number; size: number; delay: number; color: string
}) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: color,
        opacity: 0,
        animation: `dotPulse ${3 + Math.random() * 4}s ${delay}s ease-in-out infinite`,
        boxShadow: `0 0 ${size * 2}px ${color}40`,
      }}
    />
  )
}

const DOT_COUNT = 60

export default function ParticleDots() {
  const dots = useMemo(() => {
    const result: { x: number; y: number; size: number; delay: number; color: string }[] = []
    for (let i = 0; i < DOT_COUNT; i++) {
      const isAccent = Math.random() < 0.5
      result.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 5,
        color: isAccent ? '#e4ff00' : '#00d4ff',
      })
    }
    return result
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      {dots.map((dot, i) => (
        <Dot key={i} {...dot} />
      ))}
      <style>{`
        @keyframes dotPulse {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.6; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
