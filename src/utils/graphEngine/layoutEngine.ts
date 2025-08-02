import { Node, Edge } from '@xyflow/react';
import { 
  BaseNodeData, 
  LayoutType, 
  LayoutConfig, 
  LayoutSuggestion,
  LayoutEngine 
} from './types';

export class MindMapLayoutEngine implements LayoutEngine {
  
  // Enhanced collision detection with better distance calculation
  private checkCollision(pos1: { x: number; y: number }, pos2: { x: number; y: number }, minDistance: number = 250): boolean {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < minDistance;
  }

  // Enhanced safe position finder with better distribution
  private findSafePosition(
    desiredPosition: { x: number; y: number },
    existingNodes: Node<BaseNodeData>[],
    minDistance: number = 250,
    maxAttempts: number = 200
  ): { x: number; y: number } {
    let currentPosition = { ...desiredPosition };
    let attempts = 0;
    
    // Dynamic minimum distance based on node density
    const nodeCount = existingNodes.length;
    const densityFactor = Math.max(0.6, Math.min(1.4, 1 - (nodeCount / 100)));
    const dynamicMinDistance = Math.max(200, Math.min(350, minDistance * densityFactor));
    
    // Expanded viewport bounds for better distribution
    const bounds = {
      minX: 50,
      maxX: 2500,
      minY: 50,
      maxY: 2000
    };
    
    while (attempts < maxAttempts) {
      let hasCollision = false;
      
      for (const node of existingNodes) {
        if (this.checkCollision(currentPosition, node.position, dynamicMinDistance)) {
          hasCollision = true;
          break;
        }
      }
      
      const withinBounds = currentPosition.x >= bounds.minX && 
                          currentPosition.x <= bounds.maxX && 
                          currentPosition.y >= bounds.minY && 
                          currentPosition.y <= bounds.maxY;
      
      if (!hasCollision && withinBounds) {
        return currentPosition;
      }
      
      // Improved spiral search with better distribution
      const angle = (attempts * 0.3) * Math.PI;
      const radius = dynamicMinDistance + (attempts * 20);
      currentPosition = {
        x: Math.max(bounds.minX, Math.min(bounds.maxX, desiredPosition.x + Math.cos(angle) * radius)),
        y: Math.max(bounds.minY, Math.min(bounds.maxY, desiredPosition.y + Math.sin(angle) * radius)),
      };
      attempts++;
    }
    
    // Enhanced fallback: try random positions in expanding circles
    for (let i = 0; i < 30; i++) {
      const randomAngle = Math.random() * 2 * Math.PI;
      const randomRadius = dynamicMinDistance + Math.random() * 300;
      const fallbackPosition = {
        x: Math.max(bounds.minX, Math.min(bounds.maxX, desiredPosition.x + Math.cos(randomAngle) * randomRadius)),
        y: Math.max(bounds.minY, Math.min(bounds.maxY, desiredPosition.y + Math.sin(randomAngle) * randomRadius)),
      };
      
      let isSafe = true;
      for (const node of existingNodes) {
        if (this.checkCollision(fallbackPosition, node.position, dynamicMinDistance)) {
          isSafe = false;
          break;
        }
      }
      
      if (isSafe) {
        return fallbackPosition;
      }
    }
    
    // Final fallback: offset in bounds with maximum separation
    return {
      x: Math.max(bounds.minX, Math.min(bounds.maxX, desiredPosition.x + (Math.random() - 0.5) * dynamicMinDistance * 2)),
      y: Math.max(bounds.minY, Math.min(bounds.maxY, desiredPosition.y + (Math.random() - 0.5) * dynamicMinDistance * 2)),
    };
  }

  // Enhanced node positioning with collision avoidance
  private positionNodeSafely(
    node: Node<BaseNodeData>,
    desiredPosition: { x: number; y: number },
    existingNodes: Node<BaseNodeData>[]
  ): void {
    const safePosition = this.findSafePosition(desiredPosition, existingNodes);
    node.position = safePosition;
  }

  // Enhanced overlap resolution for all nodes
  private resolveOverlaps(nodes: Node<BaseNodeData>[]): Node<BaseNodeData>[] {
    const nodeCount = nodes.length;
    const densityFactor = Math.max(0.7, Math.min(1.3, 1 - (nodeCount / 80)));
    const MIN_DISTANCE = Math.max(220, Math.min(320, 260 * densityFactor));
    
    let iterations = 0;
    const maxIterations = Math.min(15, Math.max(5, Math.floor(nodeCount / 8)));
    
    while (iterations < maxIterations) {
      let hasOverlaps = false;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          
          if (this.checkCollision(a.position, b.position, MIN_DISTANCE)) {
            hasOverlaps = true;
            
            // Calculate separation vector
            const dx = b.position.x - a.position.x;
            const dy = b.position.y - a.position.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const moveDist = (MIN_DISTANCE - dist) / 2 + 10;
            
            // Apply separation with damping for stability
            const damping = 0.7;
            const moveX = (dx / dist) * moveDist * damping;
            const moveY = (dy / dist) * moveDist * damping;
            
            // Move nodes apart
            b.position.x += moveX;
            b.position.y += moveY;
            a.position.x -= moveX;
            a.position.y -= moveY;
            
            // Keep nodes within bounds
            const bounds = {
              minX: 50,
              maxX: 2500,
              minY: 50,
              maxY: 2000
            };
            
            a.position.x = Math.max(bounds.minX, Math.min(bounds.maxX, a.position.x));
            a.position.y = Math.max(bounds.minY, Math.min(bounds.maxY, a.position.y));
            b.position.x = Math.max(bounds.minX, Math.min(bounds.maxX, b.position.x));
            b.position.y = Math.max(bounds.minY, Math.min(bounds.maxY, b.position.y));
          }
        }
      }
      
