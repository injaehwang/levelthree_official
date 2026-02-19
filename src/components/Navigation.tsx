import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import './Navigation.css'

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ko' : 'en';
    i18n.changeLanguage(newLang);
  };

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
    { id: 'hero', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'services', label: t('nav.services') },
    { id: 'expertise', label: t('nav.expertise') },
    { id: 'contact', label: t('nav.contact') },
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
        <div className="nav-links-container" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
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

          <button
            className="lang-toggle"
            onClick={toggleLanguage}
            style={{
              background: 'transparent',
              border: '1px solid var(--primary)',
              color: 'var(--primary)',
              padding: '0.4rem 0.8rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            {i18n.language === 'en' ? 'KO' : 'EN'}
          </button>
        </div>

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
            style={{
              position: 'fixed',
              top: '60px',
              left: 0,
              width: '100%',
              background: 'rgba(255, 255, 255, 0.98)',
              padding: '2rem',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="nav-link"
                style={{ fontSize: '1.25rem' }}
              >
                {item.label}
              </button>
            ))}
            <button
              className="lang-toggle-mobile"
              onClick={() => {
                toggleLanguage();
                setIsMobileMenuOpen(false);
              }}
              style={{
                background: 'transparent',
                border: '1px solid var(--primary)',
                color: 'var(--primary)',
                padding: '0.6rem 2rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                marginTop: '1rem'
              }}
            >
              {i18n.language === 'en' ? '한국어' : 'English'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation
