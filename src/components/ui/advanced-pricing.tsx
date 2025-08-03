import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Star, Shield, Users, Crown, Sparkles, ArrowRight, Building2, Briefcase, Globe, Zap, Lock, Target, BarChart3, Settings, Database, Cpu, Network, Key, Monitor, Server, Cloud, Activity, ShieldCheck, Zap as Lightning, Clock, TrendingUp, Award, Zap as Bolt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PricingTier {
  id: string;
  name: string;
  tagline?: string;
  price?: number;
  period?: string;
  customPrice?: string;
  description: string;
  features: Array<{
    name: string;
    included: boolean;
    description?: string;
    icon?: React.ElementType;
    category?: string;
  }>;
  highlighted?: boolean;
  icon: React.ElementType;
  buttonText: string;
  buttonVariant: 'default' | 'secondary' | 'outline';
  gradient: string;
  iconColor: string;
  badge?: {
    text: string;
    color: string;
  };
  savings?: string;
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'Complete Tool Access',
    price: 19,
    period: 'month',
    description: 'Full access to all NOV8 tools with professional features for individuals and small teams.',
    features: [
      { name: 'AI-Powered Mind Mapping', included: true, description: 'Advanced node generation & intelligent layouts', icon: Target, category: 'Core Tools' },
      { name: 'Professional Presentations', included: true, description: 'Enterprise-grade templates & design tools', icon: Crown, category: 'Core Tools' },
      { name: 'Strategy Co-Pilot', included: true, description: 'Advanced frameworks & predictive analysis', icon: BarChart3, category: 'Core Tools' },
      { name: 'Meeting Intelligence', included: true, description: 'AI transcription & real-time collaboration', icon: Users, category: 'Core Tools' },
      { name: 'AI Simulation', included: true, description: 'Scenario modeling & decision forecasting', icon: Cpu, category: 'Core Tools' },
      { name: 'Digital Whiteboard', included: true, description: 'Real-time collaboration & drawing tools', icon: Monitor, category: 'Core Tools' },
      { name: 'Secure Cloud Storage', included: true, description: '25GB enterprise-grade storage', icon: Cloud, category: 'Infrastructure' },
      { name: 'Advanced Export Options', included: true, description: 'PDF, PPTX, PNG, SVG formats', icon: Zap, category: 'Core Tools' },
      { name: 'Email Support', included: true, description: 'Professional support during business hours', icon: Shield, category: 'Support' },
      { name: 'Team Collaboration', included: false, category: 'Enterprise' },
      { name: 'Advanced Analytics', included: false, category: 'Enterprise' },
      { name: 'API Access', included: false, category: 'Enterprise' },
      { name: 'White-label Solution', included: false, category: 'Enterprise' },
      { name: 'Dedicated Support', included: false, category: 'Enterprise' }
    ],
    icon: Briefcase,
    buttonText: 'Start Free Trial',
    buttonVariant: 'outline',
    gradient: 'from-slate-50 to-slate-100',
    iconColor: 'text-slate-700',
    savings: 'Save $240/year'
  },
  {
    id: 'team',
    name: 'Team',
    tagline: 'Collaborative Excellence',
    price: 49,
    period: 'month',
    description: 'Enhanced collaboration features for growing teams with all NOV8 tools included.',
    features: [
      { name: 'Everything in Professional', included: true, category: 'Core Tools' },
      { name: 'Advanced Team Collaboration', included: true, description: 'Unlimited team members & real-time co-editing', icon: Users, category: 'Collaboration' },
      { name: 'Team Analytics', included: true, description: 'Usage insights & team performance reports', icon: BarChart3, category: 'Analytics' },
      { name: 'Priority Support', included: true, description: '24/7 email & chat support', icon: Shield, category: 'Support' },
      { name: 'Custom Templates', included: true, description: 'Team-specific templates & branding', icon: Crown, category: 'Branding' },
      { name: 'Advanced Security', included: true, description: 'SSO, 2FA, audit logs', icon: ShieldCheck, category: 'Security' },
      { name: 'Unlimited Storage', included: true, description: '100GB per user storage', icon: Cloud, category: 'Infrastructure' },
      { name: 'Custom Workflows', included: true, description: 'Basic automation & process optimization', icon: Settings, category: 'Automation' },
      { name: 'API Access', included: false, category: 'Enterprise' },
      { name: 'White-label Solution', included: false, category: 'Enterprise' },
      { name: 'Dedicated Account Manager', included: false, category: 'Enterprise' },
      { name: 'SLA Guarantee', included: false, category: 'Enterprise' }
    ],
    highlighted: true,
    popular: true,
    icon: Users,
    buttonText: 'Start Team Trial',
    buttonVariant: 'default',
    gradient: 'from-blue-50 via-slate-50 to-blue-100',
    iconColor: 'text-blue-700',
    badge: {
      text: 'Most Popular',
      color: 'bg-gradient-to-r from-blue-700 to-slate-800'
    },
    savings: 'Save $588/year'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Full-Scale Solution',
    price: 99,
    period: 'month',
    description: 'Complete enterprise solution with white-label capabilities and dedicated support.',
    features: [
      { name: 'Everything in Team', included: true, category: 'Core Tools' },
      { name: 'White-label Solution', included: true, description: 'Custom branding & domain deployment', icon: Crown, category: 'Branding' },
      { name: 'API Access & Webhooks', included: true, description: 'Full REST API with custom integrations', icon: Zap, category: 'Integration' },
      { name: 'Enterprise Analytics', included: true, description: 'Advanced insights, reporting & dashboards', icon: Activity, category: 'Analytics' },
      { name: 'Dedicated Account Manager', included: true, description: 'Personal support & strategic guidance', icon: Settings, category: 'Support' },
      { name: 'SLA Guarantee', included: true, description: '99.9% uptime with performance guarantees', category: 'Infrastructure' },
      { name: 'Advanced Security', included: true, description: 'SOC 2, GDPR, HIPAA compliance', icon: Shield, category: 'Security' },
      { name: 'Custom AI Training', included: true, description: 'Train models on your proprietary data', icon: Cpu, category: 'AI' },
      { name: 'On-premise Deployment', included: true, description: 'Self-hosted option for maximum control', category: 'Infrastructure' },
      { name: 'Global Deployment', included: true, description: 'Multi-region deployment with local compliance', category: 'Infrastructure' },
      { name: 'Executive Dashboard', included: true, description: 'C-level reporting & strategic insights', category: 'Analytics' },
      { name: '24/7 Premium Support', included: true, description: 'Round-the-clock dedicated support team', category: 'Support' }
    ],
    icon: Building2,
    buttonText: 'Contact Enterprise Sales',
    buttonVariant: 'secondary',
    gradient: 'from-slate-50 to-slate-200',
    iconColor: 'text-slate-800',
    savings: 'Save $1,188/year'
  }
];

const AdvancedPricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  const getPrice = (tier: PricingTier) => {
    if (tier.customPrice) return tier.customPrice;
    if (!tier.price) return '';
    return billingPeriod === 'yearly' ? Math.floor(tier.price * 0.83) : tier.price;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Core Tools': 'text-blue-600',
      'Collaboration': 'text-green-600',
      'Analytics': 'text-purple-600',
      'Integration': 'text-orange-600',
      'Branding': 'text-pink-600',
      'Security': 'text-red-600',
      'Support': 'text-cyan-600',
      'Infrastructure': 'text-yellow-600',
      'Automation': 'text-indigo-600',
      'AI': 'text-emerald-600',
      'Enterprise': 'text-slate-600'
    };
    return colors[category as keyof typeof colors] || 'text-slate-600';
  };

  // Get only the most important features for display
  const getDisplayFeatures = (features: any[], maxFeatures: number = 8) => {
    const includedFeatures = features.filter(f => f.included).slice(0, maxFeatures);
    const excludedFeatures = features.filter(f => !f.included).slice(0, 2);
    return [...includedFeatures, ...excludedFeatures];
  };

  return (
    <section className="relative py-16 lg:py-20 bg-white overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-slate-50 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50 border border-blue-200 mb-6"
          >
            <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-blue-700 tracking-wide uppercase">Enterprise Solutions</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            Advanced Enterprise Pricing
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Access all NOV8 tools with affordable pricing designed for scale. 
            Start with complete tool access and upgrade as your organization grows.
          </motion.p>

          {/* Social Proof & Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center items-center gap-8 mb-8"
          >
            <div className="flex items-center space-x-2 text-slate-600">
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">10,000+ Teams Trust NOV8</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">99.9% Uptime</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <Clock className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium">30-Day Free Trial</span>
            </div>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-flex items-center bg-slate-100 rounded-full p-1 border border-slate-200"
          >
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={cn(
                'px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300',
                billingPeriod === 'monthly'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={cn(
                'px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 relative',
                billingPeriod === 'yearly'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              Yearly
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 border border-green-400">
                Save 17%
              </Badge>
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onHoverStart={() => setHoveredTier(tier.id)}
              onHoverEnd={() => setHoveredTier(null)}
              className={cn(
                'relative bg-white rounded-2xl p-8 shadow-xl border transition-all duration-500',
                tier.highlighted
                  ? 'border-blue-300 shadow-2xl shadow-blue-500/10 scale-105'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-2xl'
              )}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className={cn('px-6 py-2 rounded-full text-white text-sm font-bold shadow-lg', tier.badge.color)}>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4" />
                      <span>{tier.badge.text}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                <div className={cn('w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg', tier.gradient)}>
                  <tier.icon className={cn('w-8 h-8', tier.iconColor)} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{tier.name}</h3>
                {tier.tagline && (
                  <p className="text-sm text-blue-600 mb-4 font-medium tracking-wide uppercase">{tier.tagline}</p>
                )}

                <div className="flex items-baseline justify-center mb-3">
                  {tier.customPrice ? (
                    <span className="text-2xl font-bold text-slate-900">{tier.customPrice}</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-slate-900">${getPrice(tier)}</span>
                      <span className="text-lg text-slate-600 ml-2">/{tier.period}</span>
                    </>
                  )}
                </div>

                {tier.savings && billingPeriod === 'yearly' && (
                  <div className="text-green-600 text-sm font-medium mb-3">
                    {tier.savings}
                  </div>
                )}

                <p className="text-slate-600 text-sm leading-relaxed">{tier.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {getDisplayFeatures(tier.features).map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: featureIndex * 0.03 }}
                    className="flex items-start space-x-3"
                  >
                    {feature.included ? (
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        {feature.icon && <feature.icon className="w-3 h-3 text-blue-600" />}
                        <span className={cn('text-sm font-medium', feature.included ? 'text-slate-700' : 'text-slate-500')}>
                          {feature.name}
                        </span>
                        {feature.category && (
                          <span className={cn('text-xs px-2 py-0.5 rounded-full bg-slate-100', getCategoryColor(feature.category))}>
                            {feature.category}
                          </span>
                        )}
                      </div>
                      {feature.description && (
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{feature.description}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                variant={tier.buttonVariant}
                className={cn(
                  'w-full py-3 text-sm font-semibold transition-all duration-300 rounded-xl',
                  tier.highlighted
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 hover:border-slate-400'
                )}
              >
                {tier.buttonText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              {/* Hover Effect */}
              <AnimatePresence>
                {hoveredTier === tier.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-blue-50/30 rounded-2xl pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl p-8 max-w-4xl mx-auto border border-blue-200">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Bolt className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-slate-900">
                Start Your Free Trial Today
              </h3>
              <Bolt className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto text-base leading-relaxed">
              Join 10,000+ teams already using NOV8 to transform their workflow. 
              No credit card required • Cancel anytime • 30-day free trial
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-slate-500 text-sm">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>No Setup Fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { AdvancedPricing };