      if (!hasOverlaps) break;
      iterations++;
    }
    
    console.log(`🔧 Resolved overlaps in ${iterations} iterations`);
    return nodes;
  }

  // Calculate positions for different layout types
  calculatePositions(nodes: Node<BaseNodeData>[], edges: Edge[], config: LayoutConfig): Node<BaseNodeData>[] {
    console.log('🎯 Layout engine called with:', { 
      nodes: nodes.length, 
      edges: edges.length, 
      layout: config.type,
      spacing: config.spacing 
    });
    
    // Dynamic spacing based on node count
    const nodeCount = nodes.length;
    const densityFactor = Math.max(0.6, Math.min(1.4, 1 - (nodeCount / 50)));
    const { 
      type, 
      spacing = Math.max(80, Math.min(150, 100 * densityFactor)),
      nodeSize = { width: 200, height: 100 }, 
      padding = Math.max(30, Math.min(60, 40 * densityFactor))
    } = config;
    
    // Validate input
    if (!nodes || nodes.length === 0) {
      console.warn('⚠️ No nodes provided to layout engine');
      return [];
    }
    
    if (!Array.isArray(nodes)) {
      console.error('❌ Nodes must be an array');
      return [];
    }
    
    console.log('📊 Processing nodes:', nodes.map(n => ({ id: n.id, label: n.data.label })));
    
    let result: Node<BaseNodeData>[];
    
    try {
      switch (type) {
        case 'radial':
          result = this.calculateRadialLayout(nodes, edges, spacing, nodeSize, padding);
          break;
        case 'tree-horizontal':
          result = this.robustTreeLayout(nodes, edges, spacing, nodeSize, padding, 'horizontal');
          break;
        case 'tree-vertical':
          result = this.robustTreeLayout(nodes, edges, spacing, nodeSize, padding, 'vertical');
          break;
        case 'org-chart':
          result = this.robustOrgChartLayout(nodes, edges, spacing, nodeSize, padding);
          break;
        case 'flowchart':
          result = this.calculateFlowchartLayout(nodes, edges, spacing, nodeSize, padding);
          break;
        case 'organic':
          result = this.calculateOrganicLayout(nodes, edges, spacing, nodeSize, padding);
          break;
        case 'hierarchical':
          result = this.calculateHierarchicalLayout(nodes, edges, spacing, nodeSize, padding);
          break;
        case 'spiral':
          result = this.calculateSpiralLayout(nodes, edges, spacing, nodeSize, padding);
          break;
        case 'force-directed':
          result = this.calculateForceDirectedLayout(nodes, edges, spacing, nodeSize, padding);
          break;
        case 'hexagonal':
          result = this.calculateHexagonalLayout(nodes, edges, spacing, nodeSize, padding);
          break;
        case 'fractal':
          result = this.calculateFractalLayout(nodes, edges, spacing, nodeSize, padding);
          break;
        case 'galaxy':
          result = this.calculateGalaxyLayout(nodes, edges, spacing, nodeSize, padding);
          break;
        case 'neural':
          result = this.calculateNeuralLayout(nodes, edges, spacing, nodeSize, padding);
          break;
        case 'molecular':
          result = this.calculateMolecularLayout(nodes, edges, spacing, nodeSize, padding);
          break;
        case 'timeline':
          result = this.calculateTimelineLayout(nodes, edges, spacing, nodeSize, padding);
          break;
        case 'fishbone':
          result = this.calculateFishboneLayout(nodes, edges, spacing, nodeSize, padding);
          break;
        case 'brace':
          result = this.calculateBraceLayout(nodes, edges, spacing, nodeSize, padding);
          break;
        case 'freeform':
          console.log('🎨 Freeform layout - no positioning applied');
          result = [...nodes];
          break;
        default:
          console.warn(`⚠️ Unknown layout type: ${type}, using radial as fallback`);
          result = this.calculateRadialLayout(nodes, edges, spacing, nodeSize, padding);
      }
      
      // Apply overlap resolution to all layouts except freeform
      if (type !== 'freeform') {
        result = this.resolveOverlaps(result);
      }
      
      console.log(`✅ Layout ${type} applied successfully to ${result.length} nodes`);
      return result;
      
    } catch (error) {
      console.error('❌ Layout engine error:', error);
      return nodes; // Return original nodes on error
    }
  }

  // Smart layout suggestion engine
  suggestLayout(nodes: Node<BaseNodeData>[], edges: Edge[]): LayoutSuggestion[] {
    const suggestions: LayoutSuggestion[] = [];
    
    // Analyze hierarchy depth
    const maxDepth = this.getMaxHierarchyDepth(nodes, edges);
    if (maxDepth > 3) {
      suggestions.push({
        layout: 'tree-vertical',
        reason: `Deep hierarchy detected (${maxDepth} levels). Tree layout would improve readability.`,
        confidence: 0.8,
        trigger: 'hierarchy_depth'
      });
    }

    // Analyze cause-effect relationships (for fishbone)
    const causeEffectCount = this.getCauseEffectCount(nodes, edges);
    if (causeEffectCount > 5) {
      suggestions.push({
        layout: 'fishbone',
        reason: `Multiple cause-effect relationships detected (${causeEffectCount} causes). Fishbone diagram would be ideal.`,
        confidence: 0.9,
        trigger: 'cause_effect_count'
      });
    }

    // Analyze temporal relationships (for timeline)
    const temporalNodes = this.getTemporalNodes(nodes);
    if (temporalNodes.length > 3) {
      suggestions.push({
        layout: 'timeline',
        reason: `Temporal sequence detected (${temporalNodes.length} time-based nodes). Timeline layout would be perfect.`,
        confidence: 0.7,
        trigger: 'temporal_sequence'
      });
    }

    // Analyze process flow (for flowchart)
    const processFlowCount = this.getProcessFlowCount(nodes, edges);
    if (processFlowCount > 4) {
      suggestions.push({
        layout: 'flowchart',
        reason: `Process flow detected (${processFlowCount} process steps). Flowchart layout would be optimal.`,
        confidence: 0.8,
        trigger: 'process_flow'
      });
    }

    // Analyze organizational structure (for org chart)
    const orgStructureCount = this.getOrgStructureCount(nodes, edges);
    if (orgStructureCount > 3) {
      suggestions.push({
        layout: 'org-chart',
        reason: `Organizational structure detected (${orgStructureCount} reporting relationships). Org chart layout would be ideal.`,
        confidence: 0.8,
        trigger: 'org_structure'
      });
    }

    // Default suggestion for simple mind maps
    if (suggestions.length === 0 && nodes.length > 5) {
      suggestions.push({
        layout: 'radial',
        reason: 'Classic mind map structure. Radial layout provides good overview.',
        confidence: 0.6,
        trigger: 'default_radial'
      });
    }

    return suggestions.sort((a, b) => b.confidence - a.confidence);
  }

  // Validate if a layout is suitable for the current data
  validateLayout(nodes: Node<BaseNodeData>[], edges: Edge[], layout: LayoutType): boolean {
    switch (layout) {
      case 'timeline':
        return this.getTemporalNodes(nodes).length > 0;
      case 'fishbone':
        return this.getCauseEffectCount(nodes, edges) > 2;
      case 'flowchart':
        return this.getProcessFlowCount(nodes, edges) > 2;
      case 'org-chart':
        return this.getOrgStructureCount(nodes, edges) > 1;
      case 'brace':
        return this.getPartWholeCount(nodes, edges) > 2;
      default:
        return true; // Other layouts are generally suitable
    }
  }

  // Private helper methods for layout calculations
  private calculateRadialLayout(
    nodes: Node<BaseNodeData>[], 
    edges: Edge[], 
    spacing: number, 
    nodeSize: { width: number; height: number },
    padding: number
  ): Node<BaseNodeData>[] {
    console.log('🌐 Radial layout called with:', { nodes: nodes.length, edges: edges.length, spacing });
    
    const updatedNodes = [...nodes];
    const centerX = 800;
    const centerY = 600;
    
    // Enhanced dynamic radius calculation based on node count and density
    const nodeCount = nodes.length;
    const densityFactor = Math.max(0.6, Math.min(1.4, 1 - (nodeCount / 100)));
    const baseRadius = Math.max(120, Math.min(300, spacing * (1 + nodeCount / 15) * densityFactor));
    const ringSpacing = Math.max(50, Math.min(120, spacing * 0.6 * densityFactor));
    const nodesPerRing = Math.max(8, Math.min(16, Math.floor(Math.sqrt(nodeCount) * 2)));

    // Find the most connected node as root, or use the first node
    let rootNode = nodes[0];
    if (edges.length > 0) {
      const nodeConnections = new Map<string, number>();
      edges.forEach(edge => {
        nodeConnections.set(edge.source, (nodeConnections.get(edge.source) || 0) + 1);
        nodeConnections.set(edge.target, (nodeConnections.get(edge.target) || 0) + 1);
      });
      
      const mostConnected = Array.from(nodeConnections.entries())
        .sort(([,a], [,b]) => b - a)[0];
      
      if (mostConnected) {
        rootNode = nodes.find(n => n.id === mostConnected[0]) || nodes[0];
      }
    }

    console.log('🎯 Radial root node:', rootNode.id, rootNode.data.label);

    // Position root node at center
    const rootIndex = updatedNodes.findIndex(n => n.id === rootNode.id);
    if (rootIndex !== -1) {
      updatedNodes[rootIndex] = {
        ...updatedNodes[rootIndex],
        position: { x: centerX, y: centerY }
      };
    }

    // Position all other nodes in dynamic rings around root with collision avoidance
    const otherNodes = nodes.filter(n => n.id !== rootNode.id);
    const positionedNodes: Node<BaseNodeData>[] = [rootNode];
    
    otherNodes.forEach((node, index) => {
      const ringIndex = Math.floor(index / nodesPerRing);
      const positionInRing = index % nodesPerRing;
      const radius = baseRadius + (ringIndex * ringSpacing);
      
      // Distribute nodes evenly around each ring with better spacing
      const angleStep = (2 * Math.PI) / nodesPerRing;
      const angle = positionInRing * angleStep + (ringIndex * 0.2); // Reduced offset between rings
      
      const desiredX = centerX + radius * Math.cos(angle);
      const desiredY = centerY + radius * Math.sin(angle);

      // Use safe positioning to avoid overlaps
      const safePosition = this.findSafePosition(
        { x: desiredX, y: desiredY },
        positionedNodes,
        Math.max(200, Math.min(350, 250 * densityFactor))
      );

      const nodeIndex = updatedNodes.findIndex(n => n.id === node.id);
      if (nodeIndex !== -1) {
        updatedNodes[nodeIndex] = {
          ...updatedNodes[nodeIndex],
          position: safePosition
        };
        positionedNodes.push(updatedNodes[nodeIndex]);
      }
    });

    console.log('✅ Radial layout completed, positioned', updatedNodes.length, 'nodes in', Math.ceil(otherNodes.length / nodesPerRing), 'rings');
    return updatedNodes;
  }

  private calculateTreeLayout(
    nodes: Node<BaseNodeData>[], 
    edges: Edge[], 
    spacing: number, 
    nodeSize: { width: number; height: number },
    padding: number,
    direction: 'horizontal' | 'vertical'
  ): Node<BaseNodeData>[] {
    const updatedNodes = [...nodes];
    const startX = 100;
    const startY = 100;

    // Find the most connected node as root, or use the first node
    let rootNode = nodes[0];
    if (edges.length > 0) {
      const nodeConnections = new Map<string, number>();
      edges.forEach(edge => {
        nodeConnections.set(edge.source, (nodeConnections.get(edge.source) || 0) + 1);
        nodeConnections.set(edge.target, (nodeConnections.get(edge.target) || 0) + 1);
      });
      
      const mostConnected = Array.from(nodeConnections.entries())
        .sort(([,a], [,b]) => b - a)[0];
      
      if (mostConnected) {
        rootNode = nodes.find(n => n.id === mostConnected[0]) || nodes[0];
      }
    }

    // Position root node
    const rootIndex = updatedNodes.findIndex(n => n.id === rootNode.id);
    if (rootIndex !== -1) {
      updatedNodes[rootIndex] = {
        ...updatedNodes[rootIndex],
        position: { x: startX, y: startY }
      };
    }

    // Position all other nodes in a tree-like structure
    const otherNodes = nodes.filter(n => n.id !== rootNode.id);
    const nodesPerLevel = Math.ceil(Math.sqrt(otherNodes.length));
    
    otherNodes.forEach((node, index) => {
      const level = Math.floor(index / nodesPerLevel) + 1;
      const positionInLevel = index % nodesPerLevel;
      
      let x, y;
      if (direction === 'horizontal') {
        x = startX + (level * spacing);
        y = startY + (positionInLevel * spacing) - ((nodesPerLevel - 1) * spacing / 2);
      } else {
        x = startX + (positionInLevel * spacing) - ((nodesPerLevel - 1) * spacing / 2);
        y = startY + (level * spacing);
      }

      const nodeIndex = updatedNodes.findIndex(n => n.id === node.id);
      if (nodeIndex !== -1) {
        updatedNodes[nodeIndex] = {
          ...updatedNodes[nodeIndex],
          position: { x, y }
        };
      }
    });

    return updatedNodes;
  }

  private calculateFlowchartLayout(
    nodes: Node<BaseNodeData>[], 
    edges: Edge[], 
    spacing: number, 
    nodeSize: { width: number; height: number },
    padding: number
  ): Node<BaseNodeData>[] {
    console.log('📊 Flowchart layout called with:', { nodes: nodes.length, edges: edges.length, spacing });
    
    const updatedNodes = [...nodes];
    const startX = 100;
    const startY = 200;
    const horizontalSpacing = Math.min(nodeSize.width + spacing, 180);
    const verticalSpacing = Math.min(nodeSize.height + spacing, 120);

    // Find root node (node with no incoming edges)
    let rootNode = nodes[0];
    if (edges.length > 0) {
      const targetNodes = new Set(edges.map(e => e.target));
      const rootNodes = nodes.filter(n => !targetNodes.has(n.id));
      if (rootNodes.length > 0) {
        rootNode = rootNodes[0];
      }
    }

    console.log('🎯 Flowchart root node:', rootNode.id, rootNode.data.label);

    const visited = new Set<string>();
    let currentX = startX;
    let currentY = startY;
    let maxY = startY;

    function layoutFlow(nodeId: string, level: number) {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);

      const node = updatedNodes.find(n => n.id === nodeId);
      if (!node) return;

      // Position current node
      const nodeIndex = updatedNodes.findIndex(n => n.id === nodeId);
      if (nodeIndex !== -1) {
        updatedNodes[nodeIndex] = {
          ...updatedNodes[nodeIndex],
          position: { x: currentX, y: currentY }
        };
      }

      // Find children
      const children = edges.filter(e => e.source === nodeId).map(e => e.target);
      
      if (children.length > 0) {
        // Position children in next column
        const childX = currentX + horizontalSpacing;
        const totalHeight = children.length * verticalSpacing;
        let childY = currentY - (totalHeight / 2) + (verticalSpacing / 2);

        children.forEach(childId => {
          layoutFlow(childId, level + 1);
          const childNode = updatedNodes.find(n => n.id === childId);
          if (childNode) {
            const childIndex = updatedNodes.findIndex(n => n.id === childId);
            if (childIndex !== -1) {
              updatedNodes[childIndex] = {
                ...updatedNodes[childIndex],
                position: { x: childX, y: childY }
              };
            }
          }
          childY += verticalSpacing;
          maxY = Math.max(maxY, childY);
        });
      }

      // Move to next node in same level
      currentX += horizontalSpacing;
      if (currentX > 800) { // Wrap to next row
        currentX = startX;
        currentY = maxY + verticalSpacing;
        maxY = currentY;
      }
    }

    layoutFlow(rootNode.id, 0);

    // Handle disconnected nodes
    const connectedIds = new Set<string>();
    function collect(nodeId: string) {
      connectedIds.add(nodeId);
      edges.filter(e => e.source === nodeId).forEach(e => collect(e.target));
    }
    collect(rootNode.id);

    const disconnectedNodes = updatedNodes.filter(n => !connectedIds.has(n.id));
    console.log(`🔗 Found ${disconnectedNodes.length} disconnected nodes in flowchart`);

    if (disconnectedNodes.length > 0) {
      let clusterX = startX + 600;
      let clusterY = startY;

      disconnectedNodes.forEach((node, index) => {
        node.position = { x: clusterX, y: clusterY + index * verticalSpacing };
      });
    }

    console.log('✅ Flowchart layout completed, positioned', updatedNodes.length, 'nodes');
    return updatedNodes;
  }

  private calculateTimelineLayout(
    nodes: Node<BaseNodeData>[], 
    edges: Edge[], 
    spacing: number, 
    nodeSize: { width: number; height: number },
    padding: number
  ): Node<BaseNodeData>[] {
    console.log('⏰ Timeline layout called with:', { nodes: nodes.length, edges: edges.length, spacing });
    
    const temporalNodes = this.getTemporalNodes(nodes);
    const updatedNodes = [...nodes];
    const startX = 100;
    const startY = 200;
    const horizontalSpacing = Math.min(nodeSize.width + spacing, 180);

    console.log(`📅 Found ${temporalNodes.length} temporal nodes`);

    // Position temporal nodes in timeline
    temporalNodes.forEach((node, index) => {
      const nodeIndex = updatedNodes.findIndex(n => n.id === node.id);
      if (nodeIndex !== -1) {
        updatedNodes[nodeIndex] = {
          ...updatedNodes[nodeIndex],
          position: { x: startX + index * horizontalSpacing, y: startY }
        };
      }
    });

    // Position non-temporal nodes below timeline
    const nonTemporalNodes = nodes.filter(n => !temporalNodes.find(t => t.id === n.id));
    let clusterX = startX;
    let clusterY = startY + 200;

    nonTemporalNodes.forEach((node, index) => {
      const nodeIndex = updatedNodes.findIndex(n => n.id === node.id);
      if (nodeIndex !== -1) {
        updatedNodes[nodeIndex] = {
          ...updatedNodes[nodeIndex],
          position: { x: clusterX, y: clusterY }
        };
      }
      clusterX += horizontalSpacing;
      if (clusterX > 800) {
        clusterX = startX;
        clusterY += Math.min(nodeSize.height + spacing, 120);
      }
    });

    console.log('✅ Timeline layout completed, positioned', updatedNodes.length, 'nodes');
    return updatedNodes;
  }

  private calculateFishboneLayout(
    nodes: Node<BaseNodeData>[], 
    edges: Edge[], 
    spacing: number, 
    nodeSize: { width: number; height: number },
    padding: number
  ): Node<BaseNodeData>[] {
    console.log('🐟 Fishbone layout called with:', { nodes: nodes.length, edges: edges.length, spacing });
    
    const rootNode = nodes.find(n => !n.data.parentId) || nodes[0];
    if (!rootNode) {
      console.warn('⚠️ No root node found for fishbone layout, using first node');
      return nodes;
    }

    console.log('🎯 Fishbone root node:', rootNode.id, rootNode.data.label);

    const updatedNodes = [...nodes];
    const centerX = 400;
    const centerY = 300;
    const baseRadius = Math.min(spacing, 120);

    // Position root (problem) at center
    const rootIndex = updatedNodes.findIndex(n => n.id === rootNode.id);
    if (rootIndex !== -1) {
      updatedNodes[rootIndex] = {
        ...updatedNodes[rootIndex],
        position: { x: centerX, y: centerY }
      };
    }

    // Position causes on angled branches
    const causes = this.getChildren(rootNode.id, nodes, edges);
    const categories = ['people', 'process', 'equipment', 'environment', 'materials', 'measurement'];
    
    causes.forEach((cause, index) => {
      const category = categories[index % categories.length];
      const angle = (index * Math.PI / 3) - Math.PI / 2; // -90 to 90 degrees
      const radius = baseRadius;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      const causeIndex = updatedNodes.findIndex(n => n.id === cause.id);
      if (causeIndex !== -1) {
        updatedNodes[causeIndex] = {
          ...updatedNodes[causeIndex],
          position: { x, y }
        };
      }
    });

    // Handle disconnected nodes
    const connectedIds = new Set<string>();
    function collect(nodeId: string) {
      connectedIds.add(nodeId);
      edges.filter(e => e.source === nodeId).forEach(e => collect(e.target));
    }
    collect(rootNode.id);

    const disconnectedNodes = updatedNodes.filter(n => !connectedIds.has(n.id));
    console.log(`🔗 Found ${disconnectedNodes.length} disconnected nodes in fishbone layout`);

    if (disconnectedNodes.length > 0) {
      let clusterX = centerX + 300;
      let clusterY = centerY;

      disconnectedNodes.forEach((node, index) => {
        node.position = { x: clusterX, y: clusterY + index * Math.min(spacing, 100) };
      });
    }

    console.log('✅ Fishbone layout completed, positioned', updatedNodes.length, 'nodes');
    return updatedNodes;
  }

  private calculateBraceLayout(
    nodes: Node<BaseNodeData>[], 
    edges: Edge[], 
    spacing: number, 
    nodeSize: { width: number; height: number },
    padding: number
  ): Node<BaseNodeData>[] {
    console.log('📋 Brace layout called with:', { nodes: nodes.length, edges: edges.length, spacing });
    
    const updatedNodes = [...nodes];
    const startX = 100;
    const startY = 100;
    const horizontalSpacing = Math.min(nodeSize.width + spacing, 180);
    const verticalSpacing = Math.min(nodeSize.height + spacing, 120);

    nodes.forEach((node, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      
      const nodeIndex = updatedNodes.findIndex(n => n.id === node.id);
      if (nodeIndex !== -1) {
        updatedNodes[nodeIndex] = {
          ...updatedNodes[nodeIndex],
          position: { 
            x: startX + col * horizontalSpacing, 
            y: startY + row * verticalSpacing 
          }
        };
      }
    });

    console.log('✅ Brace layout completed, positioned', updatedNodes.length, 'nodes');
    return updatedNodes;
  }

  private calculateOrgChartLayout(
    nodes: Node<BaseNodeData>[], 
    edges: Edge[], 
    spacing: number, 
    nodeSize: { width: number; height: number },
    padding: number
  ): Node<BaseNodeData>[] {
    const rootNode = nodes.find(n => !n.data.parentId) || nodes[0];
    if (!rootNode) return nodes;

    const updatedNodes = [...nodes];
    const startX = 400;
    const startY = 100;

    // Position root (CEO/Manager)
    const rootIndex = updatedNodes.findIndex(n => n.id === rootNode.id);
    if (rootIndex !== -1) {
      updatedNodes[rootIndex] = {
        ...updatedNodes[rootIndex],
        position: { x: startX, y: startY }
      };
    }

    // Position subordinates
    const subordinates = this.getChildren(rootNode.id, nodes, edges);
    const totalWidth = subordinates.length * (nodeSize.width + spacing);
    let currentX = startX - totalWidth / 2;

    subordinates.forEach((subordinate, index) => {
      const subordinateIndex = updatedNodes.findIndex(n => n.id === subordinate.id);
      if (subordinateIndex !== -1) {
        updatedNodes[subordinateIndex] = {
          ...updatedNodes[subordinateIndex],
          position: { x: currentX, y: startY + nodeSize.height + spacing }
        };
      }
      currentX += nodeSize.width + spacing;
    });

    return updatedNodes;
  }

  // New layout calculation methods
  private calculateHierarchicalLayout(
    nodes: Node<BaseNodeData>[], 
    edges: Edge[], 
    spacing: number, 
    nodeSize: { width: number; height: number },
    padding: number
  ): Node<BaseNodeData>[] {
    console.log('🏗️ Hierarchical layout called with:', { nodes: nodes.length, edges: edges.length, spacing });
    
    const rootNode = nodes.find(n => !n.data.parentId) || nodes[0];
    if (!rootNode) {
      console.warn('⚠️ No root node found for hierarchical layout, using first node');
      return nodes;
    }

    console.log('🎯 Hierarchical root node:', rootNode.id, rootNode.data.label);

    const updatedNodes = [...nodes];
    const visited = new Set<string>();
    const levelHeight = Math.min(nodeSize.height + spacing, 120);
    const startX = 400;
    const startY = 100;

    const positionNode = (nodeId: string, level: number, siblingIndex: number, siblingsCount: number) => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);

      const node = nodes.find(n => n.id === nodeId);
      if (!node) return;

      const totalWidth = Math.max(800, siblingsCount * 200);
      const spacing = siblingsCount > 1 ? totalWidth / (siblingsCount - 1) : 0;
      const nodeX = startX - (totalWidth / 2) + (siblingIndex * spacing);

      const nodeIndex = updatedNodes.findIndex(n => n.id === nodeId);
      if (nodeIndex !== -1) {
        updatedNodes[nodeIndex] = {
          ...updatedNodes[nodeIndex],
          position: { x: nodeX, y: startY + (level * levelHeight) }
        };
      }

      const children = edges.filter(e => e.source === nodeId).map(e => e.target);
      children.forEach((childId, index) => {
        positionNode(childId, level + 1, index, children.length);
      });
    };

    positionNode(rootNode.id, 0, 0, 1);

    // Handle disconnected nodes
    const connectedIds = new Set<string>();
    function collect(nodeId: string) {
      connectedIds.add(nodeId);
      edges.filter(e => e.source === nodeId).forEach(e => collect(e.target));
    }
    collect(rootNode.id);

    const disconnectedNodes = updatedNodes.filter(n => !connectedIds.has(n.id));
    console.log(`🔗 Found ${disconnectedNodes.length} disconnected nodes in hierarchical layout`);

    if (disconnectedNodes.length > 0) {
      let clusterX = startX + 400;
      let clusterY = startY;

      disconnectedNodes.forEach((node, index) => {
        node.position = { x: clusterX, y: clusterY + index * levelHeight };
      });
    }

    console.log('✅ Hierarchical layout completed, positioned', updatedNodes.length, 'nodes');
    return updatedNodes;
  }

  private calculateOrganicLayout(
    nodes: Node<BaseNodeData>[], 
    edges: Edge[], 
    spacing: number, 
    nodeSize: { width: number; height: number },
    padding: number
  ): Node<BaseNodeData>[] {
    console.log('🌿 Organic layout called with:', { nodes: nodes.length, edges: edges.length, spacing });
    
    const updatedNodes = [...nodes];
    const rootNode = nodes.find(n => !n.data.parentId) || nodes[0];
    if (!rootNode) {
      console.warn('⚠️ No root node found for organic layout, using first node');
      return nodes;
    }

    console.log('🎯 Organic root node:', rootNode.id, rootNode.data.label);

    const centerX = 400;
    const centerY = 300;
    
    // Dynamic radius calculation based on node count
    const nodeCount = nodes.length;
    const baseRadius = Math.max(100, Math.min(250, spacing * (1 + nodeCount / 30)));
    const clusterSpacing = Math.max(40, Math.min(100, spacing * 0.6));

    // Position root node at center
    const rootIndex = updatedNodes.findIndex(n => n.id === rootNode.id);
    if (rootIndex !== -1) {
      updatedNodes[rootIndex] = {
        ...updatedNodes[rootIndex],
        position: { x: centerX, y: centerY }
      };
    }

    // Get all children of root and group by category
    const rootChildren = edges.filter(e => e.source === rootNode.id).map(e => e.target);
    const childNodes = nodes.filter(n => rootChildren.includes(n.id));

    // Group children by category
    const categoryGroups: { [key: string]: Node<BaseNodeData>[] } = {};
    childNodes.forEach(node => {
      const category = node.data.category || 'default';
      if (!categoryGroups[category]) {
        categoryGroups[category] = [];
      }
      categoryGroups[category].push(node);
    });

    // Position children by category in organized clusters
    let currentAngle = 0;
    Object.entries(categoryGroups).forEach(([category, categoryNodes]) => {
      const sectorAngle = (2 * Math.PI) / Math.max(Object.keys(categoryGroups).length, 1);
      const nodesPerCategory = categoryNodes.length;

      categoryNodes.forEach((node, categoryIndex) => {
        const angle = currentAngle + (categoryIndex / Math.max(nodesPerCategory, 1)) * sectorAngle * 0.8;
        const radius = baseRadius + (Math.random() * clusterSpacing * 0.3);
        const offsetX = (Math.random() - 0.5) * (clusterSpacing * 0.2);
        const offsetY = (Math.random() - 0.5) * (clusterSpacing * 0.2);

        const nodeIndex = updatedNodes.findIndex(n => n.id === node.id);
        if (nodeIndex !== -1) {
          updatedNodes[nodeIndex] = {
            ...updatedNodes[nodeIndex],
            position: {
              x: centerX + Math.cos(angle) * radius + offsetX,
              y: centerY + Math.sin(angle) * radius + offsetY,
            }
          };
        }
      });

      currentAngle += sectorAngle;
    });

    // Handle disconnected nodes
    const connectedIds = new Set<string>();
    function collect(nodeId: string) {
      connectedIds.add(nodeId);
      edges.filter(e => e.source === nodeId).forEach(e => collect(e.target));
    }
    collect(rootNode.id);

    const disconnectedNodes = updatedNodes.filter(n => !connectedIds.has(n.id));
    console.log(`🔗 Found ${disconnectedNodes.length} disconnected nodes in organic layout`);

    if (disconnectedNodes.length > 0) {
      let clusterX = centerX + 300;
      let clusterY = centerY;

      disconnectedNodes.forEach((node, index) => {
        node.position = { x: clusterX, y: clusterY + index * Math.min(spacing, 100) };
      });
    }

    console.log('✅ Organic layout completed, positioned', updatedNodes.length, 'nodes');
    return updatedNodes;
  }

  private calculateSpiralLayout(
    nodes: Node<BaseNodeData>[],
    edges: Edge[],
    spacing: number,
    nodeSize: { width: number; height: number },
    padding: number
  ): Node<BaseNodeData>[] {
    console.log('🌀 Spiral layout called with:', { nodes: nodes.length, edges: edges.length, spacing });
    const updatedNodes = [...nodes];
    const centerX = 400;
    const centerY = 300;
    const spiralSpacing = Math.min(spacing, 40);
    // Place root at center
    const rootNode = nodes.find(n => !n.data.parentId) || nodes[0];
    if (!rootNode) {
      console.warn('⚠️ No root node found for spiral layout, using first node');
      return nodes;
    }
    const rootIndex = updatedNodes.findIndex(n => n.id === rootNode.id);
    if (rootIndex !== -1) {
      updatedNodes[rootIndex].position = { x: centerX, y: centerY };
    }
    // Gather all nodes except root
    const otherNodes = nodes.filter(n => n.id !== rootNode.id);
    // Spiral: r = a + b*theta
    let a = 30;
    let b = spiralSpacing;
    for (let i = 0; i < otherNodes.length; i++) {
      const theta = i * 0.5;
      const r = a + b * theta;
      const x = centerX + Math.cos(theta) * r;
      const y = centerY + Math.sin(theta) * r;
      const node = otherNodes[i];
      const nodeIndex = updatedNodes.findIndex(n => n.id === node.id);
      if (nodeIndex !== -1) {
        updatedNodes[nodeIndex].position = { x, y };
      }
    }
    // Cluster disconnected nodes
    const connectedIds = new Set<string>();
    function collect(nodeId: string) {
      connectedIds.add(nodeId);
      edges.filter(e => e.source === nodeId).forEach(e => collect(e.target));
    }
    collect(rootNode.id);
    const disconnectedNodes = updatedNodes.filter(n => !connectedIds.has(n.id));
    if (disconnectedNodes.length > 0) {
      let clusterX = centerX + 300;
      let clusterY = centerY;
      disconnectedNodes.forEach((node, index) => {
        node.position = { x: clusterX, y: clusterY + index * Math.min(spacing, 100) };
      });
    }
    console.log('✅ Spiral layout completed, positioned', updatedNodes.length, 'nodes');
    return updatedNodes;
  }

  private calculateForceDirectedLayout(
    nodes: Node<BaseNodeData>[], 
    edges: Edge[], 
    spacing: number, 
    nodeSize: { width: number; height: number },
    padding: number
  ): Node<BaseNodeData>[] {
    console.log('⚡ Force-directed layout called with:', { nodes: nodes.length, edges: edges.length, spacing });
    
    const rootNode = nodes.find(n => !n.data.parentId) || nodes[0];
    if (!rootNode) {
      console.warn('⚠️ No root node found for force-directed layout, using first node');
      return nodes;
    }

    console.log('🎯 Force-directed root node:', rootNode.id, rootNode.data.label);

    const updatedNodes = [...nodes];
    const centerX = 400;
    const centerY = 300;

    // Position root at center
    const rootIndex = updatedNodes.findIndex(n => n.id === rootNode.id);
    if (rootIndex !== -1) {
      updatedNodes[rootIndex] = {
        ...updatedNodes[rootIndex],
        position: { x: centerX, y: centerY }
      };
    }

    const otherNodes = nodes.filter(n => n.id !== rootNode.id);

    // Group nodes by category for better initial positioning
    const categoryGroups: { [key: string]: Node<BaseNodeData>[] } = {};
    otherNodes.forEach(node => {
      const category = node.data.category || 'default';
      if (!categoryGroups[category]) {
        categoryGroups[category] = [];
      }
      categoryGroups[category].push(node);
    });

    // Initialize nodes by category in organized clusters
    let currentAngle = 0;
    Object.entries(categoryGroups).forEach(([category, categoryNodes]) => {
      const sectorAngle = (2 * Math.PI) / Math.max(Object.keys(categoryGroups).length, 1);

      categoryNodes.forEach((node, index) => {
        const angle = currentAngle + (index / Math.max(categoryNodes.length, 1)) * sectorAngle * 0.8;
        const radius = Math.min(spacing, 180) + (index * 20);

        const nodeIndex = updatedNodes.findIndex(n => n.id === node.id);
        if (nodeIndex !== -1) {
          updatedNodes[nodeIndex] = {
            ...updatedNodes[nodeIndex],
            position: {
              x: centerX + Math.cos(angle) * radius,
              y: centerY + Math.sin(angle) * radius,
            }
          };
        }
      });

      currentAngle += sectorAngle;
    });

    // Enhanced force-directed simulation
    const iterations = 50; // Reduced for performance
    const minDistance = Math.min(spacing, 100);

    for (let iter = 0; iter < iterations; iter++) {
      otherNodes.forEach((node, i) => {
        let fx = 0, fy = 0;

        // Repulsion from other nodes
        otherNodes.forEach((otherNode, j) => {
          if (i !== j) {
            const dx = node.position.x - otherNode.position.x;
            const dy = node.position.y - otherNode.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 0) {
              const force = distance < minDistance ? 1000 / (distance * distance) : 300 / (distance * distance);
              fx += (dx / distance) * force;
              fy += (dy / distance) * force;
            }
          }
        });

        // Attraction to root
        const dx = centerX - node.position.x;
        const dy = centerY - node.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 0) {
          const force = distance * 0.02;
          fx += (dx / distance) * force;
          fy += (dy / distance) * force;
        }

        // Apply forces with damping
        const damping = 0.03;
        const nodeIndex = updatedNodes.findIndex(n => n.id === node.id);
        if (nodeIndex !== -1) {
          updatedNodes[nodeIndex] = {
            ...updatedNodes[nodeIndex],
            position: {
              x: updatedNodes[nodeIndex].position.x + fx * damping,
              y: updatedNodes[nodeIndex].position.y + fy * damping,
            }
          };
        }
      });
    }

    console.log('✅ Force-directed layout completed, positioned', updatedNodes.length, 'nodes');
    return updatedNodes;
  }

  private calculateHexagonalLayout(
    nodes: Node<BaseNodeData>[],
    edges: Edge[],
    spacing: number,
    nodeSize: { width: number; height: number },
    padding: number
  ): Node<BaseNodeData>[] {
    console.log('🔷 Hexagonal layout called with:', { nodes: nodes.length, edges: edges.length, spacing });
    const updatedNodes = [...nodes];
    const centerX = 400;
    const centerY = 300;
    const hexSize = Math.min(spacing, 150);
    const rootNode = nodes.find(n => !n.data.parentId) || nodes[0];
    if (!rootNode) {
      console.warn('⚠️ No root node found for hexagonal layout, using first node');
      return nodes;
    }
    // Place root at center
    const rootIndex = updatedNodes.findIndex(n => n.id === rootNode.id);
    if (rootIndex !== -1) {
      updatedNodes[rootIndex].position = { x: centerX, y: centerY };
    }
    // Gather all nodes except root
    const otherNodes = nodes.filter(n => n.id !== rootNode.id);
    // Hex ring sizes: 6, 12, 18, ...
    let placed = 0;
    let ring = 1;
    let angleOffset = 0;
    while (placed < otherNodes.length) {
      const ringCount = 6 * ring;
      const radius = ring * hexSize * 1.2;
      for (let i = 0; i < ringCount && placed < otherNodes.length; i++, placed++) {
        const angle = angleOffset + (i * 2 * Math.PI) / ringCount;
        const node = otherNodes[placed];
        const nodeIndex = updatedNodes.findIndex(n => n.id === node.id);
        if (nodeIndex !== -1) {
          updatedNodes[nodeIndex].position = {
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius
          };
        }
      }
      ring++;
      angleOffset += Math.PI / 6; // Stagger rings
    }
    // Cluster disconnected nodes
    const connectedIds = new Set<string>();
    function collect(nodeId: string) {
      connectedIds.add(nodeId);
      edges.filter(e => e.source === nodeId).forEach(e => collect(e.target));
    }
    collect(rootNode.id);
    const disconnectedNodes = updatedNodes.filter(n => !connectedIds.has(n.id));
    if (disconnectedNodes.length > 0) {
      let clusterX = centerX + 300;
      let clusterY = centerY;
      disconnectedNodes.forEach((node, index) => {
        node.position = { x: clusterX, y: clusterY + index * Math.min(spacing, 100) };
      });
    }
    console.log('✅ Hexagonal layout completed, positioned', updatedNodes.length, 'nodes');
    return updatedNodes;
  }

  private calculateFractalLayout(
    nodes: Node<BaseNodeData>[],
    edges: Edge[],
    spacing: number,
    nodeSize: { width: number; height: number },
    padding: number
  ): Node<BaseNodeData>[] {
    console.log('🌿 Fractal layout called with:', { nodes: nodes.length, edges: edges.length, spacing });
    const updatedNodes = [...nodes];
    const centerX = 400;
    const centerY = 300;
    const baseRadius = Math.min(spacing, 150);
    const rootNode = nodes.find(n => !n.data.parentId) || nodes[0];
    if (!rootNode) {
      console.warn('⚠️ No root node found for fractal layout, using first node');
      return nodes;
    }
    // Place root at center
    const rootIndex = updatedNodes.findIndex(n => n.id === rootNode.id);
    if (rootIndex !== -1) {
      updatedNodes[rootIndex].position = { x: centerX, y: centerY };
    }
    // Place all other nodes in expanding spiral rings
    const otherNodes = nodes.filter(n => n.id !== rootNode.id);
    let placed = 0;
    let ring = 1;
    let angleOffset = 0;
    while (placed < otherNodes.length) {
      const ringCount = 6 * ring;
      const radius = baseRadius * Math.pow(1.5, ring);
      for (let i = 0; i < ringCount && placed < otherNodes.length; i++, placed++) {
        const angle = angleOffset + (i * 2 * Math.PI) / ringCount + (ring * 0.3);
        const node = otherNodes[placed];
        const nodeIndex = updatedNodes.findIndex(n => n.id === node.id);
        if (nodeIndex !== -1) {
          updatedNodes[nodeIndex].position = {
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius
          };
        }
      }
      ring++;
      angleOffset += Math.PI / 6;
    }
    // Cluster disconnected nodes
    const connectedIds = new Set<string>();
    function collect(nodeId: string) {
      connectedIds.add(nodeId);
      edges.filter(e => e.source === nodeId).forEach(e => collect(e.target));
    }
    collect(rootNode.id);
    const disconnectedNodes = updatedNodes.filter(n => !connectedIds.has(n.id));
    if (disconnectedNodes.length > 0) {
      let clusterX = centerX + 300;
      let clusterY = centerY;
      disconnectedNodes.forEach((node, index) => {
        node.position = { x: clusterX, y: clusterY + index * Math.min(spacing, 100) };
      });
    }
    console.log('✅ Fractal layout completed, positioned', updatedNodes.length, 'nodes');
    return updatedNodes;
  }

  private calculateGalaxyLayout(
    nodes: Node<BaseNodeData>[],
    edges: Edge[],
    spacing: number,
    nodeSize: { width: number; height: number },
    padding: number
  ): Node<BaseNodeData>[] {
    console.log('🌌 Galaxy layout called with:', { nodes: nodes.length, edges: edges.length, spacing });
    const updatedNodes = [...nodes];
    const centerX = 400;
    const centerY = 300;
    const baseRadius = Math.min(spacing, 100);
    const rootNode = nodes.find(n => !n.data.parentId) || nodes[0];
    if (!rootNode) {
      console.warn('⚠️ No root node found for galaxy layout, using first node');
      return nodes;
    }
    // Place root at center
    const rootIndex = updatedNodes.findIndex(n => n.id === rootNode.id);
    if (rootIndex !== -1) {
      updatedNodes[rootIndex].position = { x: centerX, y: centerY };
    }
    // Place all other nodes in expanding spiral arms
    const otherNodes = nodes.filter(n => n.id !== rootNode.id);
    let placed = 0;
    let armCount = 4;
    let arms: number[][] = Array.from({ length: armCount }, () => []);
    // Distribute nodes into arms
    for (let i = 0; i < otherNodes.length; i++) {
      arms[i % armCount].push(i);
    }
    let maxArmLen = Math.max(...arms.map(a => a.length));
    for (let arm = 0; arm < armCount; arm++) {
      for (let i = 0; i < arms[arm].length; i++) {
        const idx = arms[arm][i];
        const angle = (arm * (2 * Math.PI) / armCount) + (i * 0.25);
        const radius = baseRadius + (i * 40);
        const spiralOffset = Math.sin(i * 0.5 + arm) * 30;
        const node = otherNodes[idx];
        const nodeIndex = updatedNodes.findIndex(n => n.id === node.id);
        if (nodeIndex !== -1) {
          updatedNodes[nodeIndex].position = {
            x: centerX + Math.cos(angle) * radius + spiralOffset,
            y: centerY + Math.sin(angle) * radius + spiralOffset
          };
        }
      }
    }
    // Cluster disconnected nodes
    const connectedIds = new Set<string>();
    function collect(nodeId: string) {
      connectedIds.add(nodeId);
      edges.filter(e => e.source === nodeId).forEach(e => collect(e.target));
    }
    collect(rootNode.id);
    const disconnectedNodes = updatedNodes.filter(n => !connectedIds.has(n.id));
    if (disconnectedNodes.length > 0) {
      let clusterX = centerX + 300;
      let clusterY = centerY;
      disconnectedNodes.forEach((node, index) => {
        node.position = { x: clusterX, y: clusterY + index * Math.min(spacing, 100) };
      });
    }
    console.log('✅ Galaxy layout completed, positioned', updatedNodes.length, 'nodes');
    return updatedNodes;
  }

  private calculateNeuralLayout(
    nodes: Node<BaseNodeData>[], 
    edges: Edge[], 
    spacing: number, 
    nodeSize: { width: number; height: number },
    padding: number
  ): Node<BaseNodeData>[] {
    console.log('🧠 Neural layout called with:', { nodes: nodes.length, edges: edges.length, spacing });
    
    const rootNode = nodes.find(n => !n.data.parentId) || nodes[0];
    if (!rootNode) {
      console.warn('⚠️ No root node found for neural layout, using first node');
      return nodes;
    }

    console.log('🎯 Neural root node:', rootNode.id, rootNode.data.label);

    const updatedNodes = [...nodes];
    const centerX = 400;
    const centerY = 300;
    const baseRadius = Math.min(spacing, 180);

    // Position root node at center
    const rootIndex = updatedNodes.findIndex(n => n.id === rootNode.id);
    if (rootIndex !== -1) {
      updatedNodes[rootIndex] = {
        ...updatedNodes[rootIndex],
        position: { x: centerX, y: centerY }
      };
    }

    // Get all children of root and group by category
    const rootChildren = edges.filter(e => e.source === rootNode.id).map(e => e.target);
    const childNodes = nodes.filter(n => rootChildren.includes(n.id));

    // Group children by category
    const categoryGroups: { [key: string]: Node<BaseNodeData>[] } = {};
    childNodes.forEach(node => {
      const category = node.data.category || 'default';
      if (!categoryGroups[category]) {
        categoryGroups[category] = [];
      }
      categoryGroups[category].push(node);
    });

    // Position children in neural network pattern
    let currentAngle = 0;
    Object.entries(categoryGroups).forEach(([category, categoryNodes]) => {
      const sectorAngle = (2 * Math.PI) / Math.max(Object.keys(categoryGroups).length, 1);

      categoryNodes.forEach((node, index) => {
        const angle = currentAngle + (index / Math.max(categoryNodes.length, 1)) * sectorAngle * 0.7;
        const radius = baseRadius + (Math.random() * 60);
        const neuralOffset = Math.sin(index * 0.7) * 40;

        const nodeIndex = updatedNodes.findIndex(n => n.id === node.id);
        if (nodeIndex !== -1) {
          updatedNodes[nodeIndex] = {
            ...updatedNodes[nodeIndex],
            position: {
              x: centerX + Math.cos(angle) * radius + neuralOffset,
              y: centerY + Math.sin(angle) * radius + neuralOffset,
            }
          };
        }
      });

      currentAngle += sectorAngle;
    });

    // Handle disconnected nodes
    const connectedIds = new Set<string>();
    function collect(nodeId: string) {
      connectedIds.add(nodeId);
      edges.filter(e => e.source === nodeId).forEach(e => collect(e.target));
    }
    collect(rootNode.id);

    const disconnectedNodes = updatedNodes.filter(n => !connectedIds.has(n.id));
    console.log(`🔗 Found ${disconnectedNodes.length} disconnected nodes in neural layout`);

    if (disconnectedNodes.length > 0) {
      let clusterX = centerX + 300;
      let clusterY = centerY;

      disconnectedNodes.forEach((node, index) => {
        node.position = { x: clusterX, y: clusterY + index * Math.min(spacing, 100) };
      });
    }

    console.log('✅ Neural layout completed, positioned', updatedNodes.length, 'nodes');
    return updatedNodes;
  }

  private calculateMolecularLayout(
    nodes: Node<BaseNodeData>[], 
    edges: Edge[], 
    spacing: number, 
    nodeSize: { width: number; height: number },
    padding: number
  ): Node<BaseNodeData>[] {
    console.log('⚛️ Molecular layout called with:', { nodes: nodes.length, edges: edges.length, spacing });
    
    const rootNode = nodes.find(n => !n.data.parentId) || nodes[0];
    if (!rootNode) {
      console.warn('⚠️ No root node found for molecular layout, using first node');
      return nodes;
    }

    console.log('🎯 Molecular root node:', rootNode.id, rootNode.data.label);

    const updatedNodes = [...nodes];
    const centerX = 400;
    const centerY = 300;
    const baseRadius = Math.min(spacing, 140);

    // Position root node at center
    const rootIndex = updatedNodes.findIndex(n => n.id === rootNode.id);
    if (rootIndex !== -1) {
      updatedNodes[rootIndex] = {
        ...updatedNodes[rootIndex],
        position: { x: centerX, y: centerY }
      };
    }

    // Get all children of root and group by category
    const rootChildren = edges.filter(e => e.source === rootNode.id).map(e => e.target);
    const childNodes = nodes.filter(n => rootChildren.includes(n.id));

    // Group children by category
    const categoryGroups: { [key: string]: Node<BaseNodeData>[] } = {};
    childNodes.forEach(node => {
      const category = node.data.category || 'default';
      if (!categoryGroups[category]) {
        categoryGroups[category] = [];
      }
      categoryGroups[category].push(node);
    });

    // Position children in molecular pattern
    let currentIndex = 0;
    Object.entries(categoryGroups).forEach(([category, categoryNodes]) => {
      categoryNodes.forEach((node, categoryIndex) => {
        const angle = currentIndex * 1.2;
        const radius = baseRadius + (Math.floor(currentIndex / 4) * 80);
        const molecularOffset = Math.cos(currentIndex * 0.8) * 35;

        const nodeIndex = updatedNodes.findIndex(n => n.id === node.id);
        if (nodeIndex !== -1) {
          updatedNodes[nodeIndex] = {
            ...updatedNodes[nodeIndex],
            position: {
              x: centerX + Math.cos(angle) * radius + molecularOffset,
              y: centerY + Math.sin(angle) * radius + molecularOffset,
            }
          };
        }
        currentIndex++;
      });
    });

    // Handle disconnected nodes
    const connectedIds = new Set<string>();
    function collect(nodeId: string) {
      connectedIds.add(nodeId);
      edges.filter(e => e.source === nodeId).forEach(e => collect(e.target));
    }
    collect(rootNode.id);

    const disconnectedNodes = updatedNodes.filter(n => !connectedIds.has(n.id));
    console.log(`🔗 Found ${disconnectedNodes.length} disconnected nodes in molecular layout`);

    if (disconnectedNodes.length > 0) {
      let clusterX = centerX + 300;
      let clusterY = centerY;

      disconnectedNodes.forEach((node, index) => {
        node.position = { x: clusterX, y: clusterY + index * Math.min(spacing, 100) };
      });
    }

    console.log('✅ Molecular layout completed, positioned', updatedNodes.length, 'nodes');
    return updatedNodes;
  }

  // Robust, industry-standard recursive tree layout
  private robustTreeLayout(
    nodes: Node<BaseNodeData>[],
    edges: Edge[],
    spacing: number,
    nodeSize: { width: number; height: number },
    padding: number,
    direction: 'horizontal' | 'vertical'
  ): Node<BaseNodeData>[] {
    console.log('🌳 Robust tree layout called with:', { nodes: nodes.length, edges: edges.length, spacing, direction });
    
    const updatedNodes = [...nodes];
    const rootNode = nodes.find(n => !n.data.parentId) || nodes[0];
    if (!rootNode) {
      console.warn('⚠️ No root node found, using first node');
      return nodes;
    }
    
    console.log('🎯 Root node:', rootNode.id, rootNode.data.label);
    
    // Dynamic spacing based on node count and density
    const nodeCount = nodes.length;
    const densityFactor = Math.max(0.5, Math.min(1.5, 1 - (nodeCount / 100)));
    const VERTICAL_SPACING = Math.min(nodeSize.height + spacing * densityFactor, 100);
    const HORIZONTAL_SPACING = Math.min(nodeSize.width + spacing * densityFactor, 150);
    const startX = 400;
    const startY = 200;
    
    const visited = new Set<string>();
    
    function layout(nodeId: string, x: number, y: number, level: number): number {
      if (visited.has(nodeId)) return 0;
      visited.add(nodeId);
      
      const node = updatedNodes.find(n => n.id === nodeId);
      if (!node) {
        console.warn('⚠️ Node not found:', nodeId);
        return 0;
      }
      
      const children = edges.filter(e => e.source === nodeId).map(e => e.target);
      console.log(`📦 Node ${nodeId} has ${children.length} children`);
      
      let subtreeWidth = 0;
      
      if (children.length === 0) {
        // Leaf node
        node.position = direction === 'horizontal'
          ? { x, y: y + level * VERTICAL_SPACING }
          : { x: x + level * HORIZONTAL_SPACING, y };
        return direction === 'horizontal' ? nodeSize.width : nodeSize.height;
      }
      
      // Position children first
      let childX = x;
      let childY = y;
      const childWidths: number[] = [];
      
      children.forEach((childId, i) => {
        const childWidth = layout(
          childId,
          direction === 'horizontal' ? childX : x,
          direction === 'horizontal' ? y : childY,
          level + 1
        );
        childWidths.push(childWidth);
        
        if (direction === 'horizontal') {
          childX += childWidth + spacing;
        } else {
          childY += childWidth + spacing;
        }
        subtreeWidth += childWidth + spacing;
      });
      
      // Remove extra spacing from last child
      if (children.length > 0) {
        subtreeWidth -= spacing;
      }
      
      // Center parent above/beside children
      if (direction === 'horizontal') {
        const firstChild = updatedNodes.find(n => n.id === children[0]);
        const lastChild = updatedNodes.find(n => n.id === children[children.length - 1]);
        if (firstChild && lastChild) {
          const centerX = (firstChild.position.x + lastChild.position.x) / 2;
          node.position = { x: centerX, y: y + level * VERTICAL_SPACING };
        } else {
          node.position = { x, y: y + level * VERTICAL_SPACING };
        }
      } else {
        const firstChild = updatedNodes.find(n => n.id === children[0]);
        const lastChild = updatedNodes.find(n => n.id === children[children.length - 1]);
        if (firstChild && lastChild) {
          const centerY = (firstChild.position.y + lastChild.position.y) / 2;
          node.position = { x: x + level * HORIZONTAL_SPACING, y: centerY };
        } else {
          node.position = { x: x + level * HORIZONTAL_SPACING, y };
        }
      }
      
      return Math.max(subtreeWidth, direction === 'horizontal' ? nodeSize.width : nodeSize.height);
    }
    
    layout(rootNode.id, startX, startY, 0);
    
    // Handle disconnected nodes - cluster them together
    const connectedIds = new Set<string>();
    function collect(nodeId: string) {
      connectedIds.add(nodeId);
      edges.filter(e => e.source === nodeId).forEach(e => collect(e.target));
    }
    collect(rootNode.id);
    
    const disconnectedNodes = updatedNodes.filter(n => !connectedIds.has(n.id));
    console.log(`🔗 Found ${disconnectedNodes.length} disconnected nodes`);
    
    if (disconnectedNodes.length > 0) {
      let clusterX = startX + 400;
      let clusterY = startY;
      
      disconnectedNodes.forEach((node, index) => {
        node.position = { x: clusterX, y: clusterY + index * VERTICAL_SPACING };
      });
    }
    
    console.log('✅ Tree layout completed, positioned', updatedNodes.length, 'nodes');
    return updatedNodes;
  }

  // Robust, industry-standard org chart layout
  private robustOrgChartLayout(
    nodes: Node<BaseNodeData>[],
    edges: Edge[],
    spacing: number,
    nodeSize: { width: number; height: number },
    padding: number
  ): Node<BaseNodeData>[] {
    console.log('🏢 Robust org chart layout called with:', { nodes: nodes.length, edges: edges.length, spacing });
    
    const updatedNodes = [...nodes];
    const rootNode = nodes.find(n => !n.data.parentId) || nodes[0];
    if (!rootNode) {
      console.warn('⚠️ No root node found for org chart, using first node');
      return nodes;
    }
    
    console.log('👑 Root node (CEO):', rootNode.id, rootNode.data.label);
    
    // Use more reasonable spacing
    const VERTICAL_SPACING = Math.min(nodeSize.height + spacing, 120);
    const HORIZONTAL_SPACING = Math.min(nodeSize.width + spacing, 180);
    const startX = 400;
    const startY = 100;
    
    const visited = new Set<string>();
    
    function layout(nodeId: string, x: number, y: number): number {
      if (visited.has(nodeId)) return 0;
      visited.add(nodeId);
      
      const node = updatedNodes.find(n => n.id === nodeId);
      if (!node) {
        console.warn('⚠️ Node not found in org chart:', nodeId);
        return 0;
      }
      
      const children = edges.filter(e => e.source === nodeId).map(e => e.target);
      console.log(`👥 Manager ${nodeId} has ${children.length} subordinates`);
      
      let totalWidth = 0;
      const childWidths: number[] = [];
      
      // Calculate widths of all children first
      children.forEach(childId => {
        const width = layout(childId, 0, 0); // Temporary positioning
        childWidths.push(width);
        totalWidth += width + HORIZONTAL_SPACING;
      });
      
      // Remove extra spacing from last child
      if (children.length > 0) {
        totalWidth -= HORIZONTAL_SPACING;
      }
      
      // Ensure minimum width
      totalWidth = Math.max(totalWidth, nodeSize.width);
      
      // Position children evenly
      let childX = x - totalWidth / 2;
      children.forEach((childId, i) => {
        const childNode = updatedNodes.find(n => n.id === childId);
        if (childNode) {
          childNode.position = { 
            x: childX + childWidths[i] / 2, 
            y: y + VERTICAL_SPACING 
          };
        }
        childX += childWidths[i] + HORIZONTAL_SPACING;
      });
      
      // Position current node
      node.position = { x, y };
      
      return totalWidth;
    }
    
    layout(rootNode.id, startX, startY);
    
    // Handle disconnected nodes
    const connectedIds = new Set<string>();
    function collect(nodeId: string) {
      connectedIds.add(nodeId);
      edges.filter(e => e.source === nodeId).forEach(e => collect(e.target));
    }
    collect(rootNode.id);
    
    const disconnectedNodes = updatedNodes.filter(n => !connectedIds.has(n.id));
    console.log(`🔗 Found ${disconnectedNodes.length} disconnected nodes in org chart`);
    
    if (disconnectedNodes.length > 0) {
      let clusterX = startX + 400;
      let clusterY = startY;
      
      disconnectedNodes.forEach((node, index) => {
        node.position = { x: clusterX, y: clusterY + index * VERTICAL_SPACING };
      });
    }
    
    console.log('✅ Org chart layout completed, positioned', updatedNodes.length, 'nodes');
    return updatedNodes;
  }

  // Helper methods for analysis
  private getChildren(parentId: string, nodes: Node<BaseNodeData>[], edges: Edge[]): Node<BaseNodeData>[] {
    const childIds = edges
      .filter(edge => edge.source === parentId)
      .map(edge => edge.target);
    return nodes.filter(node => childIds.includes(node.id));
  }

  private getMaxHierarchyDepth(nodes: Node<BaseNodeData>[], edges: Edge[]): number {
    const visited = new Set<string>();
    let maxDepth = 0;

    const dfs = (nodeId: string, depth: number) => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);
      maxDepth = Math.max(maxDepth, depth);

      const children = edges
        .filter(edge => edge.source === nodeId)
        .map(edge => edge.target);

      children.forEach(childId => {
        dfs(childId, depth + 1);
      });
    };

    const rootNodes = nodes.filter(node => !node.data.parentId);
    rootNodes.forEach(root => dfs(root.id, 0));

    return maxDepth;
  }

  private getCauseEffectCount(nodes: Node<BaseNodeData>[], edges: Edge[]): number {
    return edges.filter(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      return sourceNode && targetNode && 
             (sourceNode.data.category === 'cause' || targetNode.data.category === 'effect');
    }).length;
  }

  private getTemporalNodes(nodes: Node<BaseNodeData>[]): Node<BaseNodeData>[] {
    return nodes.filter(node => 
      node.data.date || 
      node.data.time || 
      node.data.duration ||
      node.data.milestone ||
      node.data.label.toLowerCase().includes('date') ||
      node.data.label.toLowerCase().includes('time') ||
      node.data.label.toLowerCase().includes('when')
    );
  }

  private getProcessFlowCount(nodes: Node<BaseNodeData>[], edges: Edge[]): number {
    return nodes.filter(node => 
      node.data.category === 'process' ||
      node.data.label.toLowerCase().includes('step') ||
      node.data.label.toLowerCase().includes('process') ||
      node.data.label.toLowerCase().includes('action')
    ).length;
  }

  private getOrgStructureCount(nodes: Node<BaseNodeData>[], edges: Edge[]): number {
    return nodes.filter(node => 
      node.data.role ||
      node.data.department ||
      node.data.reportsTo ||
      node.data.label.toLowerCase().includes('manager') ||
      node.data.label.toLowerCase().includes('director') ||
      node.data.label.toLowerCase().includes('ceo') ||
      node.data.label.toLowerCase().includes('employee')
    ).length;
  }

  private getPartWholeCount(nodes: Node<BaseNodeData>[], edges: Edge[]): number {
    return nodes.filter(node => 
      node.data.partOf ||
      node.data.group ||
      node.data.label.toLowerCase().includes('part') ||
      node.data.label.toLowerCase().includes('component') ||
      node.data.label.toLowerCase().includes('element')
    ).length;
  }

  private positionTreeChildren(
    parentId: string,
    nodes: Node<BaseNodeData>[],
    edges: Edge[],
    updatedNodes: Node<BaseNodeData>[],
    parentX: number,
    parentY: number,
    spacing: number,
    direction: 'horizontal' | 'vertical'
  ): void {
    const children = this.getChildren(parentId, nodes, edges);
    if (children.length === 0) return;

    const totalWidth = children.length * 200;
    let currentX = parentX - totalWidth / 2;
    const childY = parentY + spacing;

    children.forEach((child, index) => {
      const childIndex = updatedNodes.findIndex(n => n.id === child.id);
      if (childIndex !== -1) {
        updatedNodes[childIndex] = {
          ...updatedNodes[childIndex],
          position: { x: currentX, y: childY }
        };
      }
      currentX += 200;
    });
  }
}

// Export singleton instance
export const layoutEngine = new MindMapLayoutEngine(); 