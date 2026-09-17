// ============================================================
// PORTFOLIO DATA — Edit this file to update site content
// ============================================================

export const profile = {
  name: 'Lambodar',
  fullName: 'Lambodar Vijay Waghmare',
  title: 'Full-Stack Engineer',
  subtitle: 'AI · 3D · Creative Technology',
  tagline: ['BUILDING', 'DIGITAL', 'EXPERIENCES.'],
  description:
    'Full-stack engineer specialized in enterprise architecture, AI integration, and scalable cloud solutions. Crafting digital experiences that matter.',
  email: 'hello@lambodar.dev',
  location: 'India',
  available: true,
  // Add your resume PDF to /public/resume.pdf and update this path
  resumeUrl: '/resume.pdf',
  image: '/myimg.png',
}

// ============================================================
// SOCIAL LINKS — Replace href values with your real URLs
// ============================================================
export const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/lambodar',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/lambodar',
    icon: 'linkedin',
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/lambodar',
    icon: 'twitter',
  },
  {
    label: 'Email',
    href: 'mailto:hello@lambodar.dev',
    icon: 'email',
  },
]

// ============================================================
// NAV LINKS
// ============================================================
export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Stack', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

// ============================================================
// STATISTICS
// ============================================================
export const stats = [
  { label: 'Projects Delivered', value: 50, suffix: '+' },
  { label: 'Client Satisfaction', value: 100, suffix: '%' },
  { label: 'Years Experience', value: 3, suffix: '+' },
  { label: 'Technologies', value: 15, suffix: '+' },
]

// ============================================================
// SKILLS
// ============================================================
export type SkillCategory = 'backend' | 'frontend' | 'mobile' | 'devops' | 'ai'

export interface Skill {
  name: string
  category: SkillCategory
  level: number
  color: string
}

export const skills: Skill[] = [
  // — Core Languages —
  { name: 'JavaScript', category: 'frontend', level: 92, color: '#f7df1e' },
  { name: 'TypeScript', category: 'frontend', level: 92, color: '#3178c6' },
  { name: 'Python', category: 'ai', level: 85, color: '#4584b6' },
  { name: 'Java', category: 'backend', level: 95, color: '#f89820' },

  // — Frontend & Mobile —
  { name: 'React', category: 'frontend', level: 90, color: '#61dafb' },
  { name: 'Next.js', category: 'frontend', level: 87, color: '#e0e0e0' },
  { name: 'React Native', category: 'mobile', level: 83, color: '#7dd3fc' },
  { name: 'Tailwind CSS', category: 'frontend', level: 92, color: '#38bdf8' },
  { name: 'Three.js', category: 'frontend', level: 75, color: '#dddddd' },

  // — Backend & APIs —
  { name: 'Node.js', category: 'backend', level: 86, color: '#68a063' },
  { name: 'Spring Boot', category: 'backend', level: 93, color: '#6db33f' },
  { name: 'GraphQL', category: 'frontend', level: 78, color: '#e535ab' },
  { name: 'REST APIs', category: 'backend', level: 95, color: '#8b5cf6' },
  { name: 'Microservices', category: 'backend', level: 90, color: '#a78bfa' },

  // — AI & Generative AI —
  { name: 'Generative AI', category: 'ai', level: 80, color: '#e4ff00' },
  { name: 'OpenAI API', category: 'ai', level: 82, color: '#10a37f' },
  { name: 'LangChain', category: 'ai', level: 75, color: '#1cffac' },
  { name: 'TensorFlow', category: 'ai', level: 72, color: '#ff6f00' },
  { name: 'Prompt Eng.', category: 'ai', level: 85, color: '#00d4ff' },
  { name: 'RAG', category: 'ai', level: 74, color: '#f472b6' },

  // — Databases —
  { name: 'PostgreSQL', category: 'backend', level: 88, color: '#336791' },
  { name: 'MongoDB', category: 'backend', level: 80, color: '#4db33d' },
  { name: 'Redis', category: 'backend', level: 83, color: '#d82c20' },

  // — DevOps & Cloud —
  { name: 'Docker', category: 'devops', level: 82, color: '#2496ed' },
  { name: 'Kubernetes', category: 'devops', level: 74, color: '#326ce5' },
  { name: 'AWS', category: 'devops', level: 79, color: '#ff9900' },
  { name: 'Kafka', category: 'backend', level: 76, color: '#00d4ff' },
  { name: 'CI / CD', category: 'devops', level: 80, color: '#22c55e' },
]

