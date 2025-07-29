import { Node, Edge } from '@xyflow/react';

// Base node data interface that all layouts extend
export interface BaseNodeData {
  label: string;
  color?: string;
  fontSize?: number;
  icon?: string;
  isEditing?: boolean;
  parentId?: string;
  tags?: string[];
  priority?: 'low' | 'medium' | 'high';
  isCompleted?: boolean;
  category?: string;
  messages?: string[];
  opacity?: number;
  scale?: number;
  isFundamental?: boolean;
  complexity?: number;
  importance?: number;
  centralityScore?: number;
  suggestedBranches?: string[];
  pulseEffect?: boolean;
  highlightEffect?: boolean;
  branchGenerated?: boolean;
  aiGenerated?: boolean;
  fallbackGenerated?: boolean;
  parentConcept?: string;
  animateIn?: boolean;
  animateMove?: boolean;
  [key: string]: unknown; // Index signature for extensibility
}

// Layout-specific node data extensions
export interface RadialNodeData extends BaseNodeData {
  radius?: number;
  angle?: number;
  level?: number;
}

export interface TreeNodeData extends BaseNodeData {
  level?: number;
  position?: 'left' | 'right' | 'center';
  expanded?: boolean;
}

export interface FlowchartNodeData extends BaseNodeData {
  shape?: 'process' | 'decision' | 'start' | 'end' | 'input' | 'output';
  condition?: string;
  process?: string;
}

export interface TimelineNodeData extends BaseNodeData {
  date?: string;
  time?: string;
  duration?: string;
  milestone?: boolean;
}

export interface FishboneNodeData extends BaseNodeData {
  cause?: string;
  category?: 'people' | 'process' | 'equipment' | 'environment' | 'materials' | 'measurement';
  angle?: number;
  distance?: number;
}

export interface BraceNodeData extends BaseNodeData {
  partOf?: string;
  group?: string;
  level?: number;
}

export interface OrgChartNodeData extends BaseNodeData {
  role?: string;
  department?: string;
  reportsTo?: string;
  level?: number;
  employeeId?: string;
}

// Layout types
export type LayoutType = 
  | 'radial'
  | 'tree-horizontal' 
  | 'tree-vertical'
  | 'hierarchical'
  | 'organic'
  | 'spiral'
  | 'force-directed'
  | 'hexagonal'
  | 'fractal'
  | 'galaxy'
  | 'neural'
  | 'molecular'
  | 'flowchart'
  | 'timeline'
  | 'fishbone'
  | 'brace'
  | 'org-chart'
  | 'freeform';

// Layout configuration interface
export interface LayoutConfig {
  type: LayoutType;
  spacing?: number;
  nodeSize?: { width: number; height: number };
  animation?: boolean;
  autoFit?: boolean;
  padding?: number;
}

// Layout suggestion criteria
export interface LayoutSuggestion {
  layout: LayoutType;
  reason: string;
  confidence: number;
  trigger: string;
}

// Layout component props
export interface LayoutProps {
  nodes: Node<BaseNodeData>[];
  edges: Edge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: any) => void;
  config?: LayoutConfig;
  onLayoutChange?: (layout: LayoutType) => void;
}

// Layout engine interface
export interface LayoutEngine {
  calculatePositions: (nodes: Node<BaseNodeData>[], edges: Edge[], config: LayoutConfig) => Node<BaseNodeData>[];
  suggestLayout: (nodes: Node<BaseNodeData>[], edges: Edge[]) => LayoutSuggestion[];
  validateLayout: (nodes: Node<BaseNodeData>[], edges: Edge[], layout: LayoutType) => boolean;
}

// Export formats
export interface ExportOptions {
  format: 'json' | 'png' | 'pdf';
  includeMetadata?: boolean;
  quality?: number;
  filename?: string;
}

// Sample data for testing
export interface SampleData {
  name: string;
  description: string;
  nodes: Node<BaseNodeData>[];
  edges: Edge[];
  suggestedLayout: LayoutType;
} 