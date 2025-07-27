import React, { memo, useState, useCallback } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Brain, Plus, Trash2, Palette, Type, Edit3 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type NodeData = {
  label: string;
  color?: string;
  fontSize?: number;
  icon?: string;
  isEditing?: boolean;
};

const MindMapNode = memo(({ data, selected, id }: NodeProps) => {
  const nodeData = data as NodeData;
  const [isEditing, setIsEditing] = useState(nodeData.isEditing || false);
  const [label, setLabel] = useState(nodeData.label);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const nodeColors = [
    'hsl(267 85% 66%)', // NOV8 Primary
    'hsl(213 94% 68%)', // NOV8 Secondary
    'hsl(292 91% 76%)', // NOV8 Accent
    'hsl(142 76% 36%)', // Success
    'hsl(35 91% 65%)',  // Warning
    'hsl(0 84% 60%)',   // Error
    'hsl(220 9% 60%)',  // Neutral
  ];

  const handleLabelChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      // Update node data through React Flow
      window.dispatchEvent(new CustomEvent('updateNode', {
        detail: { id, updates: { label } }
      }));
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setLabel(nodeData.label);
    }
  }, [id, label, nodeData.label]);

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const nodeStyle = {
    backgroundColor: nodeData.color || 'hsl(var(--node-default))',
    fontSize: `${nodeData.fontSize || 14}px`,
  };

  return (
    <div 
      className={cn(
        "mind-map-node relative min-w-[120px] max-w-[300px] p-4 group",
        selected && "selected",
        "cursor-pointer"
      )}
      style={nodeStyle}
      onDoubleClick={handleDoubleClick}
    >
      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-nov8-primary !w-2 !h-2"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-nov8-primary !w-2 !h-2"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-nov8-primary !w-2 !h-2"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-nov8-primary !w-2 !h-2"
      />

      {/* Node Content */}
      <div className="flex items-center gap-2">
        {nodeData.icon && (
          <div className="flex-shrink-0">
            <Brain size={16} className="text-nov8-primary" />
          </div>
        )}
        
        {isEditing ? (
          <input
            type="text"
            value={label}
            onChange={handleLabelChange}
            onKeyDown={handleKeyDown}
            onBlur={() => setIsEditing(false)}
            className="bg-transparent border-none outline-none text-inherit font-inherit w-full"
            autoFocus
          />
        ) : (
          <span className="font-medium text-gray-800 dark:text-gray-200 select-none">
            {label}
          </span>
        )}
      </div>

      {/* Hover Tools */}
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        <button
          onClick={() => setIsEditing(true)}
          className="w-6 h-6 bg-nov8-primary text-white rounded-full flex items-center justify-center hover:bg-nov8-secondary transition-colors"
          title="Edit"
        >
          <Edit3 size={12} />
        </button>
        
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="w-6 h-6 bg-nov8-accent text-white rounded-full flex items-center justify-center hover:bg-nov8-secondary transition-colors"
          title="Change Color"
        >
          <Palette size={12} />
        </button>

        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent('deleteNode', { detail: { id } }));
          }}
          className="w-6 h-6 bg-nov8-error text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          title="Delete"
        >
          <Trash2 size={12} />
        </button>
      </div>

      {/* Color Picker */}
      {showColorPicker && (
        <div className="absolute top-full left-0 mt-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border z-50">
          <div className="grid grid-cols-4 gap-1">
            {nodeColors.map((color, index) => (
              <button
                key={index}
                className="w-6 h-6 rounded-full border-2 border-white hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('updateNode', {
                    detail: { id, updates: { color } }
                  }));
                  setShowColorPicker(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

MindMapNode.displayName = 'MindMapNode';

export default MindMapNode;