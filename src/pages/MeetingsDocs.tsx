import React from 'react';
import { Link } from 'react-router-dom';
import { Video, ArrowLeft, Zap, Users, Download, Share2, Settings, HelpCircle, BookOpen, Lightbulb, Target, Mic, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MeetingsDocs: React.FC = () => {
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
              <Link to="/meetings">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                  <Video className="w-4 h-4 mr-2" />
                  Open Meetings
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
                <Video className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Meetings Documentation
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Real-time collaboration and video conferencing with AI-powered features and intelligent transcription.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                HD Video Calls
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                AI Transcription
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Screen Sharing
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Meeting Recording
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
                    <a href="#ai-transcription" className="block text-gray-600 hover:text-gray-900 py-2">
                      AI Transcription
                    </a>
                    <a href="#collaboration" className="block text-gray-600 hover:text-gray-900 py-2">
                      Collaboration Tools
                    </a>
                    <a href="#recording" className="block text-gray-600 hover:text-gray-900 py-2">
                      Recording & Sharing
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
                  NOV8 Meetings is a comprehensive video conferencing platform that combines high-quality 
                  video calls with AI-powered features to enhance collaboration and productivity. Whether 
                  you're hosting team meetings, client presentations, or training sessions, our platform 
                  provides the tools you need for effective communication.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  The platform features intelligent transcription, real-time collaboration tools, and 
                  seamless integration with other NOV8 services to create a unified communication experience.
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
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>HD Video Calls</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Crystal clear HD video calls with adaptive quality that adjusts based on 
                      your internet connection and device capabilities.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Mic className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>AI Transcription</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Real-time AI-powered transcription that converts speech to text with high accuracy, 
                      supporting multiple languages and speaker identification.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <Share2 className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Screen Sharing</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Seamless screen sharing with options to share your entire screen, specific applications, 
                      or just a browser tab for focused presentations.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle>Meeting Recording</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Record your meetings with high-quality audio and video, with automatic 
                      transcription and easy sharing options.
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
                      Schedule or Join a Meeting
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Create a new meeting or join an existing one using the meeting link or ID. 
                      You can schedule meetings in advance or start them instantly.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-700 font-medium">Pro Tip:</p>
                      <p className="text-sm text-blue-600">
                        Use the calendar integration to schedule meetings and automatically send 
                        invitations to participants with meeting details.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                      Configure Meeting Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Set up your meeting preferences including video quality, audio settings, 
                      recording options, and collaboration tools.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Video Settings:</p>
                        <ul className="text-gray-600 mt-2 space-y-1">
                          <li>• HD quality selection</li>
                          <li>• Background blur</li>
                          <li>• Virtual backgrounds</li>
                          <li>• Camera controls</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Audio Settings:</p>
                        <ul className="text-gray-600 mt-2 space-y-1">
                          <li>• Noise cancellation</li>
                          <li>• Echo reduction</li>
                          <li>• Audio level adjustment</li>
                          <li>• Mute controls</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                      Start Collaborating
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Begin your meeting with full access to collaboration tools, AI transcription, 
                      and screen sharing capabilities.
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-700 font-medium">Collaboration Features:</p>
                      <p className="text-sm text-green-600">
                        Use the integrated whiteboard, file sharing, and real-time notes 
                        to enhance your meeting experience and productivity.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* AI Transcription Section */}
            <section id="ai-transcription">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">AI Transcription</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                      Real-time Transcription
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      AI-powered speech-to-text conversion that works in real-time, providing 
                      accurate transcriptions with speaker identification and timestamps.
                    </p>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Real-time speech recognition</li>
                      <li>• Speaker identification and labeling</li>
                      <li>• Timestamp markers for easy navigation</li>
                      <li>• Multiple language support</li>
                      <li>• Industry-specific terminology recognition</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-blue-500" />
                      Action Item Extraction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Intelligent extraction of action items, decisions, and key points from 
                      meeting conversations for better follow-up and accountability.
                    </p>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Automatic action item detection</li>
                      <li>• Decision point identification</li>
                      <li>• Key topic summarization</li>
                      <li>• Follow-up task creation</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Collaboration Tools Section */}
            <section id="collaboration">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Collaboration Tools</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Screen Sharing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Share your screen with options for full screen, specific applications, 
                      or browser tabs with annotation capabilities.
                    </p>
                    <div className="space-y-2">
                      <Badge variant="outline">Full Screen</Badge>
                      <Badge variant="outline">Application</Badge>
                      <Badge variant="outline">Browser Tab</Badge>
                      <Badge variant="outline">Annotations</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Virtual Whiteboard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Interactive whiteboard for real-time drawing, diagramming, and visual 
                      collaboration during meetings.
                    </p>
                    <div className="space-y-2">
                      <Badge variant="outline">Drawing Tools</Badge>
                      <Badge variant="outline">Shapes & Text</Badge>
                      <Badge variant="outline">Real-time Sync</Badge>
                      <Badge variant="outline">Save & Share</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Recording & Sharing Section */}
            <section id="recording">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Recording & Sharing</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Meeting Recording</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Record your meetings with high-quality audio and video, with automatic 
                      transcription and easy sharing options.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-lg font-bold text-red-700 mb-1">Video</div>
                        <p className="text-xs text-gray-600">HD Recording</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-700 mb-1">Audio</div>
                        <p className="text-xs text-gray-600">High Quality</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-700 mb-1">Transcript</div>
                        <p className="text-xs text-gray-600">Auto Generated</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-lg font-bold text-purple-700 mb-1">Share</div>
                        <p className="text-xs text-gray-600">Easy Access</p>
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
                          <span className="text-white font-bold">C</span>
                        </div>
                        <p className="text-sm font-medium">Calendar</p>
                        <p className="text-xs text-gray-500">Scheduling</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-bold">S</span>
                        </div>
                        <p className="text-sm font-medium">Slack</p>
                        <p className="text-xs text-gray-500">Notifications</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-bold">T</span>
                        </div>
                        <p className="text-sm font-medium">Teams</p>
                        <p className="text-xs text-gray-500">Integration</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-orange-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-bold">Z</span>
                        </div>
                        <p className="text-sm font-medium">Zoom</p>
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
      <section className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Meeting?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Host high-quality video calls with AI-powered features and seamless collaboration tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/meetings">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Video className="w-5 h-5 mr-2" />
                Start Meeting
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

export default MeetingsDocs; 