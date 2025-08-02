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
import { Slider } from '../ui/slider';
import { 
  PenTool, Type, Square, Circle, Triangle, Image, FileText, Video, Link,
  StickyNote, Users, Share2, Download, Upload, Settings, Eye, Edit3, Plus,
  Minus, Maximize2, Minimize2, Layers, Network, Activity, Brain, Sparkles,
  Target, Compass, ChartBar, LineChart, ScatterChart, Palette, Eraser, Undo,
  Redo, Save, Trash2, Copy, Lock, Unlock, Grid, Move, RotateCw, ZoomIn,
  ZoomOut, Fullscreen, Brush, Droplets, Star, Heart, Zap,
  Scissors, RotateCcw, FlipHorizontal, FlipVertical, EyeOff,
  Filter, Image as ImageIcon, Palette as PaletteIcon, Type as TypeIcon,
  Square as SquareIcon, Circle as CircleIcon, Triangle as TriangleIcon,
  Hexagon, Octagon, Diamond, ArrowRight, ArrowLeft, ArrowUp, ArrowDown,
  Minus as MinusIcon, Plus as PlusIcon, X, Check, AlertCircle, Info,
  Sun, Moon, LayoutGrid, Save as SaveIcon, FolderOpen, FolderPlus
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import { whiteboardService, DrawingPath, WhiteboardElement } from '../../services/whiteboardService';

interface WhiteboardAIToolbarProps {
  onAICleanup: () => void;
  onGenerateMindMap: () => void;
  onSuggestLayout: () => void;
  onExportWhiteboard: () => void;
  onSaveWhiteboard: () => void;
  onLoadWhiteboard: () => void;
  onNewWhiteboard: () => void;
  elementCount: number;
  isProcessing: boolean;
  activeCollaborators: number;
  whiteboardName: string;
  onWhiteboardNameChange: (name: string) => void;
}

const WhiteboardAIToolbar: React.FC<WhiteboardAIToolbarProps> = ({
  onAICleanup,
  onGenerateMindMap,
  onSuggestLayout,
  onExportWhiteboard,
  onSaveWhiteboard,
  onLoadWhiteboard,
  onNewWhiteboard,
  elementCount,
  isProcessing,
  activeCollaborators,
  whiteboardName,
  onWhiteboardNameChange
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('create');
  const [selectedTool, setSelectedTool] = useState('brush');
  const [selectedTemplate, setSelectedTemplate] = useState('brainstorming');
  const [exportFormat, setExportFormat] = useState('json');
  const [isMinimized, setIsMinimized] = useState(false);
  const [whiteboardContext, setWhiteboardContext] = useState('');

  const aiStatus = {
    status: 'Configured',
    confidence: 0.95,
    lastUpdated: '2 minutes ago'
  };

  const availableTools = [
    { id: 'brush', name: 'Brush', icon: Brush, description: 'Freehand drawing' },
    { id: 'pencil', name: 'Pencil', icon: PenTool, description: 'Precise lines' },
    { id: 'spray', name: 'Spray', icon: Droplets, description: 'Airbrush effect' },
    { id: 'eraser', name: 'Eraser', icon: Eraser, description: 'Remove content' },
    { id: 'text', name: 'Text', icon: Type, description: 'Add text' },
    { id: 'shape', name: 'Shape', icon: Square, description: 'Geometric shapes' }
  ];

  const qualityMetrics = {
    drawingQuality: 0.92,
    elementCount: elementCount,
    collaborationScore: 0.88,
    aiEnhancement: 0.95
  };

  const WHITEBOARD_TEMPLATES = [
    {
      id: 'brainstorming',
      name: 'Brainstorming',
      description: 'Idea generation and mind mapping',
      icon: Brain,
      color: 'bg-blue-500'
    },
    {
      id: 'product-design',
      name: 'Product Design',
      description: 'User journey and architecture',
      icon: Target,
      color: 'bg-green-500'
    },
    {
      id: 'customer-journey',
      name: 'Customer Journey',
      description: 'Customer experience mapping',
      icon: Compass,
      color: 'bg-purple-500'
    },
    {
      id: 'project-planning',
      name: 'Project Planning',
      description: 'Timeline and milestones',
      icon: ChartBar,
      color: 'bg-orange-500'
    }
  ];

  const detectWhiteboardTemplate = useCallback((context: string) => {
    const contextLower = context.toLowerCase();
    
    if (contextLower.includes('brainstorm') || contextLower.includes('idea')) {
      return 'brainstorming';
    } else if (contextLower.includes('design') || contextLower.includes('product')) {
      return 'product-design';
    } else if (contextLower.includes('customer') || contextLower.includes('journey')) {
      return 'customer-journey';
    } else if (contextLower.includes('project') || contextLower.includes('plan')) {
      return 'project-planning';
    }
    
    return 'brainstorming';
  }, []);

  const handleToolChange = useCallback((tool: string) => {
    setSelectedTool(tool);
    toast.success(`Selected ${tool} tool`);
  }, []);

  const handleAICleanup = useCallback(async () => {
    try {
      // Simulate drawing paths for cleanup
      const mockPaths: DrawingPath[] = [
        {
          id: 'path-1',
          tool: 'brush',
          color: '#3B82F6',
          brushSize: 10,
          opacity: 100,
          points: [
            { x: 100, y: 100, timestamp: Date.now() },
            { x: 150, y: 120, timestamp: Date.now() },
            { x: 200, y: 110, timestamp: Date.now() }
          ],
          isComplete: true
        }
      ];
      
      const cleanedPaths = await whiteboardService.cleanupDrawings(mockPaths);
      console.log('Cleaned paths:', cleanedPaths);
      onAICleanup();
    } catch (error) {
      console.error('AI cleanup failed:', error);
      toast.error('AI cleanup failed');
    }
  }, [onAICleanup]);

  const handleGenerateMindMap = useCallback(async () => {
    try {
      // Simulate drawing paths for mind map generation
      const mockPaths: DrawingPath[] = [
        {
          id: 'path-1',
          tool: 'brush',
          color: '#3B82F6',
          brushSize: 10,
          opacity: 100,
          points: Array.from({ length: 20 }, (_, i) => ({
            x: 100 + i * 10,
            y: 100 + Math.sin(i * 0.5) * 20,
            timestamp: Date.now()
          })),
          isComplete: true
        }
      ];
      
      const mindMapElements = await whiteboardService.generateMindMap(mockPaths);
      console.log('Generated mind map elements:', mindMapElements);
      onGenerateMindMap();
    } catch (error) {
      console.error('Mind map generation failed:', error);
      toast.error('Mind map generation failed');
    }
  }, [onGenerateMindMap]);

  const handleSuggestLayout = useCallback(async () => {
    try {
      // Simulate elements for layout suggestion
      const mockElements: WhiteboardElement[] = [
        {
          id: 'element-1',
          type: 'shape',
          x: 100,
          y: 100,
          width: 100,
          height: 100,
          style: {
            color: '#3B82F6',
            backgroundColor: '#DBEAFE',
            fontSize: 16,
            fontWeight: 'normal',
            borderWidth: 2,
            borderColor: '#3B82F6',
            borderRadius: 8,
            opacity: 1,
            brushSize: 10,
            brushType: 'round'
          },
          locked: false,
          selected: false,
          createdBy: 'User',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      const reorganizedElements = await whiteboardService.suggestLayout(mockElements);
      console.log('Reorganized elements:', reorganizedElements);
      onSuggestLayout();
    } catch (error) {
      console.error('Layout suggestion failed:', error);
      toast.error('Layout suggestion failed');
    }
  }, [onSuggestLayout]);

  const handleExportWhiteboard = useCallback(async () => {
    try {
      const mockElements: WhiteboardElement[] = [];
      const mockPaths: DrawingPath[] = [];
      
      const exportUrl = await whiteboardService.exportWhiteboard(mockElements, mockPaths);
      console.log('Export URL:', exportUrl);
      onExportWhiteboard();
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Export failed');
    }
  }, [onExportWhiteboard]);

  return (
    <div className="w-80 h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-600 via-cyan-700 to-teal-600 p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <PenTool className="w-5 h-5" />
            <span className="font-semibold">Whiteboard AI Pro</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 w-6 p-0 text-white hover:bg-white/20"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>AI Status</span>
            <Badge variant="secondary" className="text-xs">
              {aiStatus.status}
            </Badge>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Quality Score</span>
              <span>{Math.round(qualityMetrics.aiEnhancement * 100)}%</span>
            </div>
            <Progress value={qualityMetrics.aiEnhancement * 100} className="h-1" />
          </div>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="create" className="text-xs">Create</TabsTrigger>
              <TabsTrigger value="save-load" className="text-xs">Save/Load</TabsTrigger>
              <TabsTrigger value="ai-tools" className="text-xs">AI Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="mt-4 space-y-4">
              {/* Drawing Tools */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Drawing Tools</Label>
                <div className="grid grid-cols-3 gap-2">
                  {availableTools.map((tool) => (
                    <Button
                      key={tool.id}
                      variant={selectedTool === tool.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleToolChange(tool.id)}
                      className="h-12 flex flex-col items-center justify-center gap-1"
                    >
                      <tool.icon className="w-4 h-4" />
                      <span className="text-xs">{tool.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Template Selection */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Template</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {WHITEBOARD_TEMPLATES.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${template.color}`} />
                          {template.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Color Palette */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Color Palette</Label>
                <div className="grid grid-cols-8 gap-1">
                  {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'].map((color) => (
                    <button
                      key={color}
                      className="w-6 h-6 rounded border border-gray-300 hover:border-gray-400 transition-colors"
                      style={{ backgroundColor: color }}
                      onClick={() => toast.success(`Selected color: ${color}`)}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="save-load" className="mt-4 space-y-4">
              {/* Whiteboard Name */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Whiteboard Name</Label>
                <Input
                  value={whiteboardName}
                  onChange={(e) => onWhiteboardNameChange(e.target.value)}
                  placeholder="Enter whiteboard name..."
                  className="text-sm"
                />
              </div>

              {/* Save/Load Actions */}
              <div className="space-y-3">
                <Button
                  onClick={onSaveWhiteboard}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <SaveIcon className="w-4 h-4 mr-2" />
                  Save Whiteboard
                </Button>

                <Button
                  onClick={onLoadWhiteboard}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Load Whiteboard
                </Button>

                <Button
                  onClick={onNewWhiteboard}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Whiteboard
                </Button>
              </div>

              {/* Statistics */}
              <Card className="p-3">
                <CardHeader className="p-0 pb-2">
                  <CardTitle className="text-sm">Current Whiteboard</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Name</span>
                    <span className="font-medium">{whiteboardName}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Elements</span>
                    <span className="font-medium">{elementCount}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Collaborators</span>
                    <span className="font-medium">{activeCollaborators}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-tools" className="mt-4 space-y-4">
              {/* AI Tools */}
              <div className="space-y-3">
                <Button
                  onClick={handleAICleanup}
                  disabled={isProcessing}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Cleanup
                  {isProcessing && <div className="ml-auto w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
                </Button>

                <Button
                  onClick={handleGenerateMindMap}
                  disabled={isProcessing}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Generate Mind Map
                  {isProcessing && <div className="ml-auto w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
                </Button>

                <Button
                  onClick={handleSuggestLayout}
                  disabled={isProcessing}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <LayoutGrid className="w-4 h-4 mr-2" />
                  Suggest Layout
                  {isProcessing && <div className="ml-auto w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
                </Button>

                <Button
                  onClick={handleExportWhiteboard}
                  disabled={isProcessing}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Whiteboard
                  {isProcessing && <div className="ml-auto w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
                </Button>
              </div>

              {/* Statistics */}
              <Card className="p-3">
                <CardHeader className="p-0 pb-2">
                  <CardTitle className="text-sm">Statistics</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Elements</span>
                    <span className="font-medium">{elementCount}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Collaborators</span>
                    <span className="font-medium">{activeCollaborators}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>AI Enhancement</span>
                    <span className="font-medium">{Math.round(qualityMetrics.aiEnhancement * 100)}%</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default WhiteboardAIToolbar; 