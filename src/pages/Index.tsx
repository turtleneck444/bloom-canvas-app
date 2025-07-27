import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import MindMapCanvas from '@/components/MindMap/MindMapCanvas';

const Index = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <ReactFlowProvider>
        <MindMapCanvas 
          onSave={() => console.log('Save')}
          onExport={() => console.log('Export')}
          onImport={() => console.log('Import')}
        />
      </ReactFlowProvider>
    </div>
  );
};

export default Index;
