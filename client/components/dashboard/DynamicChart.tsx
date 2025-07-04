import React from "react";
import UnifiedChartComponent from "./UnifiedChartComponent";

interface DynamicChartProps {
  chartType: string;
  properties?: Record<string, any>;
}

export default function DynamicChart({
  chartType,
  properties = {},
}: DynamicChartProps) {
  // Enhanced properties with intelligent defaults
  const enhancedProperties = {
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    height: 200,
    ...properties,
    chartType, // Always pass the chart type
  };

  return (
    <div className="h-full w-full">
      <UnifiedChartComponent
        chartType={chartType}
        properties={enhancedProperties}
      />
    </div>
  );
}
