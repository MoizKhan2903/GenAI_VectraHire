🚀 VectraHire: AI-Driven Interview Intelligence
VectraHire is a high-precision interview preparation and resume engineering platform built with the MERN stack. It bridges the gap between a candidate's current profile and their dream job by utilizing semantic analysis and generative AI to provide actionable roadmaps.

"Precision Prep, Powered by AI"

✨ Core Features
Semantic Match Scoring: Analyzes your resume against a specific Job Description (JD) to provide a data-backed match percentage.

Predictive Questioning: Generates technical and behavioral interview questions based on identified skill gaps between your profile and the JD.

7-Day Preparation Roadmap: A day-by-day strategic plan to master the specific skills required for the role.

Resume Tailoring: Generates a professional, single-page, ATS-optimized resume specifically rewritten to highlight relevant achievements.

Smart Dashboard: Track your preparation progress and access previous reports instantly.

🛠 Tech Stack
Frontend
React.js (Four-Layer Architecture: UI, Hook, State, API)

SCSS (Modern, dark-themed responsive design)

Axios (Secure API communication)

Backend
Node.js & Express

MongoDB & Mongoose (Scalable career data storage)

JWT & Cookie-Parser (Secure, stateless authentication)

AI & Processing
Google Gemini 2.5 Flash (Semantic analysis & content generation)

Zod (Strict structured JSON output for AI reliability)

pdf-parse (Sophisticated resume data extraction)

🏗 Project Architecture
VectraHire follows a Four-Layer Frontend Architecture to ensure maintainability and clean code separation:

UI Layer: Pure React components and SCSS styling.

Hook Layer: Custom hooks (e.g., useInterview) that orchestrate logic between the state and API.

State Layer: React Context API (AuthProvider, InterviewProvider) managing global data.

API Layer: Specialized service modules (Axios instances) dedicated to backend communication.

🚀 Getting Started
Prerequisites
Node.js (v18+)

MongoDB Atlas Account

Google AI Studio API Key (Gemini)

Installation
Clone the Repository:
git clone https://github.com/yourusername/VectraHire.git
cd VectraHire

Setup Backend:
cd backend
npm install

Create a .env file:
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_google_ai_key
Start backend: npm run dev

Setup Frontend:
cd ../frontend
npm install
Start frontend: npm run dev

📝 Documentation
For a deep dive into the underlying "Interview Intelligence Engine" and best practices for achieving a 90%+ Match Score, please visit the /docs page within the application.

📄 License
Created by Moiz. This project was engineered for educational and professional portfolio use.