import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  Plus,
  Check,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  Link,
  FileSpreadsheet,
  Cloud,
} from "lucide-react";

interface DataSource {
  id: string;
  name: string;
  type: "database" | "api" | "file" | "cloud";
  status: "connected" | "error" | "syncing";
  lastSync: string;
  records: number;
  aiRecommendations: string[];
  icon: any;
}

export default function AIDataSourceManager() {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: "1",
      name: "Sales Database",
      type: "database",
      status: "connected",
      lastSync: "2 min ago",
      records: 125430,
      aiRecommendations: [
        "Enable real-time sync for better performance",
        "Add customer lifetime value calculations",
      ],
      icon: Database,
    },
    {
      id: "2",
      name: "CRM API",
      type: "api",
      status: "connected",
      lastSync: "5 min ago",
      records: 45230,
      aiRecommendations: [
        "Optimize API calls to reduce latency",
        "Add lead scoring data integration",
      ],
      icon: Link,
    },
    {
      id: "3",
      name: "Excel Reports",
      type: "file",
      status: "error",
      lastSync: "1 hour ago",
      records: 0,
      aiRecommendations: [
        "File format needs updating",
        "Switch to automated data feed",
      ],
      icon: FileSpreadsheet,
    },
    {
      id: "4",
      name: "Cloud Analytics",
      type: "cloud",
      status: "syncing",
      lastSync: "Now",
      records: 89560,
      aiRecommendations: [
        "Consider data compression for faster loading",
        "Enable predictive analytics features",
      ],
      icon: Cloud,
    },
  ]);

  const [showAddSource, setShowAddSource] = useState(false);
  const [newSourceName, setNewSourceName] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500/20 text-green-400";
      case "error":
        return "bg-red-500/20 text-red-400";
      case "syncing":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <Check className="w-3 h-3" />;
      case "error":
        return <AlertTriangle className="w-3 h-3" />;
      case "syncing":
        return <RefreshCw className="w-3 h-3 animate-spin" />;
      default:
        return null;
    }
  };

  const syncDataSource = (id: string) => {
    setDataSources((prev) =>
      prev.map((source) =>
        source.id === id ? { ...source, status: "syncing" } : source,
      ),
    );

    setTimeout(() => {
      setDataSources((prev) =>
        prev.map((source) =>
          source.id === id
            ? { ...source, status: "connected", lastSync: "Just now" }
            : source,
        ),
      );
    }, 2000);
  };

  const optimizeDataSource = (id: string) => {
    // AI optimization logic
    console.log("Optimizing data source:", id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-dashboard-accent" />
          <h3 className="font-medium text-dashboard-text">AI Data Sources</h3>
        </div>
        <Button
          size="sm"
          onClick={() => setShowAddSource(!showAddSource)}
          className="bg-dashboard-accent hover:bg-dashboard-accent-light text-white gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Source
        </Button>
      </div>

      {showAddSource && (
        <div className="p-4 bg-dashboard-surface border border-dashboard-border rounded-lg space-y-3">
          <h4 className="font-medium text-dashboard-text text-sm">
            Connect New Data Source
          </h4>
          <div className="flex gap-2">
            <Input
              value={newSourceName}
              onChange={(e) => setNewSourceName(e.target.value)}
              placeholder="Enter data source name or URL..."
              className="flex-1 bg-dashboard-muted border-dashboard-border text-dashboard-text"
            />
            <Button
              size="sm"
              className="bg-dashboard-accent hover:bg-dashboard-accent-light text-white"
            >
              <Sparkles className="w-4 h-4" />
              Auto-Detect
            </Button>
          </div>
          <p className="text-xs text-dashboard-text-muted">
            AI will automatically detect the data structure and suggest optimal
            configurations
          </p>
        </div>
      )}

      <div className="space-y-3">
        {dataSources.map((source) => (
          <div
            key={source.id}
            className="p-4 bg-dashboard-surface border border-dashboard-border rounded-lg hover:border-dashboard-accent transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-dashboard-muted rounded-lg">
                  <source.icon className="w-4 h-4 text-dashboard-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-dashboard-text text-sm">
                      {source.name}
                    </h4>
                    <Badge
                      className={`text-xs ${getStatusColor(source.status)}`}
                    >
                      {getStatusIcon(source.status)}
                      <span className="ml-1">{source.status}</span>
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-dashboard-text-muted">
                    <span>Last sync: {source.lastSync}</span>
                    <span>•</span>
                    <span>{source.records.toLocaleString()} records</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => syncDataSource(source.id)}
                  className="h-7 px-2 text-xs text-dashboard-text hover:bg-dashboard-muted"
                >
                  <RefreshCw className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => optimizeDataSource(source.id)}
                  className="h-7 px-2 text-xs bg-dashboard-accent hover:bg-dashboard-accent-light text-white"
                >
                  <Sparkles className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {source.aiRecommendations.length > 0 && (
              <div className="mt-3 p-3 bg-dashboard-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3 h-3 text-dashboard-accent" />
                  <span className="text-xs font-medium text-dashboard-accent">
                    AI Recommendations
                  </span>
                </div>
                <ul className="space-y-1">
                  {source.aiRecommendations.map((rec, index) => (
                    <li
                      key={index}
                      className="text-xs text-dashboard-text-muted flex items-center gap-2"
                    >
                      <div className="w-1 h-1 bg-dashboard-accent rounded-full" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 bg-dashboard-surface border border-dashboard-border rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-dashboard-text">
            Data Health Score
          </span>
          <span className="text-lg font-bold text-dashboard-accent">92%</span>
        </div>
        <div className="h-2 bg-dashboard-muted rounded-full overflow-hidden">
          <div className="h-full w-[92%] bg-dashboard-accent rounded-full" />
        </div>
        <p className="text-xs text-dashboard-text-muted mt-2">
          All critical data sources are healthy and synchronized
        </p>
      </div>
    </div>
  );
}
