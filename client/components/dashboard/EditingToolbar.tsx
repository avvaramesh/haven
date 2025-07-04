import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Undo,
  Redo,
  Save,
  Download,
  Share2,
  Eye,
  EyeOff,
  Grid3X3,
  MousePointer2,
  Hand,
  Square,
  BarChart3,
  LineChart,
  PieChart,
  Type,
  Image,
  Layers,
  Copy,
  Trash2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize,
} from "lucide-react";

interface EditingToolbarProps {
  onUndo?: () => any;
  onRedo?: () => any;
  canUndo?: boolean;
  canRedo?: boolean;
  onSave?: () => void;
  onExport?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFitToScreen?: () => void;
  onPreview?: () => void;
  onPublish?: () => void;
  zoomLevel?: number;
  showGrid?: boolean;
  onToggleGrid?: () => void;
}

export default function EditingToolbar({
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  onSave,
  onExport,
  onZoomIn,
  onZoomOut,
  onFitToScreen,
  onPreview,
  onPublish,
  zoomLevel = 100,
  showGrid = true,
  onToggleGrid,
}: EditingToolbarProps) {
  const [selectedTool, setSelectedTool] = useState("select");

  const tools = [
    { id: "select", icon: MousePointer2, label: "Select" },
    { id: "bar-chart", icon: BarChart3, label: "Bar Chart" },
    { id: "line-chart", icon: LineChart, label: "Line Chart" },
    { id: "pie-chart", icon: PieChart, label: "Pie Chart" },
  ];

  return (
    <div className="bg-dashboard-background border-b border-dashboard-border px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Left: File Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onUndo}
            disabled={!canUndo}
            className={`text-dashboard-text hover:bg-dashboard-muted ${!canUndo ? "opacity-50 cursor-not-allowed" : ""}`}
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRedo}
            disabled={!canRedo}
            className={`text-dashboard-text hover:bg-dashboard-muted ${!canRedo ? "opacity-50 cursor-not-allowed" : ""}`}
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-dashboard-border mx-2" />
          <Button
            variant="ghost"
            size="sm"
            onClick={onSave}
            className="text-dashboard-text hover:bg-dashboard-muted"
            title="Save Dashboard (Ctrl+S)"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onExport}
            className="text-dashboard-text hover:bg-dashboard-muted"
            title="Export Dashboard"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Center: Tools */}
        <div className="flex items-center gap-1 bg-dashboard-surface border border-dashboard-border rounded-lg p-1">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={selectedTool === tool.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTool(tool.id)}
              className={
                selectedTool === tool.id
                  ? "bg-dashboard-accent text-white"
                  : "text-dashboard-text hover:bg-dashboard-muted"
              }
              title={tool.label}
            >
              <tool.icon className="w-4 h-4" />
            </Button>
          ))}
        </div>

        {/* Right: View Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleGrid}
            className={`text-dashboard-text hover:bg-dashboard-muted ${
              showGrid ? "bg-dashboard-muted" : ""
            }`}
          >
            <Grid3X3 className="w-4 h-4 mr-2" />
            Grid
          </Button>
          <div className="w-px h-6 bg-dashboard-border mx-2" />
          <Button
            variant="ghost"
            size="sm"
            onClick={onZoomOut}
            className="text-dashboard-text hover:bg-dashboard-muted"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm text-dashboard-text px-2">{zoomLevel}%</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onZoomIn}
            className="text-dashboard-text hover:bg-dashboard-muted"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onFitToScreen}
            className="text-dashboard-text hover:bg-dashboard-muted"
            title="Fit to Screen"
          >
            <Maximize className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-dashboard-border mx-2" />
          <Button
            variant="outline"
            size="sm"
            onClick={onPreview}
            className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted"
            title="Preview Dashboard"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            className="bg-dashboard-accent hover:bg-dashboard-accent-light text-white"
            size="sm"
            onClick={onPublish}
            title="Publish Dashboard"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
