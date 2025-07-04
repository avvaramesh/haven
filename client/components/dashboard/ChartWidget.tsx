import { ReactNode } from "react";

interface ChartWidgetProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function ChartWidget({
  title,
  children,
  className = "",
}: ChartWidgetProps) {
  return (
    <div
      className={`bg-dashboard-surface border border-dashboard-border rounded-lg p-4 ${className}`}
    >
      <h3 className="text-dashboard-text font-medium mb-4">{title}</h3>
      <div className="h-full">{children}</div>
    </div>
  );
}
