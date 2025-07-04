import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Layers,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  MoreVertical,
  BarChart3,
  PieChart,
  LineChart,
  Hash,
  Type,
  ChevronDown,
  ChevronRight,
  Plus,
} from "lucide-react";

interface LayerItem {
  id: string;
  name: string;
  type: "chart" | "kpi" | "text" | "group";
  visible: boolean;
  locked: boolean;
  children?: LayerItem[];
}

export default function LayersPanel() {
  const [layers, setLayers] = useState<LayerItem[]>([
    {
      id: "1",
      name: "Revenue Dashboard",
      type: "group",
      visible: true,
      locked: false,
      children: [
        {
          id: "2",
          name: "Q4 Revenue Trend",
          type: "chart",
          visible: true,
          locked: false,
        },
        {
          id: "3",
          name: "Revenue by Category",
          type: "chart",
          visible: true,
          locked: false,
        },
        {
          id: "4",
          name: "Total Revenue KPI",
          type: "kpi",
          visible: true,
          locked: false,
        },
      ],
    },
    {
      id: "5",
      name: "Customer Analytics",
      type: "group",
      visible: true,
      locked: false,
      children: [
        {
          id: "6",
          name: "Customer Distribution",
          type: "chart",
          visible: true,
          locked: false,
        },
        {
          id: "7",
          name: "Acquisition Funnel",
          type: "chart",
          visible: false,
          locked: false,
        },
      ],
    },
    {
      id: "8",
      name: "Dashboard Title",
      type: "text",
      visible: true,
      locked: true,
    },
  ]);

  const [expandedGroups, setExpandedGroups] = useState<string[]>(["1", "5"]);
  const [selectedLayer, setSelectedLayer] = useState("2");

  const toggleVisibility = (id: string) => {
    setLayers((prev) => updateLayerProperty(prev, id, "visible"));
  };

  const toggleLock = (id: string) => {
    setLayers((prev) => updateLayerProperty(prev, id, "locked"));
  };

  const updateLayerProperty = (
    layers: LayerItem[],
    id: string,
    property: "visible" | "locked",
  ): LayerItem[] => {
    return layers.map((layer) => {
      if (layer.id === id) {
        return { ...layer, [property]: !layer[property] };
      }
      if (layer.children) {
        return {
          ...layer,
          children: updateLayerProperty(layer.children, id, property),
        };
      }
      return layer;
    });
  };

  const toggleGroupExpansion = (id: string) => {
    setExpandedGroups((prev) =>
      prev.includes(id) ? prev.filter((gId) => gId !== id) : [...prev, id],
    );
  };

  const getLayerIcon = (type: string) => {
    switch (type) {
      case "chart":
        return BarChart3;
      case "kpi":
        return Hash;
      case "text":
        return Type;
      case "group":
        return Layers;
      default:
        return BarChart3;
    }
  };

  const renderLayer = (layer: LayerItem, depth = 0) => {
    const Icon = getLayerIcon(layer.type);
    const isExpanded = expandedGroups.includes(layer.id);
    const isSelected = selectedLayer === layer.id;

    return (
      <div key={layer.id}>
        <div
          className={`flex items-center gap-2 px-3 py-2 hover:bg-dashboard-muted cursor-pointer group ${
            isSelected
              ? "bg-dashboard-accent/20 border-l-2 border-dashboard-accent"
              : ""
          }`}
          style={{ paddingLeft: `${12 + depth * 16}px` }}
          onClick={() => setSelectedLayer(layer.id)}
        >
          {layer.type === "group" && (
            <Button
              variant="ghost"
              size="sm"
              className="w-4 h-4 p-0 hover:bg-transparent"
              onClick={(e) => {
                e.stopPropagation();
                toggleGroupExpansion(layer.id);
              }}
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </Button>
          )}

          <Icon className="w-4 h-4 text-dashboard-text-muted" />

          <span
            className={`flex-1 text-sm truncate ${
              layer.visible
                ? "text-dashboard-text"
                : "text-dashboard-text-muted"
            }`}
          >
            {layer.name}
          </span>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              className="w-6 h-6 p-0 hover:bg-dashboard-surface"
              onClick={(e) => {
                e.stopPropagation();
                toggleVisibility(layer.id);
              }}
            >
              {layer.visible ? (
                <Eye className="w-3 h-3" />
              ) : (
                <EyeOff className="w-3 h-3" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="w-6 h-6 p-0 hover:bg-dashboard-surface"
              onClick={(e) => {
                e.stopPropagation();
                toggleLock(layer.id);
              }}
            >
              {layer.locked ? (
                <Lock className="w-3 h-3" />
              ) : (
                <Unlock className="w-3 h-3" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="w-6 h-6 p-0 hover:bg-dashboard-surface"
            >
              <MoreVertical className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {layer.children &&
          layer.type === "group" &&
          isExpanded &&
          layer.children.map((child) => renderLayer(child, depth + 1))}
      </div>
    );
  };

  return (
    <div className="w-72 bg-dashboard-background border-r border-dashboard-border h-full flex flex-col">
      <div className="p-4 border-b border-dashboard-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-dashboard-accent" />
            <h3 className="font-semibold text-dashboard-text">Layers</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-dashboard-text hover:bg-dashboard-muted"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="py-2">{layers.map((layer) => renderLayer(layer))}</div>
      </div>

      <div className="p-3 border-t border-dashboard-border">
        <div className="text-xs text-dashboard-text-muted space-y-1">
          <div className="flex justify-between">
            <span>Total Elements:</span>
            <span>8</span>
          </div>
          <div className="flex justify-between">
            <span>Visible:</span>
            <span>7</span>
          </div>
          <div className="flex justify-between">
            <span>Locked:</span>
            <span>1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
