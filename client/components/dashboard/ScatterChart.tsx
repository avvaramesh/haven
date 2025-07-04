import React from "react";
import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { Activity, TrendingUp } from "lucide-react";

// Sample scatter plot data showing relationship between two variables
const scatterData = [
  { x: 100, y: 200, size: 20, category: "A", label: "Product Alpha" },
  { x: 120, y: 100, size: 15, category: "A", label: "Product Beta" },
  { x: 170, y: 300, size: 25, category: "B", label: "Product Gamma" },
  { x: 140, y: 250, size: 18, category: "B", label: "Product Delta" },
  { x: 150, y: 400, size: 30, category: "C", label: "Product Epsilon" },
  { x: 110, y: 280, size: 22, category: "C", label: "Product Zeta" },
  { x: 200, y: 450, size: 35, category: "A", label: "Product Eta" },
  { x: 180, y: 380, size: 28, category: "B", label: "Product Theta" },
  { x: 160, y: 320, size: 24, category: "C", label: "Product Iota" },
  { x: 190, y: 220, size: 16, category: "A", label: "Product Kappa" },
  { x: 130, y: 180, size: 19, category: "B", label: "Product Lambda" },
  { x: 220, y: 380, size: 32, category: "C", label: "Product Mu" },
  { x: 210, y: 300, size: 26, category: "A", label: "Product Nu" },
  { x: 250, y: 500, size: 40, category: "B", label: "Product Xi" },
  { x: 240, y: 420, size: 36, category: "C", label: "Product Omicron" },
];

// Group data by category for multiple series
const groupedData = {
  A: scatterData.filter((d) => d.category === "A"),
  B: scatterData.filter((d) => d.category === "B"),
  C: scatterData.filter((d) => d.category === "C"),
};

const categoryColors = {
  A: "hsl(199, 89%, 48%)",
  B: "hsl(142, 76%, 36%)",
  C: "hsl(271, 81%, 56%)",
};

interface ScatterChartProps {
  properties?: {
    title?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    showGrid?: boolean;
    showTrendLine?: boolean;
    showLegend?: boolean;
    pointSize?: number;
    opacity?: number;
  };
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-dashboard-surface border border-dashboard-border rounded-lg p-3 shadow-lg z-50">
        <p className="text-dashboard-text font-medium">{data.label}</p>
        <p className="text-dashboard-accent">
          X: {data.x} | Y: {data.y}
        </p>
        <p className="text-dashboard-text-muted">
          Category: {data.category} | Size: {data.size}
        </p>
      </div>
    );
  }
  return null;
};

