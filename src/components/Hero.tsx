import './Hero.css'

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>

      <div className="hero-content">
        <div className="hero-text-container">
          <h1 className="hero-title">
            <span className="hero-title-line">LEVEL</span>
            <span className="hero-title-line hero-title-accent">THREE</span>
          </h1>

          <div className="hero-subtitle-wrapper">
            <p className="hero-subtitle">Web · App · AI Security</p>
            <p className="hero-description">
              확장 가능한 웹·모바일 애플리케이션부터 AI 기반 보안 시스템까지,<br/>
              비즈니스를 보호하고 성장시키는 지능형 디지털 솔루션을 구축합니다.
            </p>
          </div>

          <div className="hero-actions">
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              프로젝트 시작하기
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              서비스 보기
            </button>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
      </div>
    </section>
  )
}

export default Hero
