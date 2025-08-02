import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Check, 
  Star, 
  Users, 
  Zap, 
  Shield, 
  Globe, 
  Sparkles,
  ChevronRight,
  Play,
  Download,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Brain,
  Presentation,
  Video,
  Target,
  Network,
  Palette,
  Map,
  Cpu,
  PenTool,
  FileText,
  HelpCircle,
  MessageCircle,
  Settings,
  Lock,
  MousePointer,
  Layers,
  Wand2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { HeroSection } from '@/components/blocks/hero-section-dark';
import VideoDemo from '@/components/VideoDemo';
import { NOV8Pricing } from '@/components/ui/pricing-section-with-comparison';
import { Footer } from '@/components/blocks/footer';

const services = [
  {
    name: 'Mind Maps',
    description: 'AI-powered mind mapping and brainstorming with intelligent node generation',
    icon: Brain,
    color: 'from-teal-500 to-blue-500',
    route: '/mindmaps',
    features: ['AI Node Generation', 'Multiple Layouts', 'Real-time Collaboration', 'Export Options'],
    gradient: 'from-teal-400 via-cyan-400 to-blue-500',
    accentColor: 'teal'
  },
  {
    name: 'Presentations',
    description: 'Professional presentation creation with advanced design tools and templates',
    icon: Presentation,
    color: 'from-orange-500 to-red-500',
    route: '/presentations',
    features: ['Premium Templates', 'Advanced Design Tools', 'Real-time Editing', 'Export to PDF/PPTX'],
    gradient: 'from-orange-400 via-orange-500 to-red-500',
    accentColor: 'orange'
  },
  {
    name: 'Meetings',
    description: 'Real-time collaboration and video conferencing with AI-powered features',
    icon: Video,
    color: 'from-blue-500 to-blue-600',
    route: '/meetings',
    features: ['HD Video Calls', 'Screen Sharing', 'AI Transcription', 'Meeting Recording'],
    gradient: 'from-blue-400 via-blue-500 to-blue-600',
    accentColor: 'blue'
  },
  {
    name: 'Strategy Co-Pilot',
    description: 'AI-driven strategic planning and analysis with comprehensive frameworks',
    icon: Target,
    color: 'from-emerald-500 to-green-600',
    route: '/strategy',
    features: ['SWOT Analysis', 'Porter\'s 5 Forces', 'AI Strategy Generation', 'Risk Assessment'],
    gradient: 'from-emerald-400 via-green-500 to-green-600',
    accentColor: 'emerald'
  },
  {
    name: 'AI Simulation',
    description: 'Scenario modeling and decision forecasting with advanced analytics',
    icon: Network,
    color: 'from-purple-500 to-indigo-600',
    route: '/simulation',
    features: ['What-if Scenarios', 'Risk Heatmaps', 'Forecasting Models', 'Sensitivity Analysis'],
    gradient: 'from-purple-400 via-purple-500 to-indigo-600',
    accentColor: 'purple'
  },
  {
    name: 'Digital Whiteboard',
    description: 'Real-time collaborative canvas with advanced drawing and design tools',
    icon: Palette,
    color: 'from-teal-600 to-emerald-600',
    route: '/whiteboard',
    features: ['Real-time Drawing', 'Shape Library', 'Collaboration Tools', 'Export Options'],
    gradient: 'from-teal-500 via-teal-600 to-emerald-600',
    accentColor: 'teal'
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'TechCorp',
    content: 'NOV8 has transformed how we brainstorm and plan. The AI-powered mind mapping is incredible.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Creative Director',
    company: 'Design Studio',
    content: 'The presentation tools are professional-grade. Our client presentations have never looked better.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
  },
  {
    name: 'Emily Watson',
    role: 'Strategy Consultant',
    company: 'Global Consulting',
    content: 'The Strategy Co-Pilot is a game-changer. It helps us analyze complex scenarios quickly.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face'
  }
];

const Homepage: React.FC = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <HeroSection />

      {/* Pricing Section */}
      <NOV8Pricing />

      {/* Final CTA Section */}
      <section className="relative w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[length:20px_20px]" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            {/* Main Heading */}
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Ready to transform your workflow?
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of teams using NOV8 to create, collaborate, and innovate.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Link to="/book-demo">
                <button className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg rounded-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 shadow-xl hover:shadow-blue-500/20">
                  Start your free trial
                </button>
              </Link>
              
              <Link to="/book-demo">
                <button className="px-8 py-3 border border-gray-600 text-gray-300 font-semibold text-lg rounded-lg transition-all duration-300 hover:border-gray-400 hover:text-white hover:bg-gray-800/30">
                  Watch demo
                </button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No credit card • Free trial • Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Decorative Element */}
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl"></div>
      </section>

      {/* Footer */}
      <Footer
        className="bg-black text-white"
        brand={{
          name: "NOV8",
          description: "The complete toolkit for modern teams to create, collaborate, and innovate. From mind mapping to presentations, we empower teams to work smarter."
        }}
        socialLinks={[
          { name: "Twitter", href: "#" },
          { name: "LinkedIn", href: "#" },
          { name: "GitHub", href: "#" },
          { name: "YouTube", href: "#" }
        ]}
        columns={[
          {
            title: "Products",
            links: [
              { name: "Mind Maps", Icon: Map, href: "/mindmaps" },
              { name: "Presentations", Icon: Presentation, href: "/presentations" },
              { name: "Meetings", Icon: Video, href: "/meetings" },
              { name: "Strategy Co-Pilot", Icon: Brain, href: "/strategy" }
            ]
          },
          {
            title: "Resources",
            links: [
              { name: "Documentation", Icon: FileText, href: "/docs" },
              { name: "API Reference", Icon: Zap, href: "/api" },
              { name: "Templates", Icon: Sparkles, href: "/templates" },
              { name: "Integrations", Icon: Globe, href: "/integrations" }
            ]
          },
          {
            title: "Company",
            links: [
              { name: "About NOV8", Icon: Users, href: "/about" },
              { name: "Blog & News", Icon: MessageCircle, href: "/blog" },
              { name: "Careers", Icon: Target, href: "/careers" },
              { name: "Contact Us", Icon: Mail, href: "/contact" }
            ]
          },
          {
            title: "Support",
            links: [
              { name: "Help Center", Icon: HelpCircle, href: "/help" },
              { name: "Community", Icon: Users, href: "/community" },
              { name: "Status Page", Icon: Zap, href: "/status" },
              { name: "Security", Icon: Shield, href: "/security" }
            ]
          }
        ]}
        copyright="© 2025 NOV8. All rights reserved. Empowering teams worldwide."
      />

      {/* Video Demo Modal */}
      <VideoDemo isOpen={isVideoPlaying} onClose={() => setIsVideoPlaying(false)} />
    </div>
  );
};

export default Homepage;