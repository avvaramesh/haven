import React, { ReactNode, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Sparkles,
  Database,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Bot,
  Settings,
} from "lucide-react";
import DataConnectionsPanel from "./DataConnectionsPanel";
import ChartTemplatesPanel from "./ChartTemplatesPanel";
import AICopilotIntegrated from "./AICopilotIntegrated";
import PropertiesPanelIntegrated from "./PropertiesPanelIntegrated";
import EditingToolbar from "./EditingToolbar";
import CanvasArea from "./CanvasArea";

interface DashboardLayoutProps {
  children?: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [leftPanelTab, setLeftPanelTab] = useState<
    "data" | "templates" | "properties" | "copilot"
  >("data");
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);

  // Auto-switch to properties when element is selected
  React.useEffect(() => {
    if (selectedElement && !isLeftPanelCollapsed) {
      setLeftPanelTab("properties");
    }
  }, [selectedElement, isLeftPanelCollapsed]);
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
        {/* Left Panel - Collapsible Tabbed Interface */}
        <div className="flex flex-col">
          {/* Collapsed State */}
          {isLeftPanelCollapsed ? (
            <div className="w-12 bg-dashboard-background border-r border-dashboard-border h-full flex flex-col items-center py-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLeftPanelCollapsed(false)}
                className="text-dashboard-text hover:bg-dashboard-muted mb-4"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <div className="flex flex-col gap-3">
                <Database
                  className="w-5 h-5 text-dashboard-text-muted"
                  title="Data"
                />
                <BarChart3
                  className="w-5 h-5 text-dashboard-text-muted"
                  title="Charts"
                />
                <Settings
                  className={`w-5 h-5 ${selectedElement ? "text-dashboard-accent" : "text-dashboard-text-muted"}`}
                  title="Properties"
                />
                <Bot
                  className="w-5 h-5 text-dashboard-text-muted"
                  title="AI Copilot"
                />
              </div>
            </div>
          ) : (
            <div className="flex h-full">
              {/* Vertical Tab Sidebar */}
              <div className="w-16 bg-dashboard-surface border-r border-dashboard-border flex flex-col py-2">
                <Button
                  variant={leftPanelTab === "data" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLeftPanelTab("data")}
                  className={`w-12 h-12 mb-1 mx-auto flex flex-col gap-1 ${
                    leftPanelTab === "data"
                      ? "bg-dashboard-accent text-white"
                      : "text-dashboard-text hover:bg-dashboard-muted"
                  }`}
                  title="Data Connections"
                >
                  <Database className="w-4 h-4" />
                  <span className="text-xs">Data</span>
                </Button>

                <Button
                  variant={leftPanelTab === "templates" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLeftPanelTab("templates")}
                  className={`w-12 h-12 mb-1 mx-auto flex flex-col gap-1 ${
                    leftPanelTab === "templates"
                      ? "bg-dashboard-accent text-white"
                      : "text-dashboard-text hover:bg-dashboard-muted"
                  }`}
                  title="Chart Templates"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-xs">Charts</span>
                </Button>

                <Button
                  variant={leftPanelTab === "properties" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLeftPanelTab("properties")}
                  className={`w-12 h-12 mb-1 mx-auto flex flex-col gap-1 relative ${
                    leftPanelTab === "properties"
                      ? "bg-dashboard-accent text-white"
                      : "text-dashboard-text hover:bg-dashboard-muted"
                  }`}
                  disabled={!selectedElement}
                  title="Properties"
                >
                  <Settings className="w-4 h-4" />
                  <span className="text-xs">Props</span>
                  {selectedElement && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-dashboard-accent rounded-full" />
                  )}
                </Button>

                <Button
                  variant={leftPanelTab === "copilot" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLeftPanelTab("copilot")}
                  className={`w-12 h-12 mb-1 mx-auto flex flex-col gap-1 ${
                    leftPanelTab === "copilot"
                      ? "bg-dashboard-accent text-white"
                      : "text-dashboard-text hover:bg-dashboard-muted"
                  }`}
                  title="AI Copilot"
                >
                  <Bot className="w-4 h-4" />
                  <span className="text-xs">AI</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLeftPanelCollapsed(true)}
                  className="w-12 h-8 mx-auto mt-auto text-dashboard-text hover:bg-dashboard-muted"
                  title="Collapse Panel"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </div>

              {/* Tab Content */}
              <div className="flex-1">
                {leftPanelTab === "data" && <DataConnectionsPanel />}
                {leftPanelTab === "templates" && <ChartTemplatesPanel />}
                {leftPanelTab === "properties" && (
                  <div className="w-80 h-full">
                    <PropertiesPanelIntegrated
                      selectedElement={selectedElement}
                    />
                  </div>
                )}
                {leftPanelTab === "copilot" && (
                  <div className="w-80 h-full">
                    <AICopilotIntegrated />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Canvas Area - Full Width */}
        <CanvasArea
          selectedElement={selectedElement}
          onElementSelect={setSelectedElement}
        />
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