// Skill categories for the About section
export const skillGroups = [
  {
    category: 'AI & Machine Learning',
    icon: '🤖',
    description: 'Building intelligent systems that learn and adapt.',
    tech: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'],
    accentColor: '#00d4ff',
  },
  {
    category: 'Backend Architecture',
    icon: '⚙️',
    description: 'Enterprise systems engineered for scale and reliability.',
    tech: ['Java', 'Spring Boot', 'Microservices', 'Distributed Systems', 'Database Design'],
    accentColor: '#e4ff00',
  },
  {
    category: 'Full-Stack & Cloud',
    icon: '🚀',
    description: 'Modern web experiences and cloud-native infrastructure.',
    tech: ['React', 'Next.js', 'Node.js', 'AWS', 'Docker', 'Kubernetes'],
    accentColor: '#8b5cf6',
  },
]

// ============================================================
// PROJECTS
// ============================================================
export interface Project {
  id: number
  number: string
  title: string
  description: string
  tags: string[]
  impact: string
  accentColor: string
  href?: string
  image?: string
}

export const projects: Project[] = [
  {
    id: 1,
    number: '01',
    title: 'Enterprise Microservices Platform',
    description:
      'High-performance backend handling 10K+ concurrent users with real-time data processing, distributed caching, and event-driven architecture.',
    tags: ['Java', 'Spring Boot', 'Kubernetes', 'PostgreSQL', 'Redis', 'Kafka'],
    impact: '300% throughput improvement',
    accentColor: '#e4ff00',
    href: '#',
  },
  {
    id: 2,
    number: '02',
    title: 'KharidoBecho — Buy & Sell Marketplace',
    description:
      'OLX-style marketplace app built with React Native, Expo & TS. Multi-step listings, Socket.io chat, JWT auth with secure storage using Adapter & Factory patterns.',
    tags: ['React Native', 'Expo', 'TypeScript', 'Socket.io', 'JWT', 'Node.js'],
    impact: 'Scalable multi-category marketplace',
    accentColor: '#23C65F',
    href: '#',
    image: '/assets/projects/proj2.png',
  },
  {
    id: 3,
    number: '03',
    title: 'Real-Time Analytics Dashboard',
    description:
      'Full-stack web application providing live business intelligence and data visualization for enterprise clients worldwide.',
    tags: ['React', 'Next.js', 'Node.js', 'WebSocket', 'MongoDB'],
    impact: '500+ enterprise clients',
    accentColor: '#8b5cf6',
    href: '#',
  },
]

// ============================================================
// TESTIMONIALS
// ============================================================
export interface Testimonial {
  id: number
  text: string
  author: string
  role: string
  company: string
  avatar: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    text: 'Lambodar delivered an exceptional backend architecture that scaled beyond our expectations. Their attention to code quality and system design is outstanding.',
    author: 'Rajesh Mehta',
    role: 'CTO',
    company: 'TechVentures India',
    avatar: 'RM',
  },
  {
    id: 2,
    text: 'Working with Lambodar was a game-changer. They understood our complex requirements and delivered a mobile app that our users love. Truly a top-tier developer.',
    author: 'Sarah Chen',
    role: 'Product Manager',
    company: 'FinFlow Solutions',
    avatar: 'SC',
  },
  {
    id: 3,
    text: 'The web portal Lambodar built transformed our internal operations. Reliable, fast, and beautifully designed. Highly recommended for enterprise projects.',
    author: 'Michael Torres',
    role: 'VP of Engineering',
    company: 'GlobalCorp Inc.',
    avatar: 'MT',
  },
]

// ============================================================
// CONTACT
// ============================================================
export const contactInfo = {
  email: profile.email,
  linkedin: socials.find((s) => s.label === 'LinkedIn')?.href ?? '#',
  github: socials.find((s) => s.label === 'GitHub')?.href ?? '#',
  // Contact form: set VITE_FORMSPREE_ID in your .env file
  // Get your endpoint at https://formspree.io
  formEndpoint: import.meta.env.VITE_FORMSPREE_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
    : null,
}

// ============================================================
// COMMAND MENU ITEMS
// ============================================================
export const commandItems = [
  { label: 'Home', description: 'Go to top', href: '#hero', icon: '🏠', category: 'Navigate' },
  { label: 'About', description: 'Learn about me', href: '#about', icon: '👤', category: 'Navigate' },
  { label: 'Work', description: 'View projects', href: '#projects', icon: '💼', category: 'Navigate' },
  { label: 'Stack', description: 'Technologies I use', href: '#skills', icon: '⚡', category: 'Navigate' },
  { label: 'Contact', description: 'Get in touch', href: '#contact', icon: '✉️', category: 'Navigate' },
  { label: 'GitHub', description: 'github.com/lambodar', href: socials[0].href, icon: '🐙', category: 'Links', external: true },
  { label: 'LinkedIn', description: 'Connect on LinkedIn', href: socials[1].href, icon: '💼', category: 'Links', external: true },
  { label: 'Resume', description: 'Download resume PDF', href: profile.resumeUrl, icon: '📄', category: 'Links', external: true },
  { label: 'Email', description: profile.email, href: `mailto:${profile.email}`, icon: '✉️', category: 'Links', external: true },
]
