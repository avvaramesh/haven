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
    case "line-simple-line":
    case "line-multi-line":
    case "line-stepped-line":
    case "line-smooth-line":
      return <SmartChart properties={{ ...properties, chartType }} />;

    case "bar":
    case "revenue-chart":
    case "bar-vertical-bar":
    case "bar-horizontal-bar":
    case "bar-stacked-bar":
    case "bar-grouped-bar":
      return <RevenueByCategoryChart properties={properties} />;

    case "pie":
    case "sales-dist":
    case "pie-pie":
    case "pie-donut":
    case "pie-semi-circle":
    case "pie-nested-donut":
      return <SalesDistributionChart properties={properties} />;

    case "area":
    case "sales-over-time":
    case "area-filled-area":
    case "area-stacked-area":
    case "area-percentage-area":
    case "area-stream-graph":
      return <SalesOverTimeChart properties={{ ...properties, chartType }} />;

    case "profit-margin":
      return <ProfitMarginChart properties={properties} />;

    case "kpi":
    case "kpi-widget":
    case "kpi-number-card":
    case "kpi-progress-card":
    case "kpi-trend-card":
    case "kpi-comparison-card":
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
    case "table-simple-table":
    case "table-pivot-table":
    case "table-matrix":
    case "table-card-table":
      return <TableChart properties={{ ...properties, chartType }} />;

    // Advanced chart types with full implementations
    case "gauge":
    case "gauge-radial-gauge":
    case "gauge-linear-gauge":
    case "gauge-bullet-chart":
    case "gauge-speedometer":
      return <GaugeChart properties={properties} />;

    case "funnel":
    case "funnel-sales-funnel":
    case "funnel-conversion-funnel":
    case "funnel-pyramid":
    case "funnel-inverted-funnel":
      return <FunnelChart properties={properties} />;

    case "waterfall":
    case "waterfall-financial-waterfall":
    case "waterfall-bridge-chart":
    case "waterfall-variance-analysis":
    case "waterfall-sequential":
      return <WaterfallChart properties={properties} />;

    case "heatmap":
    case "heatmap-calendar-heatmap":
    case "heatmap-matrix-heatmap":
    case "heatmap-geographic-heatmap":
    case "heatmap-correlation-matrix":
      return <HeatmapChart properties={properties} />;

    case "treemap":
    case "treemap-simple-treemap":
    case "treemap-nested-treemap":
    case "treemap-sunburst":
    case "treemap-icicle-chart":
      return <TreemapChart properties={properties} />;

    case "scatter":
    case "scatter-bubble-chart":
    case "scatter-scatter-plot":
    case "scatter-3d-scatter":
    case "scatter-regression-line":
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
