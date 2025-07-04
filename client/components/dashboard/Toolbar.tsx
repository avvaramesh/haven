import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, Brain, Zap, MessageSquare } from "lucide-react";

export default function Toolbar() {
  return (
    <div className="flex items-center justify-between p-6 border-b border-dashboard-border">
      <div className="flex items-center gap-3">
        <Button className="bg-dashboard-accent hover:bg-dashboard-accent-light text-white gap-2">
          <Brain className="w-4 h-4" />
          AI Generate
        </Button>
        <Button
          variant="outline"
          className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted gap-2"
        >
          <Zap className="w-4 h-4" />
          Smart Filters
        </Button>
        <Button
          variant="outline"
          className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Ask AI
        </Button>
        <Button
          variant="outline"
          className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Widget
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1 bg-dashboard-surface border border-dashboard-border rounded-lg">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-dashboard-text-muted">AI Active</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-dashboard-text hover:bg-dashboard-muted"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
