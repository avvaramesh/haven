import { LineChart, Line, ResponsiveContainer } from "recharts";

const data = [
  { value: 20 },
  { value: 35 },
  { value: 25 },
  { value: 40 },
  { value: 30 },
  { value: 45 },
  { value: 35 },
  { value: 50 },
  { value: 40 },
  { value: 55 },
  { value: 45 },
  { value: 60 },
];

export default function SalesOverTimeChart() {
  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(199, 89%, 48%)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
