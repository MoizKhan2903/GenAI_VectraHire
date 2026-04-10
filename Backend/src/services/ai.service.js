// const { GoogleGenAI, Type } = require("@google/genai")
// const puppeteer = require('puppeteer');
// const { z } = require('zod');
// const { zodToJsonSchema } = require('zod-to-json-schema');

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY
// });

// // 1. Define the schema using Gemini's Native 'Type' Enum (Bypassing Zod completely)
// const nativeGeminiSchema = {
//     type: Type.OBJECT,
//     properties: {
//         MatchScore: {
//             type: Type.INTEGER,
//             description: "A numerical score representing how well the candidate's resume and self-description match the job description, typically on a scale from 0 to 100."
//         },
//         technicalQuestions: {
//             type: Type.ARRAY,
//             description: "Technical questions that can be asked in the interview.",
//             items: {
//                 type: Type.OBJECT,
//                 properties: {
//                     question: { type: Type.STRING, description: "The technical question." },
//                     intention: { type: Type.STRING, description: "The intention behind asking." },
//                     answer: { type: Type.STRING, description: "How to answer effectively." }
//                 },
//                 required: ["question", "intention", "answer"]
//             }
//         },
//         behavioralQuestions: {
//             type: Type.ARRAY,
//             description: "Behavioral questions that can be asked in the interview.",
//             items: {
//                 type: Type.OBJECT,
//                 properties: {
//                     question: { type: Type.STRING, description: "The behavioral question." },
//                     intention: { type: Type.STRING, description: "The intention behind asking." },
//                     answer: { type: Type.STRING, description: "How to answer effectively." }
//                 },
//                 required: ["question", "intention", "answer"]
//             }
//         },
//         skillGaps: {
//             type: Type.ARRAY,
//             description: "List of the skill gaps.",
//             items: {
//                 type: Type.OBJECT,
//                 properties: {
//                     skill: { type: Type.STRING, description: "The lacking skill." },
//                     severity: { type: Type.STRING, description: "Severity: low, medium, or high." }
//                 },
//                 required: ["skill", "severity"]
//             }
//         },
//         preparationPlan: {
//             type: Type.ARRAY,
//             description: "Day-wise preparation plan.",
//             items: {
//                 type: Type.OBJECT,
//                 properties: {
//                     day: { type: Type.INTEGER, description: "The day number." },
//                     focus: { type: Type.STRING, description: "Main focus for the day." },
//                     tasks: {
//                         type: Type.ARRAY,
//                         items: { type: Type.STRING },
//                         description: "Specific tasks to complete."
//                     }
//                 },
//                 required: ["day", "focus", "tasks"]
//             }
//         },
//         title: {
//             type: Type.STRING,
//             description: "A concise title summarizing the overall assessment, e.g., 'Strong Fit with Minor Skill Gaps' or 'Moderate Fit with Significant Preparation Needed'."
//         }
//     },
//     // Force the model to generate every root property
//     required: ["MatchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan", "title"]
// };

// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
//     const prompt = `Generate an interview report for a candidate with the following details.
// You MUST return ONLY valid JSON that strictly matches the expected schema.

// Resume:
// ${resume}

// Self Description:
// ${selfDescription}

// Job Description:
// ${jobDescription}`;

//     try {
//         const response = await ai.models.generateContent({
//             // 2. Set the model to 2.5 Flash
//             model: "gemini-2.5-flash", 
//             contents: prompt,
//             config: {
//                 responseMimeType: "application/json",
//                 // 3. Pass the native schema
//                 responseSchema: nativeGeminiSchema, 
//             }
//         });

//         const parsedData = JSON.parse(response.text);
//         return parsedData;

//     } catch (error) {
//         console.error("Error generating report:", error);
//         throw error;
//     }
// }


// async function generatePdfFromHtml(htmlContent) {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage();
//     await page.setContent(htmlContent, { waitUntil: "networkidle0" })

