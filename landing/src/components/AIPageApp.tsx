import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "../../../ai-page/src/components/Navigation";
import CSVGenerator from "../../../ai-page/src/features/CSVGenerator";
import TranscriptionTool from "../../../ai-page/src/features/TranscriptionTool";
import VoiceAgent from "../../../ai-page/src/features/VoiceAgent";

export function AIPageApp() {
  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="csv" replace />} />
        <Route path="csv" element={<CSVGenerator />} />
        <Route path="transcribe" element={<TranscriptionTool />} />
        <Route path="voice-agent" element={<VoiceAgent />} />
      </Routes>
    </div>
  );
}
