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
  // Determine chart variant from chartType
  const chartType = properties?.chartType || "bar";
  const isHorizontal = chartType.includes("horizontal");
  const isStacked = chartType.includes("stacked");
  const isGrouped = chartType.includes("grouped");

  // Prepare data for stacked/grouped charts with proper revenue values
  const stackedData = [
    { category: "Electronics", Q1: 20, Q2: 25, Q3: 30, Q4: 35, total: "$110k" },
    { category: "Clothing", Q1: 30, Q2: 35, Q3: 40, Q4: 45, total: "$150k" },
    { category: "Home", Q1: 40, Q2: 45, Q3: 50, Q4: 55, total: "$190k" },
    { category: "Sports", Q1: 45, Q2: 50, Q3: 55, Q4: 60, total: "$210k" },
    { category: "Books", Q1: 50, Q2: 55, Q3: 60, Q4: 70, total: "$235k" },
  ];

  const chartData = isStacked || isGrouped ? stackedData : data;
  const layout = isHorizontal ? "horizontal" : "vertical";

  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout={layout}
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: isHorizontal ? 60 : 10,
            bottom: isHorizontal ? 10 : 40,
          }}
        >
          {properties?.showGrid !== false && (
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 11%, 20%)" />
          )}
          {properties?.showXAxis !== false && (
            <XAxis
              type={isHorizontal ? "number" : "category"}
              dataKey={isHorizontal ? undefined : "category"}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 10 }}
              angle={isHorizontal ? 0 : -45}
              textAnchor={isHorizontal ? "middle" : "end"}
              height={isHorizontal ? 25 : 45}
              interval={0}
            />
          )}
          {properties?.showYAxis !== false && (
            <YAxis
              type={isHorizontal ? "category" : "number"}
              dataKey={isHorizontal ? "category" : undefined}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 10 }}
              width={isHorizontal ? 75 : 35}
              interval={0}
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
          {isStacked || isGrouped ? (
            <>
              <Bar
                dataKey="Q1"
                name="Q1 2024"
                fill={properties?.color || "hsl(199, 89%, 48%)"}
                stackId={isStacked ? "quarters" : undefined}
                radius={isHorizontal ? [0, 3, 3, 0] : [3, 3, 0, 0]}
                maxBarSize={isGrouped ? 15 : 40}
              />
              <Bar
                dataKey="Q2"
                name="Q2 2024"
                fill="hsl(142, 76%, 36%)"
                stackId={isStacked ? "quarters" : undefined}
                radius={isHorizontal ? [0, 3, 3, 0] : [3, 3, 0, 0]}
                maxBarSize={isGrouped ? 15 : 40}
              />
              <Bar
                dataKey="Q3"
                name="Q3 2024"
                fill="hsl(271, 81%, 56%)"
                stackId={isStacked ? "quarters" : undefined}
                radius={isHorizontal ? [0, 3, 3, 0] : [3, 3, 0, 0]}
                maxBarSize={isGrouped ? 15 : 40}
              />
              <Bar
                dataKey="Q4"
                name="Q4 2024"
                fill="hsl(48, 96%, 53%)"
                stackId={isStacked ? "quarters" : undefined}
                radius={isHorizontal ? [0, 3, 3, 0] : [3, 3, 0, 0]}
                maxBarSize={isGrouped ? 15 : 40}
              />
            </>
          ) : (
            <Bar
              dataKey="value"
              name="Revenue"
              fill={properties?.color || "hsl(199, 89%, 48%)"}
              radius={isHorizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
              maxBarSize={40}
              cursor="pointer"
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
