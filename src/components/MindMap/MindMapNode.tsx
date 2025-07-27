import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Brain, Plus, Trash2, Palette, Type, Edit3, Copy, Users, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

export type NodeData = {
  label: string;
  color?: string;
  fontSize?: number;
  icon?: string;
  isEditing?: boolean;
  parentId?: string;
  tags?: string[];
  priority?: 'low' | 'medium' | 'high';
  isCompleted?: boolean;
};

const MindMapNode = memo(({ data, selected, id }: NodeProps) => {
  const nodeData = data as NodeData;
  const [isEditing, setIsEditing] = useState(nodeData.isEditing || false);
  const [label, setLabel] = useState(nodeData.label);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const nodeColors = [
    'hsl(267 85% 66%)', // NOV8 Primary
    'hsl(213 94% 68%)', // NOV8 Secondary
    'hsl(292 91% 76%)', // NOV8 Accent
    'hsl(142 76% 36%)', // Success
    'hsl(35 91% 65%)',  // Warning
    'hsl(0 84% 60%)',   // Error
    'hsl(220 9% 60%)',  // Neutral
    'hsl(280 100% 70%)', // Purple
    'hsl(200 100% 70%)', // Blue
    'hsl(120 60% 50%)',  // Green
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

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  }, []);

  const getPriorityColor = () => {
    switch (nodeData.priority) {
      case 'high': return 'border-l-4 border-l-red-500';
      case 'medium': return 'border-l-4 border-l-yellow-500';
      case 'low': return 'border-l-4 border-l-green-500';
      default: return '';
    }
  };

  const nodeStyle = {
    backgroundColor: nodeData.color || 'hsl(var(--node-default))',
    fontSize: `${nodeData.fontSize || 14}px`,
    opacity: nodeData.isCompleted ? 0.7 : 1,
  };

  return (
    <div 
      className={cn(
        "mind-map-node relative min-w-[120px] max-w-[300px] p-4 group",
        selected && "selected",
        "cursor-pointer nov8-transition",
        getPriorityColor(),
        nodeData.isCompleted && "line-through"
      )}
      style={nodeStyle}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setShowTools(true)}
      onMouseLeave={() => setShowTools(false)}
    >
      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-nov8-primary !w-2 !h-2 !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-nov8-primary !w-2 !h-2 !border-2 !border-white"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-nov8-primary !w-2 !h-2 !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-nov8-primary !w-2 !h-2 !border-2 !border-white"
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
            ref={inputRef}
            type="text"
            value={label}
            onChange={handleLabelChange}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              setIsEditing(false);
              window.dispatchEvent(new CustomEvent('updateNode', {
                detail: { id, updates: { label } }
              }));
            }}
            className="bg-transparent border-none outline-none text-inherit font-inherit w-full min-w-[60px]"
            style={{ fontSize: 'inherit' }}
          />
        ) : (
          <div className="flex-1">
            <span className={cn(
              "font-medium text-gray-800 dark:text-gray-200 select-none block",
              nodeData.isCompleted && "line-through opacity-60"
            )}>
              {label}
            </span>
            
            {/* Tags */}
            {nodeData.tags && nodeData.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {nodeData.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-nov8-primary/20 text-nov8-primary px-1 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hover Tools */}
      {(showTools || showColorPicker) && (
        <div className="absolute -top-2 -right-2 flex gap-1 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="w-6 h-6 bg-nov8-primary text-white rounded-full flex items-center justify-center hover:bg-nov8-secondary transition-colors shadow-md"
            title="Edit"
          >
            <Edit3 size={10} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.dispatchEvent(new CustomEvent('addChildNode', { detail: { parentId: id } }));
            }}
            className="w-6 h-6 bg-nov8-secondary text-white rounded-full flex items-center justify-center hover:bg-nov8-primary transition-colors shadow-md"
            title="Add Child"
          >
            <Plus size={10} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowColorPicker(!showColorPicker);
            }}
            className="w-6 h-6 bg-nov8-accent text-white rounded-full flex items-center justify-center hover:bg-nov8-secondary transition-colors shadow-md"
            title="Change Color"
          >
            <Palette size={10} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              window.dispatchEvent(new CustomEvent('duplicateNode', { detail: { id } }));
            }}
            className="w-6 h-6 bg-nov8-secondary text-white rounded-full flex items-center justify-center hover:bg-nov8-primary transition-colors shadow-md"
            title="Duplicate"
          >
            <Copy size={10} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              window.dispatchEvent(new CustomEvent('deleteNode', { detail: { id } }));
            }}
            className="w-6 h-6 bg-nov8-error text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
            title="Delete"
          >
            <Trash2 size={10} />
          </button>
        </div>
      )}

      {/* Color Picker */}
      {showColorPicker && (
        <div className="absolute top-full left-0 mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-xl border z-50 min-w-[200px]">
          <div className="grid grid-cols-5 gap-2 mb-3">
            {nodeColors.map((color, index) => (
              <button
                key={index}
                className="w-8 h-8 rounded-full border-2 border-white hover:scale-110 transition-transform shadow-md"
                style={{ backgroundColor: color }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.dispatchEvent(new CustomEvent('updateNode', {
                    detail: { id, updates: { color } }
                  }));
                  setShowColorPicker(false);
                }}
              />
            ))}
          </div>
          
          {/* Quick Actions */}
          <div className="border-t pt-2 space-y-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.dispatchEvent(new CustomEvent('updateNode', {
                  detail: { id, updates: { isCompleted: !nodeData.isCompleted } }
                }));
                setShowColorPicker(false);
              }}
              className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              {nodeData.isCompleted ? '✓ Mark Incomplete' : '○ Mark Complete'}
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                const priorities = ['low', 'medium', 'high'];
                const currentIndex = priorities.indexOf(nodeData.priority || 'medium');
                const nextPriority = priorities[(currentIndex + 1) % priorities.length];
                window.dispatchEvent(new CustomEvent('updateNode', {
                  detail: { id, updates: { priority: nextPriority } }
                }));
                setShowColorPicker(false);
              }}
              className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Priority: {nodeData.priority || 'medium'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

MindMapNode.displayName = 'MindMapNode';

export default MindMapNode;