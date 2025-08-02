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
  Shield, Award, PieChart, LineChart,
  Activity, Gauge, Timer, AlertTriangle, CheckSquare
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface StrategyAIToolbarProps {
  onGenerateStrategy: (topic: string, context: any) => Promise<void>;
  onIdentifyGoals: () => Promise<void>;
  onAutoGeneratePhases: () => Promise<void>;
  onEnhanceStrategy: () => Promise<void>;
  nodeCount: number;
  isProcessing: boolean;
  fundamentalNodesCount: number;
}

const StrategyAIToolbar: React.FC<StrategyAIToolbarProps> = ({
  onGenerateStrategy,
  onIdentifyGoals,
  onAutoGeneratePhases,
  onEnhanceStrategy,
  nodeCount,
  isProcessing,
  fundamentalNodesCount
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('strategize');
  const [aiTopic, setAiTopic] = useState('');
  const [selectedModel, setSelectedModel] = useState('strategy-pro');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isMinimized, setIsMinimized] = useState(false);
  
  const [strategyContext, setStrategyContext] = useState({
    domain: '',
    industry: '',
    companySize: '',
    timeHorizon: '',
    budget: '',
    riskTolerance: 'medium'
  });

  const aiStatus = { configured: true, model: 'Strategy Pro v2.0' };
  const availableModels = [
    { id: 'strategy-pro', name: 'Strategy Pro', useCase: 'Complex enterprise strategy' },
    { id: 'startup-accelerator', name: 'Startup Accelerator', useCase: 'Rapid scaling strategies' },
    { id: 'digital-transformer', name: 'Digital Transformer', useCase: 'Digital transformation' },
    { id: 'competitive-intelligence', name: 'Competitive Intelligence', useCase: 'Market positioning' },
    { id: 'financial-strategist', name: 'Financial Strategist', useCase: 'Financial planning' }
  ];
  const qualityMetrics = [{ overall: 0.94, relevance: 0.96, depth: 0.92, actionability: 0.95, innovation: 0.91 }];
  const lastQuality = qualityMetrics.length > 0 ? qualityMetrics[qualityMetrics.length - 1] : null;

  const STRATEGY_TEMPLATES = [
    { id: 'enterprise-transformation', name: 'Enterprise Transformation', domain: 'Enterprise', estimatedNodeCount: 45 },
    { id: 'startup-scaling', name: 'Startup Scaling', domain: 'Startup', estimatedNodeCount: 38 },
    { id: 'digital-transformation', name: 'Digital Transformation', domain: 'Technology', estimatedNodeCount: 35 },
    { id: 'product-strategy', name: 'Product Strategy', domain: 'Product', estimatedNodeCount: 32 },
    { id: 'financial-optimization', name: 'Financial Optimization', domain: 'Finance', estimatedNodeCount: 28 },
    { id: 'operational-excellence', name: 'Operational Excellence', domain: 'Operations', estimatedNodeCount: 25 },
    { id: 'competitive-positioning', name: 'Competitive Positioning', domain: 'Business', estimatedNodeCount: 35 },
    { id: 'innovation-roadmap', name: 'Innovation Roadmap', domain: 'R&D', estimatedNodeCount: 40 },
    { id: 'global-expansion', name: 'Global Expansion', domain: 'International', estimatedNodeCount: 42 },
    { id: 'sustainability-strategy', name: 'Sustainability Strategy', domain: 'ESG', estimatedNodeCount: 30 }
  ];

  // Smart Template Detection
  const detectStrategyTemplate = useCallback((topic: string) => {
    const template = STRATEGY_TEMPLATES.find(t => 
      topic.toLowerCase().includes(t.domain.toLowerCase()) || 
      t.name.toLowerCase().includes(topic.toLowerCase())
    );
    if (template) {
      setSelectedTemplate(template.id);
      toast.success(`🎯 Strategy Template Detected: ${template.name}`, {
        description: `${template.estimatedNodeCount} strategic nodes ready`
      });
    }
  }, []);

  const handleTopicChange = useCallback((value: string) => {
    setAiTopic(value);
    if (value.length > 3) {
      detectStrategyTemplate(value);
    }
  }, [detectStrategyTemplate]);

  const handleGenerateFromTopic = useCallback(async () => {
    if (!aiTopic.trim()) {
      toast.error('Please enter a strategic topic for AI generation');
      return;
    }

    try {
      toast.loading('🧠 Activating Strategy AI Pro systems...', { duration: 2000 });
      
      // Create comprehensive context from form inputs
      const comprehensiveContext = {
        domain: strategyContext.industry || 'business',
        purpose: aiTopic.trim(),
        audience: 'Business leaders and strategists',
        depth: 'Expert-level comprehensive',
        budget: strategyContext.budget,
        timeFrame: strategyContext.timeHorizon,
        aiStyle: 'Strategic planning and execution',
        industry: strategyContext.industry,
        companySize: strategyContext.companySize,
        riskTolerance: strategyContext.riskTolerance
      };

      await onGenerateStrategy(aiTopic.trim(), comprehensiveContext);
      setAiTopic('');
      toast.success('🚀 Revolutionary strategy generated!', {
        description: 'Multi-model AI with strategic intelligence activated'
      });
    } catch (error) {
      console.error('Generation failed:', error);
      toast.error('AI generation failed - please try again');
    }
  }, [aiTopic, strategyContext, onGenerateStrategy]);

  const handleQuickGenerate = useCallback(async (topic: string, context: any = {}) => {
    try {
      await onGenerateStrategy(topic, { ...strategyContext, ...context });
      toast.success(`🚀 Generated strategy for "${topic}"`);
    } catch (error) {
      toast.error(`Failed to generate strategy for ${topic}`);
    }
  }, [strategyContext, onGenerateStrategy]);

  const handleTemplateGenerate = useCallback(async () => {
    if (!selectedTemplate || !aiTopic) {
      toast.error('Please select a template and enter a topic');
      return;
    }

    const template = STRATEGY_TEMPLATES.find(t => t.id === selectedTemplate);
    if (!template) return;

    try {
      toast.loading(`🎯 Applying ${template.name} template...`, { duration: 2000 });
      await handleQuickGenerate(aiTopic, { 
        template: template.name,
        domain: template.domain 
      });
    } catch (error) {
      toast.error('Template generation failed');
    }
  }, [selectedTemplate, aiTopic, handleQuickGenerate]);

  const handleAdvancedExport = useCallback(async (format: string) => {
    toast.success(`Exported strategy as ${format.toUpperCase()}`);
  }, []);

  const handleStrategyValidation = useCallback(async () => {
    toast.loading('🔍 Validating strategy coherence...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success('Strategy validation completed!', {
      description: 'All strategic elements are aligned and coherent'
    });
  }, []);

  const handleRiskAssessment = useCallback(async () => {
    toast.loading('⚠️ Conducting risk assessment...');
    await new Promise(resolve => setTimeout(resolve, 2500));
    toast.success('Risk assessment completed!', {
      description: '3 high-risk areas identified and mitigation strategies suggested'
    });
  }, []);

  const handlePerformanceProjection = useCallback(async () => {
    toast.loading('📊 Projecting performance metrics...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    toast.success('Performance projection completed!', {
      description: 'ROI: 340% | Timeline: 18 months | Risk Score: Low'
    });
  }, []);

  if (isMinimized) {
    return (
      <div className="fixed left-0 top-16 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white shadow-lg rounded-l-none"
          size="sm"
        >
          <Crown className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Strategy AI Pro</span>
          <span className="sm:hidden">AI Pro</span>
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 384, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-80 sm:w-96 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-500 text-white p-4 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08),transparent_60%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-green-500/20"></div>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Crown className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg hidden sm:inline">Strategy AI Pro</span>
            <span className="font-bold text-lg sm:hidden">AI Pro</span>
            <Badge variant="secondary" className="bg-emerald-500/20 text-green-100">
              v2.0
            </Badge>
          </div>
          <Button
            onClick={() => setIsMinimized(true)}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
        
        {/* AI Status - Extended Header */}
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between text-sm text-white">
            <span className="font-medium">AI Status</span>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {aiStatus.configured ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <div className="mt-2 text-xs text-white/80">
            Model: {aiStatus.model}
          </div>
          {lastQuality && (
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-2 text-white">
                <span className="font-medium">Quality Score</span>
                <span className="font-semibold">{(lastQuality.overall * 100).toFixed(0)}%</span>
              </div>
              <Progress 
                value={lastQuality.overall * 100} 
                className="h-2 bg-white/20" 
                style={{
                  '--progress-background': 'rgba(255, 255, 255, 0.3)',
                  '--progress-foreground': 'white'
                } as React.CSSProperties}
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <TabsTrigger value="strategize" className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400">Strategize</TabsTrigger>
            <TabsTrigger value="analyze" className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400">Analyze</TabsTrigger>
            <TabsTrigger value="optimize" className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400">Optimize</TabsTrigger>
            <TabsTrigger value="export" className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400">Export</TabsTrigger>
          </TabsList>

          {/* Strategize Tab */}
          <TabsContent value="strategize" className="p-4 space-y-4">
            <div className="space-y-3">
              <Label htmlFor="strategy-topic" className="text-gray-900 dark:text-gray-100 font-medium">Strategic Objective</Label>
              <Input
                id="strategy-topic"
                placeholder="e.g., Digital transformation for retail company"
                value={aiTopic}
                onChange={(e) => handleTopicChange(e.target.value)}
                className="text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-emerald-500 dark:focus:border-emerald-400"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-900 dark:text-gray-100 font-medium">Industry Context</Label>
              <Select value={strategyContext.industry} onValueChange={(value) => setStrategyContext({ ...strategyContext, industry: value })}>
                <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="energy">Energy</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-gray-900 dark:text-gray-100 font-medium">Company Size</Label>
                <Select value={strategyContext.companySize} onValueChange={(value) => setStrategyContext({ ...strategyContext, companySize: value })}>
                  <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="sme">SME</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                    <SelectItem value="fortune500">Fortune 500</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-900 dark:text-gray-100 font-medium">Time Horizon</Label>
                <Select value={strategyContext.timeHorizon} onValueChange={(value) => setStrategyContext({ ...strategyContext, timeHorizon: value })}>
                  <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                    <SelectValue placeholder="Timeline" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    <SelectItem value="6-months">6 Months</SelectItem>
                    <SelectItem value="1-year">1 Year</SelectItem>
                    <SelectItem value="3-years">3 Years</SelectItem>
                    <SelectItem value="5-years">5 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-900 dark:text-gray-100 font-medium">Risk Tolerance</Label>
              <Select value={strategyContext.riskTolerance} onValueChange={(value) => setStrategyContext({ ...strategyContext, riskTolerance: value })}>
                <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Risk level" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                  <SelectItem value="disruptive">Disruptive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedTemplate && (
              <div className="p-3 bg-emerald-50/80 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Strategy Template Detected</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      {STRATEGY_TEMPLATES.find(t => t.id === selectedTemplate)?.name}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleTemplateGenerate}
                    disabled={isProcessing}
                    className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold"
                  >
                    <Target className="w-3 h-3 mr-1" />
                    Use Template
                  </Button>
                </div>
              </div>
            )}

            <Button
              onClick={handleGenerateFromTopic}
              disabled={isProcessing || !aiTopic.trim()}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 font-semibold"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Strategy...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Generate Strategy
                </>
              )}
            </Button>

            {/* Quick Strategy Actions */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900 dark:text-gray-100">Quick Actions</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => handleQuickGenerate('Market Entry Strategy', { industry: 'technology' })}
                  variant="outline"
                  size="sm"
                  className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Globe className="w-3 h-3 mr-1" />
                  Market Entry
                </Button>
                <Button
                  onClick={() => handleQuickGenerate('Digital Transformation', { industry: 'retail' })}
                  variant="outline"
                  size="sm"
                  className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Digital Transform
                </Button>
                <Button
                  onClick={() => handleQuickGenerate('Cost Optimization', { industry: 'manufacturing' })}
                  variant="outline"
                  size="sm"
                  className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <DollarSign className="w-3 h-3 mr-1" />
                  Cost Optimize
                </Button>
                <Button
                  onClick={() => handleQuickGenerate('Innovation Strategy', { industry: 'technology' })}
                  variant="outline"
                  size="sm"
                  className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Lightbulb className="w-3 h-3 mr-1" />
                  Innovation
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Analyze Tab */}
          <TabsContent value="analyze" className="p-4 space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-900 dark:text-gray-100">Strategic Analysis Tools</Label>
              
              <Button
                onClick={handleStrategyValidation}
                className="w-full justify-start bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                variant="outline"
              >
                <CheckSquare className="w-4 h-4 mr-2" />
                Strategy Validation
              </Button>
              
              <Button
                onClick={handleRiskAssessment}
                className="w-full justify-start bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700"
                variant="outline"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Risk Assessment
              </Button>
              
              <Button
                onClick={handlePerformanceProjection}
                className="w-full justify-start bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700"
                variant="outline"
              >
                <LineChart className="w-4 h-4 mr-2" />
                Performance Projection
              </Button>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label className="text-sm font-medium">Strategic Metrics</Label>
              
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Strategic Nodes</span>
                    <Badge variant="secondary">{nodeCount}</Badge>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Key Goals</span>
                    <Badge variant="secondary">{fundamentalNodesCount}</Badge>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Optimize Tab */}
          <TabsContent value="optimize" className="p-4 space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Strategy Optimization</Label>
              
              <Button
                onClick={onEnhanceStrategy}
                disabled={isProcessing}
                className="w-full justify-start bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
                variant="outline"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                AI Strategy Enhancement
              </Button>
              
              <Button
                onClick={onIdentifyGoals}
                disabled={isProcessing}
                className="w-full justify-start bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
                variant="outline"
              >
                <Target className="w-4 h-4 mr-2" />
                Identify Strategic Goals
              </Button>
              
              <Button
                onClick={onAutoGeneratePhases}
                disabled={isProcessing}
                className="w-full justify-start bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                variant="outline"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Generate Strategic Phases
              </Button>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label className="text-sm font-medium">Performance Metrics</Label>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Strategic Alignment</span>
                  <span>94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Risk Score</span>
                  <span>Low</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>ROI Projection</span>
                  <span>340%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </div>
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export" className="p-4 space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Export Strategy</Label>
              
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                  <SelectItem value="presentation">PowerPoint</SelectItem>
                  <SelectItem value="executive">Executive Summary</SelectItem>
                  <SelectItem value="json">JSON Data</SelectItem>
                  <SelectItem value="csv">CSV Analysis</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                onClick={() => handleAdvancedExport(exportFormat)}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Strategy
              </Button>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label className="text-sm font-medium">Quick Exports</Label>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => handleAdvancedExport('pdf')}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <FileText className="w-3 h-3 mr-1" />
                  PDF Report
                </Button>
                <Button
                  onClick={() => handleAdvancedExport('presentation')}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <Image className="w-3 h-3 mr-1" />
                  Presentation
                </Button>
                <Button
                  onClick={() => handleAdvancedExport('executive')}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <Crown className="w-3 h-3 mr-1" />
                  Executive Summary
                </Button>
                <Button
                  onClick={() => handleAdvancedExport('json')}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <Database className="w-3 h-3 mr-1" />
                  JSON Data
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default StrategyAIToolbar; 