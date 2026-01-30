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
        ease: [0.16, 1, 0.3, 1], // Apple-like ease
      },
    },
  }

  const stats = [
    { number: '10+', label: 'Years Experience' },
    { number: '100+', label: 'Projects Delivered' },
    { number: '50+', label: 'Happy Clients' },
    { number: '24/7', label: 'Support' },
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
              About LEVELTHREE
            </motion.h2>
            <motion.p className="section-subtitle about-subtitle" variants={itemVariants}>
              Pioneering the Future of Frontend
            </motion.p>
          </div>

          <div className="about-main-content">
            <motion.div className="about-text" variants={itemVariants}>
              <p>
                LEVELTHREE는 프론트엔드 개발 전문 회사로, AI 시대의 혁신적인 웹 솔루션을 제공합니다.
                최신 기술 스택과 창의적인 접근으로 고객의 비즈니스 가치를 극대화합니다.
              </p>
              <p>
                우리는 단순한 웹사이트가 아닌, 사용자 경험을 혁신하고 비즈니스 성장을 이끄는
                디지털 솔루션을 만듭니다. AI 기반 플랫폼 프론트엔드 개발, APM, 매크로 탐지/방지 솔루션,
                그리고 다양한 엔터프라이즈 솔루션 개발에 특화되어 있습니다.
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
