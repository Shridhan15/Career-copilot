import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar"; // <-- Import the new Sidebar

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* 1. Navbar stays fixed at the top spanning full width */}
      <Navbar />

      {/* 2. Flex container for the body */}
      <div className="flex flex-1 max-w-[1600px] w-full mx-auto">
        {/* The Sidebar takes up fixed width on the left */}
        <Sidebar />

        {/* The Main area expands to fill the remaining space */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
