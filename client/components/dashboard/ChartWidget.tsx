import React, { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Download,
  Trash2,
  Maximize2,
  Minimize2,
  Copy,
  Settings,
  Expand,
  Shrink,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChartWidgetProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  isSelected?: boolean;
  isMinimized?: boolean;
  isMaximized?: boolean;
  isHidden?: boolean;
  onSelect?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onHide?: () => void;
  onRemove?: () => void;
  onDownload?: () => void;
  onDuplicate?: () => void;
  onEdit?: () => void;
}

export default function ChartWidget({
  id,
  title,
  children,
  className = "",
  isSelected = false,
  isMinimized = false,
  isMaximized = false,
  isHidden = false,
  onSelect,
  onMinimize,
  onMaximize,
  onHide,
  onRemove,
  onDownload,
  onDuplicate,
  onEdit,
}: ChartWidgetProps) {
  const [showToolbar, setShowToolbar] = useState(false);

  if (isHidden) {
    return null;
  }

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent chart selection
    if (onDownload) {
      await onDownload();
    }
  };

  const containerClasses = `
    group relative bg-dashboard-surface border border-dashboard-border rounded-lg
    transition-all duration-200
    ${isSelected ? "ring-2 ring-dashboard-accent ring-offset-2 ring-offset-dashboard-background" : ""}
    ${isMaximized ? "fixed inset-4 z-50 shadow-2xl" : ""}
    ${isMinimized ? "h-12 overflow-hidden" : ""}
    ${className}
  `;

  return (
    <div className={containerClasses}>
      {/* Toolbar - appears on hover or when selected */}
      <div
        className={`
        absolute -top-2 -right-2 z-10 flex gap-1
        transition-opacity duration-200
        ${showToolbar || isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
      `}
      >
        {/* Quick Actions */}
        <Button
          variant="secondary"
          size="sm"
          onClick={onMinimize}
          className="h-6 w-6 p-0 bg-dashboard-surface border border-dashboard-border hover:bg-dashboard-muted"
          title={isMinimized ? "Expand" : "Minimize"}
        >
          {isMinimized ? (
            <Expand className="w-3 h-3" />
          ) : (
            <Minimize2 className="w-3 h-3" />
          )}
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={onMaximize}
          className="h-6 w-6 p-0 bg-dashboard-surface border border-dashboard-border hover:bg-dashboard-muted"
          title={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? (
            <Shrink className="w-3 h-3" />
          ) : (
            <Maximize2 className="w-3 h-3" />
          )}
        </Button>

        {/* More Actions Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="h-6 w-6 p-0 bg-dashboard-surface border border-dashboard-border hover:bg-dashboard-muted"
            >
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-dashboard-surface border-dashboard-border"
          >
            <DropdownMenuItem
              onClick={handleDownload}
              className="text-dashboard-text hover:bg-dashboard-muted"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Chart
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onDuplicate}
              className="text-dashboard-text hover:bg-dashboard-muted"
            >
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onEdit}
              className="text-dashboard-text hover:bg-dashboard-muted"
            >
              <Settings className="w-4 h-4 mr-2" />
              Edit Properties
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-dashboard-border" />
            <DropdownMenuItem
              onClick={onHide}
              className="text-dashboard-text hover:bg-dashboard-muted"
            >
              <EyeOff className="w-4 h-4 mr-2" />
              Hide Chart
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onRemove}
              className="text-red-500 hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove Chart
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Chart Header */}
      <div
        className={`flex items-center justify-between p-4 cursor-pointer ${isMinimized ? "pb-0" : "pb-2"}`}
        onClick={onSelect}
        onMouseEnter={() => setShowToolbar(true)}
        onMouseLeave={() => setShowToolbar(false)}
      >
        <h3 className="text-dashboard-text font-medium truncate">{title}</h3>
        {isMinimized && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize?.();
            }}
            className="h-6 w-6 p-0 text-dashboard-text-muted hover:text-dashboard-text"
          >
            <Eye className="w-3 h-3" />
          </Button>
        )}
      </div>

      {/* Chart Content */}
      {!isMinimized && (
        <div
          id={`chart-${id}`}
          className={`px-4 pb-4 ${isMaximized ? "h-full" : ""}`}
        >
          <div className={isMaximized ? "h-full" : ""}>{children}</div>
        </div>
      )}

      {/* Maximize Overlay Background */}
      {isMaximized && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onMaximize}
        />
      )}
    </div>
  );
}
