import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Services.css'

const WebIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
)

const AppIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
)

const SecurityIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const SolutionIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
  </svg>
)

const Services = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const services = [
    {
      title: 'Web Development',
      description: '최신 아키텍처 기반의 풀스택 웹 애플리케이션을 개발합니다. 성능, 확장성, 뛰어난 사용자 경험을 모두 갖춘 솔루션을 제공합니다.',
      Icon: WebIcon,
      features: ['SPA / SSR 애플리케이션', '클라우드 네이티브 아키텍처', 'API 설계 및 통합', '성능 최적화'],
    },
    {
      title: 'App Development',
      description: '크로스플랫폼 모바일 및 데스크톱 애플리케이션을 개발합니다. 모든 디바이스에서 네이티브 품질의 경험을 제공합니다.',
      Icon: AppIcon,
      features: ['React Native / Flutter', 'Native iOS & Android', 'Progressive Web Apps', '앱스토어 배포 및 운영'],
    },
    {
      title: 'AI Security Solutions',
      description: 'AI 기반 위협 탐지 및 부정행위 방지 시스템을 구축합니다. 디지털 자산을 실시간으로 보호합니다.',
      Icon: SecurityIcon,
      features: ['매크로·봇 탐지 및 차단', '행동 분석 기반 FDS', '이상 탐지 시스템', '실시간 위협 모니터링'],
    },
    {
      title: 'Solution & Product Dev',
      description: '기업 맞춤형 솔루션과 SaaS 제품을 설계·개발합니다. 안정성, 확장성, 장기적 성장을 고려한 엔지니어링을 제공합니다.',
      Icon: SolutionIcon,
      features: ['엔터프라이즈 플랫폼 개발', 'SaaS 제품 아키텍처', '레거시 시스템 현대화', 'APM 및 모니터링 시스템'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      <div className="services-glow"></div>
      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            현대 기업을 위한 종합 기술 솔루션을 제공합니다
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
              <div className="service-icon-wrapper">
                <service.Icon />
              </div>
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
