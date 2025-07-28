import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Download, 
  Upload, 
  Save, 
  Circle, 
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Moon,
  Sun,
  Trash2,
  Undo,
  Redo,
  BarChart3,
  GitBranch,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/logo';
import ThemeSelector from './ThemeSelector';

interface MindMapToolbarProps {
  onAddNode: () => void;
  onSave: () => void;
  onExport: () => void;
  onImport: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  onLayoutChange: (layout: 'radial' | 'tree-horizontal' | 'tree-vertical' | 'hierarchical' | 'force-directed' | 'organic') => void;
  onUndo: () => void;
  onRedo: () => void;
  onClearAll: () => void;
  currentLayout: string;
  canUndo: boolean;
  canRedo: boolean;
  nodeCount: number;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  customThemes?: Record<string, any>;
  customTheme?: any;
  setCustomTheme?: (theme: any) => void;
  className?: string;
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
  onUndo,
  onRedo,
  onClearAll,
  currentLayout,
  canUndo,
  canRedo,
  nodeCount,
  currentTheme,
  onThemeChange,
  customThemes,
  customTheme,
  setCustomTheme,
  className
}) => {
  const layoutOptions = [
    { id: 'radial', label: 'Radial', icon: Circle },
    { id: 'tree-horizontal', label: 'Tree', icon: GitBranch },
    { id: 'hierarchical', label: 'Hierarchy', icon: BarChart3 },
  ];

  return (
    <div className={cn(
      "w-full h-12 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-blue-200/40 dark:border-blue-800/40 shadow-2xl z-30 sticky top-0 left-0 overflow-x-auto flex-shrink-0",
      className
    )}>
      <div className="flex flex-row items-center justify-between px-2 sm:px-4 py-2 h-full gap-y-2 min-w-[320px] w-full">
        
        {/* Left Section - Logo and Core Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border-r border-gray-200 dark:border-gray-700 pr-3">
            <Logo size="sm" variant="minimal" />
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <div className="w-1 h-1 rounded-full bg-teal-500"></div>
              <span className="font-semibold">{nodeCount}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Button
              onClick={onAddNode}
              size="sm"
              className="h-6 px-2.5 bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600 text-white text-xs font-semibold shadow-md"
            >
              <Plus className="w-3 h-3 mr-1" />
              Add
            </Button>
            
            <div className="flex items-center gap-0.5 bg-gray-50 dark:bg-gray-800/50 rounded p-0.5">
              <Button
                onClick={onUndo}
                disabled={!canUndo}
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 disabled:opacity-40"
                title="Undo"
              >
                <Undo className="w-3 h-3" />
              </Button>
              <Button
                onClick={onRedo}
                disabled={!canRedo}
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 disabled:opacity-40"
                title="Redo"
              >
                <Redo className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Center Section - Layout Controls */}
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mr-1.5">Layout:</span>
          <div className="flex items-center gap-0.5 bg-white dark:bg-gray-800 rounded p-0.5 border border-gray-200 dark:border-gray-700">
            {layoutOptions.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                onClick={() => onLayoutChange(id as any)}
                variant={currentLayout === id ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "h-5 px-1.5 text-xs",
                  currentLayout === id 
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                    : "hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400"
                )}
              >
                <Icon className="w-3 h-3 mr-0.5" />
                <span className="hidden sm:inline">{label}</span>
              </Button>
            ))}
            <Button
              onClick={() => onLayoutChange('organic')}
              variant={currentLayout === 'organic' ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-5 px-1.5 text-xs",
                currentLayout === 'organic'
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                  : "hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400"
              )}
            >
              <Sparkles className="w-3 h-3 mr-0.5" />
              <span className="hidden lg:inline">Organic</span>
            </Button>
          </div>
        </div>

        {/* Right Section - Compact Controls */}
        <div className="flex items-center gap-2">
          {/* Luxury/Aesthetic Theme Dropdown */}
          <div className="flex items-center">
            <ThemeSelector
              currentTheme={currentTheme}
              onThemeChange={onThemeChange}
              customThemes={customThemes}
              customTheme={customTheme}
              setCustomTheme={setCustomTheme}
            />
          </div>
          {/* View Controls */}
          <div className="flex items-center gap-0.5 bg-gray-50 dark:bg-gray-800/50 rounded p-0.5">
            <Button onClick={onZoomOut} variant="ghost" size="sm" className="h-5 w-5 p-0" title="Zoom Out">
              <ZoomOut className="w-3 h-3" />
            </Button>
            <Button onClick={onFitView} variant="ghost" size="sm" className="h-5 px-1" title="Fit View">
              <RotateCcw className="w-3 h-3" />
            </Button>
            <Button onClick={onZoomIn} variant="ghost" size="sm" className="h-5 w-5 p-0" title="Zoom In">
              <ZoomIn className="w-3 h-3" />
            </Button>
          </div>

          {/* Theme Toggle */}
          <Button
            onClick={() => {
              const isDark = document.documentElement.classList.contains('dark');
              if (isDark) {
                document.documentElement.classList.remove('dark');
              } else {
                document.documentElement.classList.add('dark');
              }
            }}
            variant="outline"
            size="sm"
            className="h-6 w-6 p-0 border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50"
            title="Toggle Theme"
          >
            <Sun className="w-3 h-3 block dark:hidden" />
            <Moon className="w-3 h-3 hidden dark:block" />
          </Button>

          {/* File Actions - Super Compact */}
          <div className="flex items-center gap-0.5">
            <Button
              onClick={onSave}
              variant="outline"
              size="sm"
              className="h-6 px-1.5 text-xs border-green-200 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-400"
            >
              <Save className="w-3 h-3 mr-0.5" />
              <span className="hidden md:inline">Save</span>
            </Button>
            
            <Button
              onClick={onExport}
              variant="outline"
              size="sm"
              className="h-6 px-1.5 text-xs border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400"
            >
              <Download className="w-3 h-3 mr-0.5" />
              <span className="hidden lg:inline">Export</span>
            </Button>
            
            <Button
              onClick={onImport}
              variant="outline"
              size="sm"
              className="h-6 px-1.5 text-xs border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-400"
            >
              <Upload className="w-3 h-3 mr-0.5" />
              <span className="hidden lg:inline">Import</span>
            </Button>
            
            <Button
              onClick={onClearAll}
              variant="outline"
              size="sm"
              className="h-6 px-1.5 text-xs border-red-200 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-400"
              disabled={nodeCount === 0}
              title="Clear All"
            >
              <Trash2 className="w-3 h-3 mr-0.5" />
              <span className="hidden xl:inline">Clear</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindMapToolbar;