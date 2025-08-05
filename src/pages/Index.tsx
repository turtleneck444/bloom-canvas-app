import React, { useState, useRef, useCallback } from 'react';
import CollaborativeMindMap from '@/components/collaboration/CollaborativeMindMap';
import MindMapToolbar from '@/components/MindMap/MindMapToolbar';
import { toast } from 'sonner';

// Import customThemes from MindMapCanvas (we'll define it here for now)
const customThemes = {
  'nov8-classic': {
    name: 'NOV8 Classic',
    colors: {
      primary: 'hsl(267 85% 66%)',
      secondary: 'hsl(213 94% 68%)',
      accent: 'hsl(292 91% 76%)',
      background: 'hsl(240 10% 98%)',
      surface: 'hsl(0 0% 100%)',
      text: 'hsl(222.2 84% 4.9%)',
    }
  },
  'nov8-dark': {
    name: 'NOV8 Dark',
    colors: {
      primary: 'hsl(267 85% 66%)',
      secondary: 'hsl(213 94% 68%)',
      accent: 'hsl(292 91% 76%)',
      background: 'hsl(240 10% 8%)',
      surface: 'hsl(240 10% 12%)',
      text: 'hsl(0 0% 98%)',
    }
  },
  'ocean-blue': {
    name: 'Ocean Blue',
    colors: {
      primary: 'hsl(200 100% 50%)',
      secondary: 'hsl(180 100% 40%)',
      accent: 'hsl(220 100% 60%)',
      background: 'hsl(210 40% 98%)',
      surface: 'hsl(0 0% 100%)',
      text: 'hsl(222.2 84% 4.9%)',
    }
  },
  'ocean-dark': {
    name: 'Ocean Dark',
    colors: {
      primary: 'hsl(200 100% 50%)',
      secondary: 'hsl(180 100% 40%)',
      accent: 'hsl(220 100% 60%)',
      background: 'hsl(210 40% 8%)',
      surface: 'hsl(210 40% 12%)',
      text: 'hsl(0 0% 98%)',
    }
  },
  'forest-green': {
    name: 'Forest Green',
    colors: {
      primary: 'hsl(142 76% 36%)',
      secondary: 'hsl(120 60% 50%)',
      accent: 'hsl(160 100% 40%)',
      background: 'hsl(120 20% 98%)',
      surface: 'hsl(0 0% 100%)',
      text: 'hsl(222.2 84% 4.9%)',
    }
  },
  'midnight-purple': {
    name: 'Midnight Purple',
    colors: {
      primary: 'hsl(280 100% 70%)',
      secondary: 'hsl(267 85% 66%)',
      accent: 'hsl(292 91% 76%)',
      background: 'hsl(240 10% 98%)',
      surface: 'hsl(0 0% 100%)',
      text: 'hsl(222.2 84% 4.9%)',
    }
  },
  'cyber-blue': {
    name: 'Cyber Blue',
    colors: {
      primary: 'hsl(220 100% 60%)',
      secondary: 'hsl(180 100% 50%)',
      accent: 'hsl(280 100% 70%)',
      background: 'hsl(220 40% 98%)',
      surface: 'hsl(0 0% 100%)',
      text: 'hsl(222.2 84% 4.9%)',
    }
  }
};

const Index = () => {
  // Canvas ref to access all methods
  const canvasRef = useRef<any>(null);
  
  // State for toolbar
  const [currentLayout, setCurrentLayout] = useState('freeform');
  const [currentTheme, setCurrentTheme] = useState('nov8-classic');
  const [customTheme, setCustomTheme] = useState(customThemes['nov8-classic']);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Handlers that connect to the canvas
  const handleAddNode = useCallback(() => {
    if (canvasRef.current?.handleAddNode) {
      canvasRef.current.handleAddNode();
    }
  }, []);

  const handleSave = useCallback(() => {
    if (canvasRef.current?.handleSave) {
      canvasRef.current.handleSave();
    }
  }, []);

  const handleExport = useCallback(() => {
    if (canvasRef.current?.handleExport) {
      canvasRef.current.handleExport();
    }
  }, []);

  const handleImport = useCallback(() => {
    if (canvasRef.current?.handleImport) {
      canvasRef.current.handleImport();
    }
  }, []);

  const handleZoomIn = useCallback(() => {
    if (canvasRef.current?.handleZoomIn) {
      canvasRef.current.handleZoomIn();
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (canvasRef.current?.handleZoomOut) {
      canvasRef.current.handleZoomOut();
    }
  }, []);

  const handleFitView = useCallback(() => {
    if (canvasRef.current?.handleFitView) {
      canvasRef.current.handleFitView();
    }
  }, []);

  const handleLayoutChange = useCallback((layout) => {
    if (canvasRef.current?.handleLayoutChange) {
      canvasRef.current.handleLayoutChange(layout);
    }
    setCurrentLayout(layout);
  }, []);

  const handleUndo = useCallback(() => {
    if (canvasRef.current?.handleUndo) {
      canvasRef.current.handleUndo();
    }
  }, []);

  const handleRedo = useCallback(() => {
    if (canvasRef.current?.handleRedo) {
      canvasRef.current.handleRedo();
    }
  }, []);

  const handleClearAll = useCallback(() => {
    if (canvasRef.current?.handleClearAll) {
      canvasRef.current.handleClearAll();
    }
  }, []);

  const handleThemeChange = useCallback((theme) => {
    if (canvasRef.current?.handleThemeChange) {
      canvasRef.current.handleThemeChange(theme);
    }
    setCurrentTheme(theme);
  }, []);

  const handleExportAsPNG = useCallback(() => {
    if (canvasRef.current?.handleExportAsPNG) {
      canvasRef.current.handleExportAsPNG();
    }
  }, []);

  const handleExportAsPDF = useCallback(() => {
    if (canvasRef.current?.handleExportAsPDF) {
      canvasRef.current.handleExportAsPDF();
    }
  }, []);

  // Update state from canvas
  const updateStateFromCanvas = useCallback(() => {
    if (canvasRef.current) {
      setNodes(canvasRef.current.nodes || []);
      setEdges(canvasRef.current.edges || []);
      setHistory(canvasRef.current.history || []);
      setHistoryIndex(canvasRef.current.historyIndex || -1);
      setCurrentLayout(canvasRef.current.currentLayout || 'freeform');
      setCurrentTheme(canvasRef.current.currentTheme || 'nov8-classic');
      setCustomTheme(canvasRef.current.customTheme || customThemes['nov8-classic']);
    }
  }, []);

  // Update state periodically
  React.useEffect(() => {
    const interval = setInterval(updateStateFromCanvas, 100);
    return () => clearInterval(interval);
  }, [updateStateFromCanvas]);

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col bg-gradient-to-br from-teal-50 via-white to-cyan-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-cyan-900/20">
      <MindMapToolbar
        onAddNode={handleAddNode}
        onSave={handleSave}
        onExport={handleExport}
        onImport={handleImport}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFitView={handleFitView}
        onLayoutChange={handleLayoutChange}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClearAll={handleClearAll}
        currentLayout={currentLayout}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        nodeCount={nodes.length}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        customThemes={customThemes}
        customTheme={customTheme}
        setCustomTheme={setCustomTheme}
        onExportAsPNG={handleExportAsPNG}
        onExportAsPDF={handleExportAsPDF}
      />
      <div className="flex-1 overflow-hidden">
        <CollaborativeMindMap className="w-full h-full" />
      </div>
    </div>
  );
};

export default Index;
