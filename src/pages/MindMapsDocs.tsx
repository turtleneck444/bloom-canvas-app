import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, ArrowLeft, Zap, Users, Download, Share2, Settings, HelpCircle, BookOpen, Lightbulb, Target, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const MindMapsDocs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
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
              <Link to="/mindmaps">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                  <Brain className="w-4 h-4 mr-2" />
                  Open Mind Maps
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Mind Maps Documentation
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Transform your ideas into powerful visual workflows with AI-powered mind mapping and intelligent node generation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                AI-Powered
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Real-time Collaboration
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Multiple Layouts
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Export Options
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
                    <a href="#overview" className="block text-blue-600 hover:text-blue-700 font-medium py-2">
                      Overview
                    </a>
                    <a href="#features" className="block text-gray-600 hover:text-gray-900 py-2">
                      Key Features
                    </a>
                    <a href="#getting-started" className="block text-gray-600 hover:text-gray-900 py-2">
                      Getting Started
                    </a>
                    <a href="#ai-capabilities" className="block text-gray-600 hover:text-gray-900 py-2">
                      AI Capabilities
                    </a>
                    <a href="#collaboration" className="block text-gray-600 hover:text-gray-900 py-2">
                      Collaboration
                    </a>
                    <a href="#export-import" className="block text-gray-600 hover:text-gray-900 py-2">
                      Export & Import
                    </a>
                    <a href="#layouts" className="block text-gray-600 hover:text-gray-900 py-2">
                      Layout Options
                    </a>
                    <a href="#templates" className="block text-gray-600 hover:text-gray-900 py-2">
                      Templates
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
                  NOV8 Mind Maps is a powerful AI-driven mind mapping tool designed to help teams and individuals 
                  transform complex ideas into clear, visual workflows. Whether you're brainstorming new concepts, 
                  planning projects, or organizing information, our intelligent platform provides the tools you need 
                  to think visually and collaborate effectively.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  The platform combines traditional mind mapping techniques with cutting-edge AI technology to 
                  suggest connections, generate ideas, and help you discover new perspectives on your thoughts 
                  and projects.
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
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>AI Node Generation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Intelligent AI suggests related concepts and ideas as you build your mind map, 
                      helping you discover connections you might have missed.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Real-time Collaboration</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Work together with your team in real-time, see changes as they happen, 
                      and maintain version control for all your mind maps.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Multiple Layouts</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Choose from various layout options including radial, hierarchical, 
                      and free-form to best represent your ideas and concepts.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Export Options</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Export your mind maps in multiple formats including PDF, PNG, 
                      SVG, and integrate with other tools and platforms.
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
                      <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                      Create Your First Mind Map
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Start by clicking the "Create New Mind Map" button in the dashboard. 
                      You'll be presented with a blank canvas and a central node to begin your journey.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700 font-medium">Pro Tip:</p>
                      <p className="text-sm text-gray-600">
                        Begin with a central concept and let the AI suggest related ideas. 
                        This helps you explore different angles of your topic.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                      Add and Connect Nodes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Click on the canvas to add new nodes, or use the AI suggestions that appear 
                      as you type. Connect nodes by dragging from one to another, or let the AI 
                      suggest logical connections.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Keyboard Shortcuts:</p>
                        <ul className="text-gray-600 mt-2 space-y-1">
                          <li>• Enter: Add new node</li>
                          <li>• Tab: Add child node</li>
                          <li>• Delete: Remove selected</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Mouse Actions:</p>
                        <ul className="text-gray-600 mt-2 space-y-1">
                          <li>• Double-click: Edit node</li>
                          <li>• Drag: Move nodes</li>
                          <li>• Scroll: Zoom in/out</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                      Customize and Organize
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Use colors, icons, and different node styles to organize your information. 
                      Group related concepts and use the AI-powered clustering to automatically 
                      organize your ideas.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-700 font-medium">AI Organization:</p>
                      <p className="text-sm text-blue-600">
                        The AI can automatically suggest color coding and grouping based on 
                        the content and relationships between your nodes.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* AI Capabilities Section */}
            <section id="ai-capabilities">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">AI Capabilities</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                      Intelligent Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Our AI analyzes your mind map content and suggests related concepts, 
                      helping you explore new ideas and connections you might not have considered.
                    </p>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Context-aware topic suggestions</li>
                      <li>• Related concept recommendations</li>
                      <li>• Industry-specific terminology</li>
                      <li>• Trend-based idea generation</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Network className="w-5 h-5 mr-2 text-purple-500" />
                      Smart Connections
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      The AI automatically suggests logical connections between nodes based on 
                      semantic analysis and common knowledge patterns.
                    </p>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Semantic relationship detection</li>
                      <li>• Hierarchical structure suggestions</li>
                      <li>• Cross-domain connections</li>
                      <li>• Logical flow optimization</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Collaboration Section */}
            <section id="collaboration">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Collaboration Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Real-time Editing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Multiple team members can work on the same mind map simultaneously, 
                      with changes reflected in real-time for all participants.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Live collaboration</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Version Control</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Track changes, revert to previous versions, and maintain a complete 
                      history of your mind map's evolution.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Change tracking</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Comments & Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Add comments to specific nodes, provide feedback, and discuss ideas 
                      directly within the mind map interface.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Inline discussions</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Access Control</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Set permissions for different team members, control who can edit, 
                      view, or comment on your mind maps.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Role-based access</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Export & Import Section */}
            <section id="export-import">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Export & Import</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Export Formats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-500 mb-2">PDF</div>
                        <p className="text-sm text-gray-600">High-quality print</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-500 mb-2">PNG</div>
                        <p className="text-sm text-gray-600">Image format</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-500 mb-2">SVG</div>
                        <p className="text-sm text-gray-600">Scalable vector</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-500 mb-2">JSON</div>
                        <p className="text-sm text-gray-600">Data format</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Integration Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Connect your mind maps with other tools and platforms for seamless workflow integration.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Slack</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Notion</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Trello</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">Asana</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm">Jira</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                        <span className="text-sm">Miro</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Layouts Section */}
            <section id="layouts">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Layout Options</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Radial Layout</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Traditional mind map layout with the central concept at the center 
                      and related ideas radiating outward in a circular pattern.
                    </p>
                    <Badge variant="outline">Best for brainstorming</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hierarchical Layout</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Tree-like structure with clear parent-child relationships, 
                      perfect for organizing information in a logical flow.
                    </p>
                    <Badge variant="outline">Best for organization</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Free-form Layout</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Unrestricted placement allowing for creative arrangement 
                      and organic idea development without structural constraints.
                    </p>
                    <Badge variant="outline">Best for creativity</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Timeline Layout</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Sequential arrangement showing progression and development 
                      of ideas over time or through a process.
                    </p>
                    <Badge variant="outline">Best for planning</Badge>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Templates Section */}
            <section id="templates">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Templates</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Planning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Pre-structured templates for project management, 
                      including tasks, milestones, and resource allocation.
                    </p>
                    <Badge variant="secondary">Popular</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Problem Solving</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Systematic approach to analyzing problems, 
                      identifying root causes, and developing solutions.
                    </p>
                    <Badge variant="secondary">Analytical</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Creative Writing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Templates for story development, character creation, 
                      and plot structuring for writers and content creators.
                    </p>
                    <Badge variant="secondary">Creative</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Research Planning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Academic and research-focused templates for 
                      organizing studies, hypotheses, and findings.
                    </p>
                    <Badge variant="secondary">Academic</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Product Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Templates for product ideation, feature planning, 
                      and user experience mapping.
                    </p>
                    <Badge variant="secondary">Product</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Meeting Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Structured templates for capturing meeting discussions, 
                      action items, and follow-up tasks.
                    </p>
                    <Badge variant="secondary">Business</Badge>
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
                        <p className="text-sm font-medium">Slack</p>
                        <p className="text-xs text-gray-500">Share updates</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-bold">N</span>
                        </div>
                        <p className="text-sm font-medium">Notion</p>
                        <p className="text-xs text-gray-500">Sync notes</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-bold">T</span>
                        </div>
                        <p className="text-sm font-medium">Trello</p>
                        <p className="text-xs text-gray-500">Task management</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-orange-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-bold">A</span>
                        </div>
                        <p className="text-sm font-medium">Asana</p>
                        <p className="text-xs text-gray-500">Project tracking</p>
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
      <section className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Mind Mapping?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Transform your ideas into powerful visual workflows with AI-powered suggestions and real-time collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/mindmaps">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Brain className="w-5 h-5 mr-2" />
                Start Mind Mapping
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <HelpCircle className="w-5 h-5 mr-2" />
              Get Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MindMapsDocs; 