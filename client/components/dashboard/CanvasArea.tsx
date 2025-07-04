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
  const [canvasSize, setCanvasSize] = useState({ width: 1920, height: 1080 });
  const [zoomLevel, setZoomLevel] = useState(100);
  const [gridSize, setGridSize] = useState(20);
  const [chartProperties, setChartProperties] = useState<Record<string, any>>(
    {},
  );

  // Initialize chart properties with correct chart types
  React.useEffect(() => {
    const initialProperties: Record<string, any> = {};

    Object.entries(chartStates).forEach(([chartId, chartState]) => {
      initialProperties[chartId] = {
        chartType: chartState.chartType,
        type: chartState.chartType,
        title: getChartTitle(chartId),
        color:
          chartId === "smart-chart"
            ? "#3b82f6"
            : chartId === "revenue-chart"
              ? "#10b981"
              : chartId === "sales-dist"
                ? "#f59e0b"
                : "#8b5cf6",
        primaryColor:
          chartId === "smart-chart"
            ? "#3b82f6"
            : chartId === "revenue-chart"
              ? "#10b981"
              : chartId === "sales-dist"
                ? "#f59e0b"
                : "#8b5cf6",
      };
    });

    setChartProperties(initialProperties);
    console.log("Initialized chart properties:", initialProperties);
  }, []); // Only run once on mount
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

  // Helper function to get chart data
  const getChartData = (chartId: string) => {
    // This should be replaced with actual data retrieval from chart components
    const sampleDataSets: Record<string, any[]> = {
      "smart-chart": [
        { month: "Jan", value: 20, sales: "$20k" },
        { month: "Feb", value: 35, sales: "$35k" },
        { month: "Mar", value: 25, sales: "$25k" },
        { month: "Apr", value: 40, sales: "$40k" },
        { month: "May", value: 30, sales: "$30k" },
        { month: "Jun", value: 45, sales: "$45k" },
      ],
      "revenue-chart": [
        { category: "Electronics", value: 30, revenue: "$30k" },
        { category: "Clothing", value: 45, revenue: "$45k" },
        { category: "Home", value: 55, revenue: "$55k" },
        { category: "Sports", value: 60, revenue: "$60k" },
        { category: "Books", value: 70, revenue: "$70k" },
      ],
      "sales-dist": [
        { name: "Online", value: 40, percentage: "40%", sales: "$40k" },
        { name: "In-Store", value: 30, percentage: "30%", sales: "$30k" },
        { name: "Mobile", value: 20, percentage: "20%", sales: "$20k" },
        { name: "Other", value: 10, percentage: "10%", sales: "$10k" },
      ],
      "kpi-widget": [
        { metric: "Total Revenue", value: "$142,583", trend: "+12.5%" },
      ],
    };

    return sampleDataSets[chartId] || [];
  };

  // Helper function to generate CSV
  const generateCSV = (data: any[]) => {
    if (!data || data.length === 0) return "";

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            // Escape commas and quotes in CSV
            if (
              typeof value === "string" &&
              (value.includes(",") || value.includes('"'))
            ) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          })
          .join(","),
      ),
    ].join("\n");

    return csvContent;
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
      case "MODIFY_CHART":
        if (action.previousState?.property) {
          setChartProperties((prev) => ({
            ...prev,
            [action.chartId]: {
              ...prev[action.chartId],
              [action.previousState.property]: action.previousState.value,
            },
          }));

          // Handle chart type changes
          if (action.previousState.property === "chartType") {
            setChartStates((prev) => ({
              ...prev,
              [action.chartId]: {
                ...prev[action.chartId],
                chartType: action.previousState.value,
              },
            }));
          }

          toast({
            title: "Property Restored",
            description: `${action.previousState.property} has been undone.`,
            duration: 2000,
          });
        }
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
      case "MODIFY_CHART":
        if (action.newState?.property) {
          setChartProperties((prev) => ({
            ...prev,
            [action.chartId]: {
              ...prev[action.chartId],
              [action.newState.property]: action.newState.value,
            },
          }));

          // Handle chart type changes
          if (action.newState.property === "chartType") {
            setChartStates((prev) => ({
              ...prev,
              [action.chartId]: {
                ...prev[action.chartId],
                chartType: action.newState.value,
              },
            }));
          }

          toast({
            title: "Property Restored",
            description: `${action.newState.property} has been redone.`,
            duration: 2000,
          });
        }
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
    const currentState = chartStates[chartId];
    const newMaximizedState = !currentState?.isMaximized;

    console.log(`Maximizing chart ${chartId}:`, {
      currentlyMaximized: currentState?.isMaximized,
      newState: newMaximizedState,
    });

    updateChartState(chartId, {
      isMaximized: newMaximizedState,
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

          const timestamp = new Date().toISOString().split("T")[0];

          // Download chart image
          const imageUrl = URL.createObjectURL(blob);
          const imageLink = document.createElement("a");
          imageLink.href = imageUrl;
          imageLink.download = `${chartId}-chart-${timestamp}.png`;
          document.body.appendChild(imageLink);
          imageLink.click();
          document.body.removeChild(imageLink);
          URL.revokeObjectURL(imageUrl);

          // Also download chart data as CSV
          const chartData = getChartData(chartId);
          if (chartData && chartData.length > 0) {
            const csvContent = generateCSV(chartData);
            const csvBlob = new Blob([csvContent], { type: "text/csv" });
            const csvUrl = URL.createObjectURL(csvBlob);
            const csvLink = document.createElement("a");
            csvLink.href = csvUrl;
            csvLink.download = `${chartId}-data-${timestamp}.csv`;
            document.body.appendChild(csvLink);
            csvLink.click();
            document.body.removeChild(csvLink);
            URL.revokeObjectURL(csvUrl);
          }

          loadingToast.dismiss();
          toast({
            title: "Download Complete",
            description: `${getChartTitle(chartId)} image and data have been downloaded.`,
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

      // Immediate resize event for fast response
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event("resize"));
      });
    }
  };

  const handlePropertyChange = (
    chartId: string,
    property: string,
    value: any,
  ) => {
    console.log("CanvasArea: Property change", { chartId, property, value }); // Debug log

    // Store previous value for undo functionality
    const previousValue = chartProperties[chartId]?.[property];

    // Add to history for significant property changes (not for every minor change)
    const significantProperties = [
      "chartType",
      "color",
      "primaryColor",
      "title",
      "showLegend",
      "showGrid",
    ];
    if (significantProperties.includes(property) && previousValue !== value) {
      onAddToHistory?.({
        type: "MODIFY_CHART",
        chartId,
        previousState: { property, value: previousValue },
        newState: { property, value },
      });
    }

    // Handle chart type changes - update chartStates directly
    if (property === "chartType" || property === "type") {
      const actualChartType = value;
      setChartStates((prev) => ({
        ...prev,
        [chartId]: {
          ...prev[chartId],
          chartType: actualChartType,
        },
      }));

      console.log(`Updated chartType for ${chartId} to ${actualChartType}`);
    }

    // Map normalized properties to legacy format for backwards compatibility
    const legacyPropertyMap: Record<string, string> = {
      primaryColor: "color",
      backgroundColor: "background",
      "xAxis.label": "xAxisLabel",
      "yAxis.label": "yAxisLabel",
      "xAxis.enabled": "showXAxis",
      "yAxis.enabled": "showYAxis",
      "xAxis.showGridLines": "showGrid",
      "yAxis.showGridLines": "showGrid",
      "yAxis.startFromZero": "startFromZero",
    };

    // Update both the original property and any legacy mapping
    const propertiesToUpdate: Array<{ key: string; value: any }> = [
      { key: property, value },
    ];

    // Add legacy property if mapping exists
    if (legacyPropertyMap[property]) {
      propertiesToUpdate.push({
        key: legacyPropertyMap[property],
        value,
      });
    }

    // Immediate state update for smooth real-time updates
    setChartProperties((prev) => {
      const newProps = { ...prev };

      propertiesToUpdate.forEach(({ key, value }) => {
        if (!newProps[chartId]) {
          newProps[chartId] = {};
        }
        newProps[chartId][key] = value;
      });

      console.log("CanvasArea: Updated chart properties", newProps); // Debug log
      return newProps;
    });

    // Notify parent component immediately
    if (parentOnPropertyChange) {
      parentOnPropertyChange(chartId, property, value);
    }
  };

  // Expose utility functions to parent
  React.useEffect(() => {
    // Expose grid and zoom controls to parent
    (window as any).setCanvasGrid = (show: boolean) => setShowGrid(show);
    (window as any).setCanvasZoom = (level: number) => setZoomLevel(level);

    // Expose property change handler for direct updates (avoid circular calls)
    (window as any).updateCanvasProperty = handlePropertyChange;

    // Clean up function
    return () => {
      delete (window as any).setCanvasGrid;
      delete (window as any).setCanvasZoom;
      delete (window as any).updateCanvasProperty;
    };
  }, [handlePropertyChange]);

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");

    // Get better coordinates for drop location
    const dropX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const dropY = e.clientY - e.currentTarget.getBoundingClientRect().top;

    console.log("Drop event:", { data, dropX, dropY }); // Debug log

    if (data.startsWith("new-chart:")) {
      const chartType = data.replace("new-chart:", "");
      const newId = `${chartType}-${Date.now()}`;

      // Determine chart size based on type
      let chartWidth = 400;
      let chartHeight = 250;

      if (chartType === "kpi") {
        chartWidth = 200;
        chartHeight = 120;
      } else if (chartType === "pie") {
        chartWidth = 300;
        chartHeight = 300;
      }

      const newChartState: ChartState = {
        id: newId,
        isMinimized: false,
        isMaximized: false,
        isHidden: false,
        position: {
          x: Math.max(0, dropX - 100), // Center the chart on drop point
          y: Math.max(0, dropY - 50),
          width: chartWidth,
          height: chartHeight,
        },
        chartType: chartType,
      };

      console.log("Creating new chart:", newChartState); // Debug log

      setChartStates((prev) => {
        const newStates = {
          ...prev,
          [newId]: newChartState,
        };
        console.log(
          "Chart states updated. New chart count:",
          Object.keys(newStates).length,
        ); // Debug log
        return newStates;
      });

      onAddToHistory?.({
        type: "ADD_CHART",
        chartId: newId,
        newState: newChartState,
      });

      toast({
        title: "Chart Created Successfully!",
        description: `New ${chartType} chart added to canvas at position (${Math.round(dropX)}, ${Math.round(dropY)})`,
        duration: 3000,
      });

      // Auto-select the new chart
      onElementSelect(newId);
    } else {
      // Handle existing chart movement
      const chartId = data;
      if (chartStates[chartId]) {
        const updatedPosition = {
          x: Math.max(0, dropX - 150),
          y: Math.max(0, dropY - 100),
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
      className={`flex-1 bg-dashboard-muted/30 relative overflow-auto transition-colors ${
        isDragOver
          ? "bg-dashboard-accent/10 border-2 border-dashed border-dashboard-accent"
          : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e) => {
        handleDrop(e);
        setIsDragOver(false);
      }}
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
            backgroundSize: `${gridSize}px ${gridSize}px`,
          }}
        />
      )}

      {/* Canvas Content */}
      <div
        className="relative p-6 min-h-full overflow-hidden"
        style={{
          minHeight: `${canvasSize.height}px`,
          width: `${canvasSize.width}px`,
          transform: `scale(${zoomLevel / 100})`,
          transformOrigin: "top left",
        }}
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
              {/* Use DynamicChart for all charts to enable type switching */}
              <DynamicChart
                chartType={
                  chartProperties[chart.id]?.chartType ||
                  chartProperties[chart.id]?.type ||
                  chart.chartType ||
                  "line"
                }
                properties={chartProperties[chart.id]}
              />
            </ChartWidget>
          ))}
      </div>

      {/* Canvas Info */}
      <div className="absolute bottom-4 left-4 bg-dashboard-surface border border-dashboard-border rounded-lg p-2 text-xs text-dashboard-text-muted">
        <div className="flex items-center gap-4">
          <span>
            Canvas: {canvasSize.width}×{canvasSize.height}
          </span>
          <span>•</span>
          <span>Grid: {gridSize}px</span>
          <span>•</span>
          <span>Zoom: {zoomLevel}%</span>
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
              <span>���</span>
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
