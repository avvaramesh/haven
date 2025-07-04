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
    return (
      <div className="bg-dashboard-surface border border-dashboard-border rounded-lg p-3 shadow-lg z-50">
        <p className="text-dashboard-text font-medium">
          {payload[0]?.payload?.category}
        </p>
        <p className="text-dashboard-accent">
          Revenue: {payload[0]?.payload?.revenue}
        </p>
      </div>
    );
  }
  return null;
};

interface RevenueByCategoryChartProps {
  properties?: {
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
  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
        >
          {properties?.showGrid !== false && (
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 11%, 20%)" />
          )}
          {properties?.showXAxis !== false && (
            <XAxis
              dataKey="category"
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
          <Bar
            dataKey="value"
            name="Revenue"
            fill={properties?.color || "hsl(199, 89%, 48%)"}
            radius={[2, 2, 0, 0]}
            cursor="pointer"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
