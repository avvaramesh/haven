import { Button } from "@/components/ui/button";
import {
  LineChart,
  BarChart,
  TrendingUp,
  Type,
  List,
  AlignJustify,
  PieChart,
  Grid3X3,
  Minus,
} from "lucide-react";

export default function RightPanel() {
  const chartTools = [
    { icon: LineChart, label: "Line Chart" },
    { icon: BarChart, label: "Bar Chart" },
    { icon: TrendingUp, label: "Trend Line" },
    { icon: Type, label: "Text" },
    { icon: List, label: "List" },
    { icon: AlignJustify, label: "Table" },
    { icon: PieChart, label: "Pie Chart" },
    { icon: Grid3X3, label: "Grid" },
    { icon: Minus, label: "Divider" },
  ];

  return (
    <div className="w-16 bg-dashboard-background border-l border-dashboard-border flex flex-col py-4">
      {chartTools.map((tool, index) => (
        <Button
          key={index}
          variant="ghost"
          size="icon"
          className="w-12 h-12 mx-auto mb-2 text-dashboard-text-muted hover:text-dashboard-text hover:bg-dashboard-muted"
          title={tool.label}
        >
          <tool.icon className="w-5 h-5" />
        </Button>
      ))}
    </div>
  );
}
