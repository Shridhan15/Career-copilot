import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* The Navbar stays persistent across all routes */}
      <Navbar />

      {/* The Outlet is where the actual page content gets injected */}
      <main className="p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
