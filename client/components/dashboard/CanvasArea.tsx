import React, { useState } from "react";
import ChartWidget from "./ChartWidget";
import SmartChart from "./SmartChart";
import RevenueByCategoryChart from "./RevenueByCategoryChart";
import KPIWidget from "./KPIWidget";
import SalesDistributionChart from "./SalesDistributionChart";

interface CanvasAreaProps {
  selectedElement: string | null;
  onElementSelect: (elementId: string | null) => void;
}

export default function CanvasArea({
  selectedElement,
  onElementSelect,
}: CanvasAreaProps) {
  const [showGrid, setShowGrid] = useState(true);

  const handleElementClick = (elementId: string) => {
    onElementSelect(elementId === selectedElement ? null : elementId);
  };

  return (
    <div className="flex-1 bg-dashboard-muted/30 relative overflow-auto">
      {/* Grid Background */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--dashboard-border)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--dashboard-border)) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      )}

      {/* Canvas Content */}
      <div className="relative p-8 min-h-full">
        <div className="grid grid-cols-12 gap-6 auto-rows-min">
          {/* Smart Chart - Featured */}
          <div
            className={`col-span-8 row-span-1 relative group ${
              selectedElement === "smart-chart"
                ? "ring-2 ring-dashboard-accent ring-offset-2 ring-offset-dashboard-background"
                : ""
            }`}
            onClick={() => handleElementClick("smart-chart")}
          >
            <ChartWidget title="" className="h-64">
              <SmartChart />
            </ChartWidget>
            {selectedElement === "smart-chart" && (
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-dashboard-accent rounded-full border-2 border-white"></div>
            )}
          </div>

          {/* KPI Widget */}
          <div
            className={`col-span-4 row-span-1 relative group ${
              selectedElement === "kpi-widget"
                ? "ring-2 ring-dashboard-accent ring-offset-2 ring-offset-dashboard-background"
                : ""
            }`}
            onClick={() => handleElementClick("kpi-widget")}
          >
            <ChartWidget title="Total Revenue" className="h-32">
              <KPIWidget />
            </ChartWidget>
            {selectedElement === "kpi-widget" && (
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-dashboard-accent rounded-full border-2 border-white"></div>
            )}
          </div>

          {/* Revenue by Category */}
          <div
            className={`col-span-6 row-span-1 relative group ${
              selectedElement === "revenue-chart"
                ? "ring-2 ring-dashboard-accent ring-offset-2 ring-offset-dashboard-background"
                : ""
            }`}
            onClick={() => handleElementClick("revenue-chart")}
          >
            <ChartWidget title="Revenue by Category" className="h-48">
              <RevenueByCategoryChart />
            </ChartWidget>
            {selectedElement === "revenue-chart" && (
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-dashboard-accent rounded-full border-2 border-white"></div>
            )}
          </div>

          {/* Sales Distribution */}
          <div
            className={`col-span-6 row-span-1 relative group ${
              selectedElement === "sales-dist"
                ? "ring-2 ring-dashboard-accent ring-offset-2 ring-offset-dashboard-background"
                : ""
            }`}
            onClick={() => handleElementClick("sales-dist")}
          >
            <ChartWidget title="Sales Distribution" className="h-48">
              <SalesDistributionChart />
            </ChartWidget>
            {selectedElement === "sales-dist" && (
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-dashboard-accent rounded-full border-2 border-white"></div>
            )}
          </div>

          {/* Additional KPI Cards */}
          <div
            className={`col-span-3 row-span-1 relative group ${
              selectedElement === "kpi-1"
                ? "ring-2 ring-dashboard-accent ring-offset-2 ring-offset-dashboard-background"
                : ""
            }`}
            onClick={() => handleElementClick("kpi-1")}
          >
            <ChartWidget title="Monthly Growth" className="h-24">
              <div className="flex flex-col justify-center items-center h-full">
                <div className="text-lg font-bold text-green-400">+12.5%</div>
                <div className="text-xs text-dashboard-text-muted">
                  vs last month
                </div>
              </div>
            </ChartWidget>
            {selectedElement === "kpi-1" && (
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-dashboard-accent rounded-full border-2 border-white"></div>
            )}
          </div>

          <div
            className={`col-span-3 row-span-1 relative group ${
              selectedElement === "kpi-2"
                ? "ring-2 ring-dashboard-accent ring-offset-2 ring-offset-dashboard-background"
                : ""
            }`}
            onClick={() => handleElementClick("kpi-2")}
          >
            <ChartWidget title="Active Users" className="h-24">
              <div className="flex flex-col justify-center items-center h-full">
                <div className="text-lg font-bold text-dashboard-accent">
                  24.8k
                </div>
                <div className="text-xs text-dashboard-text-muted">
                  this week
                </div>
              </div>
            </ChartWidget>
            {selectedElement === "kpi-2" && (
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-dashboard-accent rounded-full border-2 border-white"></div>
            )}
          </div>

          <div
            className={`col-span-3 row-span-1 relative group ${
              selectedElement === "kpi-3"
                ? "ring-2 ring-dashboard-accent ring-offset-2 ring-offset-dashboard-background"
                : ""
            }`}
            onClick={() => handleElementClick("kpi-3")}
          >
            <ChartWidget title="Conversion Rate" className="h-24">
              <div className="flex flex-col justify-center items-center h-full">
                <div className="text-lg font-bold text-yellow-400">3.2%</div>
                <div className="text-xs text-dashboard-text-muted">
                  avg rate
                </div>
              </div>
            </ChartWidget>
            {selectedElement === "kpi-3" && (
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-dashboard-accent rounded-full border-2 border-white"></div>
            )}
          </div>

          <div
            className={`col-span-3 row-span-1 relative group ${
              selectedElement === "kpi-4"
                ? "ring-2 ring-dashboard-accent ring-offset-2 ring-offset-dashboard-background"
                : ""
            }`}
            onClick={() => handleElementClick("kpi-4")}
          >
            <ChartWidget title="Customer LTV" className="h-24">
              <div className="flex flex-col justify-center items-center h-full">
                <div className="text-lg font-bold text-purple-400">$1,247</div>
                <div className="text-xs text-dashboard-text-muted">average</div>
              </div>
            </ChartWidget>
            {selectedElement === "kpi-4" && (
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-dashboard-accent rounded-full border-2 border-white"></div>
            )}
          </div>
        </div>
      </div>

      {/* Canvas Info */}
      <div className="absolute bottom-4 left-4 bg-dashboard-surface border border-dashboard-border rounded-lg p-2 text-xs text-dashboard-text-muted">
        <div className="flex items-center gap-4">
          <span>Canvas: 1920x1080</span>
          <span>•</span>
          <span>Grid: 20px</span>
          <span>•</span>
          <span>Zoom: 100%</span>
          {selectedElement && (
            <>
              <span>•</span>
              <span className="text-dashboard-accent">
                Selected: {selectedElement}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
