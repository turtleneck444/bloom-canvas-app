import React from 'react';
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Shield, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <img 
                src="/src/assets/nov8black.png" 
                alt="NOV8 Logo" 
                className="h-8 w-auto"
              />
              <h1 className="text-2xl font-bold text-gray-900">Terms of Service</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Agreement to Terms</span>
              </CardTitle>
              <CardDescription>
                Last updated: January 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                These Terms of Service ("Terms") govern your use of NOV8's collaboration platform and services. 
                By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy.
              </p>
              <p className="text-gray-600 leading-relaxed">
                If you do not agree to these Terms, please do not use our services. We may update these Terms 
                from time to time, and we will notify you of any material changes.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-green-600" />
                <span>Our Services</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                NOV8 provides a comprehensive collaboration platform that includes:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Core Features</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>AI-powered mind mapping and brainstorming</li>
                    <li>Professional presentation creation tools</li>
                    <li>Real-time meeting and video conferencing</li>
                    <li>Strategy planning and analysis tools</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Advanced Features</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>AI simulation and scenario modeling</li>
                    <li>Digital whiteboard collaboration</li>
                    <li>Team management and permissions</li>
                    <li>Data export and integration capabilities</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span>User Accounts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Account Creation</h4>
                  <p className="text-gray-600">
                    You must provide accurate and complete information when creating an account. 
                    You are responsible for maintaining the security of your account credentials.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Account Responsibilities</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Keep your login credentials secure and confidential</li>
                    <li>Notify us immediately of any unauthorized access</li>
                    <li>Ensure all account information is current and accurate</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acceptable Use */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Acceptable Use</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                You agree to use our services only for lawful purposes and in accordance with these Terms.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">You May:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Use our services for legitimate business purposes</li>
                    <li>Collaborate with team members and stakeholders</li>
                    <li>Create and share content within your organization</li>
                    <li>Export your data in supported formats</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">You May Not:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Share inappropriate or harmful content</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Use our services for spam or malicious activities</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-indigo-600" />
                <span>Intellectual Property</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Your Content</h4>
                  <p className="text-gray-600">
                    You retain ownership of the content you create using our services. 
                    You grant us a limited license to host and display your content as necessary 
                    to provide our services.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Our Platform</h4>
                  <p className="text-gray-600">
                    NOV8 and its original content, features, and functionality are owned by NOV8 Inc. 
                    and are protected by international copyright, trademark, and other intellectual property laws.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>Payment Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Subscription Plans</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Free tier with basic features and limited usage</li>
                    <li>Pro Creator plan at $29/month with advanced features</li>
                    <li>Enterprise plans with custom pricing and features</li>
                    <li>All plans billed monthly or annually</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Payment Processing</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Payments processed securely through trusted providers</li>
                    <li>Automatic renewal unless cancelled before billing date</li>
                    <li>Refunds available within 30 days of purchase</li>
                    <li>Price changes communicated 30 days in advance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span>Termination</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Your Rights</h4>
                  <p className="text-gray-600">
                    You may cancel your account at any time through your account settings. 
                    Upon cancellation, your access to paid features will end at the end of your billing period.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Our Rights</h4>
                  <p className="text-gray-600">
                    We may suspend or terminate your account if you violate these Terms or engage in 
                    fraudulent or illegal activities. We will provide notice when possible.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Data Retention</h4>
                  <p className="text-gray-600">
                    After account termination, we may retain certain data for legal or business purposes. 
                    You may request deletion of your personal data subject to legal requirements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-red-600" />
                <span>Limitation of Liability</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                NOV8 provides its services "as is" without warranties of any kind. Our liability is limited to the amount you paid for our services in the 12 months preceding the claim.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We are not liable for indirect, incidental, or consequential damages, including lost profits or data.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> legal@nov8.com</p>
                <p><strong>Address:</strong> NOV8 Inc., Legal Department</p>
                <p><strong>Response Time:</strong> We aim to respond to all legal inquiries within 5 business days</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms; 