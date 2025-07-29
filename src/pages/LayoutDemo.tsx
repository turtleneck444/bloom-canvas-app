import React from 'react';
import MindMapLayout from '../components/layouts/MindMapLayout';
import { LayoutType } from '../utils/graphEngine/types';

const LayoutDemo: React.FC = () => {
  const handleSave = (data: any) => {
    console.log('Saving mind map:', data);
    // In a real app, this would save to a database or file system
  };

  const handleLoad = (data: any) => {
    console.log('Loading mind map:', data);
    // In a real app, this would load from a database or file system
  };

  return (
    <div className="w-full h-screen">
      <MindMapLayout
        initialLayout="radial"
        onSave={handleSave}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default LayoutDemo; 