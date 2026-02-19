import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'react-i18next'
import {
  Zap, Bot, Shield, Layers, Sparkles, Workflow,
  Code, AppWindow, Scan, TestTube, Palette, Package,
  Settings, Database
} from 'lucide-react'
import './Expertise.css'

const Expertise = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Core Values Icons
  const valuesData = t('expertise.values', { returnObjects: true }) as { title: string; description: string }[];
  const coreIcons = [
    <Zap size={32} />,       // Performance
    <Bot size={32} />,       // AI Integration
    <Shield size={32} />,    // Security
    <Layers size={32} />,    // Scalable Arch
    <Sparkles size={32} />,  // UX
    <Workflow size={32} />   // Real-time AI Platform
  ];

  const cardColors = [
    { hex: '#0071e3', shadow: 'rgba(0, 113, 227, 0.25)' },   // Performance (Blue)
    { hex: '#9857d3', shadow: 'rgba(152, 87, 211, 0.25)' },  // AI (Purple)
    { hex: '#2eb82e', shadow: 'rgba(46, 184, 46, 0.25)' },   // Security (Green)
    { hex: '#f5a623', shadow: 'rgba(245, 166, 35, 0.25)' },  // Scalable (Orange)
    { hex: '#ff2d55', shadow: 'rgba(255, 45, 85, 0.25)' },   // UX (Pink)
    { hex: '#5856d6', shadow: 'rgba(88, 86, 214, 0.25)' }    // Real-time (Indigo)
  ];

  const coreValues = valuesData.map((data, index) => ({
    ...data,
    icon: coreIcons[index],
    color: cardColors[index]
  }));

  // Frameworks Icons
  const frameworksData = t('expertise.frameworks', { returnObjects: true }) as { name: string; description: string }[];
  const frameworkIcons = [
    <Code size={24} />,          // Modern FE
    <Zap size={24} />,           // Turbo
    <AppWindow size={24} />,     // Next.js (Generic App)
    <Shield size={24} />,        // Bot Detection
    <Scan size={24} />,          // Device Fingerprinting
    <TestTube size={24} />,      // CI/CD
    <Palette size={24} />,       // Figma
    <Package size={24} />,       // Common Modules
    <Settings size={24} />,      // Monorepo Consulting
    <Workflow size={24} />,      // n8n
    <Database size={24} />       // AI-Native Ops (Data/Infra)
  ];

  const frameworks = frameworksData.map((data, index) => ({
    ...data,
    icon: frameworkIcons[index]
  }));


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
          <h2 className="section-title">{t('expertise.title')}</h2>
          <p className="section-subtitle">
            {t('expertise.subtitle')}
          </p>
        </motion.div>

        <div className="expertise-content">
          <div className="expertise-section">
            <h3 className="subsection-title">{t('expertise.core_values')}</h3>
            <div className="values-grid">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  className="value-card"
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    '--card-color': value.color.hex,
                    '--card-shadow': value.color.shadow
                  } as React.CSSProperties}
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
            <h3 className="subsection-title">{t('expertise.frameworks_title')}</h3>
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
