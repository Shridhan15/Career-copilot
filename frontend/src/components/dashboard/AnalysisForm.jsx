import React, { useState } from "react";
import { Loader2, Sparkles, Target, FileText } from "lucide-react";

export default function AnalysisForm({ onAnalyze, isAnalyzing }) {
  const [targetRole, setTargetRole] = useState("");
  const [resumeText, setResumeText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumeText.trim() || !targetRole.trim()) {
      alert("Please provide both your resume and a target role.");
      return;
    }
    onAnalyze(targetRole, resumeText);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6"
    >
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-500" /> Target Role
        </label>
        <select
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all cursor-pointer text-slate-700"
        >
          <option value="" disabled>
            Select your target role...
          </option>
          <option value="AI Engineer">AI Engineer</option>
          <option value="Cloud Architect">Cloud Architect</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-500" /> Current Resume / Skills
        </label>
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your resume text or a comma-separated list of your current skills here..."
          rows={5}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isAnalyzing}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-blue-200"
      >
        {isAnalyzing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Sparkles className="w-5 h-5" />
        )}
        {isAnalyzing
          ? "Multi-Agent Analysis in Progress..."
          : "Run AI Gap Analysis"}
      </button>
    </form>
  );
}
