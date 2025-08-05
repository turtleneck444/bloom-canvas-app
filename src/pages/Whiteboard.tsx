import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  PenTool, Type, Square, Circle, Triangle, Image, FileText, Video, Link,
  StickyNote, Users, Share2, Download, Upload, Settings, Eye, Edit3, Plus,
  Minus, Maximize2, Minimize2, Layers, Network, Activity, Brain, Sparkles,
  Target, Compass, ChartBar, LineChart, ScatterChart, Palette, Eraser, Undo,
  Redo, Save, Trash2, Copy, Lock, Unlock, Grid, Move, RotateCw, ZoomIn,
  ZoomOut, Fullscreen, Brush, Droplets, Star, Heart, Zap, Save as SaveIcon,
  FolderOpen, FolderPlus, FileText as FileTextIcon, X, Check, AlertCircle
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import WhiteboardAIToolbar from '@/components/Whiteboard/WhiteboardAIToolbar';
import WhiteboardToolbar from '@/components/Whiteboard/WhiteboardToolbar';
import WorkingWhiteboardCanvas from '@/components/Whiteboard/WorkingWhiteboardCanvas';
import { ServiceSwitcher } from '@/components/ui/logo';
import { whiteboardService, DrawingPath, WhiteboardElement } from '@/services/whiteboardService';

interface WhiteboardState {
  id: string;
  name: string;
  elements: WhiteboardElement[];
  drawingPaths: DrawingPath[];
  createdAt: Date;
  updatedAt: Date;
}

