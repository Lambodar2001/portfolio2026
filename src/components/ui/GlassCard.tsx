import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div
      className={`
        glass rounded-2xl p-6
        ${hover ? 'transition-all duration-300 hover:border-neon-indigo/30 hover:shadow-lg hover:shadow-neon-indigo/10' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
