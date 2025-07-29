import React, { useState } from 'react';
import PresentationToolbar from '@/components/Presentations/PresentationToolbar';
import { UserPlus, Link2, Info, PlusCircle, Video, Mic, MicOff, VideoOff, XCircle, Settings as SettingsIcon } from 'lucide-react';
import { createMeetingRoom } from '@/services/meetingsService';
import { ServiceSwitcher } from '../components/ui/logo';

const DEFAULT_ROOM_URL = 'https://nov8.daily.co/NOV8';

const Meetings = () => {
  const [roomUrl, setRoomUrl] = useState(DEFAULT_ROOM_URL);
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  // Dummy handlers for toolbar props not used in meetings
  const noop = () => {};
  // Meeting-specific actions (left)
  const customActions = [
    {
      icon: <PlusCircle className="w-3 h-3 mr-1" />, label: 'Create New Meeting', onClick: async () => {
        try {
          const url = await createMeetingRoom();
          setRoomUrl(url);
        } catch (e) {
          alert('Failed to create meeting room');
        }
      },
      className: 'h-6 px-2.5 bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700 text-white text-xs font-semibold shadow-md',
      title: 'Create a new unique meeting room'
    },
    {
      icon: <UserPlus className="w-3 h-3 mr-1" />, label: 'Join Meeting', onClick: () => {
        document.getElementById('meeting-iframe')?.scrollIntoView({ behavior: 'smooth' });
      },
      className: 'h-6 px-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-semibold shadow-md',
      title: 'Join the Meeting Room'
    },
    {
      icon: <Link2 className="w-3 h-3 mr-1" />, label: 'Copy Invite Link', onClick: () => {
        navigator.clipboard.writeText(roomUrl);
      },
      className: 'h-6 px-2.5 bg-gradient-to-r from-cyan-500 to-blue-400 hover:from-cyan-600 hover:to-blue-500 text-white text-xs font-semibold shadow-md',
      title: 'Copy Meeting Invite Link'
    },
    {
      icon: <Info className="w-3 h-3 mr-1" />, label: 'Help', onClick: () => {
        alert('For help with NOV8 Meetings, contact support or visit daily.co.');
      },
      className: 'h-6 px-2.5 bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md',
      title: 'Help & Info'
    }
  ];
  // Meeting-specific actions (right)
  const customRightActions = [
    {
      icon: cameraOn ? <Video className="w-3 h-3 mr-1" /> : <VideoOff className="w-3 h-3 mr-1" />, label: cameraOn ? 'Camera On' : 'Camera Off', onClick: () => {
        setCameraOn(v => !v);
        // Optionally, send message to iframe to toggle camera
      },
      className: cameraOn
        ? 'h-6 px-2.5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-semibold shadow-md'
        : 'h-6 px-2.5 bg-gradient-to-r from-gray-400 to-gray-600 text-white text-xs font-semibold shadow-md',
      title: cameraOn ? 'Turn Camera Off' : 'Turn Camera On'
    },
    {
      icon: micOn ? <Mic className="w-3 h-3 mr-1" /> : <MicOff className="w-3 h-3 mr-1" />, label: micOn ? 'Mic On' : 'Mic Off', onClick: () => {
        setMicOn(v => !v);
        // Optionally, send message to iframe to toggle mic
      },
      className: micOn
        ? 'h-6 px-2.5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-semibold shadow-md'
        : 'h-6 px-2.5 bg-gradient-to-r from-gray-400 to-gray-600 text-white text-xs font-semibold shadow-md',
      title: micOn ? 'Mute Microphone' : 'Unmute Microphone'
    },
    {
      icon: <SettingsIcon className="w-3 h-3 mr-1" />, label: 'Settings', onClick: () => {
        alert('Meeting settings coming soon!');
      },
      className: 'h-6 px-2.5 bg-gradient-to-r from-blue-200 to-cyan-200 text-blue-900 text-xs font-semibold shadow-md',
      title: 'Meeting Settings'
    },
    {
      icon: <XCircle className="w-3 h-3 mr-1" />, label: 'End Meeting', onClick: () => {
        setRoomUrl(DEFAULT_ROOM_URL);
      },
      className: 'h-6 px-2.5 bg-gradient-to-r from-red-500 to-orange-400 text-white text-xs font-semibold shadow-md',
      title: 'End Meeting'
    }
  ];
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-black">
      <div className="h-16 flex-shrink-0 relative z-10">
        <PresentationToolbar
          onAddSlide={noop}
          onSave={noop}
          onExport={noop}
          onImport={noop}
          onPreviewToggle={noop}
          onTemplateSelect={noop}
          onCustomize={noop}
          slideCount={0}
          currentTemplate={"Meetings"}
          isPreviewMode={false}
          accentColor="blue"
          customTitle={<ServiceSwitcher current="meetings" />}
          customActions={customActions}
          customRightActions={customRightActions}
        />
      </div>
      <main className="flex-1 flex items-stretch justify-stretch">
        <iframe
          id="meeting-iframe"
          src={roomUrl}
          title="NOV8 Daily.co Meeting Room"
          allow="camera; microphone; fullscreen; speaker; display-capture"
          className="w-full h-full min-h-0 min-w-0 rounded-none border-none bg-black"
          style={{ flex: 1 }}
        />
      </main>
    </div>
  );
};

export default Meetings; 