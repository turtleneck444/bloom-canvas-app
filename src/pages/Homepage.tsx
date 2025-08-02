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

      {/* Services Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] bg-[length:32px_32px] opacity-50" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4 px-4 py-1 text-sm bg-blue-50/80 border-blue-200/50 text-blue-700 dark:bg-blue-900/20 dark:border-blue-700/50 dark:text-blue-300">
                Complete Toolkit
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Everything you need to <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  create, collaborate & innovate
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Six powerful tools designed to transform how teams work together, from initial ideas to final execution.
              </p>
            </motion.div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                className="group relative"
              >
                <Link to={service.route}>
                  <Card className={`h-full transition-all duration-500 cursor-pointer relative overflow-hidden
                    ${hoveredService === index 
                      ? 'scale-105 shadow-2xl border-transparent' 
                      : 'hover:scale-[1.02] hover:shadow-xl border-gray-200/50'
                    } 
                    bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl`}
                  >
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    {/* Floating orbs animation */}
                    <div className="absolute inset-0 overflow-hidden">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-full opacity-20 blur-xl`}
                          animate={{
                            x: [0, 100, 0],
                            y: [0, -50, 0],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5,
                          }}
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${30 + i * 20}%`,
                          }}
                        />
                      ))}
                    </div>

                    <CardHeader className="relative z-10 pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                          <service.icon className="w-8 h-8 text-white" />
                        </div>
                        
                        <motion.div
                          animate={hoveredService === index ? { rotate: 45, scale: 1.1 } : { rotate: 0, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className={`p-2 rounded-full bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        >
                          <ArrowRight className="w-5 h-5 text-white" />
                        </motion.div>
                      </div>
                      
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text dark:group-hover:from-white dark:group-hover:to-gray-200 transition-all duration-300">
                        {service.name}
                      </CardTitle>
                      
                      <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="relative z-10 pt-0">
                      {/* Interactive feature list */}
                      <div className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0.7, x: -10 }}
                            animate={hoveredService === index ? { opacity: 1, x: 0 } : { opacity: 0.7, x: -10 }}
                            transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                            className="flex items-center space-x-3 group/feature"
                          >
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} opacity-60 group-hover/feature:opacity-100 transition-opacity duration-200`} />
                            <span className="text-sm text-gray-600 dark:text-gray-300 group-hover/feature:text-gray-900 dark:group-hover/feature:text-white transition-colors duration-200">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Interactive elements overlay */}
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <motion.div
                            animate={hoveredService === index ? { scale: 1.1 } : { scale: 1 }}
                            className={`w-3 h-3 rounded-full bg-gradient-to-r ${service.gradient}`}
                          />
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                            {service.accentColor.toUpperCase()}
                          </span>
                        </div>
                        
                        <motion.div
                          animate={hoveredService === index ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400"
                        >
                          <MousePointer className="w-3 h-3" />
                          <span>Interactive</span>
                        </motion.div>
                      </div>

                      {/* Futuristic tech elements */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                        <div className="flex space-x-1">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className={`w-1 h-8 bg-gradient-to-t ${service.gradient} rounded-full`}
                              animate={hoveredService === index ? {
                                scaleY: [1, 1.5, 0.8, 1.2, 1],
                                opacity: [0.3, 0.8, 0.4, 0.9, 0.3]
                              } : {}}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                    </CardContent>

                    {/* Border animation */}
                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} 
                         style={{ background: `linear-gradient(90deg, transparent, ${service.gradient}, transparent)` }} />
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center space-x-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-full px-6 py-3 shadow-lg">
              <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">All tools work seamlessly together</span>
              <Wand2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          </motion.div>
        </div>
      </section>

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