import React from "react";
import { Calendar, ChevronRight, Activity } from "lucide-react";

export default function AnalysisHistoryList({ history, onViewDetails }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-slate-500" />
        Previous Analyses
      </h2>

      <div className="space-y-3">
        {history.map((analysis, index) => (
          <div
            key={index}
            onClick={() => onViewDetails(analysis)}
            className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-slate-50 p-3 rounded-xl text-slate-500 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    {analysis.target_role || "Unknown Role"}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {/* Dynamically format the date from MongoDB */}
                    {analysis.timestamp
                      ? new Date(analysis.timestamp).toLocaleDateString()
                      : "Recent"}{" "}
                    • Readiness Score:{" "}
                    <span className="font-semibold text-slate-700">
                      {analysis.readiness_score}%
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}
