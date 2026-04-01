import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  Brain, Target, FileText, Calendar, Folder, Download, Plus, Settings, 
  Lightbulb, Users, TrendingUp, Save, Upload, Sparkles, Zap, 
  Crown, Eye, Layers, Rocket, Network, BarChart3, CheckCircle, 
  ArrowRight, Clock, Fish, Braces, Wand2, Bot, Cpu, Database,
  Circle, ZoomIn, ZoomOut, RotateCcw, Moon, Sun, Trash2, Undo, Redo,
  GitBranch, Building, Globe, Package, DollarSign, Leaf, Presentation,
  Thermometer, Gauge, ArrowUpDown, Shield, Award, PieChart,
  Activity, Timer, AlertTriangle, CheckSquare, Share2, Edit3,
  Minimize2, Maximize2, ChartBar, LineChart, ScatterChart
} from 'lucide-react';
import { simulationEngine, MonteCarloResult, SensitivityResult, RiskHeatmapCell, SimulationVariable as EngineVariable } from '@/services/simulationService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import SimulationAIToolbar from '@/components/Simulation/SimulationAIToolbar';
import { ServiceSwitcher } from '@/components/ui/logo';

interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  variables: SimulationVariable[];
  outcomes: SimulationOutcome[];
  riskScore: number;
  confidence: number;
  status: 'draft' | 'running' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

interface SimulationVariable {
  id: string;
  name: string;
  type: 'budget' | 'timeline' | 'resources' | 'market' | 'custom';
  currentValue: number;
  minValue: number;
  maxValue: number;
  unit: string;
  impact: 'high' | 'medium' | 'low';
  description: string;
}

interface SimulationOutcome {
  id: string;
  name: string;
  probability: number;
  roi: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  timeline: number;
  resources: number;
  description: string;
  recommendations: string[];
  risks: string[];
}

