import React from 'react';
import MindMapCanvas from '@/components/MindMap/MindMapCanvas';

const Index = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <MindMapCanvas 
        onSave={() => console.log('Save')}
        onExport={() => console.log('Export')}
        onImport={() => console.log('Import')}
      />
    </div>
  );
};

export default Index;
