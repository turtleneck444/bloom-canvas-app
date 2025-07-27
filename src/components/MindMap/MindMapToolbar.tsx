import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Download, 
  Upload, 
  Save, 
  Grid3X3, 
  Circle, 
  GitBranch,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Palette,
  Settings,
  Moon,
  Sun,
  Brain,
  Trash2,
  Undo,
  Redo,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MindMapToolbarProps {
  onAddNode: () => void;
  onSave: () => void;
  onExport: () => void;
  onImport: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  onLayoutChange: (layout: 'radial' | 'tree-horizontal' | 'tree-vertical' | 'freeform') => void;
  onThemeChange: (theme: 'light' | 'dark' | 'grid' | 'paper') => void;
  currentLayout: string;
  currentTheme: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onClearCanvas?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  nodeCount?: number;
  edgeCount?: number;
}

const MindMapToolbar: React.FC<MindMapToolbarProps> = ({
  onAddNode,
  onSave,
  onExport,
  onImport,
  onZoomIn,
  onZoomOut,
  onFitView,
  onLayoutChange,
  onThemeChange,
  currentLayout,
  currentTheme,
  isDarkMode,
  onToggleDarkMode,
  onClearCanvas,
  onUndo,
  onRedo,
  nodeCount = 0,
  edgeCount = 0,
}) => {
  const layouts = [
    { id: 'freeform', icon: Circle, label: 'Freeform' },
    { id: 'radial', icon: GitBranch, label: 'Radial' },
    { id: 'tree-horizontal', icon: GitBranch, label: 'Tree H' },
    { id: 'tree-vertical', icon: GitBranch, label: 'Tree V' },
  ];

  const themes = [
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'grid', label: 'Grid' },
    { id: 'paper', label: 'Paper' },
  ];

  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between">
      {/* Left Section - Brand & Stats */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 nov8-gradient-primary text-white px-4 py-2 rounded-xl font-bold text-lg shadow-lg">
          <Brain size={20} className="animate-pulse-slow" />
          <span>NOV8</span>
        </div>
        
        {/* Stats */}
        <div className="hidden sm:flex items-center gap-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border">
          <BarChart3 size={16} className="text-nov8-primary" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {nodeCount} nodes • {edgeCount} connections
          </span>
        </div>
      </div>

      {/* Center Section - Main Tools */}
      <div className="flex items-center gap-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl p-2 shadow-lg border">
        <Button
          onClick={onAddNode}
          variant="ghost"
          size="sm"
          className="nov8-transition hover:bg-nov8-primary/10"
        >
          <Plus size={16} />
          <span className="ml-1 hidden sm:inline">Add Node</span>
        </Button>

        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

        {/* Layout Controls */}
        <div className="flex items-center gap-1">
          {layouts.map((layout) => {
            const Icon = layout.icon;
            return (
              <Button
                key={layout.id}
                onClick={() => onLayoutChange(layout.id as any)}
                variant="ghost"
                size="sm"
                className={cn(
                  "nov8-transition",
                  currentLayout === layout.id 
                    ? "bg-nov8-primary text-white" 
                    : "hover:bg-nov8-primary/10"
                )}
                title={layout.label}
              >
                <Icon size={16} />
              </Button>
            );
          })}
        </div>

        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

        {/* History Controls */}
        <Button
          onClick={onUndo}
          variant="ghost"
          size="sm"
          className="nov8-transition hover:bg-nov8-primary/10"
          title="Undo"
        >
          <Undo size={16} />
        </Button>

        <Button
          onClick={onRedo}
          variant="ghost"
          size="sm"
          className="nov8-transition hover:bg-nov8-primary/10"
          title="Redo"
        >
          <Redo size={16} />
        </Button>

        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

        {/* Zoom Controls */}
        <Button
          onClick={onZoomIn}
          variant="ghost"
          size="sm"
          className="nov8-transition hover:bg-nov8-primary/10"
          title="Zoom In (Ctrl + =)"
        >
          <ZoomIn size={16} />
        </Button>

        <Button
          onClick={onZoomOut}
          variant="ghost"
          size="sm"
          className="nov8-transition hover:bg-nov8-primary/10"
          title="Zoom Out (Ctrl + -)"
        >
          <ZoomOut size={16} />
        </Button>

        <Button
          onClick={onFitView}
          variant="ghost"
          size="sm"
          className="nov8-transition hover:bg-nov8-primary/10"
          title="Fit View (Ctrl + 0)"
        >
          <RotateCcw size={16} />
        </Button>
      </div>

      {/* Right Section - File & Settings */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl p-2 shadow-lg border">
          <Button
            onClick={onSave}
            variant="ghost"
            size="sm"
            className="nov8-transition hover:bg-nov8-success/10 text-nov8-success"
            title="Save"
          >
            <Save size={16} />
          </Button>

          <Button
            onClick={onExport}
            variant="ghost"
            size="sm"
            className="nov8-transition hover:bg-nov8-primary/10"
            title="Export"
          >
            <Download size={16} />
          </Button>

          <Button
            onClick={onImport}
            variant="ghost"
            size="sm"
            className="nov8-transition hover:bg-nov8-primary/10"
            title="Import JSON"
          >
            <Upload size={16} />
          </Button>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

          {onClearCanvas && (
            <Button
              onClick={onClearCanvas}
              variant="ghost"
              size="sm"
              className="nov8-transition hover:bg-nov8-error/10 text-nov8-error"
              title="Clear Canvas"
            >
              <Trash2 size={16} />
            </Button>
          )}

          <Button
            onClick={onToggleDarkMode}
            variant="ghost"
            size="sm"
            className="nov8-transition hover:bg-nov8-primary/10"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MindMapToolbar;