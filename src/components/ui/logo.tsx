import React from 'react';
import { cn } from '@/lib/utils';

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

export default Logo; 