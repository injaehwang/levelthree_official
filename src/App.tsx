import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Expertise from './components/Expertise'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import InteractiveBackground from './components/InteractiveBackground'
import './App.css'

function App() {
  const { i18n } = useTranslation();

  return (
    <div className="app">
      <Helmet>
        <html lang={i18n.language} />
        <title>LEVELTHREE - Web/App & AI Security Experts</title>
        <meta name="description" content={i18n.language === 'ko' ? "웹/앱 개발 및 서비스 개발, AI 보안 전문가" : "Web/App Development & Service Development, AI Security Experts."} />
      </Helmet>
      <InteractiveBackground />
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
