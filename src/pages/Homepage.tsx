import React, { useState } from 'react';
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
import { Footer } from '@/components/blocks/footer';

const Homepage: React.FC = () => {
  console.log("Homepage component rendering");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Simple Test Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            NOV8 Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Welcome to NOV8 - Your AI-powered collaboration platform
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/mindmaps">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Mind Maps
              </Button>
            </Link>
            <Link to="/presentations">
              <Button className="bg-green-600 hover:bg-green-700">
                Presentations
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <Footer
        className="bg-black text-white"
        brand={{
          name: "NOV8",
          description: "The complete toolkit for modern teams to create, collaborate, and innovate."
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
          }
        ]}
        copyright="© 2024 NOV8. All rights reserved."
      />
    </div>
  );
};

export default Homepage;