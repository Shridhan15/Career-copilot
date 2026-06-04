import React, { useState } from "react";
import { FileText, UploadCloud, Sparkles } from "lucide-react";

export default function UploadProfile({ onAnalysisComplete }) {
  // Local state managed entirely within this page
  const [rawText, setRawText] = useState("");
  const [targetRole, setTargetRole] = useState("AI Engineer");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyzeResume = async (e) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume_text: rawText, target_role: targetRole }),
      });

      if (!response.ok) throw new Error("Failed to analyze profile");
      const data = await response.json();

      // Pass the real data up to App.jsx to change the page
      onAnalysisComplete(data, targetRole);
    } catch (err) {
      console.error(err);
      setError("Our agents encountered an issue. Please try again.");
      setIsAnalyzing(false);
    }
  };

  // If loading, show the full-page loading state instead of the form
  if (isAnalyzing) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[400px] animate-pulse max-w-2xl mx-auto shadow-sm">
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4 animate-bounce">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900">Agents At Work</h3>
        <p className="text-sm text-slate-500 max-w-sm mt-1 mx-auto">
          Cross-referencing parsed resume skills with industry expectations and
          compiling granular skill metrics...
        </p>
      </div>
    );
  }

  // Otherwise, show the input form
  return (
    <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Initialize Profile Analysis
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Select your target career destination and paste your profile metrics
          to let the multi-agent framework extract competencies.
        </p>
      </div>

      <form onSubmit={handleAnalyzeResume} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Select Dream Goal
          </label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          >
            <option value="AI Engineer">AI Engineer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Cloud Architect">Cloud Architect</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Paste Resume Raw Text
          </label>
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Paste your skills, academic histories, and deployment details here..."
            className="w-full h-64 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none placeholder-slate-400 font-mono text-xs"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!rawText.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium rounded-xl py-3.5 text-sm transition-all shadow-sm shadow-blue-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Run Gap Analysis</span>
        </button>
      </form>
    </div>
  );
}
