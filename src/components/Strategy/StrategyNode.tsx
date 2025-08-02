import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { 
  Edit3, 
  Trash2, 
  Plus, 
  Target, 
  Calendar, 
  Users, 
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Settings,
  Copy,
  Star,
  AlertTriangle,
  Package,
  ArrowRight,
  RefreshCw,
  BarChart3,
  PieChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface StrategyNodeData extends Record<string, unknown> {
  label: string;
  color: string;
  fontSize: number;
  parentId?: string;
  category: string;
  messages: string[];
  opacity: number;
  scale: number;
  isGoal: boolean;
  importance: number;
  centralityScore: number;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
  dueDate?: Date;
  assignedTo?: string;
  budget?: number;
  type: 'goal' | 'strategy' | 'tactic' | 'milestone' | 'risk' | 'resource' | 'strength' | 'weakness' | 'opportunity' | 'threat' | 'rivalry' | 'suppliers' | 'customers' | 'entrants' | 'substitutes' | 'competitor' | 'market-size' | 'market-growth' | 'market-segments';
}

interface StrategyNodeProps extends NodeProps {
  data: StrategyNodeData;
  onSubmit?: (nodeId: string) => void;
}

const StrategyNode: React.FC<StrategyNodeProps> = ({ 
  id, 
  data, 
  selected,
  onSubmit 
}) => {
  const nodeData = data as StrategyNodeData;
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(nodeData.label);
  const [showDetails, setShowDetails] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setEditValue(nodeData.label);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [nodeData.label]);

  const handleSave = useCallback(() => {
    if (editValue.trim()) {
      nodeData.label = editValue.trim();
      setIsEditing(false);
      toast.success('Strategy node updated');
    }
  }, [editValue, nodeData]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setEditValue(nodeData.label);
  }, [nodeData.label]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  }, [handleSave, handleCancel]);

  const getStatusIcon = () => {
    switch (nodeData.status) {
      case 'completed':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-3 h-3 text-yellow-500" />;
      case 'pending':
        return <AlertCircle className="w-3 h-3 text-gray-500" />;
      default:
        return <Clock className="w-3 h-3 text-gray-500" />;
    }
  };

  const getPriorityColor = () => {
    switch (nodeData.priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = () => {
    switch (nodeData.type) {
      case 'goal':
        return <Target className="w-4 h-4" />;
      case 'strategy':
        return <TrendingUp className="w-4 h-4" />;
      case 'tactic':
        return <Settings className="w-4 h-4" />;
      case 'milestone':
        return <Calendar className="w-4 h-4" />;
      case 'risk':
        return <AlertCircle className="w-4 h-4" />;
      case 'resource':
        return <Users className="w-4 h-4" />;
      case 'strength':
        return <CheckCircle className="w-4 h-4" />;
      case 'weakness':
        return <AlertCircle className="w-4 h-4" />;
      case 'opportunity':
        return <TrendingUp className="w-4 h-4" />;
      case 'threat':
        return <AlertTriangle className="w-4 h-4" />;
      case 'rivalry':
        return <Target className="w-4 h-4" />;
      case 'suppliers':
        return <Package className="w-4 h-4" />;
      case 'customers':
        return <Users className="w-4 h-4" />;
      case 'entrants':
        return <ArrowRight className="w-4 h-4" />;
      case 'substitutes':
        return <RefreshCw className="w-4 h-4" />;
      case 'competitor':
        return <Target className="w-4 h-4" />;
      case 'market-size':
        return <BarChart3 className="w-4 h-4" />;
      case 'market-growth':
        return <TrendingUp className="w-4 h-4" />;
      case 'market-segments':
        return <PieChart className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const getTypeColor = () => {
    switch (nodeData.type) {
      case 'goal':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'strategy':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'tactic':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'milestone':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'risk':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'resource':
        return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 'strength':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'weakness':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'opportunity':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'threat':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'rivalry':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'suppliers':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'customers':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'entrants':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'substitutes':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'competitor':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'market-size':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'market-growth':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'market-segments':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-white border-2 border-gray-300 rounded-full"
      />
      
             <motion.div
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ 
           scale: nodeData.scale || 1, 
           opacity: nodeData.opacity || 1 
         }}
         transition={{ duration: 0.2 }}
         className={cn(
           "relative group",
           selected && "ring-2 ring-emerald-500 ring-offset-2"
         )}
       >
         <Card
           className={cn(
             "w-64 shadow-lg border-2 transition-all duration-200",
             selected 
               ? "border-emerald-500 shadow-emerald-500/20" 
               : "border-gray-200 hover:border-gray-300",
             "bg-white/95 backdrop-blur-sm"
           )}
           style={{
             borderColor: nodeData.color,
             transform: `scale(${nodeData.scale || 1})`
           }}
         >
          <CardContent className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {getTypeIcon()}
                <div className="flex flex-col">
                  {isEditing ? (
                    <Input
                      ref={inputRef}
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={handleSave}
                      className="h-6 text-sm font-medium"
                      autoFocus
                    />
                  ) : (
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {nodeData.label}
                    </h3>
                  )}
                  <div className="flex items-center gap-1 mt-1">
                    <Badge 
                      variant="outline" 
                      className={cn("text-xs", getTypeColor())}
                    >
                      {nodeData.type}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={cn("text-xs", getPriorityColor())}
                    >
                      {nodeData.priority}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {getStatusIcon()}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEdit}
                  className="h-6 w-6 p-0"
                >
                  <Edit3 className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                  className="h-6 w-6 p-0"
                >
                  <Settings className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span>{nodeData.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${nodeData.progress}%`,
                    backgroundColor: nodeData.color
                  }}
                />
              </div>
            </div>

            {/* Details */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 pt-2 border-t border-gray-200"
                >
                  {nodeData.assignedTo && (
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Users className="w-3 h-3" />
                      <span>{nodeData.assignedTo}</span>
                    </div>
                  )}
                  
                  {nodeData.budget && (
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <DollarSign className="w-3 h-3" />
                      <span>${nodeData.budget.toLocaleString()}</span>
                    </div>
                  )}
                  
                  {nodeData.dueDate && (
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar className="w-3 h-3" />
                      <span>{nodeData.dueDate.toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {nodeData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {nodeData.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            {nodeData.messages.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-600 line-clamp-2">
                  {nodeData.messages[0]}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-white border-2 border-gray-300 rounded-full"
      />
    </>
  );
};

export default StrategyNode; 