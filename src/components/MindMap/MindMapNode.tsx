import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Brain, Plus, Trash2, Palette, Type, Edit3, Copy, Users, Hash, Sparkles, MessageSquare, Target, Zap, Star, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ExpandableTabs } from '../ui/expandable-tabs';

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
  scale?: number;
  isFundamental?: boolean;
  complexity?: number;
  importance?: number;
  centralityScore?: number;
  suggestedBranches?: string[];
  pulseEffect?: boolean;
  highlightEffect?: boolean;
  branchGenerated?: boolean;
  aiGenerated?: boolean;
  fallbackGenerated?: boolean;
  parentConcept?: string;
  animateIn?: boolean;
  animateMove?: boolean;
};

// Add isAuraTheme and onSubmit props
interface MindMapNodeProps extends NodeProps {
  isAuraTheme?: boolean;
  onSubmit?: (id: string) => void;
}

const MindMapNode = memo(({ data, selected, id, isAuraTheme, onSubmit }: MindMapNodeProps) => {
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
    background: nodeData.isFundamental 
      ? 'var(--node-fundamental-bg, linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--nov8-accent)) 100%))' 
      : isAuraTheme 
        ? 'rgba(255, 255, 255, 0.95)' 
        : 'var(--node-default, hsl(var(--card)))',
    fontSize: `${nodeData.fontSize || 14}px`,
    opacity: nodeData.opacity !== undefined ? nodeData.opacity : (nodeData.isCompleted ? 0.7 : 1),
    boxShadow: selected 
      ? `0 0 40px ${nodeData.color || 'hsl(var(--nov8-primary))'}50, 0 12px 40px rgba(0,0,0,0.12), 0 0 0 3px ${nodeData.color || 'hsl(var(--nov8-primary))'}` 
      : nodeData.isFundamental
        ? `0 0 25px hsl(var(--nov8-accent) / 0.3), 0 8px 32px hsl(var(--shadow-soft)), 0 4px 16px hsl(var(--shadow-medium)), 0 0 0 3px ${nodeData.color || 'hsl(var(--nov8-primary))'}40`
        : isAuraTheme
          ? `0 8px 32px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.08), 0 0 0 2px ${nodeData.color || 'hsl(var(--nov8-primary))'}30`
          : `0 8px 32px hsl(var(--shadow-soft)), 0 4px 16px hsl(var(--shadow-medium)), 0 0 0 2px ${nodeData.color || 'hsl(var(--nov8-primary))'}20`,
    transform: selected ? 'scale(1.05)' : nodeData.isFundamental ? 'scale(1.02)' : 'scale(1)',
    backdropFilter: 'blur(25px)',
    border: isAuraTheme 
      ? `2px solid ${nodeData.color || 'hsl(var(--nov8-primary))'}40` 
      : `${nodeData.isFundamental ? '4px' : '3px'} solid ${nodeData.color || 'hsl(var(--nov8-primary))'}`,
    color: 'var(--node-text, hsl(var(--foreground)))',
    fontWeight: selected ? '600' : nodeData.isFundamental ? '600' : '500',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out',
  };

  // Animation config
  const animate = {
    opacity: nodeData.opacity !== undefined ? nodeData.opacity : 1,
    scale: nodeData.scale !== undefined ? nodeData.scale : 1,
  };
  const initial = {
    opacity: nodeData.animateIn ? 0 : animate.opacity,
    scale: nodeData.animateIn ? 0.3 : animate.scale,
  };
  const transition = {
    type: 'spring' as const,
    stiffness: 420,
    damping: 38,
    mass: 1.1,
  };
  return (
    <motion.div
      layout
      initial={initial}
      animate={animate}
      transition={transition}
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
      data-nodeid={id}
    >
      {/* Connection Handles - Larger and more visible, no movement on hover */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-nov8-primary !w-4 !h-4 !border-2 !border-white !shadow-lg hover:!ring-2 hover:!ring-blue-400 transition-colors duration-200"
        style={{
          backgroundColor: nodeData.color || 'hsl(267 85% 66%)',
          border: '2px solid white',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          cursor: 'crosshair'
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-4 !h-4 !border-2 !border-white !shadow-lg hover:!ring-2 hover:!ring-blue-400 transition-colors duration-200"
        style={{
          backgroundColor: nodeData.color || 'hsl(267 85% 66%)',
          border: '2px solid white',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          cursor: 'crosshair'
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!w-4 !h-4 !border-2 !border-white !shadow-lg hover:!ring-2 hover:!ring-blue-400 transition-colors duration-200"
        style={{
          backgroundColor: nodeData.color || 'hsl(267 85% 66%)',
          border: '2px solid white',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          cursor: 'crosshair'
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-4 !h-4 !border-2 !border-white !shadow-lg hover:!ring-2 hover:!ring-blue-400 transition-colors duration-200"
        style={{
          backgroundColor: nodeData.color || 'hsl(267 85% 66%)',
          border: '2px solid white',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          cursor: 'crosshair'
        }}
      />

      {/* Node Content */}
      <div className="flex items-center gap-2">
        {/* AI/Fundamental Indicators */}
        <div className="flex-shrink-0 flex items-center gap-1">
          {nodeData.isFundamental && (
            <div className="p-1 bg-yellow-100 dark:bg-yellow-900 rounded-full" title="Fundamental Node">
              <Target size={12} strokeWidth={2} className="text-yellow-600 dark:text-yellow-200" />
            </div>
          )}
          {nodeData.importance && nodeData.importance >= 8 && (
            <div className="p-1 bg-purple-100 dark:bg-purple-900 rounded-full" title={`Importance: ${nodeData.importance}/10`}>
              <Star size={12} strokeWidth={2} className="text-purple-600 dark:text-purple-200" />
            </div>
          )}
          {nodeData.complexity && nodeData.complexity >= 7 && (
            <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded-full" title={`Complexity: ${nodeData.complexity}/10`}>
              <Brain size={12} strokeWidth={2} className="text-blue-600 dark:text-blue-200" />
            </div>
          )}
        </div>
        
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
            <div className="flex items-center gap-2">
              <span className={cn(
                "font-medium text-gray-800 dark:text-gray-200 select-none block",
                nodeData.isCompleted && "line-through opacity-60",
                nodeData.isFundamental && "text-yellow-800 dark:text-yellow-200"
              )}>
                {label}
              </span>
              {nodeData.isFundamental && (
                <span className="text-xs bg-yellow-200 text-yellow-800 px-1 py-0.5 rounded font-medium">
                  CORE
                </span>
              )}
            </div>
            
            {/* AI Metadata */}
            {(nodeData.importance || nodeData.complexity) && (
              <div className="flex gap-2 mt-1">
                {nodeData.importance && (
                  <span className="text-xs bg-purple-100 text-purple-700 px-1 py-0.5 rounded">
                    Impact: {nodeData.importance}/10
                  </span>
                )}
                {nodeData.complexity && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-1 py-0.5 rounded">
                    Complexity: {nodeData.complexity}/10
                  </span>
                )}
              </div>
            )}
            
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

            {/* Suggested Branches Preview */}
            {nodeData.suggestedBranches && nodeData.suggestedBranches.length > 0 && (
              <div className="mt-2">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">AI Suggestions:</div>
                <div className="flex flex-wrap gap-1">
                  {nodeData.suggestedBranches.slice(0, 3).map((suggestion, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-green-100 text-green-700 px-1 py-0.5 rounded"
                    >
                      {suggestion}
                    </span>
                  ))}
                  {nodeData.suggestedBranches.length > 3 && (
                    <span className="text-xs text-gray-500">+{nodeData.suggestedBranches.length - 3} more</span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

            {/* Hover Tools - Centered Underneath */}
      <AnimatePresence>
        {showTools && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 z-50">
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              {/* Compact Actions Menu */}
              <div className="compact-actions-menu bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-lg">
                {/* Arrow pointing to node */}
                <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white/95 dark:bg-gray-900/95 border-l border-t border-gray-200/60 dark:border-gray-700/60 rotate-45"></div>
                
                {/* Actions Trigger Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTools(!showTools);
                  }}
                  className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-700/80 hover:from-gray-100/90 hover:to-white/90 dark:hover:from-gray-700/90 dark:hover:to-gray-600/90 border border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300/70 dark:hover:border-gray-500/70 transition-all duration-200 hover:scale-105"
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-sm">
                    <Zap size={12} className="text-white" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                    Actions
                  </span>
                  <motion.div
                    animate={{ rotate: showTools ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="chevron-arrow"
                  >
                    <ChevronDown className="w-3 h-3 text-gray-500" strokeWidth={2} />
                  </motion.div>
                </motion.button>
                
                {/* Expandable Actions Menu */}
                <AnimatePresence>
                  {showTools && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-gray-200/50 dark:border-gray-700/50"
                    >
                      <div className="p-2 space-y-1">
                        {[
                          {
                            id: 'edit',
                            label: 'Edit',
                            icon: <Edit3 size={12} strokeWidth={2} />,
                            color: '#8b5cf6',
                            onClick: () => setIsEditing(true)
                          },
                          {
                            id: 'add-child',
                            label: 'Add Child',
                            icon: <Plus size={12} strokeWidth={2} />,
                            color: '#3b82f6',
                            onClick: () => {
                              window.dispatchEvent(new CustomEvent('addChildNode', { detail: { parentId: id } }));
                            }
                          },
                          {
                            id: 'generate-branches',
                            label: 'AI Generate',
                            icon: nodeData.isFundamental ? <Zap size={12} strokeWidth={2} /> : <Sparkles size={12} strokeWidth={2} />,
                            color: nodeData.isFundamental ? '#eab308' : '#ec4899',
                            onClick: () => handleGenerateBranches()
                          },
                          {
                            id: 'add-message',
                            label: 'Message',
                            icon: <MessageSquare size={12} strokeWidth={2} />,
                            color: '#10b981',
                            onClick: () => setShowMessageInput(!showMessageInput)
                          },
                          {
                            id: 'change-color',
                            label: 'Color',
                            icon: <Palette size={12} strokeWidth={2} />,
                            color: '#f97316',
                            onClick: () => setShowColorPicker(!showColorPicker)
                          },
                          {
                            id: 'duplicate',
                            label: 'Duplicate',
                            icon: <Copy size={12} strokeWidth={2} />,
                            color: '#6366f1',
                            onClick: () => {
                              window.dispatchEvent(new CustomEvent('duplicateNode', { detail: { id } }));
                            }
                          },
                          {
                            id: 'delete',
                            label: 'Delete',
                            icon: <Trash2 size={12} strokeWidth={2} />,
                            color: '#ef4444',
                            onClick: () => {
                              window.dispatchEvent(new CustomEvent('deleteNode', { detail: { id } }));
                            }
                          }
                        ].map((item, index) => (
                          <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03, duration: 0.15 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              item.onClick();
                            }}
                            className="action-item group w-full flex items-center gap-2 px-2 py-1.5 rounded-md bg-transparent hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-all duration-200 hover:scale-[1.02]"
                          >
                            <div 
                              className="w-3 h-3 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                              style={{ 
                                background: item.color,
                                boxShadow: `0 2px 4px ${item.color}40`
                              }}
                            >
                              <div className="text-white text-xs">
                                {item.icon}
                              </div>
                            </div>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                              {item.label}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
      {/* Luxury Green SUBMIT button for first/root or editing node */}
      <div
        className="absolute bottom-[10px] right-[14px] z-20 min-w-[48px] min-h-[22px] flex items-end justify-end"
      >
        <span
          className="text-xs cursor-pointer underline decoration-dotted underline-offset-4 transition-all duration-200 hover:decoration-solid select-none"
          style={{ fontWeight: 500, color: 'var(--nov8-accent)' }}
          onClick={() => {
            window.dispatchEvent(new CustomEvent('generateBranches', {
              detail: { id, label }
            }));
          }}
        >
          GENERATE
        </span>
      </div>
      

    </motion.div>
  );
});

MindMapNode.displayName = 'MindMapNode';

export default MindMapNode;