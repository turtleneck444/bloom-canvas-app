import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Brain,
  Presentation,
  Compass,
  Network,
  PenTool,
  Menu,
  X,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const services = [
  {
    name: 'Mind Maps',
    description: 'AI-powered brainstorming & visual thinking',
    icon: Brain,
    path: '/mindmaps',
  },
  {
    name: 'Presentations',
    description: 'Professional slides with AI design',
    icon: Presentation,
    path: '/presentations',
  },
  {
    name: 'Strategy Co-Pilot',
    description: 'AI-driven strategic planning & analysis',
    icon: Compass,
    path: '/strategy',
  },
  {
    name: 'AI Simulation',
    description: 'Monte Carlo modeling & forecasting',
    icon: Network,
    path: '/simulation',
  },
  {
    name: 'Whiteboard',
    description: 'Collaborative canvas for visual work',
    icon: PenTool,
    path: '/whiteboard',
  },
];

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hideNavigationPages = [
    '/mindmaps', '/presentations', '/strategy',
    '/simulation', '/whiteboard', '/layout-demo'
  ];

  if (hideNavigationPages.includes(location.pathname)) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src="/nov8black.png"
              alt="NOV8"
              className="h-7 w-auto dark:hidden transition-transform duration-200 group-hover:scale-105"
            />
            <img
              src="/nov8white.png"
              alt="NOV8"
              className="h-7 w-auto hidden dark:block transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Products Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Products
                  <ChevronDown className="w-3.5 h-3.5 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72 p-2">
                {services.map((s) => (
                  <DropdownMenuItem key={s.path} asChild>
                    <Link to={s.path} className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <s.icon className="w-4 h-4 text-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">{s.name}</div>
                        <div className="text-xs text-muted-foreground">{s.description}</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/security">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Security
              </Button>
            </Link>

            <Link to="/book-demo">
              <Button size="sm" className="ml-2">
                Get Started
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border pb-4 pt-2 space-y-1">
            {services.map((s) => (
              <Link
                key={s.path}
                to={s.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <s.icon className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-foreground">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.description}</div>
                </div>
              </Link>
            ))}
            <div className="pt-2 px-3">
              <Link to="/book-demo" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full" size="sm">
                  Get Started
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
