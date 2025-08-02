import React, { useState, useCallback } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { 
  Brain, Sparkles, Zap, Target, Layers, Download, 
  Settings, Rocket, Lightbulb, Network, BarChart3,
  FileText, Image, Share, Wand2, Bot, Crown,
  TrendingUp, Cpu, Database, Eye, CheckCircle,
  Compass, Calendar, Users, BarChart, ArrowRight,
  Building, Globe, Package, DollarSign, Leaf,
  Shield, Award, PieChart,
  Activity, Gauge, Timer, AlertTriangle, CheckSquare,
  Thermometer, Share2, Edit3, Plus, Minus, Maximize2, Minimize2,
  ChartBar, LineChart, ScatterChart, Palette,
  Eraser, Undo, Redo, Save, Trash2, Copy,
  Lock, Unlock, Grid, Move, RotateCw,
  ZoomIn, ZoomOut, Fullscreen
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface SimulationAIToolbarProps {
  onRunSimulation: (scenario: any) => Promise<void>;
  onAnalyzeRisk: () => Promise<void>;
  onGenerateForecast: () => Promise<void>;
  onExportReport: () => Promise<void>;
  simulationCount: number;
  isProcessing: boolean;
  activeScenarios: number;
}

const SimulationAIToolbar: React.FC<SimulationAIToolbarProps> = ({
  onRunSimulation,
  onAnalyzeRisk,
  onGenerateForecast,
  onExportReport,
  simulationCount,
  isProcessing,
  activeScenarios
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('simulate');
  const [simulationTopic, setSimulationTopic] = useState('');
  const [selectedModel, setSelectedModel] = useState('simulation-pro');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isMinimized, setIsMinimized] = useState(false);
  
  const [simulationContext, setSimulationContext] = useState({
    domain: '',
    industry: '',
    companySize: '',
    timeHorizon: '',
    budget: '',
    riskTolerance: 'medium',
    marketConditions: 'stable',
    competitiveLandscape: 'moderate'
  });

  const aiStatus = { configured: true, model: 'Simulation Pro v2.0' };
  const availableModels = [
    { id: 'simulation-pro', name: 'Simulation Pro', useCase: 'Complex scenario modeling' },
    { id: 'forecast-engine', name: 'Forecast Engine', useCase: 'Predictive analytics' },
    { id: 'risk-analyzer', name: 'Risk Analyzer', useCase: 'Risk assessment' },
    { id: 'market-simulator', name: 'Market Simulator', useCase: 'Market dynamics' },
    { id: 'financial-modeler', name: 'Financial Modeler', useCase: 'Financial projections' }
  ];
  const qualityMetrics = [{ overall: 0.96, accuracy: 0.94, reliability: 0.95, precision: 0.93, confidence: 0.97 }];
  const lastQuality = qualityMetrics.length > 0 ? qualityMetrics[qualityMetrics.length - 1] : null;

  const SIMULATION_TEMPLATES = [
    { id: 'market-expansion', name: 'Market Expansion', domain: 'Growth', estimatedScenarios: 8 },
    { id: 'cost-optimization', name: 'Cost Optimization', domain: 'Operations', estimatedScenarios: 6 },
    { id: 'digital-transformation', name: 'Digital Transformation', domain: 'Technology', estimatedScenarios: 10 },
    { id: 'financial-planning', name: 'Financial Planning', domain: 'Finance', estimatedScenarios: 7 },
    { id: 'risk-assessment', name: 'Risk Assessment', domain: 'Risk', estimatedScenarios: 9 },
    { id: 'competitive-analysis', name: 'Competitive Analysis', domain: 'Strategy', estimatedScenarios: 5 },
    { id: 'resource-allocation', name: 'Resource Allocation', domain: 'Operations', estimatedScenarios: 6 },
    { id: 'timeline-planning', name: 'Timeline Planning', domain: 'Project', estimatedScenarios: 4 },
    { id: 'budget-forecasting', name: 'Budget Forecasting', domain: 'Finance', estimatedScenarios: 8 },
    { id: 'performance-optimization', name: 'Performance Optimization', domain: 'Operations', estimatedScenarios: 7 }
  ];

  const detectSimulationTemplate = useCallback((topic: string) => {
    const template = SIMULATION_TEMPLATES.find(t => 
      topic.toLowerCase().includes(t.domain.toLowerCase()) || 
      t.name.toLowerCase().includes(topic.toLowerCase())
    );
    if (template) {
      setSelectedTemplate(template.id);
      toast.success(`🎯 Simulation Template Detected: ${template.name}`, {
        description: `${template.estimatedScenarios} scenarios ready`
      });
    }
  }, []);

  const handleTopicChange = useCallback((value: string) => {
    setSimulationTopic(value);
    detectSimulationTemplate(value);
  }, [detectSimulationTemplate]);

  const handleGenerateFromTopic = useCallback(async () => {
    if (!simulationTopic.trim()) {
      toast.error('Please enter a simulation topic');
      return;
    }

    const comprehensiveContext = {
      ...simulationContext,
      topic: simulationTopic,
      model: selectedModel,
      template: selectedTemplate
    };

    try {
      await onRunSimulation(comprehensiveContext);
      toast.success('Simulation generated successfully!');
    } catch (error) {
      toast.error('Failed to generate simulation');
    }
  }, [simulationTopic, simulationContext, selectedModel, selectedTemplate, onRunSimulation]);

  return (
    <motion.div
      initial={{ width: isExpanded ? 320 : 60 }}
      animate={{ width: isExpanded ? 320 : 60 }}
      className="h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col"
    >
      {/* Header Section with Purple Theme */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-600 p-4 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            <span className="font-semibold text-sm">Simulation AI Pro</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 w-6 p-0 text-white hover:bg-white/20"
          >
            {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          </Button>
        </div>

        {/* AI Status */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span>AI Status</span>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
              {aiStatus.configured ? 'Configured' : 'Not Configured'}
            </Badge>
          </div>
          <div className="text-xs opacity-90">{aiStatus.model}</div>
        </div>

        {/* Quality Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span>Quality Score</span>
            <span className="font-medium">{lastQuality ? Math.round(lastQuality.overall * 100) : 0}%</span>
          </div>
          <Progress value={lastQuality ? lastQuality.overall * 100 : 0} className="h-1.5 bg-white/20" />
          <div className="text-xs opacity-90">High precision modeling</div>
        </div>
      </div>

      {isExpanded && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Simulation Controls */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="simulate" className="text-xs">Simulate</TabsTrigger>
              <TabsTrigger value="analyze" className="text-xs">Analyze</TabsTrigger>
            </TabsList>

            <TabsContent value="simulate" className="space-y-4 mt-4">
              {/* Topic Input */}
              <div className="space-y-2">
                <Label htmlFor="simulation-topic" className="text-xs font-medium">Simulation Topic</Label>
                <Input
                  id="simulation-topic"
                  placeholder="Enter simulation scenario..."
                  value={simulationTopic}
                  onChange={(e) => handleTopicChange(e.target.value)}
                  className="h-8 text-xs"
                />
              </div>

              {/* AI Model Selection */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">AI Model</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableModels.map((model) => (
                      <SelectItem key={model.id} value={model.id} className="text-xs">
                        <div className="flex items-center gap-2">
                          <Brain className="w-3 h-3" />
                          <div>
                            <div className="font-medium">{model.name}</div>
                            <div className="text-xs text-gray-500">{model.useCase}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Template Selection */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Template</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Choose template..." />
                  </SelectTrigger>
                  <SelectContent>
                    {SIMULATION_TEMPLATES.map((template) => (
                      <SelectItem key={template.id} value={template.id} className="text-xs">
                        <div className="flex items-center gap-2">
                          <Target className="w-3 h-3" />
                          <div>
                            <div className="font-medium">{template.name}</div>
                            <div className="text-xs text-gray-500">{template.domain}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerateFromTopic}
                disabled={isProcessing || !simulationTopic.trim()}
                className="w-full h-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs"
              >
                {isProcessing ? (
                  <>
                    <Bot className="w-3 h-3 mr-1 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 mr-1" />
                    Generate Simulation
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="analyze" className="space-y-4 mt-4">
              {/* Analysis Tools */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onAnalyzeRisk}
                  className="w-full h-8 text-xs"
                >
                  <Shield className="w-3 h-3 mr-1" />
                  Risk Analysis
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={onGenerateForecast}
                  className="w-full h-8 text-xs"
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Generate Forecast
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={onExportReport}
                  className="w-full h-8 text-xs"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Export Report
                </Button>
              </div>

              {/* Statistics */}
              <Card className="p-3">
                <CardContent className="p-0 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Active Scenarios</span>
                    <Badge variant="secondary" className="text-xs">{activeScenarios}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Total Simulations</span>
                    <Badge variant="secondary" className="text-xs">{simulationCount}</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </motion.div>
  );
};

export default SimulationAIToolbar; 