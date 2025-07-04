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
  const isAreaChart =
    properties?.chartType?.includes("area") || properties?.chartType === "area";

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
