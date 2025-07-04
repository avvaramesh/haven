import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

const waterfallData = [
  {
    name: "Starting Revenue",
    value: 100000,
    cumulative: 100000,
    type: "start",
    color: "hsl(210, 11%, 15%)",
  },
  {
    name: "New Sales",
    value: 25000,
    cumulative: 125000,
    type: "positive",
    color: "hsl(142, 76%, 36%)",
  },
  {
    name: "Upsells",
    value: 15000,
    cumulative: 140000,
    type: "positive",
    color: "hsl(142, 76%, 36%)",
  },
  {
    name: "Churn",
    value: -8000,
    cumulative: 132000,
    type: "negative",
    color: "hsl(0, 84%, 60%)",
  },
  {
    name: "Refunds",
    value: -3000,
    cumulative: 129000,
    type: "negative",
    color: "hsl(0, 84%, 60%)",
  },
  {
    name: "Final Revenue",
    value: 129000,
    cumulative: 129000,
    type: "end",
    color: "hsl(199, 89%, 48%)",
  },
];

interface WaterfallChartProps {
  properties?: {
    title?: string;
    positiveColor?: string;
    negativeColor?: string;
    neutralColor?: string;
    showGrid?: boolean;
    showValues?: boolean;
    currency?: string;
  };
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-dashboard-surface border border-dashboard-border rounded-lg p-3 shadow-lg z-50">
        <p className="text-dashboard-text font-medium">{data.name}</p>
        <p
          className={`${data.type === "positive" ? "text-green-400" : data.type === "negative" ? "text-red-400" : "text-dashboard-accent"}`}
        >
          {data.type === "positive" ? "+" : ""}${data.value.toLocaleString()}
        </p>
        <p className="text-dashboard-text-muted">
          Cumulative: ${data.cumulative.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function WaterfallChart({
  properties,
}: WaterfallChartProps = {}) {
  const {
    title = "Revenue Waterfall Analysis",
    positiveColor = "hsl(142, 76%, 36%)",
    negativeColor = "hsl(0, 84%, 60%)",
    neutralColor = "hsl(199, 89%, 48%)",
    showGrid = true,
    showValues = true,
    currency = "$",
  } = properties || {};

  // Transform data for stacked bar chart to create waterfall effect
  const transformedData = waterfallData.map((item, index) => {
    if (index === 0 || item.type === "end") {
      return {
        ...item,
        displayValue: item.value,
        base: 0,
      };
    } else {
      const prevCumulative = waterfallData[index - 1].cumulative;
      return {
        ...item,
        displayValue: Math.abs(item.value),
        base: item.value > 0 ? prevCumulative : prevCumulative + item.value,
      };
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-dashboard-text">{title}</h3>
          <p className="text-xs text-dashboard-text-muted">
            Financial impact breakdown analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-dashboard-accent" />
          <span className="text-xs text-dashboard-accent">Waterfall View</span>
        </div>
      </div>

      <div className="relative h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={transformedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(210, 11%, 20%)"
              />
            )}
            <XAxis
              dataKey="name"
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
              tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 12 }}
              tickFormatter={(value) =>
                `${currency}${(value / 1000).toFixed(0)}K`
              }
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Base bars (invisible, for positioning) */}
            <Bar dataKey="base" stackId="waterfall" fill="transparent" />

            {/* Main value bars */}
            <Bar dataKey="displayValue" stackId="waterfall">
              {transformedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary statistics */}
      <div className="grid grid-cols-4 gap-3 text-center">
        <div className="bg-dashboard-surface rounded-lg p-3 border border-dashboard-border">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-sm font-bold text-green-400">
            +{currency}
            {waterfallData
              .filter((d) => d.type === "positive")
              .reduce((sum, d) => sum + d.value, 0)
              .toLocaleString()}
          </div>
          <div className="text-xs text-dashboard-text-muted">
            Positive Impact
          </div>
        </div>

        <div className="bg-dashboard-surface rounded-lg p-3 border border-dashboard-border">
          <div className="flex items-center justify-center mb-1">
            <TrendingDown className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-sm font-bold text-red-400">
            {currency}
            {waterfallData
              .filter((d) => d.type === "negative")
              .reduce((sum, d) => sum + d.value, 0)
              .toLocaleString()}
          </div>
          <div className="text-xs text-dashboard-text-muted">
            Negative Impact
          </div>
        </div>

        <div className="bg-dashboard-surface rounded-lg p-3 border border-dashboard-border">
          <div className="text-sm font-bold text-dashboard-text">
            {currency}
            {waterfallData[0].value.toLocaleString()}
          </div>
          <div className="text-xs text-dashboard-text-muted">
            Starting Value
          </div>
        </div>

        <div className="bg-dashboard-surface rounded-lg p-3 border border-dashboard-border">
          <div className="text-sm font-bold text-dashboard-accent">
            {currency}
            {waterfallData[waterfallData.length - 1].value.toLocaleString()}
          </div>
          <div className="text-xs text-dashboard-text-muted">Final Value</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-dashboard-text-muted">Positive</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
          <span className="text-dashboard-text-muted">Negative</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-dashboard-accent rounded-full"></div>
          <span className="text-dashboard-text-muted">Total</span>
        </div>
      </div>
    </div>
  );
}
