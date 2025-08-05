import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPresence } from '@/services/collaborationService';

interface PresenceCursorsProps {
  presenceData: Map<string, UserPresence>;
  containerRef: React.RefObject<HTMLElement>;
}

const CURSOR_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', 
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

export default function PresenceCursors({ presenceData, containerRef }: PresenceCursorsProps) {
  const getColorForUser = (userId: string): string => {
    const hash = userId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return CURSOR_COLORS[Math.abs(hash) % CURSOR_COLORS.length];
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {Array.from(presenceData.entries()).map(([userId, presence]) => {
          if (!presence.is_online || !presence.cursor_position) return null;

          const color = getColorForUser(userId);

          return (
            <motion.div
              key={userId}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute"
              style={{
                left: presence.cursor_position.x,
                top: presence.cursor_position.y,
                transform: 'translate(-2px, -2px)',
              }}
            >
              {/* Cursor */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="drop-shadow-lg"
              >
                <path
                  d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                  fill={color}
                  stroke="white"
                  strokeWidth="1"
                />
              </svg>

              {/* User label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-5 left-2 px-2 py-1 text-xs font-medium text-white rounded shadow-lg"
                style={{ backgroundColor: color }}
              >
                User {userId.slice(-4)}
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}