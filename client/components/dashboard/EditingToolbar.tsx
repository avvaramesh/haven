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

export default function EditingToolbar() {
  const [selectedTool, setSelectedTool] = useState("select");
  const [showGrid, setShowGrid] = useState(true);

  const tools = [
    { id: "select", icon: MousePointer2, label: "Select" },
    { id: "pan", icon: Hand, label: "Pan" },
    { id: "rectangle", icon: Square, label: "Rectangle" },
    { id: "bar-chart", icon: BarChart3, label: "Bar Chart" },
    { id: "line-chart", icon: LineChart, label: "Line Chart" },
    { id: "pie-chart", icon: PieChart, label: "Pie Chart" },
    { id: "text", icon: Type, label: "Text" },
    { id: "image", icon: Image, label: "Image" },
  ];

  return (
    <div className="bg-dashboard-background border-b border-dashboard-border px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Left: File Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-dashboard-text hover:bg-dashboard-muted"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-dashboard-text hover:bg-dashboard-muted"
          >
            <Redo className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-dashboard-border mx-2" />
          <Button
            variant="ghost"
            size="sm"
            className="text-dashboard-text hover:bg-dashboard-muted"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-dashboard-text hover:bg-dashboard-muted"
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
            onClick={() => setShowGrid(!showGrid)}
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
            className="text-dashboard-text hover:bg-dashboard-muted"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm text-dashboard-text px-2">100%</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-dashboard-text hover:bg-dashboard-muted"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-dashboard-text hover:bg-dashboard-muted"
          >
            <Maximize className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-dashboard-border mx-2" />
          <Button
            variant="outline"
            size="sm"
            className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            className="bg-dashboard-accent hover:bg-dashboard-accent-light text-white"
            size="sm"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
