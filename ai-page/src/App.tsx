import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import CSVGenerator from "./features/CSVGenerator";
import TranscriptionTool from "./features/TranscriptionTool";
import VoiceAgent from "./features/VoiceAgent";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <Routes>
            <Route path="/" element={<Navigate to="/csv" replace />} />
            <Route path="/csv" element={<CSVGenerator />} />
            <Route path="/transcribe" element={<TranscriptionTool />} />
            <Route path="/voice-agent" element={<VoiceAgent />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
