import React, { ReactNode, useState, useRef } from "react";
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
  GripVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChartPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ChartWidgetProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  isSelected?: boolean;
  isMinimized?: boolean;
  isMaximized?: boolean;
  isHidden?: boolean;
  position?: ChartPosition;
  onSelect?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onHide?: () => void;
  onRemove?: () => void;
  onDownload?: () => void;
  onDuplicate?: () => void;
  onEdit?: () => void;
  onPositionChange?: (position: ChartPosition) => void;
  onResize?: (size: { width: number; height: number }) => void;
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
  position,
  onSelect,
  onMinimize,
  onMaximize,
  onHide,
  onRemove,
  onDownload,
  onDuplicate,
  onEdit,
  onPositionChange,
  onResize,
}: ChartWidgetProps) {
  const [showToolbar, setShowToolbar] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const widgetRef = React.useRef<HTMLDivElement>(null);

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
    ${isMaximized ? "fixed inset-8 z-[100] shadow-2xl" : ""}
    ${isMinimized ? "h-12 overflow-hidden" : ""}
    ${isDragging ? "z-50 shadow-2xl" : ""}
    ${className}
  `;

  const containerStyle =
    position && !isMaximized
      ? {
          position: "absolute" as const,
          left: position.x,
          top: position.y,
          width: position.width,
          height: position.height,
        }
      : {};

  return (
    <div ref={widgetRef} className={containerClasses} style={containerStyle}>
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
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate?.();
              }}
              className="text-dashboard-text hover:bg-dashboard-muted"
            >
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              className="text-dashboard-text hover:bg-dashboard-muted"
            >
              <Settings className="w-4 h-4 mr-2" />
              Edit Properties
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-dashboard-border" />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onHide?.();
              }}
              className="text-dashboard-text hover:bg-dashboard-muted"
            >
              <EyeOff className="w-4 h-4 mr-2" />
              Hide Chart
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onRemove?.();
              }}
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
        className={`flex items-center justify-between p-4 ${isSelected ? "cursor-move" : "cursor-pointer"} ${isMinimized ? "pb-0" : "pb-2"}`}
        onClick={onSelect}
        onMouseEnter={() => setShowToolbar(true)}
        onMouseLeave={() => setShowToolbar(false)}
        onMouseDown={(e) => {
          if (!isSelected || !position) return;

          setIsDragging(true);

          // Get the canvas container for proper coordinate calculation
          const canvasContainer = document.querySelector(
            ".relative.p-6.min-h-full",
          ) as HTMLElement;
          if (!canvasContainer) return;

          const canvasRect = canvasContainer.getBoundingClientRect();
          const rect = widgetRef.current?.getBoundingClientRect();

          if (!rect) return;

          // Calculate offset from mouse position to element's current position
          const offsetX = e.clientX - rect.left;
          const offsetY = e.clientY - rect.top;

          const handleMouseMove = (moveEvent: MouseEvent) => {
            if (!onPositionChange) return;

            // Calculate new position relative to canvas, accounting for padding
            const newX = moveEvent.clientX - canvasRect.left - 24 - offsetX; // 24px is p-6 padding
            const newY = moveEvent.clientY - canvasRect.top - 24 - offsetY;

            onPositionChange({
              ...position,
              x: Math.max(0, newX),
              y: Math.max(0, newY),
            });
          };

          const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
          };

          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        }}
        title={isSelected ? "Drag to move" : "Click to select"}
      >
        <div className="flex items-center gap-2 flex-1">
          <GripVertical className="w-4 h-4 text-dashboard-text-muted opacity-50 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-dashboard-text font-medium truncate">{title}</h3>
        </div>
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
          className={`px-4 pb-4 ${isMaximized ? "h-full overflow-auto" : ""}`}
        >
          <div className={isMaximized ? "h-full w-full" : ""}>{children}</div>
        </div>
      )}

      {/* Resize Handles - Only show when selected and not maximized */}
      {isSelected && !isMaximized && !isMinimized && position && (
        <>
          {/* Bottom-Right Corner */}
          <div
            className="absolute -bottom-1 -right-1 w-3 h-3 bg-dashboard-accent rounded-sm cursor-se-resize opacity-80 hover:opacity-100"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsResizing(true);

              const startX = e.clientX;
              const startY = e.clientY;
              const startWidth = position.width;
              const startHeight = position.height;

              const handleMouseMove = (moveEvent: MouseEvent) => {
                if (!onPositionChange) return;

                const newWidth = Math.max(
                  200,
                  startWidth + (moveEvent.clientX - startX),
                );
                const newHeight = Math.max(
                  150,
                  startHeight + (moveEvent.clientY - startY),
                );

                onPositionChange({
                  ...position,
                  width: newWidth,
                  height: newHeight,
                });
              };

              const handleMouseUp = () => {
                setIsResizing(false);
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
              };

              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
            }}
          />

          {/* Right Edge */}
          <div
            className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-6 bg-dashboard-accent rounded-sm cursor-e-resize opacity-80 hover:opacity-100"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsResizing(true);

              const startX = e.clientX;
              const startWidth = position.width;

              const handleMouseMove = (moveEvent: MouseEvent) => {
                if (!onPositionChange) return;

                const newWidth = Math.max(
                  200,
                  startWidth + (moveEvent.clientX - startX),
                );

                onPositionChange({
                  ...position,
                  width: newWidth,
                });
              };

              const handleMouseUp = () => {
                setIsResizing(false);
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
              };

              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
            }}
          />

          {/* Bottom Edge */}
          <div
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-dashboard-accent rounded-sm cursor-s-resize opacity-80 hover:opacity-100"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsResizing(true);

              const startY = e.clientY;
              const startHeight = position.height;

              const handleMouseMove = (moveEvent: MouseEvent) => {
                if (!onPositionChange) return;

                const newHeight = Math.max(
                  150,
                  startHeight + (moveEvent.clientY - startY),
                );

                onPositionChange({
                  ...position,
                  height: newHeight,
                });
              };

              const handleMouseUp = () => {
                setIsResizing(false);
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
              };

              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
            }}
          />
        </>
      )}

      {/* Maximize Overlay Background */}
      {isMaximized && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
          onClick={onMaximize}
          style={{ zIndex: 90 }}
        />
      )}
    </div>
  );
}
