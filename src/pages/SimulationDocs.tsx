import React from 'react';
import { Link } from 'react-router-dom';
import { Network, ArrowLeft, Zap, Users, Download, Share2, Settings, HelpCircle, BookOpen, Lightbulb, Target, TrendingUp, BarChart3, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SimulationDocs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <HelpCircle className="w-4 h-4 mr-2" />
                Support
              </Button>
              <Link to="/simulation">
                <Button className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600">
                  <Network className="w-4 h-4 mr-2" />
                  Open Simulation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-purple-500 to-violet-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Network className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              AI Simulation Documentation
            </h1>
            <p className="text-xl lg:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Advanced scenario modeling and decision forecasting with comprehensive analytics and risk assessment capabilities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Scenario Modeling
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Risk Assessment
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Predictive Analytics
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Sensitivity Analysis
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    <a href="#overview" className="block text-purple-600 hover:text-purple-700 font-medium py-2">
                      Overview
                    </a>
                    <a href="#features" className="block text-gray-600 hover:text-gray-900 py-2">
                      Key Features
                    </a>
                    <a href="#getting-started" className="block text-gray-600 hover:text-gray-900 py-2">
                      Getting Started
                    </a>
                    <a href="#scenario-modeling" className="block text-gray-600 hover:text-gray-900 py-2">
                      Scenario Modeling
                    </a>
                    <a href="#risk-assessment" className="block text-gray-600 hover:text-gray-900 py-2">
                      Risk Assessment
                    </a>
                    <a href="#predictive-analytics" className="block text-gray-600 hover:text-gray-900 py-2">
                      Predictive Analytics
                    </a>
                    <a href="#sensitivity-analysis" className="block text-gray-600 hover:text-gray-900 py-2">
                      Sensitivity Analysis
                    </a>
                    <a href="#reporting" className="block text-gray-600 hover:text-gray-900 py-2">
                      Reporting & Visualization
                    </a>
                  </nav>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Documentation Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview Section */}
            <section id="overview">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-6">
                  NOV8 AI Simulation is a powerful platform for scenario modeling and decision forecasting 
                  that helps organizations make informed decisions through advanced analytics and risk assessment. 
                  Whether you're planning business strategies, evaluating investments, or preparing for market 
                  changes, our AI-powered simulation tools provide the insights you need.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  The platform combines sophisticated mathematical models with machine learning algorithms 
                  to create realistic simulations that account for multiple variables, uncertainties, and 
                  complex interdependencies in your business environment.
                </p>
              </div>
            </section>

            {/* Key Features Section */}
            <section id="features">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Scenario Modeling</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Create and test multiple scenarios to understand potential outcomes and 
                      their likelihood under different conditions and assumptions.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Risk Assessment</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Comprehensive risk analysis that identifies potential threats, quantifies 
                      their impact, and suggests mitigation strategies.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Predictive Analytics</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Advanced forecasting models that predict future trends, market changes, 
                      and business outcomes with high accuracy.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Sensitivity Analysis</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Analyze how changes in key variables affect your outcomes and identify 
                      the most critical factors for success.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Getting Started Section */}
            <section id="getting-started">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Getting Started</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                      Define Your Simulation Objective
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Start by clearly defining what you want to simulate. This could be a business decision, 
                      market scenario, investment opportunity, or strategic initiative.
                    </p>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-purple-700 font-medium">Pro Tip:</p>
                      <p className="text-sm text-purple-600">
                        Be specific about your objectives and success metrics. The more precise your goals, 
                        the better the AI can tailor the simulation parameters and analysis.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                      Configure Simulation Parameters
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Set up the key variables, assumptions, and constraints for your simulation. 
                      The AI will help you identify relevant factors and suggest realistic ranges.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Key Variables:</p>
                        <ul className="text-gray-600 mt-2 space-y-1">
                          <li>• Market conditions</li>
                          <li>• Resource constraints</li>
                          <li>• Time horizons</li>
                          <li>• Risk factors</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">AI Assistance:</p>
                        <ul className="text-gray-600 mt-2 space-y-1">
                          <li>• Parameter suggestions</li>
                          <li>• Range optimization</li>
                          <li>• Sensitivity analysis</li>
                          <li>• Scenario generation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                      Run Simulations & Analyze Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Execute multiple simulation runs and analyze the results to understand outcomes, 
                      identify patterns, and make data-driven decisions.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-700 font-medium">Analysis Features:</p>
                      <p className="text-sm text-blue-600">
                        The AI provides detailed analysis including probability distributions, 
                        confidence intervals, and actionable recommendations based on simulation results.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Scenario Modeling Section */}
            <section id="scenario-modeling">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Scenario Modeling</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-purple-500" />
                      What-If Scenarios
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Create and test multiple "what-if" scenarios to understand how different 
                      conditions and decisions affect your outcomes.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-700 mb-1">Best Case</div>
                        <p className="text-xs text-green-600">Optimistic scenario</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-lg font-bold text-yellow-700 mb-1">Base Case</div>
                        <p className="text-xs text-yellow-600">Most likely scenario</p>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-lg font-bold text-red-700 mb-1">Worst Case</div>
                        <p className="text-xs text-red-600">Pessimistic scenario</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Network className="w-5 h-5 mr-2 text-blue-500" />
                      Monte Carlo Simulations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Advanced probabilistic modeling that runs thousands of simulations with 
                      random variations to provide comprehensive outcome distributions.
                    </p>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Probability distributions for all outcomes</li>
                      <li>• Confidence intervals and risk metrics</li>
                      <li>• Sensitivity analysis across variables</li>
                      <li>• Statistical significance testing</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Risk Assessment Section */}
            <section id="risk-assessment">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Risk Assessment</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Identification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Systematic identification of potential risks across multiple dimensions 
                      including market, operational, financial, and strategic risks.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm">High Risk</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Medium Risk</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Low Risk</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Risk Quantification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Quantify the probability and impact of identified risks using advanced 
                      statistical models and historical data analysis.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Probability Analysis</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Impact Assessment</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">Risk Scoring</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Predictive Analytics Section */}
            <section id="predictive-analytics">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Predictive Analytics</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                      Market Forecasting
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Advanced forecasting models that predict market trends, demand patterns, 
                      and competitive dynamics with high accuracy.
                    </p>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Time series analysis and trend prediction</li>
                      <li>• Seasonal pattern recognition</li>
                      <li>• Market volatility modeling</li>
                      <li>• Competitive response prediction</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-green-500" />
                      Performance Prediction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Predict business performance metrics including revenue, profitability, 
                      market share, and operational efficiency.
                    </p>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Revenue forecasting and modeling</li>
                      <li>• Profitability analysis and optimization</li>
                      <li>• Market share prediction</li>
                      <li>• Operational efficiency forecasting</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Sensitivity Analysis Section */}
            <section id="sensitivity-analysis">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sensitivity Analysis</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Variable Impact Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Analyze how changes in key variables affect your outcomes and identify 
                      the most critical factors for success.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-lg font-bold text-red-700 mb-1">High</div>
                        <p className="text-xs text-red-600">Impact</p>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <div className="text-lg font-bold text-yellow-700 mb-1">Medium</div>
                        <p className="text-xs text-yellow-600">Impact</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-700 mb-1">Low</div>
                        <p className="text-xs text-green-600">Impact</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-700 mb-1">Critical</div>
                        <p className="text-xs text-blue-600">Factors</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Reporting & Visualization Section */}
            <section id="reporting">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Reporting & Visualization</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Dashboards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Real-time dashboards that visualize simulation results, risk metrics, 
                      and predictive analytics with interactive charts and graphs.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-lg font-bold text-purple-700 mb-1">Charts</div>
                        <p className="text-xs text-purple-600">Visualization</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-700 mb-1">Metrics</div>
                        <p className="text-xs text-blue-600">Key Indicators</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-700 mb-1">Reports</div>
                        <p className="text-xs text-green-600">Detailed Analysis</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-500 to-violet-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Simulating?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Test different scenarios and make data-driven decisions with advanced AI-powered simulation tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/simulation">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Network className="w-5 h-5 mr-2" />
                Start Simulation
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              <HelpCircle className="w-5 h-5 mr-2" />
              Get Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimulationDocs; 