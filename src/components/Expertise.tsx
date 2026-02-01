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
    {
      title: '실시간 AI 자동화 플랫폼 설계',
      description: 'CI/CD, 테스트, 디자인 시스템 연동을 통한 개발 효율성 극대화',
      icon: '⚙️'
    },
  ]

  const frameworks = [
    { name: 'Modern FE Architecture', icon: '✨', description: 'React, Vue 등 모던 프레임워크 기반의 고성능 아키텍처 설계' },
    { name: 'Turbo', icon: '⚡', description: '모노레포 빌드 시스템' },
    { name: 'Next.js', icon: '▲', description: '풀스택 React 프레임워크' },
    { name: 'Bot Detection', icon: '🛡️', description: '매크로 및 봇 탐지 시스템' },
    { name: 'Device Fingerprinting', icon: '🔍', description: '디바이스 식별 및 분석' },
    { name: 'CI/CD & Testing', icon: '🧪', description: '자동화된 테스트 및 배포 파이프라인 구축' },
    { name: 'Figma to Code', icon: '🎨', description: '디자인-개발 연동 및 자동 배포 시스템' },
    { name: 'Common Modules', icon: '📦', description: '공통 모듈 시스템 및 디자인 시스템 구축' },
    { name: 'Monorepo Consulting', icon: '🏗️', description: '대규모 프로젝트를 위한 모노레포 전략 컨설팅' },
    { name: 'n8n & Workflow', icon: '🔄', description: 'AI 시대의 Agile한 FE/BE 데이터 파이프라인 연동' },
    { name: 'AI-Native Ops', icon: '🤖', description: 'LLM 기반 서비스 아키텍처 및 자동화 구현' },
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
            AI 모델과 사용자 사이의 인터페이스를 설계하고 데이터를 시각화하는 지능형 경험을 제공합니다.
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
