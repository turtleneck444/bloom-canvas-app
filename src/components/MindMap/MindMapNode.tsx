import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Brain, Plus, Trash2, Palette, Type, Edit3, Copy, Users, Hash, Sparkles, MessageSquare } from 'lucide-react';
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
  category?: string;
  messages?: string[];
  opacity?: number;
};

const MindMapNode = memo(({ data, selected, id }: NodeProps) => {
  const nodeData = data as NodeData;
  const [isEditing, setIsEditing] = useState(nodeData.isEditing || false);
  const [label, setLabel] = useState(nodeData.label);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    if (showMessageInput && messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, [showMessageInput]);

  // Close message input when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMessageInput && !event.target) {
        setShowMessageInput(false);
        setNewMessage('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMessageInput]);

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
    'hsl(45 100% 60%)',  // Gold
    'hsl(300 100% 70%)', // Magenta
    'hsl(150 100% 50%)', // Lime
    'hsl(240 100% 70%)', // Indigo
    'hsl(60 100% 60%)',  // Yellow
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

  const handleMessageSubmit = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      const updatedMessages = [...(nodeData.messages || []), newMessage.trim()];
      window.dispatchEvent(new CustomEvent('updateNode', {
        detail: { id, updates: { messages: updatedMessages } }
      }));
      setNewMessage('');
      setShowMessageInput(false);
    } else if (e.key === 'Escape') {
      setShowMessageInput(false);
      setNewMessage('');
    }
  }, [id, newMessage, nodeData.messages]);

  const handleGenerateBranches = useCallback(() => {
    window.dispatchEvent(new CustomEvent('generateBranches', {
      detail: { id, label }
    }));
  }, [id, label]);

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
    background: 'rgba(255, 255, 255, 0.98)',
    fontSize: `${nodeData.fontSize || 14}px`,
    opacity: nodeData.opacity !== undefined ? nodeData.opacity : (nodeData.isCompleted ? 0.7 : 1),
    boxShadow: selected 
      ? `0 0 40px ${nodeData.color || 'hsl(var(--nov8-primary))'}50, 0 12px 40px rgba(0,0,0,0.12), 0 0 0 3px ${nodeData.color || 'hsl(var(--nov8-primary))'}` 
      : `0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04), 0 0 0 2px ${nodeData.color || 'hsl(var(--nov8-primary))'}20`,
    transform: selected ? 'scale(1.05)' : 'scale(1)',
    backdropFilter: 'blur(25px)',
    border: `3px solid ${nodeData.color || 'hsl(var(--nov8-primary))'}`,
    color: '#1a1a1a',
    fontWeight: selected ? '600' : '500',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out',
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
            
            {/* Messages */}
            {nodeData.messages && nodeData.messages.length > 0 && (
              <div className="mt-2 space-y-1">
                {nodeData.messages.slice(0, 2).map((message, index) => (
                  <div key={index} className="text-xs bg-white/50 dark:bg-gray-800/50 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
                    {message}
                  </div>
                ))}
                {nodeData.messages.length > 2 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    +{nodeData.messages.length - 2} more messages
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hover Tools */}
      {(showTools || showColorPicker) && (
        <div className="absolute -top-3 -right-3 flex gap-1 transition-opacity z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center hover:bg-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border-2 border-white backdrop-blur-sm"
            title="Edit"
          >
            <Edit3 size={12} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.dispatchEvent(new CustomEvent('addChildNode', { detail: { parentId: id } }));
            }}
            className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border-2 border-white backdrop-blur-sm"
            title="Add Child"
          >
            <Plus size={12} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleGenerateBranches();
            }}
            className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border-2 border-white backdrop-blur-sm"
            title="Generate Branches"
          >
            <Sparkles size={12} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMessageInput(!showMessageInput);
            }}
            className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border-2 border-white backdrop-blur-sm"
            title="Add Message"
          >
            <MessageSquare size={12} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowColorPicker(!showColorPicker);
            }}
            className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shadow-md backdrop-blur-sm"
            title="Change Color"
          >
            <Palette size={10} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              window.dispatchEvent(new CustomEvent('duplicateNode', { detail: { id } }));
            }}
            className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border-2 border-white backdrop-blur-sm"
            title="Duplicate"
          >
            <Copy size={12} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              window.dispatchEvent(new CustomEvent('deleteNode', { detail: { id } }));
            }}
            className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border-2 border-white backdrop-blur-sm"
            title="Delete"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}

      {/* Color Picker */}
      {showColorPicker && (
        <div className="absolute top-full left-0 mt-3 p-6 bg-white/98 dark:bg-gray-800/98 rounded-2xl shadow-2xl border z-50 min-w-[280px] backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
            Choose Node Color
          </h3>
          <div className="grid grid-cols-5 gap-4 mb-4">
            {nodeColors.map((color, index) => (
              <button
                key={index}
                className="w-12 h-12 rounded-full border-4 border-white hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-gray-200"
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

      {/* Message Input */}
      {showMessageInput && (
        <div className="absolute top-full left-0 mt-3 p-4 bg-white/95 dark:bg-gray-800/95 rounded-xl shadow-2xl border z-50 min-w-[280px] backdrop-blur-sm">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Add Message to "{label}"
            </h3>
            <input
              ref={messageInputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleMessageSubmit}
              placeholder="Type your message and press Enter..."
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-nov8-primary"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (newMessage.trim()) {
                    const updatedMessages = [...(nodeData.messages || []), newMessage.trim()];
                    window.dispatchEvent(new CustomEvent('updateNode', {
                      detail: { id, updates: { messages: updatedMessages } }
                    }));
                    setNewMessage('');
                    setShowMessageInput(false);
                  }
                }}
                className="px-3 py-1 text-xs bg-nov8-primary text-white rounded hover:bg-nov8-secondary transition-colors"
              >
                Add Message
              </button>
              <button
                onClick={() => {
                  setShowMessageInput(false);
                  setNewMessage('');
                }}
                className="px-3 py-1 text-xs bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

MindMapNode.displayName = 'MindMapNode';

export default MindMapNode;