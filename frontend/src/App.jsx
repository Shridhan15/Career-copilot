import React, { useState } from "react";
import Navbar from "./components/Navbar";
import UploadProfile from "./pages/UploadProfile";
import Dashboard from "./pages/Dashboard";
import { Sparkles } from "lucide-react";

export default function App() {
  const [currentView, setCurrentView] = useState("upload"); // Views: 'upload' | 'loading' | 'dashboard'
  const [rawText, setRawText] = useState("");
  const [targetRole, setTargetRole] = useState("AI Engineer");
  const [analysisData, setAnalysisData] = useState(null);

  const handleAnalyzeResume = (e) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    setCurrentView("loading");

    // Simulating dynamic API payload extraction
    setTimeout(() => {
      setAnalysisData({
        readiness_score: 55.5,
        extracted_profile: {
          skills: ["Python", "React", "Node.js", "MongoDB", "REST APIs"],
        },
        skill_gaps: [
          "Deep Learning Frameworks (PyTorch/TensorFlow)",
          "Transformers & Attention Mechanisms",
          "Retrieval-Augmented Generation (RAG)",
          "MLOps & Model Deployment Pipelines",
        ],
      });
      setCurrentView("dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <Navbar targetRole={currentView === "dashboard" ? targetRole : null} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {currentView === "upload" && (
          <UploadProfile
            rawText={rawText}
            setRawText={setRawText}
            targetRole={targetRole}
            setTargetRole={setTargetRole}
            onAnalyze={handleAnalyzeResume}
            isAnalyzing={false}
          />
        )}

        {currentView === "loading" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[400px] animate-pulse max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4 animate-bounce">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Agents At Work
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mt-1 mx-auto">
              Cross-referencing parsed resume skills with industry expectations
              and compiling granular skill metrics...
            </p>
          </div>
        )}

        {currentView === "dashboard" && analysisData && (
          <Dashboard
            analysisData={analysisData}
            targetRole={targetRole}
            onBack={() => setCurrentView("upload")}
          />
        )}
      </main>
    </div>
  );
}
