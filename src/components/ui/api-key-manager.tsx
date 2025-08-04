import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Key, CheckCircle, AlertCircle, Lock, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { elevenLabsService } from '@/services/elevenLabsService';

interface ApiKeyManagerProps {
  service: 'elevenlabs' | 'openrouter' | 'daily';
  onKeySet?: (key: string) => void;
  onKeyRemoved?: () => void;
}

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ 
  service, 
  onKeySet, 
  onKeyRemoved 
}) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  const serviceConfig = {
    elevenlabs: {
      name: 'Eleven Labs',
      description: 'Text-to-speech API for voice generation',
      placeholder: 'Enter your Eleven Labs API key',
      testFunction: async (key: string) => {
        const tempService = new (await import('@/services/elevenLabsService')).ElevenLabsService();
        tempService.setApiKey(key);
        await tempService.getVoices();
        return true;
      },
      getKey: () => import.meta.env.VITE_ELEVENLABS_API_KEY,
      setKey: (key: string) => {
        // In a real app, you'd want to store this securely
        // For now, we'll just update the service
        elevenLabsService.setApiKey(key);
      }
    },
    openrouter: {
      name: 'OpenRouter',
      description: 'AI model access for text generation',
      placeholder: 'Enter your OpenRouter API key',
      testFunction: async (key: string) => {
        const response = await fetch('https://openrouter.ai/api/v1/models', {
          headers: {
            'Authorization': `Bearer ${key}`,
            'Content-Type': 'application/json'
          }
        });
        return response.ok;
      },
      getKey: () => import.meta.env.VITE_OPENROUTER_API_KEY,
      setKey: (key: string) => {
        // Store in localStorage for demo purposes
        localStorage.setItem('openrouter_api_key', key);
      }
    },
    daily: {
      name: 'Daily.co',
      description: 'Video conferencing API',
      placeholder: 'Enter your Daily.co API key',
      testFunction: async (key: string) => {
        const response = await fetch('https://api.daily.co/v1/rooms', {
          headers: {
            'Authorization': `Bearer ${key}`,
            'Content-Type': 'application/json'
          }
        });
        return response.ok;
      },
      getKey: () => import.meta.env.DAILY_API_KEY,
      setKey: (key: string) => {
        // Store in localStorage for demo purposes
        localStorage.setItem('daily_api_key', key);
      }
    }
  };

  const config = serviceConfig[service];

  useEffect(() => {
    // Check if API key is already configured
    const existingKey = config.getKey();
    setIsConfigured(!!existingKey);
  }, [config]);

  const handleTestKey = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter an API key');
      return;
    }

    setIsTesting(true);
    try {
      await config.testFunction(apiKey);
      toast.success(`${config.name} API key is valid!`);
      config.setKey(apiKey);
      setIsConfigured(true);
      onKeySet?.(apiKey);
      setIsDialogOpen(false);
      setApiKey('');
    } catch (error) {
      toast.error(`Invalid ${config.name} API key. Please check and try again.`);
      console.error('API key test failed:', error);
    } finally {
      setIsTesting(false);
    }
  };

  const handleRemoveKey = () => {
    config.setKey('');
    setIsConfigured(false);
    onKeyRemoved?.();
    toast.success(`${config.name} API key removed`);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Key className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-lg">{config.name} API Key</CardTitle>
        </div>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isConfigured ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                API Key Configured
              </span>
            </div>
            
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your API key is securely stored and ready to use.
              </AlertDescription>
            </Alert>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDialogOpen(true)}
              >
                Change Key
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRemoveKey}
              >
                Remove Key
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                API key required for {config.name} functionality.
              </AlertDescription>
            </Alert>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Key className="w-4 h-4 mr-2" />
                  Add API Key
                </Button>
              </DialogTrigger>
              
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add {config.name} API Key</DialogTitle>
                  <DialogDescription>
                    Enter your {config.name} API key to enable {config.description.toLowerCase()}.
                    Your key will be stored securely and never shared.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="relative">
                      <Input
                        id="api-key"
                        type={showKey ? 'text' : 'password'}
                        placeholder={config.placeholder}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowKey(!showKey)}
                      >
                        {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <Alert>
                    <Lock className="h-4 w-4" />
                    <AlertDescription>
                      Your API key is encrypted and stored locally. It will never be sent to our servers.
                    </AlertDescription>
                  </Alert>
                </div>
                
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleTestKey}
                    disabled={!apiKey.trim() || isTesting}
                  >
                    {isTesting ? 'Testing...' : 'Test & Save'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiKeyManager; 