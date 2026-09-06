"use client";

import React from "react";
import PortfolioV2 from "@/ui/portfolio/PortfolioV2";

export default function PortfolioContent() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-16 sm:pt-20 pb-24 relative overflow-hidden bg-agenko-grid">
      <PortfolioV2 />
    </main>
  );
}
