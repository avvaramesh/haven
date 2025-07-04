import {
  LineChart,
  Line,
  ResponsiveContainer,
  ReferenceLine,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Brain, TrendingUp } from "lucide-react";

const data = [
  { value: 20, month: "Jan", sales: "$20k" },
  { value: 35, month: "Feb", sales: "$35k" },
  { value: 25, month: "Mar", sales: "$25k" },
  { value: 40, month: "Apr", sales: "$40k" },
  { value: 30, month: "May", sales: "$30k" },
  { value: 45, month: "Jun", sales: "$45k" },
  { value: 35, month: "Jul", sales: "$35k" },
  { value: 50, month: "Aug", sales: "$50k" },
  { value: 40, month: "Sep", sales: "$40k" },
  { value: 55, month: "Oct", sales: "$55k" },
  { value: 45, month: "Nov", sales: "$45k" },
  { value: 60, month: "Dec", sales: "$60k" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dashboard-surface border border-dashboard-border rounded-lg p-3 shadow-lg z-50">
        <p className="text-dashboard-text font-medium">{`${label}`}</p>
        <p className="text-dashboard-accent">
          Sales: {payload[0]?.payload?.sales}
        </p>
      </div>
    );
  }
  return null;
};

interface SmartChartProps {
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

export default function SmartChart({ properties }: SmartChartProps = {}) {
  // Determine chart variant from chartType
  const chartType = properties?.chartType || "line";
  const isMultiLine =
    chartType.includes("multi") || chartType.includes("Multi");
  const isStepped =
    chartType.includes("stepped") || chartType.includes("Stepped");
  const isSmooth = chartType.includes("smooth") || chartType.includes("Smooth");

  // Multi-line data
  const multiLineData = [
    { month: "Jan", sales: 20, profit: 15, revenue: 25 },
    { month: "Feb", sales: 35, profit: 28, revenue: 40 },
    { month: "Mar", sales: 25, profit: 18, revenue: 30 },
    { month: "Apr", sales: 40, profit: 32, revenue: 45 },
    { month: "May", sales: 30, profit: 22, revenue: 35 },
    { month: "Jun", sales: 45, profit: 38, revenue: 50 },
  ];

  const chartData = isMultiLine ? multiLineData : data;
  const curveType = isStepped ? "step" : isSmooth ? "monotone" : "linear";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-dashboard-text">
            {isMultiLine
              ? "Multi-Series Analytics"
              : "AI-Enhanced Sales Analytics"}
          </h3>
          <p className="text-xs text-dashboard-text-muted">
            {isStepped
              ? "Stepped line visualization"
              : isSmooth
                ? "Smooth curve analysis"
                : "With predictive insights"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-dashboard-accent" />
          <span className="text-xs text-dashboard-accent">AI Active</span>
        </div>
      </div>

      <div className="relative h-full min-h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            {properties?.showGrid !== false && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(210, 11%, 20%)"
              />
            )}
            {properties?.showXAxis !== false && (
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 12 }}
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
                tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 12 }}
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
            {isMultiLine ? (
              <>
                <Line
                  type={curveType}
                  dataKey="sales"
                  name="Sales"
                  stroke={properties?.color || "hsl(199, 89%, 48%)"}
                  strokeWidth={2}
                  dot={properties?.showDataPoints !== false ? { r: 4 } : false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type={curveType}
                  dataKey="profit"
                  name="Profit"
                  stroke="hsl(142, 76%, 36%)"
                  strokeWidth={2}
                  dot={properties?.showDataPoints !== false ? { r: 4 } : false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type={curveType}
                  dataKey="revenue"
                  name="Revenue"
                  stroke="hsl(271, 81%, 56%)"
                  strokeWidth={2}
                  dot={properties?.showDataPoints !== false ? { r: 4 } : false}
                  activeDot={{ r: 6 }}
                />
              </>
            ) : (
              <Line
                type={curveType}
                dataKey="value"
                name="Sales"
                stroke={properties?.color || "hsl(199, 89%, 48%)"}
                strokeWidth={isStepped ? 3 : 2}
                strokeDasharray={isStepped ? "5,5" : "0"}
                dot={
                  properties?.showDataPoints !== false
                    ? {
                        fill: properties?.color || "hsl(199, 89%, 48%)",
                        strokeWidth: 2,
                        r: isStepped ? 6 : 4,
                      }
                    : false
                }
                activeDot={{
                  r: 6,
                  stroke: properties?.color || "hsl(199, 89%, 48%)",
                  strokeWidth: 2,
                }}
              />
            )}
            <ReferenceLine
              x="Oct"
              stroke="hsl(199, 89%, 60%)"
              strokeDasharray="2 2"
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="absolute top-4 right-4 bg-dashboard-surface border border-dashboard-accent rounded-lg p-2 max-w-48">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-3 h-3 text-dashboard-accent" />
            <span className="text-xs font-medium text-dashboard-text">
              AI Prediction
            </span>
          </div>
          <p className="text-xs text-dashboard-text-muted">
            Expected 18% growth in Q1 based on current trends
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-dashboard-accent rounded-full"></div>
          <span className="text-dashboard-text-muted">Actual Data</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 border border-dashboard-accent rounded-full"></div>
          <span className="text-dashboard-text-muted">AI Forecast</span>
        </div>
      </div>
    </div>
  );
}
