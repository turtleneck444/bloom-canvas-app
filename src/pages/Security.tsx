import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Database, Users, Zap, CheckCircle, AlertTriangle, Server, Key } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Security: React.FC = () => {
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
              <h1 className="text-2xl font-bold text-gray-900">Security</h1>
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
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Security First</span>
              </CardTitle>
              <CardDescription>
                Last updated: January 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                At NOV8, security is at the core of everything we do. We implement industry-leading 
                security measures to protect your data and ensure the confidentiality, integrity, and 
                availability of our platform.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our security practices are designed to meet enterprise standards and comply with 
                international security frameworks and regulations.
              </p>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-green-600" />
                <span>Data Protection</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Encryption</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>End-to-end encryption for all data in transit</li>
                    <li>AES-256 encryption for data at rest</li>
                    <li>Secure key management and rotation</li>
                    <li>Encrypted backups and disaster recovery</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Data Centers</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>ISO 27001 certified data centers</li>
                    <li>24/7 physical security monitoring</li>
                    <li>Redundant power and cooling systems</li>
                    <li>Geographic redundancy and failover</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Access Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="w-5 h-5 text-purple-600" />
                <span>Access Controls</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Authentication</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Multi-factor authentication (MFA) support</li>
                    <li>Single sign-on (SSO) integration</li>
                    <li>Strong password policies and enforcement</li>
                    <li>Session management and timeouts</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Authorization</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Role-based access controls (RBAC)</li>
                    <li>Granular permissions for team collaboration</li>
                    <li>Principle of least privilege</li>
                    <li>Regular access reviews and audits</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Network Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Server className="w-5 h-5 text-orange-600" />
                <span>Network Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Infrastructure</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>DDoS protection and mitigation</li>
                    <li>Web application firewall (WAF)</li>
                    <li>Intrusion detection and prevention</li>
                    <li>Network segmentation and isolation</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Monitoring</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>24/7 security monitoring</li>
                    <li>Real-time threat detection</li>
                    <li>Automated incident response</li>
                    <li>Security event logging and analysis</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-indigo-600" />
                <span>Application Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Development</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Secure coding practices and standards</li>
                    <li>Regular security code reviews</li>
                    <li>Automated vulnerability scanning</li>
                    <li>Dependency vulnerability management</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Testing</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Penetration testing and assessments</li>
                    <li>Security regression testing</li>
                    <li>Third-party security audits</li>
                    <li>Bug bounty program</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Compliance & Certifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Standards</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>ISO 27001 Information Security Management</li>
                    <li>SOC 2 Type II compliance</li>
                    <li>GDPR compliance for EU users</li>
                    <li>CCPA compliance for California users</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Industry</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>HIPAA compliance for healthcare data</li>
                    <li>PCI DSS for payment processing</li>
                    <li>FedRAMP for government contracts</li>
                    <li>Regular compliance audits and assessments</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Incident Response */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>Incident Response</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Response Plan</h4>
                  <p className="text-gray-600">
                    We maintain a comprehensive incident response plan that includes detection, 
                    analysis, containment, eradication, and recovery procedures.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Detection</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Automated threat detection systems</li>
                      <li>Security monitoring and alerting</li>
                      <li>User behavior analytics</li>
                      <li>Anomaly detection and reporting</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Response</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>24/7 security team availability</li>
                      <li>Escalation procedures and protocols</li>
                      <li>Customer notification processes</li>
                      <li>Post-incident analysis and lessons learned</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <span>Security Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">For Users</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Two-factor authentication (2FA)</li>
                    <li>Session management and controls</li>
                    <li>Activity logs and audit trails</li>
                    <li>Data export and deletion tools</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">For Teams</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Admin controls and permissions</li>
                    <li>Team security policies</li>
                    <li>Data loss prevention (DLP)</li>
                    <li>Compliance reporting tools</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Security Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                For security-related inquiries, vulnerability reports, or security incidents:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Security Email:</strong> security@nov8.com</p>
                <p><strong>Vulnerability Reports:</strong> security-reports@nov8.com</p>
                <p><strong>PGP Key:</strong> Available upon request</p>
                <p><strong>Response Time:</strong> Critical issues responded to within 24 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Security; 