import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, Presentation, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-full border border-gray-200 dark:border-gray-700 shadow-lg">
        <Link to="/">
          <Button
            variant={location.pathname === '/' ? 'default' : 'ghost'}
            size="sm"
            className={cn(
              "rounded-full px-4 py-2",
              location.pathname === '/' 
                ? "bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600 text-white" 
                : "hover:bg-teal-50 dark:hover:bg-teal-900/20 text-teal-700 dark:text-teal-300"
            )}
          >
            <Brain className="w-4 h-4 mr-2" />
            Mind Maps
          </Button>
        </Link>
        
        <Link to="/presentations">
          <Button
            variant={location.pathname === '/presentations' ? 'default' : 'ghost'}
            size="sm"
            className={cn(
              "rounded-full px-4 py-2",
              location.pathname === '/presentations'
                ? "bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white" 
                : "hover:bg-orange-50 dark:hover:bg-orange-900/20 text-orange-700 dark:text-orange-300"
            )}
          >
            <Presentation className="w-4 h-4 mr-2" />
            Presentations
          </Button>
        </Link>
        
        <Link to="/layout-demo">
          <Button
            variant={location.pathname === '/layout-demo' ? 'default' : 'ghost'}
            size="sm"
            className={cn(
              "rounded-full px-4 py-2",
              location.pathname === '/layout-demo'
                ? "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white" 
                : "hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-700 dark:text-purple-300"
            )}
          >
            <LayoutGrid className="w-4 h-4 mr-2" />
            Layout Engine
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;