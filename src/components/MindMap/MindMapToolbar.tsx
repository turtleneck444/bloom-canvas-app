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
  Brain
} from 'lucide-react';
import { cn } from '@/lib/utils';
import nov8Logo from '@/assets/nov8-logo.jpg';

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
      {/* Left Section - Brand */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 nov8-gradient-primary text-white px-4 py-2 rounded-xl font-bold text-lg shadow-lg">
          <Brain size={20} className="animate-pulse-slow" />
          <span>NOV8</span>
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

        {/* Zoom Controls */}
        <Button
          onClick={onZoomIn}
          variant="ghost"
          size="sm"
          className="nov8-transition hover:bg-nov8-primary/10"
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </Button>

        <Button
          onClick={onZoomOut}
          variant="ghost"
          size="sm"
          className="nov8-transition hover:bg-nov8-primary/10"
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </Button>

        <Button
          onClick={onFitView}
          variant="ghost"
          size="sm"
          className="nov8-transition hover:bg-nov8-primary/10"
          title="Fit View"
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
            title="Import"
          >
            <Upload size={16} />
          </Button>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

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