import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface CollaborationSession {
  id: string;
  name: string;
  type: 'mindmap' | 'whiteboard' | 'presentation' | 'strategy';
  owner_id: string;
  settings: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SessionParticipant {
  id: string;
  session_id: string;
  user_id: string;
  role: 'owner' | 'editor' | 'viewer';
  joined_at: string;
  last_seen: string;
}

export interface DocumentOperation {
  id: string;
  session_id: string;
  user_id: string;
  operation_type: string;
  operation_data: any;
  timestamp_ms: number;
  vector_clock: any;
  applied: boolean;
}

export interface UserPresence {
  id: string;
  session_id: string;
  user_id: string;
  is_online: boolean;
  cursor_position: { x: number; y: number } | null;
  selection: any | null;
  last_heartbeat: string;
}

export class CollaborationService {
  private static instance: CollaborationService;
  private channels: Map<string, RealtimeChannel> = new Map();
  private currentSessionId: string | null = null;
  private currentUserId: string | null = null;

  static getInstance(): CollaborationService {
    if (!CollaborationService.instance) {
      CollaborationService.instance = new CollaborationService();
    }
    return CollaborationService.instance;
  }

  async checkUserPlan(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data: profile } = await supabase
      .from('profiles')
      .select('plan_type')
      .eq('user_id', user.id)
      .single();

    return profile?.plan_type === 'professional' || profile?.plan_type === 'enterprise';
  }

  async createSession(name: string, type: CollaborationSession['type']): Promise<any | null> {
    const hasAccess = await this.checkUserPlan();
    if (!hasAccess) {
      throw new Error('Collaboration features require Professional or Enterprise plan');
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('collaboration_sessions')
      .insert({
        name,
        type,
        owner_id: user.id,
        settings: {},
        is_active: true
      })
      .select()
      .single();

    if (error) throw error;

    // Add owner as participant
    await supabase
      .from('session_participants')
      .insert({
        session_id: data.id,
        user_id: user.id,
        role: 'owner'
      });

    return data;
  }

  async joinSession(sessionId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Check if user is already a participant
    const { data: existingParticipant } = await supabase
      .from('session_participants')
      .select()
      .eq('session_id', sessionId)
      .eq('user_id', user.id)
      .single();

    if (!existingParticipant) {
      // Add as viewer by default
      await supabase
        .from('session_participants')
        .insert({
          session_id: sessionId,
          user_id: user.id,
          role: 'viewer'
        });
    }

    this.currentSessionId = sessionId;
    this.currentUserId = user.id;
    await this.setupRealtimeSubscription(sessionId);
    await this.updatePresence(sessionId, true);
  }

  async leaveSession(sessionId: string): Promise<void> {
    await this.updatePresence(sessionId, false);
    const channel = this.channels.get(sessionId);
    if (channel) {
      await supabase.removeChannel(channel);
      this.channels.delete(sessionId);
    }
    this.currentSessionId = null;
    this.currentUserId = null;
  }

  private async setupRealtimeSubscription(sessionId: string): Promise<void> {
    const channel = supabase
      .channel(`session-${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'document_operations',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => this.handleOperation(payload.new as DocumentOperation)
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_presence',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => this.handlePresenceUpdate(payload.new as UserPresence)
      )
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState();
        this.handlePresenceSync(newState);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        this.handlePresenceJoin(key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        this.handlePresenceLeave(key, leftPresences);
      });

    await channel.subscribe();
    this.channels.set(sessionId, channel);
  }

  async sendOperation(
    sessionId: string,
    operationType: string,
    operationData: any,
    vectorClock: any = {}
  ): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    await supabase
      .from('document_operations')
      .insert({
        session_id: sessionId,
        user_id: user.id,
        operation_type: operationType,
        operation_data: operationData,
        timestamp_ms: Date.now(),
        vector_clock: vectorClock,
        applied: false
      });
  }

  async updatePresence(sessionId: string, isOnline: boolean, cursorPosition?: { x: number; y: number }): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const channel = this.channels.get(sessionId);
    if (channel) {
      await channel.track({
        user_id: user.id,
        is_online: isOnline,
        cursor_position: cursorPosition || null,
        last_heartbeat: new Date().toISOString()
      });
    }

    // Also update database
    await supabase
      .from('user_presence')
      .upsert({
        session_id: sessionId,
        user_id: user.id,
        is_online: isOnline,
        cursor_position: cursorPosition || null,
        last_heartbeat: new Date().toISOString()
      });
  }

  async getSessionParticipants(sessionId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('session_participants')
      .select(`
        *,
        profiles(full_name, avatar_url)
      `)
      .eq('session_id', sessionId);

    if (error) throw error;
    return data || [];
  }

  async updateParticipantRole(sessionId: string, userId: string, role: string): Promise<void> {
    const { error } = await supabase
      .from('session_participants')
      .update({ role })
      .eq('session_id', sessionId)
      .eq('user_id', userId);

    if (error) throw error;
  }

  async getUserSessions(): Promise<any[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('collaboration_sessions')
      .select('*')
      .or(`owner_id.eq.${user.id},id.in.(${await this.getUserParticipatedSessions(user.id)})`)
      .eq('is_active', true)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  private async getUserParticipatedSessions(userId: string): Promise<string> {
    const { data } = await supabase
      .from('session_participants')
      .select('session_id')
      .eq('user_id', userId);

    return data?.map(p => p.session_id).join(',') || '';
  }

  // Event handlers (to be overridden by consumers)
  protected handleOperation(operation: DocumentOperation): void {
    // Override in implementation
  }

  protected handlePresenceUpdate(presence: UserPresence): void {
    // Override in implementation
  }

  protected handlePresenceSync(state: any): void {
    // Override in implementation
  }

  protected handlePresenceJoin(key: string, newPresences: any[]): void {
    // Override in implementation
  }

  protected handlePresenceLeave(key: string, leftPresences: any[]): void {
    // Override in implementation
  }
}

export const collaborationService = CollaborationService.getInstance();