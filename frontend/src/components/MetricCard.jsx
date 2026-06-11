import React from "react";
import { TrendingUp, TrendingDown, ArrowRight, Sparkles } from "lucide-react";

export default function MetricCard({ score }) {
  // Helper function to dynamically set the UI based on the score threshold
  const getStatus = (currentScore) => {
    if (currentScore >= 80) {
      return {
        text: "Highly Qualified",
        color: "text-emerald-600",
        Icon: Sparkles,
      };
    } else if (currentScore >= 50) {
      return {
        text: "Developing Match",
        color: "text-amber-500",
        Icon: ArrowRight,
      };
    } else {
      return {
        text: "Needs Foundation",
        color: "text-rose-500",
        Icon: TrendingDown,
      };
    }
  };

  // Extract the dynamic properties
  const { text, color, Icon } = getStatus(score);

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
          {/* Dynamically apply the color, icon, and text */}
          <span
            className={`text-sm font-medium flex items-center gap-1 ${color}`}
          >
            <Icon className="w-4 h-4" /> {text}
          </span>
        </div>
      </div>

      {/* Visual Ring */}
      <div className="w-16 h-16 rounded-full bg-slate-50 border-4 border-blue-600 border-r-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shadow-inner">
        {Math.floor(score)}%
      </div>
    </div>
  );
}
