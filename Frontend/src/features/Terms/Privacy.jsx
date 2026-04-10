import React from 'react'
import '../../style/terms.scss'
import { Navigate, useNavigate } from 'react-router'
import { APP_NAME } from '../../appConstants'

const Icon = ({ name }) => {
  if (name === 'resume') {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M7 8h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M7 12h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    )
  }
  if (name === 'job') {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    )
  }
  if (name === 'account') {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5 20a7 7 0 0114 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    )
  }
  return null
}

const Privacy = () => {
  const navigate = useNavigate()

  return (
    <main className="terms-page">
      <section className="terms-hero">
        <h1 className="terms-title"><span>Your Career Data is</span> <em>Safe With Us</em></h1>
        <p className="terms-sub">We know that a resume is more than just a document—it's your professional history. At {APP_NAME}, we take the privacy of your career journey seriously.</p>
      </section>

      <section className="terms-collection">
        <h2 className="section-heading">What we collect (and why)</h2>

        <div className="card-grid">
          <article className="card">
            <div className="card-icon"><Icon name="resume" /></div>
            <h3>Resumes & Profiles</h3>
            <p>When you upload a PDF or type your bio, we process that data to help our AI understand your strengths.</p>
          </article>

          <article className="card">
            <div className="card-icon"><Icon name="job" /></div>
            <h3>Job Descriptions</h3>
            <p>We analyze the roles to tell you exactly what an employer is looking for.</p>
          </article>

          <article className="card">
            <div className="card-icon"><Icon name="account" /></div>
            <h3>Account Info</h3>
            <p>We keep your email and name so you can come back and see your generated reports anytime.</p>
          </article>
        </div>

        <div className="wide-card">
          <div className="wide-card-left">
            <div className="wide-icon">🤖</div>
          </div>
          <div className="wide-card-right">
            <h3>How we use AI</h3>
            <p>We use AI to "read" your documents. Your data is sent securely to the AI to generate your match score and questions. It is never used to train public AI models or sold to third parties.</p>
            <span className="secure-pill">SECURE END-TO-END PROCESSING</span>
          </div>
        </div>
      </section>

      <section className="terms-control">
        <h2 className="section-heading">You're in control</h2>
        <p>Don't want us to have your data anymore? You can delete any specific report or your entire account from your dashboard instantly.</p>

        <div className="privacy-settings">
          <div className="privacy-icon">🔒</div>
          <div className="privacy-body">
            <h4>Privacy </h4>
            <p>We are committed to protecting your personal information and ensuring transparency in how we handle your data.</p>
          </div>
          <button 
            onClick={() => navigate('/docs')}
           className="btn-manage">View Documentation</button>
        </div>
      </section>
    </main>
  )
}

export default Privacy