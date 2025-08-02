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

import { Button } from '../ui/button';
import { Brain, Sparkles, Plus, Wand2, LayoutGrid, GitBranch, BarChart3, ArrowRight, Fish, Target, Compass, Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../ui/tooltip';
import StrategyNode from './StrategyNode';

// Simple default node component for testing
const DefaultNode = ({ data }: any) => (
  <div className="bg-white border-2 border-gray-300 rounded-lg p-3 shadow-lg min-w-[200px]">
    <div className="font-medium text-gray-900">{data.label}</div>
    <div className="text-sm text-gray-600">{data.description}</div>
    <div className="flex gap-1 mt-2">
      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">{data.type}</span>
      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">{data.priority}</span>
    </div>
  </div>
);

interface StrategyNodeData extends Record<string, unknown> {
  label: string;
  color: string;
  fontSize: number;
  parentId?: string;
  category: string;
  messages: string[];
  opacity: number;
  scale: number;
  isGoal: boolean;
  importance: number;
  centralityScore: number;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
  dueDate?: Date;
  assignedTo?: string;
  budget?: number;
  type: 'goal' | 'strategy' | 'tactic' | 'milestone' | 'risk' | 'resource' | 'strength' | 'weakness' | 'opportunity' | 'threat' | 'rivalry' | 'suppliers' | 'customers' | 'entrants' | 'substitutes' | 'competitor' | 'market-size' | 'market-growth' | 'market-segments';
}

interface StrategyCanvasProps {
  className?: string;
  onRef?: (ref: any) => void;
}

const StrategyCanvasInner: React.FC<StrategyCanvasProps> = ({ className, onRef }) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<StrategyNodeData>>([
    {
      id: 'welcome-1',
      type: 'default',
      position: { x: 400, y: 200 },
      data: {
        label: 'Welcome to Strategy Co-Pilot',
        description: 'Click the analysis buttons above to generate strategic elements',
        type: 'strategy',
        priority: 'high' as const,
        color: '#10B981',
        fontSize: 14,
        category: 'welcome',
        messages: [],
        opacity: 1,
        scale: 1,
        isGoal: false,
        importance: 8,
        centralityScore: 0.5,
        tags: ['welcome'],
        status: 'pending',
        progress: 0
      }
    },
    {
      id: 'welcome-2',
      type: 'default',
      position: { x: 600, y: 400 },
      data: {
        label: 'Start Your Strategy',
        description: 'Use the AI toolbar on the left to generate comprehensive strategies',
        type: 'goal',
        priority: 'high' as const,
        color: '#3B82F6',
        fontSize: 14,
        category: 'welcome',
        messages: [],
        opacity: 1,
        scale: 1,
        isGoal: true,
        importance: 9,
        centralityScore: 0.8,
        tags: ['welcome'],
        status: 'pending',
        progress: 0
      }
    }
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLayout, setCurrentLayout] = useState('freeform');
  const [history, setHistory] = useState<Array<{ nodes: Node<StrategyNodeData>[]; edges: Edge[] }>>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLayoutLoading, setIsLayoutLoading] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  const addToHistory = useCallback((newNodes: Node<StrategyNodeData>[], newEdges: Edge[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ nodes: newNodes, edges: newEdges });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  // Expose methods to parent component
  const canvasMethods = useRef({
    addAnalysisNodes: (analysisNodes: any[], analysisType: string) => {
      console.log('Adding analysis nodes:', analysisNodes);
      
      const newNodes = analysisNodes.map((node, index) => ({
        ...node,
        type: 'default',
        position: {
          x: 400 + Math.cos((index * Math.PI * 2) / analysisNodes.length) * 200,
          y: 300 + Math.sin((index * Math.PI * 2) / analysisNodes.length) * 200
        }
      }));
      
      console.log('Processed nodes:', newNodes);
      setNodes(prev => {
        const updatedNodes = [...prev, ...newNodes];
        console.log('Updated nodes:', updatedNodes);
        return updatedNodes;
      });
      addToHistory([...nodes, ...newNodes], edges);
    },
    getNodes: () => nodes,
    getEdges: () => edges,
    clearCanvas: () => {
      setNodes([]);
      setEdges([]);
      setHistory([]);
      setHistoryIndex(-1);
    }
  });

  // Expose ref to parent
  useEffect(() => {
    if (onRef) {
      onRef(canvasMethods.current);
    }
  }, [onRef]);

  const handleAddNode = useCallback(async (parentId?: string, explicitColor?: string) => {
    const parentNode = parentId ? nodes.find(n => n.id === parentId) : null;
    
    let newPosition;
    if (parentNode) {
      const existingChildren = edges.filter(e => e.source === parentId).map(e => e.target);
      const childCount = existingChildren.length;
      const angle = (childCount * (Math.PI / 3)) + (Math.random() - 0.5) * 0.3;
      const distance = 180 + (childCount * 20);
      
      const desiredPosition = {
        x: parentNode.position.x + Math.cos(angle) * distance,
        y: parentNode.position.y + Math.sin(angle) * distance,
      };
      
      newPosition = desiredPosition;
    } else {
      newPosition = {
        x: 600 + (Math.random() - 0.5) * 200,
        y: 400 + (Math.random() - 0.5) * 200,
      };
    }

    const nodeLabel = 'New Strategy Node';
    const nodeCategory = 'strategy';
    const inheritedColor = explicitColor || parentNode?.data.color || '#3B82F6';
    
    const newNode: Node<StrategyNodeData> = {
      id: `${Date.now()}`,
      type: 'default',
      position: newPosition,
      data: {
        label: nodeLabel,
        color: inheritedColor,
        fontSize: parentNode ? 13 : 14,
        parentId: parentId,
        category: nodeCategory,
        messages: [],
        opacity: 1,
        scale: 1,
        isGoal: false,
        importance: parentNode ? 5 : 7,
        centralityScore: 0,
        tags: [],
        priority: 'medium',
        status: 'pending',
        progress: 0,
        type: 'strategy'
      },
    };
    
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
    
    if (parentId) {
      const parentNode = nodes.find(n => n.id === parentId);
      const parentColor = parentNode?.data.color || '#3B82F6';
      
      const newEdge: Edge = {
        id: `edge-${parentId}-${newNode.id}`,
        source: parentId,
        target: newNode.id,
        type: 'smoothstep',
        animated: true,
        style: { 
          stroke: parentColor,
          strokeWidth: 4,
          strokeDasharray: 'none',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
        },
        data: {
          sourceColor: parentColor,
          targetColor: inheritedColor,
          gradient: parentColor !== inheritedColor
        }
      };
      const newEdges = [...edges, newEdge];
      setEdges(newEdges);
      addToHistory(newNodes, newEdges);
    } else {
      addToHistory(newNodes, edges);
    }
    
    if (reactFlowInstance) {
      requestAnimationFrame(() => {
        reactFlowInstance.fitView({ padding: 0.1, duration: 400 });
      });
    }
  }, [setNodes, setEdges, nodes, edges, addToHistory, reactFlowInstance]);

  const onConnect = useCallback(
    (params: Connection) => {
      const sourceNode = nodes.find(n => n.id === params.source);
      const targetNode = nodes.find(n => n.id === params.target);
      
      const sourceColor = sourceNode?.data.color || '#3B82F6';
      const targetColor = targetNode?.data.color || '#10B981';
      
      const newEdge: Edge = {
        id: `edge-${params.source}-${params.target}`,
        source: params.source!,
        target: params.target!,
        type: 'smoothstep',
        animated: true,
        style: { 
          stroke: sourceColor,
          strokeWidth: 4,
          strokeDasharray: 'none',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
        },
        data: {
          sourceColor,
          targetColor,
          gradient: sourceColor !== targetColor
        }
      };
      
      setEdges((eds) => [...eds, newEdge]);
    },
    [setEdges, nodes]
  );

  const handleSave = useCallback(() => {
    const data = { nodes, edges, currentLayout };
    localStorage.setItem('nov8-strategy', JSON.stringify(data));
    toast.success('Strategy saved successfully!');
  }, [nodes, edges, currentLayout]);

  const handleExport = useCallback(() => {
    const data = { nodes, edges, currentLayout };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nov8-strategy-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Strategy exported successfully!');
  }, [nodes, edges, currentLayout]);

  const handleExportAsPNG = useCallback(() => {
    if (reactFlowInstance) {
      const canvas = document.querySelector('.react-flow__viewport canvas') as HTMLCanvasElement;
      if (canvas) {
        const link = document.createElement('a');
        link.download = `nov8-strategy-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
        toast.success('Strategy exported as PNG!');
      }
    }
  }, [reactFlowInstance]);

  const handleExportAsPDF = useCallback(() => {
    if (reactFlowInstance) {
      const canvas = document.querySelector('.react-flow__viewport canvas') as HTMLCanvasElement;
      if (canvas) {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new (window as any).jsPDF();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`nov8-strategy-${Date.now()}.pdf`);
        toast.success('Strategy exported as PDF!');
      }
    }
  }, [reactFlowInstance]);

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
            toast.success('Strategy imported successfully!');
          } catch (error) {
            toast.error('Failed to import strategy. Invalid file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [setNodes, setEdges]);

  const handleClearAll = useCallback(() => {
    if (nodes.length > 0) {
      if (!confirm('Are you sure you want to clear the entire canvas? This cannot be undone.')) {
        return;
      }
    }
    
    setNodes([]);
    setEdges([]);
    setHistory([]);
    setHistoryIndex(-1);
    
    localStorage.removeItem('nov8-strategy');
    
    toast.success('🧹 Canvas completely cleared!', {
      description: 'Ready for a fresh start'
    });
  }, [setNodes, setEdges, setHistory, setHistoryIndex, nodes.length]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const previousState = history[newIndex];
      setNodes(previousState.nodes);
      setEdges(previousState.edges);
      setHistoryIndex(newIndex);
      toast.info('Undone');
    }
  }, [history, historyIndex, setNodes, setEdges]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const nextState = history[newIndex];
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
      setHistoryIndex(newIndex);
      toast.info('Redone');
    }
  }, [history, historyIndex, setNodes, setEdges]);

  const handleLayoutChange = useCallback((layout: string) => {
    setCurrentLayout(layout);
    setIsLayoutLoading(true);
    toast.loading(`Applying ${layout} layout...`);
    
    setTimeout(() => {
      setIsLayoutLoading(false);
      toast.dismiss();
      toast.success(`Layout changed to ${layout}`);
    }, 1000);
  }, []);

  const handleAISuggest = useCallback(() => {
    toast.info('AI suggestions coming soon...');
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      // Handle delete logic
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const layoutConfigs = [
    {
      id: 'radial',
      name: 'Radial Layout',
      description: 'Central goal with strategies radiating outward',
      icon: LayoutGrid,
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      category: 'Strategy'
    },
    {
      id: 'tree-horizontal',
      name: 'Tree (Horizontal)',
      description: 'Top-down hierarchy with horizontal branches',
      icon: GitBranch,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      category: 'Hierarchy'
    },
    {
      id: 'tree-vertical',
      name: 'Tree (Vertical)',
      description: 'Left-right hierarchy with vertical branches',
      icon: BarChart3,
      color: 'bg-gradient-to-br from-green-500 to-emerald-500',
      category: 'Hierarchy'
    },
    {
      id: 'flowchart',
      name: 'Flowchart',
      description: 'Process flow with directional arrows',
      icon: ArrowRight,
      color: 'bg-gradient-to-br from-orange-500 to-red-500',
      category: 'Process'
    },
    {
      id: 'organic',
      name: 'Organic',
      description: 'Natural, flowing layout with organic positioning',
      icon: Fish,
      color: 'bg-gradient-to-br from-green-500 to-teal-500',
      category: 'Natural'
    }
  ];

  const currentLayoutConfig = layoutConfigs.find(config => config.id === currentLayout);

  const nodeTypes = {
    default: DefaultNode,
  };

  return (
    <div className={cn("w-full h-full", className)}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        connectionMode={ConnectionMode.Loose}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        className="bg-gradient-to-br from-emerald-50 via-green-50/30 to-emerald-50/30 dark:from-emerald-900 dark:via-green-900/30 dark:to-emerald-900/30"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color={isDarkMode ? '#374151' : '#9CA3AF'}
          className="opacity-30"
        />
        <Controls 
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg" 
          position="bottom-left"
          showZoom={true}
          showFitView={true}
          showInteractive={false}
        />
        <MiniMap
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
          nodeColor={(node) => (node.data as StrategyNodeData)?.color || '#3B82F6'}
          nodeStrokeWidth={3}
          zoomable
          pannable
        />
      </ReactFlow>

      {/* Floating Action Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => handleAddNode()}
              className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white shadow-lg z-50"
              size="lg"
            >
              <Plus className="w-6 h-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add Strategy Node</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLayoutLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
                <span className="text-gray-700 dark:text-gray-300">Applying layout...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StrategyCanvas: React.FC<StrategyCanvasProps> = (props) => {
  return (
    <ReactFlowProvider>
      <StrategyCanvasInner {...props} />
    </ReactFlowProvider>
  );
};

export default StrategyCanvas; 