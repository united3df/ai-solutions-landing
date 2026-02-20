export { VoiceAgent } from "./core/VoiceAgent";

export { useVoiceAgent } from "./hooks/useVoiceAgent";
export type {
  UseVoiceAgentOptions,
  UseVoiceAgentReturn,
} from "./hooks/useVoiceAgent";

export { SessionStatus } from "./types";

export type { Message, VoiceAgentConfig, VoiceAgentCallbacks } from "./types";

export {
  createPcmBlob,
  decode,
  decodeAudioData,
  encode,
} from "./utils/audioUtils";
