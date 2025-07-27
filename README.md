# 🧠 AI-Powered Mind Mapping App

A revolutionary mind mapping application powered by **OpenRouter.ai** and **Claude 3.5 Sonnet**, built with React, TypeScript, and ReactFlow. This app automatically identifies fundamental concepts and generates intelligent node hierarchies with AI-driven branching.

![AI Mind Mapping](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge)
![OpenRouter](https://img.shields.io/badge/OpenRouter.ai-Integrated-green?style=for-the-badge)

## ✨ Key Features

### 🤖 AI-Powered Intelligence
- **Smart Node Generation**: AI creates comprehensive, contextually relevant mind map nodes
- **Fundamental Node Detection**: Automatically identifies the most important concepts in your mind map
- **Intelligent Auto-Branching**: Generates detailed sub-nodes from fundamental concepts
- **AI Enhancement**: Improves existing nodes with better descriptions, tags, and connections

### 🎯 Core Mind Mapping Features
- **Interactive Canvas**: Drag, drop, and connect nodes with ease
- **12+ Layout Algorithms**: Radial, hierarchical, organic, spiral, neural, and more
- **Real-time Collaboration**: Live updates and smooth animations
- **Smart Themes**: 7+ beautiful themes including dark mode
- **Advanced Node Types**: Support for categories, priorities, tags, and messages

### 🚀 Advanced Capabilities
- **Collision Detection**: Intelligent node positioning prevents overlaps
- **Undo/Redo System**: Full history tracking with keyboard shortcuts
- **Import/Export**: Save and share your mind maps as JSON
- **Auto-save**: Never lose your work with automatic background saving
- **Responsive Design**: Works perfectly on desktop and mobile

## 🛠 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- OpenRouter.ai API key (provided in integration)

### Quick Start

1. **Clone and Install**
```bash
git clone <repository-url>
cd bloom-canvas-app-5
npm install
```

2. **Environment Setup**
Create a `.env.local` file:
```env
VITE_OPENROUTER_API_KEY=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
VITE_OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Open in Browser**
Navigate to `http://localhost:5173`

## 🎮 How to Use

### Getting Started
1. **Start with a Central Topic**: Edit the initial "Start Your Mind Map" node
2. **AI Generation**: Use the AI toolbar to generate intelligent nodes
3. **Find Fundamentals**: Click "Find Fundamentals" to identify key concepts
4. **Auto Branch**: Generate detailed branches from fundamental nodes
5. **Enhance**: Use "Enhance All" to improve node descriptions

### AI Workflow
```
1. Enter Topic → 2. Generate Nodes → 3. Find Fundamentals → 4. Auto Branch → 5. Enhance
```

### Keyboard Shortcuts
- `Enter` / `Tab`: Add new node
- `Ctrl+Z` / `Cmd+Z`: Undo
- `Ctrl+Shift+Z` / `Cmd+Shift+Z`: Redo
- `Ctrl+=` / `Cmd+=`: Zoom in
- `Ctrl+-` / `Cmd+-`: Zoom out
- `Ctrl+0` / `Cmd+0`: Fit view
- `Delete` / `Backspace`: Delete selected nodes

## 🤖 AI Features Deep Dive

### 1. Intelligent Node Generation
The AI analyzes your topic and generates:
- **Fundamental Nodes**: Core concepts (importance 8-10/10)
- **Supporting Nodes**: Related concepts (importance 4-7/10)
- **Detail Nodes**: Specific aspects (importance 1-3/10)

### 2. Fundamental Node Detection
AI identifies nodes that:
- Have high conceptual importance
- Serve as natural connection hubs
- Are central to understanding the topic
- Have strategic value for expansion

### 3. Automatic Branching
From fundamental nodes, AI creates:
- Implementation strategies
- Tools and resources
- Challenges and solutions
- Best practices
- Real-world examples

### 4. Node Enhancement
AI improves nodes with:
- Better titles and descriptions
- Relevant tags and categories
- Suggested connections
- Contextual metadata

## 🎨 Themes & Layouts

### Available Themes
- **NOV8 Classic**: Purple gradient with professional styling
- **NOV8 Dark**: Dark mode with vibrant accents
- **Ocean Blue**: Calming blue tones
- **Forest Green**: Natural green palette
- **Midnight Purple**: Deep purple sophistication
- **Cyber Blue**: Futuristic blue styling

### Layout Algorithms
- **Radial**: Central hub with radiating branches
- **Tree (Horizontal/Vertical)**: Hierarchical organization
- **Organic**: Natural, flowing arrangement
- **Force-Directed**: Physics-based positioning
- **Spiral**: Elegant spiral pattern
- **Neural**: Brain-inspired network layout
- **Hexagonal**: Geometric hexagon pattern
- **Fractal**: Self-similar pattern generation

## 🔧 Technical Architecture

### Core Technologies
- **Frontend**: React 18.3.1 with TypeScript
- **UI Components**: Shadcn/ui with Tailwind CSS
- **Mind Map Engine**: ReactFlow (@xyflow/react)
- **AI Integration**: OpenRouter.ai with Claude 3.5 Sonnet
- **State Management**: React hooks with local storage
- **Build Tool**: Vite with SWC

### AI Service Architecture
```typescript
AIService
├── generateIntelligentNodes()  // Create smart node hierarchies
├── identifyFundamentalNodes()  // Detect key concepts
├── generateAutomaticBranches() // Create sub-nodes from fundamentals
├── enhanceNodeWithAI()        // Improve existing nodes
└── callOpenRouter()           // Core API integration
```

### Performance Features
- **Collision Detection**: Prevents node overlaps
- **Batch Processing**: Efficient AI API calls
- **Lazy Loading**: Optimized component rendering
- **Animation System**: Smooth node transitions
- **Memory Management**: Efficient state handling

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
The app is ready for deployment to any static hosting platform. Make sure to set your environment variables in your hosting provider's dashboard.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📈 Roadmap

### Upcoming Features
- [ ] **Real-time Collaboration**: Multi-user editing
- [ ] **Voice Commands**: Speech-to-mind-map
- [ ] **Template Library**: Pre-built mind map templates
- [ ] **Export Formats**: PDF, PNG, SVG export
- [ ] **Mobile App**: Native iOS/Android apps
- [ ] **Plugin System**: Extensible architecture
- [ ] **Advanced AI**: GPT-4, Gemini integration

### Recent Updates
- [x] OpenRouter.ai integration with Claude 3.5 Sonnet
- [x] Fundamental node detection algorithm
- [x] Automatic branching from key concepts
- [x] AI-powered node enhancement
- [x] 12+ advanced layout algorithms
- [x] Collision detection system
- [x] Advanced theming system

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenRouter.ai** for providing access to cutting-edge AI models
- **Anthropic** for Claude 3.5 Sonnet's intelligence
- **ReactFlow** for the excellent mind mapping foundation
- **Shadcn/ui** for beautiful, accessible components
- **Tailwind CSS** for utility-first styling

---

## 💡 Pro Tips

### Maximize AI Power
1. **Be Specific**: More detailed topics generate better nodes
2. **Use Context**: Set domain, purpose, and audience for targeted results
3. **Iterate**: Run "Find Fundamentals" after adding new content
4. **Enhance Regularly**: Use "Enhance All" to keep improving your map

### Best Practices
- Start with a clear central topic
- Use the AI toolbar for rapid expansion
- Apply different layouts to see new relationships
- Save frequently (auto-save is enabled)
- Experiment with themes for better visualization

### Troubleshooting
- **AI not working?** Check your OpenRouter API key in `.env.local`
- **Slow performance?** Try reducing the number of visible nodes
- **Layout issues?** Use "Fit View" to reset the canvas position
- **Missing features?** Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)

---

**Happy Mind Mapping! 🧠✨**

> "The best way to have a good idea is to have lots of ideas." - Linus Pauling
