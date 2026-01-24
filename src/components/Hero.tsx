import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Hero.css'

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Animated gradient background
    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.01
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      
      gradient.addColorStop(0, `hsl(${220 + Math.sin(time) * 20}, 70%, ${50 + Math.sin(time * 0.5) * 10}%)`)
      gradient.addColorStop(0.5, `hsl(${280 + Math.cos(time * 0.7) * 30}, 70%, ${50 + Math.cos(time) * 10}%)`)
      gradient.addColorStop(1, `hsl(${320 + Math.sin(time * 0.9) * 20}, 70%, ${50 + Math.sin(time * 1.2) * 10}%)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add some particle effects
      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(time + i) * 0.5 + 0.5) * canvas.width
        const y = (Math.cos(time * 0.7 + i) * 0.5 + 0.5) * canvas.height
        const size = Math.max(0.5, Math.abs(Math.sin(time + i) * 2 + 1))
        const opacity = Math.max(0, Math.min(1, 0.1 + Math.sin(time + i) * 0.1))
        
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="hero" className="hero" ref={ref}>
      <canvas ref={canvasRef} className="hero-canvas" data-parallax data-speed="0.3" />
      
      <div className="hero-content">
        <motion.div
          className="hero-text"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="gradient-text">LEVELTHREE</span>
          </motion.h1>
          
          <motion.p className="hero-subtitle" variants={itemVariants}>
            Frontend Development Experts
          </motion.p>
          
          <motion.p className="hero-description" variants={itemVariants}>
            AI 시대를 선도하는 프론트엔드 개발 전문가
            <br />
            AI 플랫폼, APM, 매크로 탐지/방지, Solution 개발의 최고 파트너
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get Started
            </motion.button>
            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Our Services
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="floating-card" data-parallax data-speed="0.2">
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="code-snippet">
                <div className="code-line">
                  <span className="code-keyword">const</span>{' '}
                  <span className="code-variable">levelthree</span> = {'{'}
                </div>
                <div className="code-line indent">
                  <span className="code-property">expertise</span>: [
                </div>
                <div className="code-line indent-2">
                  <span className="code-string">'React'</span>,{' '}
                  <span className="code-string">'Vue'</span>,{' '}
                  <span className="code-string">'Angular'</span>,{' '}
                  <span className="code-string code-highlight-1">'Svelte'</span>,
                </div>
                <div className="code-line indent-2">
                  <span className="code-string code-highlight-2">'Next.js'</span>,{' '}
                  <span className="code-string code-highlight-1">'Nuxt'</span>,{' '}
                  <span className="code-string code-highlight-1">'Remix'</span>,{' '}
                  <span className="code-string code-highlight-2">'Astro'</span>,
                </div>
                <div className="code-line indent-2">
                  <span className="code-string code-highlight-1">'TypeScript'</span>,{' '}
                  <span className="code-string">'JavaScript'</span>,{' '}
                  <span className="code-string code-highlight-3">'Turbo'</span>,{' '}
                  <span className="code-string code-highlight-2">'Vite'</span>,
                </div>
                <div className="code-line indent-2">
                  <span className="code-string">'Pinia'</span>,{' '}
                  <span className="code-string code-highlight-2">'Zustand'</span>,{' '}
                  <span className="code-string code-highlight-3">'Jotai'</span>,
                </div>
                <div className="code-line indent-2">
                  <span className="code-string code-highlight-2">'Tailwind CSS'</span>,{' '}
                  <span className="code-string">'Styled Components'</span>,
                </div>
                <div className="code-line indent-2">
                  <span className="code-string code-highlight-2">'tRPC'</span>,{' '}
                  <span className="code-string code-highlight-2">'React Query'</span>,
                </div>
                <div className="code-line indent-2">
                  <span className="code-string code-highlight-2">'Vitest'</span>,{' '}
                  <span className="code-string code-highlight-2">'Playwright'</span>,
                </div>
                <div className="code-line indent-2">
                  <span className="code-string code-highlight-2">'Framer Motion'</span>,{' '}
                  <span className="code-string code-highlight-2">'Three.js'</span>,
                </div>
                <div className="code-line indent-2">
                  <span className="code-string code-highlight-3">'WebAssembly'</span>,{' '}
                  <span className="code-string code-highlight-3">'PWA'</span>,{' '}
                  <span className="code-string code-highlight-3">'WebGL'</span>,{' '}
                  <span className="code-string code-highlight-3">'Service Workers'</span>
                </div>
                <div className="code-line indent-2">
                  <span className="code-string code-highlight-2">'Bot Detection'</span>,{' '}
                  <span className="code-string code-highlight-2">'Anti-Bot'</span>,{' '}
                  <span className="code-string code-highlight-3">'Device Fingerprinting'</span>,
                </div>
                <div className="code-line indent-2">
                  <span className="code-string code-highlight-2">'Behavioral Analysis'</span>,{' '}
                  <span className="code-string code-highlight-2">'Rate Limiting'</span>,{' '}
                  <span className="code-string code-highlight-3">'Fraud Detection'</span>
                </div>
                <div className="code-line indent">],</div>
                <div className="code-line indent">
                  <span className="code-property">focus</span>:{' '}
                  <span className="code-string code-highlight-3">'AI Solutions'</span>
                </div>
                <div className="code-line">{'}'}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="scroll-arrow"></div>
      </motion.div>
    </section>
  )
}

export default Hero
