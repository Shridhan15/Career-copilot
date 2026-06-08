import React from "react";
import { Home, FileSearch, Map, Mic, Sparkles } from "lucide-react";

export default function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    { id: "home", label: "Dashboard Home", icon: Home },
    { id: "scan", label: "Profile Scan", icon: FileSearch },
    { id: "roadmap", label: "Career Roadmap", icon: Map },
    { id: "interview", label: "Interview Prep", icon: Mic },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-[calc(100vh-4rem)] sticky top-16 flex flex-col justify-between p-4">
      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-blue-50 text-blue-700 shadow-sm shadow-blue-100/50"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mini CTA Footer Banner inside Sidebar */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 text-center">
        <div className="flex items-center justify-center gap-1.5 text-blue-600 font-bold text-[10px] uppercase tracking-wider mb-1">
          <Sparkles className="w-3 h-3" /> Copilot Active
        </div>
        <p className="text-[11px] text-slate-400 leading-normal">
          Ready to guide your next growth sprint.
        </p>
      </div>
    </aside>
  );
}
