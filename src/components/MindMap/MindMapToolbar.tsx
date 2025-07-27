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
  BarChart3,
  RefreshCw,
  Zap,
  Sparkles,
  Layers,
  Network
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeSelector from './ThemeSelector';
import Logo from '@/components/ui/logo';

interface MindMapToolbarProps {
  onAddNode: () => void;
  onSave: () => void;
  onExport: () => void;
  onImport: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  onLayoutChange: (layout: 'radial' | 'tree-horizontal' | 'tree-vertical' | 'hierarchical' | 'organic' | 'spiral' | 'force-directed' | 'hexagonal' | 'fractal' | 'galaxy' | 'neural' | 'molecular' | 'freeform') => void;
  onThemeChange: (theme: string) => void;
  currentLayout: string;
  currentTheme: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onClearCanvas?: () => void;
  onQuickDelete?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  nodeCount?: number;
  edgeCount?: number;
  customThemes?: Record<string, any>;
  customTheme?: any;
  setCustomTheme?: (theme: any) => void;
  isLayoutLoading?: boolean;
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
  onQuickDelete,
  onUndo,
  onRedo,
  nodeCount = 0,
  edgeCount = 0,
  customThemes,
  customTheme,
  setCustomTheme,
  isLayoutLoading = false,
}) => {
  const layouts = [
    { id: 'freeform', icon: Circle, label: 'Freeform' },
    { id: 'radial', icon: GitBranch, label: 'Radial' },
    { id: 'tree-horizontal', icon: GitBranch, label: 'Tree H' },
    { id: 'tree-vertical', icon: GitBranch, label: 'Tree V' },
    { id: 'hierarchical', icon: GitBranch, label: 'Hierarchical' },
    { id: 'organic', icon: GitBranch, label: 'Organic' },
    { id: 'spiral', icon: GitBranch, label: 'Spiral' },
    { id: 'force-directed', icon: GitBranch, label: 'Force' },
    { id: 'hexagonal', icon: Grid3X3, label: 'Hexagonal' },
    { id: 'fractal', icon: Zap, label: 'Fractal' },
    { id: 'galaxy', icon: Brain, label: 'Galaxy' },
    { id: 'neural', icon: BarChart3, label: 'Neural' },
    { id: 'molecular', icon: RefreshCw, label: 'Molecular' },
  ];

  const themes = [
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'grid', label: 'Grid' },
    { id: 'paper', label: 'Paper' },
    ...(customThemes ? Object.entries(customThemes).map(([id, theme]) => ({
      id,
      label: theme.name
    })) : [])
  ];

  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between animate-fade-in-up">
      {/* Left Section - Brand & Stats */}
      <div className="flex items-center gap-4">
        <Logo size="sm" variant="animated" className="bg-white/10 backdrop-blur-sm rounded-xl p-2 shadow-lg" />
        
        {/* Stats */}
        <div className="hidden sm:flex items-center gap-2 toolbar-enhanced rounded-xl px-3 py-2 shadow-medium border-gradient">
          <BarChart3 size={16} className="text-nov8-primary" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {nodeCount} nodes • {edgeCount} connections
          </span>
        </div>
      </div>

      {/* Center Section - Main Tools */}
      <div className="flex items-center gap-2 toolbar-enhanced rounded-xl p-2 shadow-medium border-gradient">
        <Button
          onClick={onAddNode}
          variant="ghost"
          size="sm"
          className="nov8-transition hover:bg-nov8-primary/10 nov8-button-hover"
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
                disabled={isLayoutLoading}
                className={cn(
                  "nov8-transition hover:scale-105 nov8-button-hover",
                  currentLayout === layout.id 
                    ? "bg-nov8-primary text-white shadow-lg" 
                    : "hover:bg-nov8-primary/10 hover:shadow-md",
                  isLayoutLoading && "opacity-50 cursor-not-allowed"
                )}
                title={isLayoutLoading ? "Applying layout..." : layout.label}
              >
                {isLayoutLoading && currentLayout === layout.id ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Icon size={16} />
                )}
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
        <div className="flex items-center gap-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl p-2 shadow-lg border nov8-toolbar-glow">
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

          {onQuickDelete && (
            <Button
              onClick={onQuickDelete}
              variant="ghost"
              size="sm"
              className="nov8-transition hover:bg-red-500/10 text-red-500 hover:scale-105"
              title="Quick Delete All"
            >
              <Zap size={16} />
            </Button>
          )}

          {onClearCanvas && (
            <Button
              onClick={onClearCanvas}
              variant="ghost"
              size="sm"
              className="nov8-transition hover:bg-nov8-error/10 text-nov8-error hover:scale-105"
              title="Clear Canvas"
            >
              <Trash2 size={16} />
            </Button>
          )}

          <ThemeSelector
            currentTheme={currentTheme}
            onThemeChange={onThemeChange}
            customThemes={customThemes}
            customTheme={customTheme}
            setCustomTheme={setCustomTheme}
          />
          
          <Button
            onClick={onToggleDarkMode}
            variant="ghost"
            size="sm"
            className="nov8-transition hover:bg-nov8-primary/10"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MindMapToolbar;