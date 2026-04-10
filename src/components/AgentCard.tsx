import React from 'react';
import { Agent } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface AgentCardProps {
  agent: Agent;
  onClick: (agent: Agent) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onClick }) => {
  const Icon = (Icons as any)[agent.icon] || Icons.HelpCircle;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={() => onClick(agent)}
    >
      <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
            `bg-${agent.color}-500/10 text-${agent.color}-500`
          )}>
            <Icon size={24} />
          </div>
          <CardTitle className="text-lg font-bold tracking-tight">{agent.name}</CardTitle>
          <CardDescription className="text-sm line-clamp-2">{agent.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-xs font-medium text-muted-foreground">
            <Icons.ArrowRight size={14} className="mr-1" />
            Launch Agent
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
