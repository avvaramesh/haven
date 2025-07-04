import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [{ value: 40 }, { value: 30 }, { value: 20 }, { value: 10 }];

const COLORS = [
  "hsl(199, 89%, 48%)",
  "hsl(199, 89%, 60%)",
  "hsl(199, 89%, 72%)",
  "hsl(210, 11%, 25%)",
];

export default function SalesDistributionChart() {
  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={20}
            outerRadius={60}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
