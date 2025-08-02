import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Database, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy: React.FC = () => {
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
                src="/nov8black.png" 
                alt="NOV8 Logo" 
                className="h-8 w-auto"
              />
              <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
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
                <Lock className="w-5 h-5 text-blue-600" />
                <span>Your Privacy Matters</span>
              </CardTitle>
              <CardDescription>
                Last updated: January 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                At NOV8, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                collaboration platform and services.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By using NOV8, you agree to the collection and use of information in accordance with this policy. 
                If you have any questions about this Privacy Policy, please contact us.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-green-600" />
                <span>Information We Collect</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Personal Information</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Name and email address when you create an account</li>
                  <li>Profile information and preferences</li>
                  <li>Payment information for premium subscriptions</li>
                  <li>Communication preferences and settings</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Usage Information</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>How you interact with our platform and features</li>
                  <li>Content you create, edit, or share</li>
                  <li>Collaboration activities and team interactions</li>
                  <li>Technical data including IP address and device information</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-purple-600" />
                <span>How We Use Your Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Service Provision</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Provide and maintain our collaboration platform</li>
                    <li>Process transactions and manage subscriptions</li>
                    <li>Enable real-time collaboration features</li>
                    <li>Deliver AI-powered content suggestions</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Improvement & Support</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Improve our services and user experience</li>
                    <li>Provide customer support and assistance</li>
                    <li>Send important updates and notifications</li>
                    <li>Analyze usage patterns for optimization</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-red-600" />
                <span>Data Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                We implement industry-standard security measures to protect your information:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Technical Safeguards</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>End-to-end encryption for sensitive data</li>
                    <li>Secure data centers with 24/7 monitoring</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>Multi-factor authentication support</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Access Controls</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Role-based access controls</li>
                    <li>Granular permissions for team collaboration</li>
                    <li>Audit logs for all data access</li>
                    <li>Automatic session timeouts</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-orange-600" />
                <span>Data Sharing & Third Parties</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li><strong>Service Providers:</strong> With trusted partners who help us operate our platform</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger or acquisition</li>
                <li><strong>Consent:</strong> With your explicit permission for specific purposes</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <span>Your Privacy Rights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                You have the following rights regarding your personal information:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Access & Control</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Access your personal data</li>
                    <li>Update or correct your information</li>
                    <li>Delete your account and data</li>
                    <li>Export your data</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Preferences</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Control email notifications</li>
                    <li>Manage privacy settings</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Control data sharing preferences</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> privacy@nov8.com</p>
                <p><strong>Address:</strong> NOV8 Inc., Privacy Team</p>
                <p><strong>Response Time:</strong> We aim to respond to all privacy inquiries within 48 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 