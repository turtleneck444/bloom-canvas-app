import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  DollarSign,
  BarChart3,
  PieChart,
  ArrowRight,
  Star,
  Calendar,
  Settings,
  Eye,
  Edit3,
  Download,
  Share2,
  Filter,
  Search,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface StrategyElement {
  id: string;
  title: string;
  description: string;
  type: 'goal' | 'strategy' | 'tactic' | 'milestone' | 'risk' | 'resource' | 'strength' | 'weakness' | 'opportunity' | 'threat';
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
  importance: number;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  dueDate?: Date;
  assignedTo?: string;
  budget?: number;
  tags: string[];
  category: string;
  metrics?: {
    kpi: string;
    current: number;
    target: number;
    unit: string;
  }[];
}

interface StrategyOutputProps {
  data: StrategyElement[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onExport?: () => void;
  onShare?: () => void;
}

const StrategyOutput: React.FC<StrategyOutputProps> = ({ 
  data, 
  onEdit, 
  onDelete, 
  onExport, 
  onShare 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('importance');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'goal': return <Target className="w-4 h-4" />;
      case 'strategy': return <TrendingUp className="w-4 h-4" />;
      case 'tactic': return <ArrowRight className="w-4 h-4" />;
      case 'milestone': return <CheckCircle className="w-4 h-4" />;
      case 'risk': return <AlertTriangle className="w-4 h-4" />;
      case 'resource': return <Users className="w-4 h-4" />;
      case 'strength': return <Star className="w-4 h-4" />;
      case 'weakness': return <AlertTriangle className="w-4 h-4" />;
      case 'opportunity': return <TrendingUp className="w-4 h-4" />;
      case 'threat': return <AlertTriangle className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'goal': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'strategy': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'tactic': return 'bg-green-100 text-green-700 border-green-200';
      case 'milestone': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'risk': return 'bg-red-100 text-red-700 border-red-200';
      case 'resource': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'strength': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'weakness': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'opportunity': return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'threat': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredData = data.filter(item => 
    filterType === 'all' || item.type === filterType
  );

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case 'importance': return b.importance - a.importance;
      case 'priority': return a.priority.localeCompare(b.priority);
      case 'status': return a.status.localeCompare(b.status);
      case 'type': return a.type.localeCompare(b.type);
      default: return b.importance - a.importance;
    }
  });

  const groupedData = {
    goals: data.filter(item => item.type === 'goal'),
    strategies: data.filter(item => item.type === 'strategy'),
    tactics: data.filter(item => item.type === 'tactic'),
    risks: data.filter(item => item.type === 'risk'),
    resources: data.filter(item => item.type === 'resource'),
    analysis: data.filter(item => ['strength', 'weakness', 'opportunity', 'threat'].includes(item.type))
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-blue-900/20 p-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Strategy Co-Pilot Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive strategic analysis and planning
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')}
          >
            {viewMode === 'cards' ? 'Table View' : 'Card View'}
          </Button>
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={onShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Elements</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{data.length}</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">High Priority</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {data.filter(item => item.priority === 'high').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">In Progress</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {data.filter(item => item.status === 'in-progress').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Avg Progress</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {Math.round(data.reduce((sum, item) => sum + item.progress, 0) / data.length)}%
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
              >
                <option value="all">All Types</option>
                <option value="goal">Goals</option>
                <option value="strategy">Strategies</option>
                <option value="tactic">Tactics</option>
                <option value="risk">Risks</option>
                <option value="resource">Resources</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
              >
                <option value="importance">Sort by Importance</option>
                <option value="priority">Sort by Priority</option>
                <option value="status">Sort by Status</option>
                <option value="type">Sort by Type</option>
              </select>
            </div>

            {/* Content */}
            {viewMode === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {sortedData.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(item.type)}
                              <Badge variant="outline" className={getTypeColor(item.type)}>
                                {item.type}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <Badge variant="outline" className={getPriorityColor(item.priority)}>
                                {item.priority}
                              </Badge>
                              <Badge variant="outline" className={getStatusColor(item.status)}>
                                {item.status}
                              </Badge>
                            </div>
                          </div>
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <CardDescription className="text-sm">
                            {item.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            <div>
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{item.progress}%</span>
                              </div>
                              <Progress value={item.progress} className="h-2" />
                            </div>
                            
                            <div className="flex items-center justify-between text-sm">
                              <span>Importance</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500" />
                                <span>{item.importance}/10</span>
                              </div>
                            </div>

                            {item.budget && (
                              <div className="flex items-center justify-between text-sm">
                                <span>Budget</span>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="w-3 h-3" />
                                  <span>${item.budget.toLocaleString()}</span>
                                </div>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-1">
                              {item.tags.slice(0, 3).map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {item.tags.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{item.tags.length - 3}
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline" onClick={() => onEdit?.(item.id)}>
                                  <Edit3 className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => onDelete?.(item.id)}>
                                  <Eye className="w-3 h-3" />
                                </Button>
                              </div>
                              {item.dueDate && (
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Calendar className="w-3 h-3" />
                                  <span>{item.dueDate.toLocaleDateString()}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Importance</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTypeIcon(item.type)}
                              <Badge variant="outline" className={getTypeColor(item.type)}>
                                {item.type}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{item.title}</div>
                              <div className="text-sm text-gray-500">{item.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getPriorityColor(item.priority)}>
                              {item.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="w-20">
                              <Progress value={item.progress} className="h-2" />
                              <span className="text-xs">{item.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span>{item.importance}/10</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button size="sm" variant="outline" onClick={() => onEdit?.(item.id)}>
                                <Edit3 className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => onDelete?.(item.id)}>
                                <Eye className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Other tabs would follow similar pattern */}
        <TabsContent value="goals" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedData.goals.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                        Goal
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>

                      {item.metrics && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">KPIs</h4>
                          {item.metrics.map((metric, metricIndex) => (
                            <div key={metricIndex} className="flex items-center justify-between text-sm">
                              <span>{metric.kpi}</span>
                              <span>{metric.current}/{metric.target} {metric.unit}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Add similar content for other tabs */}
      </Tabs>
    </div>
  );
};

export default StrategyOutput; 