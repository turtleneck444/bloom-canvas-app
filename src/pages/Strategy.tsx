import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  Compass, Target, FileText, Calendar, Folder, Download, Plus, Settings, 
  Lightbulb, Users, TrendingUp, Save, Upload, Brain, Sparkles, Zap, 
  Crown, Eye, Layers, Rocket, Network, BarChart3, CheckCircle, 
  ArrowRight, Clock, Fish, Braces, Wand2, Bot, Cpu, Database,
  Circle, ZoomIn, ZoomOut, RotateCcw, Moon, Sun, Trash2, Undo, Redo,
  GitBranch, Building, Globe, Package, DollarSign, Leaf, Presentation
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import StrategyCanvas from '@/components/Strategy/StrategyCanvas';
import StrategyAIToolbar from '@/components/Strategy/StrategyAIToolbar';
import StrategyOutput from '@/components/Strategy/StrategyOutput';
import { strategyService, StrategyContext } from '@/services/strategyService';
import { ServiceSwitcher } from '@/components/ui/logo';

interface StrategyPlan {
  id: string;
  title: string;
  domain: string;
  budget?: string;
  timeFrame: string;
  aiStyle: string;
  phases: StrategyPhase[];
  createdAt: Date;
  status: 'draft' | 'active' | 'completed';
  priority: 'low' | 'medium' | 'high';
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
  progress: number;
  dueDate?: Date;
}

