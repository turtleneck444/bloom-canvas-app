import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from "react-router-dom"
import { Brain, Presentation, Video, Target } from "lucide-react"
import { RotatingText } from "@/components/ui/rotating-text"
import { NOV8GlowCard } from "@/components/ui/spotlight-card"
import { useState, useEffect } from "react"

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: { regular: string; gradient: string }
  description?: string
  ctaText?: string
  ctaHref?: string
  bottomImage?: { light: string; dark: string }
  gridOptions?: {
    angle?: number
    cellSize?: number
    opacity?: number
    lightLineColor?: string
    darkLineColor?: string
  }
}

interface PlatformImage {
  id: string
  name: string
  light: string
  dark: string
  route: string
  description: string
  color: string
  textColor: string
  activeTextColor: string
  hoverTextColor: string
  borderColor: string
  tabColor: string
}

const RetroGrid = ({ 
  angle = 65, 
  cellSize = 60, 
  opacity = 0.5, 
  lightLineColor = "gray", 
  darkLineColor = "gray", 
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  } as React.CSSProperties

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        `opacity-[var(--opacity)]`,
      )}
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" />
    </div>
  )
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title = "Build products for everyone",
      subtitle = {
        regular: "Designing your projects faster with ",
        gradient: "the largest figma UI kit.",
      },
      description = "Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
      ctaText = "Browse courses",
      ctaHref = "#",
      bottomImage = {
        light: "https://farmui.vercel.app/dashboard-light.png",
        dark: "https://farmui.vercel.app/dashboard.png",
      },
      gridOptions,
      ...props
    },
    ref,
  ) => {
    const platformImages: PlatformImage[] = [
      {
        id: "mindmaps",
        name: "Mind Maps",
        light: "/mindmaps.png",
        dark: "/mindmaps.png",
        route: "/mindmaps",
        description: "AI-powered mind mapping and brainstorming",
        color: "from-blue-500 to-cyan-500",
        textColor: "text-blue-600",
        activeTextColor: "text-blue-700",
        hoverTextColor: "hover:text-blue-700",
        borderColor: "border-blue-500",
        tabColor: "tab-blue"
      },
      {
        id: "presentations",
        name: "Presentations",
        light: "/presentations.png",
        dark: "/presentations.png",
        route: "/presentations",
        description: "Professional presentation creation and design",
        color: "from-purple-500 to-pink-500",
        textColor: "text-purple-600",
        activeTextColor: "text-purple-700",
        hoverTextColor: "hover:text-purple-700",
        borderColor: "border-purple-500",
        tabColor: "tab-purple"
      },
      {
        id: "meetings",
        name: "Meetings",
        light: "/meetings.png",
        dark: "/meetings.png",
        route: "/meetings",
        description: "Real-time collaboration and video conferencing",
        color: "from-green-500 to-emerald-500",
        textColor: "text-green-600",
        activeTextColor: "text-green-700",
        hoverTextColor: "hover:text-green-700",
        borderColor: "border-green-500",
        tabColor: "tab-green"
      },
      {
        id: "strategy",
        name: "Strategy Co-Pilot",
        light: "/strategy.png",
        dark: "/strategy.png",
        route: "/strategy",
        description: "AI-driven strategic planning and analysis",
        color: "from-orange-500 to-red-500",
        textColor: "text-orange-600",
        activeTextColor: "text-orange-700",
        hoverTextColor: "hover:text-orange-700",
        borderColor: "border-orange-500",
        tabColor: "tab-orange"
      },
      {
        id: "simulation",
        name: "AI Simulation",
        light: "/aisimulation.png",
        dark: "/aisimulation.png",
        route: "/simulation",
        description: "Scenario modeling and decision forecasting",
        color: "from-indigo-500 to-purple-500",
        textColor: "text-indigo-600",
        activeTextColor: "text-indigo-700",
        hoverTextColor: "hover:text-indigo-700",
        borderColor: "border-indigo-500",
        tabColor: "tab-indigo"
      },
      {
        id: "whiteboard",
        name: "Digital Whiteboard",
        light: "/digitalwhiteboard.png",
        dark: "/digitalwhiteboard.png",
        route: "/whiteboard",
        description: "Real-time collaborative canvas and drawing",
        color: "from-cyan-500 to-teal-500",
        textColor: "text-cyan-600",
        activeTextColor: "text-cyan-700",
        hoverTextColor: "hover:text-cyan-700",
        borderColor: "border-cyan-500",
        tabColor: "tab-cyan"
      }
    ]

    const [currentService, setCurrentService] = useState("Mind Maps");

    useEffect(() => {
      const serviceName = window.location.pathname.split('/').pop();
      if (serviceName) {
        setCurrentService(serviceName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
      }
    }, []);

    const currentServiceData = platformImages.find(
      (service) => service.name.toLowerCase().replace(/\s/g, '-') === currentService.toLowerCase().replace(/\s/g, '-')
    );

    const rotatingTexts = [
      "Mind Maps",
      "Presentations", 
      "Meetings",
      "Strategy Co-Pilot",
      "AI Simulation",
      "Digital Whiteboard"
    ];

    const getServiceColorClass = (serviceName: string) => {
      const service = platformImages.find(
        (s) => s.name.toLowerCase() === serviceName.toLowerCase()
      );
      
      if (!service) return "from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200/50 dark:border-purple-700/50";
      
      switch (service.name) {
        case "Mind Maps":
          return "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200/50 dark:border-cyan-700/50";
        case "Presentations":
          return "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200/50 dark:border-pink-700/50";
        case "Meetings":
          return "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200/50 dark:border-emerald-700/50";
        case "Strategy Co-Pilot":
          return "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200/50 dark:border-red-700/50";
        case "AI Simulation":
          return "from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200/50 dark:border-purple-700/50";
        case "Digital Whiteboard":
          return "from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 border-cyan-200/50 dark:border-teal-700/50";
        default:
          return "from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200/50 dark:border-purple-700/50";
      }
    };

    const mainClassName = `px-3 sm:px-4 md:px-6 bg-gradient-to-r ${getServiceColorClass(currentService)} text-gray-900 dark:text-white text-4xl sm:text-5xl lg:text-7xl overflow-hidden py-1 sm:py-2 md:py-3 justify-center rounded-xl shadow-sm rotating-text-clean rotating-text-${currentService.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className={cn("relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800", className)} ref={ref} {...props}>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.03)_1px,transparent_0)] bg-[length:20px_20px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)]" />
        
        {/* Hero Section */}
        <section className="relative z-10 min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
          {/* Header */}
          <header className="relative z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between py-6">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                  <img 
                    src="/src/assets/nov8black.png" 
                    alt="NOV8 Logo" 
                    className="h-8 w-auto"
                  />
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                  <a href="#product" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Product</a>
                  <a href="#company" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Company</a>
                  <a href="#resources" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Resources</a>
                  <a href="#community" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Community</a>
                  <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Pricing</a>
                </nav>

                {/* CTA Buttons */}
                <div className="flex items-center space-x-4">
                  <button className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Log in</button>
                  <Link to="/book-demo">
                    <button className="bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-800">Get started</button>
                  </Link>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Content */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="text-center max-w-5xl mx-auto mb-20">
              {/* Announcement Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-sm font-medium text-blue-700 mb-8">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                New: AI-Powered Collaboration Suite
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                <span className="text-gray-900">
                  NOV8
                </span>
                {" "}
                <div className="inline-flex items-center">
                  <RotatingText
                    texts={rotatingTexts}
                    mainClassName={mainClassName}
                    staggerFrom="last"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-120%", opacity: 0 }}
                    staggerDuration={0.08}
                    splitLevelClassName="overflow-hidden pb-1 sm:pb-2 md:pb-3"
                    transition={{ type: "spring", damping: 40, stiffness: 800 }}
                    rotationInterval={4000}
                    auto={true}
                    loop={true}
                    onNext={(index) => {
                      setCurrentService(rotatingTexts[index]);
                    }}
                  />
                </div>
              </h1>

              {/* Subtitle */}
              <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                Transform your ideas into powerful visual workflows. AI-powered collaboration tools for modern teams.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
                <Link to="/book-demo">
                  <button className="bg-gray-900 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                    Get started
                  </button>
                </Link>
                <Link to="/book-demo">
                  <button className="border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300">
                    Book a demo
                  </button>
                </Link>
              </div>
            </div>

            {/* Enhanced Platform Preview */}
            <div className="relative max-w-7xl mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-4 sm:p-6 lg:p-12">
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-3 sm:mb-4">
                    Experience NOV8 Platform
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 text-center max-w-3xl mx-auto px-4">
                    Explore our comprehensive suite of AI-powered collaboration tools designed for modern teams
                  </p>
                </div>
                
                <Tabs defaultValue="mindmaps" className="w-full">
                  <TabsList className="flex flex-wrap w-full mb-8 bg-gray-100 p-2 rounded-2xl gap-2">
                    {platformImages.map((platform) => (
                      <TabsTrigger
                        key={platform.id}
                        value={platform.id}
                        className={`tab-glassmorphism ${platform.tabColor} ${platform.textColor} ${platform.hoverTextColor} transition-all duration-300 rounded-xl px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm font-semibold flex-1 min-w-0`}
                      >
                        <span className="truncate">{platform.name}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {platformImages.map((platform) => (
                    <TabsContent key={platform.id} value={platform.id} className="space-y-6 sm:space-y-8">
                      <div className="relative group">
                        <img
                          src={platform.light}
                          alt={platform.name}
                          className="w-full h-auto rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl transition-all duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3 sm:top-6 sm:right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium shadow-lg sm:shadow-xl border border-gray-200 hover:bg-white transition-all duration-300">
                            Try {platform.name}
                          </button>
                        </div>
                      </div>
                      <div className="text-center px-4">
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">{platform.name}</h3>
                        <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto">{platform.description}</p>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* Individual Service Sections - Full Width */}
        
        {/* Mind Maps Section - Compact & Clean */}
        <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.02)_1px,transparent_0)] bg-[length:20px_20px]" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/6 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/6 rounded-full blur-2xl"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Mind Maps</h2>
                    <p className="text-blue-600 text-sm font-medium">AI-Powered Visual Thinking</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Transform ideas into visual workflows with AI-powered suggestions and real-time collaboration.
                </p>
                <div className="flex items-center space-x-3">
                  <Link to="/mindmaps">
                    <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Start Mapping
                    </button>
                  </Link>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">AI Nodes</span>
                    <span className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full font-medium">Real-time</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                {/* Compact Mind Map Visualization */}
                <div className="relative w-full h-48 bg-gradient-to-br from-blue-100/50 to-cyan-100/50 rounded-2xl border border-blue-200/50 overflow-hidden backdrop-blur-sm">
                  {/* Central Hub */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-xl">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Floating Nodes */}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md animate-float">
                    <span className="text-white font-semibold text-xs">Ideas</span>
                  </div>
                  <div className="absolute top-6 right-6 w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-md animate-float" style={{animationDelay: '0.5s'}}>
                    <span className="text-white font-semibold text-xs">Plan</span>
                  </div>
                  <div className="absolute bottom-6 left-6 w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center shadow-md animate-float" style={{animationDelay: '1s'}}>
                    <span className="text-white font-semibold text-xs">Execute</span>
                  </div>
                  <div className="absolute bottom-4 right-4 w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-md animate-float" style={{animationDelay: '1.5s'}}>
                    <span className="text-white font-semibold text-xs">Success</span>
                  </div>
                  
                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full" style={{zIndex: 1}}>
                    <path d="M 44 44 Q 80 50 120 56" stroke="url(#blueGradient)" strokeWidth="1.5" fill="none" opacity="0.6"/>
                    <path d="M 44 44 Q 60 80 80 120" stroke="url(#cyanGradient)" strokeWidth="1.5" fill="none" opacity="0.6"/>
                    <path d="M 120 56 Q 140 80 160 120" stroke="url(#blueGradient)" strokeWidth="1.5" fill="none" opacity="0.6"/>
                    <defs>
                      <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#06B6D4', stopOpacity: 1}} />
                      </linearGradient>
                      <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#06B6D4', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                {/* Compact Stats */}
                <div className="absolute -top-2 -right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-blue-200/50">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">10K+</div>
                    <div className="text-xs text-gray-600">Maps</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Presentations Section - Compact & Clean */}
        <section className="py-12 bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(147,51,234,0.02)_1px,transparent_0)] bg-[length:20px_20px]" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/6 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500/6 rounded-full blur-2xl"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="lg:order-2 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Presentation className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Presentations</h2>
                    <p className="text-purple-600 text-sm font-medium">AI-Powered Design Studio</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Create stunning presentations with AI assistance, smart templates, and seamless collaboration.
                </p>
                <div className="flex items-center space-x-3">
                  <Link to="/presentations">
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Create Presentation
                    </button>
                  </Link>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">Templates</span>
                    <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full font-medium">AI Design</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:order-1 relative">
                {/* Compact Presentation Builder */}
                <div className="relative w-full h-48 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-2xl border border-purple-200/50 overflow-hidden backdrop-blur-sm">
                  {/* Slide Stack Effect */}
                  <div className="absolute top-2 left-2 w-32 h-20 bg-white rounded-lg shadow-md transform rotate-1 border border-purple-200/30">
                    <div className="p-2">
                      <div className="w-8 h-1.5 bg-purple-200 rounded mb-1.5"></div>
                      <div className="w-16 h-1 bg-purple-100 rounded mb-1"></div>
                      <div className="w-12 h-1 bg-purple-100 rounded"></div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 w-32 h-20 bg-white rounded-lg shadow-md transform -rotate-0.5 border border-pink-200/30">
                    <div className="p-2">
                      <div className="w-8 h-1.5 bg-pink-200 rounded mb-1.5"></div>
                      <div className="w-16 h-1 bg-pink-100 rounded mb-1"></div>
                      <div className="w-12 h-1 bg-pink-100 rounded"></div>
                    </div>
                  </div>
                  <div className="absolute top-6 left-6 w-32 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg transform rotate-0.5">
                    <div className="p-2 text-white">
                      <div className="w-8 h-1.5 bg-white/30 rounded mb-1.5"></div>
                      <div className="w-16 h-1 bg-white/20 rounded mb-1"></div>
                      <div className="w-12 h-1 bg-white/20 rounded"></div>
                    </div>
                    {/* AI Assistant Indicator */}
                    <div className="absolute top-1 right-1 w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Floating Design Elements */}
                  <div className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center shadow-md animate-bounce">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                </div>
                
                {/* Compact Stats */}
                <div className="absolute -top-2 -right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-purple-200/50">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">500+</div>
                    <div className="text-xs text-gray-600">Templates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Co-Pilot Section - Compact & Clean */}
        <section className="py-12 bg-gradient-to-br from-orange-50 via-white to-red-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(249,115,22,0.02)_1px,transparent_0)] bg-[length:20px_20px]" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/6 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-500/6 rounded-full blur-2xl"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Strategy Co-Pilot</h2>
                    <p className="text-orange-600 text-sm font-medium">AI-Powered Strategic Intelligence</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  AI-driven strategic planning and analysis tools that help teams make better decisions.
                </p>
                <div className="flex items-center space-x-3">
                  <Link to="/strategy">
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Plan Strategy
                    </button>
                  </Link>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">SWOT</span>
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">Analysis</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                {/* Compact Strategy Dashboard */}
                <div className="relative w-full h-48 bg-gradient-to-br from-orange-100/50 to-red-100/50 rounded-2xl border border-orange-200/50 overflow-hidden backdrop-blur-sm">
                  {/* Strategy Framework Grid */}
                  <div className="absolute top-2 left-2 w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-md flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-lg font-bold">S</div>
                      <div className="text-xs">Strengths</div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-md flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-lg font-bold">W</div>
                      <div className="text-xs">Weaknesses</div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg shadow-md flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-lg font-bold">O</div>
                      <div className="text-xs">Opportunities</div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 w-20 h-20 bg-gradient-to-br from-red-400 to-orange-400 rounded-lg shadow-md flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-lg font-bold">T</div>
                      <div className="text-xs">Threats</div>
                    </div>
                  </div>
                  
                  {/* Central Strategy Hub */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Compact Analytics */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center">
                    <div className="flex space-x-2 text-xs">
                      <span className="text-orange-600 font-medium">23%</span>
                      <span className="text-red-600 font-medium">+15%</span>
                    </div>
                  </div>
                  
                  {/* Animated Data Points */}
                  <div className="absolute top-8 left-6 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                  <div className="absolute top-10 right-8 w-1.5 h-1.5 bg-red-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                  <div className="absolute bottom-10 right-6 w-2 h-2 bg-red-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
                </div>
                
                {/* Compact Stats */}
                <div className="absolute -top-2 -right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-orange-200/50">
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">95%</div>
                    <div className="text-xs text-gray-600">Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meetings Section */}
        <section className="py-20 bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(34,197,94,0.02)_1px,transparent_0)] bg-[length:20px_20px]" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Meetings</h2>
                </div>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Real-time collaboration and video conferencing with AI-powered features and transcription. Our meeting platform combines high-quality video calls with intelligent note-taking, action item tracking, and seamless integration with all NOV8 tools for productive team collaboration.
                </p>
                <div className="flex items-center space-x-4">
                  <Link to="/meetings">
                    <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105">
                      Join Meeting
                    </button>
                  </Link>
                  <div className="flex space-x-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">HD Video</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">AI Transcribe</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">Record</span>
                  </div>
                </div>
              </div>
              <div className="lg:order-1 relative">
                <div className="w-full h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl border border-green-200/50 flex items-center justify-center">
                  <div className="text-center">
                    <Video className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-green-600 font-medium">Video Conference Room</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Simulation Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.02)_1px,transparent_0)] bg-[length:20px_20px]" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">AI Simulation</h2>
                </div>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Scenario modeling and decision forecasting with advanced analytics and risk assessment. Our simulation platform uses sophisticated AI algorithms to model complex scenarios, predict outcomes, and help you make data-driven decisions with confidence.
                </p>
                <div className="flex items-center space-x-4">
                  <Link to="/simulation">
                    <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
                      Run Simulation
                    </button>
                  </Link>
                  <div className="flex space-x-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">What-if</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">Risk Maps</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">Forecast</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl border border-indigo-200/50 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-indigo-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p className="text-indigo-600 font-medium">Scenario Modeling Interface</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Whiteboard Section */}
        <section className="py-20 bg-gradient-to-br from-cyan-50 via-white to-teal-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(6,182,212,0.02)_1px,transparent_0)] bg-[length:20px_20px]" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Digital Whiteboard</h2>
                </div>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Real-time collaborative canvas with advanced drawing and design tools for teams. Our digital whiteboard provides an infinite canvas for brainstorming, diagramming, and visual collaboration with powerful drawing tools and seamless team coordination.
                </p>
                <div className="flex items-center space-x-4">
                  <Link to="/whiteboard">
                    <button className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105">
                      Start Drawing
                    </button>
                  </Link>
                  <div className="flex space-x-2">
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-sm rounded-full">Drawing</span>
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-sm rounded-full">Shapes</span>
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-sm rounded-full">Collaborate</span>
                  </div>
                </div>
              </div>
              <div className="lg:order-1 relative">
                <div className="w-full h-64 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-2xl border border-cyan-200/50 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-cyan-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <p className="text-cyan-600 font-medium">Infinite Canvas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              Create. Collaborate. Execute.
            </h2>
            <div className="flex justify-center mb-12">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Create</h3>
                <p className="text-gray-600 text-lg">Start with mind maps, build presentations, and design strategies with AI assistance</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Collaborate</h3>
                <p className="text-gray-600 text-lg">Work together in real-time with team members across all NOV8 tools</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Execute</h3>
                <p className="text-gray-600 text-lg">Turn ideas into action with AI-powered insights and strategic planning</p>
              </div>
            </div>
            <button className="bg-gray-900 text-white px-12 py-4 rounded-xl font-semibold text-xl transition-all duration-300 hover:bg-gray-800 transform hover:scale-105">
              Start creating today
            </button>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              Ready to transform your collaboration?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Join thousands of teams that trust NOV8 to power their creative and strategic workflows
            </p>
            <button className="bg-gray-900 text-white px-16 py-6 rounded-xl font-semibold text-2xl transition-all duration-300 hover:bg-gray-800 transform hover:scale-105">
              Start your free trial
            </button>
          </div>
        </section>


      </div>
    )
  },
)

HeroSection.displayName = "HeroSection"

export { HeroSection } 