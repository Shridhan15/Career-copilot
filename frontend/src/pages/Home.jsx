import React from "react";
import { ArrowRight, FileText, Map, Mic, Target } from "lucide-react";

export default function Home({ setActivePage, analysisData, targetRole }) {
  const hasAnalysis = !!analysisData;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Welcome back, Shridhan
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Accelerate your progression through state-driven multi-agent career
          tracking.
        </p>
      </div>

      {/* Overview Analytics row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Active Goal
          </span>
          <div className="flex items-center gap-2 mt-1.5 text-slate-800 font-bold">
            <Target className="w-4 h-4 text-blue-600" />
            <span>{targetRole || "Not Selected Yet"}</span>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Match Readiness Score
          </span>
          <div className="text-xl font-extrabold text-slate-900 mt-1">
            {hasAnalysis ? `${analysisData.readiness_score}%` : "---"}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Interview Status
          </span>
          <div className="text-sm font-semibold text-slate-600 mt-1.5">
            0 Sessions Completed
          </div>
        </div>
      </div>

      {/* Modular Feature Action Cards */}
      <div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
          Core Toolkits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Profile Scan */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between group">
            <div>
              <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600 w-fit mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-slate-900">
                Comprehensive Profile Audit
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Upload your engineering resume to execute deep multi-agent
                extraction, gap tracking, and chronological roadmapping.
              </p>
            </div>
            <button
              onClick={() => setActivePage("scan")}
              className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors cursor-pointer"
            >
              <span>
                {hasAnalysis ? "View Audit Results" : "Initialize Scan"}
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Card 2: Roadmap Generation */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between group">
            <div>
              <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600 w-fit mb-4">
                <Map className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-slate-900">
                Personalized Roadmap
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Generate tailored monthly learning timelines and micro-projects
                explicitly tuned to bridge critical knowledge gaps.
              </p>
            </div>
            <button
              onClick={() => setActivePage("roadmap")}
              className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 transition-colors cursor-pointer"
            >
              <span>
                {hasAnalysis ? "View Curriculum" : "Build Custom Roadmap"}
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Card 3: Interview Prep */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between group opacity-75">
            <div>
              <div className="bg-amber-50 p-2.5 rounded-xl text-amber-600 w-fit mb-4">
                <Mic className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-slate-900">
                Dynamic Interview Coaching
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Engage in an interactive mock technical screening loop to
                stress-test skills acquired across your active roadmap.
              </p>
            </div>
            <button
              onClick={() => setActivePage("interview")}
              className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-amber-600 group-hover:text-amber-700 transition-colors cursor-pointer"
            >
              <span>Launch Prep Module</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
