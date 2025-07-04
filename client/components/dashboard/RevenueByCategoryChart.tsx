import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { value: 30, category: "Electronics", revenue: "$30k" },
  { value: 45, category: "Clothing", revenue: "$45k" },
  { value: 55, category: "Home", revenue: "$55k" },
  { value: 60, category: "Sports", revenue: "$60k" },
  { value: 70, category: "Books", revenue: "$70k" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload;
    return (
      <div className="bg-dashboard-surface border border-dashboard-border rounded-lg p-3 shadow-lg z-50">
        <p className="text-dashboard-text font-medium">
          {data?.category || label}
        </p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-dashboard-accent">
            {entry.name}:{" "}
            {entry.dataKey === "value"
              ? entry.payload?.revenue || `$${entry.value}k`
              : `$${entry.value}k`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface RevenueByCategoryChartProps {
  properties?: {
    chartType?: string;
    color?: string;
    showGrid?: boolean;
    showLegend?: boolean;
    xAxisLabel?: string;
    yAxisLabel?: string;
    showXAxis?: boolean;
    showYAxis?: boolean;
  };
}

export default function RevenueByCategoryChart({
  properties,
}: RevenueByCategoryChartProps = {}) {
  // Use simple data like line chart
  const chartData = data;

  return (
    <div className="h-40" style={{ minWidth: "200px", minHeight: "160px" }}>
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={200}
        minHeight={160}
      >
        <BarChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 40,
          }}
        >
          {properties?.showGrid !== false && (
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 11%, 20%)" />
          )}
          <XAxis
            dataKey="category"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 12 }}
          />
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
          <Bar
            dataKey="value"
            name="Revenue"
            fill={properties?.color || "#3b82f6"}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
