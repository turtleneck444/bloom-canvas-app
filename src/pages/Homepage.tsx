import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Brain,
  Presentation,
  Target,
  Network,
  PenTool,
  Shield,
  Zap,
  Users,
  Globe,
  Sparkles,
  FileText,
  HelpCircle,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/blocks/hero-section-dark';
import AdvancedPricing from '@/components/ui/advanced-pricing';
import { Footer } from '@/components/blocks/footer';

const services = [
  {
    name: 'Mind Maps',
    description: 'AI-powered brainstorming with intelligent node generation, multiple layouts, and real-time idea exploration.',
    icon: Brain,
    route: '/mindmaps',
  },
  {
    name: 'Presentations',
    description: 'Professional slide creation with AI design assistance, smart layouts, and one-click export.',
    icon: Presentation,
    route: '/presentations',
  },
  {
    name: 'Strategy Co-Pilot',
    description: 'SWOT analysis, Porter\'s Five Forces, risk assessment, and AI-generated strategic plans.',
    icon: Target,
    route: '/strategy',
  },
  {
    name: 'AI Simulation',
    description: 'Monte Carlo modeling, sensitivity analysis, risk heatmaps, and decision forecasting.',
    icon: Network,
    route: '/simulation',
  },
  {
    name: 'Whiteboard',
    description: 'Collaborative canvas with drawing tools, shape libraries, and freeform visual thinking.',
    icon: PenTool,
    route: '/whiteboard',
  },
];

const Homepage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Five tools. One workspace.
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Everything your team needs to think, plan, and build — powered by AI.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {services.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Link to={s.route}>
                  <div className="group p-5 rounded-xl border border-border bg-card hover:border-foreground/10 hover:shadow-sm transition-all duration-200 h-full">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-muted/80 transition-colors">
                      <s.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-1.5">{s.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AdvancedPricing />

      {/* CTA */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Ready to move faster?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of startup teams using NOV8 to think, plan, and ship.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/book-demo">
              <Button size="lg" className="px-8">
                Start free trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/book-demo">
              <Button variant="outline" size="lg" className="px-8">
                Book a demo
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            No credit card required · Free 14-day trial · Cancel anytime
          </p>
        </div>
      </section>

      <Footer
        brand={{
          name: "NOV8",
          description: "The AI workspace for startup teams. Think, plan, and build — faster."
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
              { name: "Mind Maps", Icon: Brain, href: "/mindmaps" },
              { name: "Presentations", Icon: Presentation, href: "/presentations" },
              { name: "Strategy Co-Pilot", Icon: Target, href: "/strategy" },
              { name: "AI Simulation", Icon: Network, href: "/simulation" },
              { name: "Whiteboard", Icon: PenTool, href: "/whiteboard" },
            ]
          },
          {
            title: "Resources",
            links: [
              { name: "Documentation", Icon: FileText, href: "/mindmaps/docs" },
              { name: "Security", Icon: Shield, href: "/security" },
            ]
          },
          {
            title: "Company",
            links: [
              { name: "About", Icon: Users, href: "/about" },
              { name: "Contact", Icon: Mail, href: "/book-demo" },
            ]
          },
          {
            title: "Support",
            links: [
              { name: "Help Center", Icon: HelpCircle, href: "/book-demo" },
              { name: "Status", Icon: Zap, href: "#" },
            ]
          }
        ]}
        copyright="© 2025 NOV8. All rights reserved."
      />
    </div>
  );
};

export default Homepage;
