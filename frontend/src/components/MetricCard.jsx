import React from "react";
import { TrendingUp } from "lucide-react";

export default function MetricCard({ score }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Target Role Match Index
        </h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {score}%
          </span>
          <span className="text-sm font-medium text-emerald-600 flex items-center gap-0.5">
            <TrendingUp className="w-3.5 h-3.5" /> Baseline Set
          </span>
        </div>
      </div>
      <div className="w-16 h-16 rounded-full bg-slate-50 border-4 border-blue-600 border-r-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shadow-inner">
        {Math.floor(score)}%
      </div>
    </div>
  );
}
