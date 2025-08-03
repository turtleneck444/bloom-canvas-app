import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Star, Zap, Shield, Users, Crown, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PricingTier {
  id: string;
  name: string;
  tagline?: string;
  price: number;
  period: string;
  originalPrice?: number;
  description: string;
  features: Array<{
    name: string;
    included: boolean;
    description?: string;
  }>;
  limitations?: string[];
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
}

const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Perfect for individuals',
    price: 10,
    period: 'month',
    description: 'Essential AI-powered tools to get started with intelligent collaboration.',
    features: [
      { name: 'AI Model Access', included: true, description: 'GPT-4 integration' },
      { name: 'Mind Map Tool', included: true, description: 'Smart node generation' },
      { name: 'Presentation Builder', included: true, description: '20+ templates' },
      { name: 'Strategy Co-Pilot', included: true, description: 'Basic frameworks' },
      { name: 'Meeting Assistant', included: true, description: 'Up to 5 participants' },
      { name: 'Export Documents', included: true, description: 'PDF & PPTX' },
      { name: 'Cloud Storage', included: false },
      { name: 'Team Collaboration', included: false },
      { name: 'Advanced Analytics', included: false },
      { name: 'API Access', included: false }
    ],
    icon: Zap,
    buttonText: 'Start Free Trial',
    buttonVariant: 'outline',
    gradient: 'from-blue-50 to-cyan-50',
    iconColor: 'text-blue-600'
  },
  {
    id: 'pro',
    name: 'Pro Creator',
    tagline: 'For growing teams',
    price: 29,
    period: 'month',
    originalPrice: 49,
    description: 'Advanced collaboration features with unlimited access to all tools.',
    features: [
      { name: 'Everything in Starter', included: true },
      { name: 'Unlimited Cloud Storage', included: true, description: '100GB included' },
      { name: 'Priority AI Processing', included: true, description: '3x faster responses' },
      { name: 'Advanced Team Collaboration', included: true, description: 'Up to 25 members' },
      { name: 'Real-time Co-editing', included: true },
      { name: 'Custom Templates', included: true, description: '100+ premium templates' },
      { name: 'API Access', included: true, description: 'Full REST API' },
      { name: 'Analytics Dashboard', included: true },
      { name: 'Priority Support', included: true },
      { name: 'White-label Options', included: false }
    ],
    highlighted: true,
    icon: Crown,
    buttonText: 'Start Pro Trial',
    buttonVariant: 'default',
    gradient: 'from-purple-50 via-blue-50 to-cyan-50',
    iconColor: 'text-purple-600',
    badge: {
      text: 'Most Popular',
      color: 'bg-gradient-to-r from-purple-600 to-blue-600'
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For large organizations',
    price: 99,
    period: 'month',
    description: 'Enterprise-grade security, custom workflows, and dedicated support.',
    features: [
      { name: 'Everything in Pro', included: true },
      { name: 'Unlimited Team Members', included: true },
      { name: 'Custom AI Training', included: true, description: 'Train on your data' },
      { name: 'Advanced Security Controls', included: true, description: 'SSO, 2FA, audit logs' },
      { name: 'Custom Workflows', included: true, description: 'Workflow automation' },
      { name: 'Dedicated Account Manager', included: true },
      { name: 'SLA Guarantee', included: true, description: '99.9% uptime' },
      { name: 'White-label Solution', included: true },
      { name: 'On-premise Deployment', included: true },
      { name: 'Custom Integrations', included: true }
    ],
    icon: Shield,
    buttonText: 'Contact Sales',
    buttonVariant: 'secondary',
    gradient: 'from-emerald-50 to-teal-50',
    iconColor: 'text-emerald-600'
  }
];

const AdvancedPricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  const getPrice = (tier: PricingTier) => {
    return billingPeriod === 'yearly' ? Math.floor(tier.price * 0.83) : tier.price;
  };

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-200/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-200/50 mb-6"
          >
            <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-gray-800">Pricing Plans</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Simple, transparent{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              pricing
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Choose the perfect plan for your team. Start with our affordable starter plan and scale as you grow.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center bg-gray-100 rounded-full p-1"
          >
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={cn(
                'px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300',
                billingPeriod === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={cn(
                'px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 relative',
                billingPeriod === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              Yearly
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1">
                Save 20%
              </Badge>
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredTier(tier.id)}
              onHoverEnd={() => setHoveredTier(null)}
              className={cn(
                'relative bg-white rounded-3xl p-8 shadow-xl border-2 transition-all duration-500',
                tier.highlighted
                  ? 'border-purple-200 shadow-2xl shadow-purple-500/10 scale-105'
                  : 'border-gray-200 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-500/5'
              )}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className={cn('px-6 py-2 rounded-full text-white text-sm font-bold', tier.badge.color)}>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4" />
                      <span>{tier.badge.text}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <div className={cn('w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br flex items-center justify-center', tier.gradient)}>
                  <tier.icon className={cn('w-8 h-8', tier.iconColor)} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                {tier.tagline && (
                  <p className="text-sm text-gray-600 mb-4">{tier.tagline}</p>
                )}

                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold text-gray-900">${getPrice(tier)}</span>
                  <span className="text-lg text-gray-600 ml-2">/{tier.period}</span>
                </div>

                {tier.originalPrice && billingPeriod === 'monthly' && (
                  <div className="text-sm text-gray-500">
                    <span className="line-through">${tier.originalPrice}</span>
                    <span className="text-green-600 ml-2 font-semibold">Save ${tier.originalPrice - tier.price}</span>
                  </div>
                )}

                <p className="text-gray-600 mt-4">{tier.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: featureIndex * 0.05 }}
                    className="flex items-start space-x-3"
                  >
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <span className={cn('text-sm', feature.included ? 'text-gray-700' : 'text-gray-400')}>
                        {feature.name}
                      </span>
                      {feature.description && (
                        <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                variant={tier.buttonVariant}
                className={cn(
                  'w-full py-3 text-lg font-semibold transition-all duration-300',
                  tier.highlighted
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
                    : ''
                )}
              >
                {tier.buttonText}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              {/* Hover Effect */}
              <AnimatePresence>
                {hoveredTier === tier.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-3xl pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a custom solution?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We offer custom enterprise solutions with dedicated support, custom integrations, and tailored workflows for large organizations.
            </p>
            <Button variant="outline" className="px-8 py-3">
              Contact Sales Team
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { AdvancedPricing };