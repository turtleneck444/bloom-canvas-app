import { Node, Edge } from '@xyflow/react';
import { BaseNodeData, SampleData, LayoutType } from './types';

// Sample data for each layout type
export const sampleData: Record<LayoutType, SampleData> = {
  'radial': {
    name: 'Project Planning Mind Map',
    description: 'A classic radial mind map for project planning',
    suggestedLayout: 'radial',
    nodes: [
      {
        id: '1',
        type: 'mindMapNode',
        position: { x: 400, y: 300 },
        data: { label: 'Project Planning', isFundamental: true, importance: 10 }
      },
      {
        id: '2',
        type: 'mindMapNode',
        position: { x: 200, y: 200 },
        data: { label: 'Research', parentId: '1', importance: 8 }
      },
      {
        id: '3',
        type: 'mindMapNode',
        position: { x: 600, y: 200 },
        data: { label: 'Design', parentId: '1', importance: 8 }
      },
      {
        id: '4',
        type: 'mindMapNode',
        position: { x: 200, y: 400 },
        data: { label: 'Development', parentId: '1', importance: 9 }
      },
      {
        id: '5',
        type: 'mindMapNode',
        position: { x: 600, y: 400 },
        data: { label: 'Testing', parentId: '1', importance: 7 }
      },
      {
        id: '6',
        type: 'mindMapNode',
        position: { x: 400, y: 100 },
        data: { label: 'Market Analysis', parentId: '2', importance: 6 }
      },
      {
        id: '7',
        type: 'mindMapNode',
        position: { x: 400, y: 500 },
        data: { label: 'Deployment', parentId: '4', importance: 7 }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e1-5', source: '1', target: '5' },
      { id: 'e2-6', source: '2', target: '6' },
      { id: 'e4-7', source: '4', target: '7' }
    ]
  },

  'tree-horizontal': {
    name: 'Company Organization Structure',
    description: 'Horizontal tree layout for organizational hierarchy',
    suggestedLayout: 'tree-horizontal',
    nodes: [
      {
        id: '1',
        type: 'mindMapNode',
        position: { x: 100, y: 300 },
        data: { label: 'CEO', role: 'Chief Executive Officer', department: 'Executive', importance: 10 }
      },
      {
        id: '2',
        type: 'mindMapNode',
        position: { x: 300, y: 200 },
        data: { label: 'CTO', role: 'Chief Technology Officer', department: 'Technology', parentId: '1', importance: 9 }
      },
      {
        id: '3',
        type: 'mindMapNode',
        position: { x: 300, y: 400 },
        data: { label: 'CFO', role: 'Chief Financial Officer', department: 'Finance', parentId: '1', importance: 9 }
      },
      {
        id: '4',
        type: 'mindMapNode',
        position: { x: 500, y: 100 },
        data: { label: 'Engineering Manager', role: 'Manager', department: 'Engineering', parentId: '2', importance: 7 }
      },
      {
        id: '5',
        type: 'mindMapNode',
        position: { x: 500, y: 300 },
        data: { label: 'Product Manager', role: 'Manager', department: 'Product', parentId: '2', importance: 7 }
      },
      {
        id: '6',
        type: 'mindMapNode',
        position: { x: 500, y: 500 },
        data: { label: 'Financial Controller', role: 'Controller', department: 'Finance', parentId: '3', importance: 7 }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e2-5', source: '2', target: '5' },
      { id: 'e3-6', source: '3', target: '6' }
    ]
  },

  'tree-vertical': {
    name: 'Software Development Lifecycle',
    description: 'Vertical tree layout for process hierarchy',
    suggestedLayout: 'tree-vertical',
    nodes: [
      {
        id: '1',
        type: 'mindMapNode',
        position: { x: 400, y: 100 },
        data: { label: 'Software Development', category: 'process', importance: 10 }
      },
      {
        id: '2',
        type: 'mindMapNode',
        position: { x: 200, y: 200 },
        data: { label: 'Planning', category: 'process', parentId: '1', importance: 8 }
      },
      {
        id: '3',
        type: 'mindMapNode',
        position: { x: 400, y: 200 },
        data: { label: 'Analysis', category: 'process', parentId: '1', importance: 8 }
      },
      {
        id: '4',
        type: 'mindMapNode',
        position: { x: 600, y: 200 },
        data: { label: 'Design', category: 'process', parentId: '1', importance: 8 }
      },
      {
        id: '5',
        type: 'mindMapNode',
        position: { x: 100, y: 300 },
        data: { label: 'Requirements Gathering', category: 'process', parentId: '2', importance: 7 }
      },
      {
        id: '6',
        type: 'mindMapNode',
        position: { x: 300, y: 300 },
        data: { label: 'System Analysis', category: 'process', parentId: '3', importance: 7 }
      },
      {
        id: '7',
        type: 'mindMapNode',
        position: { x: 500, y: 300 },
        data: { label: 'Architecture Design', category: 'process', parentId: '4', importance: 7 }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e2-5', source: '2', target: '5' },
      { id: 'e3-6', source: '3', target: '6' },
      { id: 'e4-7', source: '4', target: '7' }
    ]
  },

  'flowchart': {
    name: 'User Registration Process',
    description: 'Flowchart layout for process flow',
    suggestedLayout: 'flowchart',
    nodes: [
      {
        id: '1',
        type: 'mindMapNode',
        position: { x: 100, y: 200 },
        data: { label: 'Start', shape: 'start', category: 'process' }
      },
      {
        id: '2',
        type: 'mindMapNode',
        position: { x: 300, y: 200 },
        data: { label: 'Enter Email', shape: 'input', category: 'process' }
      },
      {
        id: '3',
        type: 'mindMapNode',
        position: { x: 500, y: 200 },
        data: { label: 'Email Valid?', shape: 'decision', category: 'process' }
      },
      {
        id: '4',
        type: 'mindMapNode',
        position: { x: 700, y: 100 },
        data: { label: 'Show Error', shape: 'output', category: 'process' }
      },
      {
        id: '5',
        type: 'mindMapNode',
        position: { x: 700, y: 300 },
        data: { label: 'Create Account', shape: 'process', category: 'process' }
      },
      {
        id: '6',
        type: 'mindMapNode',
        position: { x: 900, y: 300 },
        data: { label: 'Send Welcome Email', shape: 'process', category: 'process' }
      },
      {
        id: '7',
        type: 'mindMapNode',
        position: { x: 1100, y: 300 },
        data: { label: 'End', shape: 'end', category: 'process' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e3-5', source: '3', target: '5' },
      { id: 'e5-6', source: '5', target: '6' },
      { id: 'e6-7', source: '6', target: '7' }
    ]
  },

  'timeline': {
    name: 'Project Timeline',
    description: 'Timeline layout for chronological events',
    suggestedLayout: 'timeline',
    nodes: [
      {
        id: '1',
        type: 'mindMapNode',
        position: { x: 100, y: 200 },
        data: { label: 'Project Kickoff', date: '2024-01-15', milestone: true }
      },
      {
        id: '2',
        type: 'mindMapNode',
        position: { x: 300, y: 200 },
        data: { label: 'Requirements Phase', date: '2024-02-01', duration: '2 weeks' }
      },
      {
        id: '3',
        type: 'mindMapNode',
        position: { x: 500, y: 200 },
        data: { label: 'Design Phase', date: '2024-02-15', duration: '3 weeks' }
      },
      {
        id: '4',
        type: 'mindMapNode',
        position: { x: 700, y: 200 },
        data: { label: 'Development Phase', date: '2024-03-08', duration: '8 weeks' }
      },
      {
        id: '5',
        type: 'mindMapNode',
        position: { x: 900, y: 200 },
        data: { label: 'Testing Phase', date: '2024-05-03', duration: '2 weeks' }
      },
      {
        id: '6',
        type: 'mindMapNode',
        position: { x: 1100, y: 200 },
        data: { label: 'Launch', date: '2024-05-17', milestone: true }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5' },
      { id: 'e5-6', source: '5', target: '6' }
    ]
  },

  'fishbone': {
    name: 'Quality Issues Analysis',
    description: 'Fishbone diagram for cause-effect analysis',
    suggestedLayout: 'fishbone',
    nodes: [
      {
        id: '1',
        type: 'mindMapNode',
        position: { x: 400, y: 300 },
        data: { label: 'Product Quality Issues', category: 'effect' }
      },
      {
        id: '2',
        type: 'mindMapNode',
        position: { x: 200, y: 100 },
        data: { label: 'Lack of Training', category: 'people', cause: 'Insufficient training' }
      },
      {
        id: '3',
        type: 'mindMapNode',
        position: { x: 200, y: 200 },
        data: { label: 'Poor Procedures', category: 'process', cause: 'Outdated processes' }
      },
      {
        id: '4',
        type: 'mindMapNode',
        position: { x: 200, y: 400 },
        data: { label: 'Old Equipment', category: 'equipment', cause: 'Aging machinery' }
      },
      {
        id: '5',
        type: 'mindMapNode',
        position: { x: 200, y: 500 },
        data: { label: 'Poor Lighting', category: 'environment', cause: 'Inadequate lighting' }
      },
      {
        id: '6',
        type: 'mindMapNode',
        position: { x: 600, y: 100 },
        data: { label: 'Defective Materials', category: 'materials', cause: 'Supplier issues' }
      },
      {
        id: '7',
        type: 'mindMapNode',
        position: { x: 600, y: 500 },
        data: { label: 'Inaccurate Measurements', category: 'measurement', cause: 'Calibration issues' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e1-5', source: '1', target: '5' },
      { id: 'e1-6', source: '1', target: '6' },
      { id: 'e1-7', source: '1', target: '7' }
    ]
  },

  'brace': {
    name: 'Product Components',
    description: 'Brace map for part-to-whole relationships',
    suggestedLayout: 'brace',
    nodes: [
      {
        id: '1',
        type: 'mindMapNode',
        position: { x: 100, y: 200 },
        data: { label: 'Smartphone', partOf: 'whole' }
      },
      {
        id: '2',
        type: 'mindMapNode',
        position: { x: 300, y: 100 },
        data: { label: 'Display', partOf: 'Smartphone', group: 'hardware' }
      },
      {
        id: '3',
        type: 'mindMapNode',
        position: { x: 300, y: 150 },
        data: { label: 'Battery', partOf: 'Smartphone', group: 'hardware' }
      },
      {
        id: '4',
        type: 'mindMapNode',
        position: { x: 300, y: 200 },
        data: { label: 'Processor', partOf: 'Smartphone', group: 'hardware' }
      },
      {
        id: '5',
        type: 'mindMapNode',
        position: { x: 300, y: 250 },
        data: { label: 'Camera', partOf: 'Smartphone', group: 'hardware' }
      },
      {
        id: '6',
        type: 'mindMapNode',
        position: { x: 300, y: 300 },
        data: { label: 'Operating System', partOf: 'Smartphone', group: 'software' }
      },
      {
        id: '7',
        type: 'mindMapNode',
        position: { x: 300, y: 350 },
        data: { label: 'Apps', partOf: 'Smartphone', group: 'software' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e1-5', source: '1', target: '5' },
      { id: 'e1-6', source: '1', target: '6' },
      { id: 'e1-7', source: '1', target: '7' }
    ]
  },

  'org-chart': {
    name: 'Company Organization Chart',
    description: 'Organizational structure with clear reporting lines',
    suggestedLayout: 'org-chart',
    nodes: [
      {
        id: '1',
        type: 'mindMapNode',
        position: { x: 400, y: 100 },
        data: { label: 'CEO', role: 'Chief Executive Officer', department: 'Executive', importance: 10 }
      },
      {
        id: '2',
        type: 'mindMapNode',
        position: { x: 200, y: 250 },
        data: { label: 'CTO', role: 'Chief Technology Officer', department: 'Technology', parentId: '1', importance: 9 }
      },
      {
        id: '3',
        type: 'mindMapNode',
        position: { x: 600, y: 250 },
        data: { label: 'CFO', role: 'Chief Financial Officer', department: 'Finance', parentId: '1', importance: 9 }
      },
      {
        id: '4',
        type: 'mindMapNode',
        position: { x: 100, y: 400 },
        data: { label: 'Engineering Manager', role: 'Manager', department: 'Engineering', parentId: '2', importance: 7 }
      },
      {
        id: '5',
        type: 'mindMapNode',
        position: { x: 300, y: 400 },
        data: { label: 'Product Manager', role: 'Manager', department: 'Product', parentId: '2', importance: 7 }
      },
      {
        id: '6',
        type: 'mindMapNode',
        position: { x: 500, y: 400 },
        data: { label: 'Finance Manager', role: 'Manager', department: 'Finance', parentId: '3', importance: 7 }
      },
      {
        id: '7',
        type: 'mindMapNode',
        position: { x: 700, y: 400 },
        data: { label: 'HR Manager', role: 'Manager', department: 'Human Resources', parentId: '3', importance: 7 }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e2-5', source: '2', target: '5' },
      { id: 'e3-6', source: '3', target: '6' },
      { id: 'e3-7', source: '3', target: '7' }
    ]
  },

  'hierarchical': {
    name: 'Software Development Hierarchy',
    description: 'Structured hierarchy for software development process',
    suggestedLayout: 'hierarchical',
    nodes: [
      {
        id: '1',
        type: 'mindMapNode',
        position: { x: 400, y: 100 },
        data: { label: 'Software Development', isFundamental: true, importance: 10 }
      },
      {
        id: '2',
        type: 'mindMapNode',
        position: { x: 200, y: 250 },
        data: { label: 'Planning', parentId: '1', importance: 8 }
      },
      {
        id: '3',
        type: 'mindMapNode',
        position: { x: 600, y: 250 },
        data: { label: 'Implementation', parentId: '1', importance: 9 }
      },
      {
        id: '4',
        type: 'mindMapNode',
        position: { x: 800, y: 250 },
        data: { label: 'Testing', parentId: '1', importance: 7 }
      },
      {
        id: '5',
        type: 'mindMapNode',
        position: { x: 100, y: 400 },
        data: { label: 'Requirements', parentId: '2', importance: 6 }
      },
      {
        id: '6',
        type: 'mindMapNode',
        position: { x: 300, y: 400 },
        data: { label: 'Architecture', parentId: '2', importance: 7 }
      },
      {
        id: '7',
        type: 'mindMapNode',
        position: { x: 500, y: 400 },
        data: { label: 'Coding', parentId: '3', importance: 8 }
      },
      {
        id: '8',
        type: 'mindMapNode',
        position: { x: 700, y: 400 },
        data: { label: 'Unit Tests', parentId: '4', importance: 6 }
      },
      {
        id: '9',
        type: 'mindMapNode',
        position: { x: 900, y: 400 },
        data: { label: 'Integration Tests', parentId: '4', importance: 6 }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e2-5', source: '2', target: '5' },
      { id: 'e2-6', source: '2', target: '6' },
      { id: 'e3-7', source: '3', target: '7' },
      { id: 'e4-8', source: '4', target: '8' },
      { id: 'e4-9', source: '4', target: '9' }
    ]
  },

  'organic': {
    name: 'Creative Brainstorming',
    description: 'Natural, flowing layout for creative ideas',
    suggestedLayout: 'organic',
    nodes: [
      {
        id: '1',
        type: 'mindMapNode',
        position: { x: 400, y: 300 },
        data: { label: 'Creative Project', isFundamental: true, importance: 10 }
      },
      {
        id: '2',
        type: 'mindMapNode',
        position: { x: 250, y: 200 },
        data: { label: 'Ideas', parentId: '1', category: 'creative', importance: 8 }
      },
      {
        id: '3',
        type: 'mindMapNode',
        position: { x: 550, y: 200 },
        data: { label: 'Design', parentId: '1', category: 'design', importance: 8 }
      },
      {
        id: '4',
        type: 'mindMapNode',
        position: { x: 250, y: 400 },
        data: { label: 'Development', parentId: '1', category: 'technical', importance: 9 }
      },
      {
        id: '5',
        type: 'mindMapNode',
        position: { x: 550, y: 400 },
        data: { label: 'Marketing', parentId: '1', category: 'business', importance: 7 }
      },
      {
        id: '6',
        type: 'mindMapNode',
        position: { x: 150, y: 150 },
        data: { label: 'Brainstorming', parentId: '2', category: 'creative', importance: 6 }
      },
      {
        id: '7',
        type: 'mindMapNode',
        position: { x: 350, y: 150 },
        data: { label: 'Research', parentId: '2', category: 'creative', importance: 6 }
      },
      {
        id: '8',
        type: 'mindMapNode',
        position: { x: 450, y: 150 },
        data: { label: 'Wireframes', parentId: '3', category: 'design', importance: 6 }
      },
      {
        id: '9',
        type: 'mindMapNode',
        position: { x: 650, y: 150 },
        data: { label: 'Prototypes', parentId: '3', category: 'design', importance: 6 }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e1-5', source: '1', target: '5' },
      { id: 'e2-6', source: '2', target: '6' },
      { id: 'e2-7', source: '2', target: '7' },
      { id: 'e3-8', source: '3', target: '8' },
      { id: 'e3-9', source: '3', target: '9' }
    ]
  },

  'spiral': {
    name: 'Growth Strategy Spiral',
    description: 'Spiral pattern for growth and expansion',
    suggestedLayout: 'spiral',
    nodes: [
      {
        id: '1',
        type: 'mindMapNode',
        position: { x: 400, y: 300 },
        data: { label: 'Business Growth', isFundamental: true, importance: 10 }
      },
      {
        id: '2',
        type: 'mindMapNode',
        position: { x: 500, y: 250 },
        data: { label: 'Market Expansion', parentId: '1', importance: 8 }
      },
      {
        id: '3',
        type: 'mindMapNode',
        position: { x: 550, y: 350 },
        data: { label: 'Product Development', parentId: '1', importance: 9 }
      },
      {
        id: '4',
        type: 'mindMapNode',
        position: { x: 450, y: 450 },
        data: { label: 'Customer Acquisition', parentId: '1', importance: 8 }
      },
      {
        id: '5',
        type: 'mindMapNode',
        position: { x: 300, y: 400 },
        data: { label: 'Revenue Optimization', parentId: '1', importance: 7 }
      },
      {
        id: '6',
        type: 'mindMapNode',
        position: { x: 250, y: 300 },
        data: { label: 'Team Scaling', parentId: '1', importance: 7 }
      },
      {
        id: '7',
        type: 'mindMapNode',
        position: { x: 300, y: 200 },
        data: { label: 'Technology Investment', parentId: '1', importance: 8 }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e1-5', source: '1', target: '5' },
      { id: 'e1-6', source: '1', target: '6' },
      { id: 'e1-7', source: '1', target: '7' }
    ]
  },

  'force-directed': {
    name: 'Network Analysis',
    description: 'Physics-based layout for network relationships',
    suggestedLayout: 'force-directed',
    nodes: [
      {
        id: '1',
        type: 'mindMapNode',
        position: { x: 400, y: 300 },
        data: { label: 'Network Hub', isFundamental: true, importance: 10 }
      },
      {
        id: '2',
        type: 'mindMapNode',
        position: { x: 300, y: 200 },
        data: { label: 'Node A', parentId: '1', importance: 7 }
      },
      {
        id: '3',
        type: 'mindMapNode',
        position: { x: 500, y: 200 },
        data: { label: 'Node B', parentId: '1', importance: 7 }
      },
      {
        id: '4',
        type: 'mindMapNode',
        position: { x: 300, y: 400 },
        data: { label: 'Node C', parentId: '1', importance: 7 }
      },
      {
        id: '5',
        type: 'mindMapNode',
        position: { x: 500, y: 400 },
        data: { label: 'Node D', parentId: '1', importance: 7 }
      },
      {
        id: '6',
        type: 'mindMapNode',
        position: { x: 200, y: 300 },
        data: { label: 'Node E', parentId: '1', importance: 6 }
      },
      {
        id: '7',
        type: 'mindMapNode',
        position: { x: 600, y: 300 },
        data: { label: 'Node F', parentId: '1', importance: 6 }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e1-5', source: '1', target: '5' },
      { id: 'e1-6', source: '1', target: '6' },
      { id: 'e1-7', source: '1', target: '7' }
    ]
  },

  'hexagonal': {
    name: 'System Architecture',
    description: 'Hexagonal grid for system components',
    suggestedLayout: 'hexagonal',
    nodes: [
      {
        id: '1',
        type: 'mindMapNode',
        position: { x: 400, y: 300 },
        data: { label: 'System Core', isFundamental: true, importance: 10 }
      },
      {
        id: '2',
        type: 'mindMapNode',
        position: { x: 550, y: 250 },
        data: { label: 'Frontend', parentId: '1', importance: 8 }
      },
      {
        id: '3',
        type: 'mindMapNode',
        position: { x: 550, y: 350 },
        data: { label: 'Backend', parentId: '1', importance: 9 }
      },
      {
        id: '4',
        type: 'mindMapNode',
        position: { x: 450, y: 450 },
        data: { label: 'Database', parentId: '1', importance: 8 }
      },
      {
        id: '5',
        type: 'mindMapNode',
        position: { x: 250, y: 350 },
        data: { label: 'API Gateway', parentId: '1', importance: 7 }
      },
      {
        id: '6',
        type: 'mindMapNode',
        position: { x: 250, y: 250 },
        data: { label: 'Load Balancer', parentId: '1', importance: 7 }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e1-5', source: '1', target: '5' },
      { id: 'e1-6', source: '1', target: '6' }
    ]
  },

  'fractal': {
    name: 'Fractal Organization',
    description: 'Self-similar patterns for organizational structure',
    suggestedLayout: 'fractal',
    nodes: [
      {
        id: '1',
        type: 'mindMapNode',
        position: { x: 400, y: 300 },
        data: { label: 'Organization', isFundamental: true, importance: 10 }
      },
      {
        id: '2',
        type: 'mindMapNode',
        position: { x: 300, y: 200 },
        data: { label: 'Division A', parentId: '1', importance: 8 }
      },
      {
        id: '3',
        type: 'mindMapNode',
        position: { x: 500, y: 200 },
        data: { label: 'Division B', parentId: '1', importance: 8 }
      },
      {
        id: '4',
        type: 'mindMapNode',
        position: { x: 200, y: 100 },
        data: { label: 'Team A1', parentId: '2', importance: 6 }
      },
      {
        id: '5',
        type: 'mindMapNode',
        position: { x: 400, y: 100 },
        data: { label: 'Team A2', parentId: '2', importance: 6 }
      },
      {
        id: '6',
        type: 'mindMapNode',
        position: { x: 400, y: 500 },
        data: { label: 'Team B1', parentId: '3', importance: 6 }
      },
      {
        id: '7',
        type: 'mindMapNode',
        position: { x: 600, y: 500 },
        data: { label: 'Team B2', parentId: '3', importance: 6 }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e2-5', source: '2', target: '5' },
      { id: 'e3-6', source: '3', target: '6' },
      { id: 'e3-7', source: '3', target: '7' }
    ]
  },

  'galaxy': {
    name: 'Galaxy of Ideas',
    description: 'Galaxy spiral for creative exploration',
    suggestedLayout: 'galaxy',
    nodes: [
      {
        id: '1',
        type: 'mindMapNode',
        position: { x: 400, y: 300 },
        data: { label: 'Creative Universe', isFundamental: true, importance: 10 }
      },
      {
        id: '2',
        type: 'mindMapNode',
        position: { x: 500, y: 250 },
        data: { label: 'Innovation', parentId: '1', importance: 8 }
      },
      {
        id: '3',
        type: 'mindMapNode',
        position: { x: 550, y: 350 },
        data: { label: 'Design', parentId: '1', importance: 8 }
      },
      {
        id: '4',
        type: 'mindMapNode',
        position: { x: 450, y: 450 },
        data: { label: 'Technology', parentId: '1', importance: 9 }
      },
      {
        id: '5',
        type: 'mindMapNode',
        position: { x: 300, y: 400 },
        data: { label: 'Art', parentId: '1', importance: 7 }
      },
      {
        id: '6',
        type: 'mindMapNode',
        position: { x: 250, y: 300 },
        data: { label: 'Science', parentId: '1', importance: 7 }
      },
      {
        id: '7',
        type: 'mindMapNode',
        position: { x: 300, y: 200 },
        data: { label: 'Philosophy', parentId: '1', importance: 7 }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e1-5', source: '1', target: '5' },
      { id: 'e1-6', source: '1', target: '6' },
      { id: 'e1-7', source: '1', target: '7' }
    ]
  },

  'neural': {
    name: 'Neural Network',
    description: 'Neural network-inspired layout for AI concepts',
    suggestedLayout: 'neural',
    nodes: [
      {
        id: '1',
        type: 'mindMapNode',
        position: { x: 400, y: 300 },
        data: { label: 'AI System', isFundamental: true, importance: 10 }
      },
      {
        id: '2',
        type: 'mindMapNode',
        position: { x: 300, y: 200 },
        data: { label: 'Input Layer', parentId: '1', importance: 8 }
      },
      {
        id: '3',
        type: 'mindMapNode',
        position: { x: 500, y: 200 },
        data: { label: 'Hidden Layer', parentId: '1', importance: 9 }
      },
      {
        id: '4',
        type: 'mindMapNode',
        position: { x: 400, y: 400 },
        data: { label: 'Output Layer', parentId: '1', importance: 8 }
      },
      {
        id: '5',
        type: 'mindMapNode',
        position: { x: 200, y: 150 },
        data: { label: 'Data Processing', parentId: '2', importance: 6 }
      },
      {
        id: '6',
        type: 'mindMapNode',
        position: { x: 400, y: 150 },
        data: { label: 'Feature Extraction', parentId: '2', importance: 6 }
      },
      {
        id: '7',
        type: 'mindMapNode',
        position: { x: 600, y: 250 },
        data: { label: 'Pattern Recognition', parentId: '3', importance: 7 }
      },
      {
        id: '8',
        type: 'mindMapNode',
        position: { x: 600, y: 350 },
        data: { label: 'Decision Making', parentId: '3', importance: 7 }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e2-5', source: '2', target: '5' },
      { id: 'e2-6', source: '2', target: '6' },
      { id: 'e3-7', source: '3', target: '7' },
      { id: 'e3-8', source: '3', target: '8' }
    ]
  },

  'molecular': {
    name: 'Molecular Structure',
    description: 'Molecular pattern for complex systems',
    suggestedLayout: 'molecular',
    nodes: [
      {
        id: '1',
        type: 'mindMapNode',
        position: { x: 400, y: 300 },
        data: { label: 'Complex System', isFundamental: true, importance: 10 }
      },
      {
        id: '2',
        type: 'mindMapNode',
        position: { x: 500, y: 250 },
        data: { label: 'Component A', parentId: '1', importance: 8 }
      },
      {
        id: '3',
        type: 'mindMapNode',
        position: { x: 550, y: 350 },
        data: { label: 'Component B', parentId: '1', importance: 8 }
      },
      {
        id: '4',
        type: 'mindMapNode',
        position: { x: 450, y: 450 },
        data: { label: 'Component C', parentId: '1', importance: 8 }
      },
      {
        id: '5',
        type: 'mindMapNode',
        position: { x: 300, y: 400 },
        data: { label: 'Component D', parentId: '1', importance: 7 }
      },
      {
        id: '6',
        type: 'mindMapNode',
        position: { x: 250, y: 300 },
        data: { label: 'Component E', parentId: '1', importance: 7 }
      },
      {
        id: '7',
        type: 'mindMapNode',
        position: { x: 300, y: 200 },
        data: { label: 'Component F', parentId: '1', importance: 7 }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e1-5', source: '1', target: '5' },
      { id: 'e1-6', source: '1', target: '6' },
      { id: 'e1-7', source: '1', target: '7' }
    ]
  },

  'freeform': {
    name: 'Creative Brainstorming',
    description: 'Freeform layout for creative thinking',
    suggestedLayout: 'freeform',
    nodes: [
      {
        id: '1',
        type: 'mindMapNode',
        position: { x: 400, y: 300 },
        data: { label: 'Creative Ideas', isFundamental: true }
      },
      {
        id: '2',
        type: 'mindMapNode',
        position: { x: 200, y: 150 },
        data: { label: 'Innovation', parentId: '1' }
      },
      {
        id: '3',
        type: 'mindMapNode',
        position: { x: 600, y: 150 },
        data: { label: 'Design', parentId: '1' }
      },
      {
        id: '4',
        type: 'mindMapNode',
        position: { x: 150, y: 250 },
        data: { label: 'Technology', parentId: '2' }
      },
      {
        id: '5',
        type: 'mindMapNode',
        position: { x: 250, y: 250 },
        data: { label: 'Process', parentId: '2' }
      },
      {
        id: '6',
        type: 'mindMapNode',
        position: { x: 550, y: 250 },
        data: { label: 'User Experience', parentId: '3' }
      },
      {
        id: '7',
        type: 'mindMapNode',
        position: { x: 650, y: 250 },
        data: { label: 'Visual Design', parentId: '3' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e2-5', source: '2', target: '5' },
      { id: 'e3-6', source: '3', target: '6' },
      { id: 'e3-7', source: '3', target: '7' }
    ]
  }
};

// Helper function to get sample data by layout type
export const getSampleData = (layoutType: LayoutType): SampleData => {
  return sampleData[layoutType] || sampleData['radial'];
};

// Helper function to get all available sample data
export const getAllSampleData = (): SampleData[] => {
  return Object.values(sampleData);
}; 