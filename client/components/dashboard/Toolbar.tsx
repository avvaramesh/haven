import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal } from "lucide-react";

export default function Toolbar() {
  return (
    <div className="flex items-center justify-between p-6 border-b border-dashboard-border">
      <div className="flex items-center gap-3">
        <Button className="bg-dashboard-accent hover:bg-dashboard-accent-light text-white gap-2">
          <Plus className="w-4 h-4" />
          Add Chart
        </Button>
        <Button
          variant="outline"
          className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted"
        >
          Filters
        </Button>
        <Button
          variant="outline"
          className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted"
        >
          Visualization
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-dashboard-text hover:bg-dashboard-muted"
      >
        <MoreHorizontal className="w-4 h-4" />
      </Button>
    </div>
  );
}
