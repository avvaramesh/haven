import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  Plus,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  Download,
  Upload,
  Link,
  FileSpreadsheet,
  Cloud,
  Server,
  Zap,
  Users,
  Target,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import {
  allDatasets,
  getDatasetsByCategory,
  Dataset,
} from "../../data/sampleData";

interface DataConnection {
  id: string;
  name: string;
  type: "database" | "api" | "file" | "cloud" | "warehouse";
  status: "connected" | "error" | "pending" | "syncing";
  lastSync: string;
  records: number;
  tables: string[];
  icon: any;
}

export default function DataConnectionsPanel() {
  const [connections, setConnections] = useState<DataConnection[]>([
    {
      id: "1",
      name: "Sales Database",
      type: "database",
      status: "connected",
      lastSync: "2 min ago",
      records: 125430,
      tables: ["orders", "customers", "products", "transactions"],
      icon: Database,
    },
    {
      id: "2",
      name: "CRM API",
      type: "api",
      status: "connected",
      lastSync: "5 min ago",
      records: 45230,
      tables: ["leads", "contacts", "deals", "activities"],
      icon: Link,
    },
    {
      id: "3",
      name: "Marketing Data",
      type: "cloud",
      status: "syncing",
      lastSync: "Now",
      records: 89560,
      tables: ["campaigns", "analytics", "social_media"],
      icon: Cloud,
    },
    {
      id: "4",
      name: "Excel Reports",
      type: "file",
      status: "error",
      lastSync: "1 hour ago",
      records: 0,
      tables: [],
      icon: FileSpreadsheet,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConnection, setSelectedConnection] = useState<string | null>(
    null,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500/20 text-green-400";
      case "error":
        return "bg-red-500/20 text-red-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "syncing":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-3 h-3" />;
      case "error":
        return <AlertTriangle className="w-3 h-3" />;
      case "pending":
        return <Clock className="w-3 h-3" />;
      case "syncing":
        return <RefreshCw className="w-3 h-3 animate-spin" />;
      default:
        return null;
    }
  };

  const syncConnection = (id: string) => {
    setConnections((prev) =>
      prev.map((conn) =>
        conn.id === id ? { ...conn, status: "syncing" } : conn,
      ),
    );

    setTimeout(() => {
      setConnections((prev) =>
        prev.map((conn) =>
          conn.id === id
            ? { ...conn, status: "connected", lastSync: "Just now" }
            : conn,
        ),
      );
    }, 2000);
  };

  const filteredConnections = connections.filter((conn) =>
    conn.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-80 bg-dashboard-background border-r border-dashboard-border h-full flex flex-col">
      <div className="p-4 border-b border-dashboard-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-dashboard-accent" />
            <h3 className="font-semibold text-dashboard-text">
              Data Connections
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-dashboard-text hover:bg-dashboard-muted"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-dashboard-text-muted" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search connections..."
            className="pl-10 bg-dashboard-surface border-dashboard-border text-dashboard-text"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {filteredConnections.map((connection) => (
            <div
              key={connection.id}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedConnection === connection.id
                  ? "border-dashboard-accent bg-dashboard-accent/10"
                  : "border-dashboard-border bg-dashboard-surface hover:border-dashboard-accent"
              }`}
              onClick={() => setSelectedConnection(connection.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <connection.icon className="w-4 h-4 text-dashboard-accent" />
                  <h4 className="font-medium text-dashboard-text text-sm">
                    {connection.name}
                  </h4>
                </div>
                <Badge
                  className={`text-xs ${getStatusColor(connection.status)}`}
                >
                  {getStatusIcon(connection.status)}
                  <span className="ml-1">{connection.status}</span>
                </Badge>
              </div>

              <div className="space-y-1 text-xs text-dashboard-text-muted">
                <div>Last sync: {connection.lastSync}</div>
                <div>{connection.records.toLocaleString()} records</div>
                {connection.tables.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {connection.tables.slice(0, 3).map((table, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-dashboard-muted rounded text-xs"
                      >
                        {table}
                      </span>
                    ))}
                    {connection.tables.length > 3 && (
                      <span className="px-2 py-1 bg-dashboard-muted rounded text-xs">
                        +{connection.tables.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-3">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    syncConnection(connection.id);
                  }}
                  className="h-6 px-2 text-xs text-dashboard-text hover:bg-dashboard-muted"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Sync
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-xs text-dashboard-text hover:bg-dashboard-muted"
                >
                  <Filter className="w-3 h-3 mr-1" />
                  Query
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-dashboard-border">
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-dashboard-text border-dashboard-border hover:bg-dashboard-muted"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload CSV/Excel
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-dashboard-text border-dashboard-border hover:bg-dashboard-muted"
          >
            <Server className="w-4 h-4 mr-2" />
            Connect Database
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-dashboard-text border-dashboard-border hover:bg-dashboard-muted"
          >
            <Zap className="w-4 h-4 mr-2" />
            Real-time Stream
          </Button>
        </div>
      </div>

      {/* Connection Stats */}
      <div className="p-3 border-t border-dashboard-border bg-dashboard-surface">
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <div className="font-semibold text-dashboard-text">
              {connections.filter((c) => c.status === "connected").length}
            </div>
            <div className="text-dashboard-text-muted">Active</div>
          </div>
          <div>
            <div className="font-semibold text-dashboard-text">
              {connections
                .reduce((sum, c) => sum + c.records, 0)
                .toLocaleString()}
            </div>
            <div className="text-dashboard-text-muted">Records</div>
          </div>
          <div>
            <div className="font-semibold text-dashboard-text">
              {connections.reduce((sum, c) => sum + c.tables.length, 0)}
            </div>
            <div className="text-dashboard-text-muted">Tables</div>
          </div>
        </div>
      </div>
    </div>
  );
}
