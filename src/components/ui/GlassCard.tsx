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
        card-premium p-6 rounded-2xl
        ${hover ? 'hover:shadow-hover' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