//     const pdfBuffer = await page.pdf({
//         format: "A4", margin: {
//             top: "20mm",
//             bottom: "20mm",
//             left: "15mm",
//             right: "15mm"
//         }
//     })

//     await browser.close()

//     return pdfBuffer
// }

// async function generateResumePdf({ resume, selfDescription, jobDescription }) {

//     const resumePdfSchema = z.object({
//         html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
//     })

//     const prompt = `Generate resume for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}

//                         the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
//                         The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
//                         The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
//                         you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
//                         The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
//                         The resume should not be so lengthy, it should strictly be 1 page long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                        
//                     `

//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(resumePdfSchema),
//         }
//     })


//     const jsonContent = JSON.parse(response.text)

//     const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

//     return pdfBuffer

// }



// module.exports = { 
//     generateInterviewReport,
//     generateResumePdf 
// };


// .................

const { GoogleGenAI, Type } = require("@google/genai");
const { zodToJsonSchema } = require('zod-to-json-schema');
const { z } = require('zod');
require('dotenv').config();

// Vercel / Production Puppeteer Configuration
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;
const puppeteer = isProduction ? require('puppeteer-core') : require('puppeteer');
const chromium = isProduction ? require('@sparticuz/chromium') : null;

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

// --- Gemini Native Schema ---
const nativeGeminiSchema = {
    type: Type.OBJECT,
    properties: {
        MatchScore: {
            type: Type.INTEGER,
            description: "A numerical score (0-100) representing the candidate's match."
        },
        technicalQuestions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING },
                    intention: { type: Type.STRING },
                    answer: { type: Type.STRING }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING },
                    intention: { type: Type.STRING },
                    answer: { type: Type.STRING }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING },
                    severity: { type: Type.STRING }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER },
                    focus: { type: Type.STRING },
                    tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["day", "focus", "tasks"]
            }
        },
        title: {
            type: Type.STRING,
            description: "A concise title summarizing the assessment."
        }
    },
    required: ["MatchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan", "title"]
};

// --- Function 1: Interview Report (Gemini) ---
async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate an interview report for a candidate.
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}`;

    try {
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use stable flash or your preferred version

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: nativeGeminiSchema,
            }
        });

        const parsedData = JSON.parse(result.response.text());
        
        // Data Integrity Check for Mongoose
        if (!parsedData.title) parsedData.title = "Interview Preparation Report";

        return parsedData;
    } catch (error) {
        console.error("Error generating report:", error);
        throw error;
    }
}

// --- Function 2: PDF Generation (The Vercel Engine) ---
async function generatePdfFromHtml(htmlContent) {
    let browser = null;
    try {
        const options = isProduction ? {
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        } : { 
            headless: "new" 
        };

        browser = await puppeteer.launch(options);
        const page = await browser.newPage();
        
        await page.setContent(htmlContent, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({
            format: "A4",
            margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
            printBackground: true
        });

        return pdfBuffer;
    } catch (err) {
        console.error("Puppeteer Engine Error:", err);
        throw err;
    } finally {
        if (browser) await browser.close();
    }
}

// --- Function 3: Resume PDF (Gemini) ---
async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    try {
        const resumePdfSchema = z.object({
            html: z.string().describe("The full HTML content of the resume.")
        });

        const prompt = `Generate a 1-page professional HTML resume tailored to this JD: ${jobDescription}. 
        Candidate Info: ${resume}. 
        Summary: ${selfDescription}.
        Return ONLY valid JSON with an "html" field.`;

        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: zodToJsonSchema(resumePdfSchema),
            }
        });

        const jsonContent = JSON.parse(result.response.text());

        if (!jsonContent.html) {
            throw new Error("AI failed to provide HTML.");
        }

        return await generatePdfFromHtml(jsonContent.html);

    } catch (error) {
        console.error("Resume PDF Service Error:", error);
        throw error;
    }
}

module.exports = { 
    generateInterviewReport, 
    generateResumePdf 
}