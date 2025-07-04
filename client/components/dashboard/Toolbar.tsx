import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  MoreHorizontal,
  Brain,
  Zap,
  MessageSquare,
  Wand2,
  Sparkles,
} from "lucide-react";
import FloatingAIGenerator from "./FloatingAIGenerator";

export default function Toolbar() {
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between p-6 border-b border-dashboard-border">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setShowAIGenerator(true)}
            className="bg-gradient-to-r from-dashboard-accent to-dashboard-accent-light hover:scale-105 transition-all text-white gap-2 shadow-lg"
          >
            <Wand2 className="w-4 h-4" />
            <Sparkles className="w-3 h-3" />
            AI Generate Chart
          </Button>
          <Button
            variant="outline"
            className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted gap-2"
          >
            <Zap className="w-4 h-4" />
            Smart Filters
          </Button>
          <Button
            variant="outline"
            className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Ask AI
          </Button>
          <Button
            variant="outline"
            className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Widget
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-dashboard-surface border border-dashboard-border rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-dashboard-text-muted">AI Active</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-dashboard-text hover:bg-dashboard-muted"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Floating AI Generator Modal */}
      <FloatingAIGenerator
        isOpen={showAIGenerator}
        onClose={() => setShowAIGenerator(false)}
      />
    </>
  );
}
