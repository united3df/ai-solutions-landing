export interface Message {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export enum SessionStatus {
  IDLE = 'IDLE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  ERROR = 'ERROR'
}

export interface VoiceAgentConfig {
  apiKey: string;
  model?: string;
  systemInstruction: string;
  voiceName?: string;
  inputSampleRate?: number;
  outputSampleRate?: number;
}

export interface VoiceAgentCallbacks {
  onStatusChange?: (status: SessionStatus) => void;
  onMessage?: (message: Message) => void;
  onError?: (error: Error) => void;
  onAudioStart?: () => void;
  onAudioEnd?: () => void;
}
