import React from "react";
import DataSourceManager from "./DataSourceManager";

export default function DataConnectionsPanel() {
  const handleDataSourceChange = (dataSource: any) => {
    console.log("Selected data source:", dataSource);
    // This would integrate with the dashboard to update chart data sources
    // In a real implementation, this would update the global state or context
  };

  return (
    <div className="w-80 h-full bg-dashboard-surface border-r border-dashboard-border overflow-y-auto">
      <DataSourceManager onDataSourceChange={handleDataSourceChange} />
    </div>
  );
}
