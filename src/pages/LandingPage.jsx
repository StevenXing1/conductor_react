import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

function LandingPage() {
  const navigate = useNavigate()

  const handleLogin = () => {
    // Navigate directly to dashboard
    navigate('/dashboard')
  }

  return (
    <div className="landing-page">
      <div className="laptop-frame">
        <div className="browser-window">
          <div className="browser-header">
            <div className="browser-controls">
              <div className="control-btn close"></div>
              <div className="control-btn minimize"></div>
              <div className="control-btn maximize"></div>
            </div>
            <div className="address-bar">conductor.ucsd.edu</div>
          </div>

          <div className="browser-content">
            <div className="main-content">
              <div className="content-grid">
                <div className="hero-content">
                  <div className="hero-eyebrow">UCSD Software Engineering</div>
                  <h1 className="hero-title">Transform Your Learning Experience</h1>
                  <p className="hero-subtitle">
                    Conductor brings together everything you need for success in software engineering at UCSD.
                    Organize, connect, and learn with ease.
                  </p>
                  <button onClick={handleLogin} className="cta-button">
                    Get Started
                  </button>
                </div>
                
                <div className="hero-visual">
                  <div className="polaroid-container">
                    <div className="polaroid">
                      <img 
                        className="polaroid-image" 
                        src="/assets/welcome.png" 
                        alt="Welcome students" 
                      />
                      <div className="polaroid-caption">Welcome to Conductor!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
