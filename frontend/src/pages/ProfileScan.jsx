import React, { useState } from "react";
import {
  FileText,
  UploadCloud,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import MetricCard from "../components/MetricCard";

export default function ProfileScan({
  analysisData,
  setAnalysisData,
  setGlobalTargetRole,
}) {
  const [rawText, setRawText] = useState("");
  const [targetRole, setTargetRole] = useState("AI Engineer");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiError, setApiError] = useState(null);

  const triggerAnalysis = async (e) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    setIsAnalyzing(true);
    setApiError(null);

    try {
      // 🚀 Actual Live API Pipeline Execution
      const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume_text: rawText,
          target_role: targetRole,
        }),
      });

      if (!response.ok) {
        const errorDetail = await response.json().catch(() => ({}));
        throw new Error(
          errorDetail.detail || "Failed to analyze profile mapping.",
        );
      }

      const data = await response.json();

      // Synchronize state down to parent provider (App.jsx memory)
      setAnalysisData(data);
      setGlobalTargetRole(targetRole);
    } catch (err) {
      console.error("API Communication Fault:", err);
      setApiError(err.message || "Unable to connect to the AI engine backend.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[380px] max-w-2xl mx-auto animate-pulse shadow-sm">
        <Sparkles className="w-10 h-10 text-blue-600 animate-bounce mb-3" />
        <h3 className="text-base font-bold text-slate-900">
          Agents Conducting Core Profile Audit
        </h3>
        <p className="text-xs text-slate-400 max-w-sm mt-1">
          Parsing textual skills, assessing role constraints, and building
          dependency models...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {!analysisData ? (
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-lg text-slate-900">
              Run Automated Resume Audit
            </h3>
          </div>

          <form onSubmit={triggerAnalysis} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Target Milestone
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              >
                <option value="AI Engineer">AI Engineer</option>
                <option value="Cloud Architect">Cloud Architect</option>
                <option value="Full Stack Developer">
                  Full Stack Developer
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Raw Text Dump
              </label>
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste resume payload contents here..."
                className="w-full h-60 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono resize-none focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
            </div>

            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-600 font-medium text-xs px-4 py-3 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{apiError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!rawText.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-medium text-sm py-3 rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <UploadCloud className="w-4 h-4" /> Run Profile Scan
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              Profile Audit Report
            </h2>
            <button
              onClick={() => setAnalysisData(null)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              Re-upload Profile
            </button>
          </div>

          <MetricCard score={analysisData.readiness_score} />

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Aligned Role
              Assets
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {analysisData.extracted_profile?.skills?.length > 0 ? (
                analysisData.extracted_profile.skills.map((s, i) => (
                  <span
                    key={i}
                    className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium text-xs px-2.5 py-1 rounded-lg"
                  >
                    {s}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400 italic">
                  No matching skills detected for this target milestone.
                </span>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-500" /> Core Knowledge
              Gaps
            </h4>
            <div className="space-y-1.5">
              {analysisData.skill_gaps?.map((g, i) => (
                <div
                  key={i}
                  className="bg-slate-50 text-slate-700 border border-slate-200/60 rounded-xl px-3 py-2 text-xs font-medium"
                >
                  {g}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
