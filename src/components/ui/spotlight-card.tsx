"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowIntensity?: number;
  borderColor?: string;
  background?: string;
}

interface NOV8GlowCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features?: string[];
  quote?: string;
  author?: string;
  authorTitle?: string;
  ctaText?: string;
  ctaLink?: string;
  colorClass?: string;
  className?: string;
}

const GlowCard = React.forwardRef<HTMLDivElement, GlowCardProps>(
  (
    {
      children,
      className,
      glowColor = "rgba(59, 130, 246, 0.3)",
      glowIntensity = 0.5,
      borderColor = "rgba(59, 130, 246, 0.2)",
      background = "rgba(255, 255, 255, 0.05)",
      ...props
    },
    ref
  ) => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative group/card rounded-xl border border-transparent transition-all duration-300 hover:scale-105",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <div
          className="absolute inset-0 rounded-xl border border-transparent transition-all duration-300"
          style={{
            background: isHovered 
              ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${borderColor}, transparent 40%)`
              : 'transparent',
          }}
        />
        <div className="relative z-10 h-full w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
          {children}
        </div>
      </div>
    );
  }
);

const NOV8GlowCard: React.FC<NOV8GlowCardProps> = ({
  title,
  description,
  icon,
  features,
  quote,
  author,
  authorTitle,
  ctaText,
  ctaLink,
  colorClass = "from-blue-500 to-cyan-500",
  className,
}) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const getBorderColor = () => {
    if (colorClass.includes("blue")) return "rgba(59, 130, 246, 0.4)";
    if (colorClass.includes("purple")) return "rgba(147, 51, 234, 0.4)";
    if (colorClass.includes("green")) return "rgba(34, 197, 94, 0.4)";
    if (colorClass.includes("orange")) return "rgba(249, 115, 22, 0.4)";
    if (colorClass.includes("indigo")) return "rgba(99, 102, 241, 0.4)";
    if (colorClass.includes("cyan")) return "rgba(6, 182, 212, 0.4)";
    return "rgba(59, 130, 246, 0.4)";
  };

  return (
    <div
      className={cn(
        "relative group/card rounded-xl border border-transparent transition-all duration-300 hover:scale-105 h-full bg-white/5 backdrop-blur-sm",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 rounded-xl border border-transparent transition-all duration-300"
        style={{
          background: isHovered 
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${getBorderColor()}, transparent 40%)`
            : 'transparent',
        }}
      />
      <div className="relative z-10 h-full w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
        <div className="flex flex-col h-full">
          {/* Icon and Title */}
          <div className="flex items-center mb-6">
            <div className={`w-16 h-16 bg-gradient-to-br ${colorClass} rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
              {icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
              {description && <p className="text-gray-300 text-sm">{description}</p>}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {quote ? (
              <blockquote className="text-gray-300 italic text-lg leading-relaxed mb-6">
                "{quote}"
              </blockquote>
            ) : (
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                {description}
              </p>
            )}

            {/* Features or Author */}
            {features ? (
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            ) : author ? (
              <div className="mb-4">
                <p className="font-semibold text-white text-lg">{author}</p>
                <p className="text-sm text-gray-400">{authorTitle}</p>
              </div>
            ) : null}
          </div>

          {/* CTA */}
          {ctaText && (
            <div className="mt-6">
              <button className="text-white hover:text-gray-300 font-semibold transition-colors">
                {ctaText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

GlowCard.displayName = "GlowCard";

export { GlowCard, NOV8GlowCard }; 