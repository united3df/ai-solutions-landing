export { TranscriptionService } from "./core/TranscriptionService";

export { useTranscription } from "./hooks/useTranscription";
export type {
  UseTranscriptionOptions,
  UseTranscriptionReturn,
} from "./hooks/useTranscription";

export { TranscriptionStatus } from "./types";

export type {
  TranscriptionConfig,
  TranscriptionCallbacks,
} from "./types";

export { blobToBase64 } from "./utils/audioUtils";
