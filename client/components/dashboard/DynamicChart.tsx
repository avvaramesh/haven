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
  // Enhanced properties with intelligent defaults
  const enhancedProperties = {
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    ...properties,
    chartType,
  };

  // Main chart type routing
  if (chartType.includes("line") || chartType.includes("smart")) {
    return <SmartChart properties={enhancedProperties} />;
  }

  if (
    chartType.includes("bar") ||
    chartType.includes("revenue") ||
    chartType.includes("column")
  ) {
    return <RevenueByCategoryChart properties={enhancedProperties} />;
  }

  if (
    chartType.includes("pie") ||
    chartType.includes("donut") ||
    chartType.includes("sales-dist")
  ) {
    return <SalesDistributionChart properties={enhancedProperties} />;
  }

  if (chartType.includes("area") || chartType.includes("sales-over-time")) {
    return <SalesOverTimeChart properties={enhancedProperties} />;
  }

  if (chartType.includes("gauge")) {
    return <GaugeChart properties={enhancedProperties} />;
  }

  if (chartType.includes("funnel")) {
    return <FunnelChart properties={enhancedProperties} />;
  }

  if (chartType.includes("waterfall")) {
    return <WaterfallChart properties={enhancedProperties} />;
  }

  if (chartType.includes("heatmap")) {
    return <HeatmapChart properties={enhancedProperties} />;
  }

  if (chartType.includes("treemap")) {
    return <TreemapChart properties={enhancedProperties} />;
  }

  if (chartType.includes("scatter")) {
    return <ScatterChart properties={enhancedProperties} />;
  }

  if (chartType.includes("kpi")) {
    return <KPIWidget properties={enhancedProperties} />;
  }

  if (chartType.includes("table")) {
    return <TableChart properties={enhancedProperties} />;
  }

  if (chartType.includes("profit-margin")) {
    return <ProfitMarginChart properties={enhancedProperties} />;
  }

  // Default fallback
  return <SmartChart properties={enhancedProperties} />;
}
