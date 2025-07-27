import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  useReactFlow,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { initialNodes, initialEdges } from './initial-data';
import MindMapNode from './MindMapNode';
import { MindMapToolbar } from './MindMapToolbar';
import FloatingEdge from './FloatingEdge';
import { getLayoutedElements, apply জোরceLayout } from './layout-utils';
import { Handle } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { Brain, Circle, GitBranch, BarChart3, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { aiService } from '@/services/aiService';
import { useToast } from "@/components/ui/use-toast"

const nodeTypes = { mindMapNode: MindMapNode };
const edgeTypes = { floating: FloatingEdge };

// Define the MindMapCanvasProps interface
interface MindMapCanvasProps {
  onSave: () => void;
  onExport: () => void;
  onImport: () => void;
}

const MindMapCanvas: React.FC<MindMapCanvasProps> = ({ onSave, onExport, onImport }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange, updateEdge] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [layout, setLayout] = useState('radial');
  const [isLayouting, setIsLayouting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const undoStack = useRef<Node[][]>([]);
  const redoStack = useRef<Node[][]>([]);
  const { fitView } = useReactFlow();
  const { toast } = useToast()

  const rfWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialLayoutedNodes = getLayoutedElements(nodes, edges, { width: 800, height: 600 }, layout);
    setNodes(initialLayoutedNodes);
  }, []);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onLayoutChange = useCallback((newLayout: any) => {
    if (isLayouting) return;
    setIsLayouting(true);

    setLayout(newLayout);
    setTimeout(() => {
      const layoutedNodes = getLayoutedElements(nodes, edges, { width: 800, height: 600 }, newLayout);
      setNodes(layoutedNodes);
      setIsLayouting(false);
    }, 500);
  }, [nodes, edges, isLayouting]);

  const onAddNode = useCallback(() => {
    const id = String(nodes.length + 1);
    const newNode = {
      id: id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: { label: 'New Node' },
      type: 'mindMapNode',
    };

    setNodes((nds) => [...nds, newNode]);
  }, [nodes.length, setNodes]);

  const addChildNode = useCallback((parentId: string) => {
    const id = String(nodes.length + 1);
    const parentNode = nodes.find(node => node.id === parentId);

    if (!parentNode) {
      console.error(`Parent node with id ${parentId} not found.`);
      return;
    }

    const newNode = {
      id: id,
      position: {
        x: parentNode.position.x + 200,
        y: parentNode.position.y + 100,
      },
      data: { label: 'New Child', parentId: parentId },
      type: 'mindMapNode',
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, { id: `edge-${parentId}-${id}`, source: parentId, target: id, type: 'floating' }]);
  }, [nodes, setNodes, setEdges]);

  const duplicateNode = useCallback((nodeId: string) => {
    const originalNode = nodes.find(node => node.id === nodeId);

    if (!originalNode) {
      console.error(`Node with id ${nodeId} not found.`);
      return;
    }

    const id = String(nodes.length + 1);
    const newNode = {
      id: id,
      position: {
        x: originalNode.position.x + 50,
        y: originalNode.position.y + 50,
      },
      data: { ...originalNode.data, label: `Copy of ${originalNode.data.label}` },
      type: 'mindMapNode',
    };

    setNodes((nds) => [...nds, newNode]);

    // Duplicate edges connected to the original node
    const sourceEdges = edges.filter(edge => edge.source === nodeId);
    const targetEdges = edges.filter(edge => edge.target === nodeId);

    const newEdges = [
      ...sourceEdges.map(edge => ({
        id: `edge-${id}-${edge.target}`,
        source: id,
        target: edge.target,
        type: 'floating',
      })),
      ...targetEdges.map(edge => ({
        id: `edge-${edge.source}-${id}`,
        source: edge.source,
        target: id,
        type: 'floating',
      })),
    ];

    setEdges((eds) => [...eds, ...newEdges]);
  }, [nodes, edges, setNodes, setEdges]);

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter(node => node.id !== nodeId));
    setEdges((eds) => eds.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
  }, [setNodes, setEdges]);

  const updateNode = useCallback((nodeId: string, updates: any) => {
    setNodes(nds =>
      nds.map(node => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, ...updates } };
        }
        return node;
      })
    );
  }, [setNodes]);

  const onNodesChangeWithHistory = (changes) => {
    undoStack.current.push(nodes);
    setCanUndo(true);
    redoStack.current = [];
    setCanRedo(false);
    onNodesChange(changes);
  };

  const onEdgesChangeWithHistory = (changes) => {
    undoStack.current.push(nodes);
    setCanUndo(true);
    redoStack.current = [];
    setCanRedo(false);
    onEdgesChange(changes);
  };

  const handleUndo = useCallback(() => {
    if (undoStack.current.length === 0) return;

    redoStack.current.push(nodes);
    setCanRedo(true);

    const previousNodes = undoStack.current.pop();
    if (previousNodes) {
      setNodes(previousNodes);
      if (undoStack.current.length === 0) {
        setCanUndo(false);
      }
    }
  }, [nodes]);

  const handleRedo = useCallback(() => {
    if (redoStack.current.length === 0) return;

    undoStack.current.push(nodes);
    setCanUndo(true);

    const nextNodes = redoStack.current.pop();
    if (nextNodes) {
      setNodes(nextNodes);
      if (redoStack.current.length === 0) {
        setCanRedo(false);
      }
    }
  }, [nodes]);

  const handleClearAll = useCallback(() => {
    setNodes([]);
    setEdges([]);
    undoStack.current = [];
    redoStack.current = [];
    setCanUndo(false);
    setCanRedo(false);
  }, [setNodes, setEdges]);

  const handleIdentifyFundamentalConcepts = useCallback(async () => {
    if (nodes.length === 0) return;

    setIsProcessing(true);
    try {
      // Centrality calculation (simplified)
      const nodeCentrality: { [nodeId: string]: number } = {};
      nodes.forEach(node => {
        nodeCentrality[node.id] = 0;
      });

      edges.forEach(edge => {
        nodeCentrality[edge.source] = (nodeCentrality[edge.source] || 0) + 1;
        nodeCentrality[edge.target] = (nodeCentrality[edge.target] || 0) + 1;
      });

      const sortedNodes = Object.entries(nodeCentrality)
        .sort(([, centralityA], [, centralityB]) => centralityB - centralityA)
        .map(([nodeId]) => nodeId);

      // Set top 3 nodes as fundamental
      const numberOfFundamentalNodes = Math.min(3, nodes.length);
      const fundamentalNodes = sortedNodes.slice(0, numberOfFundamentalNodes);

      setNodes(prevNodes =>
        prevNodes.map(node => {
          return {
            ...node,
            data: {
              ...node.data,
              isFundamental: fundamentalNodes.includes(node.id),
            },
          };
        })
      );

      toast({
        title: "Fundamental Concepts Identified",
        description: "Key concepts have been marked based on their network centrality.",
      });
    } catch (error) {
      console.error('Failed to identify fundamental concepts:', error);
      toast({
        title: "Concept Identification Failed",
        description: "Unable to identify key concepts. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, [nodes, edges, toast]);

  const handleForceLayout = useCallback(() => {
    if (!reactFlowInstance) return;

    setIsLayouting(true);
    apply জোরceLayout(nodes, edges, setNodes, { width: 800, height: 600 });
    setIsLayouting(false);
  }, [nodes, edges, reactFlowInstance]);

  // Enhanced node enhancement with proper context
  const handleEnhanceNode = useCallback(async (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    console.log('🌟 Enhancing individual node:', node.data.label);
    
    try {
      setIsProcessing(true);
      
      // Get related nodes for context
      const relatedNodes = nodes.filter(n => n.id !== nodeId).map(n => ({
        label: n.data.label,
        messages: n.data.messages || []
      }));
      
      const enhanced = await aiService.enhanceNode(node.data, relatedNodes);
      
      setNodes(prevNodes => 
        prevNodes.map(n => 
          n.id === nodeId 
            ? { 
                ...n, 
                data: { 
                  ...n.data, 
                  ...enhanced,
                  enhanced: true,
                  enhancedAt: new Date().toISOString()
                } 
              }
            : n
        )
      );
      
      toast({
        title: "Node Enhanced Successfully",
        description: `"${node.data.label}" has been enhanced with detailed insights.`,
      });
      
    } catch (error) {
      console.error('Node enhancement failed:', error);
      toast({
        title: "Enhancement Failed",
        description: "Unable to enhance the node. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, [nodes, toast]);

  // Enhanced batch enhancement for all nodes
  const handleEnhanceAllNodes = useCallback(async () => {
    if (nodes.length === 0) return;
    
    console.log('🚀 Starting batch enhancement for all nodes...');
    
    try {
      setIsProcessing(true);
      
      const rootNode = nodes.find(n => n.data.parentId === undefined);
      const originalTopic = rootNode?.data.label || 'Mind Map';
      
      // Get all nodes data
      const nodeData = nodes.map(n => ({
        id: n.id,
        label: n.data.label,
        messages: n.data.messages || [],
        position: n.position
      }));
      
      const enhancedNodes = await aiService.enhanceAllNodes(nodeData, originalTopic);
      
      // Update nodes with enhanced data
      setNodes(prevNodes => 
        prevNodes.map(node => {
          const enhanced = enhancedNodes.find(e => e.id === node.id);
          if (enhanced) {
            return {
              ...node,
              data: {
                ...node.data,
                ...enhanced,
                enhanced: true,
                enhancedAt: new Date().toISOString()
              }
            };
          }
          return node;
        })
      );
      
      toast({
        title: "All Nodes Enhanced Successfully",
        description: `Enhanced ${enhancedNodes.length} nodes with detailed insights and actionable content.`,
      });
      
      // After enhancement, identify fundamental concepts
      setTimeout(() => {
        handleIdentifyFundamentalConcepts();
      }, 1000);
      
    } catch (error) {
      console.error('Batch enhancement failed:', error);
      toast({
        title: "Enhancement Failed",
        description: "Unable to enhance all nodes. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, [nodes, toast, handleIdentifyFundamentalConcepts]);

  useEffect(() => {
    const handleAddChildNodeEvent = (event: CustomEvent) => {
      addChildNode(event.detail.parentId);
    };

    const handleDuplicateNodeEvent = (event: CustomEvent) => {
      duplicateNode(event.detail.id);
    };

    const handleDeleteNodeEvent = (event: CustomEvent) => {
      deleteNode(event.detail.id);
    };

    const handleUpdateNodeEvent = (event: CustomEvent) => {
      updateNode(event.detail.id, event.detail.updates);
    };

    // Enhanced node events
    const handleEnhanceNodeEvent = (event: CustomEvent) => {
      handleEnhanceNode(event.detail.id);
    };
    
    window.addEventListener('addChildNode', handleAddChildNodeEvent as EventListener);
    window.addEventListener('duplicateNode', handleDuplicateNodeEvent as EventListener);
    window.addEventListener('deleteNode', handleDeleteNodeEvent as EventListener);
    window.addEventListener('updateNode', handleUpdateNodeEvent as EventListener);
    window.addEventListener('enhanceNode', handleEnhanceNodeEvent as EventListener);

    return () => {
      window.removeEventListener('addChildNode', handleAddChildNodeEvent as EventListener);
      window.removeEventListener('duplicateNode', handleDuplicateNodeEvent as EventListener);
      window.removeEventListener('deleteNode', handleDeleteNodeEvent as EventListener);
      window.removeEventListener('updateNode', handleUpdateNodeEvent as EventListener);
      window.removeEventListener('enhanceNode', handleEnhanceNodeEvent as EventListener);
    };
  }, [addChildNode, duplicateNode, deleteNode, updateNode, handleEnhanceNode]);

  return (
    <div className="w-full h-full flex flex-col">
      <MindMapToolbar
        onAddNode={onAddNode}
        onSave={onSave}
        onExport={onExport}
        onImport={onImport}
        onZoomIn={() => reactFlowInstance?.zoomIn()}
        onZoomOut={() => reactFlowInstance?.zoomOut()}
        onFitView={() => fitView()}
        onLayoutChange={onLayoutChange}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClearAll={handleClearAll}
        currentLayout={layout}
        canUndo={canUndo}
        canRedo={canRedo}
        nodeCount={nodes.length}
      />
      <div className="react-flow-wrapper w-full h-full flex-1" ref={rfWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChangeWithHistory}
          onEdgesChange={onEdgesChangeWithHistory}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          fitView
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          className="bg-gray-100 dark:bg-gray-950"
        >
          <Controls />
          <Background color="#444" variant="dots" />
        </ReactFlow>
      </div>
    </div>
  );
};

export default MindMapCanvas;
