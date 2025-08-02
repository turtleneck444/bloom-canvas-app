import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Clock, Users, Shield, Zap, Building2, ArrowRight, Star, Crown, Settings } from 'lucide-react';

const Onboarding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
              Enterprise Onboarding
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Complete Implementation Guide
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about getting started with NOV8, from initial signup to enterprise deployment and custom workspace configuration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Signup Process */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Signup Process
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Streamlined account creation with enterprise-grade security and SSO integration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "Account Creation",
                description: "Create your account in under 30 seconds with email verification and optional SSO integration for enterprise teams.",
                features: ["Email verification", "SSO integration", "Role-based access", "Security protocols"]
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Security Setup",
                description: "Configure enterprise-grade security including 2FA, IP restrictions, and compliance certifications.",
                features: ["Two-factor authentication", "IP whitelisting", "SOC 2 compliance", "GDPR compliance"]
              },
              {
                icon: <Settings className="w-8 h-8" />,
                title: "Workspace Configuration",
                description: "Set up your virtual workspace with custom branding, team structure, and access permissions.",
                features: ["Custom branding", "Team hierarchy", "Access controls", "Integration setup"]
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-slate-600 dark:text-slate-300">
                        {step.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl text-slate-900 dark:text-white">{step.title}</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-300">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {step.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
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

      {/* Pricing Plans */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Pricing Plans
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Choose the plan that best fits your team size and requirements
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$5",
                period: "trial",
                description: "Perfect for individuals and small teams getting started",
                features: [
                  "Full suite access",
                  "Document export",
                  "Basic collaboration",
                  "Email support",
                  "No data storage"
                ],
                badge: "Most Popular",
                popular: false
              },
              {
                name: "Pro Creator",
                price: "$29",
                period: "per month",
                description: "Advanced features for growing teams and businesses",
                features: [
                  "Everything in Starter",
                  "Data storage & backup",
                  "Advanced analytics",
                  "Priority support",
                  "Custom branding",
                  "Team management"
                ],
                badge: "Recommended",
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "pricing",
                description: "Tailored solutions for large organizations",
                features: [
                  "Everything in Pro Creator",
                  "Custom onboarding",
                  "Dedicated support",
                  "SLA guarantees",
                  "Custom integrations",
                  "Advanced security"
                ],
                badge: "Enterprise",
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <Card className={`h-full ${plan.popular ? 'border-blue-500 shadow-lg' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-900`}>
                  <CardHeader>
                    <CardTitle className="text-2xl text-slate-900 dark:text-white">{plan.name}</CardTitle>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                      <span className="text-slate-600 dark:text-slate-300 ml-2">{plan.period}</span>
                    </div>
                    <CardDescription className="text-slate-600 dark:text-slate-300">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6" variant={plan.popular ? "default" : "outline"}>
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding Services */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Onboarding Services
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Custom setup and configuration services to ensure your team's success
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Virtual Workspace Setup",
                description: "Custom meeting room creation and virtual workspace configuration tailored to your organization's needs.",
                features: [
                  "Custom meeting room design",
                  "Brand integration",
                  "Access control setup",
                  "Integration with existing tools",
                  "Team training sessions"
                ],
                icon: <Building2 className="w-8 h-8" />,
                duration: "2-3 business days"
              },
              {
                title: "Enterprise Integration",
                description: "Seamless integration with your existing enterprise infrastructure and security protocols.",
                features: [
                  "SSO configuration",
                  "Active Directory integration",
                  "API setup and documentation",
                  "Custom security policies",
                  "Compliance documentation"
                ],
                icon: <Shield className="w-8 h-8" />,
                duration: "1-2 weeks"
              },
              {
                title: "Team Training & Adoption",
                description: "Comprehensive training programs to ensure your team maximizes the platform's potential.",
                features: [
                  "Custom training materials",
                  "Live training sessions",
                  "Best practices workshops",
                  "Ongoing support",
                  "Success metrics tracking"
                ],
                icon: <Users className="w-8 h-8" />,
                duration: "1 week"
              },
              {
                title: "Custom Development",
                description: "Tailored development services for unique business requirements and custom integrations.",
                features: [
                  "Custom feature development",
                  "API customization",
                  "Third-party integrations",
                  "White-label solutions",
                  "Dedicated development team"
                ],
                icon: <Settings className="w-8 h-8" />,
                duration: "2-4 weeks"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                        <div className="text-slate-600 dark:text-slate-300">
                          {service.icon}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {service.duration}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-slate-900 dark:text-white">{service.title}</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-300">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
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

      {/* Enterprise Features Evaluation */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Enterprise Features Evaluation
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our automated assessment helps determine the right enterprise features for your business success
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Automated Assessment Process
              </h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Team Size Analysis",
                    description: "Evaluate your team structure, roles, and collaboration patterns to recommend appropriate access controls and permissions."
                  },
                  {
                    title: "Security Requirements",
                    description: "Assess your industry compliance needs, data sensitivity, and security protocols to ensure enterprise-grade protection."
                  },
                  {
                    title: "Integration Needs",
                    description: "Analyze your existing tech stack and workflow requirements to identify necessary custom integrations and API configurations."
                  },
                  {
                    title: "Scalability Planning",
                    description: "Evaluate your growth projections and usage patterns to recommend infrastructure and feature requirements."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900 dark:text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-blue-600" />
                    Recommended Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      "Advanced user management and role-based access",
                      "Custom security policies and compliance features",
                      "Dedicated support with SLA guarantees",
                      "Custom integrations and API access",
                      "Advanced analytics and reporting",
                      "White-label and branding options",
                      "Custom development and feature requests",
                      "Dedicated account management"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6">
                    Start Assessment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Let our team help you implement NOV8 with the perfect configuration for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                View Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Onboarding; 