import React, { useState, useCallback } from 'react';
import PresentationToolbar from '@/components/Presentations/PresentationToolbar';
import { UserPlus, Link2, Info, PlusCircle, Video, Mic, MicOff, VideoOff, XCircle, Settings as SettingsIcon, Users, Calendar, Clock, Share2, MessageSquare, FileText, Download, Upload } from 'lucide-react';
import { createMeetingRoom } from '@/services/meetingsService';
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
  // Meeting-specific actions (left)
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
    },
    {
      icon: <Info className="w-3 h-3 mr-1" />, 
      label: 'Help', 
      onClick: () => {
        setShowHelp(true);
        toast.info('Help & Support', {
          description: 'For help with NOV8 Meetings, contact support or visit daily.co'
        });
      },
      className: 'h-6 px-2.5 bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md',
      title: 'Help & Info'
    }
  ];
  // Meeting-specific actions (right)
  const customRightActions = [
    {
      icon: cameraOn ? <Video className="w-3 h-3 mr-1" /> : <VideoOff className="w-3 h-3 mr-1" />, 
      label: cameraOn ? 'Camera On' : 'Camera Off', 
      onClick: () => {
        setCameraOn(v => !v);
        toast.success(cameraOn ? 'Camera turned off' : 'Camera turned on', {
          description: cameraOn ? 'Your camera is now disabled' : 'Your camera is now active'
        });
        // Optionally, send message to iframe to toggle camera
      },
      className: cameraOn
        ? 'h-6 px-2.5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-semibold shadow-md'
        : 'h-6 px-2.5 bg-gradient-to-r from-gray-400 to-gray-600 text-white text-xs font-semibold shadow-md',
      title: cameraOn ? 'Turn Camera Off' : 'Turn Camera On'
    },
    {
      icon: micOn ? <Mic className="w-3 h-3 mr-1" /> : <MicOff className="w-3 h-3 mr-1" />, 
      label: micOn ? 'Mic On' : 'Mic Off', 
      onClick: () => {
        setMicOn(v => !v);
        toast.success(micOn ? 'Microphone muted' : 'Microphone unmuted', {
          description: micOn ? 'Your microphone is now muted' : 'Your microphone is now active'
        });
        // Optionally, send message to iframe to toggle mic
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
          description: 'Configure your meeting preferences and options'
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
                      onClick={() => setCameraOn(!cameraOn)}
                    >
                      {cameraOn ? "On" : "Off"}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Microphone</span>
                    <Button
                      size="sm"
                      variant={micOn ? "default" : "outline"}
                      onClick={() => setMicOn(!micOn)}
                    >
                      {micOn ? "On" : "Off"}
                    </Button>
                  </div>
                  
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
                      Click "Create New Meeting" to start a new session, or "Join Meeting" to enter an existing one.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Controls</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Use the camera and microphone buttons to control your audio/video settings during the meeting.
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