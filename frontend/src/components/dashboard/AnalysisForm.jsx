import React, { useState, useEffect } from "react";
import { Loader2, Sparkles, Target, FileText, FolderOpen } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

export default function AnalysisForm({ onAnalyze, isAnalyzing }) {
  const { user } = useUser();
  const [targetRole, setTargetRole] = useState("");
  const [resumeText, setResumeText] = useState("");

  // --- Resume Bank State ---
  const [savedResumes, setSavedResumes] = useState([]);
  const [selectedResumeMode, setSelectedResumeMode] = useState("manual");

  // --- Fetch Saved Resumes on Load ---
  useEffect(() => {
    if (!user) return;

    const fetchResumes = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/user/${user.id}/profile`,
        );
        if (response.ok) {
          const data = await response.json();
          // Load resumes into state, ensuring we default to an empty array
          setSavedResumes(data.resumes || []);
        }
      } catch (error) {
        console.error("Could not load resumes", error);
      }
    };

    fetchResumes();
  }, [user]);

  // --- Handle Dropdown Selection ---
  const handleResumeSelection = (e) => {
    const mode = e.target.value;
    setSelectedResumeMode(mode);

    if (mode === "manual") {
      setResumeText(""); // Clear the box if they choose to write manually
    } else {
      // Find the specific resume they selected and auto-fill the text box!
      const selected = savedResumes.find((r) => r.id.toString() === mode);
      if (selected) {
        setResumeText(selected.content);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumeText.trim() || !targetRole.trim()) {
      alert("Please provide both your resume and a target role.");
      return;
    }
    onAnalyze(targetRole, resumeText);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6"
    >
      {/* 1. Target Role Selection */}
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-500" /> Target Role
        </label>
        <select
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all cursor-pointer text-slate-700"
        >
          <option value="" disabled>
            Select your target role...
          </option>
          <option value="AI Engineer">AI Engineer</option>
          <option value="Cloud Architect">Cloud Architect</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
        </select>
      </div>

      {/* 2. Resume Input & Selection */}
      <div>
        {/* Dynamic Header: Shows the Dropdown ONLY if they have saved resumes */}
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-500" /> Current Resume /
            Skills
          </label>

          {savedResumes.length > 0 && (
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-slate-400" />
              <select
                value={selectedResumeMode}
                onChange={handleResumeSelection}
                className="bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold rounded-lg px-2 py-1 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500/20 transition-all"
              >
                <option value="manual">Write / Paste manually...</option>
                {savedResumes.map((res) => (
                  <option key={res.id} value={res.id}>
                    Load: {res.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <textarea
          value={resumeText}
          onChange={(e) => {
            setResumeText(e.target.value);
            // If they start typing/editing the text, switch the dropdown back to "manual"
            if (selectedResumeMode !== "manual") {
              setSelectedResumeMode("manual");
            }
          }}
          placeholder="Paste your resume text or a comma-separated list of your current skills here..."
          rows={5}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
        />
      </div>

      {/* 3. Submit Button */}
      <button
        type="submit"
        disabled={isAnalyzing}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-blue-200"
      >
        {isAnalyzing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Sparkles className="w-5 h-5" />
        )}
        {isAnalyzing
          ? "Multi-Agent Analysis in Progress..."
          : "Run AI Gap Analysis"}
      </button>
    </form>
  );
}
