// const pdfParse = require("pdf-parse")
// const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
// const interviewReportModel = require("../models/interviewReport.model")




// /**
//  * @description Controller to generate interview report based on user self description, resume and job description.
//  */
// async function generateInterViewReportController(req, res) {

//     const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
//     const { selfDescription, jobDescription } = req.body

//     const interViewReportByAi = await generateInterviewReport({
//         resume: resumeContent.text,
//         selfDescription,
//         jobDescription
//     })

//     const interviewReport = await interviewReportModel.create({
//         user: req.user.id,
//         resume: resumeContent.text,
//         selfDescription,
//         jobDescription,
//         ...interViewReportByAi
//     })

//     res.status(201).json({
//         message: "Interview report generated successfully.",
//         interviewReport
//     })

// }

// /**
//  * @description Controller to get interview report by interviewId.
//  */
// async function getInterviewReportByIdController(req, res) {

//     const { interviewId } = req.params

//     const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

//     if (!interviewReport) {
//         return res.status(404).json({
//             message: "Interview report not found."
//         })
//     }

//     res.status(200).json({
//         message: "Interview report fetched successfully.",
//         interviewReport
//     })
// }


// /** 
//  * @description Controller to get all interview reports of logged in user.
//  */
// async function getAllInterviewReportsController(req, res) {
//     const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

//     res.status(200).json({
//         message: "Interview reports fetched successfully.",
//         interviewReports
//     })
// }


// /**
//  * @description Controller to generate resume PDF based on user self description, resume and job description.
//  */
// async function generateResumePdfController(req, res) {
//     const { interviewReportId } = req.params

//     const interviewReport = await interviewReportModel.findById(interviewReportId)

//     if (!interviewReport) {
//         return res.status(404).json({
//             message: "Interview report not found."
//         })
//     }

//     const { resume, jobDescription, selfDescription } = interviewReport

//     const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

//     res.set({
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
//     })

//     res.send(pdfBuffer)
// }

// module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController }

// /**
//  * @description Controller to delete an interview report belonging to the authenticated user.
//  */
// async function deleteInterviewReportController(req, res) {
//     const { interviewId } = req.params

//     const interviewReport = await interviewReportModel.findOneAndDelete({ _id: interviewId, user: req.user.id })

//     if (!interviewReport) {
//         return res.status(404).json({ message: "Interview report not found or not authorized." })
//     }

//     return res.status(200).json({ message: "Interview report deleted successfully.", interviewId })
// }

// module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController, deleteInterviewReportController }


const pdfParse = require('pdf-parse-fork'); 
const { generateInterviewReport, generateResumePdf } = require('../services/ai.service');
const interviewReportModel = require('../models/interviewReport.model');

/**
 * @desc Generates an interview report based on resume, self-description, and JD
 **/
async function generateInterviewReportController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume file is required" });
        }

        const resumeData = await pdfParse(req.file.buffer);
        const resumeText = resumeData.text;

        const { selfDescription, jobDescription } = req.body;

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        });

        // UPDATED: user now references req.user._id
        const interviewReport = await interviewReportModel.create({
            user: req.user._id, 
            resume: resumeText,
            selfDescription,
            jobDescription,
            title: interViewReportByAi.title || "Interview Preparation Report",
            ...interViewReportByAi
        });

        res.status(201).json({
            message: "Interview report generated successfully",
            data: interviewReport
        });

    } catch (error) {
        console.error("Report Generation Error:", error);
        res.status(500).json({ 
            message: error.message || "Internal Server Error during report generation" 
        });
    }
}

/** * @desc Get interview report by ID (Private to User)
 **/
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params;
        
        // UPDATED: query now uses req.user._id
        const interviewReport = await interviewReportModel.findOne({ 
            _id: interviewId, 
            user: req.user._id 
        });

        if (!interviewReport) {
            return res.status(404).json({ message: 'Interview report not found or unauthorized' });
        }

        res.status(200).json({
            message: 'Interview report retrieved successfully',
            data: interviewReport
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * @desc Get all interview reports for the logged-in user only
 **/
async function getAllInterviewReportsController(req, res) {
    try {
        // UPDATED: query now uses req.user._id
        const interviewReports = await interviewReportModel.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .select('-resume -selfDescription -jobDescription -__v -technicalQuestions -skillGaps -preparationPlan');

        res.status(200).json({
            message: "Your interview reports fetched successfully.",
            data: interviewReports
        });
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: error.message });
    }
}

/**
 * @desc Generate resume PDF based on saved report
 **/
async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params;

        // UPDATED: query now uses req.user._id
        const interviewReport = await interviewReportModel.findOne({
            _id: interviewReportId,
            user: req.user._id
        });

        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found or unauthorized" });
        }

        const { resume, selfDescription, jobDescription } = interviewReport;

        const pdfBuffer = await generateResumePdf({
            resume,
            selfDescription,
            jobDescription
        });

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=resume_${interviewReportId}.pdf`,
        });

        res.send(pdfBuffer);

    } catch (error) {
        console.error("PDF Generation Error:", error);
        res.status(500).json({
            message: error.message || "Failed to generate resume PDF"
        });
    }
}

/**
 * @desc Delete an interview report
 **/
async function deleteInterviewReportController(req, res) {
    try {
        const { interviewId } = req.params;
        
        // UPDATED: query now uses req.user._id
        const deletedReport = await interviewReportModel.findOneAndDelete({ 
            _id: interviewId, 
            user: req.user._id 
        });

        if (!deletedReport) {
            return res.status(404).json({ message: 'Interview report not found or unauthorized' });
        }

        res.status(200).json({
            message: 'Interview report deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete interview report" });
    }
}

module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController,
    deleteInterviewReportController
};