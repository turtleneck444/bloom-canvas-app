import React from 'react';
import PresentationCanvas from '@/components/Presentations/PresentationCanvas';
import Navigation from '@/components/Navigation';

const Presentations = () => {
  return (
    <div className="w-full h-screen overflow-hidden relative">
      <Navigation />
      <PresentationCanvas />
    </div>
  );
};

export default Presentations;