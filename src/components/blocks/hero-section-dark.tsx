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
  {
    id: "mindmaps",
    name: "Mind Maps",
    image: "/lovable-uploads/75bf85d0-596f-468f-8091-e10622ee3114.png",
    route: "/mindmaps",
    description: "AI-powered mind mapping and visual brainstorming",
    icon: Brain,
  },
  {
    id: "presentations",
    name: "Presentations",
    image: "/lovable-uploads/d84d024c-023c-4ff1-b531-a24099fee90b.png",
    route: "/presentations",
    description: "Professional presentation creation with AI design",
    icon: Presentation,
  },
  {
    id: "strategy",
    name: "Strategy",
    image: "/lovable-uploads/7f36006b-3ffc-408a-bb5f-1cde6ac045a0.png",
    route: "/strategy",
    description: "AI-driven strategic planning and analysis",
    icon: Target,
  },
  {
    id: "simulation",
    name: "Simulation",
    image: "/lovable-uploads/574dfb20-42a4-420a-8bce-5b5776846087.png",
    route: "/simulation",
    description: "Monte Carlo modeling and decision forecasting",
    icon: Network,
  },
  {
    id: "whiteboard",
    name: "Whiteboard",
    image: "/lovable-uploads/91caf522-7af7-4207-8075-af4e91059f84.png",
    route: "/whiteboard",
    description: "Collaborative canvas for visual work",
    icon: PenTool,
  },
];

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative min-h-screen bg-background overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,hsl(220_80%_60%/0.08),transparent_70%)] animate-pulse-glow" />
          <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,hsl(250_70%_65%/0.06),transparent_70%)] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-[-10%] left-[30%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,hsl(200_70%_55%/0.05),transparent_70%)] animate-pulse-glow" style={{ animationDelay: '3s' }} />
        </div>

        {/* Subtle dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--foreground)/0.03)_1px,transparent_0)] bg-[length:24px_24px]" />

        <section className="relative z-10 pt-32 sm:pt-36 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Copy */}
            <div className="text-center max-w-4xl mx-auto mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm text-xs font-medium text-muted-foreground">
                  <Sparkles className="w-3 h-3 text-[hsl(var(--nov8-accent))]" />
                  Now in Beta — 5 AI-powered tools
                </div>
              </motion.div>

              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold text-foreground mb-6 tracking-[-0.03em] leading-[1.05]"
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
                strategy analysis, simulations, and whiteboarding — unified.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link to="/book-demo">
                  <Button size="lg" className="px-8 h-12 text-base font-medium glow-primary">
                    Start free trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/book-demo">
                  <Button variant="outline" size="lg" className="px-8 h-12 text-base font-medium">
                    Book a demo
                  </Button>
                </Link>
              </motion.div>

              {/* Social proof */}
              <motion.div
                className="mt-12 flex flex-col items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Trusted by <span className="text-foreground font-medium">2,400+</span> startup teams
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
              {/* Glow behind the card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[hsl(220_80%_60%/0.1)] via-[hsl(250_70%_65%/0.08)] to-[hsl(200_70%_55%/0.1)] rounded-3xl blur-2xl" />

              <div className="relative bg-card rounded-2xl border border-border/80 shadow-2xl shadow-black/5 dark:shadow-black/30 overflow-hidden">
                <Tabs defaultValue="mindmaps" className="w-full">
                  <div className="border-b border-border px-4 sm:px-6 pt-4 pb-0">
                    <TabsList className="w-full flex gap-0 bg-transparent p-0 h-auto">
                      {platformImages.map((p) => (
                        <TabsTrigger
                          key={p.id}
                          value={p.id}
                          className="flex-1 min-w-0 text-xs sm:text-sm font-medium px-3 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground text-muted-foreground transition-all bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
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
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 sm:p-8">
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
