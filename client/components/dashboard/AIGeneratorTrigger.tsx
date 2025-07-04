import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wand2, Sparkles } from "lucide-react";
import FloatingAIGenerator from "./FloatingAIGenerator";

export default function AIGeneratorTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-dashboard-accent to-dashboard-accent-light hover:scale-105 transition-all duration-200 shadow-2xl border-0"
        >
          <div className="relative">
            <Wand2 className="w-6 h-6 text-white" />
            <Sparkles className="w-3 h-3 text-white absolute -top-1 -right-1 animate-pulse" />
          </div>
        </Button>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-dashboard-surface border border-dashboard-border rounded-lg text-xs text-dashboard-text whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          AI Chart Generator
        </div>
      </div>

      {/* Floating AI Generator Modal */}
      <FloatingAIGenerator isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
