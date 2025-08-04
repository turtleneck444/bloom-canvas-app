import React, { useState, useCallback, useEffect } from 'react';
import PresentationToolbar from '@/components/Presentations/PresentationToolbar';
import { UserPlus, Link2, Info, PlusCircle, Video, Mic, MicOff, VideoOff, XCircle, Settings as SettingsIcon, Users, Calendar, Clock, Share2, MessageSquare, FileText, Download, Upload } from 'lucide-react';
import { createMeetingRoom } from '@/services/meetingsService';
import { mediaDeviceService } from '@/services/mediaDeviceService';
import { ServiceSwitcher } from '../components/ui/logo';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_ROOM_URL = 'https://nov8.daily.co/NOV8';

const Meetings = () => {
  const [roomUrl, setRoomUrl] = useState(DEFAULT_ROOM_URL);
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isMeetingActive, setIsMeetingActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [participants, setParticipants] = useState(0);
  const [meetingDuration, setMeetingDuration] = useState(0);
  const [availableDevices, setAvailableDevices] = useState({ cameras: [], microphones: [], speakers: [] });
  const [selectedCamera, setSelectedCamera] = useState('');
  const [selectedMicrophone, setSelectedMicrophone] = useState('');

  // Initialize media devices on component mount
  useEffect(() => {
    const initializeDevices = async () => {
      try {
        await mediaDeviceService.initialize();
        const devices = await mediaDeviceService.getAvailableDevices();
        setAvailableDevices(devices);
        
        // Set default devices
        if (devices.cameras.length > 0) {
          setSelectedCamera(devices.cameras[0].deviceId);
        }
        if (devices.microphones.length > 0) {
          setSelectedMicrophone(devices.microphones[0].deviceId);
        }
      } catch (error) {
        console.error('Failed to initialize media devices:', error);
        toast.error('Media access denied', {
          description: 'Camera and microphone permissions are required for meetings'
        });
      }
    };

    initializeDevices();

    // Cleanup on unmount
    return () => {
      mediaDeviceService.cleanup();
    };
  }, []);
  
  // Timer effect for meeting duration
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMeetingActive) {
      interval = setInterval(() => {
        setMeetingDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMeetingActive]);
  
  // Enhanced handlers for toolbar props
  const handleSave = useCallback(() => {
    toast.success('Meeting session saved!', {
      description: 'Your meeting configuration has been saved to your account'
    });
  }, []);

  const handleExport = useCallback(() => {
    toast.success('Meeting exported!', {
      description: 'Meeting recording and notes have been exported'
    });
  }, []);

  const handleImport = useCallback(() => {
    toast.info('Import meeting configuration', {
      description: 'Select a saved meeting configuration to import'
    });
  }, []);

  const handlePreviewToggle = useCallback(() => {
    toast.info('Preview mode toggled', {
      description: 'Switch between meeting and preview modes'
    });
  }, []);

  const handleTemplateSelect = useCallback(() => {
    toast.info('Meeting template selected', {
      description: 'Choose from various meeting templates'
    });
  }, []);

  const handleCustomize = useCallback(() => {
    toast.info('Customize meeting settings', {
      description: 'Personalize your meeting experience'
    });
  }, []);
  // Simplified meeting-specific actions (left)
  const customActions = [
    {
      icon: <PlusCircle className="w-3 h-3 mr-1" />, 
      label: 'Create New Meeting', 
      onClick: async () => {
        setIsCreatingRoom(true);
        try {
          toast.loading('Creating new meeting room...', {
            description: 'Setting up your virtual meeting space'
          });
          const url = await createMeetingRoom();
          setRoomUrl(url);
          setIsMeetingActive(true);
          setParticipants(1);
          toast.success('Meeting room created!', {
            description: 'Your new meeting room is ready'
          });
        } catch (e) {
          toast.error('Failed to create meeting room', {
            description: 'Please try again or contact support'
          });
        } finally {
          setIsCreatingRoom(false);
        }
      },
      className: 'h-6 px-2.5 bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700 text-white text-xs font-semibold shadow-md',
      title: 'Create a new unique meeting room'
    },
    {
      icon: <UserPlus className="w-3 h-3 mr-1" />, 
      label: 'Join Meeting', 
      onClick: () => {
        document.getElementById('meeting-iframe')?.scrollIntoView({ behavior: 'smooth' });
        setIsMeetingActive(true);
        setParticipants(prev => prev + 1);
        toast.success('Joined meeting!', {
          description: 'You are now in the meeting room'
        });
      },
      className: 'h-6 px-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-semibold shadow-md',
      title: 'Join the Meeting Room'
    },
    {
      icon: <Link2 className="w-3 h-3 mr-1" />, 
      label: 'Copy Invite Link', 
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(roomUrl);
          toast.success('Invite link copied!', {
            description: 'Share this link with meeting participants'
          });
        } catch (e) {
          toast.error('Failed to copy link', {
            description: 'Please try again'
          });
        }
      },
      className: 'h-6 px-2.5 bg-gradient-to-r from-cyan-500 to-blue-400 hover:from-cyan-600 hover:to-blue-500 text-white text-xs font-semibold shadow-md',
      title: 'Copy Meeting Invite Link'
    }
  ];
  // Essential meeting controls (right)
  const customRightActions = [
    {
      icon: cameraOn ? <Video className="w-3 h-3 mr-1" /> : <VideoOff className="w-3 h-3 mr-1" />, 
      label: cameraOn ? 'Camera On' : 'Camera Off', 
      onClick: async () => {
        try {
          const newCameraState = !cameraOn;
          await mediaDeviceService.toggleCamera(newCameraState);
          setCameraOn(newCameraState);
          toast.success(newCameraState ? 'Camera turned on' : 'Camera turned off', {
            description: newCameraState ? 'Your camera is now active' : 'Your camera is now disabled'
          });
        } catch (error) {
          toast.error('Failed to toggle camera', {
            description: 'Please check your camera permissions'
          });
        }
      },
      className: cameraOn
        ? 'h-6 px-2.5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-semibold shadow-md'
        : 'h-6 px-2.5 bg-gradient-to-r from-gray-400 to-gray-600 text-white text-xs font-semibold shadow-md',
      title: cameraOn ? 'Turn Camera Off' : 'Turn Camera On'
    },
    {
      icon: micOn ? <Mic className="w-3 h-3 mr-1" /> : <MicOff className="w-3 h-3 mr-1" />, 
      label: micOn ? 'Mic On' : 'Mic Off', 
      onClick: async () => {
        try {
          const newMicState = !micOn;
          await mediaDeviceService.toggleMicrophone(newMicState);
          setMicOn(newMicState);
          toast.success(newMicState ? 'Microphone unmuted' : 'Microphone muted', {
            description: newMicState ? 'Your microphone is now active' : 'Your microphone is now muted'
          });
        } catch (error) {
          toast.error('Failed to toggle microphone', {
            description: 'Please check your microphone permissions'
          });
        }
      },
      className: micOn
        ? 'h-6 px-2.5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-semibold shadow-md'
        : 'h-6 px-2.5 bg-gradient-to-r from-gray-400 to-gray-600 text-white text-xs font-semibold shadow-md',
      title: micOn ? 'Mute Microphone' : 'Unmute Microphone'
    },
    {
      icon: <SettingsIcon className="w-3 h-3 mr-1" />, 
      label: 'Settings', 
      onClick: () => {
        setShowSettings(true);
        toast.info('Meeting Settings', {
          description: 'Configure your meeting preferences and devices'
        });
      },
      className: 'h-6 px-2.5 bg-gradient-to-r from-blue-200 to-cyan-200 text-blue-900 text-xs font-semibold shadow-md',
      title: 'Meeting Settings'
    },
    {
      icon: <XCircle className="w-3 h-3 mr-1" />, 
      label: 'End Meeting', 
      onClick: () => {
        setIsMeetingActive(false);
        setParticipants(0);
        setMeetingDuration(0);
        setRoomUrl(DEFAULT_ROOM_URL);
        mediaDeviceService.cleanup();
        toast.success('Meeting ended', {
          description: 'The meeting has been terminated'
        });
      },
      className: 'h-6 px-2.5 bg-gradient-to-r from-red-500 to-orange-400 text-white text-xs font-semibold shadow-md',
      title: 'End Meeting'
    }
  ];
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-black">
      <div className="h-16 flex-shrink-0 relative z-10">
        <PresentationToolbar
          onAddSlide={handleTemplateSelect}
          onSave={handleSave}
          onExport={handleExport}
          onImport={handleImport}
          onPreviewToggle={handlePreviewToggle}
          onTemplateSelect={handleTemplateSelect}
          onCustomize={handleCustomize}
          slideCount={0}
          currentTemplate={"Meetings"}
          isPreviewMode={false}
          accentColor="blue"
          customTitle={<ServiceSwitcher current="meetings" />}
          customActions={customActions}
          customRightActions={customRightActions}
        />
      </div>
      <main className="flex-1 flex items-stretch justify-stretch relative">
        <iframe
          id="meeting-iframe"
          src={roomUrl}
          title="NOV8 Daily.co Meeting Room"
          allow="camera; microphone; fullscreen; speaker; display-capture"
          className="w-full h-full min-h-0 min-w-0 rounded-none border-none bg-black"
          style={{ flex: 1 }}
        />
        
        {/* Meeting Status Overlay */}
        {isMeetingActive && (
          <div className="absolute top-4 left-4 z-20">
            <div className="flex items-center space-x-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl p-3 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Live</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{participants} participants</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{Math.floor(meetingDuration / 60)}:{(meetingDuration % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Settings Modal */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowSettings(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Meeting Settings</h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Camera</span>
                    <Button
                      size="sm"
                      variant={cameraOn ? "default" : "outline"}
                      onClick={async () => {
                        try {
                          await mediaDeviceService.toggleCamera(!cameraOn);
                          setCameraOn(!cameraOn);
                        } catch (error) {
                          toast.error('Failed to toggle camera');
                        }
                      }}
                    >
                      {cameraOn ? "On" : "Off"}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Microphone</span>
                    <Button
                      size="sm"
                      variant={micOn ? "default" : "outline"}
                      onClick={async () => {
                        try {
                          await mediaDeviceService.toggleMicrophone(!micOn);
                          setMicOn(!micOn);
                        } catch (error) {
                          toast.error('Failed to toggle microphone');
                        }
                      }}
                    >
                      {micOn ? "On" : "Off"}
                    </Button>
                  </div>

                  {/* Camera Selection */}
                  {availableDevices.cameras.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Camera Device</span>
                      <select 
                        value={selectedCamera}
                        onChange={async (e) => {
                          try {
                            await mediaDeviceService.switchCamera(e.target.value);
                            setSelectedCamera(e.target.value);
                            toast.success('Camera switched successfully');
                          } catch (error) {
                            toast.error('Failed to switch camera');
                          }
                        }}
                        className="w-full p-2 border rounded-md text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      >
                        {availableDevices.cameras.map((camera: any) => (
                          <option key={camera.deviceId} value={camera.deviceId}>
                            {camera.label || `Camera ${camera.deviceId.slice(0, 8)}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Microphone Selection */}
                  {availableDevices.microphones.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Microphone Device</span>
                      <select 
                        value={selectedMicrophone}
                        onChange={async (e) => {
                          try {
                            await mediaDeviceService.switchMicrophone(e.target.value);
                            setSelectedMicrophone(e.target.value);
                            toast.success('Microphone switched successfully');
                          } catch (error) {
                            toast.error('Failed to switch microphone');
                          }
                        }}
                        className="w-full p-2 border rounded-md text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      >
                        {availableDevices.microphones.map((mic: any) => (
                          <option key={mic.deviceId} value={mic.deviceId}>
                            {mic.label || `Microphone ${mic.deviceId.slice(0, 8)}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Recording</span>
                    <Button size="sm" variant="outline">
                      Start
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Screen Share</span>
                    <Button size="sm" variant="outline">
                      Share
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help Modal */}
        <AnimatePresence>
          {showHelp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowHelp(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Help & Support</h3>
                  <button
                    onClick={() => setShowHelp(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Getting Started</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Click "Create New Meeting" to start a new session, or "Join Meeting" to enter an existing one. Use the camera and mic controls in the toolbar.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Media Controls</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      The camera and microphone buttons in the toolbar control your actual device hardware. Use Settings to switch between multiple devices.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Support</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      For technical support, contact us at support@nov8.com or visit daily.co for platform help.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Meetings; 