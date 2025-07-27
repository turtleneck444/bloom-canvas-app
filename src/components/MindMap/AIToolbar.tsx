import React, { useState, useCallback } from 'react';
import { Brain, Sparkles, Target, Zap, Settings, Lightbulb, Cpu, Network, ChevronRight, ChevronLeft, X, Star, Layers, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { aiService } from '@/services/aiService';
import { toast } from 'sonner';

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
  const [isMinimized, setIsMinimized] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [selectedModel, setSelectedModel] = useState('mixtral');
  const [aiContext, setAiContext] = useState({
    domain: '',
    purpose: 'Strategic exploration',
    audience: 'Professional',
    depth: 'Comprehensive'
  });

  const aiStatus = aiService.getStatus();

  const handleGenerateFromTopic = useCallback(async () => {
    if (!aiTopic.trim()) {
      toast.error('Please enter a topic for AI generation');
      return;
    }

    try {
      await onGenerateIntelligentNodes(aiTopic.trim(), aiContext);
      setAiTopic('');
      toast.success('🧠 Mind map generated successfully!');
    } catch (error) {
      console.error('Generation failed:', error);
      if (error instanceof Error && error.message.includes('INSUFFICIENT_CREDITS')) {
        toast.info('💡 AI credits low - using intelligent fallback system');
      } else {
        toast.error('Using smart fallback generation');
      }
    }
  }, [aiTopic, aiContext, onGenerateIntelligentNodes]);

  const handleQuickGenerate = useCallback(async (topic: string, context: any = {}) => {
    try {
      await onGenerateIntelligentNodes(topic, { ...aiContext, ...context });
      toast.success(`🚀 Generated mind map for "${topic}"`);
    } catch (error) {
      if (error instanceof Error && error.message.includes('INSUFFICIENT_CREDITS')) {
        toast.info('💡 Using intelligent fallback for generation');
      } else {
        toast.error(`Using smart fallback for ${topic}`);
      }
    }
  }, [aiContext, onGenerateIntelligentNodes]);

  const handleModelChange = useCallback((model: string) => {
    setSelectedModel(model);
    aiService.setModel(model as any);
    toast.success(`Switched to ${model.toUpperCase()} model`);
  }, []);

  if (!aiStatus.configured) {
    return (
      <div className="fixed left-0 top-0 bottom-0 w-96 z-50">
        <Card className="h-full border-orange-300 bg-gradient-to-br from-orange-50/98 via-yellow-50/95 to-orange-100/98 dark:from-orange-900/95 dark:via-yellow-900/90 dark:to-orange-800/95 backdrop-blur-xl shadow-2xl border-2 border-r-2 border-l-0">
          <CardContent className="p-6 h-full flex flex-col justify-center">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 text-orange-700 dark:text-orange-300">
                <div className="p-3 bg-orange-200 dark:bg-orange-800 rounded-xl">
                  <Settings className="w-6 h-6" />
                </div>
                <span className="font-bold text-lg">AI Features Limited</span>
              </div>
              <p className="text-sm text-orange-600 dark:text-orange-400 leading-relaxed">
                Using intelligent fallback system for mind map generation.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed left-0 top-0 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="h-16 w-16 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-800 shadow-2xl border-2 border-white/30 backdrop-blur-sm rounded-br-2xl transition-all duration-500 hover:scale-110"
          size="sm"
        >
          <Brain className="w-7 h-7 text-white drop-shadow-lg" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-0 bottom-0 w-96 z-50">
      <Card className="h-full bg-gradient-to-br from-white/98 via-purple-50/95 to-blue-50/98 dark:from-gray-900/98 dark:via-purple-900/95 dark:to-blue-900/98 backdrop-blur-xl border-2 border-purple-200/50 dark:border-purple-700/50 shadow-2xl overflow-hidden border-l-0 rounded-l-none">
        <CardContent className="p-0 h-full flex flex-col">
          {/* Enhanced Header */}
          <div className="relative p-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-blue-600/90 to-indigo-600/90"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
                  <Brain className="w-6 h-6 drop-shadow-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-xl drop-shadow-lg">AI Assistant</h3>
                  <p className="text-xs text-white/90 font-medium">Enhanced with Mixtral</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-lg transition-all duration-300"
                >
                  {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(true)}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-lg transition-all duration-300"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
            
            {/* Enhanced Stats */}
            <div className="relative z-10 flex items-center gap-3 mt-4">
              <Badge className="text-xs px-3 py-1.5 bg-white/25 text-white border-white/40 backdrop-blur-sm font-medium">
                <Cpu className="w-3 h-3 mr-1" />
                {aiStatus.provider.toUpperCase()}
              </Badge>
              {fundamentalNodesCount > 0 && (
                <Badge className="text-xs px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 border-yellow-300 font-medium">
                  <Target className="w-3 h-3 mr-1" />
                  {fundamentalNodesCount} Core
                </Badge>
              )}
              <Badge className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 text-blue-900 border-blue-300 font-medium">
                <Network className="w-3 h-3 mr-1" />
                {nodeCount} Nodes
              </Badge>
            </div>
          </div>

          {/* Enhanced Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Model Selection */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Star className="w-4 h-4 text-purple-600" />
                AI Model
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(aiService.getAvailableModels()).map(([key, value]) => (
                  <Button
                    key={key}
                    onClick={() => handleModelChange(key)}
                    variant={selectedModel === key ? "default" : "outline"}
                    size="sm"
                    className={`h-8 text-xs transition-all duration-300 ${
                      selectedModel === key 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105' 
                        : 'hover:bg-purple-50 dark:hover:bg-purple-900/30'
                    }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Enhanced Quick Actions */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-purple-600" />
                Quick Actions
              </h4>
              
              <div className="space-y-3">
                <Button
                  onClick={onIdentifyFundamentals}
                  disabled={isProcessing || nodeCount < 2}
                  className="w-full justify-start h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102"
                  size="sm"
                >
                  <Target className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="text-sm font-medium">Find Core Concepts</div>
                    <div className="text-xs opacity-90">Identify fundamental nodes</div>
                  </div>
                </Button>
                
                <Button
                  onClick={onAutoGenerateBranches}
                  disabled={isProcessing || fundamentalNodesCount === 0}
                  className="w-full justify-start h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102"
                  size="sm"
                >
                  <Sparkles className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="text-sm font-medium">Auto Generate Branches</div>
                    <div className="text-xs opacity-90">Expand from core concepts</div>
                  </div>
                </Button>
                
                <Button
                  onClick={onEnhanceAllNodes}
                  disabled={isProcessing || nodeCount === 0}
                  variant="secondary"
                  className="w-full justify-start h-12 bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 text-indigo-700 border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102"
                  size="sm"
                >
                  <Lightbulb className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="text-sm font-medium">Enhance All Nodes</div>
                    <div className="text-xs opacity-80">Add AI descriptions & tags</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Enhanced Status Indicator */}
            {isProcessing && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-2 border-blue-200 dark:border-blue-700 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    <div className="absolute inset-0 animate-ping w-5 h-5 border border-blue-400 rounded-full opacity-20"></div>
                  </div>
                  <div>
                    <span className="text-sm text-blue-700 dark:text-blue-300 font-semibold">AI Processing...</span>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Using {aiStatus.provider.toUpperCase()} to create intelligent nodes
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Topic Generation */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-600" />
                Generate Mind Map
              </h4>
              
              <div className="space-y-3">
                <div className="relative">
                  <textarea
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    placeholder="Describe what you want to explore in detail..."
                    className="w-full px-4 py-3 text-sm border-2 border-purple-200 dark:border-purple-600 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none placeholder:text-gray-500"
                    rows={4}
                    disabled={isProcessing}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {aiTopic.length}/200
                  </div>
                </div>
                <Button
                  onClick={handleGenerateFromTopic}
                  disabled={isProcessing || !aiTopic.trim()}
                  className="w-full h-12 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 shadow-xl disabled:opacity-50 transition-all duration-300 hover:scale-105"
                >
                  <Zap className="w-5 h-5 mr-3" />
                  <span className="text-sm font-semibold">Generate Intelligent Mind Map</span>
                </Button>
              </div>
            </div>

            {/* Enhanced Quick Start Topics */}
            {isExpanded && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">Quick Start Templates</h4>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { topic: 'AI & Machine Learning Strategy', context: { domain: 'Technology' }, color: 'from-blue-500 to-cyan-500' },
                    { topic: 'Business Growth Strategy', context: { domain: 'Business' }, color: 'from-green-500 to-emerald-500' },
                    { topic: 'Personal Development Plan', context: { domain: 'Personal Growth' }, color: 'from-orange-500 to-red-500' },
                    { topic: 'Digital Marketing Campaign', context: { domain: 'Marketing' }, color: 'from-pink-500 to-purple-500' },
                    { topic: 'Project Management Framework', context: { domain: 'Management' }, color: 'from-indigo-500 to-blue-500' }
                  ].map(({ topic, context, color }) => (
                    <Button
                      key={topic}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickGenerate(topic, context)}
                      disabled={isProcessing}
                      className={`w-full justify-start h-10 text-xs bg-gradient-to-r ${color} text-white border-0 hover:shadow-lg transition-all duration-300 hover:scale-102`}
                    >
                      <div className="w-2 h-2 rounded-full bg-white/80 mr-2"></div>
                      {topic}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Settings */}
            {isExpanded && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">Advanced Settings</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-2">Domain Focus</label>
                    <select
                      value={aiContext.domain}
                      onChange={(e) => setAiContext({ ...aiContext, domain: e.target.value })}
                      className="w-full px-3 py-2 text-xs border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    >
                      <option value="">General</option>
                      <option value="Technology">Technology</option>
                      <option value="Business">Business</option>
                      <option value="Education">Education</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Design">Design</option>
                      <option value="Science">Science</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-2">Purpose</label>
                    <select
                      value={aiContext.purpose}
                      onChange={(e) => setAiContext({ ...aiContext, purpose: e.target.value })}
                      className="w-full px-3 py-2 text-xs border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    >
                      <option value="Strategic exploration">Strategic Exploration</option>
                      <option value="Learning and education">Learning & Education</option>
                      <option value="Project planning">Project Planning</option>
                      <option value="Problem solving">Problem Solving</option>
                      <option value="Creative brainstorming">Creative Brainstorming</option>
                      <option value="Business analysis">Business Analysis</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-2">Depth Level</label>
                    <select
                      value={aiContext.depth}
                      onChange={(e) => setAiContext({ ...aiContext, depth: e.target.value })}
                      className="w-full px-3 py-2 text-xs border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    >
                      <option value="Overview">Overview</option>
                      <option value="Comprehensive">Comprehensive</option>
                      <option value="Deep dive">Deep Dive</option>
                      <option value="Expert level">Expert Level</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIToolbar; 