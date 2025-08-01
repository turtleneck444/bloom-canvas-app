import React, { useState, useCallback } from 'react';
import { Compass, Target, FileText, Calendar, Folder, Download, Plus, Settings, Lightbulb, Users, TrendingUp, Save, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface StrategyPlan {
  id: string;
  title: string;
  domain: string;
  budget?: string;
  timeFrame: string;
  aiStyle: string;
  phases: StrategyPhase[];
  createdAt: Date;
}

interface StrategyPhase {
  id: string;
  title: string;
  description: string;
  tasks: string[];
  resources: string[];
  risks: string[];
  success: string[];
  completed: boolean;
}

const Strategy: React.FC = () => {
  const [activeTab, setActiveTab] = useState('navigator');
  const [currentPlan, setCurrentPlan] = useState<StrategyPlan | null>(null);
  const [showLayoutPanel, setShowLayoutPanel] = useState(false);
  const [newPlan, setNewPlan] = useState({
    title: '',
    domain: '',
    budget: '',
    timeFrame: '',
    aiStyle: 'professional'
  });

  const sampleBlueprints = [
    { id: 'marketing', title: 'Marketing Strategy', description: 'Launch campaigns and grow brand awareness', icon: TrendingUp },
    { id: 'startup', title: 'Startup Launch', description: 'From idea to market in 90 days', icon: Target },
    { id: 'hiring', title: 'Hiring Plan', description: 'Scale your team strategically', icon: Users },
    { id: 'seo', title: 'SEO Campaign', description: 'Dominate search rankings', icon: TrendingUp },
    { id: 'personal', title: 'Personal Development', description: 'Achieve your career goals', icon: Target },
  ];

  const handleCreatePlan = useCallback(() => {
    if (!newPlan.title || !newPlan.domain || !newPlan.timeFrame) return;

    const mockPhases: StrategyPhase[] = [
      {
        id: '1',
        title: 'Goal Summary & Analysis',
        description: 'Define objectives and analyze current state',
        tasks: ['Market research', 'Competitor analysis', 'SWOT assessment'],
        resources: ['Research tools', 'Analytics platform', 'Team time'],
        risks: ['Incomplete data', 'Changing market conditions'],
        success: ['Clear objectives defined', 'Market understanding achieved'],
        completed: false
      },
      {
        id: '2',
        title: 'Strategic Planning',
        description: 'Develop actionable strategy and roadmap',
        tasks: ['Strategy formulation', 'Resource allocation', 'Timeline creation'],
        resources: ['Strategic planning tools', 'Budget allocation', 'Expert consultation'],
        risks: ['Resource constraints', 'Timeline delays'],
        success: ['Strategy document completed', 'Team alignment achieved'],
        completed: false
      },
      {
        id: '3',
        title: 'Implementation & Execution',
        description: 'Execute the plan with monitoring and adjustments',
        tasks: ['Launch activities', 'Performance monitoring', 'Iterative improvements'],
        resources: ['Implementation team', 'Monitoring tools', 'Feedback systems'],
        risks: ['Execution gaps', 'Market resistance'],
        success: ['Goals achieved', 'Metrics targets met'],
        completed: false
      }
    ];

    const plan: StrategyPlan = {
      id: Date.now().toString(),
      ...newPlan,
      phases: mockPhases,
      createdAt: new Date()
    };

    setCurrentPlan(plan);
    setNewPlan({ title: '', domain: '', budget: '', timeFrame: '', aiStyle: 'professional' });
    toast.success('Strategic plan generated successfully!');
  }, [newPlan]);

  const generateWithAI = useCallback((phaseId: string) => {
    toast.success(`Enhancing phase ${phaseId} with AI...`);
  }, []);

  const handleSave = useCallback(() => {
    if (currentPlan) {
      toast.success('Strategy plan saved successfully!');
    }
  }, [currentPlan]);

  const handleExport = useCallback(() => {
    if (currentPlan) {
      const data = { ...currentPlan, timestamp: new Date().toISOString() };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `strategy-plan-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Strategy plan exported as JSON');
    }
  }, [currentPlan]);

  const renderStartScreen = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-slate-600 to-cyan-400 flex items-center justify-center mb-6">
          <Compass className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-600 to-cyan-500 bg-clip-text text-transparent">
          Strategy Co-Pilot
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
          AI-driven workspace for generating and refining strategic plans across any domain
        </p>
      </motion.div>

      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-md border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-500" />
            Start a New Strategic Plan
          </CardTitle>
          <CardDescription>
            Define your goal and let AI guide you through a comprehensive strategy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Goal Title</Label>
              <Input
                id="title"
                placeholder="e.g. Launch New Product in 60 Days"
                value={newPlan.title}
                onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <Select value={newPlan.domain} onValueChange={(value) => setNewPlan({ ...newPlan, domain: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (Optional)</Label>
              <Input
                id="budget"
                placeholder="e.g. $50,000"
                value={newPlan.budget}
                onChange={(e) => setNewPlan({ ...newPlan, budget: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeFrame">Time Frame</Label>
              <Select value={newPlan.timeFrame} onValueChange={(value) => setNewPlan({ ...newPlan, timeFrame: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30-days">30 Days</SelectItem>
                  <SelectItem value="60-days">60 Days</SelectItem>
                  <SelectItem value="90-days">90 Days</SelectItem>
                  <SelectItem value="6-months">6 Months</SelectItem>
                  <SelectItem value="1-year">1 Year</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aiStyle">AI Style</Label>
            <Select value={newPlan.aiStyle} onValueChange={(value) => setNewPlan({ ...newPlan, aiStyle: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select AI tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="bold">Bold & Aggressive</SelectItem>
                <SelectItem value="experimental">Experimental</SelectItem>
                <SelectItem value="consultant">Consultant Style</SelectItem>
                <SelectItem value="startup">Startup Focused</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleCreatePlan}
            className="w-full bg-gradient-to-r from-slate-600 to-cyan-500 hover:from-slate-700 hover:to-cyan-600 text-white"
            disabled={!newPlan.title || !newPlan.domain || !newPlan.timeFrame}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Generate Strategy with AI
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderNavigator = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{currentPlan?.title}</h2>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">
              {currentPlan?.domain}
            </Badge>
            <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
              {currentPlan?.timeFrame}
            </Badge>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      <div className="space-y-4">
        {currentPlan?.phases.map((phase, index) => (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-l-4 border-l-cyan-500 bg-white/95 backdrop-blur-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{phase.title}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => generateWithAI(phase.id)}
                    className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
                  >
                    <Lightbulb className="w-4 h-4 mr-1" />
                    Enhance
                  </Button>
                </div>
                <CardDescription>{phase.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">Tasks</h4>
                    <ul className="space-y-1">
                      {phase.tasks.map((task, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">Resources</h4>
                    <ul className="space-y-1">
                      {phase.resources.map((resource, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderBlueprints = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Strategy Blueprints</h2>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Custom Blueprint
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleBlueprints.map((blueprint) => (
          <Card key={blueprint.id} className="hover:shadow-lg transition-shadow cursor-pointer group bg-white/95 backdrop-blur-md">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-100 to-cyan-100 dark:from-slate-800 dark:to-cyan-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <blueprint.icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </div>
                <CardTitle className="text-lg">{blueprint.title}</CardTitle>
              </div>
              <CardDescription>{blueprint.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Use Blueprint
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'navigator':
        return currentPlan ? renderNavigator() : renderStartScreen();
      case 'blueprints':
        return renderBlueprints();
      case 'goals':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Goals & Objectives</h2>
            <p className="text-gray-600 dark:text-gray-400">Goal management coming soon...</p>
          </div>
        );
      case 'timeline':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Timeline & Milestones</h2>
            <p className="text-gray-600 dark:text-gray-400">Timeline visualization coming soon...</p>
          </div>
        );
      case 'assets':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Generated Assets</h2>
            <p className="text-gray-600 dark:text-gray-400">Asset management coming soon...</p>
          </div>
        );
      case 'exports':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Export Options</h2>
            <p className="text-gray-600 dark:text-gray-400">Export functionality coming soon...</p>
          </div>
        );
      default:
        return renderStartScreen();
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-br from-slate-50 via-gray-50/30 to-cyan-50/30 dark:from-slate-900 dark:via-slate-800/30 dark:to-cyan-900/30">
      {/* Top Toolbar */}
      <div className="w-full h-16 bg-white/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 z-30 sticky top-0 left-0">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Strategy Co-Pilot</h1>
            {currentPlan && (
              <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">
                {currentPlan.domain} • {currentPlan.timeFrame}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLayoutPanel(!showLayoutPanel)}
              className="bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            >
              <FileText className="w-4 h-4 mr-1" />
              Sidebar
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={!currentPlan}
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={!currentPlan}
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar Panel */}
        <AnimatePresence>
          {showLayoutPanel && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/95 backdrop-blur-md border-r border-gray-200 dark:border-slate-700 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-600 to-cyan-500 flex items-center justify-center">
                    <Compass className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="font-bold text-gray-900 dark:text-gray-100">Strategy Co-Pilot</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">AI Strategy Workspace</p>
                  </div>
                </div>
              </div>

              <nav className="flex-1 p-4">
                <div className="space-y-2">
                  {[
                    { id: 'navigator', label: 'Navigator', icon: Compass },
                    { id: 'goals', label: 'Goals', icon: Target },
                    { id: 'blueprints', label: 'Blueprints', icon: FileText },
                    { id: 'timeline', label: 'Timeline', icon: Calendar },
                    { id: 'assets', label: 'Assets', icon: Folder },
                    { id: 'exports', label: 'Exports', icon: Download },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-slate-100 to-cyan-100 dark:from-slate-700 dark:to-cyan-800 text-slate-700 dark:text-slate-200'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Canvas Area */}
        <div className="flex-1 relative overflow-auto">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Strategy;