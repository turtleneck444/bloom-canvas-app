import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from "react-router-dom"
import { Brain, Presentation, Video, Target } from "lucide-react"
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
                    Discover NOV8's Revolutionary Suite
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 text-center max-w-3xl mx-auto px-4">
                    Experience the future of collaboration with our AI-powered tools that transform how teams create, strategize, and execute
                  </p>
                </div>
                
                <Tabs defaultValue="mindmaps" className="w-full">
                  {/* Desktop Tabs */}
                  <TabsList className="hidden sm:flex flex-wrap w-full mb-8 bg-gray-100 p-2 rounded-2xl gap-2">
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
                  
                  {/* Mobile Expandable Tabs */}
                  <div className="sm:hidden mb-8">
                    <div className="bg-gray-100 p-2 rounded-2xl">
                      {platformImages.map((platform, index) => (
                        <MobileTab
                          key={platform.id}
                          platform={platform}
                          isActive={index === 0} // You can make this dynamic based on selected tab
                          onClick={() => {
                            // Handle tab selection
                            const tabsTrigger = document.querySelector(`[data-state="active"][value="${platform.id}"]`) as HTMLElement;
                            if (tabsTrigger) {
                              tabsTrigger.click();
                            }
                          }}
                        />
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
                
                {/* Beautiful Animated Arrow */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="flex justify-center"
                >
                  <motion.div
                    animate={{ 
                      y: [0, 10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                                         {/* Main Arrow */}
                     <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                      <motion.svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ 
                          y: [0, 3, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </motion.svg>
                    </div>
                    
                    {/* Pulsing Ring Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-blue-400/30"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 0, 0.6]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                    
                                         {/* Second Pulsing Ring */}
                     <motion.div
                       className="absolute inset-0 rounded-full border-2 border-teal-400/20"
                       animate={{
                         scale: [1, 1.8, 1],
                         opacity: [0.4, 0, 0.4]
                       }}
                       transition={{
                         duration: 2,
                         repeat: Infinity,
                         ease: "easeOut",
                         delay: 0.5
                       }}
                     />
                     
                     {/* Floating Particles */}
                     <motion.div
                       className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full"
                       animate={{
                         y: [0, -10, 0],
                         opacity: [0.8, 0, 0.8]
                       }}
                       transition={{
                         duration: 2,
                         repeat: Infinity,
                         ease: "easeInOut"
                       }}
                     />
                     <motion.div
                       className="absolute -bottom-2 -left-2 w-2 h-2 bg-teal-400 rounded-full"
                       animate={{
                         y: [0, 10, 0],
                         opacity: [0.6, 0, 0.6]
                       }}
                       transition={{
                         duration: 2,
                         repeat: Infinity,
                         ease: "easeInOut",
                         delay: 0.5
                       }}
                     />
                  </motion.div>
                </motion.div>
              </motion.div>
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
                {/* Enhanced Mind Map Visualization - Teal & Blue */}
                <div className="relative w-full h-48 bg-gradient-to-br from-cyan-50/80 via-blue-50/60 to-teal-50/80 rounded-2xl border border-cyan-200/50 overflow-hidden backdrop-blur-sm">
                  {/* Animated Background Particles */}
                  <div className="absolute inset-0">
                    <div className="absolute top-2 left-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
                    <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping opacity-60" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute bottom-4 left-8 w-1 h-1 bg-teal-400 rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-8 right-4 w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping opacity-60" style={{animationDelay: '1.5s'}}></div>
                  </div>
                  
                  {/* Central Neural Hub */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-cyan-500 via-blue-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                    <Brain className="w-7 h-7 text-white" />
                    {/* Pulsing Rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-blue-400/20 animate-ping" style={{animationDelay: '0.3s'}}></div>
                  </div>
                  
                  {/* Floating Neural Nodes */}
                  <div className="absolute top-3 left-3 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg animate-float group hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-semibold text-xs">Ideas</span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute top-6 right-6 w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg animate-float group hover:scale-110 transition-transform duration-300" style={{animationDelay: '0.5s'}}>
                    <span className="text-white font-semibold text-xs">Plan</span>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute bottom-6 left-6 w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg animate-float group hover:scale-110 transition-transform duration-300" style={{animationDelay: '1s'}}>
                    <span className="text-white font-semibold text-xs">Execute</span>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute bottom-3 right-3 w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg animate-float group hover:scale-110 transition-transform duration-300" style={{animationDelay: '1.5s'}}>
                    <span className="text-white font-semibold text-xs">Success</span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-300 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Animated Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full" style={{zIndex: 1}}>
                    <path d="M 48 48 Q 80 50 120 56" stroke="url(#mindMapGradient1)" strokeWidth="2" fill="none" opacity="0.8">
                      <animate attributeName="stroke-dasharray" values="0,100;100,0;0,100" dur="3s" repeatCount="indefinite"/>
                    </path>
                    <path d="M 48 48 Q 60 80 80 120" stroke="url(#mindMapGradient2)" strokeWidth="2" fill="none" opacity="0.8">
                      <animate attributeName="stroke-dasharray" values="0,100;100,0;0,100" dur="3s" repeatCount="indefinite" begin="0.5s"/>
                    </path>
                    <path d="M 120 56 Q 140 80 160 120" stroke="url(#mindMapGradient3)" strokeWidth="2" fill="none" opacity="0.8">
                      <animate attributeName="stroke-dasharray" values="0,100;100,0;0,100" dur="3s" repeatCount="indefinite" begin="1s"/>
                    </path>
                    <defs>
                      <linearGradient id="mindMapGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#06B6D4', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
                      </linearGradient>
                      <linearGradient id="mindMapGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#14B8A6', stopOpacity: 1}} />
                      </linearGradient>
                      <linearGradient id="mindMapGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#14B8A6', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#06B6D4', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Floating Data Points */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center">
                    <div className="flex space-x-1 text-xs">
                      <span className="text-cyan-600 font-medium">AI</span>
                      <span className="text-blue-600 font-medium">•</span>
                      <span className="text-teal-600 font-medium">Nodes</span>
                    </div>
                  </div>
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

        {/* Presentations Section - Enhanced with Orange Accent */}
        <section className="py-12 bg-gradient-to-br from-orange-50 via-white to-amber-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(249,115,22,0.02)_1px,transparent_0)] bg-[length:20px_20px]" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/6 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/6 rounded-full blur-2xl"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="lg:order-2 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Presentation className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Presentations</h2>
                    <p className="text-orange-600 text-sm font-medium">AI-Powered Design Studio</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Create stunning presentations with AI assistance, smart templates, and seamless collaboration.
                </p>
                <div className="flex items-center space-x-3">
                  <Link to="/presentations">
                    <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Create Presentation
                    </button>
                  </Link>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">Templates</span>
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">AI Design</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:order-1 relative">
                {/* Enhanced Presentation Builder - Orange Accent */}
                <div className="relative w-full h-48 bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-yellow-50/80 rounded-2xl border border-orange-200/50 overflow-hidden backdrop-blur-sm">
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0">
                    <div className="absolute top-2 left-4 w-2 h-2 bg-orange-400 rounded-full animate-ping opacity-60"></div>
                    <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping opacity-60" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute bottom-4 left-8 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-8 right-4 w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping opacity-60" style={{animationDelay: '1.5s'}}></div>
                  </div>
                  
                  {/* Interactive Slide Stack */}
                  <div className="absolute top-2 left-2 w-32 h-20 bg-white rounded-lg shadow-md transform rotate-1 border border-orange-200/30 group hover:scale-105 transition-transform duration-300">
                    <div className="p-2">
                      <div className="w-8 h-1.5 bg-orange-200 rounded mb-1.5"></div>
                      <div className="w-16 h-1 bg-orange-100 rounded mb-1"></div>
                      <div className="w-12 h-1 bg-orange-100 rounded"></div>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-orange-400/20 to-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute top-4 left-4 w-32 h-20 bg-white rounded-lg shadow-md transform -rotate-0.5 border border-amber-200/30 group hover:scale-105 transition-transform duration-300">
                    <div className="p-2">
                      <div className="w-8 h-1.5 bg-amber-200 rounded mb-1.5"></div>
                      <div className="w-16 h-1 bg-amber-100 rounded mb-1"></div>
                      <div className="w-12 h-1 bg-amber-100 rounded"></div>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-amber-400/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute top-6 left-6 w-32 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg shadow-lg transform rotate-0.5 group hover:scale-110 transition-transform duration-300">
                    <div className="p-2 text-white">
                      <div className="w-8 h-1.5 bg-white/30 rounded mb-1.5"></div>
                      <div className="w-16 h-1 bg-white/20 rounded mb-1"></div>
                      <div className="w-12 h-1 bg-white/20 rounded"></div>
                    </div>
                    {/* AI Assistant Indicator */}
                    <div className="absolute top-1 right-1 w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-orange-400/30 to-amber-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Floating Design Tools */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-400 rounded-lg flex items-center justify-center shadow-lg animate-bounce group hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-orange-300/50 to-amber-300/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Animated Design Elements */}
                  <div className="absolute bottom-3 right-8 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center shadow-md animate-pulse group hover:scale-110 transition-transform duration-300">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  
                  {/* Floating Stats */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center">
                    <div className="flex space-x-1 text-xs">
                      <span className="text-orange-600 font-medium">AI</span>
                      <span className="text-amber-600 font-medium">•</span>
                      <span className="text-yellow-600 font-medium">Design</span>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Stats */}
                <div className="absolute -top-2 -right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-orange-200/50">
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">500+</div>
                    <div className="text-xs text-gray-600">Templates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Co-Pilot Section - Enhanced with Green Accent */}
        <section className="py-12 bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(34,197,94,0.02)_1px,transparent_0)] bg-[length:20px_20px]" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-500/6 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/6 rounded-full blur-2xl"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Strategy Co-Pilot</h2>
                    <p className="text-green-600 text-sm font-medium">AI-Powered Strategic Intelligence</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  AI-driven strategic planning and analysis tools that help teams make better decisions.
                </p>
                <div className="flex items-center space-x-3">
                  <Link to="/strategy">
                    <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Plan Strategy
                    </button>
                  </Link>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">SWOT</span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">Analysis</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                {/* Enhanced Strategy Dashboard - Green Accent */}
                <div className="relative w-full h-48 bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-teal-50/80 rounded-2xl border border-green-200/50 overflow-hidden backdrop-blur-sm">
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0">
                    <div className="absolute top-2 left-4 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-60"></div>
                    <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping opacity-60" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute bottom-4 left-8 w-1 h-1 bg-teal-400 rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-8 right-4 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping opacity-60" style={{animationDelay: '1.5s'}}></div>
                  </div>
                  
                  {/* Interactive Strategy Framework Grid */}
                  <div className="absolute top-2 left-2 w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                    <div className="text-center text-white">
                      <div className="text-lg font-bold">S</div>
                      <div className="text-xs">Strengths</div>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-green-400/30 to-emerald-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute top-2 right-2 w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-md flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                    <div className="text-center text-white">
                      <div className="text-lg font-bold">W</div>
                      <div className="text-xs">Weaknesses</div>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-400/30 to-teal-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute bottom-2 left-2 w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg shadow-md flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                    <div className="text-center text-white">
                      <div className="text-lg font-bold">O</div>
                      <div className="text-xs">Opportunities</div>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-teal-400/30 to-green-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute bottom-2 right-2 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg shadow-md flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                    <div className="text-center text-white">
                      <div className="text-lg font-bold">T</div>
                      <div className="text-xs">Threats</div>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-green-300/30 to-emerald-300/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Central Strategy Hub */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                    <Target className="w-7 h-7 text-white" />
                    {/* Pulsing Rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-green-400/30 animate-ping"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-400/20 animate-ping" style={{animationDelay: '0.3s'}}></div>
                  </div>
                  
                  {/* Animated Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full" style={{zIndex: 1}}>
                    <path d="M 48 48 Q 80 50 120 56" stroke="url(#strategyGradient1)" strokeWidth="2" fill="none" opacity="0.8">
                      <animate attributeName="stroke-dasharray" values="0,100;100,0;0,100" dur="3s" repeatCount="indefinite"/>
                    </path>
                    <path d="M 48 48 Q 60 80 80 120" stroke="url(#strategyGradient2)" strokeWidth="2" fill="none" opacity="0.8">
                      <animate attributeName="stroke-dasharray" values="0,100;100,0;0,100" dur="3s" repeatCount="indefinite" begin="0.5s"/>
                    </path>
                    <defs>
                      <linearGradient id="strategyGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#22C55E', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#10B981', stopOpacity: 1}} />
                      </linearGradient>
                      <linearGradient id="strategyGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#10B981', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#14B8A6', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Enhanced Analytics */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center">
                    <div className="flex space-x-2 text-xs">
                      <span className="text-green-600 font-medium">23%</span>
                      <span className="text-emerald-600 font-medium">+15%</span>
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

        {/* Meetings Section - Enhanced with Blue Accent */}
        <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.02)_1px,transparent_0)] bg-[length:20px_20px]" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/6 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/6 rounded-full blur-2xl"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="lg:order-2 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Meetings</h2>
                    <p className="text-blue-600 text-sm font-medium">AI-Powered Video Collaboration</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Real-time collaboration and video conferencing with AI-powered features and transcription.
                </p>
                <div className="flex items-center space-x-3">
                  <Link to="/meetings">
                    <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Join Meeting
                    </button>
                  </Link>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">HD Video</span>
                    <span className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full font-medium">AI Transcribe</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:order-1 relative">
                {/* Enhanced Meeting Room Visualization - Blue Accent */}
                <div className="relative w-full h-48 bg-gradient-to-br from-blue-50/80 via-cyan-50/60 to-indigo-50/80 rounded-2xl border border-blue-200/50 overflow-hidden backdrop-blur-sm">
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0">
                    <div className="absolute top-2 left-4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
                    <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping opacity-60" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute bottom-4 left-8 w-1 h-1 bg-indigo-400 rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-8 right-4 w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping opacity-60" style={{animationDelay: '1.5s'}}></div>
                  </div>
                  
                  {/* Video Conference Interface */}
                  <div className="absolute top-4 left-4 w-32 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                    <div className="text-center text-white">
                      <Video className="w-6 h-6 mx-auto mb-1" />
                      <div className="text-xs font-medium">Main Room</div>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-400/30 to-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Participant Avatars */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-md animate-pulse group hover:scale-110 transition-transform duration-300">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute top-8 right-8 w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-md animate-pulse group hover:scale-110 transition-transform duration-300" style={{animationDelay: '0.5s'}}>
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute top-12 right-4 w-8 h-8 bg-gradient-to-br from-indigo-400 to-cyan-500 rounded-full flex items-center justify-center shadow-md animate-pulse group hover:scale-110 transition-transform duration-300" style={{animationDelay: '1s'}}>
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  
                  {/* AI Transcription Panel */}
                  <div className="absolute bottom-4 left-4 w-40 h-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-md flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-700 font-medium">AI Transcribing...</span>
                    </div>
                  </div>
                  
                  {/* Meeting Controls */}
                  <div className="absolute bottom-4 right-4 w-24 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-md flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Floating Stats */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center">
                    <div className="flex space-x-1 text-xs">
                      <span className="text-blue-600 font-medium">Live</span>
                      <span className="text-cyan-600 font-medium">•</span>
                      <span className="text-indigo-600 font-medium">3 Users</span>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Stats */}
                <div className="absolute -top-2 -right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-blue-200/50">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">HD</div>
                    <div className="text-xs text-gray-600">Quality</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Simulation Section - Enhanced with Purple Accent */}
        <section className="py-12 bg-gradient-to-br from-purple-50 via-white to-violet-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(147,51,234,0.02)_1px,transparent_0)] bg-[length:20px_20px]" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/6 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-500/6 rounded-full blur-2xl"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">AI Simulation</h2>
                    <p className="text-purple-600 text-sm font-medium">Advanced Scenario Modeling</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Scenario modeling and decision forecasting with advanced analytics and risk assessment.
                </p>
                <div className="flex items-center space-x-3">
                  <Link to="/simulation">
                    <button className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Run Simulation
                    </button>
                  </Link>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">What-if</span>
                    <span className="px-2 py-1 bg-violet-100 text-violet-700 text-xs rounded-full font-medium">Risk Maps</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                {/* Enhanced AI Simulation Visualization - Purple Accent */}
                <div className="relative w-full h-48 bg-gradient-to-br from-purple-50/80 via-violet-50/60 to-fuchsia-50/80 rounded-2xl border border-purple-200/50 overflow-hidden backdrop-blur-sm">
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0">
                    <div className="absolute top-2 left-4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-60"></div>
                    <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-violet-400 rounded-full animate-ping opacity-60" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute bottom-4 left-8 w-1 h-1 bg-fuchsia-400 rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-8 right-4 w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping opacity-60" style={{animationDelay: '1.5s'}}></div>
                  </div>
                  
                  {/* Simulation Data Points */}
                  <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg shadow-lg flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                    <div className="text-center text-white">
                      <div className="text-lg font-bold">A</div>
                      <div className="text-xs">Scenario</div>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-400/30 to-violet-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-lg shadow-lg flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                    <div className="text-center text-white">
                      <div className="text-lg font-bold">B</div>
                      <div className="text-xs">Outcome</div>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-400/30 to-fuchsia-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                    <div className="text-center text-white">
                      <div className="text-lg font-bold">C</div>
                      <div className="text-xs">Risk</div>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-fuchsia-400/30 to-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-400 rounded-lg shadow-lg flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                    <div className="text-center text-white">
                      <div className="text-lg font-bold">D</div>
                      <div className="text-xs">Forecast</div>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-300/30 to-violet-300/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Central AI Hub */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-purple-500 via-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    {/* Pulsing Rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ping"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-violet-400/20 animate-ping" style={{animationDelay: '0.3s'}}></div>
                  </div>
                  
                  {/* Animated Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full" style={{zIndex: 1}}>
                    <path d="M 48 48 Q 80 50 120 56" stroke="url(#simulationGradient1)" strokeWidth="2" fill="none" opacity="0.8">
                      <animate attributeName="stroke-dasharray" values="0,100;100,0;0,100" dur="3s" repeatCount="indefinite"/>
                    </path>
                    <path d="M 48 48 Q 60 80 80 120" stroke="url(#simulationGradient2)" strokeWidth="2" fill="none" opacity="0.8">
                      <animate attributeName="stroke-dasharray" values="0,100;100,0;0,100" dur="3s" repeatCount="indefinite" begin="0.5s"/>
                    </path>
                    <defs>
                      <linearGradient id="simulationGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#A855F7', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#8B5CF6', stopOpacity: 1}} />
                      </linearGradient>
                      <linearGradient id="simulationGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#8B5CF6', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#D946EF', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Floating Analytics */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center">
                    <div className="flex space-x-1 text-xs">
                      <span className="text-purple-600 font-medium">AI</span>
                      <span className="text-violet-600 font-medium">•</span>
                      <span className="text-fuchsia-600 font-medium">Modeling</span>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Stats */}
                <div className="absolute -top-2 -right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-purple-200/50">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">99%</div>
                    <div className="text-xs text-gray-600">Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Whiteboard Section - Enhanced with Teal to Green Gradient */}
        <section className="py-12 bg-gradient-to-br from-teal-50 via-white to-green-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(20,184,166,0.02)_1px,transparent_0)] bg-[length:20px_20px]" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-teal-500/6 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-green-500/6 rounded-full blur-2xl"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="lg:order-2 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Digital Whiteboard</h2>
                    <p className="text-teal-600 text-sm font-medium">Infinite Collaborative Canvas</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Real-time collaborative canvas with advanced drawing and design tools for teams.
                </p>
                <div className="flex items-center space-x-3">
                  <Link to="/whiteboard">
                    <button className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-teal-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Start Drawing
                    </button>
                  </Link>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full font-medium">Drawing</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Shapes</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:order-1 relative">
                {/* Enhanced Digital Whiteboard Visualization - Teal to Green Gradient */}
                <div className="relative w-full h-48 bg-gradient-to-br from-teal-50/80 via-green-50/60 to-emerald-50/80 rounded-2xl border border-teal-200/50 overflow-hidden backdrop-blur-sm">
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0">
                    <div className="absolute top-2 left-4 w-2 h-2 bg-teal-400 rounded-full animate-ping opacity-60"></div>
                    <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping opacity-60" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute bottom-4 left-8 w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-8 right-4 w-1.5 h-1.5 bg-teal-500 rounded-full animate-ping opacity-60" style={{animationDelay: '1.5s'}}></div>
                  </div>
                  
                  {/* Drawing Canvas Elements */}
                  <div className="absolute top-4 left-4 w-32 h-20 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg shadow-lg flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                    <div className="text-center text-white">
                      <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      <div className="text-xs font-medium">Canvas</div>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-teal-400/30 to-green-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Drawing Tools */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg flex items-center justify-center shadow-md animate-pulse group hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <div className="absolute top-8 right-8 w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md animate-pulse group hover:scale-110 transition-transform duration-300" style={{animationDelay: '0.5s'}}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <div className="absolute top-12 right-4 w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center shadow-md animate-pulse group hover:scale-110 transition-transform duration-300" style={{animationDelay: '1s'}}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                  
                  {/* Drawing Elements */}
                  <div className="absolute bottom-4 left-4 w-24 h-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-md flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span className="text-xs text-gray-700 font-medium">Drawing...</span>
                    </div>
                  </div>
                  
                  {/* Collaboration Indicators */}
                  <div className="absolute bottom-4 right-4 w-24 h-8 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg shadow-md flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Floating Stats */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center">
                    <div className="flex space-x-1 text-xs">
                      <span className="text-teal-600 font-medium">Live</span>
                      <span className="text-green-600 font-medium">•</span>
                      <span className="text-emerald-600 font-medium">Canvas</span>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Stats */}
                <div className="absolute -top-2 -right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-teal-200/50">
                  <div className="text-center">
                    <div className="text-lg font-bold text-teal-600">∞</div>
                    <div className="text-xs text-gray-600">Canvas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Professional 1-2-3 Process Section */}
        <section className="py-16 bg-white dark:bg-gray-900 overflow-hidden relative">
          {/* Animated Background Line */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </div>
          
          {/* Enhanced Floating Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full"
              animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-3/4 right-1/4 w-1 h-1 bg-teal-400/40 rounded-full"
              animate={{ y: [0, 15, 0], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-emerald-400/25 rounded-full"
              animate={{ y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Get Started in 3 Simple Steps
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Experience NOV8's revolutionary platform in minutes, not hours
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-blue-200 dark:group-hover:border-blue-700">
                  {/* Step Number */}
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  
                  {/* Enhanced Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all duration-300">
                    <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">Sign Up</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed text-sm">
                    Create your account in under 30 seconds. No credit card required for your free trial.
                  </p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-teal-200 dark:group-hover:border-teal-700">
                  {/* Step Number */}
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  
                  {/* Enhanced Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all duration-300">
                    <svg className="w-7 h-7 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">Choose Your Tools</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed text-sm">
                    Explore our suite of AI-powered tools. Start with mind maps, presentations, or strategy planning.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-emerald-200 dark:group-hover:border-emerald-700">
                  {/* Step Number */}
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  
                  {/* Enhanced Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all duration-300">
                    <svg className="w-7 h-7 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">Start Creating</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed text-sm">
                    Begin collaborating with your team immediately. Export, share, and scale your ideas effortlessly.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Enhanced CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 transform shadow-xl hover:shadow-2xl">
                <span>Start Your Free Trial</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                No credit card required • 14-day free trial • Full access to all tools
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