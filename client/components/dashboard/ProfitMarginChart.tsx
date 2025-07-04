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
  { value: 25, month: "Jan", margin: "25%" },
  { value: 30, month: "Feb", margin: "30%" },
  { value: 28, month: "Mar", margin: "28%" },
  { value: 35, month: "Apr", margin: "35%" },
  { value: 32, month: "May", margin: "32%" },
  { value: 40, month: "Jun", margin: "40%" },
  { value: 38, month: "Jul", margin: "38%" },
  { value: 45, month: "Aug", margin: "45%" },
  { value: 42, month: "Sep", margin: "42%" },
  { value: 48, month: "Oct", margin: "48%" },
  { value: 46, month: "Nov", margin: "46%" },
  { value: 50, month: "Dec", margin: "50%" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dashboard-surface border border-dashboard-border rounded-lg p-3 shadow-lg">
        <p className="text-dashboard-text font-medium">{`${label}`}</p>
        <p className="text-dashboard-accent">
          Profit Margin: {payload[0]?.payload?.margin}
        </p>
      </div>
    );
  }
  return null;
};

export default function ProfitMarginChart() {
  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 11%, 20%)" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 10 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 10 }}
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
