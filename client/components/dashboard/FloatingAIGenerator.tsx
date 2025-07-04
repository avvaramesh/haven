import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Wand2,
  BarChart,
  LineChart,
  PieChart,
  TrendingUp,
  Package,
  Users,
  X,
  Sparkles,
  Plus,
  ChevronRight,
  Zap,
} from "lucide-react";

interface ChartSuggestion {
  id: string;
  type: "line" | "bar" | "pie" | "scatter";
  title: string;
  description: string;
  dataSource: string;
  confidence: number;
  icon: any;
  reasoning: string;
}

interface FloatingAIGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FloatingAIGenerator({
  isOpen,
  onClose,
}: FloatingAIGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ChartSuggestion[]>([]);
  const [step, setStep] = useState<"input" | "generating" | "results">("input");

  const generateCharts = async () => {
    setStep("generating");
    setIsGenerating(true);

    // Simulate AI analysis
    setTimeout(() => {
      const newSuggestions: ChartSuggestion[] = [
        {
          id: "1",
          type: "line",
          title: "Revenue Trend Analysis",
          description: "Monthly revenue progression with seasonal patterns",
          dataSource: "Sales Database",
          confidence: 94,
          icon: TrendingUp,
          reasoning: "Time-series data shows clear trends and seasonality",
        },
        {
          id: "2",
          type: "bar",
          title: "Product Performance Comparison",
          description: "Top 10 products by revenue and units sold",
          dataSource: "Product Analytics",
          confidence: 89,
          icon: Package,
          reasoning: "Categorical comparison ideal for ranking analysis",
        },
        {
          id: "3",
          type: "pie",
          title: "Customer Segment Distribution",
          description: "Revenue breakdown by customer tiers",
          dataSource: "CRM System",
          confidence: 87,
          icon: Users,
          reasoning: "Part-to-whole relationship shows market composition",
        },
      ];

      setSuggestions(newSuggestions);
      setIsGenerating(false);
      setStep("results");
    }, 2500);
  };

  const addChart = (suggestion: ChartSuggestion) => {
    // In a real app, this would add the chart to the dashboard
    console.log("Adding chart:", suggestion);
    onClose();
  };

  const resetGenerator = () => {
    setStep("input");
    setQuery("");
    setSuggestions([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl mx-4 bg-dashboard-background border border-dashboard-accent rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-dashboard-accent to-dashboard-accent-light p-6">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Wand2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">AI Chart Generator</h2>
                <p className="text-sm opacity-90">
                  Describe your visualization needs in natural language
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center mt-4 gap-2">
            <div
              className={`w-2 h-2 rounded-full transition-colors ${
                step === "input" ? "bg-white" : "bg-white/40"
              }`}
            />
            <div
              className={`w-2 h-2 rounded-full transition-colors ${
                step === "generating" ? "bg-white" : "bg-white/40"
              }`}
            />
            <div
              className={`w-2 h-2 rounded-full transition-colors ${
                step === "results" ? "bg-white" : "bg-white/40"
              }`}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {step === "input" && (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-dashboard-text font-medium">
                  What would you like to visualize?
                </label>
                <div className="flex gap-2">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., Show me monthly revenue trends by product category..."
                    className="flex-1 bg-dashboard-muted border-dashboard-border text-dashboard-text text-lg py-3"
                    onKeyPress={(e) => e.key === "Enter" && generateCharts()}
                  />
                  <Button
                    onClick={generateCharts}
                    disabled={!query.trim()}
                    className="bg-dashboard-accent hover:bg-dashboard-accent-light px-6"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-dashboard-text-muted">
                  Quick examples:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "Sales performance by region over time",
                    "Customer acquisition funnel breakdown",
                    "Top 10 products by revenue",
                    "Monthly recurring revenue trends",
                  ].map((example, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      onClick={() => setQuery(example)}
                      className="justify-start text-left text-dashboard-text-muted hover:text-dashboard-text hover:bg-dashboard-muted p-3 h-auto"
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      {example}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === "generating" && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-dashboard-accent/30 rounded-full animate-spin border-t-dashboard-accent"></div>
                <Zap className="w-6 h-6 text-dashboard-accent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium text-dashboard-text">
                  AI is analyzing your request...
                </h3>
                <div className="space-y-1 text-sm text-dashboard-text-muted">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1 h-1 bg-dashboard-accent rounded-full animate-pulse" />
                    <span>Scanning 12 data sources</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1 h-1 bg-dashboard-accent rounded-full animate-pulse delay-200" />
                    <span>Identifying optimal visualizations</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1 h-1 bg-dashboard-accent rounded-full animate-pulse delay-500" />
                    <span>Calculating relevance scores</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "results" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-dashboard-text">
                  AI Recommendations
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetGenerator}
                  className="text-dashboard-text-muted hover:text-dashboard-text"
                >
                  Try Another
                </Button>
              </div>

              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={suggestion.id}
                    className="group p-4 bg-dashboard-surface border border-dashboard-border rounded-lg hover:border-dashboard-accent transition-all hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="p-3 bg-dashboard-accent/20 rounded-lg group-hover:bg-dashboard-accent/30 transition-colors">
                          <suggestion.icon className="w-5 h-5 text-dashboard-accent" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-dashboard-text">
                              {suggestion.title}
                            </h4>
                            <Badge className="bg-dashboard-accent/20 text-dashboard-accent text-xs">
                              {suggestion.confidence}% match
                            </Badge>
                          </div>
                          <p className="text-sm text-dashboard-text-muted mb-2">
                            {suggestion.description}
                          </p>
                          <p className="text-xs text-dashboard-text-muted">
                            <span className="text-dashboard-accent">
                              Reasoning:
                            </span>{" "}
                            {suggestion.reasoning}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-dashboard-text-muted">
                        Source: {suggestion.dataSource}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => addChart(suggestion)}
                        className="bg-dashboard-accent hover:bg-dashboard-accent-light text-white gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Plus className="w-3 h-3" />
                        Add to Dashboard
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
