import React, { useState } from "react";
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
  Zap,
  X,
} from "lucide-react";

interface PropertiesPanelIntegratedProps {
  selectedElement: string | null;
  isMobile?: boolean;
  onClose?: () => void;
  onPropertyChange?: (elementId: string, property: string, value: any) => void;
}

export default function PropertiesPanelIntegrated({
  selectedElement,
  isMobile = false,
  onClose,
  onPropertyChange = () => {},
}: PropertiesPanelIntegratedProps) {
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
    // Chart-specific properties
    showDataPoints: true,
    smoothCurves: true,
    barSpacing: 0.3,
    showPercentages: true,
    startAngle: 0,
    value: "",
  });

  const updateProperty = (key: string, value: any) => {
    // Update local state immediately for responsive UI
    setProperties((prev) => ({ ...prev, [key]: value }));

    // Immediately notify parent component for real-time chart updates
    if (
      selectedElement &&
      onPropertyChange &&
      typeof onPropertyChange === "function"
    ) {
      // Use immediate callback to ensure smooth updates
      onPropertyChange(selectedElement, key, value);

      // Also try to call the global canvas property change if available
      if ((window as any).canvasPropertyChange) {
        (window as any).canvasPropertyChange(selectedElement, key, value);
      }
    }
  };

  // Get element type and relevant properties
  const getElementInfo = (elementId: string | null) => {
    if (!elementId) return { type: "none", title: "", properties: {} };

    const elementConfigs = {
      "smart-chart": {
        type: "line-chart",
        title: "Smart Analytics Chart",
        properties: {
          title: "Q4 Revenue Trends",
          chartType: "line",
          showLegend: true,
          showGrid: true,
          showDataPoints: true,
          smoothCurves: true,
          color: "#3b82f6",
          background: "#1e293b",
          width: 600,
          height: 300,
          // X-Axis properties
          xAxisLabel: "Months",
          showXAxis: true,
          rotateXLabels: false,
          xLabelAngle: 0,
          // Y-Axis properties
          yAxisLabel: "Revenue ($)",
          showYAxis: true,
          yMinValue: "",
          yMaxValue: "",
          startFromZero: true,
        },
      },
      "revenue-chart": {
        type: "bar-chart",
        title: "Revenue by Category Chart",
        properties: {
          title: "Revenue by Category",
          chartType: "bar",
          showLegend: true,
          showGrid: true,
          color: "#3b82f6",
          background: "#1e293b",
          width: 400,
          height: 250,
          // X-Axis properties
          xAxisLabel: "Categories",
          showXAxis: true,
          rotateXLabels: true,
          xLabelAngle: -45,
          // Y-Axis properties
          yAxisLabel: "Revenue ($)",
          showYAxis: true,
          yMinValue: "",
          yMaxValue: "",
          startFromZero: true,
          barSpacing: 0.3,
          showValues: true,
        },
      },
      "sales-dist": {
        type: "pie-chart",
        title: "Sales Distribution Chart",
        properties: {
          title: "Sales Distribution",
          chartType: "pie",
          showLegend: true,
          showPercentages: true,
          donutMode: false,
          startAngle: 0,
          color: "#f59e0b",
          background: "#1e293b",
          width: 350,
          height: 280,
        },
      },
      "kpi-widget": {
        type: "kpi-large",
        title: "KPI Widget",
        properties: {
          title: "Total Revenue",
          value: "$142,583",
          trend: "+12.5%",
          trendDirection: "up",
          fontSize: 24,
          color: "#3b82f6",
          background: "#1e293b",
          showTrend: true,
          width: 300,
          height: 150,
        },
      },
      "kpi-1": {
        type: "kpi-card",
        title: "Growth KPI",
        properties: {
          title: "Monthly Growth",
          value: "+12.5%",
          subtitle: "vs last month",
          color: "#10b981",
          background: "#1e293b",
          fontSize: 18,
          width: 200,
          height: 120,
        },
      },
      "kpi-2": {
        type: "kpi-card",
        title: "Users KPI",
        properties: {
          title: "Active Users",
          value: "24.8k",
          subtitle: "this week",
          color: "#3b82f6",
          background: "#1e293b",
          fontSize: 18,
          width: 200,
          height: 120,
        },
      },
      "kpi-3": {
        type: "kpi-card",
        title: "Conversion KPI",
        properties: {
          title: "Conversion Rate",
          value: "3.2%",
          subtitle: "avg rate",
          color: "#f59e0b",
          background: "#1e293b",
          fontSize: 18,
          width: 200,
          height: 120,
        },
      },
      "kpi-4": {
        type: "kpi-card",
        title: "LTV KPI",
        properties: {
          title: "Customer LTV",
          value: "$1,247",
          subtitle: "average",
          color: "#8b5cf6",
          background: "#1e293b",
          fontSize: 18,
          width: 200,
          height: 120,
        },
      },
    };

    return (
      elementConfigs[elementId as keyof typeof elementConfigs] || {
        type: "unknown",
        title: elementId,
        properties: {},
      }
    );
  };

  const elementInfo = getElementInfo(selectedElement);

  // Update properties when element changes
  React.useEffect(() => {
    if (selectedElement && elementInfo.properties) {
      // Filter out undefined values to prevent NaN issues
      const filteredProperties = Object.fromEntries(
        Object.entries(elementInfo.properties).filter(
          ([_, value]) => value !== undefined,
        ),
      );
      setProperties((prev) => ({ ...prev, ...filteredProperties }));
    }
  }, [selectedElement]);

  if (!selectedElement) {
    return (
      <div className="bg-dashboard-background border-r border-dashboard-border h-full flex items-center justify-center">
        <div className="text-center p-6">
          <Settings className="w-12 h-12 text-dashboard-text-muted mx-auto mb-3 opacity-50" />
          <h3 className="font-medium text-dashboard-text mb-2">No Selection</h3>
          <p className="text-sm text-dashboard-text-muted">
            Select a chart or KPI to edit its properties
          </p>
          <div className="mt-4 p-3 bg-dashboard-surface rounded-lg border border-dashboard-border">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-dashboard-accent" />
              <span className="text-sm font-medium text-dashboard-accent">
                Quick Tip
              </span>
            </div>
            <p className="text-xs text-dashboard-text-muted">
              Click any chart on the canvas to instantly access its properties
              here. Properties will auto-appear when you select elements!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-dashboard-background border-r border-dashboard-border h-full overflow-y-auto ${isMobile ? "touch-pan-y" : ""}`}
    >
      <div className="p-4 border-b border-dashboard-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-dashboard-accent" />
            <h3 className="font-semibold text-dashboard-text">Properties</h3>
          </div>
          {isMobile && onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-dashboard-text hover:bg-dashboard-muted"
              title="Close Properties"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-dashboard-accent/20 text-dashboard-accent text-xs">
            {elementInfo.title}
          </Badge>
          <Badge variant="outline" className="text-xs border-dashboard-border">
            {elementInfo.type}
          </Badge>
        </div>
      </div>

      <div className={`${isMobile ? "p-3 space-y-4" : "p-4 space-y-6"}`}>
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted"
          >
            <Zap className="w-3 h-3 mr-1" />
            Auto-style
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Reset
          </Button>
        </div>

        {/* Basic Properties */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Layout className="w-4 h-4 text-dashboard-accent" />
            <h4 className="font-medium text-dashboard-text">Layout</h4>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-dashboard-text-muted">Title</Label>
            <Input
              value={properties.title}
              onChange={(e) => updateProperty("title", e.target.value)}
              className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-dashboard-text-muted">Width</Label>
              <Input
                type="number"
                value={properties.width || ""}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  updateProperty("width", value);
                }}
                className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-dashboard-text-muted">
                Height
              </Label>
              <Input
                type="number"
                value={properties.height || ""}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  updateProperty("height", value);
                }}
                className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
              />
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

            {/* Color Palette */}
            <div className="space-y-2">
              <Label className="text-xs text-dashboard-text-muted">
                Quick Colors
              </Label>
              <div className="grid grid-cols-6 gap-2">
                {[
                  "#3b82f6", // Blue
                  "#ef4444", // Red
                  "#10b981", // Green
                  "#f59e0b", // Yellow
                  "#8b5cf6", // Purple
                  "#06b6d4", // Cyan
                  "#ec4899", // Pink
                  "#84cc16", // Lime
                  "#f97316", // Orange
                  "#6366f1", // Indigo
                  "#14b8a6", // Teal
                  "#a855f7", // Violet
                ].map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded border-2 transition-all hover:scale-110 ${
                      properties.color === color
                        ? "border-dashboard-accent ring-2 ring-dashboard-accent/30"
                        : "border-dashboard-border hover:border-dashboard-accent/50"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => updateProperty("color", color)}
                    title={color}
                  />
                ))}
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

        {/* Typography */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-dashboard-accent" />
            <h4 className="font-medium text-dashboard-text">Typography</h4>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-dashboard-text-muted">
              Font Size
            </Label>
            <Slider
              value={[properties.fontSize || 14]}
              onValueChange={(value) => updateProperty("fontSize", value[0])}
              min={8}
              max={48}
              step={1}
              className="w-full"
            />
            <span className="text-xs text-dashboard-text-muted">
              {properties.fontSize || 14}px
            </span>
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

        {/* Element-Specific Options */}
        {(elementInfo.type.includes("chart") ||
          elementInfo.type.includes("kpi")) && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {elementInfo.type.includes("chart") ? (
                <BarChart3 className="w-4 h-4 text-dashboard-accent" />
              ) : (
                <Settings className="w-4 h-4 text-dashboard-accent" />
              )}
              <h4 className="font-medium text-dashboard-text">
                {elementInfo.type.includes("chart")
                  ? "Chart Options"
                  : "Display Options"}
              </h4>
            </div>

            <div className="space-y-3">
              {/* Chart Type - only for charts */}
              {elementInfo.type.includes("chart") && (
                <div className="space-y-2">
                  <Label className="text-xs text-dashboard-text-muted">
                    Chart Type
                  </Label>
                  <Select
                    value={properties.chartType}
                    onValueChange={(value) =>
                      updateProperty("chartType", value)
                    }
                  >
                    <SelectTrigger className="bg-dashboard-surface border-dashboard-border text-dashboard-text">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {elementInfo.type === "line-chart" && (
                        <>
                          <SelectItem value="line">Line Chart</SelectItem>
                          <SelectItem value="area">Area Chart</SelectItem>
                          <SelectItem value="spline">Smooth Line</SelectItem>
                        </>
                      )}
                      {elementInfo.type === "bar-chart" && (
                        <>
                          <SelectItem value="bar">Bar Chart</SelectItem>
                          <SelectItem value="column">Column Chart</SelectItem>
                          <SelectItem value="stacked">Stacked Bar</SelectItem>
                        </>
                      )}
                      {elementInfo.type === "pie-chart" && (
                        <>
                          <SelectItem value="pie">Pie Chart</SelectItem>
                          <SelectItem value="donut">Donut Chart</SelectItem>
                          <SelectItem value="semi-donut">
                            Semi Circle
                          </SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* KPI Value - for KPI elements */}
              {elementInfo.type.includes("kpi") && properties.value && (
                <div className="space-y-2">
                  <Label className="text-xs text-dashboard-text-muted">
                    Value
                  </Label>
                  <Input
                    value={properties.value}
                    onChange={(e) => updateProperty("value", e.target.value)}
                    className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
                  />
                </div>
              )}

              {/* Common Chart Options */}
              {elementInfo.type.includes("chart") && (
                <>
                  {properties.showLegend !== undefined && (
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
                  )}

                  {properties.showGrid !== undefined && (
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
                  )}

                  {/* Line Chart Specific */}
                  {elementInfo.type === "line-chart" && (
                    <>
                      {properties.showDataPoints !== undefined && (
                        <div className="flex items-center justify-between">
                          <Label className="text-xs text-dashboard-text-muted">
                            Show Data Points
                          </Label>
                          <Switch
                            checked={properties.showDataPoints}
                            onCheckedChange={(checked) =>
                              updateProperty("showDataPoints", checked)
                            }
                          />
                        </div>
                      )}
                      {properties.smoothCurves !== undefined && (
                        <div className="flex items-center justify-between">
                          <Label className="text-xs text-dashboard-text-muted">
                            Smooth Curves
                          </Label>
                          <Switch
                            checked={properties.smoothCurves}
                            onCheckedChange={(checked) =>
                              updateProperty("smoothCurves", checked)
                            }
                          />
                        </div>
                      )}
                    </>
                  )}

                  {/* Bar Chart Specific */}
                  {elementInfo.type === "bar-chart" &&
                    properties.barSpacing !== undefined && (
                      <div className="space-y-2">
                        <Label className="text-xs text-dashboard-text-muted">
                          Bar Spacing
                        </Label>
                        <Slider
                          value={[(properties.barSpacing || 0.1) * 100]}
                          onValueChange={(value) =>
                            updateProperty("barSpacing", value[0] / 100)
                          }
                          min={0}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                        <span className="text-xs text-dashboard-text-muted">
                          {Math.round((properties.barSpacing || 0.1) * 100)}%
                        </span>
                      </div>
                    )}

                  {/* Pie Chart Specific */}
                  {elementInfo.type === "pie-chart" && (
                    <>
                      {properties.showPercentages !== undefined && (
                        <div className="flex items-center justify-between">
                          <Label className="text-xs text-dashboard-text-muted">
                            Show Percentages
                          </Label>
                          <Switch
                            checked={properties.showPercentages}
                            onCheckedChange={(checked) =>
                              updateProperty("showPercentages", checked)
                            }
                          />
                        </div>
                      )}
                      {properties.startAngle !== undefined && (
                        <div className="space-y-2">
                          <Label className="text-xs text-dashboard-text-muted">
                            Start Angle
                          </Label>
                          <Slider
                            value={[properties.startAngle || 0]}
                            onValueChange={(value) =>
                              updateProperty("startAngle", value[0])
                            }
                            min={0}
                            max={360}
                            step={15}
                            className="w-full"
                          />
                          <span className="text-xs text-dashboard-text-muted">
                            {properties.startAngle || 0}°
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              {/* KPI Specific Options */}
              {elementInfo.type.includes("kpi") && (
                <>
                  {properties.showTrend !== undefined && (
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-dashboard-text-muted">
                        Show Trend
                      </Label>
                      <Switch
                        checked={properties.showTrend}
                        onCheckedChange={(checked) =>
                          updateProperty("showTrend", checked)
                        }
                      />
                    </div>
                  )}
                  {properties.subtitle && (
                    <div className="space-y-2">
                      <Label className="text-xs text-dashboard-text-muted">
                        Subtitle
                      </Label>
                      <Input
                        value={properties.subtitle}
                        onChange={(e) =>
                          updateProperty("subtitle", e.target.value)
                        }
                        className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
                      />
                    </div>
                  )}
                </>
              )}

              {/* X/Y Axis Properties - Show for line and bar charts */}
              {(elementInfo.type === "line-chart" ||
                elementInfo.type === "bar-chart") && (
                <div className="space-y-4 mt-6">
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
                          value={properties.xAxisLabel || ""}
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
                          checked={properties.showXAxis !== false}
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
                          checked={properties.rotateXLabels === true}
                          onCheckedChange={(checked) =>
                            updateProperty("rotateXLabels", checked)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-dashboard-text-muted">
                          Label Angle: {properties.xLabelAngle || 0}°
                        </Label>
                        <Slider
                          value={[properties.xLabelAngle || 0]}
                          onValueChange={(value) =>
                            updateProperty("xLabelAngle", value[0])
                          }
                          max={90}
                          min={-90}
                          step={15}
                          className="w-full"
                        />
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
                          value={properties.yAxisLabel || ""}
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
                          checked={properties.showYAxis !== false}
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
                            value={properties.yMinValue || ""}
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
                            value={properties.yMaxValue || ""}
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
                          checked={properties.startFromZero !== false}
                          onCheckedChange={(checked) =>
                            updateProperty("startFromZero", checked)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
            {elementInfo.type === "line-chart" &&
              "Try adding smooth curves and data point markers to make trends more visible."}
            {elementInfo.type === "bar-chart" &&
              "Consider using gradient colors and adjusting bar spacing for better visual impact."}
            {elementInfo.type === "pie-chart" &&
              "Enable percentage labels and try a donut style for modern appearance."}
            {elementInfo.type.includes("kpi") &&
              "Add trend indicators and optimize the font size for better readability."}
            {!elementInfo.type.includes("chart") &&
              !elementInfo.type.includes("kpi") &&
              "Select a chart or KPI element to get AI-powered suggestions."}
          </p>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-xs text-dashboard-accent hover:bg-dashboard-accent/20 w-full"
          >
            {elementInfo.type === "line-chart" && "Optimize Line Chart"}
            {elementInfo.type === "bar-chart" && "Apply Gradient"}
            {elementInfo.type === "pie-chart" && "Enable Donut Mode"}
            {elementInfo.type.includes("kpi") && "Optimize KPI"}
            {!elementInfo.type.includes("chart") &&
              !elementInfo.type.includes("kpi") &&
              "Get Suggestions"}
          </Button>
        </div>
      </div>
    </div>
  );
}
