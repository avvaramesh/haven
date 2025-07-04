import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Wand2,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  TrendingUp,
  Calendar,
  Users,
  DollarSign,
  Package,
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

export default function AIChartGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ChartSuggestion[]>([]);

  const generateCharts = async () => {
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
    }, 2000);
  };

  const addChart = (suggestion: ChartSuggestion) => {
    // In a real app, this would add the chart to the dashboard
    console.log("Adding chart:", suggestion);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Wand2 className="w-5 h-5 text-dashboard-accent" />
        <h3 className="font-medium text-dashboard-text">AI Chart Generator</h3>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe what you want to visualize..."
            className="flex-1 bg-dashboard-muted border-dashboard-border text-dashboard-text"
          />
          <Button
            onClick={generateCharts}
            disabled={isGenerating}
            className="bg-dashboard-accent hover:bg-dashboard-accent-light"
          >
            {isGenerating ? (
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Wand2 className="w-4 h-4" />
            )}
          </Button>
        </div>

        {isGenerating && (
          <div className="p-4 bg-dashboard-surface border border-dashboard-border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="animate-pulse w-2 h-2 bg-dashboard-accent rounded-full" />
              <span className="text-sm text-dashboard-text">
                AI is analyzing your data sources...
              </span>
            </div>
            <div className="space-y-1 text-xs text-dashboard-text-muted">
              <div>• Scanning 12 data sources</div>
              <div>• Identifying optimal visualizations</div>
              <div>• Calculating relevance scores</div>
            </div>
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-dashboard-text">
              AI Recommendations
            </h4>
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="p-4 bg-dashboard-surface border border-dashboard-border rounded-lg hover:border-dashboard-accent transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-dashboard-muted rounded-lg">
                      <suggestion.icon className="w-4 h-4 text-dashboard-accent" />
                    </div>
                    <div>
                      <h5 className="font-medium text-dashboard-text text-sm">
                        {suggestion.title}
                      </h5>
                      <p className="text-xs text-dashboard-text-muted mt-1">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-dashboard-accent/20 text-dashboard-accent"
                  >
                    {suggestion.confidence}%
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-dashboard-text-muted">
                    <span>Source: {suggestion.dataSource}</span>
                    <span>•</span>
                    <span>{suggestion.reasoning}</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addChart(suggestion)}
                    className="bg-dashboard-accent hover:bg-dashboard-accent-light text-white"
                  >
                    Add Chart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted"
          >
            <BarChart className="w-4 h-4 mr-2" />
            Quick Bar Chart
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted"
          >
            <LineChart className="w-4 h-4 mr-2" />
            Quick Line Chart
          </Button>
        </div>
      </div>
    </div>
  );
}
