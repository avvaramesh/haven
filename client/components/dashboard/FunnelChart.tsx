import React from "react";
import { BarChart, Bar, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { Filter, TrendingDown } from "lucide-react";

const funnelData = [
  {
    name: "Website Visitors",
    value: 10000,
    percentage: 100,
    color: "hsl(199, 89%, 48%)",
  },
  {
    name: "Product Views",
    value: 4500,
    percentage: 45,
    color: "hsl(199, 89%, 55%)",
  },
  {
    name: "Add to Cart",
    value: 1800,
    percentage: 18,
    color: "hsl(199, 89%, 62%)",
  },
  {
    name: "Checkout Started",
    value: 900,
    percentage: 9,
    color: "hsl(199, 89%, 69%)",
  },
  {
    name: "Purchase Completed",
    value: 450,
    percentage: 4.5,
    color: "hsl(199, 89%, 76%)",
  },
];

interface FunnelChartProps {
  properties?: {
    title?: string;
    color?: string;
    showPercentages?: boolean;
    showDropoff?: boolean;
    orientation?: "horizontal" | "vertical";
  };
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-dashboard-surface border border-dashboard-border rounded-lg p-3 shadow-lg z-50">
        <p className="text-dashboard-text font-medium">{data.name}</p>
        <p className="text-dashboard-accent">
          Value: {data.value.toLocaleString()}
        </p>
        <p className="text-dashboard-text-muted">
          Conversion: {data.percentage}%
        </p>
      </div>
    );
  }
  return null;
};

export default function FunnelChart({ properties }: FunnelChartProps = {}) {
  const {
    title = "Sales Conversion Funnel",
    color = "hsl(199, 89%, 48%)",
    showPercentages = true,
    showDropoff = true,
    orientation = "vertical",
  } = properties || {};

  // Calculate dropoff rates
  const dataWithDropoff = funnelData.map((item, index) => {
    if (index === 0) return { ...item, dropoff: 0 };
    const previousValue = funnelData[index - 1].value;
    const dropoff = ((previousValue - item.value) / previousValue) * 100;
    return { ...item, dropoff };
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-dashboard-text">{title}</h3>
          <p className="text-xs text-dashboard-text-muted">
            Customer journey conversion rates
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-dashboard-accent" />
          <span className="text-xs text-dashboard-accent">Active Filter</span>
        </div>
      </div>

      <div className="relative">
        {/* Funnel visualization using shaped divs for better funnel appearance */}
        <div className="space-y-2">
          {dataWithDropoff.map((item, index) => {
            const width = (item.percentage / 100) * 100;
            const margin = (100 - width) / 2;

            return (
              <div key={item.name} className="relative">
                {/* Funnel segment */}
                <div
                  className="relative bg-gradient-to-r from-dashboard-accent to-dashboard-accent-light rounded-sm transition-all duration-300 hover:opacity-80"
                  style={{
                    width: `${width}%`,
                    marginLeft: `${margin}%`,
                    height: "32px",
                    backgroundColor: item.color,
                  }}
                >
                  {/* Content overlay */}
                  <div className="absolute inset-0 flex items-center justify-between px-3 text-white text-xs font-medium">
                    <span>{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span>{item.value.toLocaleString()}</span>
                      {showPercentages && (
                        <span className="opacity-80">({item.percentage}%)</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dropoff indicator */}
                {showDropoff && index > 0 && (
                  <div className="flex items-center justify-center mt-1 mb-1">
                    <div className="flex items-center gap-1 text-xs text-red-400">
                      <TrendingDown className="w-3 h-3" />
                      <span>{item.dropoff.toFixed(1)}% dropoff</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-dashboard-surface rounded-lg p-3 border border-dashboard-border">
            <div className="text-lg font-bold text-dashboard-text">
              {funnelData[0].value.toLocaleString()}
            </div>
            <div className="text-xs text-dashboard-text-muted">
              Top of Funnel
            </div>
          </div>
          <div className="bg-dashboard-surface rounded-lg p-3 border border-dashboard-border">
            <div className="text-lg font-bold text-dashboard-accent">
              {funnelData[funnelData.length - 1].percentage}%
            </div>
            <div className="text-xs text-dashboard-text-muted">
              Conversion Rate
            </div>
          </div>
          <div className="bg-dashboard-surface rounded-lg p-3 border border-dashboard-border">
            <div className="text-lg font-bold text-green-400">
              {funnelData[funnelData.length - 1].value.toLocaleString()}
            </div>
            <div className="text-xs text-dashboard-text-muted">Conversions</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-dashboard-accent rounded-full"></div>
          <span className="text-dashboard-text-muted">Conversion Flow</span>
        </div>
        {showDropoff && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span className="text-dashboard-text-muted">Dropoff Points</span>
          </div>
        )}
      </div>
    </div>
  );
}
