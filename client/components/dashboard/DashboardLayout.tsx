import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles } from "lucide-react";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import RightPanel from "./RightPanel";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-screen flex bg-dashboard-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-dashboard-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-dashboard-accent" />
              <h1 className="text-2xl font-semibold text-dashboard-text">
                AI CANVAS
              </h1>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-dashboard-accent/20 rounded-full">
              <Sparkles className="w-3 h-3 text-dashboard-accent" />
              <span className="text-xs text-dashboard-accent font-medium">
                AI Enhanced
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-dashboard-border text-dashboard-text hover:bg-dashboard-muted"
            >
              Export Report
            </Button>
            <Button className="bg-dashboard-accent hover:bg-dashboard-accent-light text-white">
              Save
            </Button>
          </div>
        </div>
        <Toolbar />
        <div className="flex-1 flex">
          <div className="flex-1 p-6">{children}</div>
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
