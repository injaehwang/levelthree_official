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
        <title>LEVELTHREE - Frontend Development Experts</title>
        <meta name="description" content={i18n.language === 'ko' ? "AI 맵 서비스, APM, Solution 전문 프론트엔드 개발 회사" : "Frontend Development Experts specializing in AI Map Services, APM, and Solutions."} />
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
