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

  // Core functions
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleAddNode = useCallback((parentId?: string) => {
    const parentNode = parentId ? nodes.find(n => n.id === parentId) : null;
    const newNode: Node<NodeData> = {
      id: `${Date.now()}`,
      type: 'mindMapNode',
      position: parentNode ? {
        x: parentNode.position.x + (Math.random() - 0.5) * 200,
        y: parentNode.position.y + 150 + (Math.random() - 0.5) * 100,
      } : {
        x: Math.random() * 400 + 200,
        y: Math.random() * 400 + 200,
      },
      data: { 
        label: 'New Idea', 
        color: 'hsl(213 94% 68%)',
        fontSize: 14,
        parentId: parentId
      },
    };
    
    setNodes((nds) => [...nds, newNode]);
    
    // Create connection if parent exists
    if (parentId) {
      const newEdge: Edge = {
        id: `edge-${parentId}-${newNode.id}`,
        source: parentId,
        target: newNode.id,
        type: 'smoothstep',
        animated: false,
        style: { stroke: 'hsl(var(--connection-line))', strokeWidth: 2 }
      };
      setEdges((eds) => [...eds, newEdge]);
    }
  }, [setNodes, setEdges, nodes]);

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
    
    // Apply automatic layout
    const updatedNodes = [...nodes];
    const rootNode = updatedNodes.find(n => !edges.some(e => e.target === n.id));
    
    if (layout === 'radial' && rootNode) {
      // Radial layout implementation
      const centerX = 400;
      const centerY = 300;
      const radius = 200;
      const otherNodes = updatedNodes.filter(n => n.id !== rootNode.id);
      
      rootNode.position = { x: centerX, y: centerY };
      
      otherNodes.forEach((node, index) => {
        const angle = (index / otherNodes.length) * 2 * Math.PI;
        node.position = {
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
        };
      });
      
      setNodes(updatedNodes);
    } else if (layout === 'tree-vertical' && rootNode) {
      // Vertical tree layout
      const visited = new Set();
      const levelHeight = 150;
      
      const positionNodeVertically = (nodeId: string, level: number, siblingIndex: number, siblingsCount: number) => {
        if (visited.has(nodeId)) return;
        visited.add(nodeId);
        
        const node = updatedNodes.find(n => n.id === nodeId);
        if (!node) return;
        
        const totalWidth = 800;
        const spacing = siblingsCount > 1 ? totalWidth / (siblingsCount - 1) : 0;
        const startX = siblingsCount > 1 ? 100 : 400;
        
        node.position = {
          x: startX + (siblingIndex * spacing),
          y: 100 + (level * levelHeight),
        };
        
        const children = edges
          .filter(e => e.source === nodeId)
          .map(e => e.target);
        
        children.forEach((childId, index) => {
          positionNodeVertically(childId, level + 1, index, children.length);
        });
      };
      
      positionNodeVertically(rootNode.id, 0, 0, 1);
      setNodes(updatedNodes);
    }
    
    toast.info(`Layout changed to ${layout}`);
  }, [nodes, edges, setNodes]);

  const handleClearCanvas = useCallback(() => {
    setNodes([]);
    setEdges([]);
    toast.success('Canvas cleared!');
  }, [setNodes, setEdges]);

  const handleUndo = useCallback(() => {
    toast.info('Undo functionality - implement history management');
  }, []);

  const handleRedo = useCallback(() => {
    toast.info('Redo functionality - implement history management');
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

    const handleAddChildNode = (event: any) => {
      const { parentId } = event.detail;
      handleAddNode(parentId);
    };

    const handleDuplicateNode = (event: any) => {
      const { id } = event.detail;
      const nodeToClone = nodes.find(n => n.id === id);
      if (nodeToClone) {
        const newNode: Node<NodeData> = {
          ...nodeToClone,
          id: `${Date.now()}`,
          position: {
            x: nodeToClone.position.x + 100,
            y: nodeToClone.position.y + 50,
          },
          data: {
            ...nodeToClone.data,
            label: `${nodeToClone.data.label} (Copy)`
          }
        };
        setNodes((nds) => [...nds, newNode]);
      }
    };

    window.addEventListener('updateNode', handleUpdateNode);
    window.addEventListener('deleteNode', handleDeleteNode);
    window.addEventListener('addChildNode', handleAddChildNode);
    window.addEventListener('duplicateNode', handleDuplicateNode);

    return () => {
      window.removeEventListener('updateNode', handleUpdateNode);
      window.removeEventListener('deleteNode', handleDeleteNode);
      window.removeEventListener('addChildNode', handleAddChildNode);
      window.removeEventListener('duplicateNode', handleDuplicateNode);
    };
  }, [setNodes, setEdges, handleAddNode, nodes]);

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
  }, [zoomIn, zoomOut, fitView, setNodes, setEdges, handleAddNode]);

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
        onClearCanvas={handleClearCanvas}
        onUndo={handleUndo}
        onRedo={handleRedo}
        nodeCount={nodes.length}
        edgeCount={edges.length}
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
          snapToGrid={true}
          snapGrid={[20, 20]}
          defaultEdgeOptions={{
            style: { stroke: 'hsl(var(--connection-line))', strokeWidth: 2 },
            type: 'smoothstep',
          }}
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