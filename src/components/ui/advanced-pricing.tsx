import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdvancedPricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const tiers = [
    {
      name: 'Individual',
      price: billingCycle === 'monthly' ? 10 : 96,
      description: 'For solo founders exploring ideas.',
      features: [
        'All 5 AI tools',
        '10 projects',
        'Basic export (PDF)',
        'Email support',
      ],
      cta: 'Start free trial',
      popular: false,
    },
    {
      name: 'Professional',
      price: billingCycle === 'monthly' ? 29 : 278,
      description: 'For teams shipping fast.',
      features: [
        'Everything in Individual',
        'Unlimited projects',
        'Advanced AI models',
        'PPTX & JSON export',
        'Priority support',
        'Real-time collaboration',
      ],
      cta: 'Start free trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: null,
      description: 'For organizations at scale.',
      features: [
        'Everything in Professional',
        'SSO & SAML',
        'Custom AI workflows',
        'Dedicated account manager',
        'SLA & uptime guarantee',
        'Audit logs',
      ],
      cta: 'Contact sales',
      popular: false,
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Start free. Upgrade when you're ready.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                'text-sm font-medium px-4 py-1.5 rounded-lg transition-colors',
                billingCycle === 'monthly'
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={cn(
                'text-sm font-medium px-4 py-1.5 rounded-lg transition-colors',
                billingCycle === 'yearly'
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Yearly
              <Badge variant="secondary" className="ml-2 text-[10px]">Save 20%</Badge>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={cn(
                  'h-full relative transition-all duration-200',
                  tier.popular
                    ? 'border-foreground/20 shadow-md'
                    : 'border-border'
                )}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-foreground text-background text-xs px-3">
                      Most popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {tier.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </CardHeader>

                <CardContent>
                  <div className="mb-6">
                    {tier.price !== null ? (
                      <>
                        <span className="text-4xl font-bold text-foreground">${tier.price}</span>
                        <span className="text-muted-foreground text-sm">
                          /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-foreground">Custom</span>
                    )}
                  </div>

                  <Button
                    className={cn(
                      'w-full mb-6',
                      tier.popular ? '' : ''
                    )}
                    variant={tier.popular ? 'default' : 'outline'}
                    size="sm"
                  >
                    {tier.cta}
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>

                  <ul className="space-y-2.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedPricing;
