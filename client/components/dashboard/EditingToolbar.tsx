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

          {/* Canvas Settings */}
          <div className="w-px h-6 bg-dashboard-border mx-2" />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-dashboard-text hover:bg-dashboard-muted"
                title="Canvas Settings"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-dashboard-surface border-dashboard-border">
              <div className="space-y-4">
                <h4 className="font-medium text-dashboard-text">
                  Canvas Settings
                </h4>

                {/* Zoom Level */}
                <div className="space-y-2">
                  <Label className="text-xs text-dashboard-text">
                    Zoom Level
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="25"
                      max="500"
                      step="25"
                      value={zoomLevel}
                      onChange={(e) => onZoomChange?.(Number(e.target.value))}
                      className="bg-dashboard-muted border-dashboard-border text-dashboard-text"
                    />
                    <span className="text-xs text-dashboard-text-muted">%</span>
                  </div>
                </div>

                {/* Grid Size */}
                <div className="space-y-2">
                  <Label className="text-xs text-dashboard-text">
                    Grid Size
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="10"
                      max="100"
                      step="5"
                      value={gridSize}
                      onChange={(e) =>
                        onGridSizeChange?.(Number(e.target.value))
                      }
                      className="bg-dashboard-muted border-dashboard-border text-dashboard-text"
                    />
                    <span className="text-xs text-dashboard-text-muted">
                      px
                    </span>
                  </div>
                </div>

                {/* Canvas Size */}
                <div className="space-y-2">
                  <Label className="text-xs text-dashboard-text">
                    Canvas Size
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs text-dashboard-text-muted">
                        Width
                      </Label>
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          min="800"
                          max="7680"
                          step="100"
                          value={canvasSize.width}
                          onChange={(e) =>
                            onCanvasSizeChange?.({
                              ...canvasSize,
                              width: Number(e.target.value),
                            })
                          }
                          className="bg-dashboard-muted border-dashboard-border text-dashboard-text text-xs"
                        />
                        <span className="text-xs text-dashboard-text-muted">
                          px
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-dashboard-text-muted">
                        Height
                      </Label>
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          min="600"
                          max="4320"
                          step="100"
                          value={canvasSize.height}
                          onChange={(e) =>
                            onCanvasSizeChange?.({
                              ...canvasSize,
                              height: Number(e.target.value),
                            })
                          }
                          className="bg-dashboard-muted border-dashboard-border text-dashboard-text text-xs"
                        />
                        <span className="text-xs text-dashboard-text-muted">
                          px
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 text-xs text-dashboard-text-muted">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() =>
                        onCanvasSizeChange?.({ width: 1920, height: 1080 })
                      }
                    >
                      1920×1080
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() =>
                        onCanvasSizeChange?.({ width: 1280, height: 720 })
                      }
                    >
                      1280×720
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() =>
                        onCanvasSizeChange?.({ width: 3840, height: 2160 })
                      }
                    >
                      4K
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
