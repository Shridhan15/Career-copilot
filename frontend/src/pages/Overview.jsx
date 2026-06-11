import React, { useState, useEffect } from "react";
import { Loader2, TrendingUp, Target, Activity } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import AnalysisHistoryList from "../components/dashboard/AnalysisHistoryList";
import AnalysisModal from "../components/dashboard/AnalysisModal";
import LandingPage from "../components/dashboard/LandingPage";

export default function Overview() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [isFetchingInitial, setIsFetchingInitial] = useState(true);
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
          const historyArray = await response.json();
          if (historyArray.length > 0) {
            setAnalysisHistory(historyArray);
          }
        }
      } catch (error) {
        console.error("No previous data found.");
      } finally {
        setIsFetchingInitial(false);
      }
    };

    fetchExistingData();
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded || isFetchingInitial) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-600" />
        <p className="font-medium">Loading your dashboard...</p>
      </div>
    );
  }

  if (!isSignedIn) return <LandingPage />;

  const latestScore =
    analysisHistory.length > 0 ? analysisHistory[0].readiness_score : 0;
  const totalAnalyses = analysisHistory.length;

  return (
    <div className="max-w-5xl mx-auto py-8 animate-fade-in">
      {/* Modern Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {user.firstName || "Shridhan"} 👋
          </h1>
          <p className="text-slate-500 mt-1">
            Here is a snapshot of your career trajectory.
          </p>
        </div>
        <Link
          to="/analyze"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 w-fit"
        >
          Run New Analysis
        </Link>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Latest Score
            </p>
            <h2 className="text-3xl font-black text-slate-900">
              {latestScore}%
            </h2>
          </div>
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Total Scans
            </p>
            <h2 className="text-3xl font-black text-slate-900">
              {totalAnalyses}
            </h2>
          </div>
          <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Current Target
            </p>
            <h2 className="text-lg font-bold text-slate-900 mt-1 line-clamp-1">
              {analysisHistory.length > 0
                ? analysisHistory[0].target_role
                : "None Set"}
            </h2>
          </div>
          <div className="bg-purple-50 text-purple-600 p-3 rounded-xl">
            <Target className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        {analysisHistory.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <Target className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p>You haven't run any career analyses yet.</p>
          </div>
        ) : (
          <AnalysisHistoryList
            history={analysisHistory}
            onViewDetails={setSelectedAnalysis}
          />
        )}
      </div>

      {/* Modal Overlay */}
      <AnalysisModal
        isOpen={!!selectedAnalysis}
        data={selectedAnalysis}
        onClose={() => setSelectedAnalysis(null)}
      />
    </div>
  );
}
