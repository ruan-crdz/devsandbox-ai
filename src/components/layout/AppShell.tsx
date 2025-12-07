"use client";

import React from "react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050816] text-gray-200 flex flex-col">
      {/* TopBar */}
      <div className="h-12 border-b border-[#1E293B] flex items-center px-4 bg-[#0B1020]">
        <span className="text-lg font-semibold">
          DevSandbox <span className="text-[#38BDF8]">AI</span>
        </span>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
