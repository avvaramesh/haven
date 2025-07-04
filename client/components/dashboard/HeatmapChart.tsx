import React from "react";
import { Thermometer, Calendar } from "lucide-react";

// Sample heatmap data (7x24 grid representing days of week vs hours)
const generateHeatmapData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return days
    .map((day) =>
      hours.map((hour) => ({
        day,
        hour,
        value: Math.floor(Math.random() * 100), // Random activity level 0-100
        label: `${day} ${hour}:00`,
      })),
    )
    .flat();
};

const heatmapData = generateHeatmapData();

// Color intensity based on value
const getHeatmapColor = (value: number, maxValue: number) => {
  const intensity = value / maxValue;

  if (intensity < 0.2) return "hsl(210, 11%, 15%)"; // Very low
  if (intensity < 0.4) return "hsl(199, 89%, 25%)"; // Low
  if (intensity < 0.6) return "hsl(199, 89%, 40%)"; // Medium
  if (intensity < 0.8) return "hsl(199, 89%, 55%)"; // High
  return "hsl(199, 89%, 70%)"; // Very high
};

interface HeatmapChartProps {
  properties?: {
    title?: string;
    colorScheme?: "blue" | "green" | "red" | "purple";
    showValues?: boolean;
    cellSize?: number;
    showGrid?: boolean;
  };
}

export default function HeatmapChart({ properties }: HeatmapChartProps = {}) {
  const {
    title = "Activity Heatmap",
    colorScheme = "blue",
    showValues = false,
    cellSize = 16,
    showGrid = true,
  } = properties || {};

  const maxValue = Math.max(...heatmapData.map((d) => d.value));
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-dashboard-text">{title}</h3>
          <p className="text-xs text-dashboard-text-muted">
            Weekly activity patterns by hour
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-dashboard-accent" />
          <span className="text-xs text-dashboard-accent">Heat Map</span>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        {/* Time labels (hours) */}
        <div className="flex mb-2">
          <div className="w-12"></div> {/* Space for day labels */}
          <div className="flex">
            {hours.map((hour) => (
              <div
                key={hour}
                className="text-xs text-dashboard-text-muted text-center"
                style={{ width: `${cellSize}px`, fontSize: "8px" }}
              >
                {hour % 6 === 0 ? hour : ""}
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap grid */}
        <div className="space-y-1">
          {days.map((day) => (
            <div key={day} className="flex items-center">
              {/* Day label */}
              <div className="w-12 text-xs text-dashboard-text-muted text-right pr-2">
                {day}
              </div>

              {/* Cells for each hour */}
              <div className="flex gap-px">
                {hours.map((hour) => {
                  const dataPoint = heatmapData.find(
                    (d) => d.day === day && d.hour === hour,
                  );
                  const value = dataPoint?.value || 0;
                  const color = getHeatmapColor(value, maxValue);

                  return (
                    <div
                      key={`${day}-${hour}`}
                      className={`relative group cursor-pointer transition-all duration-200 hover:scale-110 hover:z-10 ${
                        showGrid ? "border border-dashboard-border" : ""
                      }`}
                      style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                        backgroundColor: color,
                      }}
                      title={`${day} ${hour}:00 - ${value}% activity`}
                    >
                      {showValues && value > 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                          {value}
                        </div>
                      )}

                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-dashboard-surface border border-dashboard-border rounded text-xs text-dashboard-text opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                        {day} {hour}:00
                        <br />
                        Activity: {value}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-dashboard-text-muted" />
            <span className="text-xs text-dashboard-text-muted">
              Showing 7 days × 24 hours
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-dashboard-text-muted">Less</span>
            <div className="flex gap-1">
              {[0, 20, 40, 60, 80, 100].map((intensity) => (
                <div
                  key={intensity}
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: getHeatmapColor(intensity, 100) }}
                />
              ))}
            </div>
            <span className="text-xs text-dashboard-text-muted">More</span>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-dashboard-surface rounded-lg p-3 border border-dashboard-border">
          <div className="text-lg font-bold text-dashboard-text">
            {Math.round(
              heatmapData.reduce((sum, d) => sum + d.value, 0) /
                heatmapData.length,
            )}
            %
          </div>
          <div className="text-xs text-dashboard-text-muted">Avg Activity</div>
        </div>
        <div className="bg-dashboard-surface rounded-lg p-3 border border-dashboard-border">
          <div className="text-lg font-bold text-dashboard-accent">
            {maxValue}%
          </div>
          <div className="text-xs text-dashboard-text-muted">Peak Activity</div>
        </div>
        <div className="bg-dashboard-surface rounded-lg p-3 border border-dashboard-border">
          <div className="text-lg font-bold text-green-400">
            {heatmapData.filter((d) => d.value > 50).length}
          </div>
          <div className="text-xs text-dashboard-text-muted">
            High Activity Hours
          </div>
        </div>
      </div>
    </div>
  );
}
