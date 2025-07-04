import React, { useState } from "react";
import ChartWidget from "./ChartWidget";
import SmartChart from "./SmartChart";
import RevenueByCategoryChart from "./RevenueByCategoryChart";
import KPIWidget from "./KPIWidget";
import SalesDistributionChart from "./SalesDistributionChart";

interface ChartState {
  id: string;
  isMinimized: boolean;
  isMaximized: boolean;
  isHidden: boolean;
}

interface CanvasAreaProps {
  selectedElement: string | null;
  onElementSelect: (elementId: string | null) => void;
}

export default function CanvasArea({
  selectedElement,
  onElementSelect,
}: CanvasAreaProps) {
  const [showGrid, setShowGrid] = useState(true);
  const [chartStates, setChartStates] = useState<Record<string, ChartState>>({
    "smart-chart": {
      id: "smart-chart",
      isMinimized: false,
      isMaximized: false,
      isHidden: false,
    },
    "kpi-widget": {
      id: "kpi-widget",
      isMinimized: false,
      isMaximized: false,
      isHidden: false,
    },
    "revenue-chart": {
      id: "revenue-chart",
      isMinimized: false,
      isMaximized: false,
      isHidden: false,
    },
    "sales-dist": {
      id: "sales-dist",
      isMinimized: false,
      isMaximized: false,
      isHidden: false,
    },
    "kpi-1": {
      id: "kpi-1",
      isMinimized: false,
      isMaximized: false,
      isHidden: false,
    },
    "kpi-2": {
      id: "kpi-2",
      isMinimized: false,
      isMaximized: false,
      isHidden: false,
    },
    "kpi-3": {
      id: "kpi-3",
      isMinimized: false,
      isMaximized: false,
      isHidden: false,
    },
    "kpi-4": {
      id: "kpi-4",
      isMinimized: false,
      isMaximized: false,
      isHidden: false,
    },
  });

  const handleElementClick = (elementId: string) => {
    onElementSelect(elementId === selectedElement ? null : elementId);
  };

  const updateChartState = (chartId: string, updates: Partial<ChartState>) => {
    setChartStates((prev) => ({
      ...prev,
      [chartId]: { ...prev[chartId], ...updates },
    }));
  };

  const handleMinimize = (chartId: string) => {
    updateChartState(chartId, {
      isMinimized: !chartStates[chartId]?.isMinimized,
      isMaximized: false, // Can't be both minimized and maximized
    });
  };

  const handleMaximize = (chartId: string) => {
    updateChartState(chartId, {
      isMaximized: !chartStates[chartId]?.isMaximized,
      isMinimized: false, // Can't be both minimized and maximized
    });
  };

  const handleHide = (chartId: string) => {
    updateChartState(chartId, { isHidden: true });
  };

  const handleRemove = (chartId: string) => {
    if (confirm("Are you sure you want to remove this chart?")) {
      setChartStates((prev) => {
        const newStates = { ...prev };
        delete newStates[chartId];
        return newStates;
      });
      if (selectedElement === chartId) {
        onElementSelect(null);
      }
    }
  };

  const handleDownload = (chartId: string) => {
    // In a real implementation, this would generate and download the chart
    console.log(`Downloading chart: ${chartId}`);
    // You could use libraries like html2canvas, jsPDF, etc.
  };

  const handleDuplicate = (chartId: string) => {
    const newId = `${chartId}-copy-${Date.now()}`;
    const originalState = chartStates[chartId];
    if (originalState) {
      setChartStates((prev) => ({
        ...prev,
        [newId]: { ...originalState, id: newId },
      }));
    }
  };

  const handleEdit = (chartId: string) => {
    onElementSelect(chartId);
  };

  // Count visible charts
  const visibleCharts = Object.values(chartStates).filter(
    (state) => !state.isHidden,
  );
  const minimizedCharts = visibleCharts.filter((state) => state.isMinimized);
  const maximizedChart = visibleCharts.find((state) => state.isMaximized);

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
          {chartStates["smart-chart"] &&
            !chartStates["smart-chart"].isHidden && (
              <div
                className={`col-span-8 row-span-1 relative group ${chartStates["smart-chart"].isMinimized ? "col-span-4" : ""}`}
              >
                <ChartWidget
                  id="smart-chart"
                  title="Smart Analytics Chart"
                  className="h-64"
                  isSelected={selectedElement === "smart-chart"}
                  isMinimized={chartStates["smart-chart"].isMinimized}
                  isMaximized={chartStates["smart-chart"].isMaximized}
                  isHidden={chartStates["smart-chart"].isHidden}
                  onSelect={() => handleElementClick("smart-chart")}
                  onMinimize={() => handleMinimize("smart-chart")}
                  onMaximize={() => handleMaximize("smart-chart")}
                  onHide={() => handleHide("smart-chart")}
                  onRemove={() => handleRemove("smart-chart")}
                  onDownload={() => handleDownload("smart-chart")}
                  onDuplicate={() => handleDuplicate("smart-chart")}
                  onEdit={() => handleEdit("smart-chart")}
                >
                  <SmartChart />
                </ChartWidget>
              </div>
            )}

          {/* KPI Widget */}
          {chartStates["kpi-widget"] && !chartStates["kpi-widget"].isHidden && (
            <div
              className={`col-span-4 row-span-1 relative group ${chartStates["kpi-widget"].isMinimized ? "col-span-2" : ""}`}
            >
              <ChartWidget
                id="kpi-widget"
                title="Total Revenue"
                className="h-32"
                isSelected={selectedElement === "kpi-widget"}
                isMinimized={chartStates["kpi-widget"].isMinimized}
                isMaximized={chartStates["kpi-widget"].isMaximized}
                isHidden={chartStates["kpi-widget"].isHidden}
                onSelect={() => handleElementClick("kpi-widget")}
                onMinimize={() => handleMinimize("kpi-widget")}
                onMaximize={() => handleMaximize("kpi-widget")}
                onHide={() => handleHide("kpi-widget")}
                onRemove={() => handleRemove("kpi-widget")}
                onDownload={() => handleDownload("kpi-widget")}
                onDuplicate={() => handleDuplicate("kpi-widget")}
                onEdit={() => handleEdit("kpi-widget")}
              >
                <KPIWidget />
              </ChartWidget>
            </div>
          )}

          {/* Revenue by Category */}
          {chartStates["revenue-chart"] &&
            !chartStates["revenue-chart"].isHidden && (
              <div
                className={`col-span-6 row-span-1 relative group ${chartStates["revenue-chart"].isMinimized ? "col-span-3" : ""}`}
              >
                <ChartWidget
                  id="revenue-chart"
                  title="Revenue by Category"
                  className="h-48"
                  isSelected={selectedElement === "revenue-chart"}
                  isMinimized={chartStates["revenue-chart"].isMinimized}
                  isMaximized={chartStates["revenue-chart"].isMaximized}
                  isHidden={chartStates["revenue-chart"].isHidden}
                  onSelect={() => handleElementClick("revenue-chart")}
                  onMinimize={() => handleMinimize("revenue-chart")}
                  onMaximize={() => handleMaximize("revenue-chart")}
                  onHide={() => handleHide("revenue-chart")}
                  onRemove={() => handleRemove("revenue-chart")}
                  onDownload={() => handleDownload("revenue-chart")}
                  onDuplicate={() => handleDuplicate("revenue-chart")}
                  onEdit={() => handleEdit("revenue-chart")}
                >
                  <RevenueByCategoryChart />
                </ChartWidget>
              </div>
            )}

          {/* Sales Distribution */}
          {chartStates["sales-dist"] && !chartStates["sales-dist"].isHidden && (
            <div
              className={`col-span-6 row-span-1 relative group ${chartStates["sales-dist"].isMinimized ? "col-span-3" : ""}`}
            >
              <ChartWidget
                id="sales-dist"
                title="Sales Distribution"
                className="h-48"
                isSelected={selectedElement === "sales-dist"}
                isMinimized={chartStates["sales-dist"].isMinimized}
                isMaximized={chartStates["sales-dist"].isMaximized}
                isHidden={chartStates["sales-dist"].isHidden}
                onSelect={() => handleElementClick("sales-dist")}
                onMinimize={() => handleMinimize("sales-dist")}
                onMaximize={() => handleMaximize("sales-dist")}
                onHide={() => handleHide("sales-dist")}
                onRemove={() => handleRemove("sales-dist")}
                onDownload={() => handleDownload("sales-dist")}
                onDuplicate={() => handleDuplicate("sales-dist")}
                onEdit={() => handleEdit("sales-dist")}
              >
                <SalesDistributionChart />
              </ChartWidget>
            </div>
          )}

          {/* Additional KPI Cards */}
          {chartStates["kpi-1"] && !chartStates["kpi-1"].isHidden && (
            <div
              className={`col-span-3 row-span-1 relative group ${chartStates["kpi-1"].isMinimized ? "col-span-2" : ""}`}
            >
              <ChartWidget
                id="kpi-1"
                title="Monthly Growth"
                className="h-24"
                isSelected={selectedElement === "kpi-1"}
                isMinimized={chartStates["kpi-1"].isMinimized}
                isMaximized={chartStates["kpi-1"].isMaximized}
                isHidden={chartStates["kpi-1"].isHidden}
                onSelect={() => handleElementClick("kpi-1")}
                onMinimize={() => handleMinimize("kpi-1")}
                onMaximize={() => handleMaximize("kpi-1")}
                onHide={() => handleHide("kpi-1")}
                onRemove={() => handleRemove("kpi-1")}
                onDownload={() => handleDownload("kpi-1")}
                onDuplicate={() => handleDuplicate("kpi-1")}
                onEdit={() => handleEdit("kpi-1")}
              >
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="text-lg font-bold text-green-400">+12.5%</div>
                  <div className="text-xs text-dashboard-text-muted">
                    vs last month
                  </div>
                </div>
              </ChartWidget>
            </div>
          )}

          {chartStates["kpi-2"] && !chartStates["kpi-2"].isHidden && (
            <div
              className={`col-span-3 row-span-1 relative group ${chartStates["kpi-2"].isMinimized ? "col-span-2" : ""}`}
            >
              <ChartWidget
                id="kpi-2"
                title="Active Users"
                className="h-24"
                isSelected={selectedElement === "kpi-2"}
                isMinimized={chartStates["kpi-2"].isMinimized}
                isMaximized={chartStates["kpi-2"].isMaximized}
                isHidden={chartStates["kpi-2"].isHidden}
                onSelect={() => handleElementClick("kpi-2")}
                onMinimize={() => handleMinimize("kpi-2")}
                onMaximize={() => handleMaximize("kpi-2")}
                onHide={() => handleHide("kpi-2")}
                onRemove={() => handleRemove("kpi-2")}
                onDownload={() => handleDownload("kpi-2")}
                onDuplicate={() => handleDuplicate("kpi-2")}
                onEdit={() => handleEdit("kpi-2")}
              >
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="text-lg font-bold text-dashboard-accent">
                    24.8k
                  </div>
                  <div className="text-xs text-dashboard-text-muted">
                    this week
                  </div>
                </div>
              </ChartWidget>
            </div>
          )}

          {chartStates["kpi-3"] && !chartStates["kpi-3"].isHidden && (
            <div
              className={`col-span-3 row-span-1 relative group ${chartStates["kpi-3"].isMinimized ? "col-span-2" : ""}`}
            >
              <ChartWidget
                id="kpi-3"
                title="Conversion Rate"
                className="h-24"
                isSelected={selectedElement === "kpi-3"}
                isMinimized={chartStates["kpi-3"].isMinimized}
                isMaximized={chartStates["kpi-3"].isMaximized}
                isHidden={chartStates["kpi-3"].isHidden}
                onSelect={() => handleElementClick("kpi-3")}
                onMinimize={() => handleMinimize("kpi-3")}
                onMaximize={() => handleMaximize("kpi-3")}
                onHide={() => handleHide("kpi-3")}
                onRemove={() => handleRemove("kpi-3")}
                onDownload={() => handleDownload("kpi-3")}
                onDuplicate={() => handleDuplicate("kpi-3")}
                onEdit={() => handleEdit("kpi-3")}
              >
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="text-lg font-bold text-yellow-400">3.2%</div>
                  <div className="text-xs text-dashboard-text-muted">
                    avg rate
                  </div>
                </div>
              </ChartWidget>
            </div>
          )}

          {chartStates["kpi-4"] && !chartStates["kpi-4"].isHidden && (
            <div
              className={`col-span-3 row-span-1 relative group ${chartStates["kpi-4"].isMinimized ? "col-span-2" : ""}`}
            >
              <ChartWidget
                id="kpi-4"
                title="Customer LTV"
                className="h-24"
                isSelected={selectedElement === "kpi-4"}
                isMinimized={chartStates["kpi-4"].isMinimized}
                isMaximized={chartStates["kpi-4"].isMaximized}
                isHidden={chartStates["kpi-4"].isHidden}
                onSelect={() => handleElementClick("kpi-4")}
                onMinimize={() => handleMinimize("kpi-4")}
                onMaximize={() => handleMaximize("kpi-4")}
                onHide={() => handleHide("kpi-4")}
                onRemove={() => handleRemove("kpi-4")}
                onDownload={() => handleDownload("kpi-4")}
                onDuplicate={() => handleDuplicate("kpi-4")}
                onEdit={() => handleEdit("kpi-4")}
              >
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="text-lg font-bold text-purple-400">
                    $1,247
                  </div>
                  <div className="text-xs text-dashboard-text-muted">
                    average
                  </div>
                </div>
              </ChartWidget>
            </div>
          )}
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
          <span>•</span>
          <span>{visibleCharts.length} charts visible</span>
          {minimizedCharts.length > 0 && (
            <>
              <span>•</span>
              <span>{minimizedCharts.length} minimized</span>
            </>
          )}
          {maximizedChart && (
            <>
              <span>•</span>
              <span className="text-dashboard-accent">1 maximized</span>
            </>
          )}
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
