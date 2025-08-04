// Comprehensive meeting service for NOV8 platform
export interface MeetingRoom {
  id: string;
  name: string;
  url: string;
  participants: Participant[];
  recording: Recording | null;
  settings: MeetingSettings;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'ended' | 'scheduled';
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  role: 'host' | 'co-host' | 'participant';
  joinedAt: Date;
  leftAt?: Date;
  isActive: boolean;
  permissions: string[];
}

export interface Recording {
  id: string;
  url: string;
  duration: number;
  size: number;
  format: 'mp4' | 'webm';
  createdAt: Date;
  status: 'processing' | 'ready' | 'failed';
}

export interface MeetingSettings {
  maxParticipants: number;
  recordingEnabled: boolean;
  chatEnabled: boolean;
  screenShareEnabled: boolean;
  waitingRoomEnabled: boolean;
  passwordProtected: boolean;
  password?: string;
  autoRecord: boolean;
  muteOnEntry: boolean;
  videoOnEntry: boolean;
}

export interface MeetingAnalytics {
  totalParticipants: number;
  averageDuration: number;
  recordingCount: number;
  chatMessages: number;
  screenShares: number;
  qualityMetrics: {
    audioQuality: number;
    videoQuality: number;
    connectionStability: number;
  };
}

// Mock data for development
const mockRooms: MeetingRoom[] = [
  {
    id: 'room-1',
    name: 'Team Standup',
    url: 'https://nov8.daily.co/team-standup',
    participants: [
      {
        id: 'p1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'host',
        joinedAt: new Date(),
        isActive: true,
        permissions: ['manage', 'record', 'share']
      }
    ],
    recording: null,
    settings: {
      maxParticipants: 50,
      recordingEnabled: true,
      chatEnabled: true,
      screenShareEnabled: true,
      waitingRoomEnabled: false,
      passwordProtected: false,
      autoRecord: false,
      muteOnEntry: true,
      videoOnEntry: false
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'active'
  }
];

// Service to create a Daily.co meeting room via backend API
export async function createMeetingRoom(name?: string): Promise<string> {
  try {
    const res = await fetch('http://localhost:4000/api/create-room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name || 'NOV8 Meeting' })
    });
    
    if (!res.ok) {
      // Fallback to mock data if backend is not available
      const mockRoom = {
        id: `room-${Date.now()}`,
        name: name || 'NOV8 Meeting',
        url: `https://nov8.daily.co/meeting-${Date.now()}`,
        participants: [],
        recording: null,
        settings: {
          maxParticipants: 50,
          recordingEnabled: true,
          chatEnabled: true,
          screenShareEnabled: true,
          waitingRoomEnabled: false,
          passwordProtected: false,
          autoRecord: false,
          muteOnEntry: true,
          videoOnEntry: false
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'active' as const
      };
      
      mockRooms.push(mockRoom);
      return mockRoom.url;
    }
    
    const data = await res.json();
    return data.url || data.join_url || data;
  } catch (error) {
    console.warn('Backend not available, using mock data:', error);
    const mockUrl = `https://nov8.daily.co/meeting-${Date.now()}`;
    return mockUrl;
  }
}

// Get all meeting rooms
export async function getMeetingRooms(): Promise<MeetingRoom[]> {
  try {
    const res = await fetch('http://localhost:4000/api/rooms', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!res.ok) {
      return mockRooms;
    }
    
    return await res.json();
  } catch (error) {
    console.warn('Backend not available, using mock data:', error);
    return mockRooms;
  }
}

// Get a specific meeting room
export async function getMeetingRoom(roomId: string): Promise<MeetingRoom | null> {
  try {
    const res = await fetch(`http://localhost:4000/api/rooms/${roomId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!res.ok) {
      return mockRooms.find(room => room.id === roomId) || null;
    }
    
    return await res.json();
  } catch (error) {
    console.warn('Backend not available, using mock data:', error);
    return mockRooms.find(room => room.id === roomId) || null;
  }
}

// Update meeting room settings
export async function updateMeetingRoom(roomId: string, settings: Partial<MeetingSettings>): Promise<MeetingRoom> {
  try {
    const res = await fetch(`http://localhost:4000/api/rooms/${roomId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    
    if (!res.ok) {
      const room = mockRooms.find(r => r.id === roomId);
      if (room) {
        Object.assign(room.settings, settings);
        room.updatedAt = new Date();
        return room;
      }
      throw new Error('Room not found');
    }
    
    return await res.json();
  } catch (error) {
    console.warn('Backend not available, using mock data:', error);
    const room = mockRooms.find(r => r.id === roomId);
    if (room) {
      Object.assign(room.settings, settings);
      room.updatedAt = new Date();
      return room;
    }
    throw new Error('Room not found');
  }
}

// Add participant to meeting
export async function addParticipant(roomId: string, participant: Omit<Participant, 'id' | 'joinedAt'>): Promise<Participant> {
  const newParticipant: Participant = {
    ...participant,
    id: `p-${Date.now()}`,
    joinedAt: new Date()
  };
  
  try {
    const res = await fetch(`http://localhost:4000/api/rooms/${roomId}/participants`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newParticipant)
    });
    
    if (!res.ok) {
      const room = mockRooms.find(r => r.id === roomId);
      if (room) {
        room.participants.push(newParticipant);
        room.updatedAt = new Date();
        return newParticipant;
      }
      throw new Error('Room not found');
    }
    
    return await res.json();
  } catch (error) {
    console.warn('Backend not available, using mock data:', error);
    const room = mockRooms.find(r => r.id === roomId);
    if (room) {
      room.participants.push(newParticipant);
      room.updatedAt = new Date();
      return newParticipant;
    }
    throw new Error('Room not found');
  }
}

