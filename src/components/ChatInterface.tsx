import React, { useState, useRef, useEffect } from 'react';
import { Agent, Message } from '../types';
import { AGENTS } from '../constants';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  Send, 
  Paperclip, 
  Bot, 
  User, 
  Sparkles,
  RefreshCw,
  Trash2,
  ChevronDown,
  Search,
  BrainCircuit
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { detectIntent, executeAgentTask } from '../services/gemini';
import { toast } from 'sonner';

interface ChatInterfaceProps {
  initialAgent?: Agent;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialAgent }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<Agent | undefined>(initialAgent);
  const [isAutoRouting, setIsAutoRouting] = useState(!initialAgent);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let targetAgentId = currentAgent?.id;

      if (isAutoRouting) {
        const detectedId = await detectIntent(input);
        targetAgentId = detectedId;
        const agent = AGENTS.find(a => a.id === detectedId);
        setCurrentAgent(agent);
        toast.info(`Routed to ${agent?.name}`);
      }

      if (!targetAgentId) targetAgentId = 'research';

      const response = await executeAgentTask(targetAgentId, input, messages);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response || 'Sorry, I couldn\'t process that.',
        agentId: targetAgentId,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast.error('Failed to get response from AI');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-card/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            currentAgent ? `bg-${currentAgent.color}-500/10 text-${currentAgent.color}-500` : "bg-primary/10 text-primary"
          )}>
            {currentAgent ? <Bot size={20} /> : <Search size={20} />}
          </div>
          <div>
            <h2 className="font-bold text-sm">
              {currentAgent ? currentAgent.name : 'Intelligent Routing'}
            </h2>
            <p className="text-xs text-muted-foreground">
              {isAutoRouting ? 'Auto-detecting intent' : 'Manual selection'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setIsAutoRouting(!isAutoRouting);
              if (!isAutoRouting) setCurrentAgent(undefined);
            }}
            className={cn(isAutoRouting && "bg-primary/10 border-primary/20 text-primary")}
          >
            <Sparkles size={14} className="mr-2" />
            {isAutoRouting ? 'Auto-Route On' : 'Auto-Route Off'}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setMessages([])}>
            <Trash2 size={18} />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="max-w-3xl mx-auto space-y-6 py-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center">
                <BrainCircuit className="text-primary/40" size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight">Welcome to AI HUB</h3>
                <p className="text-muted-foreground max-w-sm">
                  Ask me anything. I'll automatically route your request to the most qualified agent.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full max-w-md">
                {['Explain AI', 'Write email to HR', 'Analyze this data', 'Startup ideas'].map(q => (
                  <Button 
                    key={q} 
                    variant="outline" 
                    className="text-xs justify-start h-auto py-2 px-3"
                    onClick={() => setInput(q)}
                  >
                    "{q}"
                  </Button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-4",
                  msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}
              >
                <Avatar className={cn(
                  "w-8 h-8 border",
                  msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-card"
                )}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </Avatar>
                <div className={cn(
                  "flex flex-col max-w-[80%]",
                  msg.role === 'user' ? "items-end" : "items-start"
                )}>
                  <div className={cn(
                    "px-4 py-3 rounded-2xl text-sm shadow-sm",
                    msg.role === 'user' 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-card border rounded-tl-none"
                  )}>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 px-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {msg.agentId && ` • ${AGENTS.find(a => a.id === msg.agentId)?.name}`}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <div className="flex gap-4">
              <Avatar className="w-8 h-8 border bg-card animate-pulse">
                <Bot size={16} />
              </Avatar>
              <div className="bg-card border rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-card/50 backdrop-blur-md">
        <div className="max-w-3xl mx-auto relative">
          <Input
            placeholder={currentAgent ? `Message ${currentAgent.name}...` : "Ask AI HUB anything..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="pr-24 h-12 rounded-xl border-2 focus-visible:ring-primary/20"
          />
          <div className="absolute right-1.5 top-1.5 flex gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
              <Paperclip size={18} />
            </Button>
            <Button 
              size="icon" 
              className="h-9 w-9 rounded-lg" 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
        <p className="text-[10px] text-center text-muted-foreground mt-2">
          AI HUB can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
};
