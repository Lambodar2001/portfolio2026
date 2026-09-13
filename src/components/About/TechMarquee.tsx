import { skills } from '../../data/portfolio'

// Split skills into 3 rows by category group
const ROW_1 = skills.filter((s) =>
  ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Three.js', 'Tailwind CSS', 'GraphQL', 'REST APIs'].includes(s.name)
)
const ROW_2 = skills.filter((s) =>
  ['Generative AI', 'OpenAI API', 'LangChain', 'TensorFlow', 'Prompt Eng.', 'RAG', 'Python', 'React Native'].includes(s.name)
)
const ROW_3 = skills.filter((s) =>
  ['Java', 'Spring Boot', 'Node.js', 'Microservices', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Kafka', 'CI / CD'].includes(s.name)
)

// Duplicate items so the loop is seamless
const doubled = (arr: typeof skills) => [...arr, ...arr]

interface BadgeProps {
  name: string
  color: string
}

function Badge({ name, color }: BadgeProps) {
  return (
    <div
      className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2 rounded-full border select-none"
      style={{
        background: `${color}08`,
        borderColor: `${color}25`,
      }}
    >
      {/* Color dot */}
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
      />
      {/* Name */}
      <span
        className="text-xs font-mono font-medium whitespace-nowrap"
        style={{ color: `${color}cc` }}
      >
        {name}
      </span>
    </div>
  )
}

interface MarqueeRowProps {
  items: typeof skills
  direction?: 'left' | 'right'
  speed?: number
}

function MarqueeRow({ items, direction = 'left', speed = 35 }: MarqueeRowProps) {
  const doubled_items = doubled(items)
  const duration = `${speed}s`

  return (
    <div
      className="flex overflow-hidden"
      style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}
    >
      <div
        className="flex gap-3 min-w-max"
        style={{
          animation: `marquee-${direction} ${duration} linear infinite`,
        }}
      >
        {doubled_items.map((skill, i) => (
          <Badge key={`${skill.name}-${i}`} name={skill.name} color={skill.color} />
        ))}
      </div>
    </div>
  )
}

export default function TechMarquee() {
  return (
    <div className="w-full space-y-4 py-4">
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .flex > div[style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>

      <MarqueeRow items={ROW_1} direction="left"  speed={30} />
      <MarqueeRow items={ROW_2} direction="right" speed={25} />
      <MarqueeRow items={ROW_3} direction="left"  speed={35} />
    </div>
  )
}
