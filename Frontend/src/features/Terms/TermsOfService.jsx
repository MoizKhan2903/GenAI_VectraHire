import React from 'react'
import '../../style/terms.scss'
import { APP_NAME } from '../../appConstants'

const IconSmall = ({ children }) => (
  <div className="small-icon">{children}</div>
)

const TermsOfService = () => {
  return (
    <main className="terms-page service-page">
      <section className="terms-hero">
        <h1 className="terms-title"><span>Terms of</span> <em>Service</em></h1>
        <p className="terms-sub">These rules keep the community safe and our AI running smoothly.</p>
      </section>

      <section className="terms-content">
        <div className="panel-card">
          <IconSmall>⚖️</IconSmall>
          <div className="panel-body">
            <h3>1. The Ground Rules</h3>
            <p>Welcome to {APP_NAME}. By using our platform, you're agreeing to a few simple rules that keep the community safe and the AI running smoothly.</p>
          </div>
        </div>

        <div className="two-column">
          <article className="card dark">
            <div className="card-head"><IconSmall>📦</IconSmall><h3>2. Our Service</h3></div>
            <p>We provide AI-generated interview plans, match scores, and tailored resumes. While our AI is incredibly smart, it's still an assistant — the final decisions remain yours.</p>
          </article>

          <aside className="status-image">
            <div className="status-inner">
              <div className="status-title">SYSTEM STATUS</div>
              <div className="status-dot">● All Systems Operational</div>
            </div>
          </aside>
        </div>

        <div className="disclaimer-card">
          <div className="disc-left">
            <h4>3. The "Real World" Disclaimer</h4>
            <blockquote>"A 95% match score or a tailored resume does not guarantee a job offer."</blockquote>
            <p>Hiring is a human process, and our tool is meant to be a high-tech "prep buddy", not a replacement for your own research and hard work. We optimize your presentation, but interview performance is your stage.</p>
          </div>
          <div className="disc-right">
            <div className="match-badge">95%<span>MATCH POTENTIAL</span></div>
          </div>
        </div>

        <div className="panel-card play-fair">
          <IconSmall>🛡️</IconSmall>
          <div className="panel-body">
            <h3>4. Play Fair</h3>
            <p>Please don't try to "break" the AI, scrape our data, or upload malicious files. We reserve the right to limit access for suspicious activity that slows the site for others.</p>
            <div className="pill-row">
              <div className="pill">No Data Scraping</div>
              <div className="pill">No Malicious Exploits</div>
              <div className="pill">Fair Use Limits</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default TermsOfService