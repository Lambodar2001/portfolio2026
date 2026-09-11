import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/Hero/HeroSection'
import AboutSection from './components/About/AboutSection'
import ProjectsSection from './components/Projects/ProjectsSection'
import TestimonialsSection from './components/Testimonials/TestimonialsSection'
import Footer from './components/Footer'

const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-neon-purple/30 border-t-neon-purple rounded-full animate-spin" />
  </div>
)

export default function App() {
  return (
    <div className="min-h-screen bg-dark overflow-x-hidden">
      <Navbar />
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
