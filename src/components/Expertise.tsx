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
      icon: '⚡',
      color: '#f59e0b'
    },
    { 
      title: 'AI Integration', 
      description: 'AI 기술을 자연스럽게 통합한 혁신적인 솔루션',
      icon: '🤖',
      color: '#6366f1'
    },
    { 
      title: 'Security & Protection', 
      description: '매크로 탐지 및 봇 방지를 통한 강력한 보안 솔루션',
      icon: '🛡️',
      color: '#ef4444'
    },
    { 
      title: 'Scalable Architecture', 
      description: '확장 가능하고 유지보수 가능한 아키텍처 설계',
      icon: '🏗️',
      color: '#ec4899'
    },
    { 
      title: 'User Experience', 
      description: '직관적이고 매력적인 사용자 경험 디자인',
      icon: '✨',
      color: '#a78bfa'
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="expertise" className="expertise" ref={ref}>
      <div className="expertise-container">
        <motion.div
          className="expertise-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            Our <span className="gradient-text">Expertise</span>
          </h2>
          <p className="section-description">
            대부분의 프론트엔드 기술에 정통한 전문가 팀
          </p>
        </motion.div>

        <div className="expertise-content">
          <motion.div
            className="values-section"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <h3 className="subsection-title">Core Values</h3>
            <div className="values-list">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  className="value-item"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <div className="value-icon" style={{ '--color': value.color } as React.CSSProperties}>
                    {value.icon}
                  </div>
                  <div className="value-content">
                    <h4 className="value-title">{value.title}</h4>
                    <p className="value-description">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="frameworks-section"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h3 className="subsection-title">Frameworks & Tools</h3>
            <div className="frameworks-grid">
              {frameworks.map((framework, index) => (
                <motion.div
                  key={index}
                  className="framework-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="framework-icon">{framework.icon}</div>
                  <div className="framework-name">{framework.name}</div>
                  <div className="framework-description">{framework.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Expertise
