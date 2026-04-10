import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview'
import { useParams, useNavigate } from 'react-router'


const SectionButton = ({ active, onClick, children }) => (
  <button className={"section-btn" + (active ? ' active' : '')} onClick={onClick}>
    {children}
  </button>
)

const Interview = () => {
  const [section, setSection] = useState('technical')
  const [selected, setSelected] = useState(null)
  const {report, loading, getResumePdf} = useInterview()
  const {interviewId} = useParams()

  // useEffect(() => {
  //   if (interviewId) {
  //     getReportById(interviewId)
  //   }
  // }, [interviewId])

  if (loading || !report) {
    return (
      <main className='loading-screen'>
        <p>Hold on...</p>
      </main>
    )
  }


  const questions = section === 'technical' ? report.technicalQuestions : report.behavioralQuestions

  return (
    <div className="interview page-wrap">
      <header className="interview-header">
        <div>
          <h1>Interview Review</h1>
          <p className="subtitle">Technical & behavioral summary, model answers and preparation plan</p>
        </div>
      </header>

      <div className="layout-card">
        <aside className="left-col card small">
          <nav className="nav-list">
            <SectionButton active={section === 'technical'} onClick={() => { setSection('technical'); setSelected(null); }}>Technical questions</SectionButton>
            <SectionButton active={section === 'behavioral'} onClick={() => { setSection('behavioral'); setSelected(null); }}>Behavioral questions</SectionButton>
            <SectionButton active={section === 'plan'} onClick={() => { setSection('plan'); setSelected(null); }}>Road Map</SectionButton>
          </nav>
          <button
          onClick={() =>(getResumePdf(interviewId))}
           className='button primary-button'>
            <svg height={"0.91rem"} style={{marginRight: "0.5rem"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
            Download AI Resume
          </button>

        </aside>

        <main className="left-col big-panel center-col">
          {section === 'plan' ? (
            <div className="plan-list">
              {report.preparationPlan.map(day => (
                <div key={day.day} className="plan-day card small">
                  <div className="card-head">
                    <h2>Day {day.day}</h2>
                    <div className="pill">{day.focus}</div>
                  </div>
                  <ul>
                    {day.tasks.map((t, i) => (<li key={i} className="hint-text">{t}</li>))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="questions-area">
              <div className="questions-list card small">
                {questions.map((q, i) => (
                  <div key={i} className={"q-item" + (selected === i ? ' selected' : '')} onClick={() => setSelected(i)}>
                    {q.question}
                  </div>
                ))}
              </div>
              <div className="question-detail big-panel" style={{marginTop:12}}>
                {selected == null ? (
                  <div className="center-muted">Select a question to see intention & model answer</div>
                ) : (
                  <div>
                    <h3>{questions[selected].question}</h3>
                    <p className="card-label">Intention</p>
                    <p className="hint-text">{questions[selected].intention}</p>
                    <p className="card-label" style={{marginTop:12}}>Suggested answer</p>
                    <p className="hint-text">{questions[selected].answer}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        <aside className="right-col">
          <div className="score-card card">
            <div className="match-wrap">
              <div className="match-circle" style={{background: `conic-gradient(#ff006e ${report.MatchScore}%, rgba(255,255,255,0.04) ${report.MatchScore}% )`}}>
                <div className="match-inner">
                  <div className="score-number">{report.MatchScore}</div>
                  <div className="score-label">Match</div>
                </div>
              </div>
              <div className="score-meta">
                <h3>Match Score</h3>
                <p className="hint-text">Estimated fit based on answers and skills</p>
              </div>
            </div>

            <div className="section-title" style={{marginTop:18}}>
              <h3>Skill Gaps</h3>
            </div>
            <div className="skill-list" style={{marginTop:8}}>
              {report.skillGaps.map((s, i) => (
                <span
  key={i}
  className={`skill-pill ${s.severity || ''}`}
>
  {s.skill}
</span>
              ))}
            </div>

            <div className="section-title" style={{marginTop:18}}>
              <h3>Preparation Plan</h3>
            </div>
            <div className="prep-short" style={{marginTop:8}}>
              {report.preparationPlan.slice(0,2).map((p, i) => (
                <div key={i} className="prep-item">
                  <strong>Day {p.day}:</strong> <span className="hint-text">{p.focus}</span>
                </div>
              ))}
            </div>
            
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Interview
