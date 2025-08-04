// Eleven Labs API Service - Secure API Key Management
// This service handles text-to-speech functionality with proper security

export interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  category: string;
  description?: string;
  labels?: Record<string, string>;
  preview_url?: string;
}

export interface ElevenLabsGeneration {
  text: string;
  voice_id: string;
  model_id?: string;
  voice_settings?: {
    stability: number;
    similarity_boost: number;
    style: number;
    use_speaker_boost: boolean;
  };
}

export interface ElevenLabsResponse {
  audio: string; // Base64 encoded audio
  generation_id: string;
  request_id: string;
}

class ElevenLabsService {
  private apiKey: string | null = null;
  private baseUrl = 'https://api.elevenlabs.io/v1';

  constructor() {
    // Get API key from environment variable
    this.apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY || null;
    
    if (!this.apiKey) {
      console.warn('Eleven Labs API key not found. Please set VITE_ELEVENLABS_API_KEY in your .env file');
    }
  }

  // Set API key securely (for runtime updates)
  setApiKey(key: string) {
    this.apiKey = key;
  }

  // Check if API key is configured
  isConfigured(): boolean {
    return !!this.apiKey;
  }

  // Get available voices
  async getVoices(): Promise<ElevenLabsVoice[]> {
    if (!this.apiKey) {
      throw new Error('Eleven Labs API key not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/voices`, {
        method: 'GET',
        headers: {
          'xi-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch voices: ${response.statusText}`);
      }

      const data = await response.json();
      return data.voices || [];
    } catch (error) {
      console.error('Error fetching Eleven Labs voices:', error);
      throw error;
    }
  }

  // Generate speech from text
  async generateSpeech(generation: ElevenLabsGeneration): Promise<ElevenLabsResponse> {
    if (!this.apiKey) {
      throw new Error('Eleven Labs API key not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/text-to-speech/${generation.voice_id}`, {
        method: 'POST',
        headers: {
          'xi-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: generation.text,
          model_id: generation.model_id || 'eleven_monolingual_v1',
          voice_settings: generation.voice_settings || {
            stability: 0.5,
            similarity_boost: 0.5,
            style: 0.0,
            use_speaker_boost: true,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate speech: ${response.statusText}`);
      }

      const audioBlob = await response.blob();
      const audioBase64 = await this.blobToBase64(audioBlob);

      return {
        audio: audioBase64,
        generation_id: Date.now().toString(), // Mock generation ID
        request_id: Date.now().toString(), // Mock request ID
      };
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  }

  // Convert blob to base64
  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data URL prefix to get just the base64 string
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // Play audio from base64
  playAudio(base64Audio: string): HTMLAudioElement {
    const audio = new Audio(`data:audio/mpeg;base64,${base64Audio}`);
    return audio;
  }

  // Download audio as file
  downloadAudio(base64Audio: string, filename: string = 'generated-speech.mp3'): void {
    const link = document.createElement('a');
    link.href = `data:audio/mpeg;base64,${base64Audio}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Get user's remaining characters
  async getUserInfo(): Promise<{ character_count: number; character_limit: number }> {
    if (!this.apiKey) {
      throw new Error('Eleven Labs API key not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/user`, {
        method: 'GET',
        headers: {
          'xi-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user info: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        character_count: data.subscription.character_count || 0,
        character_limit: data.subscription.character_limit || 0,
      };
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  }
}

// Create singleton instance
export const elevenLabsService = new ElevenLabsService();

// Export the class for testing
export { ElevenLabsService }; 