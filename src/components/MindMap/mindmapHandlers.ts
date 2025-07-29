import { Node, Edge } from '@xyflow/react';
import getContextualColor from '../../utils/getContextualColor';

export const handleAddNode = async (
  nodes: Node<any>[],
  edges: Edge[],
  setNodes: (nodes: Node<any>[]) => void,
  setEdges: (edges: Edge[]) => void,
  addToHistory: (nodes: Node<any>[], edges: Edge[]) => void,
  reactFlowInstance: any,
  parentId?: string,
  explicitColor?: string
) => {
  const parentNode = parentId ? nodes.find(n => n.id === parentId) : null;
  let newPosition;
  if (parentNode) {
    // ... (copy positioning logic from MindMapCanvas)
  } else {
    // ... (copy root positioning logic)
  }
  // ...
  const inheritedColor = explicitColor || parentNode?.data.color || getContextualColor('general');
  const newNode: Node<any> = {
    id: `${Date.now()}`,
    type: 'mindMapNode',
    position: newPosition,
    data: {
      label: 'New Node',
      color: inheritedColor,
      fontSize: parentNode ? 13 : 14,
      parentId: parentId,
      category: 'general',
      messages: [],
      opacity: 1,
      aiGenerated: false,
      importance: parentNode ? 5 : 7
    },
  };
  const newNodes = [...nodes, newNode];
  setNodes(newNodes);
  if (parentId) {
    const parentColor = parentNode?.data.color || 'hsl(267 85% 66%)';
    const childColor = inheritedColor;
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
        targetColor: childColor,
        gradient: parentColor !== childColor
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
};

// Event handlers extracted from MindMapCanvas.tsx
export function createHandleUpdateNode(nodes, edges, setNodes, addToHistory) {
  return function handleUpdateNode(event) {
    const { id, updates } = event.detail;
    const updatedNodes = nodes.map((node) =>
      node.id === id ? { ...node, data: { ...node.data, ...updates } } : node
    );
    setNodes(updatedNodes);
    addToHistory(updatedNodes, edges);
  };
}

export function createHandleDeleteNode(nodes, edges, setNodes, setEdges, addToHistory) {
  return function handleDeleteNode(event) {
    const { id } = event.detail;
    const updatedNodes = nodes.filter((node) => node.id !== id);
    const updatedEdges = edges.filter((edge) => edge.source !== id && edge.target !== id);
    setNodes(updatedNodes);
    setEdges(updatedEdges);
    addToHistory(updatedNodes, updatedEdges);
  };
}

export function createHandleAddChildNode(handleAddNode) {
  return function handleAddChildNode(event) {
    const { parentId } = event.detail;
    handleAddNode(parentId);
  };
}

export function createHandleDuplicateNode(nodes, setNodes, addToHistory, edges) {
  return function handleDuplicateNode(event) {
    const { id } = event.detail;
    const nodeToClone = nodes.find(n => n.id === id);
    if (nodeToClone) {
      const newNode = {
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
      const newNodes = [...nodes, newNode];
      setNodes(newNodes);
      addToHistory(newNodes, edges);
    }
  };
}

export function createHandleGenerateBranches(handleGenerateRelatedNodes) {
  return function handleGenerateBranches(event) {
    const { id, label } = event.detail;
    handleGenerateRelatedNodes(label, id);
  };
} 