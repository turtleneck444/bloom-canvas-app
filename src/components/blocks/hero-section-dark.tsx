import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from "react-router-dom"
import { Brain, Presentation, Video, Target, Network, Palette } from "lucide-react"
import { RotatingText } from "@/components/ui/rotating-text"
import { NOV8GlowCard } from "@/components/ui/spotlight-card"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

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

// Mobile Tab Component
const MobileTab = ({ platform, isActive, onClick }: { platform: PlatformImage; isActive: boolean; onClick: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={`mb-2 last:mb-0 overflow-hidden rounded-xl transition-all duration-300 ${
        isActive ? 'bg-white shadow-lg' : 'bg-gray-50'
      }`}
      initial={false}
      animate={{ height: isExpanded ? "auto" : "60px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <button
        onClick={() => {
          setIsExpanded(!isExpanded);
          onClick();
        }}
        className={`w-full px-4 py-3 text-left transition-all duration-300 ${
          isActive ? 'text-gray-900' : 'text-gray-600'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm">{platform.name}</span>
          <motion.svg
            className="w-5 h-5"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </div>
      </button>
      
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 pb-3"
        >
          <p className="text-xs text-gray-500 leading-relaxed">
            {platform.description}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

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
        light: "mindmaps.png",
        dark: "mindmaps.png",
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
        light: "presentations.png",
        dark: "presentations.png",
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
        light: "meetings.png",
        dark: "meetings.png",
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
        light: "strategy.png",
        dark: "strategy.png",
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
        light: "aisimulation.png",
        dark: "aisimulation.png",
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
        light: "digitalwhiteboard.png",
        dark: "digitalwhiteboard.png",
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
                    src="/nov8black.png"
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
                    Discover NOV8's Revolutionary Suite
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 text-center max-w-3xl mx-auto px-4">
                    Experience the future of collaboration with our AI-powered tools that transform how teams create, strategize, and execute
                  </p>
                </div>
                
                <Tabs defaultValue="mindmaps" className="w-full">
                  {/* Desktop Tabs */}
                  <TabsList className="hidden sm:grid sm:grid-cols-3 lg:flex lg:flex-wrap w-full mb-8 bg-gray-100 p-2 rounded-2xl gap-2">
                    {platformImages.map((platform) => (
                      <TabsTrigger
                        key={platform.id}
                        value={platform.id}
                        className={`tab-glassmorphism ${platform.tabColor} ${platform.textColor} ${platform.hoverTextColor} transition-all duration-300 rounded-xl px-2 py-3 text-xs lg:px-4 lg:py-3 lg:text-sm font-semibold flex-1 min-w-0 border-2 border-transparent data-[state=active]:border-current`}
                      >
                        <span className="truncate">{platform.name}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {/* Mobile Tabs - 2 Columns */}
                  <div className="sm:hidden mb-8">
                    <div className="bg-gray-100 p-2 rounded-2xl grid grid-cols-2 gap-2">
                      {platformImages.map((platform) => (
                        <TabsTrigger
                          key={platform.id}
                          value={platform.id}
                          className={`tab-glassmorphism ${platform.tabColor} ${platform.textColor} ${platform.hoverTextColor} transition-all duration-300 rounded-xl px-2 py-3 text-xs font-semibold border-2 border-transparent data-[state=active]:border-current`}
                        >
                          <span className="truncate text-center">{platform.name}</span>
                        </TabsTrigger>
                      ))}
                    </div>
                  </div>

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

        {/* Animated Services Title Section */}
        <section className="relative py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] bg-[length:32px_32px] opacity-50" />
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Badge variant="outline" className="mb-4 px-4 py-1 text-sm bg-blue-50/80 border-blue-200/50 text-blue-700 dark:bg-blue-900/20 dark:border-blue-700/50 dark:text-blue-300">
                  Our Services
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Services designed to help you{' '}
                  <div className="inline-flex items-center">
                    <RotatingText
                      texts={[
                        "grow",
                        "strategize", 
                        "collaborate",
                        "innovate",
                        "succeed",
                        "transform",
                        "create",
                        "execute",
                        "scale",
                        "thrive"
                      ]}
                      mainClassName="px-3 sm:px-4 md:px-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-gray-900 dark:text-white text-4xl lg:text-5xl overflow-hidden py-1 sm:py-2 md:py-3 justify-center rounded-xl shadow-sm border border-blue-200/50 dark:border-purple-700/50"
                      staggerFrom="last"
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-120%", opacity: 0 }}
                      staggerDuration={0.08}
                      splitLevelClassName="overflow-hidden pb-1 sm:pb-2 md:pb-3"
                      transition={{ type: "spring", damping: 40, stiffness: 800 }}
                      rotationInterval={3000}
                      auto={true}
                      loop={true}
                    />
                  </div>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                  Six powerful tools designed to transform how teams work together, from initial ideas to final execution.
                </p>
                
                                {/* Clean Animated Arrow */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="flex justify-center"
                >
                  <motion.div
                    animate={{ 
                      y: [0, 8, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <motion.svg
                      className="w-8 h-8 text-slate-600 dark:text-slate-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ 
                        y: [0, 2, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </motion.svg>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Grid Section - Proper 2x3 Layout */}
        <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.02)_1px,transparent_0)] bg-[length:20px_20px]" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Services Grid - 2 columns, 3 rows */}
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Column 1: Mind Maps, Strategy Co-Pilot, AI Simulation */}
              <div className="space-y-6">
                {/* Mind Maps */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Mind Maps</h3>
                      <p className="text-blue-600 text-sm font-medium">AI-Powered Visual Thinking</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Transform ideas into visual workflows with AI-powered suggestions and real-time collaboration. Organize thoughts, brainstorm concepts, and create structured visual representations of complex information.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Link to="/mindmaps">
                        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                          Start Mapping
                        </button>
                      </Link>
                      <Link to="/mindmaps/docs" className="text-blue-600 hover:text-blue-700 text-sm font-medium underline transition-colors duration-300">
                        Documentation
                      </Link>
                    </div>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">AI Nodes</span>
                      <span className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full font-medium">Real-time</span>
                    </div>
                  </div>
                </div>
                
                {/* Strategy Co-Pilot */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Strategy Co-Pilot</h3>
                      <p className="text-green-600 text-sm font-medium">AI-Powered Strategic Intelligence</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    AI-driven strategic planning and analysis tools that help teams make better decisions. Leverage advanced frameworks, competitive analysis, and data-driven insights to develop comprehensive strategic roadmaps.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Link to="/strategy">
                        <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                          Plan Strategy
                        </button>
                      </Link>
                      <Link to="/strategy/docs" className="text-green-600 hover:text-green-700 text-sm font-medium underline transition-colors duration-300">
                        Documentation
                      </Link>
                    </div>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">SWOT</span>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">Analysis</span>
                    </div>
                  </div>
                </div>
                
                {/* AI Simulation */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Network className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">AI Simulation</h3>
                      <p className="text-purple-600 text-sm font-medium">Scenario Modeling & Forecasting</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Advanced scenario modeling and decision forecasting with comprehensive analytics. Test different outcomes, assess risks, and optimize strategies through sophisticated AI-powered simulation environments.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Link to="/simulation">
                        <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                          Run Simulation
                        </button>
                      </Link>
                      <Link to="/simulation/docs" className="text-purple-600 hover:text-purple-700 text-sm font-medium underline transition-colors duration-300">
                        Documentation
                      </Link>
                    </div>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">What-if</span>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">Forecasting</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Column 2: Presentations, Meetings, Digital Whiteboard */}
              <div className="space-y-6">
                {/* Presentations */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Presentation className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Presentations</h3>
                      <p className="text-orange-600 text-sm font-medium">AI-Powered Design Studio</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Create stunning presentations with AI assistance, smart templates, and seamless collaboration. Design professional slides with intelligent layout suggestions and real-time team editing capabilities.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Link to="/presentations">
                        <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                          Create Presentation
                        </button>
                      </Link>
                      <Link to="/presentations/docs" className="text-orange-600 hover:text-orange-700 text-sm font-medium underline transition-colors duration-300">
                        Documentation
                      </Link>
                    </div>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">Templates</span>
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">AI Design</span>
                    </div>
                  </div>
                </div>
                
                {/* Meetings */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Meetings</h3>
                      <p className="text-blue-600 text-sm font-medium">AI-Powered Video Collaboration</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Real-time collaboration and video conferencing with AI-powered features and transcription. Host high-quality meetings with intelligent note-taking, action item tracking, and seamless screen sharing capabilities.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Link to="/meetings">
                        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                          Join Meeting
                        </button>
                      </Link>
                      <Link to="/meetings/docs" className="text-blue-600 hover:text-blue-700 text-sm font-medium underline transition-colors duration-300">
                        Documentation
                      </Link>
                    </div>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">HD Video</span>
                      <span className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full font-medium">AI Transcribe</span>
                    </div>
                  </div>
                </div>
                
                {/* Digital Whiteboard */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Digital Whiteboard</h3>
                      <p className="text-teal-600 text-sm font-medium">Real-time Collaborative Canvas</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Real-time collaborative canvas with advanced drawing and design tools for teams to brainstorm, sketch ideas, and create visual workflows together seamlessly.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Link to="/whiteboard">
                        <button className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                          Start Drawing
                        </button>
                      </Link>
                      <Link to="/whiteboard/docs" className="text-teal-600 hover:text-teal-700 text-sm font-medium underline transition-colors duration-300">
                        Documentation
                      </Link>
                    </div>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full font-medium">Real-time</span>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">Collaboration</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>














        {/* Luxury Fortune 500 Process Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden relative">
          {/* Sophisticated Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.08)_1px,transparent_0)] bg-[length:24px_24px]" />
          
          {/* Elegant Divider Line */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">Enterprise Process</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                Three-Step Implementation
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Streamlined onboarding process designed for enterprise teams and Fortune 500 organizations
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-700 group-hover:-translate-y-1">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8 w-8 h-8 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800">
                    <span className="text-white dark:text-slate-900 font-bold text-xs">01</span>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-6 group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors duration-300">
                    <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Account Setup</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                    Enterprise-grade account creation with SSO integration and advanced security protocols
                  </p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-700 group-hover:-translate-y-1">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8 w-8 h-8 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800">
                    <span className="text-white dark:text-slate-900 font-bold text-xs">02</span>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-6 group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors duration-300">
                    <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Platform Configuration</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                    Customize your workspace with enterprise tools and team collaboration features
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-700 group-hover:-translate-y-1">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8 w-8 h-8 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800">
                    <span className="text-white dark:text-slate-900 font-bold text-xs">03</span>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-6 group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors duration-300">
                    <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Deployment</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                    Launch your team's productivity with enterprise-grade collaboration and analytics
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Luxury CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <Link to="/onboarding" className="inline-block">
                <div className="inline-flex items-center space-x-4 bg-black text-white px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl">
                  <span>Get Started</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 tracking-wide">
                Enterprise Security • 99.9% Uptime • 24/7 Support
              </p>
            </motion.div>
          </div>
        </section>




      </div>
    )
  },
)

HeroSection.displayName = "HeroSection"

export { HeroSection } 