// Start recording
export async function startRecording(roomId: string): Promise<Recording> {
  const recording: Recording = {
    id: `rec-${Date.now()}`,
    url: '',
    duration: 0,
    size: 0,
    format: 'mp4',
    createdAt: new Date(),
    status: 'processing'
  };
  
  try {
    const res = await fetch(`http://localhost:4000/api/rooms/${roomId}/recording`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!res.ok) {
      const room = mockRooms.find(r => r.id === roomId);
      if (room) {
        room.recording = recording;
        room.updatedAt = new Date();
        return recording;
      }
      throw new Error('Room not found');
    }
    
    return await res.json();
  } catch (error) {
    console.warn('Backend not available, using mock data:', error);
    const room = mockRooms.find(r => r.id === roomId);
    if (room) {
      room.recording = recording;
      room.updatedAt = new Date();
      return recording;
    }
    throw new Error('Room not found');
  }
}

// Stop recording
export async function stopRecording(roomId: string): Promise<Recording> {
  try {
    const res = await fetch(`http://localhost:4000/api/rooms/${roomId}/recording`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!res.ok) {
      const room = mockRooms.find(r => r.id === roomId);
      if (room && room.recording) {
        room.recording.status = 'ready';
        room.recording.url = `https://nov8.daily.co/recordings/${room.recording.id}.mp4`;
        room.updatedAt = new Date();
        return room.recording;
      }
      throw new Error('Room or recording not found');
    }
    
    return await res.json();
  } catch (error) {
    console.warn('Backend not available, using mock data:', error);
    const room = mockRooms.find(r => r.id === roomId);
    if (room && room.recording) {
      room.recording.status = 'ready';
      room.recording.url = `https://nov8.daily.co/recordings/${room.recording.id}.mp4`;
      room.updatedAt = new Date();
      return room.recording;
    }
    throw new Error('Room or recording not found');
  }
}

// Get meeting analytics
export async function getMeetingAnalytics(roomId: string): Promise<MeetingAnalytics> {
  try {
    const res = await fetch(`http://localhost:4000/api/rooms/${roomId}/analytics`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!res.ok) {
      const room = mockRooms.find(r => r.id === roomId);
      if (room) {
        return {
          totalParticipants: room.participants.length,
          averageDuration: 45, // minutes
          recordingCount: room.recording ? 1 : 0,
          chatMessages: Math.floor(Math.random() * 100),
          screenShares: Math.floor(Math.random() * 10),
          qualityMetrics: {
            audioQuality: 95,
            videoQuality: 90,
            connectionStability: 98
          }
        };
      }
      throw new Error('Room not found');
    }
    
    return await res.json();
  } catch (error) {
    console.warn('Backend not available, using mock data:', error);
    const room = mockRooms.find(r => r.id === roomId);
    if (room) {
      return {
        totalParticipants: room.participants.length,
        averageDuration: 45,
        recordingCount: room.recording ? 1 : 0,
        chatMessages: Math.floor(Math.random() * 100),
        screenShares: Math.floor(Math.random() * 10),
        qualityMetrics: {
          audioQuality: 95,
          videoQuality: 90,
          connectionStability: 98
        }
      };
    }
    throw new Error('Room not found');
  }
}

// End meeting
export async function endMeeting(roomId: string): Promise<void> {
  try {
    const res = await fetch(`http://localhost:4000/api/rooms/${roomId}/end`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!res.ok) {
      const room = mockRooms.find(r => r.id === roomId);
      if (room) {
        room.status = 'ended';
        room.updatedAt = new Date();
        return;
      }
      throw new Error('Room not found');
    }
  } catch (error) {
    console.warn('Backend not available, using mock data:', error);
    const room = mockRooms.find(r => r.id === roomId);
    if (room) {
      room.status = 'ended';
      room.updatedAt = new Date();
      return;
    }
    throw new Error('Room not found');
  }
}

// Delete meeting room
export async function deleteMeetingRoom(roomId: string): Promise<void> {
  try {
    const res = await fetch(`http://localhost:4000/api/rooms/${roomId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!res.ok) {
      const index = mockRooms.findIndex(r => r.id === roomId);
      if (index !== -1) {
        mockRooms.splice(index, 1);
        return;
      }
      throw new Error('Room not found');
    }
  } catch (error) {
    console.warn('Backend not available, using mock data:', error);
    const index = mockRooms.findIndex(r => r.id === roomId);
    if (index !== -1) {
      mockRooms.splice(index, 1);
      return;
    }
    throw new Error('Room not found');
  }
} 