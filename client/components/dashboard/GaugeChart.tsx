import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Gauge as GaugeIcon, TrendingUp } from "lucide-react";

interface GaugeChartProps {
  properties?: {
    value?: number;
    minValue?: number;
    maxValue?: number;
    unit?: string;
    title?: string;
    color?: string;
    targetValue?: number;
    showTarget?: boolean;
    thickness?: number;
  };
}

export default function GaugeChart({ properties }: GaugeChartProps = {}) {
  const {
    value = 75,
    minValue = 0,
    maxValue = 100,
    unit = "%",
    title = "Performance Gauge",
    color = "hsl(199, 89%, 48%)",
    targetValue = 85,
    showTarget = true,
    thickness = 20,
  } = properties || {};

  // Calculate percentage for the gauge
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
  const targetPercentage = showTarget
    ? ((targetValue - minValue) / (maxValue - minValue)) * 100
    : 0;

  // Create data for the gauge (semicircle)
  const data = [
    { name: "Value", value: percentage, fill: color },
    { name: "Remaining", value: 100 - percentage, fill: "hsl(210, 11%, 20%)" },
  ];

  // Create data for full circle background
  const backgroundData = [
    { name: "Background", value: 100, fill: "hsl(210, 11%, 15%)" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-dashboard-text">{title}</h3>
          <p className="text-xs text-dashboard-text-muted">
            Current performance metric
          </p>
        </div>
        <div className="flex items-center gap-2">
          <GaugeIcon className="w-4 h-4 text-dashboard-accent" />
          <span className="text-xs text-dashboard-accent">Live Data</span>
        </div>
      </div>

      <div className="relative h-full min-h-40 flex flex-col items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Background circle */}
            <Pie
              data={backgroundData}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              strokeWidth={0}
              dataKey="value"
            />
            {/* Main gauge */}
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              strokeWidth={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center value display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
          <div className="text-2xl font-bold text-dashboard-text">
            {value}
            <span className="text-sm text-dashboard-text-muted ml-1">
              {unit}
            </span>
          </div>
          <div className="text-xs text-dashboard-text-muted">
            of {maxValue}
            {unit}
          </div>
          {showTarget && (
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-dashboard-accent" />
              <span className="text-xs text-dashboard-accent">
                Target: {targetValue}
                {unit}
              </span>
            </div>
          )}
        </div>

        {/* Target indicator */}
        {showTarget && (
          <div
            className="absolute w-1 h-6 bg-dashboard-accent rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: `translateX(-50%) translateY(-50%) rotate(${
                180 - (targetPercentage * 180) / 100
              }deg)`,
              transformOrigin: "50% 40px",
            }}
          />
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-dashboard-accent rounded-full"></div>
          <span className="text-dashboard-text-muted">
            Current: {value}
            {unit}
          </span>
        </div>
        {showTarget && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 border border-dashboard-accent rounded-full"></div>
            <span className="text-dashboard-text-muted">
              Target: {targetValue}
              {unit}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
