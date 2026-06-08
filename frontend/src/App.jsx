import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import ProfileScan from "./pages/ProfileScan";
import RoadmapBuilder from "./pages/RoadmapBuilder";
import InterviewPrep from "./pages/InterviewPrep";

export default function App() {
  const [activePage, setActivePage] = useState("home"); // Views: 'home' | 'scan' | 'roadmap' | 'interview'

  // High-Level global states passed to specific page child nodes
  const [analysisData, setAnalysisData] = useState(null);
  const [globalTargetRole, setGlobalTargetRole] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <Navbar targetRole={analysisData ? globalTargetRole : null} />

      <div className="flex max-w-7xl mx-auto">
        {/* Left Hand Navigation Engine */}
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        {/* Central Workspace Viewport Panel Routing */}
        <main className="flex-1 px-8 py-10 overflow-y-auto">
          {activePage === "home" && (
            <Home
              setActivePage={setActivePage}
              analysisData={analysisData}
              targetRole={globalTargetRole}
            />
          )}

          {activePage === "scan" && (
            <ProfileScan
              analysisData={analysisData}
              setAnalysisData={setAnalysisData}
              setGlobalTargetRole={setGlobalTargetRole}
            />
          )}

          {activePage === "roadmap" && (
            <RoadmapBuilder
              analysisData={analysisData}
              setAnalysisData={setAnalysisData}
              globalTargetRole={globalTargetRole}
              setGlobalTargetRole={setGlobalTargetRole}
            />
          )}

          {activePage === "interview" && <InterviewPrep />}
        </main>
      </div>
    </div>
  );
}
