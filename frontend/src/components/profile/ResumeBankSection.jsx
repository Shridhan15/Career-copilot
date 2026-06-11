import React from "react";
import { FileText, Plus, Trash2 } from "lucide-react";

export default function ResumeBankSection({
  resumes,
  onChange,
  onAdd,
  onRemove,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" /> Resume Bank
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Save different versions of your resume text for quick AI analysis.
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium px-4 py-2 rounded-xl text-sm transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Resume
        </button>
      </div>

      <div className="space-y-6">
        {resumes.length === 0 ? (
          <div className="text-center py-6 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
            No resumes saved yet. Click "Add Resume" to create your first one.
          </div>
        ) : (
          resumes.map((resume, index) => (
            <div
              key={resume.id}
              className="p-4 border border-slate-200 rounded-xl bg-slate-50 relative group"
            >
              {/* Delete Button */}
              <button
                type="button"
                onClick={() => onRemove(resume.id)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                title="Delete Resume"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="space-y-4 pr-12">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Resume Title
                  </label>
                  <input
                    type="text"
                    value={resume.title}
                    onChange={(e) =>
                      onChange(resume.id, "title", e.target.value)
                    }
                    placeholder="e.g., AI Engineer V1, Full Stack Default..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Resume Content
                  </label>
                  <textarea
                    value={resume.content}
                    onChange={(e) =>
                      onChange(resume.id, "content", e.target.value)
                    }
                    placeholder="Paste the plain text of your resume here..."
                    rows={6}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
