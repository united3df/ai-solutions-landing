"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCSVGeneration } from "@/lib/ai-page/csv";
import { DataTable } from "@/components/ai-page/DataTable";

const CSVGenerator: React.FC = () => {
  const { messages, isLoading, generateData } = useCSVGeneration({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
  });

  const [prompt, setPrompt] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    await generateData(prompt);
    setPrompt("");
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
      <main className="flex-1 flex flex-col mt-4 max-w-4xl mx-auto w-full p-4 md:p-6 lg:p-8 pt-28 md:pt-32 relative z-10 pb-8">
        {/* Intro Message */}
        {messages.length === 0 && !isLoading && (
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
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight">
                CSV Data Generator
              </h2>
              <p className="text-slate-600 max-w-md mx-auto">
                Describe any data set or list you need. I'll generate it instantly
                and let you export it to CSV.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
              {[
                "10 fictional space explorers with their home planet and specialty",
                "Comparison of popular programming languages with release year",
                "Top 15 healthy breakfast ideas with main ingredients",
                "Historical events of the 20th century with dates",
              ].map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(example)}
                  className="px-4 py-2 bg-white hover:bg-blue-50 text-slate-700 text-sm rounded-full transition-all border border-slate-200 hover:border-blue-300 hover:shadow-md"
                >
                  {example}
                </button>
              ))}
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
                </div>
                <p className="leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
                {msg.table && (
                  <div className="mt-4">
                    <DataTable data={msg.table} />
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 text-slate-600 rounded-xl rounded-tl-none px-6 py-4 flex items-center gap-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                </div>
                <span className="text-sm font-medium">
                  Analyzing and generating data...
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Action Center (Sticky Bottom) */}
        <div className="sticky bottom-0 pb-4 md:pb-8 pt-4 bg-gradient-to-t from-white via-white/80 to-transparent">
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-slate-200">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="What data would you like to generate today?"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg py-3 md:py-4 px-4 md:px-6 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm md:text-base"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20 text-sm md:text-base ${
                  isLoading || !prompt.trim()
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                    Generate
                  </>
                )}
              </button>
            </form>
            <p className="text-center text-[10px] text-slate-400 mt-3 uppercase tracking-widest font-semibold">
              Instant CSV Export
            </p>
          </div>
        </div>
      </main>

    </div>
  );
};

export default CSVGenerator;
