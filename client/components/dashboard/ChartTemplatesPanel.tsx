import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart3,
  LineChart,
  PieChart,
  AreaChart,
  ScatterChart,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  Target,
  Calendar,
  Search,
  Star,
  Plus,
  Zap,
  Table,
  Gauge,
  Map,
  BarChart2,
  TrendingDown,
  Activity,
  Grid3X3,
  Layers,
} from "lucide-react";

interface ChartType {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: "basic" | "advanced" | "specialized";
  variants: string[];
}

interface ChartTemplate {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: "sales" | "marketing" | "finance" | "operations" | "popular";
  type:
    | "bar"
    | "line"
    | "pie"
    | "area"
    | "scatter"
    | "kpi"
    | "table"
    | "gauge"
    | "funnel"
    | "waterfall";
  preview: string;
}

export default function ChartTemplatesPanel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [viewMode, setViewMode] = useState<"types" | "templates">("types"); // Toggle between chart types and templates

  const chartTypes: ChartType[] = [
    {
      id: "bar",
      name: "Bar Chart",
      description: "Compare values across categories",
      icon: BarChart3,
      category: "basic",
      variants: [
        "Vertical Bar",
        "Horizontal Bar",
        "Stacked Bar",
        "Grouped Bar",
      ],
    },
    {
      id: "line",
      name: "Line Chart",
      description: "Show trends over time",
      icon: LineChart,
      category: "basic",
      variants: ["Simple Line", "Multi-line", "Stepped Line", "Smooth Line"],
    },
    {
      id: "pie",
      name: "Pie Chart",
      description: "Show parts of a whole",
      icon: PieChart,
      category: "basic",
      variants: ["Pie", "Donut", "Semi-circle", "Nested Donut"],
    },
    {
      id: "area",
      name: "Area Chart",
      description: "Show volume and trends",
      icon: AreaChart,
      category: "basic",
      variants: [
        "Filled Area",
        "Stacked Area",
        "Percentage Area",
        "Stream Graph",
      ],
    },
    {
      id: "table",
      name: "Table",
      description: "Display data in rows and columns",
      icon: Table,
      category: "basic",
      variants: ["Simple Table", "Pivot Table", "Matrix", "Card Table"],
    },
    {
      id: "kpi",
      name: "KPI Card",
      description: "Key performance indicators",
      icon: Gauge,
      category: "basic",
      variants: [
        "Number Card",
        "Progress Card",
        "Trend Card",
        "Comparison Card",
      ],
    },
    {
      id: "scatter",
      name: "Scatter Plot",
      description: "Show correlation between variables",
      icon: ScatterChart,
      category: "advanced",
      variants: [
        "Bubble Chart",
        "Scatter Plot",
        "3D Scatter",
        "Regression Line",
      ],
    },
    {
      id: "gauge",
      name: "Gauge Chart",
      description: "Show progress towards goals",
      icon: Activity,
      category: "advanced",
      variants: ["Radial Gauge", "Linear Gauge", "Bullet Chart", "Speedometer"],
    },
    {
      id: "funnel",
      name: "Funnel Chart",
      description: "Show process flow and conversion",
      icon: TrendingDown,
      category: "advanced",
      variants: [
        "Sales Funnel",
        "Conversion Funnel",
        "Pyramid",
        "Inverted Funnel",
      ],
    },
    {
      id: "waterfall",
      name: "Waterfall Chart",
      description: "Show cumulative effects of values",
      icon: BarChart2,
      category: "advanced",
      variants: [
        "Financial Waterfall",
        "Bridge Chart",
        "Variance Analysis",
        "Sequential",
      ],
    },
    {
      id: "heatmap",
      name: "Heat Map",
      description: "Show data density with colors",
      icon: Grid3X3,
      category: "specialized",
      variants: [
        "Calendar Heatmap",
        "Matrix Heatmap",
        "Geographic Heatmap",
        "Correlation Matrix",
      ],
    },
    {
      id: "treemap",
      name: "Tree Map",
      description: "Show hierarchical data",
      icon: Layers,
      category: "specialized",
      variants: [
        "Simple Treemap",
        "Nested Treemap",
        "Sunburst",
        "Icicle Chart",
      ],
    },
  ];

  const templates: ChartTemplate[] = [
    {
      id: "1",
      name: "Revenue Trend",
      description: "Monthly revenue over time",
      icon: TrendingUp,
      category: "sales",
      type: "line",
      preview: "/api/placeholder/chart-line",
    },
    {
      id: "2",
      name: "Sales by Category",
      description: "Product category breakdown",
      icon: BarChart3,
      category: "sales",
      type: "bar",
      preview: "/api/placeholder/chart-bar",
    },
    {
      id: "3",
      name: "Market Share",
      description: "Competitive market analysis",
      icon: PieChart,
      category: "marketing",
      type: "pie",
      preview: "/api/placeholder/chart-pie",
    },
    {
      id: "4",
      name: "Customer Growth",
      description: "Customer acquisition over time",
      icon: Users,
      category: "marketing",
      type: "area",
      preview: "/api/placeholder/chart-area",
    },
    {
      id: "5",
      name: "Total Revenue",
      description: "Key performance indicator",
      icon: DollarSign,
      category: "finance",
      type: "kpi",
      preview: "/api/placeholder/kpi",
    },
    {
      id: "6",
      name: "Conversion Funnel",
      description: "Sales funnel analysis",
      icon: Target,
      category: "operations",
      type: "bar",
      preview: "/api/placeholder/funnel",
    },
  ];

  const templateCategories = [
    { id: "popular", name: "Popular", icon: Star },
    { id: "sales", name: "Sales", icon: DollarSign },
    { id: "marketing", name: "Marketing", icon: Target },
    { id: "finance", name: "Finance", icon: TrendingUp },
    { id: "operations", name: "Operations", icon: Users },
  ];

  const chartTypeCategories = [
    { id: "basic", name: "Basic", icon: BarChart3 },
    { id: "advanced", name: "Advanced", icon: TrendingUp },
    { id: "specialized", name: "Specialized", icon: Target },
  ];

  const filteredTemplates = templates.filter(
    (template) =>
      (selectedCategory === "popular" ||
        template.category === selectedCategory) &&
      template.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredChartTypes = chartTypes.filter(
    (chartType) =>
      (selectedCategory === "basic" ||
        chartType.category === selectedCategory) &&
      chartType.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const addTemplate = (template: ChartTemplate) => {
    // In real implementation, this would add the chart to the canvas
    console.log("Adding template:", template);
  };

  const addChartType = (chartType: ChartType, variant?: string) => {
    // In real implementation, this would create a new chart of the specified type
    console.log("Creating chart:", chartType.id, variant || "default");
  };

  return (
    <div className="w-80 bg-dashboard-background border-r border-dashboard-border h-full flex flex-col">
      <div className="p-4 border-b border-dashboard-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-dashboard-accent" />
            <h3 className="font-semibold text-dashboard-text">
              {viewMode === "types" ? "Chart Types" : "Chart Library"}
            </h3>
          </div>
          <div className="flex bg-dashboard-surface border border-dashboard-border rounded-lg p-1">
            <Button
              variant={viewMode === "types" ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                setViewMode("types");
                setSelectedCategory("basic");
              }}
              className={`h-6 px-2 text-xs ${
                viewMode === "types"
                  ? "bg-dashboard-accent text-white"
                  : "text-dashboard-text hover:bg-dashboard-muted"
              }`}
            >
              Types
            </Button>
            <Button
              variant={viewMode === "templates" ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                setViewMode("templates");
                setSelectedCategory("popular");
              }}
              className={`h-6 px-2 text-xs ${
                viewMode === "templates"
                  ? "bg-dashboard-accent text-white"
                  : "text-dashboard-text hover:bg-dashboard-muted"
              }`}
            >
              Templates
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-dashboard-text-muted" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              viewMode === "types"
                ? "Search chart types..."
                : "Search templates..."
            }
            className="pl-10 bg-dashboard-surface border-dashboard-border text-dashboard-text"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-3 border-b border-dashboard-border">
        <div className="flex flex-wrap gap-1">
          {(viewMode === "types"
            ? chartTypeCategories
            : templateCategories
          ).map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={
                selectedCategory === category.id
                  ? "bg-dashboard-accent text-white"
                  : "text-dashboard-text hover:bg-dashboard-muted"
              }
            >
              <category.icon className="w-3 h-3 mr-1" />
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {viewMode === "types" ? (
          /* Chart Types Grid */
          <div className="space-y-3">
            {filteredChartTypes.map((chartType) => (
              <div
                key={chartType.id}
                className="group border border-dashboard-border rounded-lg bg-dashboard-surface"
              >
                {/* Main Chart Type */}
                <div
                  className="p-3 hover:border-dashboard-accent transition-colors cursor-pointer"
                  onClick={() => addChartType(chartType)}
                  draggable={true}
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      "text/plain",
                      `new-chart:${chartType.id}`,
                    );
                    e.dataTransfer.effectAllowed = "copy";
                  }}
                  title="Click to add or drag to canvas"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-dashboard-muted rounded-lg group-hover:bg-dashboard-accent/20 transition-colors">
                      <chartType.icon className="w-4 h-4 text-dashboard-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-dashboard-text text-sm truncate">
                        {chartType.name}
                      </h4>
                      <p className="text-xs text-dashboard-text-muted mt-1">
                        {chartType.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-dashboard-text-muted">
                          {chartType.variants.length} variants
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity text-dashboard-accent hover:bg-dashboard-accent/20"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Create
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart Variants */}
                <div className="px-3 pb-3">
                  <div className="grid grid-cols-2 gap-1 pt-2 border-t border-dashboard-border/50">
                    {chartType.variants.slice(0, 4).map((variant, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={() => addChartType(chartType, variant)}
                        className="h-6 px-2 text-xs text-dashboard-text-muted hover:text-dashboard-accent hover:bg-dashboard-accent/10 justify-start"
                        draggable={true}
                        onDragStart={(e) => {
                          e.stopPropagation();
                          e.dataTransfer.setData(
                            "text/plain",
                            `new-chart:${chartType.id}-${variant.toLowerCase().replace(/ /g, "-")}`,
                          );
                          e.dataTransfer.effectAllowed = "copy";
                        }}
                        title="Click to add or drag to canvas"
                      >
                        {variant}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Templates Grid */
          <div className="space-y-3">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group p-3 border border-dashboard-border rounded-lg hover:border-dashboard-accent transition-colors cursor-pointer bg-dashboard-surface"
                onClick={() => addTemplate(template)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-dashboard-muted rounded-lg group-hover:bg-dashboard-accent/20 transition-colors">
                    <template.icon className="w-4 h-4 text-dashboard-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-dashboard-text text-sm truncate">
                      {template.name}
                    </h4>
                    <p className="text-xs text-dashboard-text-muted mt-1">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-dashboard-text-muted capitalize">
                        {template.type} chart
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity text-dashboard-accent hover:bg-dashboard-accent/20"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Mini Preview */}
                <div className="mt-3 h-16 bg-dashboard-muted rounded border opacity-50 group-hover:opacity-80 transition-opacity">
                  <div className="h-full flex items-center justify-center text-xs text-dashboard-text-muted">
                    {template.type === "line" && (
                      <LineChart className="w-8 h-8 text-dashboard-accent" />
                    )}
                    {template.type === "bar" && (
                      <BarChart3 className="w-8 h-8 text-dashboard-accent" />
                    )}
                    {template.type === "pie" && (
                      <PieChart className="w-8 h-8 text-dashboard-accent" />
                    )}
                    {template.type === "area" && (
                      <AreaChart className="w-8 h-8 text-dashboard-accent" />
                    )}
                    {template.type === "table" && (
                      <Table className="w-8 h-8 text-dashboard-accent" />
                    )}
                    {template.type === "kpi" && (
                      <div className="text-center">
                        <div className="text-lg font-bold text-dashboard-accent">
                          $125k
                        </div>
                        <div className="text-xs text-dashboard-text-muted">
                          Sample KPI
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-dashboard-border">
        <Button className="w-full bg-dashboard-accent hover:bg-dashboard-accent-light text-white gap-2">
          <Zap className="w-4 h-4" />
          {viewMode === "types" ? "AI Suggest Chart Type" : "AI Generate Chart"}
        </Button>
      </div>
    </div>
  );
}
