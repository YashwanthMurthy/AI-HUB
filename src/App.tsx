import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ChatInterface } from './components/ChatInterface';
import { Agent } from './types';
import { Toaster } from 'sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { motion, AnimatePresence } from 'motion/react';
import { 
  History, 
  Settings, 
  Upload, 
  FileText, 
  Clock, 
  Shield, 
  User,
  Database,
  Globe,
  BrainCircuit
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAgent, setSelectedAgent] = useState<Agent | undefined>(undefined);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSelectAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setActiveTab('chat');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onSelectAgent={handleSelectAgent} />;
      case 'chat':
        return <ChatInterface initialAgent={selectedAgent} />;
      case 'upload':
        return (
          <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Document Center</h1>
              <p className="text-muted-foreground">Upload PDFs, CSVs, and text files for AI analysis.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-dashed border-2 flex flex-col items-center justify-center p-12 text-center space-y-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Upload className="text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PDF, CSV, TXT up to 10MB</p>
                </div>
              </Card>
              <div className="space-y-4">
                <h3 className="font-semibold">Recent Uploads</h3>
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                    <div className="flex items-center gap-3">
                      <FileText className="text-muted-foreground" size={18} />
                      <div>
                        <p className="text-sm font-medium">document_0{i}.pdf</p>
                        <p className="text-[10px] text-muted-foreground">Uploaded 2 hours ago • 1.2MB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'history':
        return (
          <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Chat History</h1>
              <p className="text-muted-foreground">Review your past conversations with AI HUB agents.</p>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Research on Quantum Computing', agent: 'Research Assistant', date: 'Today' },
                { title: 'Email to Marketing Team', agent: 'Content Assistant', date: 'Yesterday' },
                { title: 'Python Script Debugging', agent: 'Coding Assistant', date: '2 days ago' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-xl bg-card hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <Clock size={20} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.agent} • {item.date}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Open</Button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">Manage your account and platform preferences.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User size={18} />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">JD</div>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">john@example.com</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Edit Profile</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield size={18} />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Two-Factor Auth</p>
                    <Badge variant="outline">Enabled</Badge>
                  </div>
                  <Button variant="outline" className="w-full">Change Password</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database size={18} />
                    API & Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Gemini API Status</p>
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Connected</Badge>
                  </div>
                  <Button variant="outline" className="w-full">Manage API Keys</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe size={18} />
                    Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Language</p>
                    <p className="text-sm text-muted-foreground">English (US)</p>
                  </div>
                  <Button variant="outline" className="w-full">Theme: Light</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return <Dashboard onSelectAgent={handleSelectAgent} />;
    }
  };

  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab !== 'chat') setSelectedAgent(undefined);
          }} 
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
        <main className="flex-1 overflow-y-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
        <Toaster position="top-right" />
      </div>
    </TooltipProvider>
  );
}

