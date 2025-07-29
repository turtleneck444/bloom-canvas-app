import React, { useEffect, useState } from 'react';
import { Palette, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ActionSearchBar } from '@/components/ui/action-search-bar';

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
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Set initial theme
    updateSystemTheme(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener('change', updateSystemTheme);
    return () => mediaQuery.removeEventListener('change', updateSystemTheme);
  }, []);

  const themes = [
    { id: 'light', label: 'Light Theme', description: 'Clean light theme', color: 'hsl(0 0% 100%)' },
    { id: 'dark', label: 'Dark Theme', description: 'Dark mode', color: 'hsl(222.2 84% 4.9%)' },
    { id: 'system', label: `System (${systemTheme === 'dark' ? 'Dark' : 'Light'})`, description: 'Follows system preference', color: systemTheme === 'dark' ? 'hsl(222.2 84% 4.9%)' : 'hsl(0 0% 100%)' },
    { id: 'grid', label: 'Grid Theme', description: 'Grid background', color: 'hsl(220 9% 90%)' },
    { id: 'paper', label: 'Paper Theme', description: 'Paper texture', color: 'hsl(30 20% 98%)' },
    { id: 'aura', label: 'Aura Theme', description: 'Glowing aura effect', color: 'linear-gradient(90deg, #7F5FFF 0%, #00E0FF 33%, #FFB86C 66%, #FF61A6 100%)' },
    ...(customThemes ? Object.entries(customThemes).map(([id, theme]) => ({
      id,
      label: `${theme.name} Theme`,
      description: theme.description || 'Custom theme',
      color: theme.colors.primary
    })) : [])
  ];

  const currentThemeData = themes.find(t => t.id === currentTheme);
  
  // Get the display name for the current theme
  const getCurrentThemeDisplayName = () => {
    if (currentTheme === 'system') {
      return `System (${systemTheme === 'dark' ? 'Dark' : 'Light'})`;
    }
    return currentThemeData?.label || 'Light Theme';
  };

  const themeActions = themes.map(theme => ({
    id: theme.id,
    label: theme.label,
    description: theme.description,
    icon: (
      <div 
        className="w-4 h-4 rounded-full border-2 shadow-sm"
        style={theme.id === 'aura' ? { background: theme.color } : { backgroundColor: theme.color }}
      />
    ),
    color: theme.id === 'aura' ? '#7F5FFF' : theme.color,
    onClick: () => {
      console.log('Theme selected:', theme.id);
      if (theme.id === 'system') {
        onThemeChange(systemTheme);
      } else {
        onThemeChange(theme.id);
      }
    }
  }));

  return (
    <div className="relative">
      <ActionSearchBar
        placeholder={getCurrentThemeDisplayName()}
        actions={themeActions}
        className="w-40 h-8 text-xs"
        compact={true}
        currentThemeData={currentThemeData}
        systemTheme={systemTheme}
      />
    </div>
  );
};

export default ThemeSelector; 