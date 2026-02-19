import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'react-i18next'
import { Bot, Shield, Rocket } from 'lucide-react'
import './Services.css'

const Services = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Define icon mapping
  const iconMap = {
    ai: <Bot size={48} strokeWidth={1.5} />,
    security: <Shield size={48} strokeWidth={1.5} />,
    enterprise: <Rocket size={48} strokeWidth={1.5} />
  }

  const services = [
    {
      id: 'ai',
      title: t('services.items.ai.title'),
      description: t('services.items.ai.description'),
      icon: iconMap.ai,
      features: t('services.items.ai.features', { returnObjects: true }) as string[],
    },
    {
      id: 'security',
      title: t('services.items.security.title'),
      description: t('services.items.security.description'),
      icon: iconMap.security,
      features: t('services.items.security.features', { returnObjects: true }) as string[],
    },
    {
      id: 'enterprise',
      title: t('services.items.enterprise.title'),
      description: t('services.items.enterprise.description'),
      icon: iconMap.enterprise,
      features: t('services.items.enterprise.features', { returnObjects: true }) as string[],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section id="services" className="services" ref={ref}>
      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="section-title">{t('services.title')}</h2>
          <p className="section-subtitle">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="service-icon-wrapper">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>

              <div className="service-divider"></div>

              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="feature-check"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services

