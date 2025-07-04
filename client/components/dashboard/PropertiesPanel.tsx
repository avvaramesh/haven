import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PropertiesPanelProps {
  selectedElement: string | null;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onPropertyChange?: (elementId: string, property: string, value: any) => void;
}

export default function PropertiesPanel({
  selectedElement,
  isCollapsed,
  onToggleCollapse,
  onPropertyChange,
}: PropertiesPanelProps) {
  // Determine chart type based on selected element
  const getChartTypeFromElement = (elementId: string | null): string => {
    if (!elementId) return "line";

    if (
      elementId.includes("smart-chart") ||
      elementId.includes("profit") ||
      elementId.includes("sales-over")
    ) {
      return "line";
    }
    if (elementId.includes("revenue-chart")) {
      return "bar";
    }
    if (elementId.includes("sales-dist")) {
      return "pie";
    }
    if (elementId.includes("kpi")) {
      return "kpi";
    }
    return "line";
  };
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
    chartType: getChartTypeFromElement(selectedElement),
    // X-Axis properties
    xAxisLabel: "",
    showXAxis: true,
    rotateXLabels: false,
    xLabelAngle: 0,
    // Y-Axis properties
    yAxisLabel: "",
    showYAxis: true,
    yMinValue: "",
    yMaxValue: "",
    startFromZero: true,
  });

  const updateProperty = (key: string, value: any) => {
    setProperties((prev) => ({ ...prev, [key]: value }));
  };

  // Update chart type when selected element changes
  React.useEffect(() => {
    const detectedType = getChartTypeFromElement(selectedElement);
    updateProperty("chartType", detectedType);
  }, [selectedElement]);

  // Collapsed state
  if (isCollapsed) {
    return (
      <div className="w-12 bg-dashboard-background border-l border-dashboard-border h-full flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="text-dashboard-text hover:bg-dashboard-muted rotate-180 mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div className="writing-mode-vertical text-dashboard-text-muted text-sm transform rotate-90 whitespace-nowrap">
          Properties
        </div>
      </div>
    );
  }

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
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="absolute top-4 right-4 text-dashboard-text hover:bg-dashboard-muted"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-80 bg-dashboard-background border-l border-dashboard-border h-full overflow-y-auto">
      <div className="p-4 border-b border-dashboard-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-dashboard-accent" />
            <h3 className="font-semibold text-dashboard-text">Properties</h3>
            <Badge className="bg-dashboard-accent/20 text-dashboard-accent text-xs">
              {selectedElement}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="text-dashboard-text hover:bg-dashboard-muted"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
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

        {/* X/Y Axis Properties - Show for line and bar charts */}
        {(properties.chartType === "line" ||
          properties.chartType === "bar") && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Layout className="w-4 h-4 text-dashboard-accent" />
              <h4 className="font-medium text-dashboard-text">
                Axis Configuration
              </h4>
            </div>

            <div className="space-y-4">
              {/* X-Axis Properties */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-dashboard-text">
                  X-Axis
                </Label>

                <div className="space-y-2">
                  <Label className="text-xs text-dashboard-text-muted">
                    Label
                  </Label>
                  <Input
                    placeholder="e.g., Months, Categories"
                    value={properties.xAxisLabel}
                    onChange={(e) =>
                      updateProperty("xAxisLabel", e.target.value)
                    }
                    className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-xs text-dashboard-text-muted">
                    Show X-Axis
                  </Label>
                  <Switch
                    checked={properties.showXAxis}
                    onCheckedChange={(checked) =>
                      updateProperty("showXAxis", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-xs text-dashboard-text-muted">
                    Rotate Labels
                  </Label>
                  <Switch
                    checked={properties.rotateXLabels}
                    onCheckedChange={(checked) =>
                      updateProperty("rotateXLabels", checked)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-dashboard-text-muted">
                    Label Angle
                  </Label>
                  <Slider
                    value={[properties.xLabelAngle]}
                    onValueChange={(value) =>
                      updateProperty("xLabelAngle", value[0])
                    }
                    max={90}
                    min={-90}
                    step={15}
                    className="w-full"
                  />
                  <span className="text-xs text-dashboard-text-muted">
                    {properties.xLabelAngle}°
                  </span>
                </div>
              </div>

              {/* Y-Axis Properties */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-dashboard-text">
                  Y-Axis
                </Label>

                <div className="space-y-2">
                  <Label className="text-xs text-dashboard-text-muted">
                    Label
                  </Label>
                  <Input
                    placeholder="e.g., Revenue ($), Count"
                    value={properties.yAxisLabel}
                    onChange={(e) =>
                      updateProperty("yAxisLabel", e.target.value)
                    }
                    className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-xs text-dashboard-text-muted">
                    Show Y-Axis
                  </Label>
                  <Switch
                    checked={properties.showYAxis}
                    onCheckedChange={(checked) =>
                      updateProperty("showYAxis", checked)
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs text-dashboard-text-muted">
                      Min Value
                    </Label>
                    <Input
                      type="number"
                      placeholder="Auto"
                      value={properties.yMinValue}
                      onChange={(e) =>
                        updateProperty("yMinValue", e.target.value)
                      }
                      className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-dashboard-text-muted">
                      Max Value
                    </Label>
                    <Input
                      type="number"
                      placeholder="Auto"
                      value={properties.yMaxValue}
                      onChange={(e) =>
                        updateProperty("yMaxValue", e.target.value)
                      }
                      className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-xs text-dashboard-text-muted">
                    Start from Zero
                  </Label>
                  <Switch
                    checked={properties.startFromZero}
                    onCheckedChange={(checked) =>
                      updateProperty("startFromZero", checked)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

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
