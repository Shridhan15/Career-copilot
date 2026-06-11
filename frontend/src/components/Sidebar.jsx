import React from "react";
import { NavLink } from "react-router-dom";
import { Home, PlusCircle, Map, Video } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "New Analysis", path: "/analyze", icon: PlusCircle },
    { name: "Active Roadmap", path: "/roadmap", icon: Map },
    { name: "Mock Interviews", path: "/interview", icon: Video },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-[calc(100vh-4rem)] sticky top-16 hidden md:flex flex-col shrink-0">
      <div className="p-4 flex-1">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">
          Main Menu
        </div>
        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-500 border border-slate-100 text-center">
          CareerCopilot.ai 1.0
        </div>
      </div>
    </aside>
  );
}
