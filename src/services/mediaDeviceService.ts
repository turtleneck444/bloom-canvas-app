class MediaDeviceService {
  private stream: MediaStream | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize media devices:', error);
      throw new Error('Camera and microphone access denied');
    }
  }

  async toggleCamera(enabled: boolean): Promise<void> {
    if (!this.stream) {
      await this.initialize();
    }
    
    const videoTracks = this.stream?.getVideoTracks() || [];
    videoTracks.forEach(track => {
      track.enabled = enabled;
    });
  }

  async toggleMicrophone(enabled: boolean): Promise<void> {
    if (!this.stream) {
      await this.initialize();
    }
    
    const audioTracks = this.stream?.getAudioTracks() || [];
    audioTracks.forEach(track => {
      track.enabled = enabled;
    });
  }

  getStream(): MediaStream | null {
    return this.stream;
  }

  async getAvailableDevices() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return {
        cameras: devices.filter(device => device.kind === 'videoinput'),
        microphones: devices.filter(device => device.kind === 'audioinput'),
        speakers: devices.filter(device => device.kind === 'audiooutput')
      };
    } catch (error) {
      console.error('Failed to get available devices:', error);
      return { cameras: [], microphones: [], speakers: [] };
    }
  }

  async switchCamera(deviceId: string): Promise<void> {
    try {
      // Stop current video tracks
      const videoTracks = this.stream?.getVideoTracks() || [];
      videoTracks.forEach(track => track.stop());

      // Get new stream with selected camera
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceId } },
        audio: true
      });

      // Replace video track in current stream
      if (this.stream) {
        const newVideoTrack = newStream.getVideoTracks()[0];
        const oldVideoTrack = this.stream.getVideoTracks()[0];
        
        if (oldVideoTrack) {
          this.stream.removeTrack(oldVideoTrack);
        }
        this.stream.addTrack(newVideoTrack);
      }
    } catch (error) {
      console.error('Failed to switch camera:', error);
      throw new Error('Failed to switch camera');
    }
  }

  async switchMicrophone(deviceId: string): Promise<void> {
    try {
      // Stop current audio tracks
      const audioTracks = this.stream?.getAudioTracks() || [];
      audioTracks.forEach(track => track.stop());

      // Get new stream with selected microphone
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: { deviceId: { exact: deviceId } }
      });

      // Replace audio track in current stream
      if (this.stream) {
        const newAudioTrack = newStream.getAudioTracks()[0];
        const oldAudioTrack = this.stream.getAudioTracks()[0];
        
        if (oldAudioTrack) {
          this.stream.removeTrack(oldAudioTrack);
        }
        this.stream.addTrack(newAudioTrack);
      }
    } catch (error) {
      console.error('Failed to switch microphone:', error);
      throw new Error('Failed to switch microphone');
    }
  }

  cleanup(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.isInitialized = false;
  }
}

export const mediaDeviceService = new MediaDeviceService();