const Whiteboard: React.FC = () => {
  const [currentTool, setCurrentTool] = useState<'select' | 'brush' | 'pencil' | 'spray' | 'eraser' | 'eyedropper' | 'text' | 'line' | 'rectangle' | 'circle' | 'triangle' | 'diamond' | 'hexagon' | 'star' | 'heart' | 'arrow' | 'blur' | 'sharpen' | 'smudge' | 'dodge' | 'burn' | 'sponge' | 'move' | 'rotate' | 'scale' | 'flip-h' | 'flip-v' | 'crop'>('brush');
  const [showSidebar, setShowSidebar] = useState(true);
  const [showToolbar, setShowToolbar] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [elements, setElements] = useState<WhiteboardElement[]>([]);
  const [drawingPaths, setDrawingPaths] = useState<DrawingPath[]>([]);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [collaborators, setCollaborators] = useState<string[]>(['John Doe', 'Jane Smith', 'Mike Johnson']);
  const [currentColor, setCurrentColor] = useState('#3B82F6');
  const [currentBackground, setCurrentBackground] = useState('#FFFFFF');
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasRef, setCanvasRef] = useState<HTMLDivElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [elementCount, setElementCount] = useState(0);
  const [activeCollaborators, setActiveCollaborators] = useState(3);
  const [brushSize, setBrushSize] = useState(10);
  const [opacity, setOpacity] = useState(100);
  const [history, setHistory] = useState<{ elements: WhiteboardElement[]; paths: DrawingPath[] }[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [whiteboardName, setWhiteboardName] = useState('Untitled Whiteboard');
  const [savedWhiteboards, setSavedWhiteboards] = useState<WhiteboardState[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  // History management
  const saveToHistory = useCallback((newElements: WhiteboardElement[], newPaths: DrawingPath[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ elements: [...newElements], paths: [...newPaths] });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const state = history[newIndex];
      setHistoryIndex(newIndex);
      setElements(state.elements);
      setDrawingPaths(state.paths);
      setElementCount(state.elements.length);
      toast.success('Undo completed');
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const state = history[newIndex];
      setHistoryIndex(newIndex);
      setElements(state.elements);
      setDrawingPaths(state.paths);
      setElementCount(state.elements.length);
      toast.success('Redo completed');
    }
  }, [history, historyIndex]);

  // Save/Load functionality
  const handleSaveWhiteboard = useCallback(() => {
    const whiteboardState: WhiteboardState = {
      id: `wb-${Date.now()}`,
      name: whiteboardName,
      elements,
      drawingPaths,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const newSavedWhiteboards = [...savedWhiteboards, whiteboardState];
    setSavedWhiteboards(newSavedWhiteboards);
    
    // Save to localStorage
    localStorage.setItem('savedWhiteboards', JSON.stringify(newSavedWhiteboards));
    
    setShowSaveDialog(false);
    toast.success(`Whiteboard "${whiteboardName}" saved successfully!`);
  }, [whiteboardName, elements, drawingPaths, savedWhiteboards]);

  const handleLoadWhiteboard = useCallback((whiteboard: WhiteboardState) => {
    setElements(whiteboard.elements);
    setDrawingPaths(whiteboard.drawingPaths);
    setElementCount(whiteboard.elements.length);
    setWhiteboardName(whiteboard.name);
    
    // Clear history and start fresh
    setHistory([]);
    setHistoryIndex(-1);
    
    setShowLoadDialog(false);
    toast.success(`Whiteboard "${whiteboard.name}" loaded successfully!`);
  }, []);

  const handleNewWhiteboard = useCallback(() => {
    setElements([]);
    setDrawingPaths([]);
    setElementCount(0);
    setWhiteboardName('Untitled Whiteboard');
    setHistory([]);
    setHistoryIndex(-1);
    toast.success('New whiteboard created!');
  }, []);

  // Load saved whiteboards on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedWhiteboards');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedWhiteboards(parsed);
      } catch (error) {
        console.error('Failed to load saved whiteboards:', error);
      }
    }
  }, []);

  // Tool handlers
  const handleToolChange = useCallback((tool: string) => {
    console.log('Tool changed to:', tool);
    setCurrentTool(tool as any);
    toast.success(`Selected ${tool} tool`);
  }, []);

  const handleBrushSizeChange = useCallback((size: number) => {
    setBrushSize(size);
  }, []);

  const handleOpacityChange = useCallback((opacity: number) => {
    setOpacity(opacity);
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setCurrentColor(color);
  }, []);

  const handleAICleanup = useCallback(async () => {
    setIsProcessing(true);
    try {
      const cleanedPaths = await whiteboardService.cleanupDrawings(drawingPaths);
      setDrawingPaths(cleanedPaths);
      saveToHistory(elements, cleanedPaths);
      toast.success('AI cleanup completed!');
    } catch (error) {
      toast.error('AI cleanup failed');
    } finally {
      setIsProcessing(false);
    }
  }, [drawingPaths, elements, saveToHistory]);

  const handleGenerateMindMap = useCallback(async () => {
    setIsProcessing(true);
    try {
      const mindMapElements = await whiteboardService.generateMindMap(drawingPaths);
      const newElements = [...elements, ...mindMapElements];
      setElements(newElements);
      setElementCount(newElements.length);
      saveToHistory(newElements, drawingPaths);
      toast.success('Mind map generated!');
    } catch (error) {
      toast.error('Mind map generation failed');
    } finally {
      setIsProcessing(false);
    }
  }, [drawingPaths, elements, saveToHistory]);

  const handleSuggestLayout = useCallback(async () => {
    setIsProcessing(true);
    try {
      const reorganizedElements = await whiteboardService.suggestLayout(elements);
      setElements(reorganizedElements);
      saveToHistory(reorganizedElements, drawingPaths);
      toast.success('Layout suggestions applied!');
    } catch (error) {
      toast.error('Layout suggestion failed');
    } finally {
      setIsProcessing(false);
    }
  }, [elements, drawingPaths, saveToHistory]);

  const handleExportWhiteboard = useCallback(async () => {
    try {
      await whiteboardService.exportWhiteboard(elements, drawingPaths);
      toast.success('Whiteboard exported!');
    } catch (error) {
      toast.error('Export failed');
    }
  }, [elements, drawingPaths]);

  const renderStartScreen = () => (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-6 max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-600 to-teal-600 flex items-center justify-center"
        >
          <PenTool className="w-10 h-10 text-white" />
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Professional Digital Whiteboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Photoshop and Canva-level drawing tools with AI-powered enhancement, real-time collaboration, and comprehensive creative features
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center">
                <PenTool className="w-5 h-5 text-cyan-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Professional Tools</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Brushes, pencils, shapes, effects, and transforms like Photoshop and Canva
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">AI Enhancement</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              AI cleans drawings, auto-generates mind maps, and suggests optimal layouts
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Team Collaboration</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Real-time collaboration with multiple users and live cursor tracking
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <Button
            onClick={() => setIsCollaborating(true)}
            className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Start Drawing
          </Button>
          <Button variant="outline" onClick={() => setShowLoadDialog(true)}>
            <FolderOpen className="w-4 h-4 mr-2" />
            Load Whiteboard
          </Button>
        </motion.div>
      </div>
    </div>
  );

  const renderWhiteboardCanvas = () => (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Professional Toolbar */}
      <AnimatePresence>
        {showToolbar && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <WhiteboardToolbar
              currentTool={currentTool}
              onToolChange={handleToolChange}
              brushSize={brushSize}
              onBrushSizeChange={handleBrushSizeChange}
              opacity={opacity}
              onOpacityChange={handleOpacityChange}
              currentColor={currentColor}
              onColorChange={handleColorChange}
              onUndo={handleUndo}
              onRedo={handleRedo}
              canUndo={historyIndex > 0}
              canRedo={historyIndex < history.length - 1}
              onClear={() => {
                setElements([]);
                setDrawingPaths([]);
                setElementCount(0);
                toast.success('Canvas cleared');
              }}
              onExport={handleExportWhiteboard}
              onImport={() => setShowLoadDialog(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Working Canvas */}
      <div className="flex-1 relative overflow-hidden">
        <WorkingWhiteboardCanvas
          currentTool={currentTool}
          brushSize={brushSize}
          opacity={opacity}
          currentColor={currentColor}
          onElementsChange={(elements) => {
            setElements(elements);
            setElementCount(elements.length);
          }}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          zoom={zoom}
          onZoomChange={setZoom}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col bg-gradient-to-br from-cyan-50 via-white to-teal-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-teal-900/20">
      {/* Header */}
      <div className="h-16 flex-shrink-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <ServiceSwitcher current="whiteboard" />
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
          <div className="flex items-center gap-2">
            <PenTool className="w-5 h-5 text-cyan-600" />
            <span className="font-semibold text-gray-900 dark:text-gray-100">Professional Digital Whiteboard</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowToolbar(!showToolbar)}
            className="h-8 px-3"
          >
            {showToolbar ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSaveDialog(true)}
            className="h-8 px-3"
          >
            <SaveIcon className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowLoadDialog(true)}
            className="h-8 px-3"
          >
            <FolderOpen className="w-4 h-4 mr-2" />
            Load
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewWhiteboard}
            className="h-8 px-3"
          >
            <Plus className="w-4 h-4 mr-2" />
            New
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAICleanup}
            className="h-8 px-3"
          >
            <Brain className="w-4 h-4 mr-2" />
            AI Enhance
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportWhiteboard}
            className="h-8 px-3"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 320 }}
              exit={{ width: 0 }}
              className="flex-shrink-0"
            >
              <WhiteboardAIToolbar
                onAICleanup={handleAICleanup}
                onGenerateMindMap={handleGenerateMindMap}
                onSuggestLayout={handleSuggestLayout}
                onExportWhiteboard={handleExportWhiteboard}
                onSaveWhiteboard={() => setShowSaveDialog(true)}
                onLoadWhiteboard={() => setShowLoadDialog(true)}
                onNewWhiteboard={handleNewWhiteboard}
                elementCount={elementCount}
                isProcessing={isProcessing}
                activeCollaborators={activeCollaborators}
                whiteboardName={whiteboardName}
                onWhiteboardNameChange={setWhiteboardName}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {isCollaborating ? renderWhiteboardCanvas() : renderStartScreen()}
        </div>
      </div>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Whiteboard</DialogTitle>
            <DialogDescription>
              Save your current whiteboard with a custom name.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="whiteboard-name">Whiteboard Name</Label>
              <Input
                id="whiteboard-name"
                value={whiteboardName}
                onChange={(e) => setWhiteboardName(e.target.value)}
                placeholder="Enter whiteboard name..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveWhiteboard}>
              <SaveIcon className="w-4 h-4 mr-2" />
              Save Whiteboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load Dialog */}
      <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Load Whiteboard</DialogTitle>
            <DialogDescription>
              Choose a saved whiteboard to load.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {savedWhiteboards.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FolderOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No saved whiteboards found.</p>
                <p className="text-sm">Create and save a whiteboard to see it here.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {savedWhiteboards.map((whiteboard) => (
                  <Card
                    key={whiteboard.id}
                    className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => handleLoadWhiteboard(whiteboard)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{whiteboard.name}</h3>
                        <p className="text-sm text-gray-500">
                          {whiteboard.elements.length} elements • {whiteboard.drawingPaths.length} paths
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(whiteboard.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Load
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoadDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Whiteboard; 