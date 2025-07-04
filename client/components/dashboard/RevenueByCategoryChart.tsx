import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
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
      <div className="bg-dashboard-surface border border-dashboard-border rounded-lg p-3 shadow-lg">
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

export default function RevenueByCategoryChart() {
  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 11%, 20%)" />
          <XAxis
            dataKey="category"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 10 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 10 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="value"
            fill="hsl(199, 89%, 48%)"
            radius={[2, 2, 0, 0]}
            cursor="pointer"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
