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
  Zap,
  X,
} from "lucide-react";
import {
  chartPropertyManager,
  LegacyChartProperties,
  getChartProperties,
  updateChartProperty,
  createDefaultChartProperties,
  migrateLegacyChartProperties,
} from "@/lib/chartPropertyManager";
import {
  VisualizationType,
  AllVisualizationProperties,
  chartSupportsAxes,
  chartSupportsLegend,
  getRelevantPropertyGroups,
} from "@/lib/chartProperties";

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
  const [normalizedProperties, setNormalizedProperties] =
    useState<AllVisualizationProperties | null>(null);
  const [legacyProperties, setLegacyProperties] =
    useState<LegacyChartProperties>({});

  const updateProperty = (key: string, value: any) => {
    if (!selectedElement || !normalizedProperties) return;

    // Update the normalized property
    const success = updateChartProperty(selectedElement, key, value);

    if (success) {
      // Get updated properties
      const updatedProps = getChartProperties(selectedElement);
      if (updatedProps) {
        setNormalizedProperties(updatedProps);

        // Convert to legacy format for backwards compatibility
        const legacyFormat =
          chartPropertyManager.toLegacyFormat(selectedElement);
        setLegacyProperties(legacyFormat);

        // Notify parent component for real-time chart updates
        if (onPropertyChange && typeof onPropertyChange === "function") {
          onPropertyChange(selectedElement, key, value);
        }

        // Also try to call the global canvas property change if available
        if ((window as any).canvasPropertyChange) {
          (window as any).canvasPropertyChange(selectedElement, key, value);
        }
      }
    }
  };

  // Initialize or get properties for the selected element
  const initializeProperties = (elementId: string) => {
    // Try to get existing properties
    let properties = getChartProperties(elementId);

    if (!properties) {
      // Determine chart type from element ID
      const chartType = getChartTypeFromElementId(elementId);

      // Create default properties for this chart type
      properties = createDefaultChartProperties(chartType, elementId);

      // Apply element-specific overrides
      properties = applyElementSpecificDefaults(elementId, properties);
    }

    return properties;
  };

  const getChartTypeFromElementId = (elementId: string): VisualizationType => {
    // Map element IDs to chart types
    const typeMap: Record<string, VisualizationType> = {
      "smart-chart": "line",
      "revenue-chart": "bar",
      "sales-dist": "pie",
      "kpi-widget": "metric",
      "kpi-1": "metric",
      "kpi-2": "metric",
      "kpi-3": "metric",
      "kpi-4": "metric",
      "table-chart": "table",
    };

    return typeMap[elementId] || "line";
  };

  const applyElementSpecificDefaults = (
    elementId: string,
    properties: AllVisualizationProperties,
  ): AllVisualizationProperties => {
    const updates = { ...properties };

    // Apply element-specific customizations
    switch (elementId) {
      case "smart-chart":
        updates.title = "Q4 Revenue Trends";
        updates.width = 600;
        updates.height = 300;
        if (chartSupportsAxes(updates.type)) {
          (updates as any).xAxis.label = "Months";
          (updates as any).yAxis.label = "Revenue ($)";
        }
        break;

      case "revenue-chart":
        updates.title = "Revenue by Category";
        updates.width = 400;
        updates.height = 250;
        if (chartSupportsAxes(updates.type)) {
          (updates as any).xAxis.label = "Categories";
          (updates as any).yAxis.label = "Revenue ($)";
          (updates as any).xAxis.tickRotation = -45;
        }
        break;

      case "sales-dist":
        updates.title = "Sales Distribution";
        updates.primaryColor = "#f59e0b";
        updates.width = 350;
        updates.height = 280;
        break;

      case "kpi-widget":
        updates.title = "Total Revenue";
        updates.width = 300;
        updates.height = 150;
        updates.titleFontSize = 24;
        if (updates.type === "metric") {
          (updates as any).value = "$142,583";
          (updates as any).trend = "up";
          (updates as any).trendPercentage = 12.5;
        }
        break;

      case "kpi-1":
        updates.title = "Monthly Growth";
        updates.primaryColor = "#10b981";
        if (updates.type === "metric") {
          (updates as any).value = "+12.5%";
          (updates as any).unit = "vs last month";
        }
        break;

      case "kpi-2":
        updates.title = "Active Users";
        if (updates.type === "metric") {
          (updates as any).value = "24.8k";
          (updates as any).unit = "this week";
        }
        break;

      case "kpi-3":
        updates.title = "Conversion Rate";
        updates.primaryColor = "#f59e0b";
        if (updates.type === "metric") {
          (updates as any).value = "3.2%";
          (updates as any).unit = "avg rate";
        }
        break;

      case "kpi-4":
        updates.title = "Customer LTV";
        updates.primaryColor = "#8b5cf6";
        if (updates.type === "metric") {
          (updates as any).value = "$1,247";
          (updates as any).unit = "average";
        }
        break;

      case "table-chart":
        updates.title = "Data Table";
        updates.width = 500;
        updates.height = 300;
        break;
    }

    return updates;
  };

  const getElementDisplayInfo = (elementId: string | null) => {
    if (!elementId || !normalizedProperties) {
      return { type: "none", title: "", displayType: "" };
    }

    const displayTypeMap: Record<VisualizationType, string> = {
      line: "Line Chart",
      area: "Area Chart",
      bar: "Bar Chart",
      column: "Column Chart",
      pie: "Pie Chart",
      donut: "Donut Chart",
      scatter: "Scatter Chart",
      radar: "Radar Chart",
      funnel: "Funnel Chart",
      gauge: "Gauge Chart",
      metric: "KPI Metric",
      trend: "KPI Trend",
      progress: "KPI Progress",
      comparison: "KPI Comparison",
      table: "Data Table",
    };

    return {
      type: normalizedProperties.type,
      title: normalizedProperties.title,
      displayType:
        displayTypeMap[normalizedProperties.type] || normalizedProperties.type,
    };
  };

  // Update properties when element changes
  useEffect(() => {
    if (selectedElement) {
      const properties = initializeProperties(selectedElement);
      setNormalizedProperties(properties);

      // Convert to legacy format for compatibility
      const legacyFormat = chartPropertyManager.toLegacyFormat(selectedElement);
      setLegacyProperties(legacyFormat);
    } else {
      setNormalizedProperties(null);
      setLegacyProperties({});
    }
  }, [selectedElement]);

  const elementInfo = getElementDisplayInfo(selectedElement);

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
              value={normalizedProperties?.title || ""}
              onChange={(e) => updateProperty("title", e.target.value)}
              className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-dashboard-text-muted">Width</Label>
              <Input
                type="number"
                value={normalizedProperties?.width || ""}
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
                value={normalizedProperties?.height || ""}
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
                  value={normalizedProperties?.primaryColor || "#3b82f6"}
                  onChange={(e) =>
                    updateProperty("primaryColor", e.target.value)
                  }
                  className="w-10 h-8 rounded border border-dashboard-border"
                />
                <Input
                  value={normalizedProperties?.primaryColor || "#3b82f6"}
                  onChange={(e) =>
                    updateProperty("primaryColor", e.target.value)
                  }
                  className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
                />
              </div>
            </div>

            {/* Color Palette */}
            <div className="space-y-2">
              <Label className="text-xs text-dashboard-text-muted">
                Quick Colors
              </Label>
              <div className="grid grid-cols-8 gap-1">
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
                  "#0ea5e9", // Sky
                  "#22c55e", // Emerald
                  "#eab308", // Amber
                  "#dc2626", // Red-600
                  "#7c3aed", // Violet-600
                  "#0891b2", // Cyan-600
                  "#65a30d", // Lime-600
                  "#ea580c", // Orange-600
                  "#db2777", // Pink-600
                  "#4b5563", // Gray-600
                  "#059669", // Emerald-600
                  "#9333ea", // Purple-600
                ].map((color) => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded border-2 transition-all hover:scale-110 ${
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

                  {/* Table Chart Specific */}
                  {elementInfo.type === "table" && (
                    <>
                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-dashboard-text-muted">
                          Show Header
                        </Label>
                        <Switch
                          checked={properties.showHeader !== false}
                          onCheckedChange={(checked) =>
                            updateProperty("showHeader", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-dashboard-text-muted">
                          Alternate Rows
                        </Label>
                        <Switch
                          checked={properties.alternateRows || false}
                          onCheckedChange={(checked) =>
                            updateProperty("alternateRows", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-dashboard-text-muted">
                          Show Borders
                        </Label>
                        <Switch
                          checked={properties.showBorders !== false}
                          onCheckedChange={(checked) =>
                            updateProperty("showBorders", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-dashboard-text-muted">
                          Editable
                        </Label>
                        <Switch
                          checked={properties.editable || false}
                          onCheckedChange={(checked) =>
                            updateProperty("editable", checked)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-dashboard-text-muted">
                          Header Color
                        </Label>
                        <Input
                          type="color"
                          value={properties.headerColor || "#1e293b"}
                          onChange={(e) =>
                            updateProperty("headerColor", e.target.value)
                          }
                          className="w-full h-8"
                        />
                      </div>
                    </>
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
