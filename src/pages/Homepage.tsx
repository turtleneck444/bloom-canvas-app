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
  Sparkles,
  FileText,
  HelpCircle,
  Mail,
  Lock,
  BarChart3,
  Layers,
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
    accent: '195 100% 60%',
  },
  {
    name: 'Presentations',
    description: 'Professional slide creation with AI design assistance, smart layouts, and one-click export.',
    icon: Presentation,
    route: '/presentations',
    accent: '215 95% 65%',
  },
  {
    name: 'Strategy Co-Pilot',
    description: 'SWOT analysis, Porter\'s Five Forces, risk assessment, and AI-generated strategic plans.',
    icon: Target,
    route: '/strategy',
    accent: '175 80% 50%',
  },
  {
    name: 'AI Simulation',
    description: 'Monte Carlo modeling, sensitivity analysis, risk heatmaps, and decision forecasting.',
    icon: Network,
    route: '/simulation',
    accent: '250 90% 70%',
  },
  {
    name: 'Whiteboard',
    description: 'Collaborative canvas with drawing tools, shape libraries, and freeform visual thinking.',
    icon: PenTool,
    route: '/whiteboard',
    accent: '230 90% 70%',
  },
];

const features = [
  {
    icon: Sparkles,
    title: 'AI-First Workflow',
    description: 'Every tool is powered by intelligent AI that adapts to your thinking style and accelerates your work.',
  },
  {
    icon: Layers,
    title: 'Unified Workspace',
    description: 'Switch seamlessly between mind maps, slides, strategy docs, and simulations without losing context.',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant infrastructure with end-to-end encryption and granular access controls.',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Track team productivity, project progress, and AI usage across your entire workspace.',
  },
];

const logos = ['YC', 'Stripe', 'Linear', 'Vercel', 'Notion'];

const Homepage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      {/* Logo Cloud */}
      <section className="py-16 border-t border-border relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--nov8-primary)/0.4)] to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center label-mono mb-8">
            ─ Trusted by teams at ─
          </p>
          <div className="flex items-center justify-center gap-x-12 gap-y-6 flex-wrap opacity-50">
            {logos.map((name) => (
              <span key={name} className="text-lg font-bold text-foreground tracking-tight grayscale hover:grayscale-0 transition-all">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Services Grid */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              className="label-mono mb-4"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              ─ The Suite
            </motion.div>
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-[-0.03em]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Five tools. <span className="text-muted-foreground">One workspace.</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg max-w-xl mx-auto"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Everything your team needs to think, plan, and build — powered by AI.
            </motion.p>
          </div>

          {/* Bento layout: 3 top, 2 bottom centered */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {services.slice(0, 3).map((s, i) => (
                <ServiceCard key={s.name} service={s} index={i} />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[calc(66.666%+0.5rem)] mx-auto">
              {services.slice(3).map((s, i) => (
                <ServiceCard key={s.name} service={s} index={i + 3} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-[-0.02em]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Built for speed. Designed for scale.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AdvancedPricing />

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(220_80%_60%/0.06),transparent_70%)]" />
        <div className="container mx-auto px-4 text-center max-w-2xl relative z-10">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-[-0.02em]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to move faster?
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join thousands of startup teams using NOV8 to think, plan, and ship.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link to="/book-demo">
              <Button size="lg" className="px-8 h-12 glow-primary">
                Start free trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/book-demo">
              <Button variant="outline" size="lg" className="px-8 h-12">
                Book a demo
              </Button>
            </Link>
          </motion.div>
          <p className="text-xs text-muted-foreground mt-6">
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

/* ── Service Card Component ── */
interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service: s, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.06 }}
    viewport={{ once: true }}
  >
    <Link to={s.route}>
      <div className="bento-card group h-full">
        {/* Accent line */}
        <div
          className="absolute top-0 left-6 right-6 h-px"
          style={{ background: `linear-gradient(90deg, transparent, hsl(${s.accent}), transparent)`, opacity: 0.4 }}
        />

        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors"
          style={{ background: `hsl(${s.accent} / 0.1)` }}
        >
          <s.icon className="w-5 h-5" style={{ color: `hsl(${s.accent})` }} />
        </div>
        <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-foreground/90 transition-colors">
          {s.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>

        <div className="mt-4 flex items-center text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          Open tool
          <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  </motion.div>
);

export default Homepage;
