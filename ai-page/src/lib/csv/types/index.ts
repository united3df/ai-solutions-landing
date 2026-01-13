export interface TableData {
  title: string;
  headers: string[];
  rows: string[][];
  explanation?: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  table?: TableData;
}

export enum GenerationStatus {
  IDLE = "IDLE",
  GENERATING = "GENERATING",
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
}

export interface CSVGenerationConfig {
  apiKey: string;
  model?: string;
  systemInstruction?: string;
}

export interface CSVGenerationCallbacks {
  onStatusChange?: (status: GenerationStatus) => void;
  onDataGenerated?: (data: TableData) => void;
  onError?: (error: Error) => void;
}
