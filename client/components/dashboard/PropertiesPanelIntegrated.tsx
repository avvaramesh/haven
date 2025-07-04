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
                      normalizedProperties?.primaryColor === color
                        ? "border-dashboard-accent ring-2 ring-dashboard-accent/30"
                        : "border-dashboard-border hover:border-dashboard-accent/50"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => updateProperty("primaryColor", color)}
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
                  value={normalizedProperties?.backgroundColor || "#1e293b"}
                  onChange={(e) =>
                    updateProperty("backgroundColor", e.target.value)
                  }
                  className="w-10 h-8 rounded border border-dashboard-border"
                />
                <Input
                  value={normalizedProperties?.backgroundColor || "#1e293b"}
                  onChange={(e) =>
                    updateProperty("backgroundColor", e.target.value)
                  }
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
              value={[normalizedProperties?.fontSize || 14]}
              onValueChange={(value) => updateProperty("fontSize", value[0])}
              min={8}
              max={48}
              step={1}
              className="w-full"
            />
            <span className="text-xs text-dashboard-text-muted">
              {normalizedProperties?.fontSize || 14}px
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
                  variant={
                    normalizedProperties?.textAlign === align
                      ? "default"
                      : "ghost"
                  }
                  size="sm"
                  onClick={() => updateProperty("textAlign", align)}
                  className={
                    normalizedProperties?.textAlign === align
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
        {normalizedProperties && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {[
                "line",
                "area",
                "bar",
                "column",
                "pie",
                "donut",
                "scatter",
              ].includes(normalizedProperties.type) ? (
                <BarChart3 className="w-4 h-4 text-dashboard-accent" />
              ) : (
                <Settings className="w-4 h-4 text-dashboard-accent" />
              )}
              <h4 className="font-medium text-dashboard-text">
                {[
                  "line",
                  "area",
                  "bar",
                  "column",
                  "pie",
                  "donut",
                  "scatter",
                ].includes(normalizedProperties.type)
                  ? "Chart Options"
                  : "Display Options"}
              </h4>
            </div>

            <div className="space-y-3">
              {/* Chart Type - only for charts */}
              {[
                "line",
                "area",
                "bar",
                "column",
                "pie",
                "donut",
                "scatter",
              ].includes(normalizedProperties.type) && (
                <div className="space-y-2">
                  <Label className="text-xs text-dashboard-text-muted">
                    Chart Type
                  </Label>
                  <Select
                    value={normalizedProperties.type}
                    onValueChange={(value) => updateProperty("type", value)}
                  >
                    <SelectTrigger className="bg-dashboard-surface border-dashboard-border text-dashboard-text">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(normalizedProperties.type === "line" ||
                        normalizedProperties.type === "area") && (
                        <>
                          <SelectItem value="line">Line Chart</SelectItem>
                          <SelectItem value="area">Area Chart</SelectItem>
                        </>
                      )}
                      {(normalizedProperties.type === "bar" ||
                        normalizedProperties.type === "column") && (
                        <>
                          <SelectItem value="bar">Bar Chart</SelectItem>
                          <SelectItem value="column">Column Chart</SelectItem>
                        </>
                      )}
                      {(normalizedProperties.type === "pie" ||
                        normalizedProperties.type === "donut") && (
                        <>
                          <SelectItem value="pie">Pie Chart</SelectItem>
                          <SelectItem value="donut">Donut Chart</SelectItem>
                        </>
                      )}
                      {normalizedProperties.type === "scatter" && (
                        <SelectItem value="scatter">Scatter Chart</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* KPI Value - for KPI elements */}
              {normalizedProperties.type === "metric" && (
                <div className="space-y-2">
                  <Label className="text-xs text-dashboard-text-muted">
                    Value
                  </Label>
                  <Input
                    value={(normalizedProperties as any).value || ""}
                    onChange={(e) => updateProperty("value", e.target.value)}
                    className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
                  />
                </div>
              )}

              {/* Common Chart Options */}
              {chartSupportsLegend(normalizedProperties.type) && (
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-dashboard-text-muted">
                    Show Legend
                  </Label>
                  <Switch
                    checked={(normalizedProperties as any).enabled !== false}
                    onCheckedChange={(checked) =>
                      updateProperty("enabled", checked)
                    }
                  />
                </div>
              )}

              {chartSupportsAxes(normalizedProperties.type) && (
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-dashboard-text-muted">
                    Show Grid
                  </Label>
                  <Switch
                    checked={
                      (normalizedProperties as any).xAxis?.showGridLines !==
                      false
                    }
                    onCheckedChange={(checked) => {
                      updateProperty("xAxis.showGridLines", checked);
                      updateProperty("yAxis.showGridLines", checked);
                    }}
                  />
                </div>
              )}

              {/* Line Chart Specific */}
              {(normalizedProperties.type === "line" ||
                normalizedProperties.type === "area") && (
                <>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-dashboard-text-muted">
                      Show Data Points
                    </Label>
                    <Switch
                      checked={
                        (normalizedProperties as any).showDataPoints !== false
                      }
                      onCheckedChange={(checked) =>
                        updateProperty("showDataPoints", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-dashboard-text-muted">
                      Smooth Curves
                    </Label>
                    <Switch
                      checked={
                        (normalizedProperties as any).smoothCurve === true
                      }
                      onCheckedChange={(checked) =>
                        updateProperty("smoothCurve", checked)
                      }
                    />
                  </div>
                  {normalizedProperties.type === "area" && (
                    <div className="space-y-2">
                      <Label className="text-xs text-dashboard-text-muted">
                        Area Opacity:{" "}
                        {Math.round(
                          ((normalizedProperties as any).areaOpacity || 0.3) *
                            100,
                        )}
                        %
                      </Label>
                      <Slider
                        value={[
                          ((normalizedProperties as any).areaOpacity || 0.3) *
                            100,
                        ]}
                        onValueChange={(value) =>
                          updateProperty("areaOpacity", value[0] / 100)
                        }
                        min={0}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  )}
                </>
              )}

              {/* Bar Chart Specific */}
              {(normalizedProperties.type === "bar" ||
                normalizedProperties.type === "column") && (
                <>
                  <div className="space-y-2">
                    <Label className="text-xs text-dashboard-text-muted">
                      Bar Spacing:{" "}
                      {Math.round(
                        ((normalizedProperties as any).barSpacing || 0.1) * 100,
                      )}
                      %
                    </Label>
                    <Slider
                      value={[
                        ((normalizedProperties as any).barSpacing || 0.1) * 100,
                      ]}
                      onValueChange={(value) =>
                        updateProperty("barSpacing", value[0] / 100)
                      }
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-dashboard-text-muted">
                      Show Data Labels
                    </Label>
                    <Switch
                      checked={
                        (normalizedProperties as any).showDataLabels === true
                      }
                      onCheckedChange={(checked) =>
                        updateProperty("showDataLabels", checked)
                      }
                    />
                  </div>
                </>
              )}

              {/* Pie Chart Specific */}
              {(normalizedProperties.type === "pie" ||
                normalizedProperties.type === "donut") && (
                <>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-dashboard-text-muted">
                      Show Percentages
                    </Label>
                    <Switch
                      checked={
                        (normalizedProperties as any).showPercentages !== false
                      }
                      onCheckedChange={(checked) =>
                        updateProperty("showPercentages", checked)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-dashboard-text-muted">
                      Start Angle:{" "}
                      {(normalizedProperties as any).startAngle || 0}°
                    </Label>
                    <Slider
                      value={[(normalizedProperties as any).startAngle || 0]}
                      onValueChange={(value) =>
                        updateProperty("startAngle", value[0])
                      }
                      min={0}
                      max={360}
                      step={15}
                      className="w-full"
                    />
                  </div>
                  {normalizedProperties.type === "donut" && (
                    <div className="space-y-2">
                      <Label className="text-xs text-dashboard-text-muted">
                        Inner Radius:{" "}
                        {(normalizedProperties as any).innerRadius || 0}%
                      </Label>
                      <Slider
                        value={[(normalizedProperties as any).innerRadius || 0]}
                        onValueChange={(value) =>
                          updateProperty("innerRadius", value[0])
                        }
                        min={0}
                        max={80}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  )}
                </>
              )}

              {/* Scatter Chart Specific */}
              {normalizedProperties.type === "scatter" && (
                <>
                  <div className="space-y-2">
                    <Label className="text-xs text-dashboard-text-muted">
                      Point Size: {(normalizedProperties as any).pointSize || 6}
                      px
                    </Label>
                    <Slider
                      value={[(normalizedProperties as any).pointSize || 6]}
                      onValueChange={(value) =>
                        updateProperty("pointSize", value[0])
                      }
                      min={2}
                      max={20}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-dashboard-text-muted">
                      Show Trend Line
                    </Label>
                    <Switch
                      checked={
                        (normalizedProperties as any).showTrendLine === true
                      }
                      onCheckedChange={(checked) =>
                        updateProperty("showTrendLine", checked)
                      }
                    />
                  </div>
                </>
              )}

              {/* Table Specific */}
              {normalizedProperties.type === "table" && (
                <>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-dashboard-text-muted">
                      Show Header
                    </Label>
                    <Switch
                      checked={
                        (normalizedProperties as any).showHeader !== false
                      }
                      onCheckedChange={(checked) =>
                        updateProperty("showHeader", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-dashboard-text-muted">
                      Alternate Row Colors
                    </Label>
                    <Switch
                      checked={
                        (normalizedProperties as any).alternateRowColors ===
                        true
                      }
                      onCheckedChange={(checked) =>
                        updateProperty("alternateRowColors", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-dashboard-text-muted">
                      Show Borders
                    </Label>
                    <Switch
                      checked={
                        (normalizedProperties as any).borderEnabled !== false
                      }
                      onCheckedChange={(checked) =>
                        updateProperty("borderEnabled", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-dashboard-text-muted">
                      Editable
                    </Label>
                    <Switch
                      checked={(normalizedProperties as any).editable === true}
                      onCheckedChange={(checked) =>
                        updateProperty("editable", checked)
                      }
                    />
                  </div>
                </>
              )}

              {/* KPI Specific Options */}
              {normalizedProperties.type === "metric" && (
                <>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-dashboard-text-muted">
                      Show Trend
                    </Label>
                    <Switch
                      checked={
                        (normalizedProperties as any).showTrend !== false
                      }
                      onCheckedChange={(checked) =>
                        updateProperty("showTrend", checked)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-dashboard-text-muted">
                      Unit
                    </Label>
                    <Input
                      value={(normalizedProperties as any).unit || ""}
                      onChange={(e) => updateProperty("unit", e.target.value)}
                      placeholder="e.g., %, USD, users"
                      className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-dashboard-text-muted">
                      Show Progress Bar
                    </Label>
                    <Switch
                      checked={
                        (normalizedProperties as any).showProgress === true
                      }
                      onCheckedChange={(checked) =>
                        updateProperty("showProgress", checked)
                      }
                    />
                  </div>
                </>
              )}

              {/* X/Y Axis Properties - Show for charts that support axes */}
              {chartSupportsAxes(normalizedProperties.type) && (
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
                          value={
                            (normalizedProperties as any).xAxis?.label || ""
                          }
                          onChange={(e) =>
                            updateProperty("xAxis.label", e.target.value)
                          }
                          className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-dashboard-text-muted">
                          Show X-Axis
                        </Label>
                        <Switch
                          checked={
                            (normalizedProperties as any).xAxis?.enabled !==
                            false
                          }
                          onCheckedChange={(checked) =>
                            updateProperty("xAxis.enabled", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-dashboard-text-muted">
                          Show Grid Lines
                        </Label>
                        <Switch
                          checked={
                            (normalizedProperties as any).xAxis
                              ?.showGridLines !== false
                          }
                          onCheckedChange={(checked) =>
                            updateProperty("xAxis.showGridLines", checked)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-dashboard-text-muted">
                          Label Rotation:{" "}
                          {(normalizedProperties as any).xAxis?.tickRotation ||
                            0}
                          °
                        </Label>
                        <Slider
                          value={[
                            (normalizedProperties as any).xAxis?.tickRotation ||
                              0,
                          ]}
                          onValueChange={(value) =>
                            updateProperty("xAxis.tickRotation", value[0])
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
