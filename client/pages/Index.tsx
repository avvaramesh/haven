import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ChartWidget from "@/components/dashboard/ChartWidget";
import AIChartGenerator from "@/components/dashboard/AIChartGenerator";
import AIPropertyEditor from "@/components/dashboard/AIPropertyEditor";
import AIDashboardOptimizer from "@/components/dashboard/AIDashboardOptimizer";
import AIDataSourceManager from "@/components/dashboard/AIDataSourceManager";
import SmartChart from "@/components/dashboard/SmartChart";
import QueryBuilder from "@/components/dashboard/QueryBuilder";
import RevenueByCategoryChart from "@/components/dashboard/RevenueByCategoryChart";
import KPIWidget from "@/components/dashboard/KPIWidget";
import SalesDistributionChart from "@/components/dashboard/SalesDistributionChart";

export default function Index() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
        {/* AI Chart Generator - Primary tool for creating charts */}
        <ChartWidget
          title=""
          className="md:col-span-1 lg:col-span-1 row-span-2"
        >
          <AIChartGenerator />
        </ChartWidget>

        {/* AI Property Editor - For customizing chart properties */}
        <ChartWidget
          title=""
          className="md:col-span-1 lg:col-span-1 row-span-2"
        >
          <AIPropertyEditor />
        </ChartWidget>

        {/* Smart Chart with AI Annotations - Example result */}
        <ChartWidget title="" className="md:col-span-1 lg:col-span-1">
          <SmartChart />
        </ChartWidget>

        {/* Traditional charts that can be edited */}
        <ChartWidget
          title="Revenue by Category"
          className="md:col-span-1 lg:col-span-1"
        >
          <RevenueByCategoryChart />
        </ChartWidget>

        {/* AI Query Builder for natural language chart creation */}
        <ChartWidget title="" className="md:col-span-1 lg:col-span-1">
          <QueryBuilder />
        </ChartWidget>

        {/* KPI widget that can be customized */}
        <ChartWidget
          title="KPI Dashboard"
          className="md:col-span-1 lg:col-span-1"
        >
          <KPIWidget />
        </ChartWidget>

        {/* Dashboard Optimizer - AI suggestions for improving layout */}
        <ChartWidget title="" className="md:col-span-2 lg:col-span-2">
          <AIDashboardOptimizer />
        </ChartWidget>

        {/* Data Source Manager - AI-powered data connections */}
        <ChartWidget title="" className="md:col-span-2 lg:col-span-2">
          <AIDataSourceManager />
        </ChartWidget>
      </div>
    </DashboardLayout>
  );
}
