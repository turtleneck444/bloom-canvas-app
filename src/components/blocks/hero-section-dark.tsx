import * as React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Brain, Presentation, Target, Network, PenTool, ArrowRight, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface PlatformImage {
  id: string;
  name: string;
  image: string;
  route: string;
  description: string;
  icon: React.ElementType;
}

const platformImages: PlatformImage[] = [
  { id: "mindmaps", name: "Mind Maps", image: "/lovable-uploads/75bf85d0-596f-468f-8091-e10622ee3114.png", route: "/mindmaps", description: "AI-powered mind mapping and visual brainstorming", icon: Brain },
  { id: "presentations", name: "Presentations", image: "/lovable-uploads/d84d024c-023c-4ff1-b531-a24099fee90b.png", route: "/presentations", description: "Professional presentation creation with AI design", icon: Presentation },
  { id: "strategy", name: "Strategy", image: "/lovable-uploads/7f36006b-3ffc-408a-bb5f-1cde6ac045a0.png", route: "/strategy", description: "AI-driven strategic planning and analysis", icon: Target },
  { id: "simulation", name: "Simulation", image: "/lovable-uploads/574dfb20-42a4-420a-8bce-5b5776846087.png", route: "/simulation", description: "Monte Carlo modeling and decision forecasting", icon: Network },
  { id: "whiteboard", name: "Whiteboard", image: "/lovable-uploads/91caf522-7af7-4207-8075-af4e91059f84.png", route: "/whiteboard", description: "Collaborative canvas for visual work", icon: PenTool },
];

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative min-h-screen bg-background overflow-hidden mib-grain", className)}
        {...props}
      >
        {/* Obsidian gradient field */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] rounded-full bg-[radial-gradient(ellipse,hsl(var(--nov8-primary)/0.18),transparent_60%)] blur-3xl animate-pulse-glow" />
          <div className="absolute top-[30%] -right-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,hsl(var(--nov8-secondary)/0.1),transparent_70%)] blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Hairline grid */}
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.025)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />

        {/* Top hairline */}
        <div className="absolute top-16 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--nov8-primary)/0.4)] to-transparent" />

        <section className="relative z-10 pt-32 sm:pt-36 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] font-medium text-muted-foreground tracking-wide">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--nov8-primary))] opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[hsl(var(--nov8-primary))]" />
                  </span>
                  <span className="label-mono !text-[10px] !text-foreground">NOV8 / V1.0</span>
                  <span className="text-border">|</span>
                  <span>Now in private beta</span>
                </div>
              </motion.div>

              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold text-foreground mb-6 tracking-[-0.04em] leading-[1.02]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Think faster.
                <br />
                <span className="nov8-gradient-text-vivid">Build smarter.</span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                The AI workspace for startup teams. Mind maps, presentations,
                strategy, simulations, and whiteboarding — unified.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link to="/book-demo">
                  <Button size="lg" className="px-8 h-12 text-sm font-medium glow-primary group">
                    Start free trial
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <Link to="/book-demo">
                  <Button variant="outline" size="lg" className="px-8 h-12 text-sm font-medium glass">
                    Book a demo
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                className="mt-14 flex flex-col items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border border-border bg-muted ring-2 ring-background flex items-center justify-center text-[10px] font-medium text-muted-foreground">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground tracking-wide">
                  Trusted by <span className="text-foreground font-semibold">2,400+</span> startup teams
                </p>
              </motion.div>
            </div>

            {/* Product Preview */}
            <motion.div
              className="relative max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Glow */}
              <div className="absolute -inset-6 bg-gradient-to-r from-[hsl(var(--nov8-primary)/0.15)] via-[hsl(var(--nov8-secondary)/0.1)] to-[hsl(var(--nov8-accent)/0.15)] rounded-3xl blur-2xl opacity-70" />

              {/* Frame */}
              <div className="relative glass-dark rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 h-9 border-b border-border/60 bg-[hsl(var(--background)/0.4)]">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[hsl(0_60%_45%)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[hsl(40_70%_50%)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[hsl(140_50%_45%)]" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="label-mono">app.nov8.ai</span>
                  </div>
                  <div className="w-12" />
                </div>

                <Tabs defaultValue="mindmaps" className="w-full">
                  <div className="border-b border-border px-4 sm:px-6 pt-3">
                    <TabsList className="w-full flex gap-0 bg-transparent p-0 h-auto">
                      {platformImages.map((p) => (
                        <TabsTrigger
                          key={p.id}
                          value={p.id}
                          className="flex-1 min-w-0 text-xs sm:text-sm font-medium px-3 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-[hsl(var(--nov8-primary))] data-[state=active]:text-foreground text-muted-foreground transition-all bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                          <p.icon className="w-3.5 h-3.5 mr-1.5 hidden sm:inline-block" />
                          <span className="truncate">{p.name}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>

                  {platformImages.map((p) => (
                    <TabsContent key={p.id} value={p.id} className="mt-0">
                      <div className="relative group">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 sm:p-8">
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
                              <p className="text-sm text-muted-foreground">{p.description}</p>
                            </div>
                            <Link to={p.route}>
                              <Button size="sm" className="glow-primary">
                                Open
                                <ArrowRight className="w-3.5 h-3.5 ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }
);

HeroSection.displayName = "HeroSection";
