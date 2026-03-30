import * as React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Brain, Presentation, Target, Network, PenTool, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
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
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--border))_1px,transparent_0)] bg-[length:32px_32px] opacity-40" />

        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,hsl(var(--nov8-primary)/0.06),transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,hsl(var(--nov8-secondary)/0.04),transparent_70%)]" />

        <section className="relative z-10 pt-28 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Copy */}
            <div className="text-center max-w-4xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge
                  variant="outline"
                  className="mb-6 px-3 py-1 text-xs font-medium border-border text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 bg-[hsl(var(--nov8-accent))] rounded-full mr-2 inline-block" />
                  Now in Beta — 5 AI-powered tools
                </Badge>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Think faster.{" "}
                <span className="nov8-gradient-text">Build smarter.</span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                NOV8 is the AI workspace for startup teams. Mind maps, presentations, 
                strategy analysis, simulations, and whiteboarding — all in one place.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link to="/book-demo">
                  <Button size="lg" className="px-8 text-base">
                    Start free trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/book-demo">
                  <Button variant="outline" size="lg" className="px-8 text-base">
                    Book a demo
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Product Preview */}
            <motion.div
              className="relative max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-card rounded-2xl border border-border shadow-lg p-4 sm:p-6">
                <Tabs defaultValue="mindmaps" className="w-full">
                  <TabsList className="w-full flex flex-wrap gap-1.5 bg-muted/50 p-1.5 rounded-xl mb-6">
                    {platformImages.map((p) => (
                      <TabsTrigger
                        key={p.id}
                        value={p.id}
                        className="flex-1 min-w-0 text-xs sm:text-sm font-medium rounded-lg px-3 py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-foreground text-muted-foreground transition-all"
                      >
                        <p.icon className="w-3.5 h-3.5 mr-1.5 hidden sm:inline-block" />
                        <span className="truncate">{p.name}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {platformImages.map((p) => (
                    <TabsContent key={p.id} value={p.id}>
                      <div className="relative group rounded-xl overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-auto rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
                              <p className="text-sm text-muted-foreground">{p.description}</p>
                            </div>
                            <Link to={p.route}>
                              <Button size="sm" variant="secondary">
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
