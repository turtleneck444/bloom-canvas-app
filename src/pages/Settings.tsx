import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings as SettingsIcon, 
  Key, 
  Shield, 
  User, 
  Bell, 
  Palette, 
  Database,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import ApiKeyManager from '@/components/ui/api-key-manager';

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your account settings, API keys, and preferences
          </p>
        </div>

        <Tabs defaultValue="api-keys" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="api-keys" className="flex items-center space-x-2">
              <Key className="w-4 h-4" />
              <span>API Keys</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span>Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Account</span>
            </TabsTrigger>
          </TabsList>

          {/* API Keys Tab */}
          <TabsContent value="api-keys" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ApiKeyManager service="elevenlabs" />
              <ApiKeyManager service="openrouter" />
              <ApiKeyManager service="daily" />
              
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">API Usage</CardTitle>
                  </div>
                  <CardDescription>
                    Monitor your API usage and limits
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Eleven Labs</span>
                      <Badge variant="secondary">Configured</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">OpenRouter</span>
                      <Badge variant="secondary">Configured</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Daily.co</span>
                      <Badge variant="outline">Not Configured</Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="text-xs text-gray-500">
                    <p>• API keys are stored locally and encrypted</p>
                    <p>• Keys are never sent to our servers</p>
                    <p>• You can revoke keys at any time</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Lock className="w-5 h-5 text-green-600" />
                    <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
                  </div>
                  <CardDescription>
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">2FA Status</span>
                    <Badge variant="outline">Not Enabled</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">Privacy Settings</CardTitle>
                  </div>
                  <CardDescription>
                    Control your data and privacy preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Collection</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Analytics</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Marketing</span>
                    <Badge variant="outline">Disabled</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Palette className="w-5 h-5 text-purple-600" />
                    <CardTitle className="text-lg">Appearance</CardTitle>
                  </div>
                  <CardDescription>
                    Customize the look and feel of NOV8
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Theme</span>
                    <Badge variant="secondary">Light</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Font Size</span>
                    <Badge variant="secondary">Medium</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Animations</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-orange-600" />
                    <CardTitle className="text-lg">Notifications</CardTitle>
                  </div>
                  <CardDescription>
                    Manage your notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Notifications</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Push Notifications</span>
                    <Badge variant="outline">Disabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Weekly Digest</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">Profile Information</CardTitle>
                  </div>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Name</span>
                    <p className="text-sm text-gray-600">John Doe</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Email</span>
                    <p className="text-sm text-gray-600">john@example.com</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Member Since</span>
                    <p className="text-sm text-gray-600">August 2024</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-green-600" />
                    <CardTitle className="text-lg">Subscription</CardTitle>
                  </div>
                  <CardDescription>
                    Manage your subscription and billing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Plan</span>
                    <Badge variant="secondary">Pro Creator</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Billing Cycle</span>
                    <span className="text-sm text-gray-600">Monthly</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Next Billing</span>
                    <span className="text-sm text-gray-600">September 1, 2024</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings; 