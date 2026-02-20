import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Contact.css'

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || ''

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!GOOGLE_SCRIPT_URL) {
      alert('문의 기능이 아직 설정되지 않았습니다.')
      return
    }

    setStatus('sending')

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      })

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: 'Email',
      value: 'thinkij@levelthree.kr',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: 'Location',
      value: 'Seoul, South Korea',
    },
  ]

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="contact-glow"></div>
      <div className="container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            프로젝트에 대해 이야기하고 싶으신가요? 언제든지 연락주세요.
          </p>
        </motion.div>

        <div className="contact-wrapper">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="info-list">
              {contactInfo.map((info, index) => (
                <div key={index} className="info-item">
                  <span className="info-icon">{info.icon}</span>
                  <div>
                    <h4 className="info-label">{info.label}</h4>
                    <p className="info-value">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="홍길동"
                  disabled={status === 'sending'}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  disabled={status === 'sending'}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">메시지</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="프로젝트에 대해 알려주세요..."
                  disabled={status === 'sending'}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? '전송 중...' : '메시지 보내기'}
              </button>

              {status === 'success' && (
                <p className="form-status form-status-success">
                  메시지가 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.
                </p>
              )}
              {status === 'error' && (
                <p className="form-status form-status-error">
                  전송에 실패했습니다. 이메일로 직접 연락주세요.
                </p>
              )}
            </form>
          </motion.div>
        </div>

      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <span className="footer-logo gradient-text">LEVELTHREE</span>
            <p className="footer-text">
              &copy; 2019 LEVELTHREE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </section>
  )
}

export default Contact
