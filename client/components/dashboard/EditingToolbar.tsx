import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Undo,
  Redo,
  Save,
  Grid3X3,
  ZoomIn,
  ZoomOut,
  Maximize,
  Settings,
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
  gridSize?: number;
  canvasSize?: { width: number; height: number };
  onZoomChange?: (zoom: number) => void;
  onGridSizeChange?: (size: number) => void;
  onCanvasSizeChange?: (size: { width: number; height: number }) => void;
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
  gridSize = 20,
  canvasSize = { width: 1920, height: 1080 },
  onZoomChange,
  onGridSizeChange,
  onCanvasSizeChange,
}: EditingToolbarProps) {
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
        </div>
      </div>
    </div>
  );
}