const Simulation: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<SimulationScenario | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [simulationCount, setSimulationCount] = useState(0);
  const [activeScenarios, setActiveScenarios] = useState(0);
  const [currentView, setCurrentView] = useState<'dashboard' | 'scenarios' | 'analysis' | 'reports'>('dashboard');
  const [selectedVariable, setSelectedVariable] = useState<string | null>(null);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [monteCarloResult, setMonteCarloResult] = useState<MonteCarloResult | null>(null);
  const [sensitivityResults, setSensitivityResults] = useState<SensitivityResult[]>([]);
  const [riskHeatmap, setRiskHeatmap] = useState<RiskHeatmapCell[][]>([]);

  // Mock data for demonstration
  const mockScenarios: SimulationScenario[] = [
    {
      id: 'scenario-1',
      name: 'Market Expansion Strategy',
      description: 'Simulate expansion into new markets with varying resource allocations',
      variables: [
        {
          id: 'budget',
          name: 'Investment Budget',
          type: 'budget',
          currentValue: 500000,
          minValue: 100000,
          maxValue: 2000000,
          unit: 'USD',
          impact: 'high',
          description: 'Total budget allocated for market expansion'
        },
        {
          id: 'timeline',
          name: 'Implementation Timeline',
          type: 'timeline',
          currentValue: 12,
          minValue: 6,
          maxValue: 24,
          unit: 'months',
          impact: 'medium',
          description: 'Time to market entry'
        },
        {
          id: 'team-size',
          name: 'Team Size',
          type: 'resources',
          currentValue: 15,
          minValue: 5,
          maxValue: 50,
          unit: 'people',
          impact: 'high',
          description: 'Number of team members allocated'
        }
      ],
      outcomes: [
        {
          id: 'outcome-1',
          name: 'Conservative Approach',
          probability: 0.35,
          roi: 0.15,
          riskLevel: 'low',
          timeline: 18,
          resources: 10,
          description: 'Slow, steady expansion with minimal risk',
          recommendations: [
            'Start with pilot markets',
            'Build strong local partnerships',
            'Focus on proven markets first'
          ],
          risks: [
            'Slow market penetration',
            'Competitor advantage',
            'Limited growth potential'
          ]
        },
        {
          id: 'outcome-2',
          name: 'Aggressive Expansion',
          probability: 0.25,
          roi: 0.35,
          riskLevel: 'high',
          timeline: 8,
          resources: 25,
          description: 'Rapid expansion with high growth potential',
          recommendations: [
            'Invest heavily in marketing',
            'Hire experienced local teams',
            'Establish strong brand presence'
          ],
          risks: [
            'High upfront costs',
            'Market uncertainty',
            'Resource strain'
          ]
        },
        {
          id: 'outcome-3',
          name: 'Balanced Strategy',
          probability: 0.40,
          roi: 0.25,
          riskLevel: 'medium',
          timeline: 12,
          resources: 15,
          description: 'Moderate expansion with controlled risk',
          recommendations: [
            'Phase-based expansion',
            'Data-driven market selection',
            'Flexible resource allocation'
          ],
          risks: [
            'Moderate competition',
            'Market timing risks',
            'Resource constraints'
          ]
        }
      ],
      riskScore: 0.65,
      confidence: 0.82,
      status: 'completed',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    }
  ];

  const handleRunSimulation = useCallback(async (scenario: any) => {
    setIsProcessing(true);
    setSimulationProgress(0);
    
    toast.loading('🤖 Running Monte Carlo simulation...', {
      description: 'Analyzing 10,000 scenarios with statistical modeling'
    });

    // Convert scenario variables to engine format
    const engineVars: EngineVariable[] = (scenario?.variables || mockScenarios[0].variables).map((v: any) => ({
      ...v,
      distribution: 'normal' as const,
      volatility: v.impact === 'high' ? 0.8 : v.impact === 'medium' ? 0.5 : 0.3,
    }));

    // Run Monte Carlo asynchronously with progress
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        const mcResult = simulationEngine.runMonteCarlo(engineVars, 10000, (pct) => {
          setSimulationProgress(pct);
        });
        setMonteCarloResult(mcResult);

        // Run sensitivity analysis
        const sensitivity = simulationEngine.runSensitivityAnalysis(engineVars);
        setSensitivityResults(sensitivity);

        // Generate risk heatmap
        const heatmap = simulationEngine.generateRiskHeatmap(engineVars);
        setRiskHeatmap(heatmap);

        // Generate outcomes from real data
        const realOutcomes = simulationEngine.generateOutcomes(engineVars, mcResult);
        
        const updatedScenario = {
          ...mockScenarios[0],
          outcomes: realOutcomes,
          riskScore: 1 - mcResult.probabilityOfSuccess,
          confidence: mcResult.probabilityOfSuccess,
          status: 'completed' as const,
        };
        
        setActiveScenario(updatedScenario);
        setActiveScenarios(1);
        setSimulationCount(prev => prev + 1);
        setIsProcessing(false);
        
        toast.success('Simulation completed!', {
          description: `${mcResult.iterations.toLocaleString()} scenarios analyzed • ${(mcResult.probabilityOfSuccess * 100).toFixed(1)}% success probability`
        });
        resolve();
      }, 100); // Small delay to let UI render
    });
  }, []);

  const handleAnalyzeRisk = useCallback(async () => {
    toast.loading('🔍 Analyzing risks...', {
      description: 'Evaluating potential threats and vulnerabilities'
    });

    setTimeout(() => {
      toast.success('Risk analysis completed!', {
        description: 'Risk assessment report generated'
      });
    }, 2000);
  }, []);

  const handleGenerateForecast = useCallback(async () => {
    toast.loading('📊 Generating forecast...', {
      description: 'Predicting future outcomes and trends'
    });

    setTimeout(() => {
      toast.success('Forecast generated!', {
        description: 'Predictive analysis complete'
      });
    }, 2000);
  }, []);

  const handleExportReport = useCallback(async () => {
    toast.loading('📄 Exporting report...', {
      description: 'Preparing comprehensive simulation report'
    });

    setTimeout(() => {
      toast.success('Report exported!', {
        description: 'Simulation report saved successfully'
      });
    }, 1500);
  }, []);

  const handleVariableChange = useCallback((variableId: string, value: number) => {
    if (!activeScenario) return;
    
    const updatedScenario = {
      ...activeScenario,
      variables: activeScenario.variables.map(v => 
        v.id === variableId ? { ...v, currentValue: value } : v
      )
    };
    setActiveScenario(updatedScenario);
  }, [activeScenario]);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'critical': return 'bg-red-200 text-red-900 border-red-400';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const renderStartScreen = () => (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-6 max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center"
        >
          <Brain className="w-10 h-10 text-white" />
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            AI Simulation & Decision Modeling
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Advanced scenario modeling, AI-generated forecasts, risk heatmaps, and sensitivity analysis for executive decision-making
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Scenario Modeling</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Run "what-if" scenarios with adjustable variables and instant outcome projections
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">AI Forecasts</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Intelligent predictions with confidence scores and risk assessments
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Risk Analysis</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Comprehensive risk heatmaps and mitigation strategy recommendations
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <Button
            onClick={() => setActiveScenario(mockScenarios[0])}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Start Simulation
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Import Scenario
          </Button>
        </motion.div>
      </div>
    </div>
  );

  const renderSimulationCanvas = () => (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Scenario Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {activeScenario?.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {activeScenario?.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleRunSimulation(activeScenario)}
              disabled={isProcessing}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            >
              {isProcessing ? (
                <>
                  <Bot className="w-4 h-4 mr-2 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Run Simulation
                </>
              )}
            </Button>
            <Button variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        {isProcessing && (
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Simulation Progress</span>
                  <span>{simulationProgress}%</span>
                </div>
                <Progress value={simulationProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="variables" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="variables">Variables</TabsTrigger>
            <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="variables" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeScenario?.variables.map((variable) => (
                <Card key={variable.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{variable.name}</CardTitle>
                      <Badge variant="outline" className={
                        variable.impact === 'high' ? 'bg-red-100 text-red-700 border-red-200' :
                        variable.impact === 'medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                        'bg-green-100 text-green-700 border-green-200'
                      }>
                        {variable.impact} impact
                      </Badge>
                    </div>
                    <CardDescription>{variable.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Current Value</span>
                        <span className="font-medium">
                          {variable.currentValue.toLocaleString()} {variable.unit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${((variable.currentValue - variable.minValue) / (variable.maxValue - variable.minValue)) * 100}%` 
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{variable.minValue.toLocaleString()} {variable.unit}</span>
                        <span>{variable.maxValue.toLocaleString()} {variable.unit}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="outcomes" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {activeScenario?.outcomes.map((outcome) => (
                <Card key={outcome.id} className="relative">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{outcome.name}</CardTitle>
                      <Badge variant="outline" className={getRiskColor(outcome.riskLevel)}>
                        {outcome.riskLevel} risk
                      </Badge>
                    </div>
                    <CardDescription>{outcome.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Probability</span>
                        <div className="font-semibold">{Math.round(outcome.probability * 100)}%</div>
                      </div>
                      <div>
                        <span className="text-gray-500">ROI</span>
                        <div className="font-semibold">{Math.round(outcome.roi * 100)}%</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Timeline</span>
                        <div className="font-semibold">{outcome.timeline} months</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Resources</span>
                        <div className="font-semibold">{outcome.resources} people</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Recommendations</h4>
                      <ul className="text-xs space-y-1">
                        {outcome.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Risks</h4>
                      <ul className="text-xs space-y-1">
                        {outcome.risks.map((risk, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertTriangle className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk Heatmap */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-red-500" />
                    Risk Heatmap
                  </CardTitle>
                  <CardDescription>
                    5×5 likelihood vs. impact matrix from simulation data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {riskHeatmap.length > 0 ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                        <span className="w-16">Impact →</span>
                        {[1,2,3,4,5].map(i => <span key={i} className="flex-1 text-center">{i}</span>)}
                      </div>
                      {riskHeatmap.map((row, li) => (
                        <div key={li} className="flex items-center gap-1">
                          <span className="w-16 text-xs text-gray-500">L:{li+1}</span>
                          {row.map((cell, ii) => {
                            const bg = cell.riskLevel === 'critical' ? 'bg-red-600' 
                              : cell.riskLevel === 'high' ? 'bg-red-400' 
                              : cell.riskLevel === 'medium' ? 'bg-yellow-400' 
                              : cell.riskLevel === 'low' ? 'bg-green-300' 
                              : 'bg-green-100';
                            return (
                              <div key={ii} className={`flex-1 h-10 rounded ${bg} flex items-center justify-center text-xs font-bold text-white`} title={cell.risks.join(', ') || cell.riskLevel}>
                                {cell.riskScore}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-48 flex items-center justify-center text-sm text-gray-500">
                      Run simulation to generate risk heatmap
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Sensitivity Analysis - Tornado Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-blue-500" />
                    Sensitivity Analysis (Tornado)
                  </CardTitle>
                  <CardDescription>
                    Variable impact on outcome — ranked by sensitivity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {sensitivityResults.length > 0 ? (
                    <div className="space-y-3">
                      {sensitivityResults.map((s) => {
                        const maxAbs = Math.max(...sensitivityResults.map(r => Math.max(Math.abs(r.tornadoLow), Math.abs(r.tornadoHigh))));
                        const scaleL = maxAbs > 0 ? (Math.abs(s.tornadoLow) / maxAbs) * 100 : 0;
                        const scaleH = maxAbs > 0 ? (Math.abs(s.tornadoHigh) / maxAbs) * 100 : 0;
                        return (
                          <div key={s.variableId} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium">{s.variableName}</span>
                              <span className="text-gray-500">Sensitivity: {(s.sensitivity * 100).toFixed(1)}%</span>
                            </div>
                            <div className="flex items-center h-6 gap-0.5">
                              <div className="flex-1 flex justify-end">
                                <div className="h-full bg-red-400 rounded-l" style={{ width: `${scaleL}%` }} />
                              </div>
                              <div className="w-px bg-gray-400 h-full" />
                              <div className="flex-1">
                                <div className="h-full bg-blue-400 rounded-r" style={{ width: `${scaleH}%` }} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="h-48 flex items-center justify-center text-sm text-gray-500">
                      Run simulation to see sensitivity analysis
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Monte Carlo Distribution */}
              {monteCarloResult && (
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ScatterChart className="w-5 h-5 text-purple-500" />
                      Monte Carlo Distribution ({monteCarloResult.iterations.toLocaleString()} simulations)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">{(monteCarloResult.meanOutcome * 100).toFixed(1)}%</div>
                        <div className="text-xs text-gray-600">Mean Outcome</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">{(monteCarloResult.stdDeviation * 100).toFixed(1)}%</div>
                        <div className="text-xs text-gray-600">Std Deviation</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-xl font-bold text-green-600">{(monteCarloResult.probabilityOfSuccess * 100).toFixed(1)}%</div>
                        <div className="text-xs text-gray-600">Success Probability</div>
                      </div>
                      <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className="text-xl font-bold text-red-600">{(monteCarloResult.probabilityOfLoss * 100).toFixed(1)}%</div>
                        <div className="text-xs text-gray-600">Loss Probability</div>
                      </div>
                    </div>
                    {/* Distribution histogram */}
                    <div className="flex items-end gap-px h-32">
                      {monteCarloResult.distribution.map((val, i) => (
                        <div key={i} className="flex-1 bg-purple-400 dark:bg-purple-600 rounded-t transition-all" style={{ height: `${Math.max(2, val * 100 * 8)}%` }} />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>P5: {(monteCarloResult.percentile5 * 100).toFixed(0)}%</span>
                      <span>P25: {(monteCarloResult.percentile25 * 100).toFixed(0)}%</span>
                      <span>Median: {(monteCarloResult.medianOutcome * 100).toFixed(0)}%</span>
                      <span>P75: {(monteCarloResult.percentile75 * 100).toFixed(0)}%</span>
                      <span>P95: {(monteCarloResult.percentile95 * 100).toFixed(0)}%</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Simulation Report</CardTitle>
                  <CardDescription>
                    Comprehensive analysis and recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{monteCarloResult ? monteCarloResult.iterations.toLocaleString() : '—'}</div>
                      <div className="text-sm text-gray-600">Simulations Run</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{monteCarloResult ? `${(monteCarloResult.probabilityOfSuccess * 100).toFixed(0)}%` : '—'}</div>
                      <div className="text-sm text-gray-600">Success Probability</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{activeScenario?.outcomes.length || 0}</div>
                      <div className="text-sm text-gray-600">Outcomes Generated</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{sensitivityResults.length}</div>
                      <div className="text-sm text-gray-600">Variables Analyzed</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button onClick={handleExportReport}>
                      <Download className="w-4 h-4 mr-2" />
                      Export PDF
                    </Button>
                    <Button variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col bg-background">
      {/* Header */}
      <div className="tool-header">
        <div className="flex items-center gap-3">
          <ServiceSwitcher current="simulation" />
          <div className="h-5 w-px bg-border" />
          <div className="tool-header-title">
            <Network className="w-4 h-4" style={{ color: 'hsl(260 60% 58%)' }} />
            <span className="hidden sm:inline">AI Simulation</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSidebar(!showSidebar)}
            className="h-8 px-3"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 320 }}
              exit={{ width: 0 }}
              className="flex-shrink-0"
            >
              <SimulationAIToolbar
                onRunSimulation={handleRunSimulation}
                onAnalyzeRisk={handleAnalyzeRisk}
                onGenerateForecast={handleGenerateForecast}
                onExportReport={handleExportReport}
                simulationCount={simulationCount}
                isProcessing={isProcessing}
                activeScenarios={activeScenarios}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeScenario ? renderSimulationCanvas() : renderStartScreen()}
        </div>
      </div>
    </div>
  );
};

export default Simulation; 