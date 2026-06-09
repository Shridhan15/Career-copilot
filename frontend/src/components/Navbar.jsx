import React from "react";
import { Sparkles, Target, Settings } from "lucide-react"; // Swapped User for Settings
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function Navbar({ targetRole }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left side: Logo. Clicking it takes you back home */}
        <Link to="/" className="flex items-center space-x-3 cursor-pointer">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-sm shadow-blue-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            CareerCopilot<span className="text-blue-600">.ai</span>
          </span>
        </Link>

        {/* Right side: Controls & Authentication */}
        <div className="flex items-center gap-3 sm:gap-4">
          {targetRole && (
            <div className="hidden sm:flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60 text-sm font-medium text-slate-600">
              <Target className="w-4 h-4 text-slate-500" />
              <span>Target: {targetRole}</span>
            </div>
          )}

          {/* Show these only if the user IS logged in */}
          <SignedIn>
            {/* Differentiated Profile Link: Now uses a Settings icon + Text */}
            <Link
              to="/profile"
              className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:block">
                Career Setup
              </span>
            </Link>

            {/* Clerk's built-in profile dropdown avatar */}
            <div className="pl-1 border-l border-slate-200 h-6 flex items-center ml-1">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          {/* Show this only if the user IS NOT logged in */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
