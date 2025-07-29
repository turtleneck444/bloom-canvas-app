import React, { useCallback, useRef, useEffect, useState } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MiniMap,
  ConnectionMode,
  useReactFlow,
  ReactFlowProvider,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import MindMapNode, { NodeData } from '../MindMap/MindMapNode';
import { 
  BaseNodeData, 
  LayoutType, 
  LayoutConfig, 
  LayoutProps,
  SampleData 
} from '../../utils/graphEngine/types';
import { layoutEngine } from '../../utils/graphEngine/layoutEngine';
import { getSampleData } from '../../utils/graphEngine/sampleData';
import LayoutSwitcher from './LayoutSwitcher';
import { Button } from '../ui/button';
import { 
  LayoutGrid, 
  Settings, 
  RotateCcw,
  Download,
  Upload,
  Save,
  Plus,
  Lightbulb
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface MindMapLayoutProps {
  className?: string;
  initialLayout?: LayoutType;
  onSave?: (data: { nodes: Node<BaseNodeData>[]; edges: Edge[]; layout: LayoutType }) => void;
  onLoad?: (data: { nodes: Node<BaseNodeData>[]; edges: Edge[]; layout: LayoutType }) => void;
}

const MindMapLayout: React.FC<MindMapLayoutProps> = ({
  className,
  initialLayout = 'radial',
  onSave,
  onLoad
}) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [currentLayout, setCurrentLayout] = useState<LayoutType>(initialLayout);
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
    type: initialLayout,
    spacing: 150,
    nodeSize: { width: 200, height: 100 },
    animation: true,
    autoFit: true,
    padding: 50
  });
  const [isLayoutLoading, setIsLayoutLoading] = useState(false);
  const [showLayoutPanel, setShowLayoutPanel] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const { fitView, zoomIn, zoomOut } = useReactFlow();

  // Node types configuration
  const nodeTypes = {
    mindMapNode: (props: any) => <MindMapNode {...props} />
  };

  // Handle connections
  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  // Apply layout
  const applyLayout = useCallback((layout: LayoutType) => {
    setIsLayoutLoading(true);
    toast.loading(`Applying ${layout} layout...`);

    try {
      const newConfig = { ...layoutConfig, type: layout };
      setLayoutConfig(newConfig);

      const updatedNodes = layoutEngine.calculatePositions(nodes, edges, newConfig);
      setNodes(updatedNodes);

      setTimeout(() => {
        if (reactFlowInstance) {
          reactFlowInstance.fitView({ padding: 0.2, duration: 1000 });
        }
        setIsLayoutLoading(false);
        toast.dismiss();
        toast.success(`${layout} layout applied successfully!`);
      }, 500);
    } catch (error) {
      setIsLayoutLoading(false);
      toast.dismiss();
      toast.error(`Failed to apply ${layout} layout`);
    }
  }, [nodes, edges, layoutConfig, setNodes, reactFlowInstance]);

  // Handle layout change
  const handleLayoutChange = useCallback((layout: LayoutType) => {
    setCurrentLayout(layout);
    applyLayout(layout);
  }, [applyLayout]);

  // Load sample data
  const handleLoadSampleData = useCallback((sampleData: SampleData) => {
    setNodes(sampleData.nodes);
    setEdges(sampleData.edges);
    setCurrentLayout(sampleData.suggestedLayout);
    setLayoutConfig(prev => ({ ...prev, type: sampleData.suggestedLayout }));
    
    toast.success(`Loaded ${sampleData.name} template`);
    
    setTimeout(() => {
      if (reactFlowInstance) {
        reactFlowInstance.fitView({ padding: 0.2, duration: 1000 });
      }
    }, 100);
  }, [setNodes, setEdges, reactFlowInstance]);

  // Generate suggestions
  const generateSuggestions = useCallback(() => {
    if (nodes.length > 0) {
      const newSuggestions = layoutEngine.suggestLayout(nodes, edges);
      setSuggestions(newSuggestions);
      
      if (newSuggestions.length > 0) {
        toast.success(`Found ${newSuggestions.length} layout suggestions`);
      }
    }
  }, [nodes, edges]);

  // Add new node
  const handleAddNode = useCallback(() => {
    const newNode: Node<BaseNodeData> = {
      id: `node-${Date.now()}`,
      type: 'mindMapNode',
      position: { x: Math.random() * 400 + 100, y: Math.random() * 400 + 100 },
      data: { 
        label: 'New Node',
        isEditing: true
      }
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  // Save data
  const handleSave = useCallback(() => {
    if (onSave) {
      onSave({ nodes, edges, layout: currentLayout });
      toast.success('Mind map saved successfully!');
    }
  }, [nodes, edges, currentLayout, onSave]);

  // Load data
  const handleLoad = useCallback(() => {
    if (onLoad) {
      // This would typically open a file picker
      // For now, we'll load sample data
      const sampleData = getSampleData('radial');
      handleLoadSampleData(sampleData);
    }
  }, [onLoad, handleLoadSampleData]);

  // Export as JSON
  const handleExportJSON = useCallback(() => {
    const data = { nodes, edges, layout: currentLayout, timestamp: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindmap-${currentLayout}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Mind map exported as JSON');
  }, [nodes, edges, currentLayout]);

  // Initialize with sample data if empty
  useEffect(() => {
    if (nodes.length === 0) {
      const sampleData = getSampleData(initialLayout);
      handleLoadSampleData(sampleData);
    }
  }, [initialLayout, nodes.length, handleLoadSampleData]);

  // Generate suggestions when data changes
  useEffect(() => {
    if (nodes.length > 5) {
      generateSuggestions();
    }
  }, [nodes, edges, generateSuggestions]);

  return (
    <div className={`w-full h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 ${className}`}>
      {/* Top Toolbar */}
      <div className="w-full h-16 bg-white/95 backdrop-blur-md border-b border-gray-200 z-30 sticky top-0 left-0">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-800">Mind Map Layout Engine</h1>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {currentLayout}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddNode}
              className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Node
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={generateSuggestions}
              className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200"
            >
              <Lightbulb className="w-4 h-4 mr-1" />
              AI Suggest
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLayoutPanel(!showLayoutPanel)}
              className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
            >
              <LayoutGrid className="w-4 h-4 mr-1" />
              Layouts
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportJSON}
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 min-h-0">
        {/* Layout Panel */}
        <AnimatePresence>
          {showLayoutPanel && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 400, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/95 backdrop-blur-md border-r border-gray-200 overflow-hidden"
            >
              <div className="p-4 h-full overflow-y-auto">
                <LayoutSwitcher
                  currentLayout={currentLayout}
                  onLayoutChange={handleLayoutChange}
                  onLoadSampleData={handleLoadSampleData}
                  nodes={nodes}
                  edges={edges}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Canvas Area */}
        <div className="flex-1 relative">
          {/* Loading Overlay */}
          {isLayoutLoading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Applying layout...</p>
              </div>
            </div>
          )}

          {/* Smart Suggestions Banner */}
          {suggestions.length > 0 && !showLayoutPanel && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 left-4 right-4 z-40"
            >
              <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">
                        AI suggests: {suggestions[0]?.layout} layout
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleLayoutChange(suggestions[0].layout)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      >
                        Apply
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSuggestions([])}
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ReactFlow Canvas */}
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            connectionMode={ConnectionMode.Loose}
            onInit={setReactFlowInstance}
            proOptions={{ hideAttribution: true }}
            className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30"
            fitView
            fitViewOptions={{ 
              padding: 0.15,
              maxZoom: 2.5,
              minZoom: 0.05
            }}
            minZoom={0.05}
            maxZoom={2.5}
            zoomOnScroll={false}
            panOnScroll={true}
            zoomOnPinch={true}
          >
            <Background 
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              className="opacity-40"
              color="#e2e8f0"
            />
            <Controls 
              className="bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-xl shadow-2xl"
              showZoom={true}
              showFitView={true}
              showInteractive={false}
              position="bottom-right"
            />
            <MiniMap 
              className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-lg overflow-hidden"
              nodeColor="#8b5cf6"
              maskColor="rgba(139, 92, 246, 0.1)"
              pannable
              zoomable
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

// Wrapper component with ReactFlowProvider
const MindMapLayoutWithProvider: React.FC<MindMapLayoutProps> = (props) => {
  return (
    <ReactFlowProvider>
      <MindMapLayout {...props} />
    </ReactFlowProvider>
  );
};

export default MindMapLayoutWithProvider; 