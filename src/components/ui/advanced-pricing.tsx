import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdvancedPricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const tiers = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? 0 : 0,
      description: 'For individuals exploring ideas.',
      features: [
        '3 active projects',
        'All 5 AI tools',
        'Basic export (PDF)',
        'Community support',
      ],
      cta: 'Get started free',
      popular: false,
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? 24 : 192,
      description: 'For teams shipping fast.',
      features: [
        'Unlimited projects',
        'Advanced AI models',
        'PPTX, JSON & PNG export',
        'Real-time collaboration',
        'Priority support',
        'Custom templates',
      ],
      cta: 'Start free trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: null,
      description: 'For organizations at scale.',
      features: [
        'Everything in Pro',
        'SSO & SAML',
        'Custom AI workflows',
        'Dedicated account manager',
        'SLA & uptime guarantee',
        'Audit logs & compliance',
      ],
      cta: 'Contact sales',
      popular: false,
    },
  ];

  return (
    <section className="py-24 bg-background relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.div
            className="label-mono mb-4"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            ─ Pricing
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-[-0.03em]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Start free. Upgrade when you're ready.
          </motion.p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-1 mt-8">
            <div className="inline-flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={cn(
                  'text-sm font-medium px-4 py-2 rounded-md transition-all',
                  billingCycle === 'monthly'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={cn(
                  'text-sm font-medium px-4 py-2 rounded-md transition-all flex items-center gap-2',
                  billingCycle === 'yearly'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Yearly
                <Badge className="bg-[hsl(var(--nov8-accent))] text-background text-[10px] px-1.5 py-0">-33%</Badge>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                'relative rounded-2xl border bg-card p-8 flex flex-col transition-all duration-300 hover:-translate-y-1',
                tier.popular
                  ? 'border-[hsl(var(--nov8-primary)/0.4)] shadow-[0_0_0_1px_hsl(var(--nov8-primary)/0.3),0_20px_60px_-20px_hsl(var(--nov8-primary)/0.4)]'
                  : 'border-border hover:border-[hsl(var(--nov8-primary)/0.2)]'
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-foreground text-background text-[10px] px-3 py-0.5 font-semibold tracking-wider uppercase">
                    Most popular
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-1">{tier.name}</h3>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>

              <div className="mb-8">
                {tier.price !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-foreground tracking-tight">${tier.price}</span>
                    <span className="text-muted-foreground text-sm">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-foreground">Custom</span>
                )}
              </div>

              <Button
                className={cn(
                  'w-full mb-8',
                  tier.popular && 'glow-primary'
                )}
                variant={tier.popular ? 'default' : 'outline'}
              >
                {tier.cta}
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>

              <ul className="space-y-3 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-[hsl(var(--nov8-accent))] mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedPricing;
