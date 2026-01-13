import React, { useRef, useEffect } from "react";
import { SYSTEM_INSTRUCTION } from "../../configs/system-instruction-config.ts";
import { useVoiceAgent, SessionStatus } from "../../lib";
import Visualizer from "../components/Visualizer";

const VoiceAgent: React.FC = () => {
  const { status, messages, isAssistantTalking, start, stop } = useVoiceAgent({
    apiKey: process.env.GEMINI_API_KEY || "",
    systemInstruction: SYSTEM_INSTRUCTION || "",
    voiceName: "Kore",
  });

  // Scroll to bottom of messages
  const messageEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleStartSession = async () => {
    await start();
  };

  const handleEndSession = () => {
    stop();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-200">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/10 glass-card sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-lime-500 rounded-full flex items-center justify-center font-bold text-slate-900 italic">
            AI
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight">AI VOICE AGENT</h1>
            <p className="text-xs text-lime-400 font-semibold tracking-widest uppercase">
              Demo Application
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              status === SessionStatus.ACTIVE
                ? "bg-lime-500 animate-pulse"
                : "bg-slate-600"
            }`}
          />
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {status === SessionStatus.ACTIVE ? "Online" : "Offline"}
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4 md:p-8">
        {/* Intro Message */}
        {messages.length === 0 && status === SessionStatus.IDLE && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-24 h-24 bg-slate-900 rounded-2xl flex items-center justify-center border border-white/10">
              <svg
                className="w-12 h-12 text-lime-400"
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
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight">
                AI Voice Chat Demo
              </h2>
              <p className="text-slate-400 max-w-md mx-auto">
                This is a demo application showing how to integrate the AI Voice
                Agent library into your React application. Click the button
                below to start a conversation.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                {
                  title: "Easy Integration",
                  desc: "Simple React hook API",
                  icon: "⚡",
                },
                {
                  title: "Customizable",
                  desc: "Change prompts easily",
                  icon: "🎨",
                },
                {
                  title: "Voice Enabled",
                  desc: "Real-time audio",
                  icon: "🎤",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card p-4 rounded-xl text-left border-l-2 border-l-lime-500/50"
                >
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="font-bold text-sm">{item.title}</div>
                  <div className="text-xs text-slate-400">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat Log */}
        <div className="flex-1 overflow-y-auto space-y-6 mb-8 scrollbar-hide">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              } animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === "user"
                    ? "bg-lime-500 text-slate-950 font-semibold"
                    : "glass-card border-white/5 text-slate-200"
                }`}
              >
                <div className="text-xs opacity-50 mb-1 flex justify-between gap-4">
                  <span>{msg.role === "user" ? "You" : "Assistant"}</span>
                  <span>
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        {/* Action Center (Sticky Bottom) */}
        <div className="sticky bottom-0 pb-8 pt-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
          <div className="glass-card rounded-3xl p-6 shadow-2xl border-white/10 flex flex-col items-center gap-6">
            <Visualizer
              isActive={status === SessionStatus.ACTIVE}
              isModelTalking={isAssistantTalking}
            />

            <div className="flex items-center gap-4">
              {status === SessionStatus.ACTIVE ? (
                <button
                  onClick={handleEndSession}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-2xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/20"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  End Session
                </button>
              ) : (
                <button
                  disabled={status === SessionStatus.CONNECTING}
                  onClick={handleStartSession}
                  className={`bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold px-10 py-5 rounded-2xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-lime-500/20 ${
                    status === SessionStatus.CONNECTING
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {status === SessionStatus.CONNECTING ? (
                    <>
                      <div className="w-5 h-5 border-4 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      Start Chat
                    </>
                  )}
                </button>
              )}
            </div>

            {status === SessionStatus.ACTIVE && !isAssistantTalking && (
              <p className="text-lime-400/80 text-sm font-medium animate-pulse">
                Listening...
              </p>
            )}
            {isAssistantTalking && (
              <p className="text-slate-400 text-sm font-medium">
                Assistant is speaking...
              </p>
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

export default VoiceAgent;
