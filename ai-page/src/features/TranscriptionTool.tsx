import React from "react";
import { useTranscription, TranscriptionStatus } from "../lib/transcribe";

const TranscriptionTool: React.FC = () => {
  const {
    status,
    transcription,
    error,
    isRecording,
    recordingTime,
    startRecording,
    stopRecording,
  } = useTranscription({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || "",
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isTranscribing = status === TranscriptionStatus.TRANSCRIBING;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col text-slate-900 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="gradient-mesh absolute inset-0 opacity-40" />
        <style>{`
          @keyframes gradient-shift {
            0%, 100% {
              transform: translate(0%, 0%) scale(1);
            }
            33% {
              transform: translate(5%, -5%) scale(1.1);
            }
            66% {
              transform: translate(-5%, 5%) scale(1.05);
            }
          }
          .gradient-mesh {
            background: linear-gradient(
              135deg,
              rgba(59, 130, 246, 0.2) 0%,
              rgba(147, 51, 234, 0.2) 25%,
              rgba(59, 130, 246, 0.2) 50%,
              rgba(14, 165, 233, 0.2) 75%,
              rgba(59, 130, 246, 0.2) 100%
            );
            background-size: 200% 200%;
            animation: gradient-shift 10s ease infinite;
            will-change: transform;
          }
        `}</style>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col mt-4 max-w-4xl mx-auto w-full p-4 md:p-6 lg:p-8 pt-28 md:pt-32 relative z-10 pb-8">
        {/* Intro Message */}
        {!transcription && !isRecording && !isTranscribing && (
          <div className="flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 py-8 md:py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center border border-blue-200/50 shadow-lg">
              <svg
                className="w-12 h-12 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                Voice Transcription Demo
              </h2>
              <p className="text-slate-600 max-w-md mx-auto text-base">
                Click the button below to start recording. Your speech will be
                transcribed in real-time.
              </p>
            </div>
          </div>
        )}

        {/* Control Panel */}
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-slate-200 flex flex-col items-center mb-6 md:mb-8">
          <div className="relative mb-6 md:mb-8">
            {isRecording && (
              <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            )}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isTranscribing}
              className={`relative z-10 w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-95 shadow-2xl ${
                isRecording
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/50"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/50"
              } ${isTranscribing ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
            >
              {isRecording ? (
                <svg
                  className="w-8 h-8 md:w-10 md:h-10"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V7a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 md:w-10 md:h-10"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="text-center">
            {isRecording ? (
              <div className="space-y-2">
                <p className="text-red-500 font-bold uppercase tracking-widest text-xs">
                  Recording
                </p>
                <p className="text-4xl md:text-5xl font-mono text-slate-900 font-bold">
                  {formatTime(recordingTime)}
                </p>
              </div>
            ) : isTranscribing ? (
              <div className="space-y-3">
                <p className="text-blue-600 font-medium flex items-center justify-center gap-2 text-base">
                  <div className="w-5 h-5 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  Analyzing Audio...
                </p>
                <p className="text-slate-600 text-sm italic">
                  Processing your voice
                </p>
              </div>
            ) : (
              <p className="text-slate-700 font-medium text-base">
                Click to start transcribing
              </p>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden min-h-[300px] flex flex-col">
          <div className="px-4 md:px-6 py-3 md:py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4">
            <h3 className="font-semibold text-slate-900 text-lg">Transcription Result</h3>
            {transcription && (
              <button
                onClick={() => navigator.clipboard.writeText(transcription)}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-md hover:bg-blue-50 border border-blue-200 hover:border-blue-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy Text
              </button>
            )}
          </div>

          <div className="flex-grow p-4 md:p-6 overflow-y-auto max-h-[60vh]">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start gap-3 text-red-400">
                <svg
                  className="w-5 h-5 mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {!error && !transcription && !isTranscribing && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12">
                <svg
                  className="w-20 h-20 mb-4 opacity-30 text-slate-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
                <p className="text-base">Your transcription will appear here.</p>
              </div>
            )}

            {isTranscribing && (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              </div>
            )}

            {transcription && !isTranscribing && (
              <div className="prose max-w-none text-slate-900 leading-relaxed whitespace-pre-wrap text-base">
                {transcription}
              </div>
            )}
          </div>
        </div>
      </main>

    </div>
  );
};

export default TranscriptionTool;
