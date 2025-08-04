import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Home, 
  ArrowLeft, 
  Search, 
  Brain, 
  Presentation, 
  Users, 
  Target, 
  Network, 
  PenTool 
} from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const popularRoutes = [
    { name: "Mind Maps", path: "/mindmaps", icon: Brain, description: "Visual thinking and idea mapping" },
    { name: "Presentations", path: "/presentations", icon: Presentation, description: "Professional slide creation" },
    { name: "Meetings", path: "/meetings", icon: Users, description: "Collaborative workspace" },
    { name: "Strategy Co-Pilot", path: "/strategy", icon: Target, description: "AI-driven strategic planning" },
    { name: "AI Simulation", path: "/simulation", icon: Network, description: "Scenario modeling and forecasting" },
    { name: "Digital Whiteboard", path: "/whiteboard", icon: PenTool, description: "Real-time collaborative canvas" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Header */}
          <div className="mb-8">
            <h1 className="text-8xl font-bold text-slate-900 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-slate-700 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track with NOV8's powerful tools.
            </p>
          </div>

          {/* Error Details */}
          <Card className="mb-8 max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-slate-700">Error Details</CardTitle>
              <CardDescription>
                We couldn't find the page you requested
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">
                <strong>Requested URL:</strong> {location.pathname}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/">
              <Button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white">
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="px-8 py-3"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Popular Tools */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6">
              Popular NOV8 Tools
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularRoutes.map((route, index) => (
                <motion.div
                  key={route.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={route.path}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-slate-200 hover:border-blue-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <route.icon className="w-6 h-6 text-blue-600" />
                          <CardTitle className="text-lg text-slate-800">
                            {route.name}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="text-slate-600">
                          {route.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-slate-800">Need Help?</CardTitle>
              <CardDescription>
                Can't find what you're looking for? We're here to help.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <Search className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-slate-800 mb-1">Search NOV8</h4>
                  <p className="text-sm text-slate-600">
                    Use our search to find what you need
                  </p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-slate-800 mb-1">AI Assistant</h4>
                  <p className="text-sm text-slate-600">
                    Get help from our AI assistant
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
