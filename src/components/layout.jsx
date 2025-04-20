import React from "react";
import Navbar from "./navbar";

export function Layout({ children }) {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Navbar />
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      
    </div>
  );
}