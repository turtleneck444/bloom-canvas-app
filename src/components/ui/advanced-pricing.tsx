import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, ArrowRight, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdvancedPricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const pricingTiers = [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small teams. No data storage.',
      price: billingCycle === 'monthly' ? 10 : 100,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      features: [
        { name: 'AI Model Access', included: false },
        { name: 'Mind Map Tool', included: false },
        { name: 'Presentation Builder', included: false },
        { name: 'Strategy Co-Pilot', included: false },
        { name: 'Meeting Assistant', included: false },
        { name: 'Data Storage', included: false },
        { name: 'Export Documents', included: false },
      ],
      buttonText: 'Get Started →',
      buttonVariant: 'outline' as const,
      popular: false
    },
    {
      name: 'Pro Creator',
      description: 'For professionals who need full access and data storage.',
      price: billingCycle === 'monthly' ? 29 : 290,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      features: [
        { name: 'AI Model Access', included: true, text: 'Full Access' },
        { name: 'Mind Map Tool', included: true },
        { name: 'Presentation Builder', included: true },
        { name: 'Strategy Co-Pilot', included: true },
        { name: 'Meeting Assistant', included: true },
        { name: 'Data Storage', included: false, text: '—' },
        { name: 'Export Documents', included: true },
      ],
      buttonText: 'Start Pro Trial →',
      buttonVariant: 'default' as const,
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For teams and consultants who need scale and custom workflows.',
      price: billingCycle === 'monthly' ? 99 : 990,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      features: [
        { name: 'AI Model Access', included: true, text: 'Full Access' },
        { name: 'Mind Map Tool', included: true },
        { name: 'Presentation Builder', included: true },
        { name: 'Strategy Co-Pilot', included: true },
        { name: 'Meeting Assistant', included: true },
        { name: 'Data Storage', included: true },
        { name: 'Export Documents', included: true },
      ],
      buttonText: 'Contact Sales 📞',
      buttonVariant: 'outline' as const,
      popular: false
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start with our $10 plan, then choose the plan that fits your needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </Badge>
              )}
              
              <Card className={cn(
                "h-full border-2 transition-all duration-300 hover:shadow-lg",
                tier.popular ? "border-blue-200 shadow-lg" : "border-gray-200"
              )}>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {tier.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="text-center">
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      ${tier.price}
                    </span>
                    <span className="text-gray-600"> / {tier.period}</span>
                  </div>
                  
                  <Button
                    variant={tier.buttonVariant}
                    size="lg"
                    className={cn(
                      "w-full",
                      tier.popular 
                        ? "bg-blue-600 hover:bg-blue-700 text-white" 
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {tier.buttonText}
                    {tier.buttonText.includes('Contact Sales') ? (
                      <Phone className="ml-2 h-4 w-4" />
                    ) : (
                      <ArrowRight className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Features
          </h3>
          
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-4 gap-0">
              {/* Feature names */}
              <div className="p-4 bg-gray-50 border-r border-gray-200">
                <div className="font-medium text-gray-900">Features</div>
              </div>
              
              {/* Plan headers */}
              {pricingTiers.map((tier) => (
                <div key={tier.name} className="p-4 bg-gray-50 border-r border-gray-200 text-center">
                  <div className="font-medium text-gray-900">{tier.name}</div>
                </div>
              ))}
            </div>
            
            {/* Feature rows */}
            {pricingTiers[0].features.map((feature, featureIndex) => (
              <div key={featureIndex} className="grid grid-cols-4 gap-0 border-t border-gray-200">
                <div className="p-4 bg-white border-r border-gray-200">
                  <div className="text-gray-700">{feature.name}</div>
                </div>
                
                {pricingTiers.map((tier) => (
                  <div key={tier.name} className="p-4 bg-white border-r border-gray-200 text-center">
                    {tier.features[featureIndex].included ? (
                      tier.features[featureIndex].text ? (
                        <span className="text-blue-600 font-medium">
                          {tier.features[featureIndex].text}
                        </span>
                      ) : (
                        <Check className="h-5 w-5 text-blue-600 mx-auto" />
                      )
                    ) : tier.features[featureIndex].text ? (
                      <span className="text-gray-400">
                        {tier.features[featureIndex].text}
                      </span>
                    ) : (
                      <div className="w-5 h-5 mx-auto"></div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedPricing;