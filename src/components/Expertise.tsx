import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Expertise.css'

const Expertise = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const coreValues = [
    {
      title: 'Performance First',
      description: '최적화된 성능으로 사용자 경험을 극대화합니다',
      icon: '⚡'
    },
    {
      title: 'AI Integration',
      description: 'AI 기술을 자연스럽게 통합한 혁신적인 솔루션',
      icon: '🤖'
    },
    {
      title: 'Security & Protection',
      description: '매크로 탐지 및 봇 방지를 통한 강력한 보안',
      icon: '🛡️'
    },
    {
      title: 'Scalable Architecture',
      description: '확장 가능하고 유지보수 가능한 아키텍처 설계',
      icon: '🏗️'
    },
    {
      title: 'User Experience',
      description: '직관적이고 매력적인 사용자 경험 디자인',
      icon: '✨'
    },
  ]

  const frameworks = [
    { name: 'React', icon: '⚛️', description: '컴포넌트 기반 UI 개발' },
    { name: 'Vue', icon: '🟢', description: '점진적 프레임워크' },
    { name: 'Turbo', icon: '⚡', description: '모노레포 빌드 시스템' },
    { name: 'Next.js', icon: '▲', description: '풀스택 React 프레임워크' },
    { name: 'Bot Detection', icon: '🛡️', description: '매크로 및 봇 탐지 시스템' },
    { name: 'Device Fingerprinting', icon: '🔍', description: '디바이스 식별 및 분석' },
    { name: 'Behavioral Analysis', icon: '📊', description: '사용자 행동 패턴 분석' },
    { name: 'Rate Limiting', icon: '⏱️', description: '요청 제한 및 보호' },
  ]

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="expertise" className="expertise" ref={ref}>
      <div className="container">
        <motion.div
          className="expertise-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Expertise</h2>
          <p className="section-subtitle">
            대부분의 프론트엔드 기술에 정통한 전문가 팀
          </p>
        </motion.div>

        <div className="expertise-content">
          <div className="expertise-section">
            <h3 className="subsection-title">Core Values</h3>
            <div className="values-grid">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  className="value-card"
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="value-icon">{value.icon}</div>
                  <div>
                    <h4 className="value-title">{value.title}</h4>
                    <p className="value-description">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="expertise-section">
            <h3 className="subsection-title">Frameworks & Tools</h3>
            <div className="frameworks-grid">
              {frameworks.map((framework, index) => (
                <motion.div
                  key={index}
                  className="framework-chip"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="framework-icon">{framework.icon}</span>
                  <span className="framework-name">{framework.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Expertise
