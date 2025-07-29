// Layout Components
export { default as MindMapLayout } from './MindMapLayout';
export { default as LayoutSwitcher } from './LayoutSwitcher';

// Layout Engine
export { layoutEngine } from '../../utils/graphEngine/layoutEngine';
export { getSampleData, getAllSampleData } from '../../utils/graphEngine/sampleData';

// Types
export type {
  BaseNodeData,
  LayoutType,
  LayoutConfig,
  LayoutSuggestion,
  LayoutProps,
  SampleData,
  ExportOptions
} from '../../utils/graphEngine/types';

// Layout configurations for easy access
export const LAYOUT_TYPES = {
  RADIAL: 'radial',
  TREE_HORIZONTAL: 'tree-horizontal',
  TREE_VERTICAL: 'tree-vertical',
  FLOWCHART: 'flowchart',
  TIMELINE: 'timeline',
  FISHBONE: 'fishbone',
  BRACE: 'brace',
  ORG_CHART: 'org-chart',
  FREEFORM: 'freeform'
} as const;

// Layout categories
export const LAYOUT_CATEGORIES = {
  MIND_MAP: 'Mind Map',
  HIERARCHY: 'Hierarchy',
  PROCESS: 'Process',
  TEMPORAL: 'Temporal',
  ANALYSIS: 'Analysis',
  STRUCTURE: 'Structure',
  ORGANIZATION: 'Organization',
  CREATIVE: 'Creative'
} as const; 