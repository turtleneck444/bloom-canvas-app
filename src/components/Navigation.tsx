import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Presentation, 
  LayoutGrid, 
  Compass, 
  Users, 
  Network, 
  PenTool,
  Menu,
  X,
  ChevronDown,
  Settings,
  Sparkles,
  DollarSign,
  BookOpen,
  Shield,
  HelpCircle,
  Building2,
  Phone,
  Mail,
  Globe,
  Award,
  Zap,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  // Pages where we want to hide the main navigation (tool pages with their own toolbars)
  const hideNavigationPages = [
    '/mindmaps',
    '/presentations', 
    '/meetings',
    '/strategy',
    '/simulation',
    '/whiteboard',
    '/layout-demo'
  ];

  // Check if current page should hide navigation
  const shouldHideNavigation = hideNavigationPages.includes(location.pathname);

  if (shouldHideNavigation) {
    return null;
  }

  const services = [
    {
      name: 'Mind Maps',
      description: 'AI-powered mind mapping and brainstorming',
      icon: Brain,
      path: '/mindmaps',
      color: 'from-teal-500 to-blue-500',
      gradient: 'from-teal-400 via-cyan-400 to-blue-500',
      features: ['AI Node Generation', 'Multiple Layouts', 'Real-time Collaboration']
    },
    {
      name: 'Presentations',
      description: 'Professional presentation creation',
      icon: Presentation,
      path: '/presentations',
      color: 'from-orange-500 to-red-500',
      gradient: 'from-orange-400 via-orange-500 to-red-500',
      features: ['Premium Templates', 'Advanced Design Tools', 'Export Options']
    },
    {
      name: 'Meetings',
      description: 'Real-time collaboration and video conferencing',
      icon: Users,
      path: '/meetings',
      color: 'from-blue-500 to-blue-600',
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      features: ['HD Video Calls', 'Screen Sharing', 'AI Transcription']
    },
    {
      name: 'Strategy Co-Pilot',
      description: 'AI-driven strategic planning and analysis',
      icon: Compass,
      path: '/strategy',
      color: 'from-emerald-500 to-green-600',
      gradient: 'from-emerald-400 via-green-500 to-green-600',
      features: ['SWOT Analysis', 'Porter\'s 5 Forces', 'Risk Assessment']
    },
    {
      name: 'AI Simulation',
      description: 'Scenario modeling and decision forecasting',
      icon: Network,
      path: '/simulation',
      color: 'from-purple-500 to-indigo-600',
      gradient: 'from-purple-400 via-purple-500 to-indigo-600',
      features: ['What-if Scenarios', 'Risk Heatmaps', 'Forecasting Models']
    },
    {
      name: 'Digital Whiteboard',
      description: 'Interactive whiteboard for collaboration',
      icon: PenTool,
      path: '/whiteboard',
      color: 'from-green-500 to-emerald-600',
      gradient: 'from-green-400 via-emerald-500 to-emerald-600',
      features: ['Real-time Drawing', 'Team Collaboration', 'Export Options']
    }
  ];

  const companyPages = [
    { name: 'About Us', icon: Building2, path: '/about', description: 'Our story and mission' },
    { name: 'Careers', icon: Award, path: '/careers', description: 'Join our team' },
    { name: 'Press', icon: Globe, path: '/press', description: 'Media and news' },
    { name: 'Contact', icon: Phone, path: '/contact', description: 'Get in touch' }
  ];

  const essentials = [
    { name: 'Documentation', icon: BookOpen, path: '/mindmaps/docs', description: 'Learn how to use NOV8' },
    { name: 'Support', icon: HelpCircle, path: '/support', description: 'Get help when you need it' },
    { name: 'Security', icon: Shield, path: '/security', description: 'Your data is safe with us' },
    { name: 'Settings', icon: Settings, path: '/settings', description: 'Manage your account' }
  ];

  const pricingTiers = [
    { 
      name: 'Starter', 
      price: '$10', 
      description: 'Perfect for individuals',
      features: ['Basic AI Access', '5 Projects', 'Email Support'],
      popular: false
    },
    { 
      name: 'Pro', 
      price: '$29', 
      description: 'For professionals',
      features: ['Full AI Access', 'Unlimited Projects', 'Priority Support'],
      popular: true
    },
    { 
      name: 'Enterprise', 
      price: '$99', 
      description: 'For teams and consultants',
      features: ['Custom AI Models', 'Team Management', 'Dedicated Support'],
      popular: false
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo - Always on the left */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img src="/nov8black.png" alt="NOV8 Logo" className="h-8 w-auto transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 rounded-lg">
                  <div className="relative">
                    <Sparkles className="w-4 h-4" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                  </div>
                  <span className="font-medium">Services</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80 p-4 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl">
                <div className="grid grid-cols-1 gap-2">
                  {services.map((service) => (
                    <DropdownMenuItem key={service.path} asChild>
                      <Link 
                        to={service.path} 
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 group"
                        onMouseEnter={() => setHoveredService(service.name)}
                        onMouseLeave={() => setHoveredService(null)}
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${service.gradient} flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 ${hoveredService === service.name ? 'scale-105' : ''}`}>
                          <service.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 text-sm mb-1">{service.name}</div>
                          <div className="text-xs text-gray-600 mb-2">{service.description}</div>
                          <div className="flex flex-wrap gap-1">
                            {service.features.slice(0, 2).map((feature, index) => (
                              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors duration-300 flex-shrink-0" />
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Company Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 rounded-lg">
                  <Building2 className="w-4 h-4" />
                  <span className="font-medium">Company</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 p-4 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl">
                <div className="space-y-3">
                  {companyPages.map((page) => (
                    <DropdownMenuItem key={page.path} asChild>
                      <Link to={page.path} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                          <page.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{page.name}</div>
                          <div className="text-sm text-gray-500">{page.description}</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Pricing Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 rounded-lg">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-medium">Pricing</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80 p-6 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl">
                <div className="space-y-4">
                  {pricingTiers.map((tier) => (
                    <div key={tier.name} className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${tier.popular ? 'border-blue-200 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                      {tier.popular && (
                        <div className="inline-flex items-center px-2 py-1 rounded-full bg-blue-600 text-white text-xs font-medium mb-3">
                          Most Popular
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-semibold text-gray-900 text-lg">{tier.name}</div>
                          <div className="text-sm text-gray-600">{tier.description}</div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{tier.price}</div>
                      </div>
                      <div className="space-y-2 mb-4">
                        {tier.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <DropdownMenuSeparator />
                  <Link to="/book-demo" className="block">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Essentials Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-300 rounded-lg">
                  <Zap className="w-4 h-4" />
                  <span className="font-medium">Essentials</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 p-4 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl">
                <div className="grid grid-cols-1 gap-3">
                  {essentials.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link to={item.path} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.description}</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Book Demo Button */}
            <Link to="/book-demo">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg font-medium">
                Book Demo
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-xl max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-4 space-y-4">
              
              {/* Services Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Services</span>
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {services.map((service) => (
                    <Link key={service.path} to={service.path} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${service.gradient} flex items-center justify-center shadow-md flex-shrink-0`}>
                          <service.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 text-sm">{service.name}</div>
                          <div className="text-xs text-gray-500 truncate">{service.description}</div>
                        </div>
                        <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Company Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-green-600" />
                  <span>Company</span>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {companyPages.map((page) => (
                    <Link key={page.path} to={page.path} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                          <page.icon className="w-3 h-3 text-white" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 text-xs">{page.name}</div>
                          <div className="text-xs text-gray-500 truncate">{page.description}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Pricing Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-orange-600" />
                  <span>Pricing</span>
                </h3>
                <div className="space-y-2">
                  {pricingTiers.map((tier) => (
                    <div key={tier.name} className={`p-3 rounded-lg border ${tier.popular ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200'}`}>
                      {tier.popular && (
                        <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs font-medium mb-2">
                          Most Popular
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{tier.name}</div>
                          <div className="text-xs text-gray-600">{tier.description}</div>
                        </div>
                        <div className="text-lg font-bold text-gray-900">{tier.price}</div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {tier.features.slice(0, 2).map((feature, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Essentials Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span>Essentials</span>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {essentials.map((item) => (
                    <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                          <item.icon className="w-3 h-3 text-white" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 text-xs">{item.name}</div>
                          <div className="text-xs text-gray-500 truncate">{item.description}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Book Demo Button */}
              <div className="pt-3">
                <Link to="/book-demo" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg font-medium py-2">
                    Book Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;