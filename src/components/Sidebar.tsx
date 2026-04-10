import React from 'react';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  MessageSquare, 
  History, 
  Settings, 
  Upload,
  BrainCircuit,
  Menu,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isCollapsed, 
  setIsCollapsed 
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'chat', label: 'AI Chat', icon: MessageSquare },
    { id: 'upload', label: 'Uploads', icon: Upload },
    { id: 'history', label: 'History', icon: History },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.div 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className={cn(
        "h-screen bg-card border-r flex flex-col transition-all duration-300 ease-in-out relative z-50",
        isCollapsed ? "items-center" : "p-4"
      )}
    >
      <div className={cn(
        "flex items-center mb-8",
        isCollapsed ? "justify-center" : "justify-between px-2"
      )}>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BrainCircuit className="text-primary-foreground" size={20} />
            </div>
            <span className="font-bold text-xl tracking-tighter">AI HUB</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <BrainCircuit className="text-primary-foreground" size={24} />
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(isCollapsed && "mt-4")}
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <div className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 h-11",
              activeTab === item.id && "bg-primary/10 text-primary hover:bg-primary/20",
              isCollapsed && "justify-center p-0"
            )}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon size={20} />
            {!isCollapsed && <span>{item.label}</span>}
          </Button>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="space-y-2">
        {bottomItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 h-11",
              activeTab === item.id && "bg-primary/10 text-primary hover:bg-primary/20",
              isCollapsed && "justify-center p-0"
            )}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon size={20} />
            {!isCollapsed && <span>{item.label}</span>}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};
