"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  LucideIcon,
  Twitter,
  Linkedin,
  Github,
  Youtube,
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
  brand: { name: string; description: string };
  socialLinks: SocialLink[];
  columns: FooterColumn[];
  copyright?: string;
}

const socialIcons: Record<string, React.ElementType> = {
  Twitter,
  LinkedIn: Linkedin,
  GitHub: Github,
  YouTube: Youtube,
};

export const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
  ({ className, brand, socialLinks, columns, copyright, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn("relative bg-card border-t border-border", className)}
        {...props}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--nov8-primary)/0.4)] to-transparent" />
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Brand */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
                <img
                  src="/nov8black.png"
                  alt="NOV8"
                  className="h-7 w-auto dark:hidden"
                />
                <img
                  src="/nov8white.png"
                  alt="NOV8"
                  className="h-7 w-auto hidden dark:block"
                />
              </Link>
              <p className="text-sm text-muted-foreground mb-5 max-w-xs">
                {brand.description}
              </p>
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = socialIcons[link.name];
                  if (!Icon) return null;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:col-span-8 gap-8">
              {columns.map(({ title, links }) => (
                <div key={title}>
                  <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                    {title}
                  </h3>
                  <ul className="space-y-2">
                    {links.map(({ name, href }) => (
                      <li key={name}>
                        <Link
                          to={href || "#"}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {copyright && (
            <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-2">
              <p className="text-xs text-muted-foreground">{copyright}</p>
              <div className="flex gap-6 text-xs text-muted-foreground">
                <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
                <Link to="/security" className="hover:text-foreground transition-colors">Security</Link>
              </div>
            </div>
          )}
        </div>
      </footer>
    );
  }
);

Footer.displayName = "Footer";
