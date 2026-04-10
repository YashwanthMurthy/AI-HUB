import { GoogleGenAI } from "@google/genai";
import { AGENTS } from "../constants";
import { AgentId } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const detectIntent = async (input: string): Promise<AgentId> => {
  const prompt = `
    Analyze the following user input and determine which AI agent is best suited to handle it.
    Available agents:
    ${AGENTS.map(a => `- ${a.id}: ${a.description}`).join('\n')}

    Return ONLY the agent ID (e.g., 'research', 'coding', etc.).
    If unclear, return 'research'.

    User input: "${input}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    const agentId = response.text?.trim().toLowerCase() as AgentId;
    return AGENTS.some(a => a.id === agentId) ? agentId : 'research';
  } catch (error) {
    console.error("Intent detection failed:", error);
    return 'research';
  }
};

export const executeAgentTask = async (agentId: AgentId, input: string, history: any[] = []) => {
  const agent = AGENTS.find(a => a.id === agentId);
  if (!agent) throw new Error("Agent not found");

  const systemInstruction = `
    ${agent.systemPrompt}
    
    You MUST respond in the following structured format:
    ${agent.outputStructure}
    
    Keep responses professional and concise.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] })),
        { role: 'user', parts: [{ text: input }] }
      ],
      config: {
        systemInstruction,
      }
    });

    return response.text;
  } catch (error) {
    console.error(`Agent ${agentId} execution failed:`, error);
    throw error;
  }
};
