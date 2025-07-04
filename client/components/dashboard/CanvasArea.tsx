import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import html2canvas from "html2canvas";
import ChartWidget from "./ChartWidget";
import SmartChart from "./SmartChart";
import RevenueByCategoryChart from "./RevenueByCategoryChart";
import KPIWidget from "./KPIWidget";
import SalesDistributionChart from "./SalesDistributionChart";

interface ChartPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ChartState {
  id: string;
  isMinimized: boolean;
  isMaximized: boolean;
  isHidden: boolean;
  position?: ChartPosition;
  chartType?: string;
}

interface HistoryAction {
  type: "REMOVE_CHART" | "ADD_CHART" | "MODIFY_CHART";
  chartId: string;
  previousState?: any;
  newState?: any;
  timestamp: number;
}

interface CanvasAreaProps {
  selectedElement: string | null;
  onElementSelect: (elementId: string | null) => void;
  onAddToHistory?: (action: Omit<HistoryAction, "timestamp">) => void;
  onUndo?: () => HistoryAction | null;
  onRedo?: () => HistoryAction | null;
  undoRef?: React.MutableRefObject<
    ((action: HistoryAction) => void) | undefined
  >;
  redoRef?: React.MutableRefObject<
    ((action: HistoryAction) => void) | undefined
  >;
}

