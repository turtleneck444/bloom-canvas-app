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
  TrendingUp, Cpu, Database, Eye, CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';
import { aiService } from '../../services/aiService';
import SmartTemplateEngine, { SMART_TEMPLATES } from '../../services/smartTemplates';
import AdvancedExportService, { ExportOptions } from '../../services/exportService';

interface AIToolbarProps {
  onGenerateIntelligentNodes: (topic: string, context: any) => Promise<void>;
  onIdentifyFundamentals: () => Promise<void>;
  onAutoGenerateBranches: () => Promise<void>;
  onEnhanceAllNodes: () => Promise<void>;
  nodeCount: number;
  isProcessing: boolean;
  fundamentalNodesCount: number;
}

const AIToolbar: React.FC<AIToolbarProps> = ({
  onGenerateIntelligentNodes,
  onIdentifyFundamentals,
  onAutoGenerateBranches,
  onEnhanceAllNodes,
  nodeCount,
  isProcessing,
  fundamentalNodesCount
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('create');
  const [aiTopic, setAiTopic] = useState('');
  const [selectedModel, setSelectedModel] = useState('auto');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isMinimized, setIsMinimized] = useState(false);
  
  const [aiContext, setAiContext] = useState({
    domain: '',
    purpose: 'Comprehensive knowledge mapping',
    audience: 'Expert practitioners',
    depth: 'Expert-level comprehensive'
  });

  const aiStatus = aiService.getStatus();
  const availableModels = aiService.getAvailableModels();
  const qualityMetrics = aiService.getQualityMetrics();
  const lastQuality = qualityMetrics.length > 0 ? qualityMetrics[qualityMetrics.length - 1] : null;

  // Smart Template Detection
  const detectSmartTemplate = useCallback((topic: string) => {
    const template = SmartTemplateEngine.selectBestTemplate(topic, aiContext);
    if (template) {
      setSelectedTemplate(template.id);
      toast.success(`🎯 Smart Template Detected: ${template.name}`, {
        description: `${template.estimatedNodeCount} expert nodes ready`
      });
    }
  }, [aiContext]);

  const handleTopicChange = useCallback((value: string) => {
    setAiTopic(value);
    if (value.length > 3) {
      detectSmartTemplate(value);
    }
  }, [detectSmartTemplate]);

  const handleGenerateFromTopic = useCallback(async () => {
    if (!aiTopic.trim()) {
      toast.error('Please enter a topic for AI generation');
      return;
    }

    try {
      toast.loading('🧠 Activating advanced AI systems...', { duration: 2000 });
      await onGenerateIntelligentNodes(aiTopic.trim(), aiContext);
      setAiTopic('');
      toast.success('🚀 Revolutionary mind map generated!', {
        description: 'Multi-model AI with automatic branching activated'
      });
    } catch (error) {
      console.error('Generation failed:', error);
      toast.error('AI generation failed - please try again');
    }
  }, [aiTopic, aiContext, onGenerateIntelligentNodes]);

  const handleQuickGenerate = useCallback(async (topic: string, context: any = {}) => {
    try {
      await onGenerateIntelligentNodes(topic, { ...aiContext, ...context });
      toast.success(`🚀 Generated mind map for "${topic}"`);
    } catch (error) {
      toast.error(`Failed to generate mind map for ${topic}`);
    }
  }, [aiContext, onGenerateIntelligentNodes]);

  const handleTemplateGenerate = useCallback(async () => {
    if (!selectedTemplate || !aiTopic) {
      toast.error('Please select a template and enter a topic');
      return;
    }

    const template = SMART_TEMPLATES.find(t => t.id === selectedTemplate);
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
    const canvasElement = document.querySelector('.react-flow') as HTMLElement;
    if (!canvasElement) {
      toast.error('No mind map to export');
      return;
    }

    const exportOptions: ExportOptions = {
      format: format as any,
      quality: 'high',
      includeMetadata: true,
      includeConnections: true,
      theme: 'professional'
    };

    const exportData = {
      title: aiTopic || 'Mind Map',
      nodes: [], // This would be populated from the actual mind map data
      edges: [],
      metadata: {
        created: new Date().toISOString(),
        nodeCount: nodeCount,
        qualityScore: lastQuality?.overall,
        aiModel: aiStatus.model
      }
    };

    try {
      switch (format) {
        case 'pdf':
          const pdfBlob = await AdvancedExportService.exportToPDF(canvasElement, exportOptions, exportData);
          AdvancedExportService.downloadFile(pdfBlob, `mindmap-${Date.now()}.pdf`);
          break;
        case 'png':
          const pngBlob = await AdvancedExportService.exportToPNG(canvasElement, exportOptions, exportData);
          AdvancedExportService.downloadFile(pngBlob, `mindmap-${Date.now()}.png`);
          break;
        case 'markdown':
          const markdown = await AdvancedExportService.exportToMarkdown(exportData, exportOptions);
          AdvancedExportService.downloadText(markdown, `mindmap-${Date.now()}.md`, 'text/markdown');
          break;
        case 'json':
          const json = await AdvancedExportService.exportToJSON(exportData, exportOptions);
          AdvancedExportService.downloadText(json, `mindmap-${Date.now()}.json`, 'application/json');
          break;
        case 'csv':
          const csv = await AdvancedExportService.exportToCSV(exportData, exportOptions);
          AdvancedExportService.downloadText(csv, `mindmap-${Date.now()}.csv`, 'text/csv');
          break;
      }
    } catch (error) {
      toast.error(`Export to ${format.toUpperCase()} failed`);
    }
  }, [aiTopic, nodeCount, lastQuality, aiStatus]);

  if (isMinimized) {
    return (
      <div className="fixed left-0 top-16 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg rounded-l-none"
          size="sm"
        >
          <Crown className="w-4 h-4 mr-2" />
          AI Pro
        </Button>
      </div>
    );
  }

  return (
    <div className={cn(
      "fixed left-0 top-16 bottom-0 w-96 bg-white/98 dark:bg-gray-900/98 backdrop-blur-md border-r border-emerald-200 dark:border-emerald-800 shadow-2xl overflow-hidden z-40",
      !isExpanded && "w-16"
    )}>
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white p-4 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08),transparent_60%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-transparent to-cyan-500/20"></div>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
              <Crown className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg">NOV8 AI Pro</span>
            <Badge variant="secondary" className="bg-teal-500/20 text-cyan-100">
              v2.0
            </Badge>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-white hover:bg-white/20"
            >
              <Layers className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
              className="text-white hover:bg-white/20"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* AI Status Dashboard */}
        <div className="mt-3 space-y-2 relative z-10">
          <div className="flex items-center justify-between text-sm">
            <span>AI Status</span>
            <Badge variant="secondary" className="bg-teal-500/20 text-cyan-100">
              {aiStatus.configured ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          
          {lastQuality && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Quality Score</span>
                <span>{(lastQuality.overall * 100).toFixed(1)}%</span>
              </div>
              <Progress 
                value={lastQuality.overall * 100} 
                className="h-1 bg-white/20"
              />
            </div>
          )}
          
          <div className="flex justify-between text-xs">
            <span>Nodes: {nodeCount}</span>
            <span>Fundamentals: {fundamentalNodesCount}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {isExpanded && (
        <div className="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="create" className="text-xs">
                <Brain className="w-3 h-3 mr-1" />
                Create
              </TabsTrigger>
              <TabsTrigger value="enhance" className="text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                Enhance
              </TabsTrigger>
              <TabsTrigger value="export" className="text-xs">
                <Download className="w-3 h-3 mr-1" />
                Export
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs">
                <BarChart3 className="w-3 h-3 mr-1" />
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* CREATE TAB */}
            <TabsContent value="create" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center">
                    <Rocket className="w-4 h-4 mr-2" />
                    AI Generation Engine
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Advanced multi-model AI with smart templates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="ai-topic" className="text-xs">Topic/Subject</Label>
                    <Input
                      id="ai-topic"
                      value={aiTopic}
                      onChange={(e) => handleTopicChange(e.target.value)}
                      placeholder="e.g., AI Implementation Strategy"
                      className="mt-1 ai-toolbar-topic-input"
                    />
                  </div>

                  <div>
                    <Label className="text-xs">AI Model</Label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">🎯 Auto-Select (Recommended)</SelectItem>
                        {availableModels.map(model => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name} • {model.useCase}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedTemplate && (
                    <div className="p-3 bg-teal-50/80 rounded-lg border border-teal-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-teal-700">Smart Template Detected</p>
                          <p className="text-xs text-teal-600">
                            {SMART_TEMPLATES.find(t => t.id === selectedTemplate)?.name}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={handleTemplateGenerate}
                          disabled={isProcessing}
                          className="bg-teal-600 hover:bg-cyan-600 text-white font-semibold"
                        >
                          <Target className="w-3 h-3 mr-1" />
                          Use Template
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Purpose</Label>
                      <Select 
                        value={aiContext.purpose} 
                        onValueChange={(value) => setAiContext(prev => ({ ...prev, purpose: value }))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Strategic exploration">Strategic</SelectItem>
                          <SelectItem value="Implementation planning">Implementation</SelectItem>
                          <SelectItem value="Learning and education">Learning</SelectItem>
                          <SelectItem value="Problem solving">Problem Solving</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-xs">Depth</Label>
                      <Select 
                        value={aiContext.depth} 
                        onValueChange={(value) => setAiContext(prev => ({ ...prev, depth: value }))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Overview">Overview</SelectItem>
                          <SelectItem value="Comprehensive">Comprehensive</SelectItem>
                          <SelectItem value="Expert-level comprehensive">Expert Level</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={handleGenerateFromTopic}
                    disabled={isProcessing || !aiTopic.trim()}
                    className="w-full bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600 font-semibold"
                  >
                    {isProcessing ? (
                      <>
                        <Cpu className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Generate Mind Map
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Templates */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Quick Templates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {SMART_TEMPLATES.slice(0, 3).map(template => (
                      <Button
                        key={template.id}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setAiTopic(template.name.replace(' Mastery', '').replace(' Blueprint', '').replace(' Engine', '').replace(' Accelerator', ''));
                          setSelectedTemplate(template.id);
                        }}
                        className="justify-start text-xs"
                      >
                        <Crown className="w-3 h-3 mr-2" />
                        {template.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ENHANCE TAB */}
            <TabsContent value="enhance" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Enhancement Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={onIdentifyFundamentals}
                    disabled={isProcessing || nodeCount === 0}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Identify Fundamental Concepts
                  </Button>

                  <Button
                    onClick={onAutoGenerateBranches}
                    disabled={isProcessing || fundamentalNodesCount === 0}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Network className="w-4 h-4 mr-2" />
                    Auto-Generate Branches
                  </Button>

                  <Button
                    onClick={onEnhanceAllNodes}
                    disabled={isProcessing || nodeCount === 0}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Enhance All Nodes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* EXPORT TAB */}
            <TabsContent value="export" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Professional Export
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => handleAdvancedExport('pdf')}
                      disabled={nodeCount === 0}
                      variant="outline"
                      size="sm"
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      PDF
                    </Button>
                    <Button
                      onClick={() => handleAdvancedExport('png')}
                      disabled={nodeCount === 0}
                      variant="outline"
                      size="sm"
                    >
                      <Image className="w-3 h-3 mr-1" />
                      PNG
                    </Button>
                    <Button
                      onClick={() => handleAdvancedExport('markdown')}
                      disabled={nodeCount === 0}
                      variant="outline"
                      size="sm"
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      Markdown
                    </Button>
                    <Button
                      onClick={() => handleAdvancedExport('json')}
                      disabled={nodeCount === 0}
                      variant="outline"
                      size="sm"
                    >
                      <Database className="w-3 h-3 mr-1" />
                      JSON
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ANALYTICS TAB */}
            <TabsContent value="analytics" className="space-y-4">
              {lastQuality ? (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Quality Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {[
                        { label: 'Relevance', value: lastQuality.relevance },
                        { label: 'Depth', value: lastQuality.depth },
                        { label: 'Actionability', value: lastQuality.actionability },
                        { label: 'Innovation', value: lastQuality.innovation }
                      ].map(metric => (
                        <div key={metric.label} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>{metric.label}</span>
                            <span>{(metric.value * 100).toFixed(1)}%</span>
                          </div>
                          <Progress value={metric.value * 100} className="h-1" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-gray-500">Generate a mind map to see analytics</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default AIToolbar; 