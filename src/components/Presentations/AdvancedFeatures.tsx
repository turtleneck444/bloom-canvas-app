import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Brain, 
  Sparkles, 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  Globe, 
  Clock,
  Eye,
  BarChart3,
  Lightbulb,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Palette,
  Type,
  ImageIcon,
  Video,
  Music,
  FileText,
  Download,
  Share2,
  Lock,
  Unlock,
  EyeOff,
  Maximize2,
  Minimize2,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdvancedFeaturesProps {
  onAIGenerate: () => void;
  onSmartLayout: () => void;
  onAutoAnimate: () => void;
  onCollaborate: () => void;
  onExportAdvanced: () => void;
  onPresentMode: () => void;
  onDevicePreview: () => void;
  onAnalytics: () => void;
}

const AdvancedFeatures: React.FC<AdvancedFeaturesProps> = ({
  onAIGenerate,
  onSmartLayout,
  onAutoAnimate,
  onCollaborate,
  onExportAdvanced,
  onPresentMode,
  onDevicePreview,
  onAnalytics
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const features = [
    {
      id: 'ai-generate',
      title: 'AI Content Generation',
      description: 'Generate slides, content, and layouts with AI',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      action: onAIGenerate,
      badge: 'AI'
    },
    {
      id: 'smart-layout',
      title: 'Smart Layout Engine',
      description: 'Automatically arrange content for optimal presentation',
      icon: Sparkles,
      color: 'from-blue-500 to-cyan-500',
      action: onSmartLayout,
      badge: 'Smart'
    },
    {
      id: 'auto-animate',
      title: 'Auto Animations',
      description: 'Add professional animations automatically',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      action: onAutoAnimate,
      badge: 'Auto'
    },
    {
      id: 'collaborate',
      title: 'Real-time Collaboration',
      description: 'Work together with team members live',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      action: onCollaborate,
      badge: 'Live'
    },
    {
      id: 'export-advanced',
      title: 'Advanced Export',
      description: 'Export to multiple formats with custom settings',
      icon: Download,
      color: 'from-indigo-500 to-purple-500',
      action: onExportAdvanced,
      badge: 'Pro'
    },
    {
      id: 'present-mode',
      title: 'Presentation Mode',
      description: 'Full-screen presentation with speaker notes',
      icon: Eye,
      color: 'from-red-500 to-pink-500',
      action: onPresentMode,
      badge: 'Pro'
    },
    {
      id: 'device-preview',
      title: 'Multi-Device Preview',
      description: 'Preview on different screen sizes',
      icon: Smartphone,
      color: 'from-gray-500 to-slate-500',
      action: onDevicePreview,
      badge: 'Preview'
    },
    {
      id: 'analytics',
      title: 'Presentation Analytics',
      description: 'Track engagement and performance metrics',
      icon: BarChart3,
      color: 'from-teal-500 to-cyan-500',
      action: onAnalytics,
      badge: 'Analytics'
    }
  ];

  return (
    <div className="fixed top-20 right-4 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                Advanced Features
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {features.map((feature) => (
                <motion.div
                  key={feature.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-gray-200/50 dark:border-gray-700/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                            <feature.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                              {feature.title}
                            </CardTitle>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {feature.badge}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button
                        onClick={feature.action}
                        size="sm"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Activate
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      

    </div>
  );
};

export default AdvancedFeatures; 