import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
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

export default function SalesOverTimeChart() {
  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 11%, 20%)" />
          <XAxis
            dataKey="period"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 10 }}
            angle={-45}
            textAnchor="end"
            height={40}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 10 }}
            width={30}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(199, 89%, 48%)"
            strokeWidth={2}
            dot={{ fill: "hsl(199, 89%, 48%)", strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, stroke: "hsl(199, 89%, 48%)", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
