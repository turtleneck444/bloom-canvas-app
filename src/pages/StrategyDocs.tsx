import React from 'react';
import { Link } from 'react-router-dom';
import { Target, ArrowLeft, Zap, Users, Download, Share2, Settings, HelpCircle, BookOpen, Lightbulb, Brain, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const StrategyDocs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
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
              <Link to="/strategy">
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  <Target className="w-4 h-4 mr-2" />
                  Open Strategy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Strategy Co-Pilot Documentation
            </h1>
            <p className="text-xl lg:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              AI-driven strategic planning and analysis tools that help teams make better decisions with comprehensive frameworks and data-driven insights.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                AI-Powered Analysis
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Strategic Frameworks
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Risk Assessment
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Competitive Intelligence
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
                    <a href="#overview" className="block text-green-600 hover:text-green-700 font-medium py-2">
                      Overview
                    </a>
                    <a href="#features" className="block text-gray-600 hover:text-gray-900 py-2">
                      Key Features
                    </a>
                    <a href="#getting-started" className="block text-gray-600 hover:text-gray-900 py-2">
                      Getting Started
                    </a>
                    <a href="#frameworks" className="block text-gray-600 hover:text-gray-900 py-2">
                      Strategic Frameworks
                    </a>
                    <a href="#ai-analysis" className="block text-gray-600 hover:text-gray-900 py-2">
                      AI Analysis
                    </a>
                    <a href="#risk-assessment" className="block text-gray-600 hover:text-gray-900 py-2">
                      Risk Assessment
                    </a>
                    <a href="#competitive-intelligence" className="block text-gray-600 hover:text-gray-900 py-2">
                      Competitive Intelligence
                    </a>
                    <a href="#reporting" className="block text-gray-600 hover:text-gray-900 py-2">
                      Reporting & Analytics
                    </a>
                    <a href="#integrations" className="block text-gray-600 hover:text-gray-900 py-2">
                      Integrations
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
                  NOV8 Strategy Co-Pilot is an advanced AI-powered strategic planning platform designed to help 
                  organizations make informed decisions through comprehensive analysis, competitive intelligence, 
                  and data-driven insights. Whether you're developing a new business strategy, analyzing market 
                  opportunities, or planning organizational transformation, our platform provides the tools and 
                  frameworks you need.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  The platform combines traditional strategic frameworks with cutting-edge AI technology to 
                  identify patterns, assess risks, and provide actionable recommendations that drive business growth.
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
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>AI-Powered Analysis</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Advanced AI algorithms analyze market data, competitive landscapes, and internal metrics 
                      to provide strategic insights and recommendations.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Strategic Frameworks</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Built-in frameworks including SWOT, Porter's 5 Forces, PESTEL, and Balanced Scorecard 
                      to guide your strategic planning process.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Risk Assessment</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Comprehensive risk analysis tools that identify potential threats and opportunities, 
                      helping you develop mitigation strategies.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Collaborative Planning</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Real-time collaboration features that enable teams to work together on strategic 
                      initiatives with version control and commenting.
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
                      <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                      Define Your Strategic Objective
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Start by clearly defining your strategic objective or challenge. This could be entering 
                      a new market, launching a product, or transforming your organization.
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-700 font-medium">Pro Tip:</p>
                      <p className="text-sm text-green-600">
                        Be specific about your goals and timeline. The more precise your objective, 
                        the better the AI can tailor its analysis and recommendations.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                      Choose Your Framework
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Select the appropriate strategic framework based on your objective. The AI will guide 
                      you through the analysis process step by step.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Popular Frameworks:</p>
                        <ul className="text-gray-600 mt-2 space-y-1">
                          <li>• SWOT Analysis</li>
                          <li>• Porter's 5 Forces</li>
                          <li>• PESTEL Analysis</li>
                          <li>• Balanced Scorecard</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">AI Recommendations:</p>
                        <ul className="text-gray-600 mt-2 space-y-1">
                          <li>• Framework selection</li>
                          <li>• Analysis depth</li>
                          <li>• Key focus areas</li>
                          <li>• Timeline optimization</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                      Conduct Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Work through each section of your chosen framework. The AI will provide insights, 
                      suggest data sources, and help you identify key strategic factors.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-700 font-medium">AI Assistance:</p>
                      <p className="text-sm text-blue-600">
                        The AI can automatically gather market data, analyze competitors, 
                        and suggest strategic options based on your inputs.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Strategic Frameworks Section */}
            <section id="frameworks">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Strategic Frameworks</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-green-500" />
                      SWOT Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Comprehensive Strengths, Weaknesses, Opportunities, and Threats analysis with AI-powered 
                      insights and competitive benchmarking.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-green-100 rounded-lg">
                        <div className="text-lg font-bold text-green-700 mb-1">S</div>
                        <p className="text-xs text-green-600">Strengths</p>
                      </div>
                      <div className="text-center p-3 bg-red-100 rounded-lg">
                        <div className="text-lg font-bold text-red-700 mb-1">W</div>
                        <p className="text-xs text-red-600">Weaknesses</p>
                      </div>
                      <div className="text-center p-3 bg-blue-100 rounded-lg">
                        <div className="text-lg font-bold text-blue-700 mb-1">O</div>
                        <p className="text-xs text-blue-600">Opportunities</p>
                      </div>
                      <div className="text-center p-3 bg-orange-100 rounded-lg">
                        <div className="text-lg font-bold text-orange-700 mb-1">T</div>
                        <p className="text-xs text-orange-600">Threats</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                      Porter's 5 Forces
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Industry analysis framework examining competitive rivalry, supplier power, buyer power, 
                      threat of new entrants, and threat of substitutes.
                    </p>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Competitive Rivalry Analysis</li>
                      <li>• Supplier Power Assessment</li>
                      <li>• Buyer Power Evaluation</li>
                      <li>• New Entrants Threat</li>
                      <li>• Substitutes Analysis</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="w-5 h-5 mr-2 text-purple-500" />
                      PESTEL Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Macro-environmental analysis covering Political, Economic, Social, Technological, 
                      Environmental, and Legal factors affecting your business.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <Badge variant="outline">Political</Badge>
                      <Badge variant="outline">Economic</Badge>
                      <Badge variant="outline">Social</Badge>
                      <Badge variant="outline">Technological</Badge>
                      <Badge variant="outline">Environmental</Badge>
                      <Badge variant="outline">Legal</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* AI Analysis Section */}
            <section id="ai-analysis">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">AI Analysis Capabilities</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                      Market Intelligence
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      AI-powered market analysis that continuously monitors industry trends, competitor 
                      movements, and market opportunities to provide real-time strategic insights.
                    </p>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Real-time market monitoring</li>
                      <li>• Competitor analysis and tracking</li>
                      <li>• Trend identification and forecasting</li>
                      <li>• Market opportunity detection</li>
                      <li>• Industry benchmark comparisons</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-blue-500" />
                      Predictive Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Advanced predictive models that forecast market changes, identify potential risks, 
                      and suggest optimal strategic timing for your initiatives.
                    </p>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Market trend forecasting</li>
                      <li>• Risk probability assessment</li>
                      <li>• Strategic timing optimization</li>
                      <li>• Scenario planning and modeling</li>
                      <li>• Performance prediction</li>
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
                      Comprehensive risk identification across multiple dimensions including market, 
                      operational, financial, and strategic risks.
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
                    <CardTitle>Mitigation Strategies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      AI-suggested mitigation strategies and contingency plans to address identified 
                      risks and protect your strategic objectives.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Preventive Measures</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Contingency Plans</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">Monitoring Systems</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Competitive Intelligence Section */}
            <section id="competitive-intelligence">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Competitive Intelligence</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Competitor Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Comprehensive analysis of competitors including their strategies, strengths, 
                      weaknesses, market positioning, and potential moves.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-700 mb-1">Strategy</div>
                        <p className="text-xs text-gray-500">Analysis</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-700 mb-1">Positioning</div>
                        <p className="text-xs text-gray-500">Market</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-700 mb-1">Capabilities</div>
                        <p className="text-xs text-gray-500">Assessment</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-700 mb-1">Predictions</div>
                        <p className="text-xs text-gray-500">Future Moves</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Reporting & Analytics Section */}
            <section id="reporting">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Reporting & Analytics</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Strategic Dashboards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Real-time dashboards that track key strategic metrics, progress against objectives, 
                      and provide actionable insights for decision-making.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-700 mb-1">KPIs</div>
                        <p className="text-xs text-green-600">Tracking</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-700 mb-1">Progress</div>
                        <p className="text-xs text-blue-600">Monitoring</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-lg font-bold text-purple-700 mb-1">Insights</div>
                        <p className="text-xs text-purple-600">Analytics</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Integrations Section */}
            <section id="integrations">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Integrations</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Integrations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-bold">S</span>
                        </div>
                        <p className="text-sm font-medium">Salesforce</p>
                        <p className="text-xs text-gray-500">CRM Data</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-bold">H</span>
                        </div>
                        <p className="text-sm font-medium">HubSpot</p>
                        <p className="text-xs text-gray-500">Marketing</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-bold">T</span>
                        </div>
                        <p className="text-sm font-medium">Tableau</p>
                        <p className="text-xs text-gray-500">Analytics</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-orange-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-bold">G</span>
                        </div>
                        <p className="text-sm font-medium">Google Analytics</p>
                        <p className="text-xs text-gray-500">Web Data</p>
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
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Develop Your Strategy?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Leverage AI-powered strategic planning and analysis tools to make better decisions and drive business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/strategy">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Target className="w-5 h-5 mr-2" />
                Start Strategic Planning
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              <HelpCircle className="w-5 h-5 mr-2" />
              Get Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StrategyDocs; 