import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import AnalysisForm from "../components/dashboard/AnalysisForm";
import AnalysisModal from "../components/dashboard/AnalysisModal";

export default function NewAnalysis() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [newResult, setNewResult] = useState(null);

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

      // Pop open the modal immediately so they can see results
      setNewResult(data);
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCloseModal = () => {
    setNewResult(null);
    // After reviewing their new results, send them back to the dashboard home
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          AI Gap Analysis
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Provide your current assets and target trajectory to generate a
          strategic roadmap.
        </p>
      </div>

      <AnalysisForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

      <AnalysisModal
        isOpen={!!newResult}
        data={newResult}
        onClose={handleCloseModal}
      />
    </div>
  );
}
