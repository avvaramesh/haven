import React from "react";
import SmartChart from "./SmartChart";
import RevenueByCategoryChart from "./RevenueByCategoryChart";
import SalesDistributionChart from "./SalesDistributionChart";
import SalesOverTimeChart from "./SalesOverTimeChart";
import ProfitMarginChart from "./ProfitMarginChart";
import KPIWidget from "./KPIWidget";
import TableChart from "./TableChart";
import GaugeChart from "./GaugeChart";
import FunnelChart from "./FunnelChart";
import WaterfallChart from "./WaterfallChart";
import HeatmapChart from "./HeatmapChart";
import TreemapChart from "./TreemapChart";
import ScatterChart from "./ScatterChart";

interface DynamicChartProps {
  chartType: string;
  properties?: Record<string, any>;
}

export default function DynamicChart({
  chartType,
  properties,
}: DynamicChartProps) {
  // Render different chart types based on chartType, passing properties for real-time updates
  switch (chartType) {
    case "line":
    case "smart-chart":
      return <SmartChart properties={{ ...properties, chartType }} />;

    case "bar":
    case "revenue-chart":
      return <RevenueByCategoryChart properties={properties} />;

    case "pie":
    case "sales-dist":
      return <SalesDistributionChart properties={properties} />;

    case "area":
    case "sales-over-time":
      return <SalesOverTimeChart properties={{ ...properties, chartType }} />;

    case "profit-margin":
      return <ProfitMarginChart properties={properties} />;

    case "kpi":
    case "kpi-widget":
      return <KPIWidget properties={properties} />;

    // New chart type variants - all pass properties for smooth updates
    case "line-simple":
    case "line-multi":
    case "line-stepped":
    case "line-smooth":
    case "simple-line":
    case "multi-line":
    case "stepped-line":
    case "smooth-line":
    case "Simple Line":
    case "Multi-line":
    case "Stepped Line":
    case "Smooth Line":
      return <SmartChart properties={{ ...properties, chartType }} />;

    case "bar-vertical":
    case "bar-horizontal":
    case "bar-stacked":
    case "bar-grouped":
    case "vertical-bar":
    case "horizontal-bar":
    case "stacked-bar":
    case "grouped-bar":
    case "Vertical Bar":
    case "Horizontal Bar":
    case "Stacked Bar":
    case "Grouped Bar":
      return <RevenueByCategoryChart properties={properties} />;

    case "pie-standard":
    case "pie-donut":
    case "pie-semi-circle":
    case "pie-nested":
    case "donut":
    case "semi-circle":
    case "nested-donut":
    case "Pie":
    case "Donut":
    case "Semi-circle":
    case "Nested Donut":
      return <SalesDistributionChart properties={properties} />;

    case "area-filled":
    case "area-stacked":
    case "area-percentage":
    case "area-stream":
    case "filled-area":
    case "stacked-area":
    case "percentage-area":
    case "stream-graph":
    case "Filled Area":
    case "Stacked Area":
    case "Percentage Area":
    case "Stream Graph":
      return <SalesOverTimeChart properties={{ ...properties, chartType }} />;

    case "kpi-number":
    case "kpi-progress":
    case "kpi-trend":
    case "kpi-comparison":
    case "number-card":
    case "progress-card":
    case "trend-card":
    case "comparison-card":
    case "Number Card":
    case "Progress Card":
    case "Trend Card":
    case "Comparison Card":
      return <KPIWidget properties={properties} />;

    // Table chart
    case "table":
      return <TableChart properties={{ ...properties, chartType }} />;

    // Advanced chart types with full implementations
    case "gauge":
      return <GaugeChart properties={properties} />;

    case "funnel":
      return <FunnelChart properties={properties} />;

    case "waterfall":
      return <WaterfallChart properties={properties} />;

    case "heatmap":
      return <HeatmapChart properties={properties} />;

    case "treemap":
      return <TreemapChart properties={properties} />;

    case "scatter":
    case "bubble-chart":
    case "scatter-plot":
    case "3d-scatter":
    case "regression-line":
      return <ScatterChart properties={properties} />;

    // Gauge variants
    case "radial-gauge":
    case "linear-gauge":
    case "bullet-chart":
    case "speedometer":
      return <GaugeChart properties={properties} />;

    // Funnel variants
    case "sales-funnel":
    case "conversion-funnel":
    case "pyramid":
    case "inverted-funnel":
      return <FunnelChart properties={properties} />;

    // Waterfall variants
    case "financial-waterfall":
    case "bridge-chart":
    case "variance-analysis":
    case "sequential":
      return <WaterfallChart properties={properties} />;

    // Heatmap variants
    case "calendar-heatmap":
    case "matrix-heatmap":
    case "geographic-heatmap":
    case "correlation-matrix":
      return <HeatmapChart properties={properties} />;

    // Treemap variants
    case "simple-treemap":
    case "nested-treemap":
    case "sunburst":
    case "icicle-chart":
      return <TreemapChart properties={properties} />;

    // Table variants
    case "simple-table":
    case "pivot-table":
    case "matrix":
    case "card-table":
      return <TableChart properties={{ ...properties, chartType }} />;

    default:
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-dashboard-text-muted mb-2">
              Chart Type: {chartType}
            </div>
            <div className="text-xs text-dashboard-text-muted">
              Chart type not recognized
            </div>
            <div className="w-full h-24 bg-dashboard-surface rounded border border-dashboard-border mt-3 flex items-center justify-center">
              <span className="text-dashboard-accent">Select Chart Type</span>
            </div>
          </div>
        </div>
      );
  }
}
