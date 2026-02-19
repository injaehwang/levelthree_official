import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'react-i18next'
import './About.css'

const About = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        ease: [0.16, 1, 0.3, 1], // Apple-like ease
      },
    },
  }

  const stats = [
    { number: '10+', label: t('about.stats.years') },
    { number: '100+', label: t('about.stats.projects') },
    { number: '50+', label: t('about.stats.clients') },
    { number: '24/7', label: t('about.stats.support') },
  ]

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.div
          className="about-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="about-header">
            <motion.h2 className="section-title" variants={itemVariants}>
              {t('about.title')}
            </motion.h2>
            <motion.p className="section-subtitle about-subtitle" variants={itemVariants}>
              {t('about.subtitle')}
            </motion.p>
          </div>

          <div className="about-main-content">
            <motion.div className="about-text" variants={itemVariants}>
              <p>
                {t('about.p1')}
              </p>
              <p>
                {t('about.p2')}
              </p>
            </motion.div>

            <motion.div className="about-stats" variants={itemVariants}>
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
