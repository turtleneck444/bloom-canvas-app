import React, { useState, useEffect } from 'react';
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
    accent: '195 100% 60%',
  },
  {
    name: 'Presentations',
    description: 'Professional slides with AI design',
    icon: Presentation,
    path: '/presentations',
    accent: '215 95% 65%',
  },
  {
    name: 'Strategy Co-Pilot',
    description: 'AI-driven strategic planning & analysis',
    icon: Compass,
    path: '/strategy',
    accent: '175 80% 50%',
  },
  {
    name: 'AI Simulation',
    description: 'Monte Carlo modeling & forecasting',
    icon: Network,
    path: '/simulation',
    accent: '250 90% 70%',
  },
  {
    name: 'Whiteboard',
    description: 'Collaborative canvas for visual work',
    icon: PenTool,
    path: '/whiteboard',
    accent: '230 90% 70%',
  },
];

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const hideNavigationPages = [
    '/mindmaps', '/presentations', '/strategy',
    '/simulation', '/whiteboard', '/layout-demo'
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (hideNavigationPages.includes(location.pathname)) return null;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[9999] transition-all duration-500",
        scrolled ? "glass-nav" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src="/nov8black.png"
              alt="NOV8"
              className="h-6 w-auto dark:hidden transition-transform duration-200 group-hover:scale-105"
            />
            <img
              src="/nov8white.png"
              alt="NOV8"
              className="h-6 w-auto hidden dark:block transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-sm">
                  Products
                  <ChevronDown className="w-3.5 h-3.5 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80 p-2 glass-dark border-border/80 rounded-xl shadow-2xl">
                {services.map((s) => (
                  <DropdownMenuItem key={s.path} asChild>
                    <Link to={s.path} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `hsl(${s.accent} / 0.1)` }}
                      >
                        <s.icon className="w-4 h-4" style={{ color: `hsl(${s.accent})` }} />
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
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-sm">
                Security
              </Button>
            </Link>

            <Link to="/book-demo">
              <Button size="sm" className="ml-3 h-9">
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
          <div className="lg:hidden border-t border-border pb-4 pt-2 space-y-1 bg-background/95 backdrop-blur-xl">
            {services.map((s) => (
              <Link
                key={s.path}
                to={s.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `hsl(${s.accent} / 0.1)` }}
                >
                  <s.icon className="w-4 h-4" style={{ color: `hsl(${s.accent})` }} />
                </div>
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
