import { useState, useEffect } from 'react'
import Loader from './components/Loader/Loader'
import CustomCursor from './components/Cursor/CustomCursor'
import CommandMenu from './components/CommandMenu/CommandMenu'
import Navbar from './components/Navbar/Navbar'
import HeroSection from './components/Hero/HeroSection'
import AboutSection from './components/About/AboutSection'
import ProjectsSection from './components/Projects/ProjectsSection'
import TestimonialsSection from './components/Testimonials/TestimonialsSection'
import ContactSection from './components/Contact/ContactSection'
import Footer from './components/Footer/Footer'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [commandOpen, setCommandOpen] = useState(false)

  // CMD+K / CTRL+K shortcut
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      {/* Loading screen */}
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Command palette */}
      <CommandMenu isOpen={commandOpen} onClose={() => setCommandOpen(false)} />

      {/* Main app */}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar onCommandOpen={() => setCommandOpen(true)} />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
