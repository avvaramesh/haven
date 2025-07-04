import { LineChart, Line, ResponsiveContainer } from "recharts";

const data = [
  { value: 25 },
  { value: 30 },
  { value: 28 },
  { value: 35 },
  { value: 32 },
  { value: 40 },
  { value: 38 },
  { value: 45 },
  { value: 42 },
  { value: 48 },
  { value: 46 },
  { value: 50 },
];

export default function ProfitMarginChart() {
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
