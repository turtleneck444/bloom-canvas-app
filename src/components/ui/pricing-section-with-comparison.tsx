import { Check, Minus, MoveRight, PhoneCall, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function NOV8Pricing() {
  return (
    <div className="w-full py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 mb-4">Pricing</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start with our $10 plan, then choose the plan that fits your needs.
          </p>
        </div>

        {/* Mobile Pricing Cards */}
        <div className="lg:hidden space-y-8 px-4">
          {/* Starter Plan */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <p className="text-gray-600 text-sm mb-4">
                Perfect for individuals and small teams
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-gray-900">$10</span>
                <span className="text-gray-600">/month</span>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">AI Model Access</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Mind Map Tool</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Presentation Builder</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Strategy Co-Pilot</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Meeting Assistant</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Export Documents</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full gap-2">
              Get Started <MoveRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Pro Creator Plan */}
          <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-blue-500 text-white px-3 py-1 text-xs">Most Popular</Badge>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro Creator</h3>
              <p className="text-gray-600 text-sm mb-4">
                For professionals who need full access
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-gray-900">$29</span>
                <span className="text-gray-600">/month</span>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Everything in Starter</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Data Storage</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Priority Access</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Team Collaboration</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">API Access</span>
              </div>
            </div>
            
            <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
              Start Pro Trial <MoveRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <p className="text-gray-600 text-sm mb-4">
                For teams and consultants who need scale
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-gray-900">$99</span>
                <span className="text-gray-600">/month</span>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Everything in Pro</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Custom Workflows</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Advanced Analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Dedicated Support</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">SLA Guarantee</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full gap-2">
              Contact Sales <PhoneCall className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Desktop Pricing Table */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-6">
            {/* Starter */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Perfect for individuals and small teams
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">$10</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">AI Model Access</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Mind Map Tool</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Presentation Builder</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Strategy Co-Pilot</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Meeting Assistant</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Export Documents</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full gap-2">
                Get Started <MoveRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Pro Creator */}
            <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-200 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-3 py-1 text-xs">Most Popular</Badge>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro Creator</h3>
                <p className="text-gray-600 text-sm mb-4">
                  For professionals who need full access
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">$29</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Everything in Starter</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Data Storage</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Priority Access</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Team Collaboration</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">API Access</span>
                </div>
              </div>
              
              <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
                Start Pro Trial <MoveRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Enterprise */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600 text-sm mb-4">
                  For teams and consultants who need scale
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">$99</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Everything in Pro</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Custom Workflows</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Advanced Analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Dedicated Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">SLA Guarantee</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full gap-2">
                Contact Sales <PhoneCall className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { NOV8Pricing };
