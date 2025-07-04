import { TrendingUp, AlertTriangle, Target, Zap } from "lucide-react";

const insights = [
  {
    icon: TrendingUp,
    type: "Trend",
    title: "Revenue Growth Accelerating",
    description: "AI detected 23% increase in Q4 performance",
    confidence: 94,
    color: "text-green-400",
  },
  {
    icon: AlertTriangle,
    type: "Alert",
    title: "Customer Churn Risk",
    description: "12 high-value customers showing decline",
    confidence: 87,
    color: "text-yellow-400",
  },
  {
    icon: Target,
    type: "Opportunity",
    title: "Market Expansion",
    description: "Mobile segment shows 45% growth potential",
    confidence: 91,
    color: "text-blue-400",
  },
];

export default function AIInsights() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-dashboard-accent" />
        <h3 className="font-medium text-dashboard-text">AI Insights</h3>
        <span className="text-xs text-dashboard-text-muted bg-dashboard-muted px-2 py-1 rounded">
          Live
        </span>
      </div>

      {insights.map((insight, index) => (
        <div
          key={index}
          className="p-4 bg-dashboard-surface border border-dashboard-border rounded-lg hover:border-dashboard-accent transition-colors"
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-lg bg-dashboard-muted ${insight.color}`}
            >
              <insight.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-dashboard-text-muted uppercase tracking-wide">
                  {insight.type}
                </span>
                <span className="text-xs text-dashboard-accent">
                  {insight.confidence}% confidence
                </span>
              </div>
              <h4 className="font-medium text-dashboard-text text-sm mb-1">
                {insight.title}
              </h4>
              <p className="text-xs text-dashboard-text-muted">
                {insight.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
