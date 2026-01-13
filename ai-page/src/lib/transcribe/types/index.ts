export enum TranscriptionStatus {
  IDLE = 'IDLE',
  RECORDING = 'RECORDING',
  TRANSCRIBING = 'TRANSCRIBING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface TranscriptionConfig {
  apiKey: string;
  model?: string;
}

export interface TranscriptionCallbacks {
  onStatusChange?: (status: TranscriptionStatus) => void;
  onTranscriptionComplete?: (text: string) => void;
  onError?: (error: Error) => void;
}
