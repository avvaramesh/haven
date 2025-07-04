import React from "react";
import SmartChart from "./SmartChart";
import RevenueByCategoryChart from "./RevenueByCategoryChart";
import SalesDistributionChart from "./SalesDistributionChart";
import SalesOverTimeChart from "./SalesOverTimeChart";
import ProfitMarginChart from "./ProfitMarginChart";
import KPIWidget from "./KPIWidget";

interface DynamicChartProps {
  chartType: string;
  properties?: Record<string, any>;
}

export default function DynamicChart({
  chartType,
  properties,
}: DynamicChartProps) {
  // Render different chart types based on chartType
  switch (chartType) {
    case "line":
    case "smart-chart":
      return <SmartChart />;

    case "bar":
    case "revenue-chart":
      return <RevenueByCategoryChart />;

    case "pie":
    case "sales-dist":
      return <SalesDistributionChart />;

    case "area":
    case "sales-over-time":
      return <SalesOverTimeChart />;

    case "profit-margin":
      return <ProfitMarginChart />;

    case "kpi":
    case "kpi-widget":
      return <KPIWidget />;

    // New chart type variants
    case "line-simple":
    case "line-multi":
    case "line-stepped":
    case "line-smooth":
      return <SmartChart />;

    case "bar-vertical":
    case "bar-horizontal":
    case "bar-stacked":
    case "bar-grouped":
      return <RevenueByCategoryChart />;

    case "pie-standard":
    case "pie-donut":
    case "pie-semi-circle":
    case "pie-nested":
      return <SalesDistributionChart />;

    case "area-filled":
    case "area-stacked":
    case "area-percentage":
    case "area-stream":
      return <SalesOverTimeChart />;

    case "kpi-number":
    case "kpi-progress":
    case "kpi-trend":
    case "kpi-comparison":
      return <KPIWidget />;

    default:
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-dashboard-text-muted mb-2">
              Unsupported Chart Type
            </div>
            <div className="text-xs text-dashboard-text-muted">{chartType}</div>
          </div>
        </div>
      );
  }
}
