import React from "react";
import { SignInButton } from "@clerk/clerk-react";
import { BrainCircuit, Map, Video, Rocket } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 animate-fade-in text-center mt-8">
      {/* Version Badge */}
      <div className="inline-block bg-blue-50 text-blue-600 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 border border-blue-100 shadow-sm">
        CareerCopilot.ai 1.0 is Live
      </div>

      {/* Hero Text */}
      <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
        Your AI-Powered <br className="hidden sm:block" /> Career Architect
      </h1>
      <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
        Upload your resume, select your dream role, and let our multi-agent AI
        system build you a hyper-personalized roadmap to get hired.
      </p>

      {/* Main CTA */}
      <SignInButton mode="modal">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all shadow-lg shadow-blue-200 flex items-center gap-2 mx-auto cursor-pointer">
          <Rocket className="w-5 h-5" /> Get Started for Free
        </button>
      </SignInButton>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Brutal Gap Analysis</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Our technical screener compares your current skills against
            industry-standard architectures to find exactly what you're missing.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 mb-4">
            <Map className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Adaptive Roadmaps</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Stop guessing. Get a week-by-week curriculum tailored exactly to the
            gaps in your knowledge, dynamically adjusting as you learn.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center text-purple-600 mb-4">
            <Video className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Mock Interviews</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Practice live technical questions generated specifically from your
            unique skill gaps to guarantee you pass the final round.
          </p>
        </div>
      </div>
    </div>
  );
}
