import {getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf, deleteInterviewReport} from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"


export const useInterview = () => {
  const context = useContext(InterviewContext)
  const {interviewId} = useParams()

  if(!context){
    throw new Error("useInterview must be used within an InterviewProvider")
  }

  const {loading, setLoading, report, setReport, reports, setReports} = context

  const generateReport = async ({jobDescription, selfDescription, resumeFile}) => {
    setLoading(true)
    let response = null
    try {
      response = await generateInterviewReport({jobDescription, selfDescription, resumeFile})
      // Use optional chaining or check if response exists
      if (response && response.interviewReport) {
        setReport(response.interviewReport)
      }
    } catch (error) {
      console.error("Error generating interview report:", error)
    } finally {
      setLoading(false)
    }
    // Fix: Return null safely if the request failed
    return response ? response.interviewReport : null
  }

  const getReportById = async (interviewId) => {
    setLoading(true)
    let response = null
    try {
     response = await getInterviewReportById(interviewId)
      if (response && response.interviewReport) {
        setReport(response.interviewReport)
      }
    } catch (error) {
      console.error("Error fetching interview report by ID:", error)
    } finally {
      setLoading(false)
    }
    return response ? response.interviewReport : null
  }

  const getReports = async () => {
    setLoading(true)
    let response = null
    try {
      response = await getAllInterviewReports()
      if (response && response.interviewReports) {
        setReports(response.interviewReports)
      }
    } catch (error) {
      console.log("Error fetching interview reports:", error)
    } finally {
      setLoading(false)
    }
    return response ? response.interviewReports : [] // Return empty array on error
  }

  const getResumePdf = async (interviewReportId) => {
    setLoading(true)
    let response = null
    try{
      response = await generateResumePdf({interviewReportId})
      const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `resume_${interviewReportId}.pdf`)
      document.body.appendChild(link)
      link.click()
    }
    catch(error){
      console.log("Error generating resume PDF:", error)
    }
    finally {
      setLoading(false)
    }

  }

  const deleteReport = async (interviewId) => {
    setLoading(true)
    try {
      const response = await deleteInterviewReport(interviewId)
      // remove from local state
      setReports(prev => prev.filter(r => r._id !== interviewId))
      // if current open report matches, clear it
      if (report && report._id === interviewId) {
        setReport(null)
      }
      return response
    } catch (error) {
      console.error("Error deleting report:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

   useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [ interviewId ])


  return {loading, setLoading, report, setReport, reports, setReports, generateReport, getReportById, getReports, getResumePdf, deleteReport}
}