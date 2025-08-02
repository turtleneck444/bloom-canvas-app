import React from 'react';
import PresentationCanvas from '@/components/Presentations/PresentationCanvas';

const Presentations = () => {
  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <PresentationCanvas />
    </div>
  );
};

export default Presentations;