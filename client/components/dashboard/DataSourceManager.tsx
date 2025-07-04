import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Database,
  Plus,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  X,
  Eye,
  Settings,
} from "lucide-react";

interface DataSource {
  id: string;
  name: string;
  type: "json" | "csv" | "api" | "database" | "mock";
  url?: string;
  status: "connected" | "disconnected" | "error" | "testing";
  lastSync?: string;
  recordCount?: number;
  columns?: string[];
}

interface DataSourceManagerProps {
  onDataSourceChange?: (dataSource: DataSource) => void;
}

const mockDataSources: DataSource[] = [
  {
    id: "sales-data",
    name: "Sales Data",
    type: "json",
    url: "/api/sales",
    status: "connected",
    lastSync: "2024-01-20 14:30",
    recordCount: 1250,
    columns: ["id", "product", "amount", "date", "customer"],
  },
  {
    id: "user-analytics",
    name: "User Analytics",
    type: "api",
    url: "https://api.analytics.com/users",
    status: "connected",
    lastSync: "2024-01-20 14:25",
    recordCount: 5680,
    columns: ["user_id", "session_duration", "page_views", "conversion"],
  },
  {
    id: "inventory",
    name: "Inventory Data",
    type: "csv",
    url: "/uploads/inventory.csv",
    status: "error",
    lastSync: "2024-01-20 12:15",
    recordCount: 0,
    columns: [],
  },
  {
    id: "financial",
    name: "Financial Data",
    type: "database",
    url: "postgresql://finance_db",
    status: "disconnected",
    lastSync: "2024-01-19 18:45",
    recordCount: 892,
    columns: ["transaction_id", "amount", "category", "date"],
  },
];

