import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  Palette,
  Type,
  BarChart,
  Sparkles,
  RefreshCw,
} from "lucide-react";

interface ChartProperty {
  id: string;
  label: string;
  type: "text" | "color" | "number" | "select" | "boolean";
  value: any;
  aiSuggestion?: any;
  reasoning?: string;
}

export default function AIPropertyEditor() {
  const [selectedChart, setSelectedChart] = useState("Revenue Trend");
  const [properties, setProperties] = useState<ChartProperty[]>([
    {
      id: "title",
      label: "Chart Title",
      type: "text",
      value: "Revenue Trend Analysis",
      aiSuggestion: "Q4 Revenue Growth Analysis",
      reasoning: "More specific title based on current data timeframe",
    },
    {
      id: "color",
      label: "Primary Color",
      type: "color",
      value: "#3b82f6",
      aiSuggestion: "#10b981",
      reasoning: "Green suggests positive growth, better for revenue data",
    },
    {
      id: "chartType",
      label: "Chart Type",
      type: "select",
      value: "line",
      aiSuggestion: "area",
      reasoning: "Area chart better shows cumulative revenue impact",
    },
    {
      id: "showGrid",
      label: "Show Grid Lines",
      type: "boolean",
      value: true,
      aiSuggestion: false,
      reasoning: "Cleaner look for executive presentations",
    },
    {
      id: "dataPoints",
      label: "Data Points",
      type: "number",
      value: 12,
      aiSuggestion: 24,
      reasoning: "24 months shows better trend patterns",
    },
  ]);

  const [showAISuggestions, setShowAISuggestions] = useState(true);

  const updateProperty = (id: string, value: any) => {
    setProperties((prev) =>
      prev.map((prop) => (prop.id === id ? { ...prop, value } : prop)),
    );
  };

  const applyAISuggestion = (id: string) => {
    setProperties((prev) =>
      prev.map((prop) =>
        prop.id === id ? { ...prop, value: prop.aiSuggestion } : prop,
      ),
    );
  };

  const optimizeAll = () => {
    setProperties((prev) =>
      prev.map((prop) => ({ ...prop, value: prop.aiSuggestion })),
    );
  };

  const renderPropertyInput = (property: ChartProperty) => {
    switch (property.type) {
      case "text":
        return (
          <Input
            value={property.value}
            onChange={(e) => updateProperty(property.id, e.target.value)}
            className="bg-dashboard-muted border-dashboard-border text-dashboard-text"
          />
        );
      case "color":
        return (
          <div className="flex gap-2">
            <input
              type="color"
              value={property.value}
              onChange={(e) => updateProperty(property.id, e.target.value)}
              className="w-8 h-8 rounded border border-dashboard-border"
            />
            <Input
              value={property.value}
              onChange={(e) => updateProperty(property.id, e.target.value)}
              className="bg-dashboard-muted border-dashboard-border text-dashboard-text"
            />
          </div>
        );
      case "select":
        return (
          <Select
            value={property.value}
            onValueChange={(value) => updateProperty(property.id, value)}
          >
            <SelectTrigger className="bg-dashboard-muted border-dashboard-border text-dashboard-text">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="bar">Bar Chart</SelectItem>
              <SelectItem value="area">Area Chart</SelectItem>
              <SelectItem value="pie">Pie Chart</SelectItem>
            </SelectContent>
          </Select>
        );
      case "boolean":
        return (
          <Switch
            checked={property.value}
            onCheckedChange={(checked) => updateProperty(property.id, checked)}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            value={property.value}
            onChange={(e) =>
              updateProperty(property.id, parseInt(e.target.value))
            }
            className="bg-dashboard-muted border-dashboard-border text-dashboard-text"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-dashboard-accent" />
          <h3 className="font-medium text-dashboard-text">
            AI Property Editor
          </h3>
        </div>
        <Button
          size="sm"
          onClick={optimizeAll}
          className="bg-dashboard-accent hover:bg-dashboard-accent-light text-white gap-1"
        >
          <Sparkles className="w-3 h-3" />
          Optimize All
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <Label className="text-dashboard-text text-xs">Selected Chart</Label>
          <Select value={selectedChart} onValueChange={setSelectedChart}>
            <SelectTrigger className="bg-dashboard-muted border-dashboard-border text-dashboard-text">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Revenue Trend">Revenue Trend</SelectItem>
              <SelectItem value="Customer Analysis">
                Customer Analysis
              </SelectItem>
              <SelectItem value="Product Performance">
                Product Performance
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-dashboard-text text-xs">
            Show AI Suggestions
          </Label>
          <Switch
            checked={showAISuggestions}
            onCheckedChange={setShowAISuggestions}
          />
        </div>

        <div className="space-y-4">
          {properties.map((property) => (
            <div key={property.id} className="space-y-2">
              <Label className="text-dashboard-text text-xs">
                {property.label}
              </Label>

              <div className="space-y-2">
                {renderPropertyInput(property)}

                {showAISuggestions && property.aiSuggestion && (
                  <div className="p-3 bg-dashboard-surface border border-dashboard-accent/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-dashboard-accent" />
                        <span className="text-xs font-medium text-dashboard-accent">
                          AI Suggests
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => applyAISuggestion(property.id)}
                        className="h-6 px-2 text-xs text-dashboard-accent hover:bg-dashboard-accent/20"
                      >
                        Apply
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      {property.type === "color" && (
                        <div
                          className="w-4 h-4 rounded border border-dashboard-border"
                          style={{ backgroundColor: property.aiSuggestion }}
                        />
                      )}
                      <span className="text-xs text-dashboard-text">
                        {property.aiSuggestion?.toString()}
                      </span>
                    </div>

                    <p className="text-xs text-dashboard-text-muted">
                      {property.reasoning}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Reset
          </Button>
          <Button
            size="sm"
            className="bg-dashboard-accent hover:bg-dashboard-accent-light text-white"
          >
            Apply Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
