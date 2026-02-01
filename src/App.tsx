import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Expertise from './components/Expertise'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import InteractiveBackground from './components/InteractiveBackground'
import './App.css'

function App() {
  return (
    <div className="app">
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
