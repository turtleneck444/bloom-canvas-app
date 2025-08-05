import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Users, Plus, Settings, Crown, Edit, Eye, UserPlus, Copy, ExternalLink } from 'lucide-react';
import { SessionParticipant } from '@/services/collaborationService';
import { useCollaboration } from '@/hooks/useCollaboration';
import { toast } from 'sonner';

interface CollaborationToolbarProps {
  sessionType: 'mindmap' | 'whiteboard' | 'presentation' | 'strategy';
  onSessionJoin?: (sessionId: string) => void;
  onOperationReceived?: (operation: any) => void;
}

export default function CollaborationToolbar({
  sessionType,
  onSessionJoin,
  onOperationReceived
}: CollaborationToolbarProps) {
  const [newSessionName, setNewSessionName] = useState('');
  const [joinSessionId, setJoinSessionId] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  const {
    isConnected,
    sessionId,
    participants,
    isHost,
    sessions,
    isLoading,
    createSession,
    joinSession,
    leaveSession,
    updateParticipantRole
  } = useCollaboration({
    sessionType,
    onOperation: onOperationReceived,
    onParticipantsChange: (participants) => {
      // Handle participants change if needed
    }
  });

  const handleCreateSession = async () => {
    if (!newSessionName.trim()) return;
    
    const sessionId = await createSession(newSessionName.trim());
    if (sessionId) {
      setNewSessionName('');
      setShowCreateDialog(false);
      await joinSession(sessionId);
      if (onSessionJoin) {
        onSessionJoin(sessionId);
      }
    }
  };

  const handleJoinSession = async () => {
    if (!joinSessionId.trim()) return;
    
    const success = await joinSession(joinSessionId.trim());
    if (success) {
      setJoinSessionId('');
      setShowJoinDialog(false);
      if (onSessionJoin) {
        onSessionJoin(joinSessionId.trim());
      }
    }
  };

  const handleCopySessionId = () => {
    if (sessionId) {
      navigator.clipboard.writeText(sessionId);
      toast.success('Session ID copied to clipboard');
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="w-3 h-3" />;
      case 'editor': return <Edit className="w-3 h-3" />;
      case 'viewer': return <Eye className="w-3 h-3" />;
      default: return null;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'owner': return 'default';
      case 'editor': return 'secondary';
      case 'viewer': return 'outline';
      default: return 'outline';
    }
  };

  if (!isConnected) {
    return (
      <div className="flex items-center gap-2 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg border">
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Start Collaboration
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Collaboration Session</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Session name"
                value={newSessionName}
                onChange={(e) => setNewSessionName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateSession()}
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handleCreateSession} 
                  disabled={!newSessionName.trim() || isLoading}
                  className="flex-1"
                >
                  Create Session
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <UserPlus className="w-4 h-4" />
              Join Session
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join Collaboration Session</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Session ID"
                value={joinSessionId}
                onChange={(e) => setJoinSessionId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleJoinSession()}
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handleJoinSession} 
                  disabled={!joinSessionId.trim() || isLoading}
                  className="flex-1"
                >
                  Join Session
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowJoinDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {sessions.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Recent Sessions ({sessions.length})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sessions.map((session) => (
                <DropdownMenuItem 
                  key={session.id}
                  onClick={() => joinSession(session.id)}
                >
                  {session.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg border">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-sm font-medium">Connected</span>
      </div>

      <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />

      <Dialog open={showParticipants} onOpenChange={setShowParticipants}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Users className="w-4 h-4" />
            {participants.length} {participants.length === 1 ? 'Participant' : 'Participants'}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Session Participants</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={(participant as any).profiles?.avatar_url} />
                    <AvatarFallback>
                      {(participant as any).profiles?.full_name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {(participant as any).profiles?.full_name || 'Unknown User'}
                    </div>
                    <div className="text-sm text-gray-500">
                      Joined {new Date(participant.joined_at).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getRoleBadgeVariant(participant.role)} className="gap-1">
                    {getRoleIcon(participant.role)}
                    {participant.role}
                  </Badge>
                  {isHost && participant.role !== 'owner' && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem 
                          onClick={() => updateParticipantRole(participant.user_id, 'editor')}
                        >
                          Make Editor
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => updateParticipantRole(participant.user_id, 'viewer')}
                        >
                          Make Viewer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleCopySessionId}
        className="gap-2"
      >
        <Copy className="w-4 h-4" />
        Copy ID
      </Button>

      <Button 
        variant="outline" 
        size="sm" 
        onClick={leaveSession}
        className="text-red-600 hover:text-red-700"
      >
        Leave Session
      </Button>
    </div>
  );
}