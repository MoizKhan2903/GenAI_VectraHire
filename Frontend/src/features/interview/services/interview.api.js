import axios from "axios";

const api  = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

/**
 * @description This module defines API service functions for the interview feature. It includes functions to generate a new interview report based on user input (resume file, self-description, and job description), fetch a specific interview report by its ID, and retrieve all interview reports associated with the authenticated user. These functions utilize Axios to make HTTP requests to the backend API endpoints defined in the interview routes. 
 */

export const generateInterviewReport = async ({resumeFile, selfDescription, jobDescription}) => {
    const formData = new FormData()
    formData.append("resume", resumeFile)
    formData.append("selfDescription", selfDescription)
    formData.append("jobDescription", jobDescription)

   const response = await api.post("/api/interview/", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data

}

/**
 * @description Fetches a specific interview report by its ID. This function sends a GET request to the backend API endpoint for retrieving an interview report, passing the interview ID as a URL parameter. The response contains the details of the requested interview report, which is returned to the caller. This function is typically used to display the full details of an individual interview report when a user selects it from a list of reports.
 */

export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`)
    return response.data
}

/**
 * @description Retrieves all interview reports associated with the authenticated user. This function sends a GET request to the backend API endpoint for fetching all interview reports, which returns a list of reports created by the user. The response typically includes summary information for each report (e.g., title, creation date) without sensitive details like the resume content or job description. This function is used to populate a dashboard or list view where users can see all their generated interview reports and select one to view in detail.
 */

export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview/")
    return response.data
}

/**
 * @description Delete an interview report by id for the authenticated user.
 */
export const deleteInterviewReport = async (interviewId) => {
    const response = await api.delete(`/api/interview/${interviewId}`)
    return response.data
}

/**
 * @description Generates a PDF version of the resume based on the interview report ID. This function sends a POST request to the backend API endpoint responsible for generating the resume PDF, passing the interview report ID as a URL parameter. The backend processes the request, generates the PDF using the details from the specified interview report, and returns the PDF file as a blob. The function then returns this blob data, which can be used to display or download the generated resume PDF on the frontend. 
 */

export const generateResumePdf = async ({interviewReportId}) => {
    const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob"
    })

    return response.data
}