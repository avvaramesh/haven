import {
  Brain,
  Database,
  Users,
  TrendingUp,
  Package,
  Sparkles,
} from "lucide-react";

export default function Sidebar() {
  const navigationItems = [
    { name: "AI Assistant", icon: Brain, active: true, isAI: true },
    { name: "Smart Analytics", icon: TrendingUp, active: false, isAI: true },
    { name: "Orders", icon: Package, active: false, isAI: false },
    { name: "Customers", icon: Users, active: false, isAI: false },
    { name: "Data Sources", icon: Database, active: false, isAI: false },
  ];

  return (
    <div className="w-64 bg-dashboard-background border-r border-dashboard-border flex flex-col">
      <div className="p-6 border-b border-dashboard-border">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-dashboard-accent" />
          <h1 className="text-xl font-semibold text-dashboard-text">DATA</h1>
        </div>
        <p className="text-xs text-dashboard-text-muted mt-1">
          AI-powered analytics
        </p>
      </div>
      <nav className="flex-1 py-4">
        {navigationItems.map((item, index) => (
          <button
            key={index}
            className={`w-full px-6 py-3 text-left text-sm transition-colors flex items-center gap-3 ${
              item.active
                ? "text-dashboard-text bg-dashboard-muted border-r-2 border-dashboard-accent"
                : "text-dashboard-text-muted hover:text-dashboard-text hover:bg-dashboard-muted"
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span className="flex-1">{item.name}</span>
            {item.isAI && (
              <Sparkles className="w-3 h-3 text-dashboard-accent" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-dashboard-border">
        <div className="p-3 bg-dashboard-surface border border-dashboard-border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-dashboard-accent" />
            <span className="text-xs font-medium text-dashboard-text">
              AI Status
            </span>
          </div>
          <p className="text-xs text-dashboard-text-muted">
            Processing 12 insights
          </p>
          <div className="mt-2 h-1 bg-dashboard-muted rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-dashboard-accent rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
