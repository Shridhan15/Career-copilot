import React from "react";
import { CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import MetricCard from "../components/MetricCard";

export default function Dashboard({ analysisData, targetRole, onBack }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Navigation Controls */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Modify Input Profile</span>
      </button>

      {/* Analytical Visual Topography */}
      <MetricCard score={analysisData.readiness_score} />

      {/* Extracted Existing Foundations */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          Verified Extracted Competencies
        </h3>
        <div className="flex flex-wrap gap-2">
          {analysisData.extracted_profile?.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-medium text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Discovered Knowledge Faults */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="mb-1">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Identified Strategic Skill Gaps
          </h3>
          <p className="text-xs text-slate-500 ml-7">
            The multi-agent critic isolated these core fields required to
            confidently pass production screening parameters for a `{targetRole}
            ` role.
          </p>
        </div>

        <div className="space-y-2 mt-4 ml-7">
          {analysisData.skill_gaps.map((gap, index) => (
            <div
              key={index}
              className="bg-amber-50/60 border border-amber-200/40 rounded-xl px-4 py-3 flex items-start gap-3"
            >
              <div className="bg-amber-100 p-1 rounded-lg text-amber-600 mt-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-medium text-slate-700">{gap}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
