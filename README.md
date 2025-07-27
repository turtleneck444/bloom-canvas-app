# NOV8 Mind Mapping App

A powerful, beautiful, and fully functional mind mapping application built with React, TypeScript, and modern web technologies.

## ✨ Features

### 🧠 AI-Powered Node Generation
- **Smart Content Creation**: When you enter a central idea, the app automatically generates relevant sub-nodes based on the topic
- **Category Detection**: Automatically detects the category of your central idea (business, technology, education, health, creative, personal, project, research)
- **Intelligent Suggestions**: Creates perfectly organized and accurate related concepts for your central idea

### 🎨 Beautiful Aesthetics & Custom Themes
- **5 Pre-built Themes**: NOV8 Classic, Ocean Blue, Sunset Warm, Forest Green, Midnight Purple
- **Custom Theme System**: Create and save your own color schemes
- **Enhanced Visual Design**: 
  - Gradient backgrounds and node styling
  - Smooth animations and transitions
  - Glassmorphism effects with backdrop blur
  - Pulsing animations for selected nodes
  - Beautiful hover effects and shadows

### 🔧 Advanced Layout Algorithms
- **Radial Layout**: Perfect circular arrangement around central idea
- **Tree Vertical**: Hierarchical top-down organization
- **Tree Horizontal**: Left-to-right hierarchical layout
- **Hierarchical**: Multi-level structured layout
- **Organic**: Natural, free-flowing arrangement
- **Freeform**: Manual positioning with snap-to-grid

### 🛠️ Full Toolbar Functionality
- **Node Management**: Add, delete, duplicate, and edit nodes
- **Layout Controls**: Switch between different layout algorithms
- **Theme Selection**: Choose from built-in and custom themes
- **Zoom Controls**: Zoom in/out, fit to view
- **History Management**: Undo/Redo functionality with keyboard shortcuts
- **File Operations**: Save, export, import mind maps
- **Canvas Management**: Clear canvas, toggle dark mode

### ⌨️ Keyboard Shortcuts
- `Enter` / `Tab`: Add new node
- `Delete` / `Backspace`: Delete selected nodes
- `Ctrl/Cmd + =`: Zoom in
- `Ctrl/Cmd + -`: Zoom out
- `Ctrl/Cmd + 0`: Fit to view
- `Ctrl/Cmd + Z`: Undo
- `Ctrl/Cmd + Shift + Z`: Redo

### 🎯 Enhanced Node Features
- **Rich Node Data**: Labels, colors, fonts, icons, tags, priorities
- **Visual Indicators**: Priority levels, completion status
- **Interactive Tools**: Color picker, quick actions menu
- **Smart Connections**: Automatic edge creation with themed colors
- **Node Categories**: Organize nodes by type and purpose

### 💾 Data Management
- **Auto-save**: Automatically saves your work every 5 seconds
- **Local Storage**: Persistent data storage
- **Export/Import**: JSON format for sharing and backup
- **History Tracking**: Complete undo/redo history

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd bloom-canvas-app-1

# Install dependencies
npm install

# Start development server
npm run dev
```

### Usage
1. **Create Your Central Idea**: Double-click the default "Central Idea" node to edit it
2. **Generate Related Nodes**: When prompted, let the AI generate relevant sub-topics
3. **Customize Layout**: Use the toolbar to switch between different layout algorithms
4. **Choose Themes**: Select from built-in themes or create custom ones
5. **Add More Nodes**: Use the + button or keyboard shortcuts to add new nodes
6. **Connect Ideas**: Drag from node handles to create connections
7. **Save Your Work**: Use Ctrl+S or the save button to save your mind map

## 🎨 Customization

### Creating Custom Themes
The app supports custom themes with the following structure:
```typescript
{
  name: 'Theme Name',
  colors: {
    primary: 'hsl(267 85% 66%)',
    secondary: 'hsl(213 94% 68%)',
    accent: 'hsl(292 91% 76%)',
    background: 'hsl(240 10% 98%)',
    surface: 'hsl(0 0% 100%)',
    text: 'hsl(222.2 84% 4.9%)',
  }
}
```

### Node Styling
Nodes support various visual properties:
- **Colors**: 15+ predefined colors or custom HSL values
- **Font Sizes**: Adjustable text size
- **Icons**: Built-in icon support
- **Tags**: Add hashtags for categorization
- **Priority**: Low, Medium, High priority indicators
- **Status**: Mark nodes as completed

## 🛠️ Technical Stack

- **Frontend**: React 18, TypeScript
- **UI Framework**: Tailwind CSS, shadcn/ui
- **Flow Engine**: @xyflow/react
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Styling**: CSS with custom properties and animations

## 🎯 Use Cases

### Business & Strategy
- Strategic planning and goal setting
- Project management and task organization
- Business model canvas development
- SWOT analysis and competitive research

### Education & Learning
- Course planning and curriculum design
- Study guides and knowledge mapping
- Research project organization
- Concept mapping and idea development

### Creative Projects
- Content planning and storytelling
- Design thinking and ideation
- Creative project management
- Brainstorming and innovation

### Personal Development
- Goal setting and habit tracking
- Life planning and decision making
- Personal knowledge management
- Mind mapping for productivity

## 🔮 Future Enhancements

- **Real-time Collaboration**: Multi-user editing
- **Cloud Storage**: Sync across devices
- **Advanced AI**: More sophisticated node generation
- **Templates**: Pre-built mind map templates
- **Export Options**: PDF, PNG, SVG export
- **Mobile Support**: Responsive mobile interface
- **Plugins**: Extensible plugin system

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ by NOV8 Team**
