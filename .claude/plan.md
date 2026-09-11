# 3D Portfolio Website — Implementation Plan

## Overview
Build a premium, dark-mode, single-page React portfolio for **Lambodar Vijay Waghmare** using **React Three Fiber (R3F)**, **Framer Motion**, and **Tailwind CSS**. The site features interactive 3D elements, kinetic typography, glassmorphism UI, and a modern "expensive" aesthetic with electric blue/purple neon accents.

---

## Tech Stack
- **Vite** — fast React bundler
- **React 18** — UI framework
- **TypeScript** — type safety
- **Tailwind CSS v3** — utility-first styling
- **Framer Motion** — scroll & layout animations
- **React Three Fiber** (`@react-three/fiber`) — 3D rendering
- **@react-three/drei** — helper components (Float, PresentationControls, Stars, Text3D, etc.)
- **@react-three/postprocessing** — bloom/glow effects
- **React Icons** — icon library

---

## Project Structure

```
src/
├── main.tsx                    # Entry point
├── App.tsx                     # Root layout + scroll container
├── index.css                   # Tailwind directives + global styles
├── components/
│   ├── Navbar.tsx              # Sticky nav with glassmorphism
│   ├── Hero/
│   │   ├── HeroSection.tsx     # Hero layout (text + 3D canvas)
│   │   ├── HeroScene.tsx       # R3F Canvas contents
│   │   ├── Laptop.tsx          # 3D laptop mesh (geometric)
│   │   └── Smartphone.tsx      # 3D smartphone mesh (geometric)
│   ├── About/
│   │   ├── AboutSection.tsx    # About + skills constellation
│   │   └── SkillsScene.tsx     # R3F particle cloud of skills
│   ├── Projects/
│   │   ├── ProjectsSection.tsx # Projects grid layout
│   │   └── ProjectCard.tsx     # Tilt-effect project card
│   ├── Testimonials/
│   │   ├── TestimonialsSection.tsx  # Reviews + contact form
│   │   └── FluidBackground.tsx     # R3F animated wireframe bg
│   ├── Footer.tsx              # Footer
│   └── ui/
│       ├── SectionHeading.tsx  # Reusable animated heading
│       ├── GlassCard.tsx       # Glassmorphism card
│       └── AnimatedCounter.tsx # Animated number counter
├── hooks/
│   └── useScrollAnimation.ts  # Custom Framer Motion scroll hook
├── data/
│   └── portfolio.ts           # Skills, projects, testimonials data
└── assets/                    # Static images if needed
```

---

## Section-by-Section Plan

### 1. Hero Section (3D Interactive)
- **Left side**: Animated text with Framer Motion stagger
  - "Hi, I am Lambodar Vijay Waghmare."
  - Subheadline: "Freelance Software Developer | Architecting robust Web, Mobile & Java Backend Solutions."
  - CTA buttons with glow effect
- **Right side**: R3F `<Canvas>` with:
  - `<PresentationControls>` for drag-to-rotate
  - `<Float>` wrapping a geometric laptop + phone model
  - Dynamic lighting that responds to mouse position via `useFrame`
  - `<Stars>` background from drei
  - Bloom post-processing for neon glow

### 2. About Me & Skills Constellation
- About text with scroll-triggered entrance animations
- Stats counters: "50+ Projects", "100% Satisfaction", "3+ Years"
- R3F `<Canvas>` with:
  - Floating 3D text labels for each skill (Java, React, Spring Boot, etc.)
  - Particles connecting skills like a constellation
  - Camera auto-rotates slowly; scroll controls zoom/position
  - `<Float>` on each skill node

### 3. Interactive 3D Projects
- CSS Grid of project cards
- Each card uses a mouse-tracking tilt effect (pure CSS/JS, not R3F for performance)
- Cards have:
  - Gradient border glow on hover
  - 3D perspective transform following cursor
  - Tech stack tags
  - "View Project" button
- 3 dummy projects as specified

### 4. Testimonials & Contact (Glassmorphism + 3D)
- R3F animated wireframe/fluid mesh background
- Glassmorphism testimonial cards
- Contact form (Name, Email, Project Scope textarea)
- All overlaid on the 3D canvas

### 5. Navbar
- Sticky, glassmorphism nav
- Smooth scroll to sections
- Logo/name on left, nav links on right
- Mobile hamburger menu

### 6. Footer
- Social links, copyright
- Subtle gradient separator

---

## Responsive Strategy
- 3D canvases scale down / simplify on mobile (reduce particle count, disable postprocessing)
- Tailwind breakpoints: sm/md/lg/xl
- On very small screens, 3D hero becomes a static gradient background with CSS animations as fallback
- Touch-friendly controls for mobile R3F scenes

---

## Color Palette
- **Background**: `#0a0a0f` (near-black)
- **Surface**: `#12121a` (dark card)
- **Primary accent**: `#6366f1` → `#8b5cf6` (indigo to purple gradient)
- **Secondary accent**: `#06b6d4` (cyan/electric blue)
- **Text primary**: `#f1f5f9` (off-white)
- **Text secondary**: `#94a3b8` (muted gray)
- **Glow**: `rgba(99, 102, 241, 0.4)` (purple glow)

---

## Implementation Order
1. Scaffold Vite + React + TypeScript + Tailwind project
2. Set up global styles, fonts, color tokens
3. Build Navbar
4. Build Hero Section with 3D scene
5. Build About/Skills section with constellation
6. Build Projects section with tilt cards
7. Build Testimonials + Contact with fluid background
8. Build Footer
9. Add scroll animations (Framer Motion)
10. Polish responsive behavior & performance

---

## Performance Considerations
- Lazy load R3F canvases with `React.lazy` + `Suspense`
- Use `frameloop="demand"` where 3D doesn't need continuous animation
- Limit particle counts on mobile via media query detection
- Use `<Preload all />` from drei
