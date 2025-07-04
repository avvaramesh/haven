import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  Palette,
  Type,
  Layout,
  BarChart3,
  Sparkles,
  RefreshCw,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";

interface PropertiesPanelProps {
  selectedElement: string | null;
}

export default function PropertiesPanel({
  selectedElement,
}: PropertiesPanelProps) {
  const [properties, setProperties] = useState({
    title: "Q4 Revenue Analysis",
    width: 400,
    height: 300,
    color: "#3b82f6",
    background: "#1e293b",
    fontSize: 14,
    fontWeight: "normal",
    textAlign: "left",
    showLegend: true,
    showGrid: true,
    opacity: 100,
    borderRadius: 8,
    chartType: "line",
  });

  const updateProperty = (key: string, value: any) => {
    setProperties((prev) => ({ ...prev, [key]: value }));
  };

  if (!selectedElement) {
    return (
      <div className="w-80 bg-dashboard-background border-l border-dashboard-border h-full flex items-center justify-center">
        <div className="text-center p-6">
          <Settings className="w-12 h-12 text-dashboard-text-muted mx-auto mb-3 opacity-50" />
          <h3 className="font-medium text-dashboard-text mb-2">No Selection</h3>
          <p className="text-sm text-dashboard-text-muted">
            Select a chart or KPI to edit its properties
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-dashboard-background border-l border-dashboard-border h-full overflow-y-auto">
      <div className="p-4 border-b border-dashboard-border">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-dashboard-accent" />
          <h3 className="font-semibold text-dashboard-text">Properties</h3>
          <Badge className="bg-dashboard-accent/20 text-dashboard-accent text-xs">
            {selectedElement}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Basic Properties */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Layout className="w-4 h-4 text-dashboard-accent" />
            <h4 className="font-medium text-dashboard-text">Layout</h4>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-dashboard-text-muted">Width</Label>
              <Input
                type="number"
                value={properties.width}
                onChange={(e) =>
                  updateProperty("width", parseInt(e.target.value))
                }
                className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-dashboard-text-muted">
                Height
              </Label>
              <Input
                type="number"
                value={properties.height}
                onChange={(e) =>
                  updateProperty("height", parseInt(e.target.value))
                }
                className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-dashboard-text-muted">
              Border Radius
            </Label>
            <Slider
              value={[properties.borderRadius]}
              onValueChange={(value) =>
                updateProperty("borderRadius", value[0])
              }
              max={20}
              step={1}
              className="w-full"
            />
            <span className="text-xs text-dashboard-text-muted">
              {properties.borderRadius}px
            </span>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-dashboard-text-muted">Opacity</Label>
            <Slider
              value={[properties.opacity]}
              onValueChange={(value) => updateProperty("opacity", value[0])}
              max={100}
              step={1}
              className="w-full"
            />
            <span className="text-xs text-dashboard-text-muted">
              {properties.opacity}%
            </span>
          </div>
        </div>

        {/* Typography */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-dashboard-accent" />
            <h4 className="font-medium text-dashboard-text">Typography</h4>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-dashboard-text-muted">Title</Label>
            <Input
              value={properties.title}
              onChange={(e) => updateProperty("title", e.target.value)}
              className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-dashboard-text-muted">
              Font Size
            </Label>
            <Slider
              value={[properties.fontSize]}
              onValueChange={(value) => updateProperty("fontSize", value[0])}
              min={8}
              max={48}
              step={1}
              className="w-full"
            />
            <span className="text-xs text-dashboard-text-muted">
              {properties.fontSize}px
            </span>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-dashboard-text-muted">
              Font Weight
            </Label>
            <Select
              value={properties.fontWeight}
              onValueChange={(value) => updateProperty("fontWeight", value)}
            >
              <SelectTrigger className="bg-dashboard-surface border-dashboard-border text-dashboard-text">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="semibold">Semibold</SelectItem>
                <SelectItem value="bold">Bold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-dashboard-text-muted">
              Text Align
            </Label>
            <div className="flex gap-1">
              {["left", "center", "right"].map((align) => (
                <Button
                  key={align}
                  variant={properties.textAlign === align ? "default" : "ghost"}
                  size="sm"
                  onClick={() => updateProperty("textAlign", align)}
                  className={
                    properties.textAlign === align
                      ? "bg-dashboard-accent text-white"
                      : "text-dashboard-text hover:bg-dashboard-muted"
                  }
                >
                  {align === "left" && <AlignLeft className="w-4 h-4" />}
                  {align === "center" && <AlignCenter className="w-4 h-4" />}
                  {align === "right" && <AlignRight className="w-4 h-4" />}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-dashboard-accent" />
            <h4 className="font-medium text-dashboard-text">Colors</h4>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-xs text-dashboard-text-muted">
                Primary Color
              </Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={properties.color}
                  onChange={(e) => updateProperty("color", e.target.value)}
                  className="w-10 h-8 rounded border border-dashboard-border"
                />
                <Input
                  value={properties.color}
                  onChange={(e) => updateProperty("color", e.target.value)}
                  className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-dashboard-text-muted">
                Background
              </Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={properties.background}
                  onChange={(e) => updateProperty("background", e.target.value)}
                  className="w-10 h-8 rounded border border-dashboard-border"
                />
                <Input
                  value={properties.background}
                  onChange={(e) => updateProperty("background", e.target.value)}
                  className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Chart Specific */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-dashboard-accent" />
            <h4 className="font-medium text-dashboard-text">Chart Options</h4>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-xs text-dashboard-text-muted">
                Chart Type
              </Label>
              <Select
                value={properties.chartType}
                onValueChange={(value) => updateProperty("chartType", value)}
              >
                <SelectTrigger className="bg-dashboard-surface border-dashboard-border text-dashboard-text">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="area">Area Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs text-dashboard-text-muted">
                Show Legend
              </Label>
              <Switch
                checked={properties.showLegend}
                onCheckedChange={(checked) =>
                  updateProperty("showLegend", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs text-dashboard-text-muted">
                Show Grid
              </Label>
              <Switch
                checked={properties.showGrid}
                onCheckedChange={(checked) =>
                  updateProperty("showGrid", checked)
                }
              />
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="p-3 bg-dashboard-surface border border-dashboard-accent/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3 h-3 text-dashboard-accent" />
            <span className="text-xs font-medium text-dashboard-accent">
              AI Suggestion
            </span>
          </div>
          <p className="text-xs text-dashboard-text-muted mb-2">
            Try using a darker background (#0f172a) for better contrast with
            your blue color scheme.
          </p>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-xs text-dashboard-accent hover:bg-dashboard-accent/20 w-full"
          >
            Apply Suggestion
          </Button>
        </div>
      </div>
    </div>
  );
}
