export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  color: string
  icon: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  text: string
  avatar: string
}

export interface Skill {
  name: string
  category: 'backend' | 'frontend' | 'mobile' | 'devops'
  level: number
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Backend Architecture',
    description:
      'Designed and built a high-performance, scalable e-commerce backend using Java Spring Boot microservices. Handles 10K+ concurrent users with distributed caching, event-driven architecture, and real-time inventory management.',
    tags: ['Java', 'Spring Boot', 'Microservices', 'Redis', 'Kafka'],
    color: '#6366f1',
    icon: '🏗️',
  },
  {
    id: 2,
    title: 'Fintech Mobile Application',
    description:
      'Cross-platform mobile app for a fintech startup enabling seamless peer-to-peer payments, real-time portfolio tracking, and biometric authentication. Built with a focus on security and sub-100ms response times.',
    tags: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    color: '#8b5cf6',
    icon: '📱',
  },
  {
    id: 3,
    title: 'Corporate Web Portal',
    description:
      'Full-stack enterprise web portal with role-based access control, real-time dashboards, document management, and integration with SAP. Serves 5,000+ employees across multiple regions.',
    tags: ['React', 'Next.js', 'Java', 'Spring Security', 'Docker'],
    color: '#06b6d4',
    icon: '🌐',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rajesh Mehta',
    role: 'CTO',
    company: 'TechVentures India',
    text: 'Lambodar delivered an exceptional backend architecture that scaled beyond our expectations. Their attention to code quality and system design is outstanding.',
    avatar: 'RM',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'FinFlow Solutions',
    text: 'Working with Lambodar was a game-changer. They understood our complex requirements and delivered a mobile app that our users love. Truly a top-tier developer.',
    avatar: 'SC',
  },
  {
    id: 3,
    name: 'Michael Torres',
    role: 'VP of Engineering',
    company: 'GlobalCorp Inc.',
    text: 'The web portal Lambodar built for us transformed our internal operations. Reliable, fast, and beautifully designed. Highly recommended for enterprise projects.',
    avatar: 'MT',
  },
]

export const skills: Skill[] = [
  { name: 'Java', category: 'backend', level: 95 },
  { name: 'Spring Boot', category: 'backend', level: 92 },
  { name: 'Microservices', category: 'backend', level: 90 },
  { name: 'React', category: 'frontend', level: 88 },
  { name: 'Next.js', category: 'frontend', level: 85 },
  { name: 'TypeScript', category: 'frontend', level: 90 },
  { name: 'React Native', category: 'mobile', level: 82 },
  { name: 'Node.js', category: 'backend', level: 85 },
  { name: 'PostgreSQL', category: 'backend', level: 88 },
  { name: 'Docker', category: 'devops', level: 80 },
  { name: 'AWS', category: 'devops', level: 78 },
  { name: 'Redis', category: 'backend', level: 82 },
  { name: 'Kafka', category: 'backend', level: 75 },
  { name: 'GraphQL', category: 'frontend', level: 78 },
  { name: 'Tailwind CSS', category: 'frontend', level: 90 },
]

export const stats = [
  { label: 'Projects Delivered', value: 50, suffix: '+' },
  { label: 'Client Satisfaction', value: 100, suffix: '%' },
  { label: 'Years Experience', value: 3, suffix: '+' },
  { label: 'Technologies', value: 15, suffix: '+' },
]

export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]
