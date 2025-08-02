import React from 'react';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from './dropdown-menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Brain, Presentation, Users, Target, Sparkles, PenTool, Network, BarChart3, Zap } from 'lucide-react';

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

  const variantClasses = {
    default: 'text-purple-600 dark:text-purple-400',
    minimal: 'text-gray-700 dark:text-gray-300',
    gradient: 'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent'
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <span className={cn(
        sizeClasses[size],
        variantClasses[variant],
        'tracking-tight font-mono select-none transition-all duration-300 hover:scale-105'
      )}>
        NOV8
      </span>
      {variant === 'gradient' && (
        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse"></div>
      )}
    </div>
  );
};

const serviceStyles = {
  mindmaps: 'text-teal-700 dark:text-teal-300',
  presentations: 'text-orange-700 dark:text-orange-300',
  meetings: 'text-blue-700 dark:text-blue-400',
  strategy: 'text-emerald-700 dark:text-emerald-300',
  simulation: 'text-purple-700 dark:text-purple-300',
  whiteboard: 'text-cyan-700 dark:text-cyan-300',
};

const serviceNames = {
  mindmaps: 'Mind Maps',
  presentations: 'Presentations',
  meetings: 'Meetings',
  strategy: 'Strategy Co-Pilot',
  simulation: 'AI Simulation',
  whiteboard: 'Digital Whiteboard',
};

const serviceIcons = {
  mindmaps: Network,
  presentations: Presentation,
  meetings: Users,
  strategy: Target,
  simulation: BarChart3,
  whiteboard: PenTool,
};

const serviceDescriptions = {
  mindmaps: 'Visual thinking and idea mapping',
  presentations: 'Professional slide creation',
  meetings: 'Collaborative workspace',
  strategy: 'AI-driven strategic planning',
  simulation: 'Scenario modeling and forecasting',
  whiteboard: 'Real-time collaborative canvas',
};

const serviceRoutes = {
  mindmaps: '/mindmaps',
  presentations: '/presentations',
  meetings: '/meetings',
  strategy: '/strategy',
  simulation: '/simulation',
  whiteboard: '/whiteboard',
};

export const ServiceSwitcher: React.FC<{ current: 'mindmaps' | 'presentations' | 'meetings' | 'strategy' | 'simulation' | 'whiteboard' }> = ({ current }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 font-bold text-base focus:outline-none group px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-all">
          <img 
            src="/src/assets/nov8black.png" 
            alt="NOV8 Logo" 
            className="h-5 w-auto"
          />
          <span className={serviceStyles[current] + ' font-medium text-base group-hover:underline transition-all'}>{' '}{serviceNames[current]}</span>
          <ChevronDown className="w-4 h-4 ml-0.5 text-gray-400 group-hover:text-gray-600 transition-all" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="rounded-2xl shadow-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-4 min-w-[320px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <img 
                src="/src/assets/nov8black.png" 
                alt="NOV8 Logo" 
                className="h-6 w-auto"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Workspace Selector</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Choose your tool</p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-2">
          {(['mindmaps', 'presentations', 'meetings', 'strategy', 'simulation', 'whiteboard'] as const).map((key, index) => {
            const IconComponent = serviceIcons[key];
            return (
              <React.Fragment key={key}>
                <DropdownMenuItem
                  onClick={() => {
                    if (location.pathname !== serviceRoutes[key]) navigate(serviceRoutes[key]);
                  }}
                  className={cn(
                    'group relative rounded-xl px-4 py-4 transition-all duration-200 cursor-pointer',
                    current === key 
                      ? 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/60 dark:to-gray-700/60 shadow-sm border border-gray-200/50 dark:border-gray-600/50' 
                      : 'hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-gray-100/80 dark:hover:from-gray-800/40 dark:hover:to-gray-700/40'
                  )}
                >
                  <div className="flex items-center space-x-4 w-full">
                    {/* Service Icon */}
                    <div className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200',
                      current === key 
                        ? 'bg-gradient-to-r shadow-lg' 
                        : 'bg-gray-100 dark:bg-gray-800 group-hover:shadow-md',
                      key === 'mindmaps' && 'from-teal-500 to-teal-600',
                      key === 'presentations' && 'from-orange-500 to-orange-600',
                      key === 'meetings' && 'from-blue-500 to-blue-600',
                      key === 'strategy' && 'from-emerald-500 to-emerald-600',
                      key === 'simulation' && 'from-purple-500 to-purple-600',
                      key === 'whiteboard' && 'from-cyan-500 to-cyan-600'
                    )}>
                      <IconComponent className={cn(
                        'w-5 h-5 transition-all duration-200',
                        current === key ? 'text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                      )} />
                    </div>

                    {/* Service Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                          {serviceNames[key]}
                        </span>
                        {current === key && (
                          <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {serviceDescriptions[key]}
                      </p>
                    </div>

                    {/* Active Indicator */}
                    {current === key && (
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        <span className="text-xs font-medium text-current">Active</span>
                      </div>
                    )}
                  </div>
                </DropdownMenuItem>
                
                {/* Separator between items */}
                {index < 5 && (
                  <DropdownMenuSeparator className="my-1 bg-gray-200/50 dark:bg-gray-700/50" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Powered by NOV8</span>
            <span className="text-current">v2.0</span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Logo; 