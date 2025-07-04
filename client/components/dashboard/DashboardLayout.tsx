import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
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
          <h1 className="text-2xl font-semibold text-dashboard-text">CANVAS</h1>
          <Button className="bg-dashboard-muted hover:bg-dashboard-border text-dashboard-text border-dashboard-border">
            Save
          </Button>
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
