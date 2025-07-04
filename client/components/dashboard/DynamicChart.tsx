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
      return <SmartChart properties={{ ...properties, chartType }} />;

    case "bar-vertical":
    case "bar-horizontal":
    case "bar-stacked":
    case "bar-grouped":
      return <RevenueByCategoryChart properties={properties} />;

    case "pie-standard":
    case "pie-donut":
    case "pie-semi-circle":
    case "pie-nested":
      return <SalesDistributionChart properties={properties} />;

    case "area-filled":
    case "area-stacked":
    case "area-percentage":
    case "area-stream":
      return <SalesOverTimeChart properties={{ ...properties, chartType }} />;

    case "kpi-number":
    case "kpi-progress":
    case "kpi-trend":
    case "kpi-comparison":
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
      return <ScatterChart properties={properties} />;

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
