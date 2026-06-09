import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

// Import our new components
import AnalysisForm from "../components/dashboard/AnalysisForm";
import AnalysisHistoryList from "../components/dashboard/AnalysisHistoryList";
import AnalysisModal from "../components/dashboard/AnalysisModal";
import LandingPage from "../components/dashboard/LandingPage";

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();

  // State Management
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [isFetchingInitial, setIsFetchingInitial] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Modal State
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      setIsFetchingInitial(false);
      return;
    }

    const fetchExistingData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/user/${user.id}/state`,
        );
        if (response.ok) {
          // The backend now returns a true array of history!
          const historyArray = await response.json();
          console.log("Raw history data from backend:", historyArray);

          if (historyArray.length > 0) {
            setAnalysisHistory(historyArray);
            console.log("Fetched existing analysis history:", historyArray);
          }
        }
      } catch (error) {
        console.log("No previous data found.");
      } finally {
        setIsFetchingInitial(false);
      }
    };

    fetchExistingData();
  }, [isLoaded, isSignedIn, user]);

  const handleAnalyze = async (targetRole, resumeText) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          resume_text: resumeText,
          target_role: targetRole,
        }),
      });

      if (!response.ok) throw new Error("Analysis failed");
      const data = await response.json();

      // Add the new analysis to the top of the history list
      setAnalysisHistory((prev) => [data, ...prev]);

      // Automatically open the modal to show the new results
      setSelectedAnalysis(data);
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // State 1: Loading
  if (!isLoaded || isFetchingInitial) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-600" />
        <p className="font-medium">Loading workspace...</p>
      </div>
    );
  }

  // State 2: Logged Out Landing Page (Keep your existing landing page code here)
  if (!isSignedIn) {
    return <LandingPage />;
  }

  // State 3: Logged In Dashboard
  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          New Analysis
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Run a fresh multi-agent scan to update your current trajectory.
        </p>
      </div>

      {/* 1. The Persistent Form */}
      <AnalysisForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

      {/* 2. The History List */}
      <AnalysisHistoryList
        history={analysisHistory}
        onViewDetails={setSelectedAnalysis}
      />

      {/* 3. The Modal Overlay */}
      <AnalysisModal
        isOpen={!!selectedAnalysis}
        data={selectedAnalysis}
        onClose={() => setSelectedAnalysis(null)}
      />
    </div>
  );
}
