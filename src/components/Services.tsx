import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Services.css'

const Services = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const services = [
    {
      title: 'AI Platform Frontend',
      description: 'AI 기반 플랫폼의 프론트엔드 개발 전문 서비스입니다. 최신 AI 기술을 활용한 인터랙티브하고 지능적인 사용자 인터페이스를 구축합니다.',
      icon: '🤖',
      gradient: 'var(--gradient-1)',
      features: ['AI 기반 UI/UX', '실시간 AI 상호작용', '대규모 데이터 시각화', '고성능 프론트엔드'],
    },
    {
      title: 'Security & APM',
      description: '매크로·봇 탐지와 실시간 위협 방어를 핵심으로 한 보안 솔루션입니다. 디바이스 핑거프린팅, 행동 분석, Fraud Detection으로 웹 애플리케이션을 보호하며, APM을 통한 성능 모니터링으로 안정성을 함께 확보합니다.',
      icon: '🛡️',
      gradient: 'var(--gradient-2)',
      features: ['매크로·봇 탐지·차단', '디바이스 핑거프린팅', '행동 분석·Fraud Detection', '실시간 위협 탐지·Rate Limiting', 'APM 성능 모니터링'],
    },
    {
      title: 'Enterprise Solutions',
      description: '기업의 디지털 전환을 위한 맞춤형 솔루션을 제공합니다. 확장 가능하고 안정적인 엔터프라이즈급 애플리케이션을 개발합니다.',
      icon: '🚀',
      gradient: 'var(--gradient-3)',
      features: ['맞춤형 개발', '확장성', '보안', '유지보수'],
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
    hidden: { opacity: 0, y: 50 },
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
    <section id="services" className="services" ref={ref}>
      <div className="services-container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="section-description">
            AI 시대에 맞는 혁신적인 프론트엔드 솔루션을 제공합니다
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
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              data-parallax
              data-speed={0.1 + index * 0.05}
            >
              <div
                className="service-card-bg"
                style={{ background: service.gradient }}
              ></div>
              <div className="service-card-content">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services
