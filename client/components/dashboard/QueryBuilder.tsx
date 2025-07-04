import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, BarChart, PieChart, LineChart } from "lucide-react";

const quickQueries = [
  {
    icon: BarChart,
    text: "Show revenue by product category",
    type: "bar",
  },
  {
    icon: LineChart,
    text: "Customer acquisition trends",
    type: "line",
  },
  {
    icon: PieChart,
    text: "Market share distribution",
    type: "pie",
  },
];

export default function QueryBuilder() {
  const [query, setQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const handleQuickQuery = (queryText: string) => {
    setQuery(queryText);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-dashboard-accent" />
        <h3 className="font-medium text-dashboard-text">AI Query Builder</h3>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about your data in natural language..."
            className="flex-1 bg-dashboard-muted border-dashboard-border text-dashboard-text"
          />
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-dashboard-accent hover:bg-dashboard-accent-light"
          >
            {isGenerating ? (
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-dashboard-text-muted">
            Quick suggestions:
          </p>
          {quickQueries.map((suggestion, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => handleQuickQuery(suggestion.text)}
              className="w-full justify-start text-left text-dashboard-text-muted hover:text-dashboard-text hover:bg-dashboard-muted"
            >
              <suggestion.icon className="w-4 h-4 mr-2" />
              {suggestion.text}
            </Button>
          ))}
        </div>
      </div>

      {isGenerating && (
        <div className="p-4 bg-dashboard-surface border border-dashboard-border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="animate-pulse w-2 h-2 bg-dashboard-accent rounded-full" />
            <span className="text-sm text-dashboard-text">
              AI is analyzing your data...
            </span>
          </div>
          <p className="text-xs text-dashboard-text-muted">
            This usually takes a few seconds
          </p>
        </div>
      )}
    </div>
  );
}
