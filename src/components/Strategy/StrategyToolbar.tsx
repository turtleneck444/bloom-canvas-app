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
  Sparkles,
  ArrowRight,
  Clock,
  Fish,
  Braces,
  Users,
  Lightbulb,
  Zap,
  Brain,
  Target,
  Compass,
  FileText,
  Calendar,
  Folder
} from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ServiceSwitcher } from '../ui/logo';

interface StrategyToolbarProps {
  onAddNode: () => void;
  onSave: () => void;
  onExport: () => void;
  onImport: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  onLayoutChange: (layout: string) => void;
  onAISuggest?: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onClearAll: () => void;
  currentLayout: string;
  canUndo: boolean;
  canRedo: boolean;
  nodeCount: number;
  className?: string;
  onExportAsPNG: () => void;
  onExportAsPDF: () => void;
}

const StrategyToolbar: React.FC<StrategyToolbarProps> = ({
  onAddNode,
  onSave,
  onExport,
  onImport,
  onZoomIn,
  onZoomOut,
  onFitView,
  onLayoutChange,
  onAISuggest,
  onUndo,
  onRedo,
  onClearAll,
  currentLayout,
  canUndo,
  canRedo,
  nodeCount,
  className,
  onExportAsPNG,
  onExportAsPDF
}) => {
  const layoutOptions = [
    { id: 'radial', label: 'Radial', icon: Circle },
    { id: 'tree-horizontal', label: 'Tree', icon: GitBranch },
    { id: 'tree-vertical', label: 'Tree Vertical', icon: BarChart3 },
    { id: 'hierarchical', label: 'Hierarchical', icon: BarChart3 },
    { id: 'organic', label: 'Organic', icon: Fish },
    { id: 'spiral', label: 'Spiral', icon: RotateCcw },
    { id: 'force-directed', label: 'Force-Directed', icon: Zap },
    { id: 'hexagonal', label: 'Hexagonal', icon: Braces },
    { id: 'fractal', label: 'Fractal', icon: Sparkles },
    { id: 'galaxy', label: 'Galaxy', icon: Sparkles },
    { id: 'neural', label: 'Neural', icon: Brain },
    { id: 'molecular', label: 'Molecular', icon: Sparkles },
    { id: 'flowchart', label: 'Flowchart', icon: ArrowRight },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'fishbone', label: 'Fishbone', icon: Fish },
    { id: 'brace', label: 'Brace', icon: Braces },
    { id: 'org-chart', label: 'Org Chart', icon: Users },
    { id: 'freeform', label: 'Freeform', icon: Sparkles },
  ];

  return (
    <div className={cn(
      "w-full h-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-blue-200/40 dark:border-blue-800/40 shadow-2xl z-30 sticky top-0 left-0 overflow-x-auto flex-shrink-0",
      className
    )}>
      <div className="flex flex-row items-center justify-between px-2 sm:px-4 py-2 h-full gap-y-2 min-w-[320px] w-full">
        
        {/* Left Section - Logo and Core Actions */}
        <div className="flex items-center gap-3">
          <ServiceSwitcher current="strategy" />
          
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
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mr-1.5">Layout:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-6 px-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                {(() => {
                  const currentOption = layoutOptions.find(opt => opt.id === currentLayout);
                  const Icon = currentOption?.icon || Circle;
                  return (
                    <>
                      <Icon className="w-3 h-3 mr-1" />
                      <span className="text-xs">{currentOption?.label || 'Layout'}</span>
                    </>
                  );
                })()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {layoutOptions.map(({ id, label, icon: Icon }) => (
                <DropdownMenuItem
                  key={id}
                  onClick={() => onLayoutChange(id)}
                  className={cn(
                    "flex items-center gap-2",
                    currentLayout === id && "bg-blue-50 dark:bg-blue-900/20"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                  {currentLayout === id && (
                    <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* AI Suggestion Button */}
          {onAISuggest && (
            <Button
              onClick={onAISuggest}
              variant="outline"
              size="sm"
              className="h-6 px-2 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-300"
              title="Get AI strategy suggestions"
            >
              <Lightbulb className="w-3 h-3 mr-1" />
              <span className="text-xs">AI Suggest</span>
            </Button>
          )}
        </div>

        {/* Right Section - Compact Controls */}
        <div className="flex items-center gap-2">
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
            
            {/* Export Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="h-6 px-2.5 bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600 text-white text-xs font-semibold shadow-md"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onExportAsPNG}>
                  Export as PNG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onExportAsPDF}>
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onExport}>
                  Export as JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
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

export default StrategyToolbar; 