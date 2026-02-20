import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Expertise.css'

const Expertise = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const capabilities = [
    {
      title: 'Full-Stack Development',
      description: '프론트엔드부터 백엔드, 인프라까지 End-to-End 개발',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        </svg>
      ),
    },
    {
      title: 'AI & Machine Learning',
      description: 'LLM 통합, AI 모델 배포, 지능형 자동화 시스템 구축',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/>
        </svg>
      ),
    },
    {
      title: 'Cybersecurity',
      description: '매크로·봇 탐지, 디바이스 핑거프린팅, FDS 시스템 개발',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
        </svg>
      ),
    },
    {
      title: 'Cloud & DevOps',
      description: 'AWS/GCP 배포, CI/CD 파이프라인, 컨테이너 오케스트레이션',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
        </svg>
      ),
    },
    {
      title: 'Scalable Architecture',
      description: '마이크로서비스, 모노레포 전략, 확장 가능한 시스템 설계',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="6" height="6" rx="1"/><rect x="16" y="2" width="6" height="6" rx="1"/><rect x="9" y="16" width="6" height="6" rx="1"/><path d="M5 8v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8"/><path d="M12 12v4"/>
        </svg>
      ),
    },
    {
      title: 'Data & Analytics',
      description: '실시간 데이터 파이프라인, APM 대시보드, 데이터 시각화',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
        </svg>
      ),
    },
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
      <div className="expertise-glow"></div>
      <div className="container">
        <motion.div
          className="expertise-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Technology</h2>
          <p className="section-subtitle">
            안전하고 확장 가능한 지능형 솔루션을 구동하는 깊은 기술 스택
          </p>
        </motion.div>

        <div className="expertise-content">
          <div className="expertise-section">
            <h3 className="subsection-title">Core Capabilities</h3>
            <div className="values-grid">
              {capabilities.map((cap, index) => (
                <motion.div
                  key={index}
                  className="value-card"
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="value-icon">{cap.icon}</div>
                  <div>
                    <h4 className="value-title">{cap.title}</h4>
                    <p className="value-description">{cap.description}</p>
                  </div>
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
