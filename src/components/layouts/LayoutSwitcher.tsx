import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  GitBranch, 
  BarChart3, 
  Clock, 
  Fish, 
  Braces, 
  Users, 
  Sparkles,
  Lightbulb,
  Zap,
  ArrowRight,
  Play,
  Download,
  Settings,
  RotateCcw,
  Brain
} from 'lucide-react';
import { Button } from '../ui/button';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { LayoutType, LayoutSuggestion, SampleData } from '../../utils/graphEngine/types';
import { layoutEngine } from '../../utils/graphEngine/layoutEngine';
import { getSampleData, getAllSampleData } from '../../utils/graphEngine/sampleData';
import { Node, Edge } from '@xyflow/react';

interface LayoutSwitcherProps {
  currentLayout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
  onLoadSampleData: (sampleData: SampleData) => void;
  nodes: Node<any>[];
  edges: Edge[];
  className?: string;
}

const layoutConfigs = [
  {
    id: 'radial' as LayoutType,
    name: 'Radial Layout',
    description: 'Central node with branches radiating outward',
    icon: LayoutGrid,
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    category: 'Mind Map'
  },
  {
    id: 'tree-horizontal' as LayoutType,
    name: 'Tree (Horizontal)',
    description: 'Top-down hierarchy with horizontal branches',
    icon: GitBranch,
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    category: 'Hierarchy'
  },
  {
    id: 'tree-vertical' as LayoutType,
    name: 'Tree (Vertical)',
    description: 'Left-right hierarchy with vertical branches',
    icon: BarChart3,
    color: 'bg-gradient-to-br from-green-500 to-emerald-500',
    category: 'Hierarchy'
  },
  {
    id: 'flowchart' as LayoutType,
    name: 'Flowchart',
    description: 'Process flow with directional arrows',
    icon: ArrowRight,
    color: 'bg-gradient-to-br from-orange-500 to-red-500',
    category: 'Process'
  },
  {
    id: 'organic' as LayoutType,
    name: 'Organic',
    description: 'Natural, flowing layout with organic positioning',
    icon: Fish,
    color: 'bg-gradient-to-br from-green-500 to-teal-500',
    category: 'Natural'
  }
];

const LayoutSwitcher: React.FC<LayoutSwitcherProps> = ({
  currentLayout,
  onLayoutChange,
  onLoadSampleData,
  nodes,
  edges,
  className
}) => {
  const [suggestions, setSuggestions] = useState<LayoutSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sampleDataList, setSampleDataList] = useState<SampleData[]>([]);

  // Generate layout suggestions based on current data
  useEffect(() => {
    if (nodes.length > 0) {
      const newSuggestions = layoutEngine.suggestLayout(nodes, edges);
      setSuggestions(newSuggestions);
    }
  }, [nodes, edges]);

  // Load sample data
  useEffect(() => {
    setSampleDataList(getAllSampleData());
  }, []);

  const handleLayoutChange = (layout: LayoutType) => {
    onLayoutChange(layout);
    setShowSuggestions(false);
  };

  const handleLoadSample = (sampleData: SampleData) => {
    onLoadSampleData(sampleData);
    onLayoutChange(sampleData.suggestedLayout);
  };

  const currentLayoutConfig = layoutConfigs.find(config => config.id === currentLayout);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Current Layout Display */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${currentLayoutConfig?.color}`}>
                {currentLayoutConfig?.icon && <currentLayoutConfig.icon className="w-5 h-5" />}
              </div>
              <div>
                <CardTitle className="text-lg">{currentLayoutConfig?.name}</CardTitle>
                <CardDescription>{currentLayoutConfig?.description}</CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {currentLayoutConfig?.category}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Smart Suggestions */}
      {suggestions.length > 0 && (
        <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              <CardTitle className="text-lg text-yellow-800">Smart Suggestions</CardTitle>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                AI-Powered
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {suggestions.slice(0, 3).map((suggestion, index) => {
                const layoutConfig = layoutConfigs.find(config => config.id === suggestion.layout);
                return (
                  <motion.div
                    key={suggestion.layout}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white/80 rounded-lg border border-yellow-200 hover:border-yellow-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${layoutConfig?.color}`}>
                        {layoutConfig?.icon && <layoutConfig.icon className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{layoutConfig?.name}</div>
                        <div className="text-sm text-gray-600">{suggestion.reason}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {Math.round(suggestion.confidence * 100)}% match
                      </Badge>
                      <Button
                        size="sm"
                        onClick={() => handleLayoutChange(suggestion.layout)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Switch
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Layout Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5" />
            Choose Layout
          </CardTitle>
          <CardDescription>
            Select the best layout for your data structure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {layoutConfigs.map((config) => (
              <motion.div
                key={config.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={currentLayout === config.id ? "default" : "outline"}
                  className={`w-full h-auto p-4 flex flex-col items-center gap-2 ${
                    currentLayout === config.id 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleLayoutChange(config.id)}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${config.color}`}>
                    <config.icon className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{config.name}</div>
                    <div className="text-xs opacity-80">{config.description}</div>
                  </div>
                  {currentLayout === config.id && (
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      Active
                    </Badge>
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sample Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="w-5 h-5" />
            Sample Templates
          </CardTitle>
          <CardDescription>
            Load pre-built examples to get started quickly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sampleDataList.slice(0, 6).map((sample) => (
              <motion.div
                key={sample.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 flex flex-col items-start gap-2 text-left"
                  onClick={() => handleLoadSample(sample)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="flex-1">
                      <div className="font-medium">{sample.name}</div>
                      <div className="text-xs text-gray-600">{sample.description}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {sample.nodes.length} nodes
                    </Badge>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const suggestions = layoutEngine.suggestLayout(nodes, edges);
                      if (suggestions.length > 0) {
                        handleLayoutChange(suggestions[0].layout);
                      }
                    }}
                    disabled={suggestions.length === 0}
                  >
                    <Lightbulb className="w-4 h-4 mr-1" />
                    Auto-Suggest
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Let AI suggest the best layout for your data</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLayoutChange('freeform')}
                  >
                    <Sparkles className="w-4 h-4 mr-1" />
                    Freeform
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Switch to freeform layout for creative work</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const radialSample = getSampleData('radial');
                      handleLoadSample(radialSample);
                    }}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Load Radial
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Load a classic radial mind map template</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LayoutSwitcher; 