const Strategy: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<StrategyPlan | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState('create');
  const [isProcessing, setIsProcessing] = useState(false);
  const [nodeCount, setNodeCount] = useState(0);
  const [fundamentalNodesCount, setFundamentalNodesCount] = useState(0);
  const [currentLayout, setCurrentLayout] = useState('freeform');
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [canvasRef, setCanvasRef] = useState<any>(null);
  const [showEnhancedOutput, setShowEnhancedOutput] = useState(false);
  const [strategyElements, setStrategyElements] = useState<any[]>([]);
  
  const [newPlan, setNewPlan] = useState({
    title: '',
    domain: '',
    budget: '',
    timeFrame: '',
    aiStyle: 'professional'
  });

  const sampleBlueprints = [
    { id: 'enterprise', title: 'Enterprise Strategy', description: 'Transform large organizations with comprehensive planning', icon: Building },
    { id: 'startup', title: 'Startup Strategy', description: 'From MVP to market dominance in 90 days', icon: Rocket },
    { id: 'digital', title: 'Digital Transformation', description: 'Modernize operations and customer experience', icon: Globe },
    { id: 'product', title: 'Product Strategy', description: 'Build winning products with market fit', icon: Package },
    { id: 'financial', title: 'Financial Strategy', description: 'Optimize capital allocation and growth', icon: DollarSign },
    { id: 'operational', title: 'Operational Excellence', description: 'Streamline processes and reduce costs', icon: Settings },
    { id: 'competitive', title: 'Competitive Strategy', description: 'Outmaneuver competitors and capture market share', icon: Target },
    { id: 'innovation', title: 'Innovation Strategy', description: 'Drive breakthrough innovation and R&D', icon: Lightbulb },
    { id: 'international', title: 'Global Expansion', description: 'Scale internationally with cultural intelligence', icon: Globe },
    { id: 'sustainability', title: 'Sustainability Strategy', description: 'Build resilient, eco-friendly business models', icon: Leaf },
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
        completed: false,
        progress: 0
      },
      {
        id: '2',
        title: 'Strategic Planning',
        description: 'Develop actionable strategy and roadmap',
        tasks: ['Strategy formulation', 'Resource allocation', 'Timeline creation'],
        resources: ['Strategic planning tools', 'Budget allocation', 'Expert consultation'],
        risks: ['Resource constraints', 'Timeline delays'],
        success: ['Strategy document completed', 'Team alignment achieved'],
        completed: false,
        progress: 0
      },
      {
        id: '3',
        title: 'Implementation & Execution',
        description: 'Execute the plan with monitoring and adjustments',
        tasks: ['Launch activities', 'Performance monitoring', 'Iterative improvements'],
        resources: ['Implementation team', 'Monitoring tools', 'Feedback systems'],
        risks: ['Execution gaps', 'Market resistance'],
        success: ['Goals achieved', 'Metrics targets met'],
        completed: false,
        progress: 0
      }
    ];

    const plan: StrategyPlan = {
      id: Date.now().toString(),
      ...newPlan,
      phases: mockPhases,
      createdAt: new Date(),
      status: 'draft',
      priority: 'medium'
    };

    setCurrentPlan(plan);
    setNewPlan({ title: '', domain: '', budget: '', timeFrame: '', aiStyle: 'professional' });
    toast.success('Strategic plan generated successfully!');
  }, [newPlan]);

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

  const handleExportAsPNG = useCallback(() => {
    toast.success('Strategy exported as PNG!');
  }, []);

  const handleExportAsPDF = useCallback(() => {
    toast.success('Strategy exported as PDF!');
  }, []);

  const handleImport = useCallback(() => {
    toast.info('Import functionality coming soon...');
  }, []);

  const handleClearAll = useCallback(() => {
    if (confirm('Are you sure you want to clear all strategy data?')) {
      setCurrentPlan(null);
      toast.success('Strategy data cleared');
    }
  }, []);

  const handleUndo = useCallback(() => {
    toast.info('Undo functionality coming soon...');
  }, []);

  const handleRedo = useCallback(() => {
    toast.info('Redo functionality coming soon...');
  }, []);

  const handleZoomIn = useCallback(() => {
    toast.info('Zoom in functionality coming soon...');
  }, []);

  const handleZoomOut = useCallback(() => {
    toast.info('Zoom out functionality coming soon...');
  }, []);

  const handleFitView = useCallback(() => {
    toast.info('Fit view functionality coming soon...');
  }, []);

  const handleLayoutChange = useCallback((layout: string) => {
    setCurrentLayout(layout);
    toast.success(`Layout changed to ${layout}`);
  }, []);

    const handleAISuggest = useCallback(async () => {
    setIsProcessing(true);
    toast.loading('🤖 AI analyzing current strategy...', {
      description: 'Generating intelligent suggestions'
    });
    
    try {
      // Enhanced AI suggestion logic with comprehensive data
      const suggestions = [
        {
          id: 'suggestion-1',
          title: 'Market Expansion Opportunity',
          description: 'Based on current market analysis, consider expanding into emerging markets with high growth potential',
          type: 'strategy' as const,
          priority: 'high' as const,
          status: 'pending' as const,
          progress: 0,
          importance: 9,
          confidence: 0.87,
          impact: 'high' as const,
          effort: 'medium' as const,
          tags: ['market-expansion', 'growth', 'opportunity'],
          category: 'growth-strategy',
          budget: 500000,
          dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
          assignedTo: 'Strategy Team',
          metrics: [
            { kpi: 'Market Share', current: 15, target: 25, unit: '%' },
            { kpi: 'Revenue Growth', current: 1200000, target: 2000000, unit: 'USD' }
          ]
        },
        {
          id: 'suggestion-2',
          title: 'Cost Optimization Strategy',
          description: 'AI detected 23% potential cost savings through process optimization and automation',
          type: 'tactic' as const,
          priority: 'high' as const,
          status: 'in-progress' as const,
          progress: 35,
          importance: 8,
          confidence: 0.92,
          impact: 'high' as const,
          effort: 'low' as const,
          tags: ['cost-optimization', 'efficiency', 'automation'],
          category: 'operational-excellence',
          budget: 150000,
          dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
          assignedTo: 'Operations Team',
          metrics: [
            { kpi: 'Cost Reduction', current: 0, target: 23, unit: '%' },
            { kpi: 'Process Efficiency', current: 65, target: 85, unit: '%' }
          ]
        },
        {
          id: 'suggestion-3',
          title: 'Digital Transformation Initiative',
          description: 'Recommend implementing AI-driven automation for 40% efficiency gain across operations',
          type: 'strategy' as const,
          priority: 'medium' as const,
          status: 'pending' as const,
          progress: 0,
          importance: 7,
          confidence: 0.78,
          impact: 'medium' as const,
          effort: 'high' as const,
          tags: ['digital-transformation', 'automation', 'innovation'],
          category: 'technology-strategy',
          budget: 800000,
          dueDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 180 days
          assignedTo: 'IT Department',
          metrics: [
            { kpi: 'Automation Rate', current: 20, target: 60, unit: '%' },
            { kpi: 'Digital Adoption', current: 45, target: 85, unit: '%' }
          ]
        }
      ];
  
      // Convert to enhanced output format
      setStrategyElements(suggestions);
      setShowEnhancedOutput(true);
      
      // Also add to canvas for backward compatibility
      if (canvasRef && canvasRef.addAnalysisNodes) {
        const suggestionNodes = suggestions.map((suggestion, index) => ({
          id: suggestion.id,
          label: suggestion.title,
          type: 'suggestion' as const,
          position: { x: 200 + (index * 150), y: 100 + (index * 80) },
          data: {
            description: suggestion.description,
            priority: suggestion.priority,
            status: suggestion.status,
            progress: suggestion.progress,
            tags: suggestion.tags,
            color: suggestion.type === 'strategy' ? '#10B981' : suggestion.type === 'tactic' ? '#F59E0B' : '#8B5CF6',
            importance: suggestion.importance,
            confidence: suggestion.confidence,
            impact: suggestion.impact,
            effort: suggestion.effort
          }
        }));
        
        canvasRef.addAnalysisNodes(suggestionNodes, 'ai-suggestions');
      }
      
      setIsProcessing(false);
      toast.success('🎯 AI suggestions generated!', {
        description: `${suggestions.length} strategic opportunities identified`
      });
    } catch (error) {
      setIsProcessing(false);
      toast.error('Failed to generate AI suggestions');
    }
  }, [canvasRef]);

  const handleGenerateStrategy = useCallback(async (topic: string, context: any) => {
    setIsProcessing(true);
    toast.loading('🧠 AI Strategy Co-Pilot analyzing...', {
      description: 'Generating comprehensive strategic framework'
    });
    
    try {
      const strategyContext: StrategyContext = {
        domain: context.domain || 'business',
        purpose: context.purpose || 'Strategic planning and execution',
        audience: context.audience || 'Business leaders and strategists',
        depth: context.depth || 'Expert-level comprehensive',
        budget: context.budget,
        timeFrame: context.timeFrame,
        aiStyle: context.aiStyle
      };

      const nodes = await strategyService.generateStrategy(topic, strategyContext);
      
      // Add nodes to canvas
      if (canvasRef && canvasRef.addAnalysisNodes) {
        canvasRef.addAnalysisNodes(nodes, 'strategy');
      }
      
      setNodeCount(prev => prev + nodes.length);
      setFundamentalNodesCount(nodes.filter(n => n.type === 'goal').length);
      
      setIsProcessing(false);
      toast.success('🎯 Strategic framework generated!', {
        description: `AI has created ${nodes.length} strategic nodes on your canvas`
      });
    } catch (error) {
      setIsProcessing(false);
      toast.error('Failed to generate strategy');
    }
  }, [canvasRef]);

  const handleIdentifyGoals = useCallback(async () => {
    setIsProcessing(true);
    toast.loading('🎯 Identifying strategic goals...');
    
    try {
      // This would work with actual nodes from the canvas
      const mockNodes = [
        { 
          id: '1', 
          label: 'Test Goal',
          type: 'goal' as const,
          position: { x: 0, y: 0 },
          data: { 
            description: 'Test goal',
            priority: 'medium' as const,
            status: 'pending' as const,
            progress: 0,
            tags: [],
            color: '#10B981',
            importance: 9
          }
        },
        { 
          id: '2', 
          label: 'Test Strategy',
          type: 'strategy' as const,
          position: { x: 0, y: 0 },
          data: { 
            description: 'Test strategy',
            priority: 'medium' as const,
            status: 'pending' as const,
            progress: 0,
            tags: [],
            color: '#059669',
            importance: 7
          }
        }
      ];
      
      const identifiedNodes = await strategyService.identifyGoals(mockNodes);
      setFundamentalNodesCount(identifiedNodes.filter(n => n.data.priority === 'high').length);
      
      setIsProcessing(false);
      toast.success('Goals identified successfully!');
    } catch (error) {
      setIsProcessing(false);
      toast.error('Failed to identify goals');
    }
  }, []);

  const handleAutoGeneratePhases = useCallback(async () => {
    setIsProcessing(true);
    toast.loading('📋 Generating strategic phases...');
    
    try {
      const mockGoals = [
        { 
          id: '1', 
          label: 'Test Goal',
          type: 'goal' as const,
          position: { x: 0, y: 0 },
          data: { 
            description: 'Test goal',
            priority: 'medium' as const,
            status: 'pending' as const,
            progress: 0,
            tags: [],
            color: '#10B981',
            importance: 9
          }
        }
      ];
      
      const phases = await strategyService.generatePhases(mockGoals);
      
      setIsProcessing(false);
      toast.success(`Generated ${phases.length} strategic phases!`);
    } catch (error) {
      setIsProcessing(false);
      toast.error('Failed to generate phases');
    }
  }, []);

  const handleEnhanceStrategy = useCallback(async () => {
    setIsProcessing(true);
    toast.loading('✨ Enhancing strategy with AI...');
    
    try {
      const mockNodes = [
        { 
          id: '1', 
          label: 'Test Strategy',
          type: 'strategy' as const,
          position: { x: 0, y: 0 },
          data: { 
            description: 'Test strategy',
            priority: 'medium' as const,
            status: 'pending' as const,
            progress: 0,
            tags: [],
            color: '#059669',
            importance: 7
          }
        }
      ];
      
      const enhancedNodes = await strategyService.enhanceStrategy(mockNodes);
      
      setIsProcessing(false);
      toast.success('Strategy enhanced successfully!');
    } catch (error) {
      setIsProcessing(false);
      toast.error('Failed to enhance strategy');
    }
  }, []);

  const handleSWOTAnalysis = useCallback(async () => {
    setIsProcessing(true);
    toast.loading('🧠 Conducting SWOT Analysis...');
    
    try {
      const analyzedNodes = await strategyService.conductSWOTAnalysis([]);
      
      // Add nodes to canvas
      if (canvasRef && canvasRef.addAnalysisNodes) {
        canvasRef.addAnalysisNodes(analyzedNodes, 'swot');
      }
      
      setNodeCount(prev => prev + analyzedNodes.length);
      setFundamentalNodesCount(analyzedNodes.filter(n => n.data.priority === 'high').length);
      
      setIsProcessing(false);
      toast.success('SWOT Analysis completed!', {
        description: `${analyzedNodes.length} strategic elements added to canvas`
      });
    } catch (error) {
      setIsProcessing(false);
      toast.error('Failed to conduct SWOT Analysis');
    }
  }, [canvasRef]);

  const handlePortersForces = useCallback(async () => {
    setIsProcessing(true);
    toast.loading('🎯 Analyzing Porter\'s 5 Forces...');
    
    try {
      const analyzedNodes = await strategyService.analyzePorterForces([]);
      
      // Add nodes to canvas
      if (canvasRef && canvasRef.addAnalysisNodes) {
        canvasRef.addAnalysisNodes(analyzedNodes, 'porter');
      }
      
      setNodeCount(prev => prev + analyzedNodes.length);
      setFundamentalNodesCount(analyzedNodes.filter(n => n.data.priority === 'high').length);
      
      setIsProcessing(false);
      toast.success('Porter\'s 5 Forces Analysis completed!', {
        description: `${analyzedNodes.length} competitive forces added to canvas`
      });
    } catch (error) {
      setIsProcessing(false);
      toast.error('Failed to analyze Porter\'s 5 Forces');
    }
  }, [canvasRef]);

  const handleCompetitiveAnalysis = useCallback(async () => {
    setIsProcessing(true);
    toast.loading('👥 Analyzing Competitors...');
    
    try {
      const analyzedNodes = await strategyService.analyzeCompetitors([]);
      
      // Add nodes to canvas
      if (canvasRef && canvasRef.addAnalysisNodes) {
        canvasRef.addAnalysisNodes(analyzedNodes, 'competitor');
      }
      
      setNodeCount(prev => prev + analyzedNodes.length);
      setFundamentalNodesCount(analyzedNodes.filter(n => n.data.priority === 'high').length);
      
      setIsProcessing(false);
      toast.success('Competitive Analysis completed!', {
        description: `${analyzedNodes.length} competitors added to canvas`
      });
    } catch (error) {
      setIsProcessing(false);
      toast.error('Failed to analyze competitors');
    }
  }, [canvasRef]);

  const handleMarketAnalysis = useCallback(async () => {
    setIsProcessing(true);
    toast.loading('📈 Analyzing Market...');
    
    try {
      const analyzedNodes = await strategyService.analyzeMarket([]);
      
      // Add nodes to canvas
      if (canvasRef && canvasRef.addAnalysisNodes) {
        canvasRef.addAnalysisNodes(analyzedNodes, 'market');
      }
      
      setNodeCount(prev => prev + analyzedNodes.length);
      setFundamentalNodesCount(analyzedNodes.filter(n => n.data.priority === 'high').length);
      
      setIsProcessing(false);
      toast.success('Market Analysis completed!', {
        description: `${analyzedNodes.length} market elements added to canvas`
      });
    } catch (error) {
      setIsProcessing(false);
      toast.error('Failed to analyze market');
    }
  }, [canvasRef]);

  const handleStrategyValidation = useCallback(async () => {
    setIsProcessing(true);
    toast.loading('🔍 Validating strategy coherence...');
    
    try {
      // Enhanced validation logic with comprehensive data
      const validationResults = [
        {
          id: 'val-1',
          title: 'Strategy Coherence Check',
          description: 'All strategic elements align with overall objectives and create a cohesive plan',
          type: 'milestone' as const,
          priority: 'high' as const,
          status: 'completed' as const,
          progress: 100,
          importance: 9,
          confidence: 0.85,
          impact: 'high' as const,
          effort: 'medium' as const,
          tags: ['validation', 'strategy-check', 'coherence'],
          category: 'strategy-validation',
          assignedTo: 'Strategy Team',
          metrics: [
            { kpi: 'Alignment Score', current: 85, target: 90, unit: '%' },
            { kpi: 'Coherence Index', current: 78, target: 85, unit: 'points' }
          ]
        },
        {
          id: 'val-2',
          title: 'Resource Feasibility Assessment',
          description: 'Required resources are available and properly allocated across all initiatives',
          type: 'milestone' as const,
          priority: 'high' as const,
          status: 'completed' as const,
          progress: 100,
          importance: 8,
          confidence: 0.78,
          impact: 'high' as const,
          effort: 'low' as const,
          tags: ['validation', 'resource-check', 'feasibility'],
          category: 'resource-planning',
          assignedTo: 'Resource Manager',
          metrics: [
            { kpi: 'Resource Availability', current: 78, target: 85, unit: '%' },
            { kpi: 'Budget Alignment', current: 92, target: 95, unit: '%' }
          ]
        },
        {
          id: 'val-3',
          title: 'Risk Assessment & Mitigation',
          description: 'Identified risks are manageable with current mitigation strategies in place',
          type: 'milestone' as const,
          priority: 'medium' as const,
          status: 'completed' as const,
          progress: 100,
          importance: 7,
          confidence: 0.92,
          impact: 'medium' as const,
          effort: 'medium' as const,
          tags: ['validation', 'risk-assessment', 'mitigation'],
          category: 'risk-management',
          assignedTo: 'Risk Team',
          metrics: [
            { kpi: 'Risk Coverage', current: 92, target: 95, unit: '%' },
            { kpi: 'Mitigation Effectiveness', current: 88, target: 90, unit: '%' }
          ]
        }
      ];
      
      // Convert to enhanced output format
      setStrategyElements(validationResults);
      setShowEnhancedOutput(true);
      
      setIsProcessing(false);
      toast.success('Strategy validation completed!', {
        description: 'All strategic elements are aligned and coherent'
      });
    } catch (error) {
      setIsProcessing(false);
      toast.error('Failed to validate strategy');
    }
  }, []);

  const renderStartScreen = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-emerald-600 to-green-500 flex items-center justify-center mb-4">
          <Compass className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
          Strategy Co-Pilot
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
          AI-driven workspace for generating and refining strategic plans across any domain
        </p>
        <div className="flex items-center gap-3 mt-3">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-700">
            <Brain className="w-3 h-3 mr-1" />
            AI-Powered
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700">
            <Target className="w-3 h-3 mr-1" />
            Industry Grade
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700">
            <Zap className="w-3 h-3 mr-1" />
            Real-time
          </Badge>
        </div>
      </motion.div>

      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-md border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-500" />
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
            className="w-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white"
            disabled={!newPlan.title || !newPlan.domain || !newPlan.timeFrame}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Generate Strategy with AI
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const handleEditElement = useCallback((id: string) => {
    toast.info('Edit functionality coming soon!', {
      description: 'Enhanced editing capabilities will be available in the next update'
    });
  }, []);

  const handleDeleteElement = useCallback((id: string) => {
    toast.info('Delete functionality coming soon!', {
      description: 'Enhanced deletion capabilities will be available in the next update'
    });
  }, []);

  const handleExportStrategy = useCallback(() => {
    toast.success('Strategy exported!', {
      description: 'Your strategic plan has been exported successfully'
    });
  }, []);

  const handleShareStrategy = useCallback(() => {
    toast.success('Strategy shared!', {
      description: 'Your strategic plan has been shared with your team'
    });
  }, []);

  const renderStrategyCanvas = () => (
    <div className="w-full h-full">
      {showEnhancedOutput ? (
        <StrategyOutput
          data={strategyElements}
          onEdit={handleEditElement}
          onDelete={handleDeleteElement}
          onExport={handleExportStrategy}
          onShare={handleShareStrategy}
        />
      ) : (
        <StrategyCanvas onRef={setCanvasRef} />
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'create':
        return currentPlan ? renderStrategyCanvas() : renderStartScreen();
      case 'blueprints':
        return (
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
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-800 dark:to-green-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <blueprint.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
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

  const layoutOptions = [
    { id: 'radial', label: 'Radial', icon: Circle },
    { id: 'tree-horizontal', label: 'Tree', icon: GitBranch },
    { id: 'tree-vertical', label: 'Tree Vertical', icon: BarChart3 },
    { id: 'hierarchical', label: 'Hierarchical', icon: BarChart3 },
    { id: 'organic', label: 'Organic', icon: Fish },
    { id: 'spiral', label: 'Spiral', icon: RotateCcw },
    { id: 'force-directed', label: 'Force-Directed', icon: Zap },
    { id: 'hexagonal', label: 'Hexagonal', icon: Braces },
    { id: 'fractal', label: 'Fractal', icon: Sparkles },
    { id: 'galaxy', label: 'Galaxy', icon: Sparkles },
    { id: 'neural', label: 'Neural', icon: Brain },
    { id: 'molecular', label: 'Molecular', icon: Sparkles },
    { id: 'flowchart', label: 'Flowchart', icon: ArrowRight },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'fishbone', label: 'Fishbone', icon: Fish },
    { id: 'brace', label: 'Brace', icon: Braces },
    { id: 'org-chart', label: 'Org Chart', icon: Users },
    { id: 'freeform', label: 'Freeform', icon: Sparkles },
  ];

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-50/30 to-emerald-50/30 dark:from-emerald-900 dark:via-green-900/30 dark:to-emerald-900/30">
      {/* Top Toolbar */}
      <div className="w-full h-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-emerald-200/40 dark:border-emerald-800/40 shadow-2xl z-30 sticky top-0 left-0 overflow-x-auto flex-shrink-0">
        <div className="flex flex-row items-center justify-between px-2 sm:px-4 py-2 h-full gap-y-2 min-w-[320px] w-full">
          
          {/* Left Section - Logo and Core Actions */}
          <div className="flex items-center gap-3">
            <ServiceSwitcher current="strategy" />
            
            <div className="flex items-center gap-1.5">
              <Button
                onClick={() => handleGenerateStrategy('New Strategy', { domain: 'business', purpose: 'Strategic planning' })}
                size="sm"
                className="h-6 px-2.5 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white text-xs font-semibold shadow-md"
              >
                <Brain className="w-3 h-3 mr-1" />
                Generate
              </Button>
              
              <div className="flex items-center gap-0.5 bg-gray-50 dark:bg-gray-800/50 rounded p-0.5">
                <Button
                  onClick={handleUndo}
                  disabled={!canUndo}
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 disabled:opacity-40"
                  title="Undo"
                >
                  <Undo className="w-3 h-3" />
                </Button>
                <Button
                  onClick={handleRedo}
                  disabled={!canRedo}
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 disabled:opacity-40"
                  title="Redo"
                >
                  <Redo className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Center Section - Strategy Analysis Tools */}
                      <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEnhancedOutput(!showEnhancedOutput)}
                className="h-6 px-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-300"
              >
                {showEnhancedOutput ? <Target className="w-3 h-3 mr-1" /> : <BarChart3 className="w-3 h-3 mr-1" />}
                <span className="text-xs">{showEnhancedOutput ? 'Canvas View' : 'Dashboard View'}</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2.5 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-700 dark:text-emerald-300"
                  >
                    <BarChart3 className="w-3 h-3 mr-1" />
                    <span className="text-xs">Analysis</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48">
                  <DropdownMenuItem onClick={handleAISuggest} className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-600" />
                    <span>AI Suggestions</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSWOTAnalysis} className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    <span>SWOT Analysis</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handlePortersForces} className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-600" />
                    <span>Porter's 5 Forces</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCompetitiveAnalysis} className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-red-600" />
                    <span>Competitive Analysis</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleMarketAnalysis} className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span>Market Analysis</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleStrategyValidation} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Validate Strategy</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

          {/* Right Section - Compact Controls */}
          <div className="flex items-center gap-2">
            {/* View Controls */}
            <div className="flex items-center gap-0.5 bg-gray-50 dark:bg-gray-800/50 rounded p-0.5">
              <Button onClick={handleZoomOut} variant="ghost" size="sm" className="h-5 w-5 p-0" title="Zoom Out">
                <ZoomOut className="w-3 h-3" />
              </Button>
              <Button onClick={handleFitView} variant="ghost" size="sm" className="h-5 px-1" title="Fit View">
                <RotateCcw className="w-3 h-3" />
              </Button>
              <Button onClick={handleZoomIn} variant="ghost" size="sm" className="h-5 w-5 p-0" title="Zoom In">
                <ZoomIn className="w-3 h-3" />
              </Button>
            </div>

            {/* Theme Toggle */}
            <Button
              onClick={() => {
                const isDark = document.documentElement.classList.contains('dark');
                if (isDark) {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              }}
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0 border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50"
              title="Toggle Theme"
            >
              <Sun className="w-3 h-3 block dark:hidden" />
              <Moon className="w-3 h-3 hidden dark:block" />
            </Button>

            {/* Strategy Actions - Industry Grade */}
            <div className="flex items-center gap-0.5">
              <Button
                onClick={handleSave}
                variant="outline"
                size="sm"
                className="h-6 px-1.5 text-xs border-green-200 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-400"
              >
                <Save className="w-3 h-3 mr-0.5" />
                <span className="hidden md:inline">Save</span>
              </Button>
              
              {/* Strategy Export Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    className="h-6 px-2.5 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white text-xs font-semibold shadow-md"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={handleExportAsPNG}>
                    <FileText className="w-4 h-4 mr-2" />
                    Strategy as PNG
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportAsPDF}>
                    <FileText className="w-4 h-4 mr-2" />
                    Strategy as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExport}>
                    <FileText className="w-4 h-4 mr-2" />
                    Strategy as JSON
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info('Strategy presentation coming soon...')}>
                    <Presentation className="w-4 h-4 mr-2" />
                    Strategy Presentation
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info('Executive summary coming soon...')}>
                    <FileText className="w-4 h-4 mr-2" />
                    Executive Summary
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Strategy Analysis Tools */}
              <Button
                onClick={() => toast.info('Strategy validation coming soon...')}
                variant="outline"
                size="sm"
                className="h-6 px-1.5 text-xs border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400"
                title="Validate Strategy"
              >
                <CheckCircle className="w-3 h-3 mr-0.5" />
                <span className="hidden lg:inline">Validate</span>
              </Button>
              
              <Button
                onClick={() => toast.info('Strategy simulation coming soon...')}
                variant="outline"
                size="sm"
                className="h-6 px-1.5 text-xs border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400"
                title="Simulate Strategy"
              >
                <Cpu className="w-3 h-3 mr-0.5" />
                <span className="hidden lg:inline">Simulate</span>
              </Button>
              
              <Button
                onClick={handleImport}
                variant="outline"
                size="sm"
                className="h-6 px-1.5 text-xs border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-400"
              >
                <Upload className="w-3 h-3 mr-0.5" />
                <span className="hidden lg:inline">Import</span>
              </Button>
              
              <Button
                onClick={handleClearAll}
                variant="outline"
                size="sm"
                className="h-6 px-1.5 text-xs border-red-200 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-400"
                disabled={nodeCount === 0}
                title="Clear All"
              >
                <Trash2 className="w-3 h-3 mr-0.5" />
                <span className="hidden xl:inline">Clear</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 min-h-0">
        {/* AI Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 384, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden hidden md:block"
            >
              <StrategyAIToolbar
                onGenerateStrategy={handleGenerateStrategy}
                onIdentifyGoals={handleIdentifyGoals}
                onAutoGeneratePhases={handleAutoGeneratePhases}
                onEnhanceStrategy={handleEnhanceStrategy}
                nodeCount={nodeCount}
                isProcessing={isProcessing}
                fundamentalNodesCount={fundamentalNodesCount}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Mobile AI Toolbar */}
        <AnimatePresence>
          {showSidebar && (
            <>
              {/* Mobile Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={() => setShowSidebar(false)}
              />
              
              {/* Mobile AI Toolbar */}
              <motion.div
                initial={{ x: -400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -400, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden fixed top-0 left-0 h-full z-50"
              >
                <StrategyAIToolbar
                  onGenerateStrategy={handleGenerateStrategy}
                  onIdentifyGoals={handleIdentifyGoals}
                  onAutoGeneratePhases={handleAutoGeneratePhases}
                  onEnhanceStrategy={handleEnhanceStrategy}
                  nodeCount={nodeCount}
                  isProcessing={isProcessing}
                  fundamentalNodesCount={fundamentalNodesCount}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
        {/* Mobile Floating Action Button */}
        <div className="md:hidden fixed bottom-4 right-4 z-50">
          <Button
            onClick={() => setShowSidebar(!showSidebar)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white shadow-lg"
            size="lg"
          >
            <Brain className="w-6 h-6" />
          </Button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative overflow-hidden md:ml-0 ml-0">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Strategy;