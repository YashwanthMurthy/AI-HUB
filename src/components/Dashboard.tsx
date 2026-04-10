import React from 'react';
import { AGENTS } from '../constants';
import { AgentCard } from './AgentCard';
import { Agent } from '../types';
import { motion } from 'motion/react';
import { Search, Sparkles, Zap } from 'lucide-react';
import { Input } from './ui/input';

interface DashboardProps {
  onSelectAgent: (agent: Agent) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectAgent }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredAgents = AGENTS.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Sparkles size={14} />
          <span>Intelligent Multi-Agent System</span>
        </div>
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          Welcome to <span className="text-primary">AI HUB</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A unified intelligence platform featuring 14 specialized agents. 
          Select an agent or start a general chat to experience automatic intent routing.
        </p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-2xl border shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search agents..." 
            className="pl-10 h-11 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-1">
            <Zap size={14} className="text-yellow-500" />
            <span>14 Agents Active</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span>v1.0.0</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAgents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <AgentCard agent={agent} onClick={onSelectAgent} />
          </motion.div>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Search size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold">No agents found</h3>
          <p className="text-muted-foreground">Try adjusting your search query.</p>
        </div>
      )}
    </div>
  );
};
