import React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import MetricCard from "../MetricCard"; // Adjust path if necessary

export default function AnalysisDetails({ data }) {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Analytical Visual Topography */}
      <MetricCard score={data.readiness_score || 0} />

      {/* Extracted Existing Foundations */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          Verified Extracted Competencies
        </h3>
        <div className="flex flex-wrap gap-2">
          {data.extracted_profile?.skills?.map((skill, index) => (
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
            confidently pass production screening parameters for a{" "}
            <span className="font-bold text-slate-700">
              {data.target_role || "this"}
            </span>{" "}
            role.
          </p>
        </div>

        <div className="space-y-2 mt-4 ml-7">
          {data.skill_gaps?.map((gap, index) => (
            <div
              key={index}
              className="bg-amber-50/60 border border-amber-200/40 rounded-xl px-4 py-3 flex items-start gap-3"
            >
              <div className="bg-amber-100 p-1 rounded-lg text-amber-600 mt-0.5 shrink-0">
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
