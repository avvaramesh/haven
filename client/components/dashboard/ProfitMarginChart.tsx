import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
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

interface ProfitMarginChartProps {
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

export default function ProfitMarginChart({
  properties,
}: ProfitMarginChartProps = {}) {
  return (
    <div className="h-full min-h-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
        >
          {properties?.showGrid !== false && (
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 11%, 20%)" />
          )}
          {properties?.showXAxis !== false && (
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 10 }}
              height={30}
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
              iconType="line"
              wrapperStyle={{
                paddingBottom: "10px",
                fontSize: "12px",
                color: "hsl(215, 20.2%, 65.1%)",
              }}
            />
          )}
          <Line
            type="monotone"
            dataKey="value"
            name="Profit Margin"
            stroke={properties?.color || "hsl(199, 89%, 48%)"}
            strokeWidth={2}
            dot={{
              fill: properties?.color || "hsl(199, 89%, 48%)",
              strokeWidth: 2,
              r: 3,
            }}
            activeDot={{
              r: 5,
              stroke: properties?.color || "hsl(199, 89%, 48%)",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
