import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Edit, ChevronUp, ChevronDown, Download } from "lucide-react";

interface TableColumn {
  id: string;
  name: string;
  type: "text" | "number" | "date" | "currency";
  width?: number;
  sortable?: boolean;
}

interface TableData {
  [key: string]: any;
}

interface TableChartProps {
  properties?: {
    title?: string;
    showHeader?: boolean;
    alternateRows?: boolean;
    showBorders?: boolean;
    fontSize?: number;
    headerColor?: string;
    rowColor?: string;
    alternateRowColor?: string;
    columns?: TableColumn[];
    data?: TableData[];
    sortColumn?: string;
    sortDirection?: "asc" | "desc";
    editable?: boolean;
    chartType?: string;
  };
}

const defaultColumns: TableColumn[] = [
  { id: "id", name: "ID", type: "number", width: 80, sortable: true },
  { id: "name", name: "Name", type: "text", width: 150, sortable: true },
  {
    id: "category",
    name: "Category",
    type: "text",
    width: 120,
    sortable: true,
  },
  { id: "value", name: "Value", type: "currency", width: 100, sortable: true },
  { id: "date", name: "Date", type: "date", width: 120, sortable: true },
];

const defaultData: TableData[] = [
  {
    id: 1,
    name: "Product A",
    category: "Electronics",
    value: 299.99,
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Product B",
    category: "Clothing",
    value: 49.99,
    date: "2024-01-16",
  },
  {
    id: 3,
    name: "Product C",
    category: "Home",
    value: 129.99,
    date: "2024-01-17",
  },
  {
    id: 4,
    name: "Product D",
    category: "Electronics",
    value: 599.99,
    date: "2024-01-18",
  },
  {
    id: 5,
    name: "Product E",
    category: "Sports",
    value: 89.99,
    date: "2024-01-19",
  },
];

export default function TableChart({ properties }: TableChartProps = {}) {
  const [editingColumn, setEditingColumn] = useState<string | null>(null);
  const [newColumnName, setNewColumnName] = useState("");

  const columns = properties?.columns || defaultColumns;
  const data = properties?.data || defaultData;
  const sortColumn = properties?.sortColumn;
  const sortDirection = properties?.sortDirection || "asc";

  const formatCellValue = (value: any, type: string) => {
    switch (type) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value);
      case "date":
        return new Date(value).toLocaleDateString();
      case "number":
        return typeof value === "number" ? value.toLocaleString() : value;
      default:
        return value;
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleAddColumn = () => {
    if (!newColumnName.trim()) return;

    const newColumn: TableColumn = {
      id: newColumnName.toLowerCase().replace(/\s+/g, "_"),
      name: newColumnName,
      type: "text",
      width: 120,
      sortable: true,
    };

    // This would trigger a property change in a real implementation
    console.log("Add column:", newColumn);
    setNewColumnName("");
  };

  const handleRemoveColumn = (columnId: string) => {
    // This would trigger a property change in a real implementation
    console.log("Remove column:", columnId);
  };

  const handleColumnNameChange = (columnId: string, newName: string) => {
    // This would trigger a property change in a real implementation
    console.log("Update column name:", columnId, newName);
    setEditingColumn(null);
  };

  const handleSort = (columnId: string) => {
    const newDirection =
      sortColumn === columnId && sortDirection === "asc" ? "desc" : "asc";
    // This would trigger a property change in a real implementation
    console.log("Sort by:", columnId, newDirection);
  };

  const handleExportCSV = () => {
    const csvContent = [
      columns.map((col) => col.name).join(","),
      ...sortedData.map((row) =>
        columns
          .map((col) => {
            const value = row[col.id];
            // Escape commas and quotes in CSV
            if (
              typeof value === "string" &&
              (value.includes(",") || value.includes('"'))
            ) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          })
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `table-data-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Table Controls */}
      <div className="flex items-center justify-between pb-2 border-b border-dashboard-border">
        {properties?.editable && (
          <div className="flex items-center gap-2">
            <Input
              placeholder="Column name"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              className="w-32"
              onKeyPress={(e) => e.key === "Enter" && handleAddColumn()}
            />
            <Button size="sm" onClick={handleAddColumn} className="text-xs">
              <Plus className="w-3 h-3 mr-1" />
              Add Column
            </Button>
          </div>
        )}
        <Button
          size="sm"
          variant="outline"
          onClick={handleExportCSV}
          className="text-xs"
        >
          <Download className="w-3 h-3 mr-1" />
          Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-auto max-h-64">
        <table className="w-full text-sm">
          {/* Header */}
          {properties?.showHeader !== false && (
            <thead>
              <tr
                className={`border-b-2 border-dashboard-border`}
                style={{
                  backgroundColor:
                    properties?.headerColor || "hsl(210, 11%, 15%)",
                  fontSize: properties?.fontSize
                    ? `${properties.fontSize}px`
                    : "12px",
                }}
              >
                {columns.map((column) => (
                  <th
                    key={column.id}
                    className="text-left p-2 text-dashboard-text font-medium relative group"
                    style={{ width: column.width }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {editingColumn === column.id ? (
                          <Input
                            defaultValue={column.name}
                            className="h-6 text-xs"
                            autoFocus
                            onBlur={(e) =>
                              handleColumnNameChange(column.id, e.target.value)
                            }
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleColumnNameChange(
                                  column.id,
                                  e.currentTarget.value,
                                );
                              }
                            }}
                          />
                        ) : (
                          <span
                            className={
                              column.sortable
                                ? "cursor-pointer hover:text-dashboard-accent"
                                : ""
                            }
                            onClick={() =>
                              column.sortable && handleSort(column.id)
                            }
                          >
                            {column.name}
                          </span>
                        )}

                        {column.sortable && sortColumn === column.id && (
                          <span className="text-dashboard-accent">
                            {sortDirection === "asc" ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : (
                              <ChevronDown className="w-3 h-3" />
                            )}
                          </span>
                        )}
                      </div>

                      {properties?.editable && (
                        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-4 w-4 p-0"
                            onClick={() => setEditingColumn(column.id)}
                          >
                            <Edit className="w-2 h-2" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-4 w-4 p-0 text-red-400 hover:text-red-300"
                            onClick={() => handleRemoveColumn(column.id)}
                          >
                            <X className="w-2 h-2" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          )}

          {/* Body */}
          <tbody>
            {sortedData.map((row, index) => (
              <tr
                key={index}
                className={`
                  ${properties?.showBorders !== false ? "border-b border-dashboard-border" : ""}
                  ${properties?.alternateRows && index % 2 === 1 ? "bg-dashboard-muted" : ""}
                  hover:bg-dashboard-accent/10 transition-colors
                `}
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? properties?.rowColor || "transparent"
                      : properties?.alternateRowColor ||
                        (properties?.alternateRows
                          ? "hsl(210, 11%, 15%)"
                          : "transparent"),
                  fontSize: properties?.fontSize
                    ? `${properties.fontSize}px`
                    : "12px",
                }}
              >
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className="p-2 text-dashboard-text"
                    style={{ width: column.width }}
                  >
                    {formatCellValue(row[column.id], column.type)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Info */}
      <div className="text-xs text-dashboard-text-muted">
        Showing {sortedData.length} rows • {columns.length} columns
      </div>
    </div>
  );
}
