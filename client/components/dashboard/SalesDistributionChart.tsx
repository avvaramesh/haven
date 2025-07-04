import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { value: 40, name: "Online", percentage: "40%", sales: "$40k" },
  { value: 30, name: "In-Store", percentage: "30%", sales: "$30k" },
  { value: 20, name: "Mobile", percentage: "20%", sales: "$20k" },
  { value: 10, name: "Other", percentage: "10%", sales: "$10k" },
];

const getColors = (baseColor?: string) => {
  const base = baseColor || "hsl(199, 89%, 48%)";

  // Extract HSL values from base color
  const hslMatch = base.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (hslMatch) {
    const [, h, s, l] = hslMatch.map(Number);

    // Generate palette with varying lightness and slight hue shifts
    return [
      base, // Original color
      `hsl(${h + 10}, ${s}%, ${Math.min(l + 15, 90)}%)`, // Lighter with slight hue shift
      `hsl(${h - 10}, ${s}%, ${Math.min(l + 25, 85)}%)`, // Even lighter with hue shift
      `hsl(${h + 20}, ${Math.max(s - 20, 30)}%, ${Math.min(l + 35, 80)}%)`, // Lightest with more hue shift
    ];
  }

  // Fallback if color parsing fails
  return [
    base,
    base.replace(
      /(\d+)%\)$/,
      (match, l) => `${Math.min(parseInt(l) + 15, 90)}%)`,
    ),
    base.replace(
      /(\d+)%\)$/,
      (match, l) => `${Math.min(parseInt(l) + 25, 85)}%)`,
    ),
    base.replace(
      /(\d+)%\)$/,
      (match, l) => `${Math.min(parseInt(l) + 35, 80)}%)`,
    ),
  ];
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-dashboard-surface border border-dashboard-border rounded-lg p-3 shadow-lg z-50">
        <p className="text-dashboard-text font-medium">{data.name}</p>
        <p className="text-dashboard-accent">Sales: {data.sales}</p>
        <p className="text-dashboard-text-muted">Share: {data.percentage}</p>
      </div>
    );
  }
  return null;
};

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent > 0.05) {
    // Only show label if segment is larger than 5%
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={10}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }
  return null;
};

interface SalesDistributionChartProps {
  properties?: {
    color?: string;
    showLegend?: boolean;
  };
}

export default function SalesDistributionChart({
  properties,
}: SalesDistributionChartProps = {}) {
  const colors = getColors(properties?.color);

  return (
    <div className="h-32 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={50}
            innerRadius={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                stroke="hsl(210, 11%, 12%)"
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          {properties?.showLegend && (
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{
                paddingTop: "10px",
                fontSize: "12px",
                color: "hsl(215, 20.2%, 65.1%)",
              }}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
