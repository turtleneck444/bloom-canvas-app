import { useState, useEffect, useCallback } from 'react';
import { collaborationService, CollaborationSession, SessionParticipant, DocumentOperation, UserPresence } from '@/services/collaborationService';
import { toast } from 'sonner';

export interface CollaborationState {
  isConnected: boolean;
  sessionId: string | null;
  participants: any[];
  currentUser: any;
  userPresence: Map<string, UserPresence>;
  isHost: boolean;
  canEdit: boolean;
}

export interface UseCollaborationProps {
  sessionType: 'mindmap' | 'whiteboard' | 'presentation' | 'strategy';
  onOperation?: (operation: DocumentOperation) => void;
  onPresenceUpdate?: (presence: UserPresence) => void;
  onParticipantsChange?: (participants: any[]) => void;
}

export function useCollaboration({
  sessionType,
  onOperation,
  onPresenceUpdate,
  onParticipantsChange
}: UseCollaborationProps) {
  const [state, setState] = useState<CollaborationState>({
    isConnected: false,
    sessionId: null,
    participants: [],
    currentUser: null,
    userPresence: new Map(),
    isHost: false,
    canEdit: false
  });

  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load user sessions
  const loadSessions = useCallback(async () => {
    try {
      const userSessions = await collaborationService.getUserSessions();
      setSessions(userSessions.filter(s => s.type === sessionType));
    } catch (error) {
      console.error('Failed to load sessions:', error);
    }
  }, [sessionType]);

  // Create new session
  const createSession = useCallback(async (name: string): Promise<string | null> => {
    try {
      setIsLoading(true);
      const session = await collaborationService.createSession(name, sessionType);
      if (session) {
        await loadSessions();
        toast.success('Collaboration session created');
        return session.id;
      }
      return null;
    } catch (error: any) {
      toast.error(error.message || 'Failed to create session');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [sessionType, loadSessions]);

  // Join session
  const joinSession = useCallback(async (sessionId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      await collaborationService.joinSession(sessionId);
      
      // Update state
      const participants = await collaborationService.getSessionParticipants(sessionId);
      const currentUser = participants.find(p => p.user_id === state.currentUser?.id);
      
      setState(prev => ({
        ...prev,
        isConnected: true,
        sessionId,
        participants,
        isHost: currentUser?.role === 'owner',
        canEdit: currentUser?.role === 'owner' || currentUser?.role === 'editor'
      }));

      if (onParticipantsChange) {
        onParticipantsChange(participants);
      }

      toast.success('Joined collaboration session');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Failed to join session');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [state.currentUser, onParticipantsChange]);

  // Leave session
  const leaveSession = useCallback(async (): Promise<void> => {
    if (!state.sessionId) return;

    try {
      await collaborationService.leaveSession(state.sessionId);
      setState(prev => ({
        ...prev,
        isConnected: false,
        sessionId: null,
        participants: [],
        userPresence: new Map(),
        isHost: false,
        canEdit: false
      }));
      toast.success('Left collaboration session');
    } catch (error) {
      console.error('Failed to leave session:', error);
    }
  }, [state.sessionId]);

  // Send operation
  const sendOperation = useCallback(async (
    operationType: string,
    operationData: any,
    vectorClock?: any
  ): Promise<void> => {
    if (!state.sessionId || !state.canEdit) return;

    try {
      await collaborationService.sendOperation(
        state.sessionId,
        operationType,
        operationData,
        vectorClock
      );
    } catch (error) {
      console.error('Failed to send operation:', error);
    }
  }, [state.sessionId, state.canEdit]);

  // Update cursor position
  const updateCursor = useCallback(async (position: { x: number; y: number }): Promise<void> => {
    if (!state.sessionId) return;

    try {
      await collaborationService.updatePresence(state.sessionId, true, position);
    } catch (error) {
      console.error('Failed to update cursor:', error);
    }
  }, [state.sessionId]);

  // Update participant role
  const updateParticipantRole = useCallback(async (
    userId: string,
    role: string
  ): Promise<void> => {
    if (!state.sessionId || !state.isHost) return;

    try {
      await collaborationService.updateParticipantRole(state.sessionId, userId, role as any);
      const participants = await collaborationService.getSessionParticipants(state.sessionId);
      setState(prev => ({ ...prev, participants }));
      if (onParticipantsChange) {
        onParticipantsChange(participants);
      }
      toast.success('Participant role updated');
    } catch (error) {
      console.error('Failed to update participant role:', error);
      toast.error('Failed to update participant role');
    }
  }, [state.sessionId, state.isHost, onParticipantsChange]);

  // Setup event handlers
  useEffect(() => {
    if (onOperation) {
      collaborationService['handleOperation'] = onOperation;
    }
    if (onPresenceUpdate) {
      collaborationService['handlePresenceUpdate'] = onPresenceUpdate;
    }
  }, [onOperation, onPresenceUpdate]);

  // Load sessions on mount
  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  return {
    // State
    ...state,
    sessions,
    isLoading,

    // Actions
    createSession,
    joinSession,
    leaveSession,
    sendOperation,
    updateCursor,
    updateParticipantRole,
    loadSessions
  };
}