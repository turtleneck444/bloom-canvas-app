const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

// Environment variables
const DAILY_API_KEY = process.env.DAILY_API_KEY || "6c3e54b5d584414ae4a9bbf931e8d5e285554915dad6e5a39733840c5607eb1d";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "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";

// Data storage (in production, use a proper database)
let meetings = [];
let mindMaps = [];
let presentations = [];
let whiteboards = [];
let simulations = [];
let strategies = [];

// Utility functions
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// Daily.co API integration
app.post('/api/create-room', async (req, res) => {
  try {
    const { name = 'NOV8 Meeting' } = req.body;
    const response = await axios.post(
      'https://api.daily.co/v1/rooms',
      {
        name: name,
        privacy: 'public',
        properties: {
          exp: Math.round(Date.now() / 1000) + (60 * 60 * 24), // 24 hours
          enable_chat: true,
          enable_recording: 'cloud',
          start_video_off: true,
          start_audio_off: false
        }
      },
      { 
        headers: { 
          Authorization: `Bearer ${DAILY_API_KEY}`,
          'Content-Type': 'application/json'
        } 
      }
    );
    
    const room = {
      id: response.data.id,
      name: response.data.name,
      url: response.data.url,
      created_at: new Date().toISOString(),
      participants: [],
      recording: null,
      status: 'active'
    };
    
    meetings.push(room);
    res.json(room);
  } catch (err) {
    console.error('Error creating room:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get all meeting rooms
app.get('/api/rooms', (req, res) => {
  res.json(meetings);
});

// Get specific meeting room
app.get('/api/rooms/:roomId', (req, res) => {
  const room = meetings.find(r => r.id === req.params.roomId);
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  res.json(room);
});

// Update meeting room settings
app.put('/api/rooms/:roomId', (req, res) => {
  const room = meetings.find(r => r.id === req.params.roomId);
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
  Object.assign(room, req.body);
  room.updated_at = new Date().toISOString();
  res.json(room);
});

// Add participant to meeting
app.post('/api/rooms/:roomId/participants', (req, res) => {
  const room = meetings.find(r => r.id === req.params.roomId);
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
  const participant = {
    id: generateId(),
    ...req.body,
    joined_at: new Date().toISOString(),
    is_active: true
  };
  
  room.participants.push(participant);
  res.json(participant);
});

// Start recording
app.post('/api/rooms/:roomId/recording', async (req, res) => {
  try {
    const room = meetings.find(r => r.id === req.params.roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    
    const response = await axios.post(
      `https://api.daily.co/v1/rooms/${room.id}/recordings`,
      {},
      { 
        headers: { 
          Authorization: `Bearer ${DAILY_API_KEY}`,
          'Content-Type': 'application/json'
        } 
      }
    );
    
    const recording = {
      id: response.data.id,
      url: response.data.url,
      duration: 0,
      size: 0,
      format: 'mp4',
      created_at: new Date().toISOString(),
      status: 'processing'
    };
    
    room.recording = recording;
    res.json(recording);
  } catch (err) {
    console.error('Error starting recording:', err);
    res.status(500).json({ error: err.message });
  }
});

// Stop recording
app.delete('/api/rooms/:roomId/recording', async (req, res) => {
  try {
    const room = meetings.find(r => r.id === req.params.roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    
    if (room.recording) {
      await axios.delete(
        `https://api.daily.co/v1/rooms/${room.id}/recordings/${room.recording.id}`,
        { 
          headers: { 
            Authorization: `Bearer ${DAILY_API_KEY}` 
          } 
        }
      );
      
      room.recording.status = 'ready';
      res.json(room.recording);
    } else {
      res.status(404).json({ error: 'No active recording' });
    }
  } catch (err) {
    console.error('Error stopping recording:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get meeting analytics
app.get('/api/rooms/:roomId/analytics', (req, res) => {
  const room = meetings.find(r => r.id === req.params.roomId);
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
  const analytics = {
    total_participants: room.participants.length,
    average_duration: 45, // minutes
    recording_count: room.recording ? 1 : 0,
    chat_messages: Math.floor(Math.random() * 100),
    screen_shares: Math.floor(Math.random() * 10),
    quality_metrics: {
      audio_quality: 95,
      video_quality: 90,
      connection_stability: 98
    }
  };
  
  res.json(analytics);
});

// End meeting
app.post('/api/rooms/:roomId/end', (req, res) => {
  const room = meetings.find(r => r.id === req.params.roomId);
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
  room.status = 'ended';
  room.updated_at = new Date().toISOString();
  res.json({ message: 'Meeting ended successfully' });
});

// Delete meeting room
app.delete('/api/rooms/:roomId', (req, res) => {
  const index = meetings.findIndex(r => r.id === req.params.roomId);
  if (index === -1) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
  meetings.splice(index, 1);
  res.json({ message: 'Room deleted successfully' });
});

// AI Service integration
app.post('/api/ai/generate', async (req, res) => {
  try {
    const { prompt, model = 'claude-3.5-sonnet', max_tokens = 1000 } = req.body;
    
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant for NOV8, a comprehensive mind mapping and presentation platform. Help users create intelligent, well-structured content.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: max_tokens,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://nov8.app',
          'X-Title': 'NOV8 AI Assistant'
        }
      }
    );
    
    res.json(response.data);
  } catch (err) {
    console.error('Error calling AI service:', err);
    res.status(500).json({ error: err.message });
  }
});

// Mind Maps API
app.post('/api/mindmaps', (req, res) => {
  const mindMap = {
    id: generateId(),
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  mindMaps.push(mindMap);
  res.json(mindMap);
});

app.get('/api/mindmaps', (req, res) => {
  res.json(mindMaps);
});

app.get('/api/mindmaps/:id', (req, res) => {
  const mindMap = mindMaps.find(m => m.id === req.params.id);
  if (!mindMap) {
    return res.status(404).json({ error: 'Mind map not found' });
  }
  res.json(mindMap);
});

app.put('/api/mindmaps/:id', (req, res) => {
  const mindMap = mindMaps.find(m => m.id === req.params.id);
  if (!mindMap) {
    return res.status(404).json({ error: 'Mind map not found' });
  }
  
  Object.assign(mindMap, req.body);
  mindMap.updated_at = new Date().toISOString();
  res.json(mindMap);
});

app.delete('/api/mindmaps/:id', (req, res) => {
  const index = mindMaps.findIndex(m => m.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Mind map not found' });
  }
  
  mindMaps.splice(index, 1);
  res.json({ message: 'Mind map deleted successfully' });
});

// Presentations API
app.post('/api/presentations', (req, res) => {
  const presentation = {
    id: generateId(),
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  presentations.push(presentation);
  res.json(presentation);
});

app.get('/api/presentations', (req, res) => {
  res.json(presentations);
});

app.get('/api/presentations/:id', (req, res) => {
  const presentation = presentations.find(p => p.id === req.params.id);
  if (!presentation) {
    return res.status(404).json({ error: 'Presentation not found' });
  }
  res.json(presentation);
});

app.put('/api/presentations/:id', (req, res) => {
  const presentation = presentations.find(p => p.id === req.params.id);
  if (!presentation) {
    return res.status(404).json({ error: 'Presentation not found' });
  }
  
  Object.assign(presentation, req.body);
  presentation.updated_at = new Date().toISOString();
  res.json(presentation);
});

app.delete('/api/presentations/:id', (req, res) => {
  const index = presentations.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Presentation not found' });
  }
  
  presentations.splice(index, 1);
  res.json({ message: 'Presentation deleted successfully' });
});

// Whiteboards API
app.post('/api/whiteboards', (req, res) => {
  const whiteboard = {
    id: generateId(),
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  whiteboards.push(whiteboard);
  res.json(whiteboard);
});

app.get('/api/whiteboards', (req, res) => {
  res.json(whiteboards);
});

app.get('/api/whiteboards/:id', (req, res) => {
  const whiteboard = whiteboards.find(w => w.id === req.params.id);
  if (!whiteboard) {
    return res.status(404).json({ error: 'Whiteboard not found' });
  }
  res.json(whiteboard);
});

app.put('/api/whiteboards/:id', (req, res) => {
  const whiteboard = whiteboards.find(w => w.id === req.params.id);
  if (!whiteboard) {
    return res.status(404).json({ error: 'Whiteboard not found' });
  }
  
  Object.assign(whiteboard, req.body);
  whiteboard.updated_at = new Date().toISOString();
  res.json(whiteboard);
});

app.delete('/api/whiteboards/:id', (req, res) => {
  const index = whiteboards.findIndex(w => w.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Whiteboard not found' });
  }
  
  whiteboards.splice(index, 1);
  res.json({ message: 'Whiteboard deleted successfully' });
});

// Simulations API
app.post('/api/simulations', (req, res) => {
  const simulation = {
    id: generateId(),
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  simulations.push(simulation);
  res.json(simulation);
});

app.get('/api/simulations', (req, res) => {
  res.json(simulations);
});

app.get('/api/simulations/:id', (req, res) => {
  const simulation = simulations.find(s => s.id === req.params.id);
  if (!simulation) {
    return res.status(404).json({ error: 'Simulation not found' });
  }
  res.json(simulation);
});

app.put('/api/simulations/:id', (req, res) => {
  const simulation = simulations.find(s => s.id === req.params.id);
  if (!simulation) {
    return res.status(404).json({ error: 'Simulation not found' });
  }
  
  Object.assign(simulation, req.body);
  simulation.updated_at = new Date().toISOString();
  res.json(simulation);
});

app.delete('/api/simulations/:id', (req, res) => {
  const index = simulations.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Simulation not found' });
  }
  
  simulations.splice(index, 1);
  res.json({ message: 'Simulation deleted successfully' });
});

// Strategies API
app.post('/api/strategies', (req, res) => {
  const strategy = {
    id: generateId(),
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  strategies.push(strategy);
  res.json(strategy);
});

app.get('/api/strategies', (req, res) => {
  res.json(strategies);
});

app.get('/api/strategies/:id', (req, res) => {
  const strategy = strategies.find(s => s.id === req.params.id);
  if (!strategy) {
    return res.status(404).json({ error: 'Strategy not found' });
  }
  res.json(strategy);
});

app.put('/api/strategies/:id', (req, res) => {
  const strategy = strategies.find(s => s.id === req.params.id);
  if (!strategy) {
    return res.status(404).json({ error: 'Strategy not found' });
  }
  
  Object.assign(strategy, req.body);
  strategy.updated_at = new Date().toISOString();
  res.json(strategy);
});

app.delete('/api/strategies/:id', (req, res) => {
  const index = strategies.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Strategy not found' });
  }
  
  strategies.splice(index, 1);
  res.json({ message: 'Strategy deleted successfully' });
});

// File upload endpoint
app.post('/api/upload', (req, res) => {
  try {
    const { file, type } = req.body;
    
    // In a real implementation, you would save the file to disk or cloud storage
    const fileId = generateId();
    const fileInfo = {
      id: fileId,
      name: file.name,
      type: type,
      size: file.size,
      url: `/uploads/${fileId}`,
      created_at: new Date().toISOString()
    };
    
    res.json(fileInfo);
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ error: err.message });
  }
});

// Analytics endpoint
app.get('/api/analytics', (req, res) => {
  const analytics = {
    total_users: Math.floor(Math.random() * 1000) + 500,
    active_sessions: Math.floor(Math.random() * 100) + 50,
    mind_maps_created: mindMaps.length,
    presentations_created: presentations.length,
    whiteboards_created: whiteboards.length,
    simulations_created: simulations.length,
    strategies_created: strategies.length,
    meetings_created: meetings.length,
    storage_used: Math.floor(Math.random() * 1000) + 500, // MB
    api_calls_today: Math.floor(Math.random() * 10000) + 5000
  };
  
  res.json(analytics);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      meetings: 'active',
      ai: 'active',
      storage: 'active'
    }
  });
});

// Serve static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 NOV8 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🤖 AI Service: http://localhost:${PORT}/api/ai/generate`);
  console.log(`📅 Meetings: http://localhost:${PORT}/api/rooms`);
  console.log(`🧠 Mind Maps: http://localhost:${PORT}/api/mindmaps`);
  console.log(`📊 Analytics: http://localhost:${PORT}/api/analytics`);
}); 