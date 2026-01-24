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

  const stats = [
    { number: '10+', label: 'Years Experience' },
    { number: '100+', label: 'Projects Delivered' },
    { number: '50+', label: 'Happy Clients' },
    { number: '24/7', label: 'Support' },
  ]

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about-container">
        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="about-text" variants={itemVariants}>
            <h2 className="section-title">
              About <span className="gradient-text">LEVELTHREE</span>
            </h2>
            <p className="section-description">
              LEVELTHREE는 프론트엔드 개발 전문 회사로, AI 시대의 혁신적인 웹 솔루션을 제공합니다.
              최신 기술 스택과 창의적인 접근으로 고객의 비즈니스 가치를 극대화합니다.
            </p>
            <p className="section-description">
              우리는 단순한 웹사이트가 아닌, 사용자 경험을 혁신하고 비즈니스 성장을 이끄는
              디지털 솔루션을 만듭니다. AI 기반 플랫폼 프론트엔드 개발, APM, 매크로 탐지/방지 솔루션, 그리고 다양한 엔터프라이즈 솔루션 개발에
              특화되어 있습니다.
            </p>
          </motion.div>

          <motion.div className="about-stats" variants={itemVariants}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="about-visual"
          initial={{ opacity: 0, x: 100 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="visual-grid">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className="grid-item"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
              >
                <div className="grid-glow"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
