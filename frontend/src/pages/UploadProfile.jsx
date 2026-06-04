import React from "react";
import { FileText, UploadCloud } from "lucide-react";

export default function UploadProfile({
  rawText,
  setRawText,
  targetRole,
  setTargetRole,
  onAnalyze,
  isAnalyzing,
}) {
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

      <form onSubmit={onAnalyze} className="space-y-6">
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

        <button
          type="submit"
          disabled={isAnalyzing || !rawText.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium rounded-xl py-3.5 text-sm transition-all shadow-sm shadow-blue-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isAnalyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
              <span>Agents Processing Structural Gaps...</span>
            </>
          ) : (
            <>
              <UploadCloud className="w-4 h-4" />
              <span>Run Gap Analysis</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
