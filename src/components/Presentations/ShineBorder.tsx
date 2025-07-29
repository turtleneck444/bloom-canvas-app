import React from 'react';

interface ShineBorderProps {
  className?: string;
  children: React.ReactNode;
  borderWidth?: number;
  color?: string[]; // Array of color stops for the gradient
}

const ShineBorder: React.FC<ShineBorderProps> = ({
  className = '',
  children,
  borderWidth = 3,
  color = ['#7F5FFF', '#00E0FF', '#FF61A6'],
}) => {
  const gradient = `linear-gradient(90deg, ${color.join(', ')})`;
  return (
    <div className={`relative rounded-2xl ${className}`} style={{ isolation: 'isolate' }}>
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none animate-border-beam"
        style={{
          padding: borderWidth,
          background: gradient,
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div className="relative rounded-2xl bg-white dark:bg-gray-900 p-6 w-full h-full z-10">
        {children}
      </div>
    </div>
  );
};

export default ShineBorder; 