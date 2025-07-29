# 🧠 Modular Mind Map Layout Engine

A comprehensive, AI-powered layout engine for mind mapping applications with 9 different layout types, smart suggestions, and seamless transitions.

## ✨ Features

### 🎯 **9 Layout Types**
- **Radial Layout**: Central node with branches radiating outward
- **Tree (Horizontal/Vertical)**: Hierarchical organization
- **Flowchart**: Process flow with directional arrows
- **Timeline**: Chronologically ordered horizontal layout
- **Fishbone Diagram**: Cause-effect analysis with angled branches
- **Brace Map**: Part-to-whole relationships
- **Org Chart**: Organizational structure mapping
- **Freeform**: Creative, unconstrained layout

### 🤖 **AI-Powered Smart Suggestions**
- **Automatic Analysis**: Analyzes your data structure and suggests optimal layouts
- **Intelligent Triggers**: 
  - >3 hierarchy levels → Suggests Tree layout
  - >5 cause-effect relationships → Suggests Fishbone
  - Temporal data → Suggests Timeline
  - Process flows → Suggests Flowchart
  - Organizational data → Suggests Org Chart
- **Confidence Scoring**: Each suggestion includes confidence percentage

### 🎨 **Rich Sample Data**
- **9 Pre-built Templates**: One for each layout type
- **Real-world Examples**: Project planning, org charts, process flows, etc.
- **Easy Loading**: One-click template loading with automatic layout switching

### 🔧 **Advanced Features**
- **Drag & Drop**: Full node manipulation support
- **Zoom & Pan**: Smooth canvas navigation
- **Export Options**: JSON, PNG, PDF export capabilities
- **Smooth Transitions**: Animated layout changes without data loss
- **Responsive Design**: Works on all screen sizes

## 🚀 Quick Start

### 1. **Access the Layout Engine**
Navigate to `/layout-demo` in your app or click "Layout Engine" in the navigation.

### 2. **Choose a Layout**
- Click "Layouts" button to open the layout panel
- Browse through 9 different layout types
- Each layout shows description and use cases

### 3. **Load Sample Data**
- Click "Sample Templates" to see pre-built examples
- Choose from project planning, org charts, process flows, etc.
- Templates automatically apply the optimal layout

### 4. **Get AI Suggestions**
- Add nodes and connections to your mind map
- Click "AI Suggest" to get intelligent layout recommendations
- Apply suggestions with one click

## 📁 Project Structure

```
src/
├── components/
│   └── layouts/
│       ├── MindMapLayout.tsx      # Main layout component
│       ├── LayoutSwitcher.tsx     # Layout selection UI
│       └── index.ts              # Exports
├── utils/
│   └── graphEngine/
│       ├── types.ts              # TypeScript interfaces
│       ├── layoutEngine.ts       # Core layout logic
│       └── sampleData.ts         # Sample templates
└── pages/
    └── LayoutDemo.tsx            # Demo page
```

## 🎯 Layout Types Deep Dive

### **Radial Layout** 🌟
- **Best for**: Classic mind mapping, brainstorming
- **Structure**: Central concept with radiating branches
- **Use cases**: Project planning, idea generation, concept mapping

### **Tree Layout** 🌳
- **Best for**: Hierarchical data, organizational structures
- **Structure**: Top-down or left-right hierarchy
- **Use cases**: Company org charts, file systems, decision trees

### **Flowchart** 🔄
- **Best for**: Process flows, decision making
- **Structure**: Sequential steps with directional arrows
- **Use cases**: User registration, business processes, algorithms

### **Timeline** ⏰
- **Best for**: Chronological events, project schedules
- **Structure**: Horizontal timeline with date labels
- **Use cases**: Project timelines, historical events, milestones

### **Fishbone Diagram** 🐟
- **Best for**: Cause-effect analysis, problem solving
- **Structure**: Central problem with angled cause branches
- **Use cases**: Quality issues, root cause analysis, troubleshooting

### **Brace Map** 📋
- **Best for**: Part-to-whole relationships
- **Structure**: Whole object with component parts
- **Use cases**: Product components, system architecture, breakdowns

### **Org Chart** 👥
- **Best for**: Organizational structures, reporting relationships
- **Structure**: Hierarchical employee/role mapping
- **Use cases**: Company structures, team organization, reporting lines

### **Freeform** ✨
- **Best for**: Creative work, unconstrained thinking
- **Structure**: No automatic positioning
- **Use cases**: Brainstorming, creative design, artistic mapping

## 🤖 Smart Suggestion Engine

The AI suggestion engine analyzes your data and recommends optimal layouts:

### **Analysis Criteria**
1. **Hierarchy Depth**: Detects deep nested structures
2. **Cause-Effect Relationships**: Identifies problem-solution patterns
3. **Temporal Data**: Finds time-based sequences
4. **Process Flows**: Recognizes step-by-step procedures
5. **Organizational Data**: Detects role and reporting structures
6. **Part-Whole Relationships**: Identifies component breakdowns

