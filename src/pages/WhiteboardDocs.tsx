import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, ArrowLeft, Zap, Users, Download, Share2, Settings, HelpCircle, BookOpen, Lightbulb, Target, Brush, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const WhiteboardDocs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
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
              <Link to="/whiteboard">
                <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600">
                  <Palette className="w-4 h-4 mr-2" />
                  Open Whiteboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-teal-500 to-emerald-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Palette className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Digital Whiteboard Documentation
            </h1>
            <p className="text-xl lg:text-2xl text-teal-100 mb-8 max-w-3xl mx-auto">
              Real-time collaborative canvas with advanced drawing and design tools for teams to brainstorm, sketch ideas, and create visual workflows.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Real-time Drawing
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Shape Library
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Collaboration Tools
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
                    <a href="#overview" className="block text-teal-600 hover:text-teal-700 font-medium py-2">
                      Overview
                    </a>
                    <a href="#features" className="block text-gray-600 hover:text-gray-900 py-2">
                      Key Features
                    </a>
                    <a href="#getting-started" className="block text-gray-600 hover:text-gray-900 py-2">
                      Getting Started
                    </a>
                    <a href="#drawing-tools" className="block text-gray-600 hover:text-gray-900 py-2">
                      Drawing Tools
                    </a>
                    <a href="#shapes-library" className="block text-gray-600 hover:text-gray-900 py-2">
                      Shapes Library
                    </a>
                    <a href="#collaboration" className="block text-gray-600 hover:text-gray-900 py-2">
                      Collaboration
                    </a>
                    <a href="#export-import" className="block text-gray-600 hover:text-gray-900 py-2">
                      Export & Import
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
                  NOV8 Digital Whiteboard is an infinite collaborative canvas that enables teams to 
                  brainstorm, sketch ideas, and create visual workflows in real-time. Whether you're 
                  designing user interfaces, planning projects, or conducting remote workshops, our 
                  platform provides the tools you need for visual collaboration.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  The platform features advanced drawing tools, shape libraries, real-time collaboration, 
                  and seamless integration with other NOV8 services to create a unified visual workspace.
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
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Brush className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Real-time Drawing</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Smooth, responsive drawing tools with pressure sensitivity and multiple brush types 
                      for natural sketching and design work.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Layers className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Shape Library</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Comprehensive library of shapes, icons, and templates for quick diagramming, 
                      wireframing, and visual design.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Collaboration Tools</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Real-time collaboration with multiple users, live cursors, and seamless 
                      synchronization across all devices.
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
                      Export your whiteboards in multiple formats including PNG, SVG, PDF, and 
                      editable formats for further refinement.
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
                      <span className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                      Create a New Canvas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Start with a blank canvas or choose from pre-designed templates for common 
                      use cases like brainstorming, wireframing, or project planning.
                    </p>
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <p className="text-sm text-teal-700 font-medium">Pro Tip:</p>
                      <p className="text-sm text-teal-600">
                        Choose a template that matches your project type. The AI can suggest 
                        appropriate layouts and tools based on your intended use.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                      Invite Collaborators
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Share your canvas with team members and set appropriate permissions for 
                      viewing, editing, or commenting.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Permission Levels:</p>
                        <ul className="text-gray-600 mt-2 space-y-1">
                          <li>• View only</li>
                          <li>• Comment</li>
                          <li>• Edit</li>
                          <li>• Admin</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Sharing Options:</p>
                        <ul className="text-gray-600 mt-2 space-y-1">
                          <li>• Direct link</li>
                          <li>• Email invitation</li>
                          <li>• Team workspace</li>
                          <li>• Public access</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                      Start Creating
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Use the drawing tools, shape library, and collaboration features to create 
                      your visual content with real-time updates visible to all participants.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-700 font-medium">Collaboration Features:</p>
                      <p className="text-sm text-blue-600">
                        See live cursors of other users, use the chat feature for discussions, 
                        and track changes with version history.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Drawing Tools Section */}
            <section id="drawing-tools">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Drawing Tools</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brush className="w-5 h-5 mr-2 text-teal-500" />
                      Freehand Drawing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Natural drawing tools with pressure sensitivity, multiple brush types, 
                      and customizable stroke styles for expressive sketching and design work.
                    </p>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Pressure-sensitive drawing</li>
                      <li>• Multiple brush types and sizes</li>
                      <li>• Customizable stroke styles</li>
                      <li>• Undo/redo functionality</li>
                      <li>• Layer-based organization</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-blue-500" />
                      Precision Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Professional tools for precise drawing including rulers, guides, grids, 
                      and alignment tools for technical diagrams and designs.
                    </p>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Rulers and guides</li>
                      <li>• Grid and snap tools</li>
                      <li>• Alignment and distribution</li>
                      <li>• Measurement tools</li>
                      <li>• Precision snapping</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Shapes Library Section */}
            <section id="shapes-library">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Shapes Library</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Shapes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Essential geometric shapes including rectangles, circles, triangles, 
                      and polygons for basic diagramming and design work.
                    </p>
                    <div className="space-y-2">
                      <Badge variant="outline">Rectangles</Badge>
                      <Badge variant="outline">Circles</Badge>
                      <Badge variant="outline">Triangles</Badge>
                      <Badge variant="outline">Polygons</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Flowchart Elements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Professional flowchart shapes and connectors for process mapping, 
                      decision trees, and workflow diagrams.
                    </p>
                    <div className="space-y-2">
                      <Badge variant="outline">Process Boxes</Badge>
                      <Badge variant="outline">Decision Diamonds</Badge>
                      <Badge variant="outline">Connectors</Badge>
                      <Badge variant="outline">Terminators</Badge>
                    </div>
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
                    <CardTitle>Real-time Sync</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      All changes are synchronized in real-time across all connected devices, 
                      ensuring everyone sees the latest updates instantly.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Live updates</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Live Cursors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      See live cursors of other users with their names and avatars, 
                      making collaboration more interactive and engaging.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>User tracking</span>
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
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-500 mb-2">PNG</div>
                        <p className="text-sm text-gray-600">High-quality image</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-500 mb-2">SVG</div>
                        <p className="text-sm text-gray-600">Scalable vector</p>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-500 mb-2">PDF</div>
                        <p className="text-sm text-gray-600">Document format</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-500 mb-2">JSON</div>
                        <p className="text-sm text-gray-600">Editable data</p>
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
                          <span className="text-white font-bold">F</span>
                        </div>
                        <p className="text-sm font-medium">Figma</p>
                        <p className="text-xs text-gray-500">Design Import</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-bold">S</span>
                        </div>
                        <p className="text-sm font-medium">Slack</p>
                        <p className="text-xs text-gray-500">Sharing</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-bold">N</span>
                        </div>
                        <p className="text-sm font-medium">Notion</p>
                        <p className="text-xs text-gray-500">Embedding</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-orange-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-bold">M</span>
                        </div>
                        <p className="text-sm font-medium">Miro</p>
                        <p className="text-xs text-gray-500">Compatibility</p>
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
      <section className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Drawing?</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Create infinite collaborative canvases with advanced drawing tools and real-time collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/whiteboard">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
                <Palette className="w-5 h-5 mr-2" />
                Start Drawing
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600">
              <HelpCircle className="w-5 h-5 mr-2" />
              Get Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhiteboardDocs; 