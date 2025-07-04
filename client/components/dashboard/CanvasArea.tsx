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
import DynamicChart from "./DynamicChart";

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
  onPropertyChange?: (chartId: string, property: string, value: any) => void;
}

export default function CanvasArea({
  selectedElement,
  onElementSelect,
  onAddToHistory,
  onUndo,
  onRedo,
  undoRef,
  redoRef,
  onPropertyChange: parentOnPropertyChange,
}: CanvasAreaProps) {
  const [showGrid, setShowGrid] = useState(true);
  const [chartProperties, setChartProperties] = useState<Record<string, any>>(
    {},
  );
  const [chartStates, setChartStates] = useState<Record<string, ChartState>>({
    "smart-chart": {
      id: "smart-chart",
      isMinimized: false,
      isMaximized: false,
      isHidden: false,
      position: { x: 50, y: 50, width: 600, height: 300 },
      chartType: "line",
    },
    "kpi-widget": {
      id: "kpi-widget",
      isMinimized: false,
      isMaximized: false,
      isHidden: false,
      position: { x: 700, y: 50, width: 300, height: 150 },
      chartType: "kpi",
    },
    "revenue-chart": {
      id: "revenue-chart",
      isMinimized: false,
      isMaximized: false,
      isHidden: false,
      position: { x: 50, y: 400, width: 450, height: 250 },
      chartType: "bar",
    },
    "sales-dist": {
      id: "sales-dist",
      isMinimized: false,
      isMaximized: false,
      isHidden: false,
      position: { x: 550, y: 400, width: 450, height: 250 },
      chartType: "pie",
    },
    "kpi-1": {
      id: "kpi-1",
      isMinimized: false,
      isMaximized: false,
      isHidden: false,
      position: { x: 50, y: 700, width: 220, height: 120 },
      chartType: "kpi",
    },
    "kpi-2": {
      id: "kpi-2",
      isMinimized: false,
      isMaximized: false,
      isHidden: false,
      position: { x: 290, y: 700, width: 220, height: 120 },
      chartType: "kpi",
    },
    "kpi-3": {
      id: "kpi-3",
      isMinimized: false,
      isMaximized: false,
      isHidden: false,
      position: { x: 530, y: 700, width: 220, height: 120 },
      chartType: "kpi",
    },
    "kpi-4": {
      id: "kpi-4",
      isMinimized: false,
      isMaximized: false,
      isHidden: false,
      position: { x: 770, y: 700, width: 220, height: 120 },
      chartType: "kpi",
    },
  });

  const { toast } = useToast();

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

  const handleUndoAction = (action: HistoryAction) => {
    switch (action.type) {
      case "REMOVE_CHART":
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
        setChartStates((prev) => ({
          ...prev,
          [action.chartId]: action.newState,
        }));
        break;
    }
  };

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
      isMaximized: false,
    });
  };

  const handleMaximize = (chartId: string) => {
    updateChartState(chartId, {
      isMaximized: !chartStates[chartId]?.isMaximized,
      isMinimized: false,
    });
  };

  const handleHide = (chartId: string) => {
    updateChartState(chartId, { isHidden: true });
  };

  const handleRemove = (chartId: string) => {
    const chartToRemove = chartStates[chartId];
    if (!chartToRemove) return;

    onAddToHistory?.({
      type: "REMOVE_CHART",
      chartId,
      previousState: chartToRemove,
    });

    setChartStates((prev) => {
      const newStates = { ...prev };
      delete newStates[chartId];
      return newStates;
    });

    if (selectedElement === chartId) {
      onElementSelect(null);
    }

    toast({
      title: "Chart Removed",
      description: `${getChartTitle(chartId)} has been removed. Use Ctrl+Z to undo.`,
      duration: 3000,
    });
  };

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

      const loadingToast = toast({
        title: "Preparing Download",
        description: "Generating chart image...",
        duration: 30000,
      });

      const canvas = await html2canvas(chartElement, {
        backgroundColor: "#1e293b",
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: chartElement.offsetWidth,
        height: chartElement.offsetHeight,
      });

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
      const newChartState = {
        ...originalState,
        id: newId,
        position: originalState.position
          ? {
              ...originalState.position,
              x: originalState.position.x + 20,
              y: originalState.position.y + 20,
            }
          : undefined,
      };

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

  const handlePropertyChange = (
    chartId: string,
    property: string,
    value: any,
  ) => {
    setChartProperties((prev) => ({
      ...prev,
      [chartId]: {
        ...prev[chartId],
        [property]: value,
      },
    }));

    // Notify parent component
    parentOnPropertyChange?.(chartId, property, value);
  };

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

    if (data.startsWith("new-chart:")) {
      const chartType = data.replace("new-chart:", "");
      const newId = `${chartType}-${Date.now()}`;

      const newChartState: ChartState = {
        id: newId,
        isMinimized: false,
        isMaximized: false,
        isHidden: false,
        position: {
          x: dropX - 150,
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

  const visibleCharts = Object.values(chartStates).filter(
    (state) => !state.isHidden,
  );
  const minimizedCharts = visibleCharts.filter((state) => state.isMinimized);
  const maximizedChart = visibleCharts.find((state) => state.isMaximized);

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
      <div
        className="relative p-6 min-h-full overflow-hidden"
        style={{ minHeight: "1000px" }}
      >
        {/* All Charts - Absolute Positioned */}
        {Object.values(chartStates)
          .filter((chart) => !chart.isHidden)
          .map((chart) => (
            <ChartWidget
              key={chart.id}
              id={chart.id}
              title={getChartTitle(chart.id)}
              className=""
              isSelected={selectedElement === chart.id}
              isMinimized={chart.isMinimized}
              isMaximized={chart.isMaximized}
              isHidden={chart.isHidden}
              position={chart.position}
              onSelect={() => handleElementClick(chart.id)}
              onMinimize={() => handleMinimize(chart.id)}
              onMaximize={() => handleMaximize(chart.id)}
              onHide={() => handleHide(chart.id)}
              onRemove={() => handleRemove(chart.id)}
              onDownload={() => handleDownload(chart.id)}
              onDuplicate={() => handleDuplicate(chart.id)}
              onEdit={() => handleEdit(chart.id)}
              onPositionChange={(position) =>
                handlePositionChange(chart.id, position)
              }
              onResize={(size) => handleResize(chart.id, size)}
            >
              {chart.id === "smart-chart" && <SmartChart />}
              {chart.id === "kpi-widget" && <KPIWidget />}
              {chart.id === "revenue-chart" && <RevenueByCategoryChart />}
              {chart.id === "sales-dist" && <SalesDistributionChart />}
              {chart.id === "kpi-1" && (
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="text-lg font-bold text-green-400">+12.5%</div>
                  <div className="text-xs text-dashboard-text-muted">
                    vs last month
                  </div>
                </div>
              )}
              {chart.id === "kpi-2" && (
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="text-lg font-bold text-dashboard-accent">
                    24.8k
                  </div>
                  <div className="text-xs text-dashboard-text-muted">
                    this week
                  </div>
                </div>
              )}
              {chart.id === "kpi-3" && (
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="text-lg font-bold text-yellow-400">3.2%</div>
                  <div className="text-xs text-dashboard-text-muted">
                    avg rate
                  </div>
                </div>
              )}
              {chart.id === "kpi-4" && (
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="text-lg font-bold text-purple-400">
                    $1,247
                  </div>
                  <div className="text-xs text-dashboard-text-muted">
                    average
                  </div>
                </div>
              )}
              {![
                "smart-chart",
                "kpi-widget",
                "revenue-chart",
                "sales-dist",
                "kpi-1",
                "kpi-2",
                "kpi-3",
                "kpi-4",
              ].includes(chart.id) && (
                <DynamicChart chartType={chart.chartType || "line"} />
              )}
            </ChartWidget>
          ))}
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
