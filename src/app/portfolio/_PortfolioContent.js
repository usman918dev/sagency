"use client";

import React from "react";
import PortfolioTwo from "@/ui/portfolio/PortfolioTwo";

export default function PortfolioContent() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-16 sm:pt-20 pb-24 relative overflow-hidden bg-agenko-grid">
      <PortfolioTwo />
    </main>
  );
}
