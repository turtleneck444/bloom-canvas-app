import React from 'react';
import { Button } from '@/components/ui/button';
import { Palette, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  customThemes?: Record<string, any>;
  customTheme?: any;
  setCustomTheme?: (theme: any) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
  customThemes,
  customTheme,
  setCustomTheme,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes = [
    { id: 'light', label: 'Light', color: 'hsl(0 0% 100%)' },
    { id: 'dark', label: 'Dark', color: 'hsl(222.2 84% 4.9%)' },
    { id: 'grid', label: 'Grid', color: 'hsl(220 9% 90%)' },
    { id: 'paper', label: 'Paper', color: 'hsl(30 20% 98%)' },
    ...(customThemes ? Object.entries(customThemes).map(([id, theme]) => ({
      id,
      label: theme.name,
      color: theme.colors.primary
    })) : [])
  ];

  return (
    <div className="relative" ref={ref}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        size="sm"
        className="nov8-transition hover:bg-nov8-primary/10"
        title="Select Theme"
      >
        <Palette size={16} />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-xl border z-50 min-w-[200px]">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Choose Theme
            </h3>
            
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  onThemeChange(theme.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors",
                  currentTheme === theme.id
                    ? "bg-nov8-primary/10 text-nov8-primary"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 shadow-sm",
                    currentTheme === theme.id 
                      ? "border-nov8-primary border-2" 
                      : "border-gray-300 dark:border-gray-600"
                  )}
                  style={{ backgroundColor: theme.color }}
                />
                <span className="text-sm">{theme.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector; 