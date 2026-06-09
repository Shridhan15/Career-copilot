import React from "react";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

export default function EducationSection({
  educationList,
  onChange,
  onAdd,
  onRemove,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-emerald-600" />
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Education History
          </h2>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Degree
        </button>
      </div>

      <div className="p-6 space-y-8">
        {educationList.map((edu, index) => (
          <div key={edu.id} className="relative group">
            {/* Delete Button (Shows on hover if there is more than 1 entry) */}
            {educationList.length > 1 && (
              <button
                type="button"
                onClick={() => onRemove(edu.id)}
                className="absolute -right-2 -top-2 bg-red-50 text-red-500 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-red-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Institution / University
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) =>
                    onChange(edu.id, "institution", e.target.value)
                  }
                  placeholder="e.g., Vellore Institute of Technology"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Degree & Stream
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => onChange(edu.id, "degree", e.target.value)}
                  placeholder="e.g., B.Tech CSE"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Start Year
                  </label>
                  <input
                    type="text"
                    value={edu.startYear}
                    onChange={(e) =>
                      onChange(edu.id, "startYear", e.target.value)
                    }
                    placeholder="YYYY"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    End Year
                  </label>
                  <input
                    type="text"
                    value={edu.endYear}
                    onChange={(e) =>
                      onChange(edu.id, "endYear", e.target.value)
                    }
                    placeholder="YYYY or Present"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Visual Divider between multiple degrees */}
            {index < educationList.length - 1 && (
              <hr className="mt-8 border-slate-100" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
