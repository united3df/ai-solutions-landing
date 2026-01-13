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
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-200">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4 md:p-8 pt-8">
        {/* Intro Message */}
        {!transcription && !isRecording && !isTranscribing && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 py-8">
            <div className="w-24 h-24 bg-slate-900/50 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg">
              <svg
                className="w-12 h-12 text-lime-300"
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
              <h2 className="text-4xl font-extrabold tracking-tight text-white">
                Voice Transcription Demo
              </h2>
              <p className="text-slate-400 max-w-md mx-auto text-base">
                Click the button below to start recording. Your speech will be
                transcribed in real-time.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
              {[
                {
                  title: "Easy Integration",
                  desc: "Simple React hook API",
                  icon: "⚡",
                  iconColor: "text-yellow-400",
                },
                {
                  title: "Real-time",
                  desc: "Instant transcription",
                  icon: "🎤",
                  iconColor: "text-slate-300",
                },
                {
                  title: "Accurate",
                  desc: "Powered by Gemini AI",
                  icon: "✨",
                  iconColor: "text-yellow-400",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card p-5 rounded-xl text-left border-l-2 border-l-lime-500/50 hover:border-l-lime-500 transition-colors"
                >
                  <div className={`text-3xl mb-2 ${item.iconColor}`}>{item.icon}</div>
                  <div className="font-bold text-sm text-white mb-1">{item.title}</div>
                  <div className="text-xs text-slate-400">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Control Panel */}
        <div className="glass-card rounded-3xl p-8 shadow-2xl border-white/10 flex flex-col items-center mb-8 bg-slate-900/60 backdrop-blur-md">
          <div className="relative mb-8">
            {isRecording && (
              <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            )}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isTranscribing}
              className={`relative z-10 w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-95 shadow-2xl ${
                isRecording
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/50"
                  : "bg-lime-500 hover:bg-lime-400 text-white shadow-lime-500/50"
              } ${isTranscribing ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
            >
              {isRecording ? (
                <svg
                  className="w-10 h-10"
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
                  className="w-10 h-10"
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
                <p className="text-red-400 font-bold uppercase tracking-widest text-xs">
                  Recording
                </p>
                <p className="text-5xl font-mono text-white font-bold">
                  {formatTime(recordingTime)}
                </p>
              </div>
            ) : isTranscribing ? (
              <div className="space-y-3">
                <p className="text-lime-400 font-medium flex items-center justify-center gap-2 text-base">
                  <div className="w-5 h-5 border-4 border-lime-400 border-t-transparent rounded-full animate-spin" />
                  Analyzing Audio...
                </p>
                <p className="text-slate-400 text-sm italic">
                  Processing your voice
                </p>
              </div>
            ) : (
              <p className="text-slate-300 font-medium text-base">
                Click to start transcribing
              </p>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="glass-card rounded-3xl shadow-2xl border-white/10 overflow-hidden min-h-[300px] flex flex-col bg-slate-900/60 backdrop-blur-md">
          <div className="px-6 py-4 bg-slate-900/70 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-semibold text-white text-lg">Transcription Result</h3>
            {transcription && (
              <button
                onClick={() => navigator.clipboard.writeText(transcription)}
                className="text-xs text-lime-400 hover:text-lime-300 font-medium flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10 border border-lime-500/20 hover:border-lime-500/40"
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

          <div className="flex-grow p-6">
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
                  className="w-20 h-20 mb-4 opacity-30 text-slate-500"
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
                <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
                <div className="h-4 bg-slate-700/50 rounded w-full"></div>
                <div className="h-4 bg-slate-700/50 rounded w-5/6"></div>
              </div>
            )}

            {transcription && !isTranscribing && (
              <div className="prose prose-invert max-w-none text-slate-100 leading-relaxed whitespace-pre-wrap text-base">
                {transcription}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-lime-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[140px]" />
      </div>
    </div>
  );
};

export default TranscriptionTool;
