"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { 
  LucideIcon,
  Map,
  Presentation,
  Video,
  Brain,
  Cpu,
  PenTool,
  FileText,
  HelpCircle,
  MessageCircle,
  Settings,
  Lock,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Mail,
  Shield,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
  Globe,
  ChevronRight
} from "lucide-react";

interface SocialLink {
  name: string;
  href: string;
}

interface FooterLink {
  name: string;
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  href?: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  brand: {
    name: string;
    description: string;
  };
  socialLinks: SocialLink[];
  columns: FooterColumn[];
  copyright?: string;
}

export const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
  ({ className, brand, socialLinks, columns, copyright, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("bg-black text-white", className)}
        {...props}
      >
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <a href="/" className="flex items-center space-x-3 mb-4 hover:opacity-80 transition-opacity">
                <img 
                  src="/nov8white.png"
                  alt="NOV8 Logo" 
                  className="h-8 w-auto"
                />
              </a>
              
              <p className="text-white/90 text-sm mb-4">
                {brand.description}
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4 mb-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-white hover:text-white/80 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name === "Twitter" && <Twitter className="w-5 h-5" />}
                    {link.name === "LinkedIn" && <Linkedin className="w-5 h-5" />}
                    {link.name === "GitHub" && <Github className="w-5 h-5" />}
                    {link.name === "YouTube" && <Youtube className="w-5 h-5" />}
                    {link.name === "Instagram" && <Instagram className="w-5 h-5" />}
                  </a>
                ))}
              </div>
            </div>

            {/* Links Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:col-span-8 gap-6">
              {columns.map(({ title, links }) => (
                <div key={title}>
                  <h3 className="text-white font-semibold mb-3 text-sm">{title}</h3>
                  <ul className="space-y-2">
                    {links.map(({ name, Icon, href }) => (
                      <li key={name}>
                                                  <a
                            href={href || "#"}
                            className="text-white/80 hover:text-white/95 group flex items-center space-x-2 transition-all duration-200 text-xs"
                          >
                            <Icon className="w-3 h-3 transition-all stroke-white/80 group-hover:stroke-white/95" />
                            <span>{name}</span>
                          </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          {copyright && (
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                <p className="text-white/80 text-xs">{copyright}</p>
                <div className="flex space-x-6 text-xs text-white/70">
                  <a href="/privacy" className="hover:text-white/90 transition-colors">Privacy</a>
                  <a href="/terms" className="hover:text-white/90 transition-colors">Terms</a>
                  <a href="/security" className="hover:text-white/90 transition-colors">Security</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Footer.displayName = "Footer";