import React from "react";
import { Grid3X3, TrendingUp } from "lucide-react";

// Sample treemap data representing market segments
const treemapData = [
  {
    name: "Enterprise Software",
    value: 450000,
    percentage: 35,
    color: "hsl(199, 89%, 48%)",
    children: [
      { name: "CRM Systems", value: 180000, color: "hsl(199, 89%, 45%)" },
      { name: "ERP Solutions", value: 150000, color: "hsl(199, 89%, 50%)" },
      { name: "Analytics Tools", value: 120000, color: "hsl(199, 89%, 55%)" },
    ],
  },
  {
    name: "Mobile Applications",
    value: 320000,
    percentage: 25,
    color: "hsl(142, 76%, 36%)",
    children: [
      { name: "iOS Apps", value: 180000, color: "hsl(142, 76%, 33%)" },
      { name: "Android Apps", value: 140000, color: "hsl(142, 76%, 39%)" },
    ],
  },
  {
    name: "Web Services",
    value: 280000,
    percentage: 22,
    color: "hsl(271, 81%, 56%)",
    children: [
      { name: "API Services", value: 160000, color: "hsl(271, 81%, 53%)" },
      { name: "SaaS Platforms", value: 120000, color: "hsl(271, 81%, 59%)" },
    ],
  },
  {
    name: "Cloud Infrastructure",
    value: 180000,
    percentage: 14,
    color: "hsl(48, 96%, 53%)",
    children: [
      { name: "Storage", value: 100000, color: "hsl(48, 96%, 50%)" },
      { name: "Computing", value: 80000, color: "hsl(48, 96%, 56%)" },
    ],
  },
  {
    name: "AI/ML Services",
    value: 95000,
    percentage: 7,
    color: "hsl(0, 84%, 60%)",
    children: [
      { name: "NLP Services", value: 55000, color: "hsl(0, 84%, 57%)" },
      { name: "Vision AI", value: 40000, color: "hsl(0, 84%, 63%)" },
    ],
  },
];

interface TreemapChartProps {
  properties?: {
    title?: string;
    showLabels?: boolean;
    showValues?: boolean;
    showPercentages?: boolean;
    currency?: string;
    animationEnabled?: boolean;
  };
}

// Calculate layout for treemap (simplified squarified algorithm)
const calculateLayout = (data: any[], width: number, height: number) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentX = 0;
  let currentY = 0;
  let rowHeight = 0;
  let remainingWidth = width;

  return data.map((item, index) => {
    const area = (item.value / total) * (width * height);
    const itemWidth = Math.min(
      remainingWidth,
      Math.sqrt(area * (width / height)),
    );
    const itemHeight = area / itemWidth;

    // Check if we need to start a new row
    if (itemWidth > remainingWidth * 0.8 && currentX > 0) {
      currentX = 0;
      currentY += rowHeight;
      rowHeight = 0;
      remainingWidth = width;
    }

    const layout = {
      x: currentX,
      y: currentY,
      width: itemWidth,
      height: itemHeight,
      ...item,
    };

    currentX += itemWidth;
    remainingWidth -= itemWidth;
    rowHeight = Math.max(rowHeight, itemHeight);

    return layout;
  });
};

export default function TreemapChart({ properties }: TreemapChartProps = {}) {
  const {
    title = "Revenue by Product Category",
    showLabels = true,
    showValues = true,
    showPercentages = true,
    currency = "$",
    animationEnabled = true,
  } = properties || {};

  const containerWidth = 320;
  const containerHeight = 200;

  const layout = calculateLayout(treemapData, containerWidth, containerHeight);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-dashboard-text">{title}</h3>
          <p className="text-xs text-dashboard-text-muted">
            Hierarchical data visualization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Grid3X3 className="w-4 h-4 text-dashboard-accent" />
          <span className="text-xs text-dashboard-accent">Tree Map</span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-dashboard-border">
        <svg
          width={containerWidth}
          height={containerHeight}
          className="bg-dashboard-surface"
        >
          {layout.map((item, index) => (
            <g key={item.name} className="group cursor-pointer">
              {/* Rectangle */}
              <rect
                x={item.x}
                y={item.y}
                width={item.width}
                height={item.height}
                fill={item.color}
                stroke="hsl(210, 11%, 20%)"
                strokeWidth={1}
                className={`transition-all duration-300 ${
                  animationEnabled ? "hover:opacity-80" : ""
                }`}
                style={{
                  animationDelay: animationEnabled
                    ? `${index * 0.1}s`
                    : undefined,
                }}
                className={
                  animationEnabled ? "animate-in fade-in duration-500" : ""
                }
              />

              {/* Label and value text */}
              {showLabels && item.width > 60 && item.height > 30 && (
                <foreignObject
                  x={item.x + 4}
                  y={item.y + 4}
                  width={item.width - 8}
                  height={item.height - 8}
                >
                  <div className="h-full flex flex-col justify-center text-white text-xs font-medium overflow-hidden">
                    <div className="truncate">{item.name}</div>
                    {showValues && (
                      <div className="text-xs opacity-90">
                        {currency}
                        {(item.value / 1000).toFixed(0)}K
                      </div>
                    )}
                    {showPercentages && (
                      <div className="text-xs opacity-75">
                        {item.percentage}%
                      </div>
                    )}
                  </div>
                </foreignObject>
              )}

              {/* Tooltip on hover */}
              <title>
                {item.name}: {currency}
                {item.value.toLocaleString()} ({item.percentage}%)
              </title>
            </g>
          ))}
        </svg>
      </div>

      {/* Color legend */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-dashboard-text">Categories</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {treemapData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-dashboard-text-muted truncate">
                {item.name}
              </span>
              <span className="text-dashboard-text ml-auto">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-dashboard-surface rounded-lg p-3 border border-dashboard-border">
          <div className="text-lg font-bold text-dashboard-text">
            {treemapData.length}
          </div>
          <div className="text-xs text-dashboard-text-muted">Categories</div>
        </div>
        <div className="bg-dashboard-surface rounded-lg p-3 border border-dashboard-border">
          <div className="text-lg font-bold text-dashboard-accent">
            {currency}
            {(
              treemapData.reduce((sum, item) => sum + item.value, 0) / 1000
            ).toFixed(0)}
            K
          </div>
          <div className="text-xs text-dashboard-text-muted">Total Value</div>
        </div>
        <div className="bg-dashboard-surface rounded-lg p-3 border border-dashboard-border">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-xs text-dashboard-text-muted">Growth</div>
        </div>
      </div>

      {/* Animation styles moved to CSS classes */}
    </div>
  );
}