export default function DataSourceManager({
  onDataSourceChange,
}: DataSourceManagerProps) {
  const [dataSources, setDataSources] = useState<DataSource[]>(mockDataSources);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newSource, setNewSource] = useState({
    name: "",
    type: "json" as DataSource["type"],
    url: "",
  });

  const getStatusIcon = (status: DataSource["status"]) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "disconnected":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "error":
        return <X className="w-4 h-4 text-red-500" />;
      case "testing":
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      default:
        return <Database className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: DataSource["status"]) => {
    switch (status) {
      case "connected":
        return (
          <Badge variant="secondary" className="bg-green-500/20 text-green-400">
            Connected
          </Badge>
        );
      case "disconnected":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-500/20 text-yellow-400"
          >
            Disconnected
          </Badge>
        );
      case "error":
        return (
          <Badge variant="secondary" className="bg-red-500/20 text-red-400">
            Error
          </Badge>
        );
      case "testing":
        return (
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
            Testing
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleTestConnection = async (sourceId: string) => {
    setDataSources((prev) =>
      prev.map((source) =>
        source.id === sourceId ? { ...source, status: "testing" } : source,
      ),
    );

    // Simulate API test
    setTimeout(() => {
      setDataSources((prev) =>
        prev.map((source) =>
          source.id === sourceId
            ? {
                ...source,
                status: Math.random() > 0.3 ? "connected" : "error",
                lastSync: new Date().toLocaleString(),
              }
            : source,
        ),
      );
    }, 2000);
  };

  const handleRefreshData = async (sourceId: string) => {
    const source = dataSources.find((s) => s.id === sourceId);
    if (!source) return;

    setDataSources((prev) =>
      prev.map((s) => (s.id === sourceId ? { ...s, status: "testing" } : s)),
    );

    // Simulate data refresh
    setTimeout(() => {
      setDataSources((prev) =>
        prev.map((s) =>
          s.id === sourceId
            ? {
                ...s,
                status: "connected",
                lastSync: new Date().toLocaleString(),
                recordCount: Math.floor(Math.random() * 10000) + 100,
              }
            : s,
        ),
      );
    }, 1500);
  };

  const handleAddDataSource = () => {
    if (!newSource.name || !newSource.url) return;

    const newDataSource: DataSource = {
      id: newSource.name.toLowerCase().replace(/\s+/g, "-"),
      name: newSource.name,
      type: newSource.type,
      url: newSource.url,
      status: "disconnected",
      recordCount: 0,
      columns: [],
    };

    setDataSources((prev) => [...prev, newDataSource]);
    setNewSource({ name: "", type: "json", url: "" });
    setShowAddDialog(false);

    // Auto test connection
    setTimeout(() => {
      handleTestConnection(newDataSource.id);
    }, 500);
  };

  const handleRemoveDataSource = (sourceId: string) => {
    setDataSources((prev) => prev.filter((source) => source.id !== sourceId));
    if (selectedSource === sourceId) {
      setSelectedSource(null);
    }
  };

  const selectedSourceData = dataSources.find((s) => s.id === selectedSource);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-dashboard-text">Data Sources</h3>
          <p className="text-xs text-dashboard-text-muted">
            Manage and verify data connections
          </p>
        </div>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button size="sm" className="text-xs">
              <Plus className="w-3 h-3 mr-1" />
              Add Source
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-dashboard-surface border-dashboard-border">
            <DialogHeader>
              <DialogTitle className="text-dashboard-text">
                Add Data Source
              </DialogTitle>
              <DialogDescription className="text-dashboard-text-muted">
                Connect a new data source to your dashboard
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label className="text-xs text-dashboard-text-muted">
                  Name
                </Label>
                <Input
                  value={newSource.name}
                  onChange={(e) =>
                    setNewSource((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="My Data Source"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs text-dashboard-text-muted">
                  Type
                </Label>
                <Select
                  value={newSource.type}
                  onValueChange={(value: DataSource["type"]) =>
                    setNewSource((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="json">JSON API</SelectItem>
                    <SelectItem value="csv">CSV File</SelectItem>
                    <SelectItem value="api">REST API</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="mock">Mock Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs text-dashboard-text-muted">
                  URL/Connection
                </Label>
                <Input
                  value={newSource.url}
                  onChange={(e) =>
                    setNewSource((prev) => ({ ...prev, url: e.target.value }))
                  }
                  placeholder="https://api.example.com/data"
                  className="mt-1"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={handleAddDataSource} size="sm">
                  Add Source
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddDialog(false)}
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Data Sources List */}
      <div className="space-y-2">
        {dataSources.map((source) => (
          <div
            key={source.id}
            className={`p-3 border border-dashboard-border rounded-lg transition-colors ${
              selectedSource === source.id
                ? "bg-dashboard-accent/10 border-dashboard-accent"
                : "bg-dashboard-surface hover:bg-dashboard-muted"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(source.status)}
                <span className="text-sm font-medium text-dashboard-text">
                  {source.name}
                </span>
                <Badge variant="outline" className="text-xs">
                  {source.type.toUpperCase()}
                </Badge>
                {getStatusBadge(source.status)}
              </div>

              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    setSelectedSource(
                      selectedSource === source.id ? null : source.id,
                    )
                  }
                  className="h-6 w-6 p-0"
                >
                  <Eye className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleTestConnection(source.id)}
                  className="h-6 w-6 p-0"
                  disabled={source.status === "testing"}
                >
                  <Settings className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleRefreshData(source.id)}
                  className="h-6 w-6 p-0"
                  disabled={source.status === "testing"}
                >
                  <RefreshCw className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleRemoveDataSource(source.id)}
                  className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="text-xs text-dashboard-text-muted space-y-1">
              <div>URL: {source.url}</div>
              {source.lastSync && <div>Last sync: {source.lastSync}</div>}
              {source.recordCount !== undefined && (
                <div>Records: {source.recordCount.toLocaleString()}</div>
              )}
            </div>

            {/* Expanded Details */}
            {selectedSource === source.id && selectedSourceData && (
              <div className="mt-3 pt-3 border-t border-dashboard-border">
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium text-dashboard-text">
                      Columns:
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedSourceData.columns &&
                      selectedSourceData.columns.length > 0 ? (
                        selectedSourceData.columns.map((column) => (
                          <Badge
                            key={column}
                            variant="outline"
                            className="text-xs"
                          >
                            {column}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-dashboard-text-muted">
                          No columns detected
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTestConnection(source.id)}
                      disabled={source.status === "testing"}
                      className="text-xs"
                    >
                      Test Connection
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRefreshData(source.id)}
                      disabled={source.status === "testing"}
                      className="text-xs"
                    >
                      Refresh Data
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDataSourceChange?.(selectedSourceData)}
                      className="text-xs"
                      disabled={source.status !== "connected"}
                    >
                      Use This Source
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {dataSources.length === 0 && (
        <div className="text-center py-8">
          <Database className="w-12 h-12 text-dashboard-text-muted mx-auto mb-2" />
          <p className="text-sm text-dashboard-text-muted">
            No data sources configured
          </p>
          <p className="text-xs text-dashboard-text-muted">
            Add a data source to get started
          </p>
        </div>
      )}
    </div>
  );
}
