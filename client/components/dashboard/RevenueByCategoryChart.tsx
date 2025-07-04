import { BarChart, Bar, ResponsiveContainer } from "recharts";

const data = [
  { value: 30 },
  { value: 45 },
  { value: 55 },
  { value: 60 },
  { value: 70 },
];

export default function RevenueByCategoryChart() {
  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <Bar
            dataKey="value"
            fill="hsl(199, 89%, 48%)"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
