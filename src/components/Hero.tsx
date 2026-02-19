import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation, Trans } from 'react-i18next'
import './Hero.css'

const Hero = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} id="hero" className="hero">
      <div className="hero-content">
        <motion.div
          style={{ y, opacity }}
          className="hero-text-container"
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            LEVELTHREE
          </motion.h1>

          <motion.div
            className="hero-subtitle-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="hero-subtitle">{t('hero.subtitle')}</p>
            <p className="hero-description">
              <Trans i18nKey="hero.description" components={{ br: <br /> }} />
            </p>
          </motion.div>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta_start')}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta_explore')}
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span>{t('hero.scroll')}</span>
      </motion.div>
    </section>
  )
}

export default Hero