### **Suggestion Triggers**
```typescript
// Hierarchy depth > 3 levels
if (maxDepth > 3) {
  suggest('tree-vertical', 'Deep hierarchy detected');
}

// Cause-effect relationships > 5
if (causeEffectCount > 5) {
  suggest('fishbone', 'Multiple cause-effect relationships');
}

// Temporal nodes > 3
if (temporalNodes.length > 3) {
  suggest('timeline', 'Temporal sequence detected');
}
```

## 📊 Sample Data Templates

### **Project Planning Mind Map**
- **Layout**: Radial
- **Nodes**: 7 nodes (Research, Design, Development, Testing, etc.)
- **Use case**: Software project planning

### **Company Organization Structure**
- **Layout**: Tree Horizontal
- **Nodes**: 6 nodes (CEO, CTO, CFO, Managers, etc.)
- **Use case**: Organizational hierarchy

### **User Registration Process**
- **Layout**: Flowchart
- **Nodes**: 7 nodes (Start, Enter Email, Validation, etc.)
- **Use case**: Process flow documentation

### **Project Timeline**
- **Layout**: Timeline
- **Nodes**: 6 nodes (Kickoff, Requirements, Design, etc.)
- **Use case**: Project scheduling

### **Quality Issues Analysis**
- **Layout**: Fishbone
- **Nodes**: 7 nodes (Problem + 6 cause categories)
- **Use case**: Root cause analysis

## 🔧 Technical Implementation

### **Core Architecture**
```typescript
// Layout Engine Interface
interface LayoutEngine {
  calculatePositions: (nodes, edges, config) => Node[];
  suggestLayout: (nodes, edges) => LayoutSuggestion[];
  validateLayout: (nodes, edges, layout) => boolean;
}
```

### **Layout Calculation**
Each layout type has its own positioning algorithm:
- **Radial**: Trigonometric positioning around center
- **Tree**: Recursive hierarchical positioning
- **Flowchart**: Sequential horizontal positioning
- **Timeline**: Chronological horizontal positioning
- **Fishbone**: Angled branch positioning
- **Brace**: Grid-based component positioning
- **Org Chart**: Hierarchical reporting positioning

### **Data Model**
```typescript
interface BaseNodeData {
  label: string;
  color?: string;
  parentId?: string;
  category?: string;
  // ... extensible properties
}

interface LayoutConfig {
  type: LayoutType;
  spacing?: number;
  nodeSize?: { width: number; height: number };
  animation?: boolean;
  autoFit?: boolean;
}
```

## 🎨 Customization

### **Adding New Layouts**
1. Extend `LayoutType` in `types.ts`
2. Add layout calculation in `layoutEngine.ts`
3. Add sample data in `sampleData.ts`
4. Update `LayoutSwitcher.tsx` with new layout config

### **Custom Node Types**
```typescript
const customNodeTypes = {
  mindMapNode: MindMapNode,
  customNode: CustomNodeComponent
};
```

### **Styling**
All layouts use Tailwind CSS classes and can be customized:
```css
.layout-node {
  @apply bg-white border-2 border-gray-200 rounded-lg shadow-sm;
}

.layout-edge {
  @apply stroke-gray-400 stroke-2;
}
```

## 🚀 Performance Features

### **Optimizations**
- **Lazy Loading**: Components load on demand
- **Memoization**: React.memo for expensive calculations
- **Batch Updates**: Efficient state management
- **Virtual Scrolling**: For large datasets (planned)

### **Memory Management**
- **Efficient Algorithms**: O(n) positioning calculations
- **Garbage Collection**: Proper cleanup of event listeners
- **State Optimization**: Minimal re-renders

## 🔮 Future Enhancements

### **Planned Features**
- **3D Layouts**: Z-axis positioning for complex structures
- **Force-Directed**: Physics-based node positioning
- **Custom Algorithms**: User-defined layout rules
- **Real-time Collaboration**: Multi-user editing
- **Advanced Analytics**: Layout effectiveness metrics

### **Integration Possibilities**
- **Database Storage**: Save/load from databases
- **API Integration**: External data sources
- **Plugin System**: Third-party layout extensions
- **Mobile Support**: Touch-optimized interactions

## 📝 Usage Examples

### **Basic Usage**
```typescript
import { MindMapLayout } from './components/layouts';

function App() {
  return (
    <MindMapLayout
      initialLayout="radial"
      onSave={handleSave}
      onLoad={handleLoad}
    />
  );
}
```

### **Custom Layout Configuration**
```typescript
const customConfig = {
  type: 'radial',
  spacing: 200,
  nodeSize: { width: 250, height: 120 },
  animation: true,
  autoFit: true
};
```

### **Programmatic Layout Changes**
```typescript
const layoutEngine = new MindMapLayoutEngine();
const suggestions = layoutEngine.suggestLayout(nodes, edges);
const bestLayout = suggestions[0].layout;
```

## 🎉 Conclusion

The Modular Mind Map Layout Engine provides a powerful, flexible foundation for creating sophisticated mind mapping applications. With its AI-powered suggestions, rich sample data, and seamless transitions, it enables users to create beautiful, effective visualizations for any type of structured data.

Whether you're building a project management tool, organizational chart, process flow diagram, or creative brainstorming app, this layout engine has you covered with its comprehensive set of layout types and intelligent features. 