import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navigation.css'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'expertise', label: 'Technology' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a
          href="#hero"
          className="logo"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('hero')
          }}
        >
          <img src="/logo.svg" alt="LEVELTHREE" className="logo-img" />
        </a>

        {/* Desktop Menu */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className="nav-link"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <div
          className="nav-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="bar" style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></div>
          <div className="bar" style={{ opacity: isMobileMenuOpen ? 0 : 1 }}></div>
          <div className="bar" style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="nav-link mobile-nav-link"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation
