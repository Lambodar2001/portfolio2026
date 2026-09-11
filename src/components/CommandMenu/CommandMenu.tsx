import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { commandItems } from '../../data/portfolio'

interface CommandMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = commandItems.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  )

  const grouped = filtered.reduce<Record<string, typeof commandItems>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  const flatFiltered = filtered

  const handleSelect = useCallback(
    (item: (typeof commandItems)[0]) => {
      if (item.external) {
        window.open(item.href, '_blank', 'noopener')
      } else {
        const el = document.querySelector(item.href)
        el?.scrollIntoView({ behavior: 'smooth' })
      }
      onClose()
      setQuery('')
      setSelectedIdx(0)
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setSelectedIdx(0)
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIdx(0)
  }, [query])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
        setQuery('')
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIdx((i) => Math.min(i + 1, flatFiltered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIdx((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (flatFiltered[selectedIdx]) handleSelect(flatFiltered[selectedIdx])
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, flatFiltered, selectedIdx, handleSelect, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="command-backdrop"
            onClick={onClose}
          >
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="command-panel mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
                <svg
                  className="w-4 h-4 text-text-muted flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-text-primary placeholder-text-muted text-sm outline-none font-display"
                />
                <kbd className="hidden sm:flex items-center gap-1 text-[0.6rem] text-text-muted bg-bg-surface-3 px-2 py-1 rounded font-mono">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="command-results">
                {Object.keys(grouped).length === 0 ? (
                  <div className="px-4 py-8 text-center text-text-muted text-sm">
                    No results for "{query}"
                  </div>
                ) : (
                  Object.entries(grouped).map(([category, items]) => (
                    <div key={category}>
                      <div className="px-4 pt-3 pb-1">
                        <span className="text-label text-text-muted" style={{ fontSize: '0.6rem' }}>
                          {category}
                        </span>
                      </div>
                      {items.map((item) => {
                        const globalIdx = flatFiltered.indexOf(item)
                        const isSelected = globalIdx === selectedIdx
                        return (
                          <button
                            key={item.label}
                            onMouseEnter={() => setSelectedIdx(globalIdx)}
                            onClick={() => handleSelect(item)}
                            className="w-full px-4 py-2.5 flex items-center gap-3 text-left transition-colors group"
                            style={{
                              background: isSelected
                                ? 'rgba(228, 255, 0, 0.05)'
                                : 'transparent',
                            }}
                          >
                            <span className="text-lg w-6 flex-shrink-0">{item.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div
                                className="text-sm font-medium"
                                style={{
                                  color: isSelected
                                    ? 'var(--accent)'
                                    : 'var(--text-primary)',
                                }}
                              >
                                {item.label}
                              </div>
                              <div className="text-xs text-text-muted truncate">
                                {item.description}
                              </div>
                            </div>
                            {(item as { external?: boolean }).external && (
                              <svg
                                className="w-3 h-3 text-text-muted flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            )}
                            {isSelected && !item.external && (
                              <kbd className="text-[0.55rem] text-text-muted bg-bg-surface-3 px-1.5 py-0.5 rounded font-mono flex-shrink-0">
                                ↵
                              </kbd>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer hint */}
              <div className="px-4 py-2 border-t border-[var(--border)] flex items-center gap-4">
                <span className="text-[0.6rem] text-text-muted font-mono flex items-center gap-1">
                  <kbd className="bg-bg-surface-3 px-1 rounded">↑↓</kbd> navigate
                </span>
                <span className="text-[0.6rem] text-text-muted font-mono flex items-center gap-1">
                  <kbd className="bg-bg-surface-3 px-1 rounded">↵</kbd> select
                </span>
                <span className="text-[0.6rem] text-text-muted font-mono flex items-center gap-1">
                  <kbd className="bg-bg-surface-3 px-1 rounded">esc</kbd> close
                </span>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
