import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Layout,
  Eye,
  Users,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface Optimization {
  id: string;
  type: "layout" | "performance" | "usability" | "analytics";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  effort: "low" | "medium" | "high";
  status: "suggested" | "applied" | "dismissed";
  icon: any;
}

export default function AIDashboardOptimizer() {
  const [optimizations, setOptimizations] = useState<Optimization[]>([
    {
      id: "1",
      type: "layout",
      title: "Reorder Charts by Importance",
      description: "Move KPI metrics to top-left for better visual hierarchy",
      impact: "high",
      effort: "low",
      status: "suggested",
      icon: Layout,
    },
    {
      id: "2",
      type: "performance",
      title: "Optimize Data Loading",
      description: "Implement lazy loading for charts below the fold",
      impact: "medium",
      effort: "medium",
      status: "suggested",
      icon: Clock,
    },
    {
      id: "3",
      type: "usability",
      title: "Add Interactive Filters",
      description: "Enable date range filtering across all charts",
      impact: "high",
      effort: "medium",
      status: "suggested",
      icon: Eye,
    },
    {
      id: "4",
      type: "analytics",
      title: "Smart Data Refresh",
      description: "Auto-refresh based on data change frequency",
      impact: "medium",
      effort: "low",
      status: "applied",
      icon: TrendingUp,
    },
  ]);

  const [isOptimizing, setIsOptimizing] = useState(false);

  const applyOptimization = (id: string) => {
    setOptimizations((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, status: "applied" } : opt)),
    );
  };

  const dismissOptimization = (id: string) => {
    setOptimizations((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, status: "dismissed" } : opt,
      ),
    );
  };

  const runOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setOptimizations((prev) =>
        prev.map((opt) =>
          opt.status === "suggested" ? { ...opt, status: "applied" } : opt,
        ),
      );
      setIsOptimizing(false);
    }, 3000);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-green-500/20 text-green-400";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400";
      case "low":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "dismissed":
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const suggestedOptimizations = optimizations.filter(
    (opt) => opt.status === "suggested",
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-dashboard-accent" />
          <h3 className="font-medium text-dashboard-text">
            Dashboard Optimizer
          </h3>
        </div>
        <Button
          onClick={runOptimization}
          disabled={isOptimizing || suggestedOptimizations.length === 0}
          className="bg-dashboard-accent hover:bg-dashboard-accent-light text-white gap-1"
        >
          {isOptimizing ? (
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <Zap className="w-4 h-4" />
          )}
          Auto-Optimize
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4 bg-dashboard-surface border border-dashboard-border rounded-lg">
        <div className="text-center">
          <div className="text-lg font-semibold text-dashboard-text">
            {optimizations.filter((opt) => opt.status === "applied").length}
          </div>
          <div className="text-xs text-dashboard-text-muted">Applied</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-dashboard-accent">
            {suggestedOptimizations.length}
          </div>
          <div className="text-xs text-dashboard-text-muted">Pending</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-dashboard-text">87%</div>
          <div className="text-xs text-dashboard-text-muted">Score</div>
        </div>
      </div>

      {isOptimizing && (
        <div className="p-4 bg-dashboard-surface border border-dashboard-accent rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="animate-pulse w-2 h-2 bg-dashboard-accent rounded-full" />
            <span className="text-sm text-dashboard-text">
              AI is optimizing your dashboard...
            </span>
          </div>
          <div className="space-y-1 text-xs text-dashboard-text-muted">
            <div>• Analyzing user interaction patterns</div>
            <div>• Optimizing chart layouts</div>
            <div>• Implementing performance improvements</div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {optimizations.map((optimization) => (
          <div
            key={optimization.id}
            className={`p-4 border rounded-lg transition-all ${
              optimization.status === "applied"
                ? "bg-green-500/10 border-green-500/30"
                : optimization.status === "dismissed"
                  ? "bg-gray-500/10 border-gray-500/30"
                  : "bg-dashboard-surface border-dashboard-border hover:border-dashboard-accent"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-dashboard-muted rounded-lg">
                  <optimization.icon className="w-4 h-4 text-dashboard-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-dashboard-text text-sm">
                      {optimization.title}
                    </h4>
                    {getStatusIcon(optimization.status)}
                  </div>
                  <p className="text-xs text-dashboard-text-muted">
                    {optimization.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge
                  className={`text-xs ${getImpactColor(optimization.impact)}`}
                >
                  {optimization.impact} impact
                </Badge>
                <span className="text-xs text-dashboard-text-muted">
                  {optimization.effort} effort
                </span>
              </div>

              {optimization.status === "suggested" && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => dismissOptimization(optimization.id)}
                    className="h-6 px-2 text-xs text-dashboard-text-muted hover:bg-dashboard-muted"
                  >
                    Dismiss
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => applyOptimization(optimization.id)}
                    className="h-6 px-2 text-xs bg-dashboard-accent hover:bg-dashboard-accent-light text-white"
                  >
                    Apply
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
