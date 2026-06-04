import React from "react";
import { Sparkles, Target } from "lucide-react";

export default function Navbar({ targetRole }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-sm shadow-blue-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            CareerCopilot<span className="text-blue-600">.ai</span>
          </span>
        </div>

        {targetRole && (
          <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60 text-sm font-medium text-slate-600">
            <Target className="w-4 h-4 text-slate-500" />
            <span>Target: {targetRole}</span>
          </div>
        )}
      </div>
    </header>
  );
}
