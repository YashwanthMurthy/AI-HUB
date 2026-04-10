import { LucideIcon } from 'lucide-react';

export type AgentId = 
  | 'research'
  | 'content'
  | 'resume'
  | 'data'
  | 'rag'
  | 'coding'
  | 'business'
  | 'enterprise'
  | 'task'
  | 'web'
  | 'startup'
  | 'learning'
  | 'support'
  | 'project';

export interface Agent {
  id: AgentId;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  color: string;
  systemPrompt: string;
  outputStructure: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  agentId?: AgentId;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: number;
}
