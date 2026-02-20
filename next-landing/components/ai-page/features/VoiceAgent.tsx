"use client";

import React, { useRef, useEffect } from "react";
import { SYSTEM_INSTRUCTION } from "@/lib/ai-page/configs/system-instruction-config";
import { useVoiceAgent, SessionStatus } from "@/lib/ai-page/voice-agent";
import Visualizer from "@/components/ai-page/Visualizer";

const VoiceAgent: React.FC = () => {
  const { status, messages, isAssistantTalking, start, stop } = useVoiceAgent({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
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
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4 md:p-6 lg:p-8 pt-28 md:pt-32 relative z-10 pb-8">
        {/* Intro Message */}
        {messages.length === 0 && status === SessionStatus.IDLE && (
          <div className="flex flex-col items-center justify-center text-center space-y-6 py-8 md:py-12">
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
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight">
                AI Voice Chat Demo
              </h2>
              <p className="text-slate-600 max-w-md mx-auto">
                This is a demo application showing how to integrate the AI Voice
                Agent library into your React application. Click the button
                below to start a conversation.
              </p>
            </div>
          </div>
        )}

        {/* Chat Log */}
        <div className="flex-1 overflow-y-auto space-y-4 md:space-y-6 mb-6 md:mb-8 scrollbar-hide max-h-[60vh]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              } animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`max-w-[80%] rounded-xl p-4 ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg"
                    : "bg-white border border-slate-200 text-slate-900 shadow-sm"
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
        <div className="sticky bottom-0 pb-4 md:pb-8 pt-4 bg-gradient-to-t from-white via-white/80 to-transparent">
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-slate-200 flex flex-col items-center gap-4 md:gap-6">
            <Visualizer
              isActive={status === SessionStatus.ACTIVE}
              isModelTalking={isAssistantTalking}
            />

            <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
              {status === SessionStatus.ACTIVE ? (
                <button
                  onClick={handleEndSession}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/20 text-sm md:text-base w-full sm:w-auto"
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
                  className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 md:px-10 py-4 md:py-5 rounded-lg flex items-center justify-center gap-2 md:gap-3 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20 text-sm md:text-base w-full sm:w-auto ${
                    status === SessionStatus.CONNECTING
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {status === SessionStatus.CONNECTING ? (
                    <>
                      <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
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
              <p className="text-blue-600 text-sm font-medium animate-pulse">
                Listening...
              </p>
            )}
            {isAssistantTalking && (
              <p className="text-slate-600 text-sm font-medium">
                Assistant is speaking...
              </p>
            )}
          </div>
        </div>
      </main>

    </div>
  );
};

export default VoiceAgent;
