import { Agent } from './types';

export const AGENTS: Agent[] = [
  {
    id: 'research',
    name: 'AI Research Assistant',
    description: 'Summarizes complex topics and provides detailed explanations.',
    icon: 'Search',
    color: 'blue',
    systemPrompt: 'You are an AI Research Assistant. Provide structured research summaries.',
    outputStructure: 'Summary:\nKey Points:\nDetailed Explanation:\nConclusion:'
  },
  {
    id: 'content',
    name: 'AI Email & Content Assistant',
    description: 'Drafts professional emails, posts, and articles.',
    icon: 'PenTool',
    color: 'orange',
    systemPrompt: 'You are an AI Content Assistant. Help users write high-quality content.',
    outputStructure: 'Type:\nSubject/Title:\nContent:'
  },
  {
    id: 'resume',
    name: 'AI Resume & Interview Coach',
    description: 'Optimizes resumes and prepares you for interviews.',
    icon: 'UserCheck',
    color: 'green',
    systemPrompt: 'You are an AI Career Coach. Provide feedback on resumes and interview prep.',
    outputStructure: 'Feedback:\nImprovements:\nSkills:\nInterview Questions:'
  },
  {
    id: 'data',
    name: 'AI Data Analyst Agent',
    description: 'Analyzes data sets and provides actionable insights.',
    icon: 'BarChart3',
    color: 'purple',
    systemPrompt: 'You are an AI Data Analyst. Analyze the provided data and give insights.',
    outputStructure: 'Question:\nAnalysis:\nInsights:\nConclusion:'
  },
  {
    id: 'rag',
    name: 'AI Document Q&A Agent (RAG)',
    description: 'Answers questions based on uploaded documents.',
    icon: 'FileText',
    color: 'indigo',
    systemPrompt: 'You are an AI Document Assistant. Answer questions based on the provided text.',
    outputStructure: 'Question:\nExtract:\nAnswer:\nConfidence:'
  },
  {
    id: 'coding',
    name: 'AI Coding Assistant',
    description: 'Helps with debugging, refactoring, and writing code.',
    icon: 'Code2',
    color: 'slate',
    systemPrompt: 'You are an AI Coding Assistant. Provide clean, efficient code solutions.',
    outputStructure: 'Problem:\nCode:\nExplanation:\nOptimization:'
  },
  {
    id: 'business',
    name: 'Multi-Agent Business Analyst',
    description: 'Performs deep market research and business analysis.',
    icon: 'Briefcase',
    color: 'emerald',
    systemPrompt: 'You are a Business Analyst. Research market trends and provide reports.',
    outputStructure: 'Research:\nInsights:\nAnalysis:\nReport:\nRecommendations:'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Knowledge Assistant',
    description: 'Accesses and organizes internal company knowledge.',
    icon: 'Building2',
    color: 'cyan',
    systemPrompt: 'You are an Enterprise Assistant. Help users find internal information.',
    outputStructure: 'Query:\nInfo:\nAnswer:'
  },
  {
    id: 'task',
    name: 'Task Automation Agent',
    description: 'Automates repetitive workflows and tasks.',
    icon: 'Zap',
    color: 'yellow',
    systemPrompt: 'You are a Task Automation Expert. Create execution plans for tasks.',
    outputStructure: 'Task:\nSteps:\nExecution Plan:\nResult:'
  },
  {
    id: 'web',
    name: 'Web Automation Agent',
    description: 'Extracts data and automates browser-based tasks.',
    icon: 'Globe',
    color: 'sky',
    systemPrompt: 'You are a Web Automation Specialist. Help with web-based tasks.',
    outputStructure: 'Task:\nSteps:\nExtracted Data:\nResult:'
  },
  {
    id: 'startup',
    name: 'AI Startup Idea Generator',
    description: 'Generates and validates innovative startup ideas.',
    icon: 'Lightbulb',
    color: 'amber',
    systemPrompt: 'You are a Startup Consultant. Generate and validate business ideas.',
    outputStructure: 'Idea:\nProblem:\nMarket:\nRevenue:\nPlan:'
  },
  {
    id: 'learning',
    name: 'AI Learning Assistant',
    description: 'Personalized tutor for any subject or skill.',
    icon: 'GraduationCap',
    color: 'rose',
    systemPrompt: 'You are a Learning Assistant. Explain topics and provide resources.',
    outputStructure: 'Topic:\nExplanation:\nPlan:\nResources:\nQuiz:'
  },
  {
    id: 'support',
    name: 'AI Customer Support Agent',
    description: 'Handles customer queries and provides resolutions.',
    icon: 'Headphones',
    color: 'pink',
    systemPrompt: 'You are a Customer Support Agent. Provide professional responses.',
    outputStructure: 'Query:\nResponse:\nSteps:\nEscalation:'
  },
  {
    id: 'project',
    name: 'AI Project Manager Agent',
    description: 'Plans projects, tracks tasks, and manages risks.',
    icon: 'Layout',
    color: 'violet',
    systemPrompt: 'You are a Project Manager. Create project plans and timelines.',
    outputStructure: 'Goal:\nTasks:\nTimeline:\nResources:\nRisks:'
  }
];