export default function CanvasArea({
  selectedElement,
  onElementSelect,
  onAddToHistory,
  onUndo,
  onRedo,
  undoRef,
  redoRef,
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

  const { toast } = useToast();

  const handleUndoAction = (action: HistoryAction) => {
    switch (action.type) {
      case "REMOVE_CHART":
        // Restore the removed chart
        setChartStates((prev) => ({
          ...prev,
          [action.chartId]: action.previousState,
        }));
        toast({
          title: "Chart Restored",
          description: `${getChartTitle(action.chartId)} has been restored.`,
          duration: 3000,
        });
        break;
      case "ADD_CHART":
        // Remove the added chart
        setChartStates((prev) => {
          const newStates = { ...prev };
          delete newStates[action.chartId];
          return newStates;
        });
        toast({
          title: "Chart Removed",
          description: `Duplicate chart has been removed.`,
          duration: 3000,
        });
        break;
    }
  };

  const handleRedoAction = (action: HistoryAction) => {
    switch (action.type) {
      case "REMOVE_CHART":
        // Remove the chart again
        setChartStates((prev) => {
          const newStates = { ...prev };
          delete newStates[action.chartId];
          return newStates;
        });
        toast({
          title: "Chart Removed",
          description: `${getChartTitle(action.chartId)} has been removed again.`,
          duration: 3000,
        });
        break;
      case "ADD_CHART":
        // Add the chart again
        setChartStates((prev) => ({
          ...prev,
          [action.chartId]: action.newState,
        }));
        break;
    }
  };

  const getChartTitle = (chartId: string): string => {
    const titles: Record<string, string> = {
      "smart-chart": "Smart Analytics Chart",
      "kpi-widget": "Total Revenue",
      "revenue-chart": "Revenue by Category",
      "sales-dist": "Sales Distribution",
      "kpi-1": "Monthly Growth",
      "kpi-2": "Active Users",
      "kpi-3": "Conversion Rate",
      "kpi-4": "Customer LTV",
    };
    return titles[chartId] || chartId;
  };

  // Set up refs for direct undo/redo communication
  React.useEffect(() => {
    if (undoRef) {
      undoRef.current = handleUndoAction;
    }
    if (redoRef) {
      redoRef.current = handleRedoAction;
    }
  }, []);

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
    const chartToRemove = chartStates[chartId];
    if (!chartToRemove) return;

    // Add to history before removing
    onAddToHistory?.({
      type: "REMOVE_CHART",
      chartId,
      previousState: chartToRemove,
    });

    // Remove from active charts
    setChartStates((prev) => {
      const newStates = { ...prev };
      delete newStates[chartId];
      return newStates;
    });

    // Clear selection if this chart was selected
    if (selectedElement === chartId) {
      onElementSelect(null);
    }

    // Show simple removal notification
    toast({
      title: "Chart Removed",
      description: `${getChartTitle(chartId)} has been removed. Use Ctrl+Z to undo.`,
      duration: 3000,
    });
  };

  // Handle global undo/redo actions
  React.useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        const action = onUndo?.();
        if (action) {
          handleUndoAction(action);
        }
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "y" || (e.key === "z" && e.shiftKey))
      ) {
        e.preventDefault();
        const action = onRedo?.();
        if (action) {
          handleRedoAction(action);
        }
      }
    };

    document.addEventListener("keydown", handleKeyboard);
    return () => document.removeEventListener("keydown", handleKeyboard);
  }, [onUndo, onRedo]);

  const handleDownload = async (chartId: string) => {
    try {
      const chartElement = document.getElementById(`chart-${chartId}`);
      if (!chartElement) {
        toast({
          title: "Download Failed",
          description: "Chart element not found. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      // Show loading toast
      const loadingToast = toast({
        title: "Preparing Download",
        description: "Generating chart image...",
        duration: 30000,
      });

      // Capture the chart as canvas
      const canvas = await html2canvas(chartElement, {
        backgroundColor: "#1e293b", // dashboard-surface color
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: chartElement.offsetWidth,
        height: chartElement.offsetHeight,
      });

      // Convert to blob and download
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            toast({
              title: "Download Failed",
              description: "Failed to generate chart image.",
              variant: "destructive",
              duration: 5000,
            });
            return;
          }

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${chartId}-${new Date().toISOString().split("T")[0]}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          // Dismiss loading toast and show success
          loadingToast.dismiss();
          toast({
            title: "Download Complete",
            description: `${getChartTitle(chartId)} has been downloaded as PNG.`,
            duration: 5000,
          });
        },
        "image/png",
        0.95,
      );
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description: "An error occurred while downloading the chart.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleDuplicate = (chartId: string) => {
    const newId = `${chartId}-copy-${Date.now()}`;
    const originalState = chartStates[chartId];
    if (originalState) {
      const newChartState = { ...originalState, id: newId };

      // Add to history
      onAddToHistory?.({
        type: "ADD_CHART",
        chartId: newId,
        newState: newChartState,
      });

      setChartStates((prev) => ({
        ...prev,
        [newId]: newChartState,
      }));

      toast({
        title: "Chart Duplicated",
        description: `${getChartTitle(chartId)} has been duplicated.`,
        duration: 3000,
      });
    }
  };

  const handleEdit = (chartId: string) => {
    onElementSelect(chartId);
  };

  const handlePositionChange = (
    chartId: string,
    newPosition: ChartPosition,
  ) => {
    updateChartState(chartId, { position: newPosition });
  };

  const handleResize = (
    chartId: string,
    newSize: { width: number; height: number },
  ) => {
    const currentPosition = chartStates[chartId]?.position;
    if (currentPosition) {
      updateChartState(chartId, {
        position: {
          ...currentPosition,
          width: newSize.width,
          height: newSize.height,
        },
      });
    }
  };

  // Count visible charts
  const visibleCharts = Object.values(chartStates).filter(
    (state) => !state.isHidden,
  );
  const minimizedCharts = visibleCharts.filter((state) => state.isMinimized);
  const maximizedChart = visibleCharts.find((state) => state.isMaximized);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const rect = e.currentTarget.getBoundingClientRect();
    const dropX = e.clientX - rect.left;
    const dropY = e.clientY - rect.top;

    // Check if it's a new chart type or existing chart
    if (data.startsWith("new-chart:")) {
      const chartType = data.replace("new-chart:", "");
      const newId = `${chartType}-${Date.now()}`;

      const newChartState: ChartState = {
        id: newId,
        isMinimized: false,
        isMaximized: false,
        isHidden: false,
        position: {
          x: dropX - 150, // Center the chart on drop point
          y: dropY - 100,
          width: 300,
          height: 200,
        },
        chartType: chartType,
      };

      setChartStates((prev) => ({
        ...prev,
        [newId]: newChartState,
      }));

      onAddToHistory?.({
        type: "ADD_CHART",
        chartId: newId,
        newState: newChartState,
      });

      toast({
        title: "Chart Created",
        description: `New ${chartType} chart added to canvas`,
        duration: 2000,
      });
    } else {
      // Existing chart being moved
      const chartId = data;
      if (chartStates[chartId]) {
        const updatedPosition = {
          x: dropX - 150,
          y: dropY - 100,
          width: chartStates[chartId].position?.width || 300,
          height: chartStates[chartId].position?.height || 200,
        };

        updateChartState(chartId, { position: updatedPosition });

        toast({
          title: "Chart Moved",
          description: `${getChartTitle(chartId)} position updated`,
          duration: 2000,
        });
      }
    }
  };

  return (
    <div
      className="flex-1 bg-dashboard-muted/30 relative overflow-auto"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
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
      <div className="relative p-6 min-h-full">
        <div className="grid grid-cols-12 gap-4 auto-rows-auto">
          {/* Smart Chart - Featured */}
          {chartStates["smart-chart"] &&
            !chartStates["smart-chart"].isHidden && (
              <div
                className={`${
                  chartStates["smart-chart"].isMaximized
                    ? "col-span-12"
                    : chartStates["smart-chart"].isMinimized
                      ? "col-span-6 lg:col-span-4"
                      : "col-span-12 lg:col-span-8"
                } relative group transition-all duration-300`}
              >
                <ChartWidget
                  id="smart-chart"
                  title="Smart Analytics Chart"
                  className={
                    chartStates["smart-chart"].isMaximized
                      ? "h-96"
                      : chartStates["smart-chart"].isMinimized
                        ? "h-48"
                        : "h-72"
                  }
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
          {chartStates["kpi-widget"] &&
            !chartStates["kpi-widget"].isHidden &&
            !chartStates["smart-chart"]?.isMaximized && (
              <div
                className={`${
                  chartStates["kpi-widget"].isMinimized
                    ? "col-span-6 lg:col-span-3"
                    : "col-span-12 lg:col-span-4"
                } relative group transition-all duration-300`}
              >
                <ChartWidget
                  id="kpi-widget"
                  title="Total Revenue"
                  className={
                    chartStates["kpi-widget"].isMinimized ? "h-32" : "h-40"
                  }
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
            !chartStates["revenue-chart"].isHidden &&
            !maximizedChart && (
              <div
                className={`col-span-12 lg:col-span-6 relative group transition-all duration-300`}
              >
                <ChartWidget
                  id="revenue-chart"
                  title="Revenue by Category"
                  className={
                    chartStates["revenue-chart"].isMinimized ? "h-40" : "h-56"
                  }
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
          {chartStates["sales-dist"] &&
            !chartStates["sales-dist"].isHidden &&
            !maximizedChart && (
              <div
                className={`col-span-12 lg:col-span-6 relative group transition-all duration-300`}
              >
                <ChartWidget
                  id="sales-dist"
                  title="Sales Distribution"
                  className={
                    chartStates["sales-dist"].isMinimized ? "h-40" : "h-56"
                  }
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
          {chartStates["kpi-1"] &&
            !chartStates["kpi-1"].isHidden &&
            !maximizedChart && (
              <div
                className={`col-span-6 md:col-span-3 relative group transition-all duration-300`}
              >
                <ChartWidget
                  id="kpi-1"
                  title="Monthly Growth"
                  className={chartStates["kpi-1"].isMinimized ? "h-20" : "h-28"}
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
                    <div className="text-lg font-bold text-green-400">
                      +12.5%
                    </div>
                    <div className="text-xs text-dashboard-text-muted">
                      vs last month
                    </div>
                  </div>
                </ChartWidget>
              </div>
            )}

          {chartStates["kpi-2"] &&
            !chartStates["kpi-2"].isHidden &&
            !maximizedChart && (
              <div
                className={`col-span-6 md:col-span-3 relative group transition-all duration-300`}
              >
                <ChartWidget
                  id="kpi-2"
                  title="Active Users"
                  className={chartStates["kpi-2"].isMinimized ? "h-20" : "h-28"}
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

          {chartStates["kpi-3"] &&
            !chartStates["kpi-3"].isHidden &&
            !maximizedChart && (
              <div
                className={`col-span-6 md:col-span-3 relative group transition-all duration-300`}
              >
                <ChartWidget
                  id="kpi-3"
                  title="Conversion Rate"
                  className={chartStates["kpi-3"].isMinimized ? "h-20" : "h-28"}
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
                    <div className="text-lg font-bold text-yellow-400">
                      3.2%
                    </div>
                    <div className="text-xs text-dashboard-text-muted">
                      avg rate
                    </div>
                  </div>
                </ChartWidget>
              </div>
            )}

          {chartStates["kpi-4"] &&
            !chartStates["kpi-4"].isHidden &&
            !maximizedChart && (
              <div
                className={`col-span-6 md:col-span-3 relative group transition-all duration-300`}
              >
                <ChartWidget
                  id="kpi-4"
                  title="Customer LTV"
                  className={chartStates["kpi-4"].isMinimized ? "h-20" : "h-28"}
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
