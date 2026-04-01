import React from 'react';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from './dropdown-menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Brain, Presentation, Target, PenTool, Network, BarChart3 } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'gradient';
}

const Logo: React.FC<LogoProps> = ({ className, size = 'md', variant = 'gradient' }) => {
  const sizeClasses = {
    sm: 'text-lg font-bold',
    md: 'text-xl font-bold',
    lg: 'text-2xl font-bold'
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <span className={cn(
        sizeClasses[size],
        'nov8-gradient-text tracking-tight font-mono select-none transition-all duration-300 hover:scale-105'
      )}>
        NOV8
      </span>
    </div>
  );
};

const serviceConfig = {
  mindmaps: { name: 'Mind Maps', icon: Brain, accent: '170 70% 45%', route: '/mindmaps', desc: 'Visual thinking and idea mapping' },
  presentations: { name: 'Presentations', icon: Presentation, accent: '30 90% 55%', route: '/presentations', desc: 'Professional slide creation' },
  strategy: { name: 'Strategy Co-Pilot', icon: Target, accent: '142 70% 42%', route: '/strategy', desc: 'AI-driven strategic planning' },
  simulation: { name: 'AI Simulation', icon: BarChart3, accent: '260 60% 58%', route: '/simulation', desc: 'Scenario modeling and forecasting' },
  whiteboard: { name: 'Digital Whiteboard', icon: PenTool, accent: '190 70% 45%', route: '/whiteboard', desc: 'Real-time collaborative canvas' },
} as const;

type ServiceKey = keyof typeof serviceConfig;

export const ServiceSwitcher: React.FC<{ current: ServiceKey | 'meetings' }> = ({ current }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentKey = current === 'meetings' ? 'mindmaps' : current;
  const currentService = serviceConfig[currentKey];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 text-sm font-medium focus:outline-none group px-2 py-1.5 rounded-lg hover:bg-muted transition-all">
          <img
            src="/nov8white.png"
            alt="NOV8"
            className="h-5 w-auto hidden dark:block"
          />
          <img
            src="/nov8black.png"
            alt="NOV8"
            className="h-5 w-auto dark:hidden"
          />
          <span className="text-foreground font-medium">{currentService.name}</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72 p-2 bg-popover/95 backdrop-blur-xl border-border">
        {(Object.keys(serviceConfig) as ServiceKey[]).map((key) => {
          const s = serviceConfig[key];
          const Icon = s.icon;
          const isActive = currentKey === key;
          return (
            <DropdownMenuItem
              key={key}
              onClick={() => {
                if (location.pathname !== s.route) navigate(s.route);
              }}
              className={cn(
                'rounded-xl px-3 py-3 cursor-pointer transition-all',
                isActive && 'bg-muted'
              )}
            >
              <div className="flex items-center gap-3 w-full">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `hsl(${s.accent} / ${isActive ? '0.15' : '0.08'})` }}
                >
                  <Icon className="w-4 h-4" style={{ color: `hsl(${s.accent})` }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.desc}</div>
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--nov8-accent))]" />
                )}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Logo;
