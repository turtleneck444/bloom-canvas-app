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

import MindMapNode, { NodeData } from './MindMapNode';
import MindMapToolbar from './MindMapToolbar';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const nodeTypes = {
  mindMapNode: MindMapNode,
};

interface MindMapCanvasProps {
  className?: string;
}

const MindMapCanvasInner: React.FC<MindMapCanvasProps> = ({ className }) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLayout, setCurrentLayout] = useState('freeform');
  const [currentTheme, setCurrentTheme] = useState('light');
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  // Initialize with a root node
  useEffect(() => {
    const initialNode: Node<NodeData> = {
      id: '1',
      type: 'mindMapNode',
      position: { x: 400, y: 300 },
      data: { label: 'Central Idea', color: 'hsl(267 85% 66%)' },
    };
    setNodes([initialNode]);
  }, [setNodes]);

  // Auto-save functionality
  useEffect(() => {
    const saveData = () => {
      const data = { nodes, edges, currentLayout, currentTheme };
      localStorage.setItem('nov8-mindmap', JSON.stringify(data));
    };

    const interval = setInterval(saveData, 5000); // Auto-save every 5 seconds
    return () => clearInterval(interval);
  }, [nodes, edges, currentLayout, currentTheme]);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('nov8-mindmap');
    if (savedData) {
      try {
        const { nodes: savedNodes, edges: savedEdges, currentLayout: savedLayout, currentTheme: savedTheme } = JSON.parse(savedData);
        if (savedNodes?.length > 0) {
          setNodes(savedNodes);
          setEdges(savedEdges || []);
          setCurrentLayout(savedLayout || 'freeform');
          setCurrentTheme(savedTheme || 'light');
        }
      } catch (error) {
        console.error('Failed to load saved mind map:', error);
      }
    }
  }, [setNodes, setEdges]);

  // Event listeners for node updates
  useEffect(() => {
    const handleUpdateNode = (event: any) => {
      const { id, updates } = event.detail;
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, ...updates } } : node
        )
      );
    };

    const handleDeleteNode = (event: any) => {
      const { id } = event.detail;
      setNodes((nds) => nds.filter((node) => node.id !== id));
      setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    };

    window.addEventListener('updateNode', handleUpdateNode);
    window.addEventListener('deleteNode', handleDeleteNode);

    return () => {
      window.removeEventListener('updateNode', handleUpdateNode);
      window.removeEventListener('deleteNode', handleDeleteNode);
    };
  }, [setNodes, setEdges]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;

      switch (event.key) {
        case 'Enter':
          handleAddNode();
          break;
        case 'Tab':
          event.preventDefault();
          handleAddNode();
          break;
        case 'Delete':
        case 'Backspace':
          // Delete selected nodes
          setNodes((nds) => nds.filter((node) => !node.selected));
          setEdges((eds) => eds.filter((edge) => !edge.selected));
          break;
        case '=':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            zoomIn();
          }
          break;
        case '-':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            zoomOut();
          }
          break;
        case '0':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            fitView();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [zoomIn, zoomOut, fitView, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleAddNode = useCallback(() => {
    const newNode: Node<NodeData> = {
      id: `${Date.now()}`,
      type: 'mindMapNode',
      position: {
        x: Math.random() * 400 + 200,
        y: Math.random() * 400 + 200,
      },
      data: { label: 'New Idea', color: 'hsl(213 94% 68%)' },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const handleSave = useCallback(() => {
    const data = { nodes, edges, currentLayout, currentTheme };
    localStorage.setItem('nov8-mindmap', JSON.stringify(data));
    toast.success('Mind map saved successfully!');
  }, [nodes, edges, currentLayout, currentTheme]);

  const handleExport = useCallback(() => {
    const data = { nodes, edges, currentLayout, currentTheme };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nov8-mindmap-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Mind map exported successfully!');
  }, [nodes, edges, currentLayout, currentTheme]);

  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            setNodes(data.nodes || []);
            setEdges(data.edges || []);
            setCurrentLayout(data.currentLayout || 'freeform');
            setCurrentTheme(data.currentTheme || 'light');
            toast.success('Mind map imported successfully!');
          } catch (error) {
            toast.error('Failed to import mind map. Invalid file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [setNodes, setEdges]);

  const handleLayoutChange = useCallback((layout: 'radial' | 'tree-horizontal' | 'tree-vertical' | 'freeform') => {
    setCurrentLayout(layout);
    // TODO: Implement automatic layout algorithms
    toast.info(`Layout changed to ${layout}`);
  }, []);

  const handleThemeChange = useCallback((theme: 'light' | 'dark' | 'grid' | 'paper') => {
    setCurrentTheme(theme);
    if (theme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggleDarkMode = useCallback(() => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      setCurrentTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setCurrentTheme('light');
    }
  }, [isDarkMode]);

  const getBackgroundVariant = () => {
    switch (currentTheme) {
      case 'grid': return BackgroundVariant.Lines;
      case 'paper': return BackgroundVariant.Cross;
      default: return BackgroundVariant.Dots;
    }
  };

  return (
    <div className={cn("w-full h-screen relative", className)}>
      <MindMapToolbar
        onAddNode={handleAddNode}
        onSave={handleSave}
        onExport={handleExport}
        onImport={handleImport}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onFitView={() => fitView()}
        onLayoutChange={handleLayoutChange}
        onThemeChange={handleThemeChange}
        currentLayout={currentLayout}
        currentTheme={currentTheme}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      <div ref={reactFlowWrapper} className="w-full h-full mind-map-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          attributionPosition="bottom-left"
          className="mind-map-canvas"
          onInit={setReactFlowInstance}
        >
          <Background 
            variant={getBackgroundVariant()}
            gap={20}
            size={1}
            className="opacity-30"
          />
          <Controls 
            className="!bottom-4 !left-4 !bg-white/90 !backdrop-blur-sm !border !shadow-lg"
            showInteractive={false}
          />
          <MiniMap 
            className="!bottom-4 !right-4 !bg-white/90 !backdrop-blur-sm !border !shadow-lg !rounded-lg"
            nodeColor={(node) => {
              const color = (node.data as NodeData)?.color || 'hsl(267 85% 66%)';
              return color;
            }}
          />
        </ReactFlow>
      </div>
    </div>
  );
};

const MindMapCanvas: React.FC<MindMapCanvasProps> = (props) => {
  return (
    <ReactFlowProvider>
      <MindMapCanvasInner {...props} />
    </ReactFlowProvider>
  );
};

export default MindMapCanvas;