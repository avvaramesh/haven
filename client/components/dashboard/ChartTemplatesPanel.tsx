import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart3,
  LineChart,
  PieChart,
  AreaChart,
  ScatterChart,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  Target,
  Calendar,
  Search,
  Star,
  Plus,
  Zap,
} from "lucide-react";

interface ChartTemplate {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: "sales" | "marketing" | "finance" | "operations" | "popular";
  type: "bar" | "line" | "pie" | "area" | "scatter" | "kpi";
  preview: string;
}

export default function ChartTemplatesPanel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("popular");

  const templates: ChartTemplate[] = [
    {
      id: "1",
      name: "Revenue Trend",
      description: "Monthly revenue over time",
      icon: TrendingUp,
      category: "sales",
      type: "line",
      preview: "/api/placeholder/chart-line",
    },
    {
      id: "2",
      name: "Sales by Category",
      description: "Product category breakdown",
      icon: BarChart3,
      category: "sales",
      type: "bar",
      preview: "/api/placeholder/chart-bar",
    },
    {
      id: "3",
      name: "Market Share",
      description: "Competitive market analysis",
      icon: PieChart,
      category: "marketing",
      type: "pie",
      preview: "/api/placeholder/chart-pie",
    },
    {
      id: "4",
      name: "Customer Growth",
      description: "Customer acquisition over time",
      icon: Users,
      category: "marketing",
      type: "area",
      preview: "/api/placeholder/chart-area",
    },
    {
      id: "5",
      name: "Total Revenue",
      description: "Key performance indicator",
      icon: DollarSign,
      category: "finance",
      type: "kpi",
      preview: "/api/placeholder/kpi",
    },
    {
      id: "6",
      name: "Conversion Funnel",
      description: "Sales funnel analysis",
      icon: Target,
      category: "operations",
      type: "bar",
      preview: "/api/placeholder/funnel",
    },
  ];

  const categories = [
    { id: "popular", name: "Popular", icon: Star },
    { id: "sales", name: "Sales", icon: DollarSign },
    { id: "marketing", name: "Marketing", icon: Target },
    { id: "finance", name: "Finance", icon: TrendingUp },
    { id: "operations", name: "Operations", icon: Users },
  ];

  const filteredTemplates = templates.filter(
    (template) =>
      (selectedCategory === "popular" ||
        template.category === selectedCategory) &&
      template.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const addTemplate = (template: ChartTemplate) => {
    // In real implementation, this would add the chart to the canvas
    console.log("Adding template:", template);
  };

  return (
    <div className="w-80 bg-dashboard-background border-r border-dashboard-border h-full flex flex-col">
      <div className="p-4 border-b border-dashboard-border">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-5 h-5 text-dashboard-accent" />
          <h3 className="font-semibold text-dashboard-text">Chart Library</h3>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-dashboard-text-muted" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search templates..."
            className="pl-10 bg-dashboard-surface border-dashboard-border text-dashboard-text"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-3 border-b border-dashboard-border">
        <div className="flex flex-wrap gap-1">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={
                selectedCategory === category.id
                  ? "bg-dashboard-accent text-white"
                  : "text-dashboard-text hover:bg-dashboard-muted"
              }
            >
              <category.icon className="w-3 h-3 mr-1" />
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group p-3 border border-dashboard-border rounded-lg hover:border-dashboard-accent transition-colors cursor-pointer bg-dashboard-surface"
              onClick={() => addTemplate(template)}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-dashboard-muted rounded-lg group-hover:bg-dashboard-accent/20 transition-colors">
                  <template.icon className="w-4 h-4 text-dashboard-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-dashboard-text text-sm truncate">
                    {template.name}
                  </h4>
                  <p className="text-xs text-dashboard-text-muted mt-1">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-dashboard-text-muted capitalize">
                      {template.type} chart
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity text-dashboard-accent hover:bg-dashboard-accent/20"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mini Preview */}
              <div className="mt-3 h-16 bg-dashboard-muted rounded border opacity-50 group-hover:opacity-80 transition-opacity">
                <div className="h-full flex items-center justify-center text-xs text-dashboard-text-muted">
                  {template.type === "line" && (
                    <LineChart className="w-8 h-8 text-dashboard-accent" />
                  )}
                  {template.type === "bar" && (
                    <BarChart3 className="w-8 h-8 text-dashboard-accent" />
                  )}
                  {template.type === "pie" && (
                    <PieChart className="w-8 h-8 text-dashboard-accent" />
                  )}
                  {template.type === "area" && (
                    <AreaChart className="w-8 h-8 text-dashboard-accent" />
                  )}
                  {template.type === "kpi" && (
                    <div className="text-center">
                      <div className="text-lg font-bold text-dashboard-accent">
                        $125k
                      </div>
                      <div className="text-xs text-dashboard-text-muted">
                        Sample KPI
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-dashboard-border">
        <Button className="w-full bg-dashboard-accent hover:bg-dashboard-accent-light text-white gap-2">
          <Zap className="w-4 h-4" />
          AI Generate Chart
        </Button>
      </div>
    </div>
  );
}