export default function ScatterChart({ properties }: ScatterChartProps = {}) {
  const {
    title = "Performance Correlation Analysis",
    xAxisLabel = "Marketing Spend ($000)",
    yAxisLabel = "Revenue ($000)",
    showGrid = true,
    showTrendLine = true,
    showLegend = true,
    pointSize = 6,
    opacity = 0.8,
  } = properties || {};

  // Calculate trend line (simple linear regression)
  const calculateTrendLine = () => {
    const n = scatterData.length;
    const sumX = scatterData.reduce((sum, d) => sum + d.x, 0);
    const sumY = scatterData.reduce((sum, d) => sum + d.y, 0);
    const sumXY = scatterData.reduce((sum, d) => sum + d.x * d.y, 0);
    const sumXX = scatterData.reduce((sum, d) => sum + d.x * d.x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const minX = Math.min(...scatterData.map((d) => d.x));
    const maxX = Math.max(...scatterData.map((d) => d.x));

    return {
      start: { x: minX, y: slope * minX + intercept },
      end: { x: maxX, y: slope * maxX + intercept },
      slope,
      r2: 0.85, // Simplified R² value for demo
    };
  };

  const trendLine = showTrendLine ? calculateTrendLine() : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-dashboard-text">{title}</h3>
          <p className="text-xs text-dashboard-text-muted">
            Correlation between marketing spend and revenue
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-dashboard-accent" />
          <span className="text-xs text-dashboard-accent">Scatter Plot</span>
        </div>
      </div>

      <div className="relative h-full min-h-48">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(210, 11%, 20%)"
              />
            )}
            <XAxis
              type="number"
              dataKey="x"
              name={xAxisLabel}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 12 }}
              label={{
                value: xAxisLabel,
                position: "insideBottom",
                offset: -10,
                style: { textAnchor: "middle", fill: "hsl(215, 20.2%, 65.1%)" },
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name={yAxisLabel}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20.2%, 65.1%)", fontSize: 12 }}
              label={{
                value: yAxisLabel,
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fill: "hsl(215, 20.2%, 65.1%)" },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && (
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                wrapperStyle={{
                  paddingBottom: "10px",
                  fontSize: "12px",
                  color: "hsl(215, 20.2%, 65.1%)",
                }}
              />
            )}

            {/* Scatter points for each category */}
            {Object.entries(groupedData).map(([category, data]) => (
              <Scatter
                key={category}
                name={`Category ${category}`}
                data={data}
                fill={categoryColors[category as keyof typeof categoryColors]}
                fillOpacity={opacity}
                stroke={categoryColors[category as keyof typeof categoryColors]}
                strokeWidth={1}
              />
            ))}

            {/* Trend line */}
            {showTrendLine && trendLine && (
              <ReferenceLine
                segment={[
                  { x: trendLine.start.x, y: trendLine.start.y },
                  { x: trendLine.end.x, y: trendLine.end.y },
                ]}
                stroke="hsl(0, 84%, 60%)"
                strokeDasharray="4 4"
                strokeWidth={2}
              />
            )}
          </RechartsScatterChart>
        </ResponsiveContainer>

        {/* Trend line info overlay */}
        {showTrendLine && trendLine && (
          <div className="absolute top-4 right-4 bg-dashboard-surface border border-dashboard-border rounded-lg p-2 max-w-32">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-3 h-3 text-red-400" />
              <span className="text-xs font-medium text-dashboard-text">
                Trend Line
              </span>
            </div>
            <p className="text-xs text-dashboard-text-muted">
              R² = {trendLine.r2.toFixed(2)}
            </p>
            <p className="text-xs text-dashboard-text-muted">
              Slope: {trendLine.slope.toFixed(1)}
            </p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-3 text-center">
        <div className="bg-dashboard-surface rounded-lg p-3 border border-dashboard-border">
          <div className="text-sm font-bold text-dashboard-text">
            {scatterData.length}
          </div>
          <div className="text-xs text-dashboard-text-muted">Data Points</div>
        </div>
        <div className="bg-dashboard-surface rounded-lg p-3 border border-dashboard-border">
          <div className="text-sm font-bold text-dashboard-accent">
            {Object.keys(groupedData).length}
          </div>
          <div className="text-xs text-dashboard-text-muted">Categories</div>
        </div>
        <div className="bg-dashboard-surface rounded-lg p-3 border border-dashboard-border">
          <div className="text-sm font-bold text-green-400">
            {trendLine?.r2.toFixed(2) || "0.85"}
          </div>
          <div className="text-xs text-dashboard-text-muted">Correlation</div>
        </div>
        <div className="bg-dashboard-surface rounded-lg p-3 border border-dashboard-border">
          <div className="text-sm font-bold text-dashboard-text">
            {Math.round(
              scatterData.reduce((sum, d) => sum + d.y, 0) / scatterData.length,
            )}
          </div>
          <div className="text-xs text-dashboard-text-muted">Avg Revenue</div>
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex items-center justify-center gap-4 text-xs">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              ></div>
              <span className="text-dashboard-text-muted">
                Category {category}
              </span>
            </div>
          ))}
          {showTrendLine && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-px bg-red-400 border-dashed border-t"></div>
              <span className="text-dashboard-text-muted">Trend</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
