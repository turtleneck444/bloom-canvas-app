import React from 'react';
import { Link } from 'react-router-dom';
import { Presentation, ArrowLeft, Zap, Users, Download, Share2, Settings, HelpCircle, BookOpen, Lightbulb, Target, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PresentationsDocs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
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
              <Link to="/presentations">
                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                  <Presentation className="w-4 h-4 mr-2" />
                  Open Presentations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-amber-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Presentation className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Presentations Documentation
            </h1>
            <p className="text-xl lg:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Create stunning presentations with AI assistance, smart templates, and seamless collaboration for professional design.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                AI-Powered Design
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Smart Templates
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Real-time Collaboration
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
                    <a href="#overview" className="block text-orange-600 hover:text-orange-700 font-medium py-2">
                      Overview
                    </a>
                    <a href="#features" className="block text-gray-600 hover:text-gray-900 py-2">
                      Key Features
                    </a>
                    <a href="#getting-started" className="block text-gray-600 hover:text-gray-900 py-2">
                      Getting Started
                    </a>
                    <a href="#ai-design" className="block text-gray-600 hover:text-gray-900 py-2">
                      AI Design Assistant
                    </a>
                    <a href="#templates" className="block text-gray-600 hover:text-gray-900 py-2">
                      Templates & Themes
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
                  NOV8 Presentations is a professional-grade presentation creation platform that combines 
                  AI-powered design assistance with intuitive collaboration tools. Whether you're creating 
                  sales pitches, training materials, or executive summaries, our platform provides the 
                  tools you need to create compelling, visually stunning presentations.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  The platform features intelligent design suggestions, real-time collaboration, and 
                  seamless integration with other NOV8 tools to streamline your presentation workflow.
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
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                        <Palette className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>AI Design Assistant</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Intelligent design suggestions that automatically improve layouts, color schemes, 
                      and typography based on your content and brand guidelines.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Real-time Collaboration</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Work together with your team in real-time, see changes as they happen, 
                      and maintain version control for all your presentations.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Smart Templates</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Professional templates designed for different industries and use cases, 
                      with AI-powered customization based on your content.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Export Options</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Export your presentations in multiple formats including PDF, PowerPoint, 
                      and web formats for seamless sharing and presentation.
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
                      <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                      Choose Your Template
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Start by selecting a template that matches your presentation type and industry. 
                      The AI will suggest the best templates based on your content and objectives.
                    </p>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-sm text-orange-700 font-medium">Pro Tip:</p>
                      <p className="text-sm text-orange-600">
                        Choose a template that aligns with your brand guidelines and presentation goals. 
                        The AI can customize colors and styling to match your brand.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                      Add Your Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Add your presentation content including text, images, charts, and multimedia elements. 
                      The AI will help optimize layouts and suggest design improvements.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Content Types:</p>
                        <ul className="text-gray-600 mt-2 space-y-1">
                          <li>• Text and headlines</li>
                          <li>• Images and graphics</li>
                          <li>• Charts and data</li>
                          <li>• Videos and media</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">AI Assistance:</p>
                        <ul className="text-gray-600 mt-2 space-y-1">
                          <li>• Layout optimization</li>
                          <li>• Design suggestions</li>
                          <li>• Content organization</li>
                          <li>• Visual hierarchy</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                      Customize and Polish
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Fine-tune your presentation with custom styling, animations, and interactive elements. 
                      The AI provides suggestions for improving visual appeal and engagement.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-700 font-medium">Design Features:</p>
                      <p className="text-sm text-blue-600">
                        Use AI-powered design suggestions to improve typography, color schemes, 
                        and visual hierarchy for maximum impact.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* AI Design Assistant Section */}
            <section id="ai-design">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">AI Design Assistant</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                      Layout Optimization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      AI automatically suggests optimal layouts based on your content type, 
                      ensuring balanced composition and visual hierarchy.
                    </p>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Automatic slide layout suggestions</li>
                      <li>• Content-aware positioning</li>
                      <li>• Visual balance optimization</li>
                      <li>• Responsive design adaptation</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="w-5 h-5 mr-2 text-purple-500" />
                      Color & Typography
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Intelligent color scheme and typography suggestions that enhance readability 
                      and align with your brand guidelines.
                    </p>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Brand-consistent color palettes</li>
                      <li>• Readability-optimized typography</li>
                      <li>• Contrast and accessibility compliance</li>
                      <li>• Mood-appropriate styling</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Templates & Themes Section */}
            <section id="templates">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Templates & Themes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Professional templates designed for business presentations including sales pitches, 
                      executive summaries, and board reports.
                    </p>
                    <div className="space-y-2">
                      <Badge variant="outline">Sales Presentations</Badge>
                      <Badge variant="outline">Executive Reports</Badge>
                      <Badge variant="outline">Board Meetings</Badge>
                      <Badge variant="outline">Project Updates</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Industry-Specific</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Specialized templates for different industries including technology, healthcare, 
                      finance, and education.
                    </p>
                    <div className="space-y-2">
                      <Badge variant="outline">Technology</Badge>
                      <Badge variant="outline">Healthcare</Badge>
                      <Badge variant="outline">Finance</Badge>
                      <Badge variant="outline">Education</Badge>
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
                    <CardTitle>Real-time Editing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Multiple team members can work on the same presentation simultaneously, 
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
                    <CardTitle>Comments & Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Add comments to specific slides, provide feedback, and discuss changes 
                      directly within the presentation interface.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Inline feedback</span>
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
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-500 mb-2">PDF</div>
                        <p className="text-sm text-gray-600">High-quality print</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-500 mb-2">PPTX</div>
                        <p className="text-sm text-gray-600">PowerPoint format</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-500 mb-2">HTML</div>
                        <p className="text-sm text-gray-600">Web format</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-500 mb-2">Video</div>
                        <p className="text-sm text-gray-600">Recording</p>
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
                          <span className="text-white font-bold">G</span>
                        </div>
                        <p className="text-sm font-medium">Google Slides</p>
                        <p className="text-xs text-gray-500">Import/Export</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-bold">M</span>
                        </div>
                        <p className="text-sm font-medium">Microsoft PowerPoint</p>
                        <p className="text-xs text-gray-500">Compatibility</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-bold">D</span>
                        </div>
                        <p className="text-sm font-medium">Dropbox</p>
                        <p className="text-xs text-gray-500">Cloud Storage</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-bold">Z</span>
                        </div>
                        <p className="text-sm font-medium">Zoom</p>
                        <p className="text-xs text-gray-500">Presentations</p>
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
      <section className="bg-gradient-to-r from-orange-500 to-amber-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Amazing Presentations?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Design professional presentations with AI assistance and seamless collaboration tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/presentations">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                <Presentation className="w-5 h-5 mr-2" />
                Start Creating
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
              <HelpCircle className="w-5 h-5 mr-2" />
              Get Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PresentationsDocs; 