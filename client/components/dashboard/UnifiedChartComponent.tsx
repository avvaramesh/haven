import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import {
  getDataForChartType,
  transformForRechartsBar,
  transformForRechartsPie,
  transformForRechartsLine,
  transformForMultiSeries,
  formatTooltipValue,
  getColorPalette,
  CHART_COLORS,
} from "../../data/chartDataManager";

// Specialized chart imports for complex types
import GaugeChart from "./GaugeChart";
import FunnelChart from "./FunnelChart";
import WaterfallChart from "./WaterfallChart";
import HeatmapChart from "./HeatmapChart";
import TreemapChart from "./TreemapChart";
import KPIWidget from "./KPIWidget";
import TableChart from "./TableChart";

interface UnifiedChartProps {
  chartType: string;
  properties?: {
    title?: string;
    width?: number;
    height?: number;
    color?: string;
    showGrid?: boolean;
    showLegend?: boolean;
    showTooltip?: boolean;
    [key: string]: any;
  };
}

// Standardized tooltip component
const UnifiedTooltip = ({ active, payload, label, chartType }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0]?.payload;
  const isCurrency =
    chartType.includes("revenue") ||
    chartType.includes("sales") ||
    chartType.includes("financial");
  const isPercentage =
    chartType.includes("percentage") ||
    chartType.includes("efficiency") ||
    chartType.includes("satisfaction");

  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-lg p-3 shadow-lg z-50">
      <p className="text-dashboard-text font-medium text-sm">
        {data?.name || data?.label || label}
      </p>
      {payload.map((entry: any, index: number) => (
        <p key={index} className="text-dashboard-accent text-sm">
          {entry.name}:{" "}
          {formatTooltipValue(
            entry.value,
            isCurrency ? "currency" : isPercentage ? "percentage" : "number",
          )}
        </p>
      ))}
      {data?.metadata && (
        <div className="text-xs text-dashboard-text-muted mt-1">
          {Object.entries(data.metadata)
            .slice(0, 2)
            .map(([key, value]) => (
              <div key={key}>
                {key}: {String(value)}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default function UnifiedChartComponent({
  chartType,
  properties = {},
}: UnifiedChartProps) {
  // Get appropriate data for chart type with fallback
  let dataset;
  try {
    dataset = getDataForChartType(chartType);
  } catch (error) {
    console.error("Error getting chart data:", error);
    // Fallback data
    dataset = {
      id: "fallback",
      name: "Sample Data",
      description: "Fallback sample data",
      data: [
        { id: "1", label: "Category A", value: 30, category: "sample" },
        { id: "2", label: "Category B", value: 45, category: "sample" },
        { id: "3", label: "Category C", value: 55, category: "sample" },
        { id: "4", label: "Category D", value: 60, category: "sample" },
        { id: "5", label: "Category E", value: 70, category: "sample" },
      ],
    };
  }

  // Determine chart configuration
  const isHorizontal = chartType.includes("horizontal");
  const isStacked = chartType.includes("stacked");

  // Debug logging
  console.log("UnifiedChartComponent - chartType:", chartType);
  console.log("UnifiedChartComponent - isHorizontal:", isHorizontal);
  const isGrouped = chartType.includes("grouped");
  const isMultiLine = chartType.includes("multi");
  const isStepped = chartType.includes("stepped");
  const isSmooth = chartType.includes("smooth");
  const isDonut = chartType.includes("donut");
  const isSemiCircle = chartType.includes("semi-circle");
  const isPercentage = chartType.includes("percentage");

  // Handle specialized chart types
  if (chartType.includes("gauge")) {
    return <GaugeChart properties={properties} />;
  }
  if (chartType.includes("funnel")) {
    return <FunnelChart properties={properties} />;
  }
  if (chartType.includes("waterfall")) {
    return <WaterfallChart properties={properties} />;
  }
  if (chartType.includes("heatmap")) {
    return <HeatmapChart properties={properties} />;
  }
  if (chartType.includes("treemap")) {
    return <TreemapChart properties={properties} />;
  }
  if (chartType.includes("kpi")) {
    return <KPIWidget properties={properties} />;
  }
  if (chartType.includes("table")) {
    return <TableChart properties={properties} />;
  }

  // Configure chart data based on type
  let chartData: any[];
  let colors: string[];

  if (chartType.includes("bar") || chartType.includes("column")) {
    if (isStacked || isGrouped) {
      chartData = transformForMultiSeries(dataset, ["Q1", "Q2", "Q3", "Q4"]);
      colors = getColorPalette(4);
    } else {
      chartData = transformForRechartsBar(dataset, isHorizontal);
      colors = [properties.color || CHART_COLORS.primary];
    }
  } else if (chartType.includes("line")) {
    if (isMultiLine) {
      chartData = transformForMultiSeries(dataset, [
        "sales",
        "profit",
        "revenue",
      ]);
      colors = getColorPalette(3);
    } else {
      chartData = transformForRechartsLine(dataset);
      colors = [properties.color || CHART_COLORS.primary];
    }
  } else if (chartType.includes("area")) {
    if (isStacked || isPercentage) {
      chartData = transformForMultiSeries(dataset, [
        "mobile",
        "desktop",
        "tablet",
      ]);
      colors = getColorPalette(3);
    } else {
      chartData = transformForRechartsLine(dataset);
      colors = [properties.color || CHART_COLORS.primary];
    }
  } else if (chartType.includes("pie")) {
    chartData = transformForRechartsPie(dataset);
    colors = getColorPalette(chartData.length);
  } else if (chartType.includes("scatter")) {
    chartData = dataset.data.map((item) => ({
      x: item.metadata?.spend || Math.random() * 50000,
      y: item.value,
      name: item.label,
      category: item.category,
      size: item.metadata?.roi || Math.random() * 100 + 50,
    }));
    colors = getColorPalette(3);
  } else {
    chartData = transformForRechartsLine(dataset);
    colors = [properties.color || CHART_COLORS.primary];
  }

  // Common chart props
  const commonProps = {
    data: chartData,
    margin: {
      top: 10,
      right: 30,
      left: isHorizontal ? 80 : 20,
      bottom: isHorizontal ? 20 : 50,
    },
  };

  const axisProps = {
    axisLine: false,
    tickLine: false,
    tick: { fill: "hsl(215, 20.2%, 65.1%)", fontSize: 11 },
  };

  // Render appropriate chart type
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        {/* Bar Charts */}
        {(chartType.includes("bar") || chartType.includes("column")) && (
          <BarChart
            {...commonProps}
            layout={isHorizontal ? "vertical" : "horizontal"}
          >
            {properties.showGrid !== false && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(210, 11%, 20%)"
              />
            )}
            <XAxis
              {...axisProps}
              type={isHorizontal ? "number" : "category"}
              dataKey={isHorizontal ? undefined : "name"}
              angle={isHorizontal ? 0 : -45}
              textAnchor={isHorizontal ? "middle" : "end"}
              height={isHorizontal ? 25 : 50}
            />
            <YAxis
              {...axisProps}
              type={isHorizontal ? "category" : "number"}
              dataKey={isHorizontal ? "name" : undefined}
              width={isHorizontal ? 75 : 40}
            />
            {properties.showTooltip !== false && (
              <Tooltip content={<UnifiedTooltip chartType={chartType} />} />
            )}
            {properties.showLegend && isStacked && <Legend />}

            {isStacked || isGrouped ? (
              ["Q1", "Q2", "Q3", "Q4"].map((quarter, index) => (
                <Bar
                  key={quarter}
                  dataKey={quarter}
                  name={quarter}
                  fill={colors[index]}
                  stackId={isStacked ? "stack" : undefined}
                  radius={isHorizontal ? [0, 3, 3, 0] : [3, 3, 0, 0]}
                />
              ))
            ) : (
              <Bar
                dataKey="value"
                fill={colors[0]}
                radius={isHorizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
              />
            )}
          </BarChart>
        )}

        {/* Line Charts */}
        {chartType.includes("line") && (
          <LineChart {...commonProps}>
            {properties.showGrid !== false && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(210, 11%, 20%)"
              />
            )}
            <XAxis
              {...axisProps}
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={50}
            />
            <YAxis {...axisProps} />
            {properties.showTooltip !== false && (
              <Tooltip content={<UnifiedTooltip chartType={chartType} />} />
            )}
            {properties.showLegend && isMultiLine && <Legend />}

            {isMultiLine ? (
              ["sales", "profit", "revenue"].map((series, index) => (
                <Line
                  key={series}
                  type={isStepped ? "step" : isSmooth ? "monotone" : "linear"}
                  dataKey={series}
                  name={series.charAt(0).toUpperCase() + series.slice(1)}
                  stroke={colors[index]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))
            ) : (
              <Line
                type={isStepped ? "step" : isSmooth ? "monotone" : "linear"}
                dataKey="value"
                stroke={colors[0]}
                strokeWidth={isStepped ? 3 : 2}
                strokeDasharray={isStepped ? "5,5" : "0"}
                dot={{ r: isStepped ? 6 : 4 }}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        )}

        {/* Area Charts */}
        {chartType.includes("area") && (
          <AreaChart {...commonProps}>
            {properties.showGrid !== false && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(210, 11%, 20%)"
              />
            )}
            <XAxis
              {...axisProps}
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={50}
            />
            <YAxis {...axisProps} />
            {properties.showTooltip !== false && (
              <Tooltip content={<UnifiedTooltip chartType={chartType} />} />
            )}
            {properties.showLegend && (isStacked || isPercentage) && <Legend />}

            {isStacked || isPercentage ? (
              ["mobile", "desktop", "tablet"].map((series, index) => (
                <Area
                  key={series}
                  type={isSmooth ? "monotone" : "linear"}
                  dataKey={series}
                  name={series.charAt(0).toUpperCase() + series.slice(1)}
                  stackId={
                    isPercentage ? "percent" : isStacked ? "stack" : undefined
                  }
                  stroke={colors[index]}
                  fill={colors[index]}
                  fillOpacity={0.7}
                  strokeWidth={2}
                />
              ))
            ) : (
              <Area
                type={isSmooth ? "monotone" : "linear"}
                dataKey="value"
                stroke={colors[0]}
                fill={colors[0]}
                fillOpacity={0.3}
                strokeWidth={2}
              />
            )}
          </AreaChart>
        )}

        {/* Pie Charts */}
        {chartType.includes("pie") && (
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy={isSemiCircle ? "75%" : "50%"}
              innerRadius={isDonut ? 25 : 0}
              outerRadius={isSemiCircle ? 60 : 80}
              startAngle={isSemiCircle ? 180 : 0}
              endAngle={isSemiCircle ? 0 : 360}
              dataKey="value"
              label={
                isSemiCircle
                  ? false
                  : ({ percent }) => `${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            {properties.showTooltip !== false && (
              <Tooltip content={<UnifiedTooltip chartType={chartType} />} />
            )}
            {properties.showLegend && <Legend />}
          </PieChart>
        )}

        {/* Scatter Charts */}
        {chartType.includes("scatter") && (
          <ScatterChart {...commonProps}>
            {properties.showGrid !== false && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(210, 11%, 20%)"
              />
            )}
            <XAxis
              {...axisProps}
              type="number"
              dataKey="x"
              name="Marketing Spend"
            />
            <YAxis {...axisProps} type="number" dataKey="y" name="Revenue" />
            {properties.showTooltip !== false && (
              <Tooltip content={<UnifiedTooltip chartType={chartType} />} />
            )}
            {properties.showLegend && <Legend />}

            <Scatter
              name="Campaigns"
              data={chartData}
              fill={colors[0]}
              fillOpacity={0.8}
            />

            {/* Add trend line for scatter plots */}
            <ReferenceLine
              segment={[
                {
                  x: Math.min(...chartData.map((d) => d.x)),
                  y: Math.min(...chartData.map((d) => d.y)),
                },
                {
                  x: Math.max(...chartData.map((d) => d.x)),
                  y: Math.max(...chartData.map((d) => d.y)),
                },
              ]}
              stroke={CHART_COLORS.tertiary}
              strokeDasharray="4 4"
              strokeWidth={2}
            />
          </ScatterChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
