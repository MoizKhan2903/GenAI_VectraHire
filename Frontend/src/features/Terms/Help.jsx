import React from 'react'
import { Link } from 'react-router'
import '../../style/terms.scss'

const Help = () => {
  return (
    <div className="terms-page">
      <section className="terms-hero">
        <h1 className="terms-title">Got Questions? <em>We've Got Answers.</em></h1>
        
      </section>

      <section className="terms-control">
        <div className="card-grid">
          <article className="card">
            <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
              <div className="card-icon">📈</div>
              <div>
                <h3>How does the Match Score work?</h3>
                <p>Our AI looks at the 'must-have' skills in the job description and compares them to your resume and self-description.</p>
                <small style={{color:'#ff6ea6',fontWeight:700,marginTop:10,display:'inline-block'}}>CATEGORY: AI INSIGHTS</small>
              </div>
            </div>
          </article>

          <article className="card">
            <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
              <div className="card-icon">⏳</div>
              <div>
                <h3>The AI seems stuck on 'Loading'. What do I do?</h3>
                <p>Large PDFs can take a few extra seconds to parse. If it stays stuck, refresh the page or check PDF protection.</p>
              </div>
            </div>
          </article>

          <article className="card">
            <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
              <div className="card-icon">❓</div>
              <div>
                <h3>Why did the AI give me certain questions?</h3>
                <p>The AI identifies 'high-risk' areas in your profile—things an interviewer is likely to probe.</p>
              </div>
            </div>
          </article>
        </div>

        <div className="card-grid" style={{marginTop:12}}>
          <article className="wide-card" style={{gridColumn:'1/-1'}}>
            <div className="wide-card-left">
              <div className="wide-icon">📝</div>
            </div>
            <div className="wide-card-right">
              <h3>Is the 'Tailored Resume' ready to send?</h3>
              <p>We generate a clean, ATS-friendly PDF based on your original info but re-worded to highlight the skills the job is looking for.</p>
            </div>
          </article>
        </div>

        <div className="privacy-settings" style={{marginTop:18}}>
          <div className="privacy-icon">🔒</div>
          <div className="privacy-body">
            <h4>Still looking for answers?</h4>
            <p>Our support team is available 24/7 to help you land your dream job.</p>
          </div>
          <Link to="/docs" className="btn-manage browse-btn">Browse Docs</Link>
        </div>

        <div className="terms-content" style={{marginTop:28}}>
          <div className="two-column">
            <div>
              <h2 className="terms-title">Master the art of <em>synthetic conversation.</em></h2>
              <p className="terms-sub">Our AI isn't just a tool—it's your personal interview coach, ready to simulate real conversations and help you practice your responses.</p>
              <div style={{display:'flex',gap:12,marginTop:18}}>
                <div className="panel-card" style={{padding:'12px 18px'}}>
                  <div style={{fontSize:18,fontWeight:700}}>50k+</div>
                  <div style={{color:'#9b9b9f',fontSize:13}}>MOCK INTERVIEWS</div>
                </div>

                <div className="panel-card" style={{padding:'12px 18px'}}>
                  <div style={{fontSize:18,fontWeight:700}}>94%</div>
                  <div style={{color:'#9b9b9f',fontSize:13}}>HIRING RATE</div>
                </div>
              </div>
            </div>

            <aside>
              <div className="status-image" style={{width:320,height:260,borderRadius:12}}>
                <div className="status-inner">{/* placeholder illustration */}
                <img src="\Screenshot 2026-04-04 220646.png" alt="/VectraHire" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Help
