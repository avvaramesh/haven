import {
  LineChart,
  Line,
  ResponsiveContainer,
  ReferenceLine,
  Dot,
} from "recharts";
import { Brain, TrendingUp } from "lucide-react";

const data = [
  { value: 20, month: "Jan" },
  { value: 35, month: "Feb" },
  { value: 25, month: "Mar" },
  { value: 40, month: "Apr" },
  { value: 30, month: "May" },
  { value: 45, month: "Jun" },
  { value: 35, month: "Jul" },
  { value: 50, month: "Aug" },
  { value: 40, month: "Sep" },
  { value: 55, month: "Oct" },
  { value: 45, month: "Nov" },
  { value: 60, month: "Dec" },
];

export default function SmartChart() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-dashboard-text">
            AI-Enhanced Sales Analytics
          </h3>
          <p className="text-xs text-dashboard-text-muted">
            With predictive insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-dashboard-accent" />
          <span className="text-xs text-dashboard-accent">AI Active</span>
        </div>
      </div>

      <div className="relative h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(199, 89%, 48%)"
              strokeWidth={2}
              dot={false}
            />
            <ReferenceLine
              x="Oct"
              stroke="hsl(199, 89%, 60%)"
              strokeDasharray="2 2"
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="absolute top-4 right-4 bg-dashboard-surface border border-dashboard-accent rounded-lg p-2 max-w-48">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-3 h-3 text-dashboard-accent" />
            <span className="text-xs font-medium text-dashboard-text">
              AI Prediction
            </span>
          </div>
          <p className="text-xs text-dashboard-text-muted">
            Expected 18% growth in Q1 based on current trends
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-dashboard-accent rounded-full"></div>
          <span className="text-dashboard-text-muted">Actual Data</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 border border-dashboard-accent rounded-full"></div>
          <span className="text-dashboard-text-muted">AI Forecast</span>
        </div>
      </div>
    </div>
  );
}
