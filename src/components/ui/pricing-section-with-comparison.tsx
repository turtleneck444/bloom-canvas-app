import { Check, Minus, MoveRight, PhoneCall, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function NOV8Pricing() {
  return (
    <div className="w-full py-12 lg:py-20 bg-white">
      <div className="container mx-auto">
        <div className="flex text-center justify-center items-center gap-4 flex-col">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Pricing</Badge>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular text-gray-900">
              Simple, transparent pricing
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-gray-600 max-w-xl text-center">
              Start with our $10 plan, then choose the plan that fits your needs.
            </p>
          </div>
          <div className="grid text-left w-full grid-cols-2 lg:grid-cols-3 divide-x pt-12 border border-gray-200 rounded-2xl overflow-hidden">
            <div className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col bg-gray-50">
              <p className="text-2xl font-semibold text-gray-900">Starter</p>
              <p className="text-sm text-gray-600">
                Perfect for individuals and small teams. No data storage.
              </p>
              <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-6">
                <span className="text-4xl font-bold text-gray-900">$10</span>
                <span className="text-sm text-gray-600"> / month</span>
              </p>
              <Button variant="outline" className="gap-4 mt-6">
                Get Started <MoveRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col bg-blue-50 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-3 py-1 text-xs">Most Popular</Badge>
              </div>
              <p className="text-2xl font-semibold text-gray-900">Pro Creator</p>
              <p className="text-sm text-gray-600">
                For professionals who need full access and data storage.
              </p>
              <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-6">
                <span className="text-4xl font-bold text-gray-900">$29</span>
                <span className="text-sm text-gray-600"> / month</span>
              </p>
              <Button className="gap-4 mt-6 bg-blue-600 hover:bg-blue-700">
                Start Pro Trial <MoveRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col bg-gray-50">
              <p className="text-2xl font-semibold text-gray-900">Enterprise</p>
              <p className="text-sm text-gray-600">
                For teams and consultants who need scale and custom workflows.
              </p>
              <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-6">
                <span className="text-4xl font-bold text-gray-900">$99</span>
                <span className="text-sm text-gray-600"> / month</span>
              </p>
              <Button variant="outline" className="gap-4 mt-6">
                Contact Sales <PhoneCall className="w-4 h-4" />
              </Button>
            </div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1 py-3 bg-gray-100">
              <b className="text-gray-900">Features</b>
            </div>
            <div></div>
            <div></div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1 py-3 border-t border-gray-200">AI Model Access</div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center border-t border-gray-200">
              <p className="text-gray-600 text-sm">Full Access</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center border-t border-gray-200">
              <p className="text-gray-600 text-sm">Full Access</p>
            </div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1 py-3">Mind Map Tool</div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center">
              <Check className="w-4 h-4 text-blue-600" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center">
              <Check className="w-4 h-4 text-blue-600" />
            </div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1 py-3">Presentation Builder</div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center">
              <Check className="w-4 h-4 text-blue-600" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center">
              <Check className="w-4 h-4 text-blue-600" />
            </div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1 py-3">Strategy Co-Pilot</div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center">
              <Check className="w-4 h-4 text-blue-600" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center">
              <Check className="w-4 h-4 text-blue-600" />
            </div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1 py-3">Meeting Assistant</div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center">
              <Check className="w-4 h-4 text-blue-600" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center">
              <Check className="w-4 h-4 text-blue-600" />
            </div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1 py-3">Data Storage</div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center">
              <Minus className="w-4 h-4 text-gray-400" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center">
              <Check className="w-4 h-4 text-blue-600" />
            </div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1 py-3">Export Documents</div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center">
              <Check className="w-4 h-4 text-blue-600" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center">
              <Check className="w-4 h-4 text-blue-600" />
            </div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1 py-3">Priority Access</div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center">
              <Minus className="w-4 h-4 text-gray-400" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center">
              <Check className="w-4 h-4 text-blue-600" />
            </div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1 py-3">Team Collaboration</div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center">
              <Minus className="w-4 h-4 text-gray-400" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center">
              <Check className="w-4 h-4 text-blue-600" />
            </div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1 py-3">API Access</div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center">
              <Minus className="w-4 h-4 text-gray-400" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-3 flex justify-center">
              <Check className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { NOV8Pricing };
