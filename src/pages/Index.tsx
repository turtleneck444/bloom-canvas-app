import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import MindMapCanvas from '@/components/MindMap/MindMapCanvas';

const Index = () => {
  return (
    <ReactFlowProvider>
      <div className="w-full h-screen flex flex-col overflow-hidden">
        <MindMapCanvas 
          onSave={() => console.log('Save')}
          onExport={() => console.log('Export')}
          onImport={() => console.log('Import')}
        />
      </div>
    </ReactFlowProvider>
  );
};

export default Index;
