// const express = require("express")
// const authMiddleware = require("../middlewares/auth.middleware")
// const interviewController = require("../controllers/interview.controller")
// const upload = require("../middlewares/file.middleware")

// const interviewRouter = express.Router()



// /**
//  * @route POST /api/interview/
//  * @description generate new interview report on the basis of user self description,resume pdf and job description.
//  * @access private
//  */
// interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController)

// /**
//  * @route GET /api/interview/report/:interviewId
//  * @description get interview report by interviewId.
//  * @access private
//  */
// interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController)


// /**
//  * @route GET /api/interview/
//  * @description get all interview reports of logged in user.
//  * @access private
//  */
// interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController)


// /**
//  * @route GET /api/interview/resume/pdf
//  * @description generate resume pdf on the basis of user self description, resume content and job description.
//  * @access private
//  */
// interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)


// /**
//  * @route DELETE /api/interview/:interviewId
//  * @description delete an interview report of the logged in user
//  * @access private
//  */
// interviewRouter.delete("/:interviewId", authMiddleware.authUser, interviewController.deleteInterviewReportController)





// module.exports = interviewRouter


const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/file.middleware");

// Destructure the functions directly from the controller
const { 
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController,
    deleteInterviewReportController 
} = require("../controllers/interview.controller");

const interviewRouter = express.Router();

// Update the routes to use the destructured functions directly
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), generateInterviewReportController);
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, getInterviewReportByIdController);
interviewRouter.get("/", authMiddleware.authUser, getAllInterviewReportsController);
interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, generateResumePdfController);
interviewRouter.delete("/:interviewId", authMiddleware.authUser, deleteInterviewReportController);

module.exports = interviewRouter;