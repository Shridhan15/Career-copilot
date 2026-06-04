import React, { useState } from "react";
import Navbar from "./components/Navbar";
import UploadProfile from "./pages/UploadProfile";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [currentView, setCurrentView] = useState("upload"); // 'upload' | 'dashboard'

  // App.jsx only holds the final results to pass to the Dashboard
  const [analysisData, setAnalysisData] = useState(null);
  const [globalTargetRole, setGlobalTargetRole] = useState("");

  // This function is passed to the Upload page.
  // The Upload page calls this when the API returns successfully.
  const handleAnalysisSuccess = (data, role) => {
    setAnalysisData(data);
    setGlobalTargetRole(role);
    setCurrentView("dashboard");
  };

  const handleReset = () => {
    setAnalysisData(null);
    setCurrentView("upload");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <Navbar
        targetRole={currentView === "dashboard" ? globalTargetRole : null}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {currentView === "upload" && (
          <UploadProfile onAnalysisComplete={handleAnalysisSuccess} />
        )}

        {currentView === "dashboard" && analysisData && (
          <Dashboard
            analysisData={analysisData}
            targetRole={globalTargetRole}
            onBack={handleReset}
          />
        )}
      </main>
    </div>
  );
}
