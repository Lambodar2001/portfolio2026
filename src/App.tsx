import Navbar from './components/Navbar'
import HeroSection from './components/Hero/HeroSection'
import AboutSection from './components/About/AboutSection'
import ProjectsSection from './components/Projects/ProjectsSection'
import TestimonialsSection from './components/Testimonials/TestimonialsSection'
import Footer from './components/Footer'
import FloatingContactButton from './components/FloatingContactButton'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <FloatingContactButton />
    </div>
  )
}
