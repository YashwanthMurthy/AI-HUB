<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>
# AI HUB: Unified Intelligence System

The **AI HUB** is a centralized platform designed to orchestrate 14 specialized AI agents through an intelligent **Intent Routing Logic**. By automatically detecting user needs—ranging from deep technical research to complex web automation—the system ensures that every query is handled by the most capable specialized module.

---

## 🤖 AI Agent Descriptions

1.  **AI Research Assistant**: Synthesizes complex information from across the web to provide deep dives into any topic with structured summaries and key takeaways.
2.  **AI Email & Content Assistant**: Drafts high-impact professional emails, social media posts, and articles tailored to specific tones, audiences, and platform requirements.
3.  **AI Resume & Interview Coach**: Analyzes career documents to provide actionable feedback, skill gap analysis, and personalized mock interview questions for job seekers.
4.  **AI Data Analyst Agent**: Processes raw datasets and CSV files to identify trends, generate visualizations, and deliver data-driven insights for informed decision-making.
5.  **AI Document Q&A Agent (RAG)**: Uses Retrieval-Augmented Generation to extract precise answers and relevant citations from uploaded PDFs and enterprise knowledge bases.
6.  **AI Coding Assistant**: Generates, debugs, and optimizes code across multiple languages, providing clear explanations and performance-enhancing suggestions for developers and engineers.
7.  **Multi-Agent Business Analyst**: Orchestrates a collaborative workflow between research and data agents to produce comprehensive market reports and strategic business recommendations.
8.  **Enterprise Knowledge Assistant**: Acts as a secure gateway to internal company data, answering queries about proprietary policies, workflows, and documentation with high accuracy.
9.  **Task Automation Agent**: Bridges the gap between planning and execution by creating detailed step-by-step logic for automating repetitive digital workflows and sequences.
10. **Web Automation Agent**: Navigates live websites to perform real-time data scraping, form submissions, and multi-page interactions without requiring manual script updates.
11. **AI Startup Idea Generator**: Analyzes market gaps to propose innovative business models, identifying target audiences, potential revenue streams, and initial execution roadmaps.
12. **AI Learning Assistant**: Simplifies complex educational concepts into structured lesson plans, complete with curated resources and interactive quizzes to reinforce knowledge retention.
13. **AI Customer Support Agent**: Delivers instant, empathetic, and accurate responses to user inquiries, resolving common issues or escalating complex cases to human representatives.
14. **AI Project Manager Agent**: Transforms broad goals into actionable project plans, defining milestones, resource allocation, timelines, and potential risk mitigation strategies.

---

## 📂 Project Structure

```text
ai-hub/
├── frontend/        # React/Next.js UI with Tailwind CSS
├── backend/         # FastAPI/Node.js orchestration layer
├── agents/          # Logic for the 14 specialized agents
├── prompts/         # System instructions and prompt templates
└── README.md        # Documentation and setup guide
```

## 🚀 Quick Start

1.  **Clone the Repository**: `git clone (https://github.com/YashwanthMurthy/AI-HUB)`
2.  **Install Dependencies**: Run `npm install` in frontend and `pip install -r requirements.txt` in backend.
3.  **Configure API Keys**: Add your LLM provider keys to the `.env` file.
4.  **Launch**: Run `npm run dev` and `python main.py` to start the local environment.
## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
