import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'animated';
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = 'md', 
  variant = 'default' 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  if (variant === 'minimal') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className={cn(
          "relative bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-xl shadow-lg",
          sizeClasses[size]
        )}>
          <div className="absolute inset-1 bg-white/20 rounded-lg backdrop-blur-sm" />
          <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-lg" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/2 h-1/2 bg-white/80 rounded-full" />
          </div>
        </div>
        <span className={cn(
          "font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent",
          textSizes[size]
        )}>
          NOV8
        </span>
      </div>
    );
  }

  if (variant === 'animated') {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className={cn(
          "relative bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-xl shadow-lg animate-pulse",
          sizeClasses[size]
        )}>
          <div className="absolute inset-1 bg-white/20 rounded-lg backdrop-blur-sm animate-pulse" />
          <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-lg" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/2 h-1/2 bg-white/80 rounded-full animate-bounce" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
        </div>
        <div className="flex flex-col">
          <span className={cn(
            "font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent",
            textSizes[size]
          )}>
            NOV8
          </span>
          <span className="text-xs text-gray-500 font-medium">Mind Mapping</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn(
        "relative bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-xl shadow-lg",
        sizeClasses[size]
      )}>
        <div className="absolute inset-1 bg-white/20 rounded-lg backdrop-blur-sm" />
        <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-lg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/2 h-1/2 bg-white/80 rounded-full" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full" />
      </div>
      <div className="flex flex-col">
        <span className={cn(
          "font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent",
          textSizes[size]
        )}>
          NOV8
        </span>
        <span className="text-xs text-gray-500 font-medium">Mind Mapping</span>
      </div>
    </div>
  );
};

export default Logo; 