import React from 'react';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './dropdown-menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

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
  mindmaps: 'text-green-700 dark:text-green-300',
  presentations: 'text-orange-700 dark:text-orange-300',
  meetings: 'text-blue-700 dark:text-blue-400',
  strategy: 'text-slate-700 dark:text-cyan-400',
};

const serviceNames = {
  mindmaps: 'Mind Maps',
  presentations: 'Presentations',
  meetings: 'Meetings',
  strategy: 'Strategy Co-Pilot',
};

const serviceRoutes = {
  mindmaps: '/',
  presentations: '/presentations',
  meetings: '/meetings',
  strategy: '/strategy',
};

export const ServiceSwitcher: React.FC<{ current: 'mindmaps' | 'presentations' | 'meetings' | 'strategy' }> = ({ current }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 font-bold text-base focus:outline-none group px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-all">
          <span className="text-gray-800 dark:text-gray-100 font-bold">NOV8</span>
          <span className={serviceStyles[current] + ' font-medium text-base group-hover:underline transition-all'}>{' '}{serviceNames[current]}</span>
          <ChevronDown className="w-4 h-4 ml-0.5 text-gray-400 group-hover:text-gray-600 transition-all" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="rounded-xl shadow-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 p-2 min-w-[220px]">
        {(['mindmaps', 'presentations', 'meetings', 'strategy'] as const).map((key) => (
          <DropdownMenuItem
            key={key}
            onClick={() => {
              if (location.pathname !== serviceRoutes[key]) navigate(serviceRoutes[key]);
            }}
            className={serviceStyles[key] + ' font-semibold rounded-lg px-4 py-2 transition-all ' + (current === key ? 'bg-gray-100 dark:bg-gray-800/60' : 'hover:bg-gray-50 dark:hover:bg-gray-800/40')}
          >
            NOV8 {serviceNames[key]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Logo; 