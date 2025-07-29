import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Download, 
  Upload, 
  Save, 
  Eye,
  EyeOff,
  Palette,
  Presentation,
  FileText,
  Moon,
  Sun,
  RotateCcw,
  Type
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ServiceSwitcher } from '../ui/logo';

interface ToolbarAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
  title?: string;
}

interface PresentationToolbarProps {
  onAddSlide: () => void;
  onSave: () => void;
  onExport: () => void;
  onImport: () => void;
  onPreviewToggle: () => void;
  onTemplateSelect: () => void;
  onCustomize: () => void;
  slideCount: number;
  currentTemplate: string;
  isPreviewMode: boolean;
  className?: string;
  accentColor?: string; // NEW: custom accent color
  customTitle?: React.ReactNode; // Accept ReactNode for branding
  customActions?: ToolbarAction[]; // NEW: custom action buttons for the left section
  customRightActions?: ToolbarAction[]; // NEW: right section
}

const PresentationToolbar: React.FC<PresentationToolbarProps> = ({
  onAddSlide,
  onSave,
  onExport,
  onImport,
  onPreviewToggle,
  onTemplateSelect,
  onCustomize,
  slideCount,
  currentTemplate,
  isPreviewMode,
  className,
  accentColor,
  customTitle,
  customActions,
  customRightActions
}) => {
  const accent = accentColor || 'orange';
  return (
    <div className={cn(
      `w-full h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-${accent}-200 dark:border-${accent}-800`,
      className
    )}>
      <div className="flex items-center justify-between px-4 py-2 h-full">
        
        {/* Left Section - Logo and Core Actions */}
        <div className="flex items-center gap-3">
          {customTitle ? customTitle : <ServiceSwitcher current="presentations" />}
          
          <div className="flex items-center gap-1.5">
            {customActions ? (
              customActions.map((action, i) => (
                <Button
                  key={i}
                  onClick={action.onClick}
                  size="sm"
                  className={action.className || `h-6 px-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-semibold shadow-md`}
                  title={action.title || action.label}
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))
            ) : (
              <>
                {/* Default: Add Slide */}
            <Button
              onClick={onAddSlide}
              size="sm"
              className="h-6 px-2.5 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white text-xs font-semibold shadow-md"
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Slide
            </Button>
              </>
            )}
          </div>
        </div>

        {/* Center Section - Template Info */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-orange-600 dark:text-orange-400">Template:</span>
          <div className="px-2 py-1 bg-orange-100 dark:bg-orange-900/50 rounded text-xs font-medium text-orange-900 dark:text-orange-100">
            {currentTemplate}
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center gap-2">
          {customRightActions ? (
            customRightActions.map((action, i) => (
              <Button
                key={i}
                onClick={action.onClick}
                size="sm"
                className={action.className || `h-6 px-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-semibold shadow-md`}
                title={action.title || action.label}
              >
                {action.icon}
                {action.label}
              </Button>
            ))
          ) : (
            <>
              {/* Default: Preview, Theme, File Actions */}
          {/* Preview Toggle */}
          <Button
            onClick={onPreviewToggle}
            variant={isPreviewMode ? "default" : "outline"}
            size="sm"
            className={cn(
              "h-6 px-2.5 text-xs",
              isPreviewMode 
                ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white" 
                : "border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-400"
            )}
          >
            {isPreviewMode ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
            {isPreviewMode ? 'Edit' : 'Preview'}
          </Button>

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
            className="h-6 w-6 p-0 border-orange-200 hover:bg-orange-50 dark:border-orange-700 dark:hover:bg-orange-800/50"
            title="Toggle Theme"
          >
            <Sun className="w-3 h-3 block dark:hidden" />
            <Moon className="w-3 h-3 hidden dark:block" />
          </Button>

          {/* File Actions */}
          <div className="flex items-center gap-0.5 border-l border-orange-200 dark:border-orange-700 pl-2">
            <Button
              onClick={onSave}
              variant="outline"
              size="sm"
              className="h-6 px-1.5 text-xs border-green-200 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-400"
            >
              <Save className="w-3 h-3 mr-0.5" />
              Save
            </Button>
            
            <Button
              onClick={onExport}
              variant="outline"
              size="sm"
              className="h-6 px-1.5 text-xs border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400"
            >
              <Download className="w-3 h-3 mr-0.5" />
              Export
            </Button>
            
            <Button
              onClick={onImport}
              variant="outline"
              size="sm"
              className="h-6 px-1.5 text-xs border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-400"
            >
              <Upload className="w-3 h-3 mr-0.5" />
              Import
            </Button>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PresentationToolbar;