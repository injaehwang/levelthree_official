import { useEffect } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Expertise from './components/Expertise'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import './App.css'

function App() {
  useEffect(() => {
    // Parallax scroll effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll('[data-parallax]')
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0.5')
        const yPos = -(scrolled * speed)
        ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Expertise />
      <Contact />
    </div>
  )
}

export default App
