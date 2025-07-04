import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  FileText,
  Image,
  FileSpreadsheet,
  Package,
  CheckCircle,
} from "lucide-react";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedElement?: string | null;
}

interface ExportOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  formats: string[];
}

const exportOptions: ExportOption[] = [
  {
    id: "dashboard",
    name: "Full Dashboard",
    description: "Export complete dashboard configuration and data",
    icon: <Package className="w-4 h-4" />,
    formats: ["json", "zip"],
  },
  {
    id: "charts",
    name: "All Charts",
    description: "Export all charts as images with associated data",
    icon: <Image className="w-4 h-4" />,
    formats: ["png", "svg", "pdf"],
  },
  {
    id: "data",
    name: "Chart Data",
    description: "Export underlying data from all charts",
    icon: <FileSpreadsheet className="w-4 h-4" />,
    formats: ["csv", "excel", "json"],
  },
  {
    id: "current",
    name: "Selected Element",
    description: "Export only the currently selected chart or table",
    icon: <FileText className="w-4 h-4" />,
    formats: ["png", "csv", "json"],
  },
];

export default function ExportDialog({
  isOpen,
  onClose,
  selectedElement,
}: ExportDialogProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    "dashboard",
  ]);
  const [format, setFormat] = useState("json");
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleOptionChange = (optionId: string, checked: boolean) => {
    if (checked) {
      setSelectedOptions((prev) => [...prev, optionId]);
    } else {
      setSelectedOptions((prev) => prev.filter((id) => id !== optionId));
    }
  };

  const getAvailableFormats = () => {
    const allFormats = selectedOptions.flatMap(
      (optionId) =>
        exportOptions.find((opt) => opt.id === optionId)?.formats || [],
    );
    return [...new Set(allFormats)];
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportDashboard = async () => {
    const dashboardState = {
      charts: (window as any).getCanvasState
        ? (window as any).getCanvasState()
        : {},
      properties: (window as any).getCanvasProperties
        ? (window as any).getCanvasProperties()
        : {},
      metadata: {
        version: "1.0",
        exportedBy: "Dashboard Designer",
        exportDate: new Date().toISOString(),
        selectedElement,
      },
    };

    const dataStr = JSON.stringify(dashboardState, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    downloadFile(
      blob,
      `dashboard-${new Date().toISOString().split("T")[0]}.json`,
    );
  };

  const exportChartAsImage = async (chartId: string) => {
    const chartElement = document.getElementById(`chart-${chartId}`);
    if (!chartElement) return null;

    try {
      const canvas = await html2canvas(chartElement, {
        useCORS: true,
        allowTaint: true,
      });

      return new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, "image/png");
      });
    } catch (error) {
      console.error("Failed to capture chart:", error);
      return null;
    }
  };

  const exportTableAsCSV = (tableData: any[]) => {
    if (!tableData || tableData.length === 0) return;

    const headers = Object.keys(tableData[0]);
    const csvContent = [
      headers.join(","),
      ...tableData.map((row) =>
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

    const blob = new Blob([csvContent], { type: "text/csv" });
    return blob;
  };

  const getChartData = (chartId: string) => {
    // This would be replaced with actual data retrieval from chart components
    const sampleData = [
      { name: "Jan", value: 20, sales: "$20k" },
      { name: "Feb", value: 35, sales: "$35k" },
      { name: "Mar", value: 25, sales: "$25k" },
      { name: "Apr", value: 40, sales: "$40k" },
      { name: "May", value: 30, sales: "$30k" },
      { name: "Jun", value: 45, sales: "$45k" },
    ];
    return sampleData;
  };

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const timestamp = new Date().toISOString().split("T")[0];

      for (const optionId of selectedOptions) {
        switch (optionId) {
          case "dashboard":
            await exportDashboard();
            break;

          case "charts":
            // Get all chart IDs
            const chartStates = (window as any).getCanvasState
              ? (window as any).getCanvasState()
              : {};
            const chartIds = Object.keys(chartStates);

            for (const chartId of chartIds) {
              if (format === "png") {
                const imageBlob = await exportChartAsImage(chartId);
                if (imageBlob) {
                  downloadFile(imageBlob, `chart-${chartId}-${timestamp}.png`);
                }
              }

              // Also export data for each chart
              if (format === "csv" || selectedOptions.includes("data")) {
                const chartData = getChartData(chartId);
                const csvBlob = exportTableAsCSV(chartData);
                if (csvBlob) {
                  downloadFile(
                    csvBlob,
                    `chart-${chartId}-data-${timestamp}.csv`,
                  );
                }
              }
            }
            break;

          case "data":
            const allChartStates = (window as any).getCanvasState
              ? (window as any).getCanvasState()
              : {};
            const allChartIds = Object.keys(allChartStates);

            for (const chartId of allChartIds) {
              const chartData = getChartData(chartId);
              if (format === "csv") {
                const csvBlob = exportTableAsCSV(chartData);
                if (csvBlob) {
                  downloadFile(csvBlob, `${chartId}-data-${timestamp}.csv`);
                }
              } else if (format === "json") {
                const dataStr = JSON.stringify(chartData, null, 2);
                const blob = new Blob([dataStr], { type: "application/json" });
                downloadFile(blob, `${chartId}-data-${timestamp}.json`);
              }
            }
            break;

          case "current":
            if (selectedElement) {
              // Check if it's a table
              if (selectedElement.includes("table")) {
                const tableData = getChartData(selectedElement);
                if (format === "csv") {
                  const csvBlob = exportTableAsCSV(tableData);
                  if (csvBlob) {
                    downloadFile(
                      csvBlob,
                      `${selectedElement}-${timestamp}.csv`,
                    );
                  }
                }
              } else {
                // Export as chart image
                if (format === "png") {
                  const imageBlob = await exportChartAsImage(selectedElement);
                  if (imageBlob) {
                    downloadFile(
                      imageBlob,
                      `${selectedElement}-${timestamp}.png`,
                    );
                  }
                }

                // Also export chart data
                const chartData = getChartData(selectedElement);
                const csvBlob = exportTableAsCSV(chartData);
                if (csvBlob) {
                  downloadFile(
                    csvBlob,
                    `${selectedElement}-data-${timestamp}.csv`,
                  );
                }
              }
            }
            break;
        }
      }

      toast({
        title: "Export Successful",
        description: `Exported ${selectedOptions.length} item(s) successfully.`,
      });

      onClose();
    } catch (error) {
      console.error("Export failed:", error);
      toast({
        title: "Export Failed",
        description: "Failed to export. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dashboard-surface border-dashboard-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-dashboard-text flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Dashboard
          </DialogTitle>
          <DialogDescription className="text-dashboard-text-muted">
            Choose what to export and in which format
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Export Options */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-dashboard-text">
              What to Export
            </Label>
            {exportOptions.map((option) => (
              <div
                key={option.id}
                className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors ${
                  selectedOptions.includes(option.id)
                    ? "border-dashboard-accent bg-dashboard-accent/10"
                    : "border-dashboard-border hover:border-dashboard-accent/50"
                }`}
              >
                <Checkbox
                  id={option.id}
                  checked={selectedOptions.includes(option.id)}
                  onCheckedChange={(checked) =>
                    handleOptionChange(option.id, !!checked)
                  }
                  disabled={option.id === "current" && !selectedElement}
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    {option.icon}
                    <Label
                      htmlFor={option.id}
                      className="text-sm font-medium text-dashboard-text cursor-pointer"
                    >
                      {option.name}
                    </Label>
                  </div>
                  <p className="text-xs text-dashboard-text-muted">
                    {option.description}
                  </p>
                  {option.id === "current" && !selectedElement && (
                    <p className="text-xs text-yellow-400">
                      Select a chart or table first
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Format Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-dashboard-text">
              Export Format
            </Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger className="bg-dashboard-surface border-dashboard-border text-dashboard-text">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getAvailableFormats().map((fmt) => (
                  <SelectItem key={fmt} value={fmt}>
                    {fmt.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleExport}
              disabled={selectedOptions.length === 0 || isExporting}
              className="flex-1"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </>
              )}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
