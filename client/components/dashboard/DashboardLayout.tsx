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
  Download,
  Share2,
  Eye,
  Upload,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import DataConnectionsPanel from "./DataConnectionsPanel";
import ChartTemplatesPanel from "./ChartTemplatesPanel";
import AIAssistantUnified from "./AIAssistantUnified";
import PropertiesPanelIntegrated from "./PropertiesPanelIntegrated";
import EditingToolbar from "./EditingToolbar";
import CanvasArea from "./CanvasArea";
import ExportDialog from "./ExportDialog";

interface DashboardLayoutProps {
  children?: ReactNode;
}

interface HistoryAction {
  type: "REMOVE_CHART" | "ADD_CHART" | "MODIFY_CHART";
  chartId: string;
  previousState?: any;
  newState?: any;
  timestamp: number;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [leftPanelTab, setLeftPanelTab] = useState<
    "data" | "templates" | "properties" | "copilot"
  >("data");
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showGrid, setShowGrid] = useState(true);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Global undo/redo state
  const [undoStack, setUndoStack] = useState<HistoryAction[]>([]);
  const [redoStack, setRedoStack] = useState<HistoryAction[]>([]);

  // Ref to communicate with CanvasArea
  const canvasUndoRef = React.useRef<(action: HistoryAction) => void>();
  const canvasRedoRef = React.useRef<(action: HistoryAction) => void>();

  // Auto-collapse on mobile
  React.useEffect(() => {
    if (isMobile) {
      setIsLeftPanelCollapsed(true);
    }
  }, [isMobile]);

  // Auto-switch to properties when element is selected
  React.useEffect(() => {
    if (selectedElement && !isLeftPanelCollapsed) {
      setLeftPanelTab("properties");
    }
  }, [selectedElement, isLeftPanelCollapsed]);

  // Handle collapsed icon clicks - expand and switch to tab
  const handleCollapsedTabClick = (
    tab: "data" | "templates" | "properties" | "copilot",
  ) => {
    setLeftPanelTab(tab);
    setIsLeftPanelCollapsed(false);
  };

  // Global undo/redo functions
  const addToHistory = (action: Omit<HistoryAction, "timestamp">) => {
    const historyAction: HistoryAction = {
      ...action,
      timestamp: Date.now(),
    };
    setUndoStack((prev) => [...prev, historyAction]);
    setRedoStack([]); // Clear redo stack when new action is performed
  };

  const handleGlobalUndo = () => {
    if (undoStack.length === 0) return null;

    const lastAction = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [lastAction, ...prev]);

    // Call the CanvasArea undo handler
    canvasUndoRef.current?.(lastAction);

    return lastAction;
  };

  const handleGlobalRedo = () => {
    if (redoStack.length === 0) return null;

    const actionToRedo = redoStack[0];
    setRedoStack((prev) => prev.slice(1));
    setUndoStack((prev) => [...prev, actionToRedo]);

    // Call the CanvasArea redo handler
    canvasRedoRef.current?.(actionToRedo);

    return actionToRedo;
  };

  const canUndo = undoStack.length > 0;
  const canRedo = redoStack.length > 0;

  // Save and export handlers
  const handleSave = () => {
    // Get current dashboard state
    const dashboardState = {
      charts: (window as any).getCanvasState
        ? (window as any).getCanvasState()
        : {},
      selectedElement,
      timestamp: new Date().toISOString(),
    };

    // Save to localStorage for now (could be extended to save to server)
    try {
      localStorage.setItem("dashboard-state", JSON.stringify(dashboardState));
      console.log("Dashboard saved successfully", dashboardState);

      // Show success feedback
      toast({
        title: "Dashboard Saved",
        description: "Your dashboard has been saved successfully.",
      });
    } catch (error) {
      console.error("Failed to save dashboard:", error);
      toast({
        title: "Save Failed",
        description: "Failed to save dashboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    setShowExportDialog(true);
  };

  // Zoom and view handlers
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(200, prev + 25));
    // Notify canvas area if available
    if ((window as any).setCanvasZoom) {
      (window as any).setCanvasZoom(Math.min(200, zoomLevel + 25));
    }
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(25, prev - 25));
    // Notify canvas area if available
    if ((window as any).setCanvasZoom) {
      (window as any).setCanvasZoom(Math.max(25, zoomLevel - 25));
    }
  };

  const handleFitToScreen = () => {
    setZoomLevel(100);
    // Notify canvas area if available
    if ((window as any).setCanvasZoom) {
      (window as any).setCanvasZoom(100);
    }
  };

  const handlePreview = () => {
    console.log("Preview dashboard functionality triggered");
    // TODO: Implement preview functionality
    if ((window as any).toast) {
      (window as any).toast({
        title: "Preview",
        description: "Preview functionality coming soon.",
      });
    }
  };

  const handlePublish = () => {
    console.log("Publish dashboard functionality triggered");
    // TODO: Implement publish functionality
    if ((window as any).toast) {
      (window as any).toast({
        title: "Publish",
        description: "Publish functionality coming soon.",
      });
    }
  };

  const handleShare = () => {
    console.log("Share dashboard functionality triggered");
    // TODO: Implement share functionality
    if ((window as any).toast) {
      (window as any).toast({
        title: "Share",
        description: "Share functionality coming soon.",
      });
    }
  };

  const handleToggleGrid = () => {
    setShowGrid((prev) => !prev);
    // Notify canvas area if available
    if ((window as any).setCanvasGrid) {
      (window as any).setCanvasGrid(!showGrid);
    }
  };

  const handlePropertyChange = (
    elementId: string,
    property: string,
    value: any,
  ) => {
    console.log(
      `DashboardLayout: Property changed for ${elementId}: ${property} = ${value}`,
    );

    // Don't call canvasPropertyChange to avoid circular dependency
    // The canvas area will handle its own property changes internally
  };
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
            onClick={handleExport}
            className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreview}
            className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            className="bg-dashboard-accent hover:bg-dashboard-accent-light text-white"
            onClick={handlePublish}
          >
            <Upload className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      {/* Editing Toolbar */}
      <EditingToolbar
        onUndo={handleGlobalUndo}
        onRedo={handleGlobalRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        onSave={handleSave}
        onExport={handleExport}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFitToScreen={handleFitToScreen}
        onPreview={handlePreview}
        onPublish={handlePublish}
        zoomLevel={zoomLevel}
        showGrid={showGrid}
        onToggleGrid={handleToggleGrid}
      />

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Collapsible Tabbed Interface */}
        <div
          className={`flex flex-col ${isMobile && !isLeftPanelCollapsed ? "absolute inset-y-0 left-0 z-50 bg-dashboard-background/95 backdrop-blur-sm" : ""}`}
        >
          {/* Mobile Overlay */}
          {isMobile && !isLeftPanelCollapsed && (
            <div
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsLeftPanelCollapsed(true)}
            />
          )}

          {/* Collapsed State */}
          {isLeftPanelCollapsed ? (
            <div className="w-12 bg-dashboard-background border-r border-dashboard-border h-full flex flex-col items-center py-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLeftPanelCollapsed(false)}
                className="text-dashboard-text hover:bg-dashboard-muted mb-4 p-0 h-8 w-8"
                title="Expand Panel"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCollapsedTabClick("data")}
                  className={`p-0 h-8 w-8 hover:bg-dashboard-muted ${
                    leftPanelTab === "data"
                      ? "text-dashboard-accent"
                      : "text-dashboard-text-muted"
                  }`}
                  title="Data Connections"
                >
                  <Database className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCollapsedTabClick("templates")}
                  className={`p-0 h-8 w-8 hover:bg-dashboard-muted ${
                    leftPanelTab === "templates"
                      ? "text-dashboard-accent"
                      : "text-dashboard-text-muted"
                  }`}
                  title="Chart Templates"
                >
                  <BarChart3 className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCollapsedTabClick("properties")}
                  disabled={!selectedElement}
                  className={`p-0 h-8 w-8 hover:bg-dashboard-muted relative ${
                    leftPanelTab === "properties" && selectedElement
                      ? "text-dashboard-accent"
                      : "text-dashboard-text-muted"
                  } ${!selectedElement ? "opacity-50 cursor-not-allowed" : ""}`}
                  title={
                    selectedElement
                      ? "Properties"
                      : "Select an element to view properties"
                  }
                >
                  <Settings className="w-5 h-5" />
                  {selectedElement && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-dashboard-accent rounded-full" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCollapsedTabClick("copilot")}
                  className={`p-0 h-8 w-8 hover:bg-dashboard-muted ${
                    leftPanelTab === "copilot"
                      ? "text-dashboard-accent"
                      : "text-dashboard-text-muted"
                  }`}
                  title="AI Copilot"
                >
                  <Bot className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className={`flex h-full ${isMobile ? "relative z-50" : ""}`}>
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
                  <div
                    className={`${isMobile ? "w-screen max-w-sm" : "w-80"} h-full`}
                  >
                    <PropertiesPanelIntegrated
                      selectedElement={selectedElement}
                      isMobile={isMobile}
                      onClose={() => isMobile && setIsLeftPanelCollapsed(true)}
                      onPropertyChange={handlePropertyChange}
                    />
                  </div>
                )}
                {leftPanelTab === "copilot" && (
                  <div
                    className={`${isMobile ? "w-screen max-w-sm" : "w-80"} h-full`}
                  >
                    <AIAssistantUnified />
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
          onAddToHistory={addToHistory}
          onUndo={handleGlobalUndo}
          onRedo={handleGlobalRedo}
          undoRef={canvasUndoRef}
          redoRef={canvasRedoRef}
          onPropertyChange={handlePropertyChange}
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

      {/* Export Dialog */}
      <ExportDialog
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        selectedElement={selectedElement}
      />
    </div>
  );
}
