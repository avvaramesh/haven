import {
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { value: 20, period: "Week 1", sales: "$20k" },
  { value: 35, period: "Week 2", sales: "$35k" },
  { value: 25, period: "Week 3", sales: "$25k" },
  { value: 40, period: "Week 4", sales: "$40k" },
  { value: 30, period: "Week 5", sales: "$30k" },
  { value: 45, period: "Week 6", sales: "$45k" },
  { value: 35, period: "Week 7", sales: "$35k" },
  { value: 50, period: "Week 8", sales: "$50k" },
  { value: 40, period: "Week 9", sales: "$40k" },
  { value: 55, period: "Week 10", sales: "$55k" },
  { value: 45, period: "Week 11", sales: "$45k" },
  { value: 60, period: "Week 12", sales: "$60k" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dashboard-surface border border-dashboard-border rounded-lg p-3 shadow-lg">
        <p className="text-dashboard-text font-medium">{`${label}`}</p>
        <p className="text-dashboard-accent">
          Sales: {payload[0]?.payload?.sales}
        </p>
      </div>
    );
  }
  return null;
};

interface SalesOverTimeChartProps {
  properties?: {
    color?: string;
    showGrid?: boolean;
    showLegend?: boolean;
    xAxisLabel?: string;
    yAxisLabel?: string;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showDataPoints?: boolean;
    smoothCurves?: boolean;
    chartType?: string;
  };
}

export default function SalesOverTimeChart({
  properties,
}: SalesOverTimeChartProps = {}) {
  const chartType = properties?.chartType || "area";
  const isAreaChart = chartType.includes("area") || chartType === "area";
  const isStacked =
    chartType.includes("stacked") || chartType.includes("Stacked");
  const isPercentage =
    chartType.includes("percentage") || chartType.includes("Percentage");
  const isStream = chartType.includes("stream") || chartType.includes("Stream");

  // Multi-series data for stacked/percentage/stream charts
  const stackedData = [
    { period: "Week 1", mobile: 8, desktop: 12, tablet: 5 },
    { period: "Week 2", mobile: 15, desktop: 20, tablet: 8 },
    { period: "Week 3", mobile: 12, desktop: 15, tablet: 6 },
    { period: "Week 4", mobile: 18, desktop: 22, tablet: 10 },
    { period: "Week 5", mobile: 14, desktop: 16, tablet: 7 },
    { period: "Week 6", mobile: 20, desktop: 25, tablet: 12 },
  ];

  // Ensure data is always available and properly formatted
  const chartData = isStacked || isPercentage || isStream ? stackedData : data;

  // Debug log to verify data
  React.useEffect(() => {
    console.log("Area chart data:", {
      chartType,
      chartData,
      isAreaChart,
      isStacked,
      isPercentage,
      isStream,
    });
  }, [chartType, chartData, isAreaChart, isStacked, isPercentage, isStream]);

  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        {isAreaChart ? (
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
          >
            {properties?.showGrid !== false && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(210, 11%, 20%)"
              />
            )}
            {properties?.showXAxis !== false && (
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={40}
                label={
                  properties?.xAxisLabel
                    ? {
                        value: properties.xAxisLabel,
                        position: "insideBottom",
                        offset: -5,
                      }
                    : undefined
                }
              />
            )}
            {properties?.showYAxis !== false && (
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 10 }}
                width={30}
                label={
                  properties?.yAxisLabel
                    ? {
                        value: properties.yAxisLabel,
                        angle: -90,
                        position: "insideLeft",
                      }
                    : undefined
                }
              />
            )}
            <Tooltip content={<CustomTooltip />} />
            {properties?.showLegend && (
              <Legend
                verticalAlign="top"
                height={36}
                iconType="rect"
                wrapperStyle={{
                  paddingBottom: "10px",
                  fontSize: "12px",
                  color: "hsl(215, 20.2%, 65.1%)",
                }}
              />
            )}
            {isStacked || isPercentage || isStream ? (
              <>
                <Area
                  type={properties?.smoothCurves ? "monotone" : "linear"}
                  dataKey="mobile"
                  stackId={
                    isPercentage
                      ? "percent"
                      : isStacked || isStream
                        ? "1"
                        : undefined
                  }
                  name="Mobile"
                  stroke="hsl(199, 89%, 48%)"
                  fill="hsl(199, 89%, 48%)"
                  fillOpacity={0.8}
                  strokeWidth={2}
                />
                <Area
                  type={properties?.smoothCurves ? "monotone" : "linear"}
                  dataKey="desktop"
                  stackId={
                    isPercentage
                      ? "percent"
                      : isStacked || isStream
                        ? "1"
                        : undefined
                  }
                  name="Desktop"
                  stroke="hsl(142, 76%, 36%)"
                  fill="hsl(142, 76%, 36%)"
                  fillOpacity={0.8}
                  strokeWidth={2}
                />
                <Area
                  type={properties?.smoothCurves ? "monotone" : "linear"}
                  dataKey="tablet"
                  stackId={
                    isPercentage
                      ? "percent"
                      : isStacked || isStream
                        ? "1"
                        : undefined
                  }
                  name="Tablet"
                  stroke="hsl(271, 81%, 56%)"
                  fill="hsl(271, 81%, 56%)"
                  fillOpacity={0.8}
                  strokeWidth={2}
                />
              </>
            ) : (
              <Area
                type={properties?.smoothCurves ? "monotone" : "linear"}
                dataKey="value"
                name="Sales"
                stroke={properties?.color || "hsl(199, 89%, 48%)"}
                fill={properties?.color || "hsl(199, 89%, 48%)"}
                fillOpacity={0.3}
                strokeWidth={2}
                dot={
                  properties?.showDataPoints !== false
                    ? {
                        fill: properties?.color || "hsl(199, 89%, 48%)",
                        strokeWidth: 2,
                        r: 3,
                      }
                    : false
                }
                activeDot={{
                  r: 5,
                  stroke: properties?.color || "hsl(199, 89%, 48%)",
                  strokeWidth: 2,
                }}
              />
            )}
          </AreaChart>
        ) : (
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
          >
            {properties?.showGrid !== false && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(210, 11%, 20%)"
              />
            )}
            {properties?.showXAxis !== false && (
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={40}
                label={
                  properties?.xAxisLabel
                    ? {
                        value: properties.xAxisLabel,
                        position: "insideBottom",
                        offset: -5,
                      }
                    : undefined
                }
              />
            )}
            {properties?.showYAxis !== false && (
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 10 }}
                width={30}
                label={
                  properties?.yAxisLabel
                    ? {
                        value: properties.yAxisLabel,
                        angle: -90,
                        position: "insideLeft",
                      }
                    : undefined
                }
              />
            )}
            <Tooltip content={<CustomTooltip />} />
            {properties?.showLegend && (
              <Legend
                verticalAlign="top"
                height={36}
                iconType="line"
                wrapperStyle={{
                  paddingBottom: "10px",
                  fontSize: "12px",
                  color: "hsl(215, 20.2%, 65.1%)",
                }}
              />
            )}
            <Line
              type={properties?.smoothCurves ? "monotone" : "linear"}
              dataKey="value"
              name="Sales"
              stroke={properties?.color || "hsl(199, 89%, 48%)"}
              strokeWidth={2}
              dot={
                properties?.showDataPoints !== false
                  ? {
                      fill: properties?.color || "hsl(199, 89%, 48%)",
                      strokeWidth: 2,
                      r: 3,
                    }
                  : false
              }
              activeDot={{
                r: 5,
                stroke: properties?.color || "hsl(199, 89%, 48%)",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
