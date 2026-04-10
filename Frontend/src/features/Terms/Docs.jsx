import React from 'react'
import '../../style/docs.scss'
import { useNavigate } from 'react-router'
import { APP_NAME, APP_TAGLINE } from '../../appConstants.js';

const Docs = () => {

  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1) // Go back to the previous page
  }

  return (
    <div className="docs-page">
      <header className="docs-topbar">
        <button className="back-btn" aria-label="back" onClick={handleBack}>
          ←
        </button>
        <div className="topbar-title">Documentation</div>
        <div className="brand">{APP_NAME}</div>
      </header>

      <main className="docs-hero">
        <div className="hero-badge">GUIDE V2.0</div>
        <h1 className="hero-title">The Smart <em>Preparation Guide</em></h1>
        <p className="hero-sub">Welcome to the {APP_NAME} documentation. This guide will help you understand the platform’s core features, our technical architecture, and how to get the most out of your AI-generated interview plans.</p>

        <section className="hero-cards">
          <div className="hero-grid">
            <article className="card getting-started">
              <div className="card-row">
                <div className="card-icon">🚀</div>
                <div>
                  <h3>Getting Started</h3>
                  <p>{APP_NAME} is designed to bridge the gap between your current resume and the job you actually want. By analyzing your profile against a specific Job Description (JD), we provide a data-driven roadmap to help you walk into the interview with confidence. <br /> <br /> {APP_NAME} isn't just a resume builder. It's an intelligent mediator — by analyzing linguistic patterns of job descriptions and the semantic weight of your resume, we provide a photographic path to career alignment. <br /> <br /> Once you click "Generate," the engine cross-references your profile against thousands of potential interview data points. In less than a minute, your dashboard will transform into a personalized learning center. From here, you can dive into your Match Score to see where you stand, or immediately start your 7-Day Roadmap to bridge the identified skill gaps before your actual interview date. </p>
                </div>
              </div>
            </article>

            <aside className="workflow">
              <h4>Core Workflow</h4>
              <ol className="steps">
                <li>
                  <strong>1. Input Phase</strong>
                  <span>Upload your CV (PDF) and paste the target job description.</span>
                </li>
                <li>
                  <strong>2. AI Analysis</strong>
                  <span>Our engine (powered by Google Gemini 2.5 Flash) cross-references your skills with the JD requirements.</span>
                </li>
                <li>
                  <strong>3. The Result</strong>
                  <span>Receive a comprehensive Match Score, a list of Technical/Behavioral Questions, a tailored 7-day roadmap, and a rewritten resume optimized for ATS success.</span>
                </li>
              </ol>
            </aside>
          </div>
        </section>
      </main>

      <section className="features">
        <h3>Features Explained</h3>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-title">Match Score (%)</div>
            <div className="meter"><div className="meter-bar" style={{width: '72%'}}></div></div>
            <div className="meter-legend">80–100% Strong fit</div>
          </div>

          <div className="feature-card small">
            <div className="icon">📅</div>
            <div>
              <div className="ftitle">Day-wise Prep Plan</div>
              <div className="fdesc">Daily modules tailored to your specific weak points.</div>
            </div>
          </div>

          <div className="feature-card small">
            <div className="icon">✍️</div>
            <div>
              <div className="ftitle">Tailored Resume</div>
              <div className="fdesc">Strategic keyword injection for more than 90%  ATS pass rate.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="tech">
        <h3>Technical Architecture</h3>
        <div className="tech-grid">
          <div className="tech-card"><div className="tech-icon">F</div>Frontend & Styling<br/><span>React with Four-Layer Architecture (UI, Hook, State, API Layers) + Custom SCSS for styling</span></div>
          <div className="tech-card"><div className="tech-icon">B</div>Backend & Logic<br/><span>Node.js & Express with JWT Authentication and secure cookie handling</span></div>
          <div className="tech-card"><div className="tech-icon">AI</div>AI Engine<br/><span>Google Gemini SDK with Structured JSON Output for reliable data parsing</span></div>
        </div>
      </section>

      <section className="troubleshoot">
        <h3>Troubleshooting</h3>
        <div className="faq">
          <details>
            <summary>Why did my PDF fail to upload?</summary>
            <p>Ensure your file is a standard PDF format and under 3MB. Scanned images of resumes (OCR) might have lower parsing accuracy.</p>
          </details>
          <details>
            <summary>Is the AI roadmap accurate?</summary>
            <p>Results improve with richer resume data — include project bullets and measurable outcomes.</p>
          </details>
          <details>
            <summary>Can I see my old reports?</summary>
            <p>Yes. All reports are saved to your account. You can access your "Recent Reports" directly from the dashboard.</p>
          </details>
        </div>
      </section>

    
    </div>
  )
}

export default Docs