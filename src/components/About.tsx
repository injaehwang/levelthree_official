import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './About.css'

const About = () => {
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
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const stats = [
    { number: '10+', label: '개발 경력 (년)' },
    { number: '100+', label: '프로젝트 수행' },
    { number: '50+', label: '기업 고객사' },
    { number: '24/7', label: '시스템 모니터링' },
  ]

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about-glow"></div>
      <div className="container">
        <motion.div
          className="about-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="about-header">
            <motion.h2 className="section-title" variants={itemVariants}>
              About LEVELTHREE
            </motion.h2>
            <motion.p className="section-subtitle about-subtitle" variants={itemVariants}>
              내일의 디지털 인프라를 설계합니다
            </motion.p>
          </div>

          <div className="about-main-content">
            <motion.div className="about-text" variants={itemVariants}>
              <p>
                LEVELTHREE는 웹·앱 개발과 AI 보안 솔루션을 전문으로 하는 기술 기업입니다.
                2019년 설립 이래 금융, 이커머스, 엔터프라이즈 고객사의
                디지털 전환을 이끌어 왔습니다.
              </p>
              <p>
                고성능 웹 애플리케이션과 크로스플랫폼 모바일 앱 개발부터,
                봇 탐지·디바이스 핑거프린팅·행동 분석 기반의 AI 보안 시스템 구축까지
                풀 스택 기술력을 바탕으로 안전하고 확장 가능한 솔루션을 제공합니다.
              </p>
            </motion.div>

            <motion.div className="about-stats" variants={itemVariants}>
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <span className="stat-number gradient-text">{stat.number}</span>
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
