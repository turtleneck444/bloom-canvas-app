import React from 'react';
import { cn } from '@/lib/utils';
import { GlowEffect } from './GlowEffect';

export interface AuraCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColors?: string[];
  glowMode?: 'rotate' | 'pulse' | 'breathe' | 'colorShift' | 'flowHorizontal' | 'static';
  glowBlur?: number | 'softest' | 'soft' | 'medium' | 'strong' | 'stronger' | 'strongest' | 'none';
  glowScale?: number;
  glowDuration?: number;
  isRoot?: boolean;
}

export const AuraCard: React.FC<AuraCardProps> = ({
  children,
  className,
  glowColors = ['#7F5FFF', '#00E0FF', '#FFB86C', '#FF61A6'],
  glowMode = 'rotate',
  glowBlur = 'softest',
  glowScale = 1.08,
  glowDuration = 12,
  isRoot = false,
  ...props
}) => {
  return (
    <div className={cn('relative flex items-center justify-center', className)} {...props}>
      <GlowEffect
        colors={glowColors}
        mode={glowMode}
        blur={glowBlur}
        scale={glowScale}
        duration={glowDuration}
        className="z-0"
        style={{ opacity: 0.45 }}
      />
      <div
        className={
          'relative z-10 bg-white dark:bg-neutral-900 rounded-3xl shadow-xl flex flex-col items-center justify-center'
        }
        style={{
          minWidth: isRoot ? 340 : 260,
          minHeight: 120,
          padding: isRoot ? '1.5rem 2.5rem' : '1.5rem',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AuraCard; 