import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  LineChart,
  PieChart,
  Zap,
  Target,
  Table,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import {
  VisualizationType,
  chartSupportsAxes,
  chartSupportsLegend,
  getRelevantPropertyGroups,
} from "@/lib/chartProperties";
import {
  chartPropertyManager,
  createDefaultChartProperties,
  updateChartProperty,
  getChartProperties,
} from "@/lib/chartPropertyManager";
import { demoChartProperties } from "@/lib/chartPropertyDemo";

const chartTypeIcons = {
  line: LineChart,
  bar: BarChart3,
  pie: PieChart,
  scatter: Scatter,
  metric: Target,
  table: Table,
};

const chartTypeNames = {
  line: "Line Chart",
  bar: "Bar Chart",
  pie: "Pie Chart",
  scatter: "Scatter Chart",
  metric: "KPI Metric",
  table: "Data Table",
};

export default function PropertyDemo() {
  const [selectedChart, setSelectedChart] = useState<VisualizationType>("line");
  const [properties, setProperties] = useState<any>(null);
  const [propertyGroups, setPropertyGroups] = useState<string[]>([]);
  const [demoResults, setDemoResults] = useState<string>("");

  // Initialize properties for selected chart type
  useEffect(() => {
    const elementId = `demo-${selectedChart}`;
    let chartProperties = getChartProperties(elementId);

    if (!chartProperties) {
      chartProperties = createDefaultChartProperties(selectedChart, elementId);
    }

    setProperties(chartProperties);
    setPropertyGroups(getRelevantPropertyGroups(selectedChart));
  }, [selectedChart]);

  const runDemo = () => {
    console.clear();
    const results = demoChartProperties.demonstrate();
    demoChartProperties.compare();
    setDemoResults(
      "Demo completed! Check the browser console for detailed output.",
    );
  };

  const updateDemoProperty = (key: string, value: any) => {
    const elementId = `demo-${selectedChart}`;
    updateChartProperty(elementId, key, value);

    // Refresh properties
    const updatedProperties = getChartProperties(elementId);
    setProperties(updatedProperties);
  };

  const resetProperties = () => {
    const elementId = `demo-${selectedChart}`;
    chartPropertyManager.removeElement(elementId);
    const newProperties = createDefaultChartProperties(
      selectedChart,
      elementId,
    );
    setProperties(newProperties);
  };

  return (
    <div className="min-h-screen bg-dashboard-background text-dashboard-text p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-dashboard-accent">
            Normalized Chart Properties Demo
          </h1>
          <p className="text-dashboard-text-muted max-w-2xl mx-auto">
            This demo showcases the new normalized chart property system that
            provides consistent property structures across all chart types while
            handling logical differences between chart types.
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={runDemo} className="bg-dashboard-accent">
              <RefreshCw className="w-4 h-4 mr-2" />
              Run Full Demo
            </Button>
            <Button variant="outline" onClick={resetProperties}>
              Reset Properties
            </Button>
          </div>
          {demoResults && (
            <div className="p-3 bg-dashboard-surface border border-dashboard-accent/30 rounded-lg">
              <p className="text-sm text-dashboard-accent">{demoResults}</p>
            </div>
          )}
        </div>

        {/* Chart Type Selector */}
        <Card className="bg-dashboard-surface border-dashboard-border">
          <CardHeader>
            <CardTitle className="text-dashboard-text">
              Select Chart Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {(Object.keys(chartTypeIcons) as VisualizationType[]).map(
                (type) => {
                  const Icon = chartTypeIcons[type];
                  return (
                    <Button
                      key={type}
                      variant={selectedChart === type ? "default" : "outline"}
                      className={`h-20 flex flex-col gap-2 ${
                        selectedChart === type
                          ? "bg-dashboard-accent text-white"
                          : "border-dashboard-border hover:bg-dashboard-muted"
                      }`}
                      onClick={() => setSelectedChart(type)}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-xs">{chartTypeNames[type]}</span>
                    </Button>
                  );
                },
              )}
            </div>
          </CardContent>
        </Card>

        {/* Property Analysis */}
        {properties && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Property Overview */}
            <Card className="bg-dashboard-surface border-dashboard-border">
              <CardHeader>
                <CardTitle className="text-dashboard-text flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Property Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-dashboard-text-muted">
                      Chart Type
                    </p>
                    <Badge className="bg-dashboard-accent/20 text-dashboard-accent">
                      {chartTypeNames[selectedChart]}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-dashboard-text-muted">
                      Total Properties
                    </p>
                    <Badge
                      variant="outline"
                      className="border-dashboard-border"
                    >
                      {Object.keys(properties).length}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-dashboard-text-muted">
                      Supports Axes
                    </p>
                    <Badge
                      variant={
                        chartSupportsAxes(selectedChart)
                          ? "default"
                          : "secondary"
                      }
                    >
                      {chartSupportsAxes(selectedChart) ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-dashboard-text-muted">
                      Supports Legend
                    </p>
                    <Badge
                      variant={
                        chartSupportsLegend(selectedChart)
                          ? "default"
                          : "secondary"
                      }
                    >
                      {chartSupportsLegend(selectedChart) ? "Yes" : "No"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-dashboard-text-muted">
                    Property Groups
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {propertyGroups.map((group) => (
                      <Badge
                        key={group}
                        variant="outline"
                        className="border-dashboard-border"
                      >
                        {group}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-dashboard-text-muted">
                    Key Properties
                  </p>
                  <div className="text-sm space-y-1">
                    <p>Title: "{properties.title}"</p>
                    <p>
                      Dimensions: {properties.width}×{properties.height}
                    </p>
                    <p>Primary Color: {properties.primaryColor}</p>
                    <p>Font Size: {properties.fontSize}px</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card className="bg-dashboard-surface border-dashboard-border">
              <CardHeader>
                <CardTitle className="text-dashboard-text">
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="base" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="base">Base</TabsTrigger>
                    <TabsTrigger value="colors">Colors</TabsTrigger>
                    <TabsTrigger value="typography">Typography</TabsTrigger>
                    <TabsTrigger value="specific">Specific</TabsTrigger>
                  </TabsList>

                  <TabsContent value="base" className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>ID:</span>
                        <span className="font-mono text-xs bg-dashboard-muted px-2 py-1 rounded">
                          {properties.id}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span>{properties.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Width:</span>
                        <span>{properties.width}px</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Height:</span>
                        <span>{properties.height}px</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Background:</span>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded border border-dashboard-border"
                            style={{
                              backgroundColor: properties.backgroundColor,
                            }}
                          />
                          <span className="font-mono text-xs">
                            {properties.backgroundColor}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="colors" className="space-y-3">
                    <div className="text-sm space-y-2">
                      {["primaryColor", "secondaryColor", "accentColor"].map(
                        (colorKey) => (
                          <div
                            key={colorKey}
                            className="flex justify-between items-center"
                          >
                            <span>{colorKey.replace("Color", "")}:</span>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded border border-dashboard-border"
                                style={{
                                  backgroundColor: (properties as any)[
                                    colorKey
                                  ],
                                }}
                              />
                              <span className="font-mono text-xs">
                                {(properties as any)[colorKey]}
                              </span>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="typography" className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>Font Size:</span>
                        <span>{properties.fontSize}px</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Font Weight:</span>
                        <span>{properties.fontWeight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Text Align:</span>
                        <span>{properties.textAlign}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Title Font Size:</span>
                        <span>{properties.titleFontSize}px</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="specific" className="space-y-3">
                    <div className="text-sm space-y-2">
                      {selectedChart === "line" && (
                        <>
                          <div className="flex justify-between">
                            <span>Show Data Points:</span>
                            <span>
                              {(properties as any).showDataPoints
                                ? "Yes"
                                : "No"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Smooth Curve:</span>
                            <span>
                              {(properties as any).smoothCurve ? "Yes" : "No"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Line Width:</span>
                            <span>{(properties as any).lineWidth}px</span>
                          </div>
                        </>
                      )}
                      {selectedChart === "bar" && (
                        <>
                          <div className="flex justify-between">
                            <span>Bar Spacing:</span>
                            <span>
                              {((properties as any).barSpacing * 100).toFixed(
                                0,
                              )}
                              %
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Show Data Labels:</span>
                            <span>
                              {(properties as any).showDataLabels
                                ? "Yes"
                                : "No"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Orientation:</span>
                            <span>{(properties as any).orientation}</span>
                          </div>
                        </>
                      )}
                      {selectedChart === "pie" && (
                        <>
                          <div className="flex justify-between">
                            <span>Start Angle:</span>
                            <span>{(properties as any).startAngle}°</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Show Percentages:</span>
                            <span>
                              {(properties as any).showPercentages
                                ? "Yes"
                                : "No"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Inner Radius:</span>
                            <span>{(properties as any).innerRadius}</span>
                          </div>
                        </>
                      )}
                      {selectedChart === "metric" && (
                        <>
                          <div className="flex justify-between">
                            <span>Value:</span>
                            <span>{(properties as any).value}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Show Trend:</span>
                            <span>
                              {(properties as any).showTrend ? "Yes" : "No"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Unit:</span>
                            <span>{(properties as any).unit || "None"}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Benefits Summary */}
        <Card className="bg-dashboard-surface border-dashboard-border">
          <CardHeader>
            <CardTitle className="text-dashboard-text flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Normalization Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-dashboard-accent">
                  Consistency
                </h4>
                <ul className="text-sm space-y-1 text-dashboard-text-muted">
                  <li>✅ Same base properties across all chart types</li>
                  <li>✅ Predictable property names and structure</li>
                  <li>✅ Consistent property counts for same chart types</li>
                  <li>
                    ✅ Logical property grouping (base, colors, typography,
                    etc.)
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-dashboard-accent">
                  Type Safety
                </h4>
                <ul className="text-sm space-y-1 text-dashboard-text-muted">
                  <li>✅ TypeScript interfaces for all property types</li>
                  <li>✅ Property validation and error checking</li>
                  <li>✅ Only applicable properties for each chart type</li>
                  <li>✅ Compile-time type checking</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-dashboard-accent">
                  Maintainability
                </h4>
                <ul className="text-sm space-y-1 text-dashboard-text-muted">
                  <li>✅ Centralized property management</li>
                  <li>✅ Easy to add new chart types</li>
                  <li>✅ Migration support from legacy system</li>
                  <li>✅ Clear separation of concerns</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-dashboard-accent">
                  Developer Experience
                </h4>
                <ul className="text-sm space-y-1 text-dashboard-text-muted">
                  <li>✅ Intuitive API for property updates</li>
                  <li>✅ Auto-completion in IDEs</li>
                  <li>✅ Comprehensive documentation</li>
                  <li>✅ Easy testing and debugging</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
