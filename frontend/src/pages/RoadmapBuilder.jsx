import React, { useState } from "react";
import { Map, Calendar, BookOpen, Layers, Sparkles } from "lucide-react";

export default function RoadmapBuilder({
  analysisData,
  setAnalysisData,
  globalTargetRole,
  setGlobalTargetRole,
}) {
  const [roleInput, setRoleInput] = useState("AI Engineer");
  const [skillsInput, setSkillsInput] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);

  const activeRoadmap = analysisData?.active_roadmap;

  const buildDirectRoadmap = (e) => {
    e.preventDefault();
    if (!skillsInput.trim()) return;
    setIsBuilding(true);

    // Mock/Real Direct Endpoint Hook Simulation
    setTimeout(() => {
      const mockDirect = {
        readiness_score: 40.0,
        extracted_profile: {
          skills: skillsInput.split(",").map((s) => s.trim()),
        },
        skill_gaps: ["Manual Path Bridging Target Module"],
        active_roadmap: {
          "Month 1 (Direct)": [
            {
              topic: "Accelerated Custom Node",
              resources: ["Official Specs"],
              suggested_project: "Build custom platform adapter",
            },
          ],
        },
      };
      setAnalysisData(mockDirect);
      setGlobalTargetRole(roleInput);
      setIsBuilding(false);
    }, 1500);
  };

  if (isBuilding) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[380px] max-w-2xl mx-auto animate-pulse shadow-sm">
        <Sparkles className="w-10 h-10 text-emerald-600 animate-spin mb-3" />
        <h3 className="text-base font-bold text-slate-900">
          Compiling Custom Learning Schema
        </h3>
        <p className="text-xs text-slate-400 max-w-sm mt-1">
          Structuring dynamic dependency clusters and planning target
          micro-projects...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {!activeRoadmap ? (
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Map className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-lg text-slate-900">
              Direct Roadmap Builder (Path B)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-4 leading-normal">
            Skip the profile document parser entirely. Explicitly declare your
            dream role along with your known technical skills to build a direct
            syllabus.
          </p>

          <form onSubmit={buildDirectRoadmap} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Target Destination
              </label>
              <select
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20"
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
                Your Known Skills (Comma Separated)
              </label>
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="e.g., Python, JavaScript, Git, SQL"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <button
              type="submit"
              disabled={!skillsInput.trim()}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 text-white font-medium text-sm py-3 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Generate Timeline Immediately
            </button>
          </form>
        </div>
      ) : (
        /* Render Active Roadmap Visual Elements */
        <div className="space-y-8 py-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Active Learning Pipeline
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Target Destination: {globalTargetRole}
              </p>
            </div>
            <button
              onClick={() => setAnalysisData(null)}
              className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors cursor-pointer"
            >
              Wipe and Build Fresh Path
            </button>
          </div>

          <div className="space-y-10 pl-2">
            {Object.keys(activeRoadmap).map((monthKey) => (
              <div
                key={monthKey}
                className="relative pl-8 border-l-2 border-blue-100 last:border-l-0 ml-4"
              >
                <div className="absolute -left-3.5 top-0 bg-blue-600 text-white p-1.5 rounded-xl border-4 border-slate-50 shadow-sm shadow-blue-200">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-900">
                    {monthKey}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeRoadmap[monthKey]?.map((module, mIdx) => (
                    <div
                      key={mIdx}
                      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-4 h-4 text-slate-400" />
                          <h4 className="font-bold text-sm text-slate-800">
                            {module.topic}
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {module.resources?.map((r, ri) => (
                            <span
                              key={ri}
                              className="bg-slate-50 text-slate-600 border border-slate-200 rounded px-2 py-0.5 text-[11px] font-mono"
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                        <span className="flex items-center gap-1 text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-1">
                          <Layers className="w-3 h-3" /> Target Application Goal
                        </span>
                        <p className="text-xs font-medium text-slate-600 leading-relaxed">
                          {module.suggested_project}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
