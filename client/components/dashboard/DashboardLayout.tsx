import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles } from "lucide-react";
import LayersPanel from "./LayersPanel";
import EditingToolbar from "./EditingToolbar";
import PropertiesPanel from "./PropertiesPanel";
import CanvasArea from "./CanvasArea";

interface DashboardLayoutProps {
  children?: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-dashboard-background">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-dashboard-border bg-dashboard-background">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-dashboard-accent" />
              <h1 className="text-xl font-semibold text-dashboard-text">
                Dashboard Designer
              </h1>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 bg-dashboard-accent/20 rounded-full">
              <Sparkles className="w-3 h-3 text-dashboard-accent" />
              <span className="text-xs text-dashboard-accent font-medium">
                AI Powered
              </span>
            </div>
          </div>
          <div className="text-sm text-dashboard-text-muted">
            Untitled Dashboard • Last saved 2 minutes ago
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted"
          >
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted"
          >
            Preview
          </Button>
          <Button className="bg-dashboard-accent hover:bg-dashboard-accent-light text-white">
            Publish
          </Button>
        </div>
      </div>

      {/* Editing Toolbar */}
      <EditingToolbar />

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Layers & Components */}
        <LayersPanel />

        {/* Center Canvas Area */}
        <CanvasArea />

        {/* Right Panel - Properties */}
        <PropertiesPanel />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 py-2 border-t border-dashboard-border bg-dashboard-background text-xs text-dashboard-text-muted">
        <div className="flex items-center gap-4">
          <span>Ready</span>
          <span>•</span>
          <span>8 elements</span>
          <span>•</span>
          <span>Auto-save enabled</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Memory: 42MB</span>
          <span>•</span>
          <span>Performance: Good</span>
        </div>
      </div>
    </div>
  );
}
