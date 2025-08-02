import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoDemo: React.FC<VideoDemoProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black">
        <DialogHeader className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white">NOV8 Platform Demo</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-gray-800">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Play className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">NOV8 Platform Demo</h3>
            <p className="text-blue-100">Watch how NOV8 transforms creative work</p>
            <p className="text-sm text-blue-200 mt-2">Coming Soon</p>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                <Play className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-sm text-gray-400">
              0:00 / 0:00
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDemo; 