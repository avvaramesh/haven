import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ChartWidget from "@/components/dashboard/ChartWidget";
import AIPropertyEditor from "@/components/dashboard/AIPropertyEditor";
import AIDashboardOptimizer from "@/components/dashboard/AIDashboardOptimizer";
import AIDataSourceManager from "@/components/dashboard/AIDataSourceManager";
import SmartChart from "@/components/dashboard/SmartChart";
import QueryBuilder from "@/components/dashboard/QueryBuilder";
import RevenueByCategoryChart from "@/components/dashboard/RevenueByCategoryChart";
import KPIWidget from "@/components/dashboard/KPIWidget";
import SalesDistributionChart from "@/components/dashboard/SalesDistributionChart";
import AIGeneratorTrigger from "@/components/dashboard/AIGeneratorTrigger";

export default function Index() {
  return (
    <>
      <DashboardLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
          {/* Smart Chart with AI Annotations - Featured chart */}
          <ChartWidget title="" className="md:col-span-2 lg:col-span-2">
            <SmartChart />
          </ChartWidget>

          {/* AI Property Editor - For customizing chart properties */}
          <ChartWidget
            title=""
            className="md:col-span-1 lg:col-span-1 row-span-2"
          >
            <AIPropertyEditor />
          </ChartWidget>

          {/* Traditional charts enhanced with AI */}
          <ChartWidget
            title="Revenue by Category"
            className="md:col-span-1 lg:col-span-1"
          >
            <RevenueByCategoryChart />
          </ChartWidget>

          {/* KPI widget that can be customized */}
          <ChartWidget
            title="KPI Dashboard"
            className="md:col-span-1 lg:col-span-1"
          >
            <KPIWidget />
          </ChartWidget>

          {/* AI Query Builder for natural language chart creation */}
          <ChartWidget title="" className="md:col-span-1 lg:col-span-1">
            <QueryBuilder />
          </ChartWidget>

          {/* Sales distribution */}
          <ChartWidget
            title="Sales Distribution"
            className="md:col-span-1 lg:col-span-1"
          >
            <SalesDistributionChart />
          </ChartWidget>

          {/* Dashboard Optimizer - AI suggestions for improving layout */}
          <ChartWidget title="" className="md:col-span-2 lg:col-span-2">
            <AIDashboardOptimizer />
          </ChartWidget>

          {/* Data Source Manager - AI-powered data connections */}
          <ChartWidget title="" className="md:col-span-2 lg:col-span-1">
            <AIDataSourceManager />
          </ChartWidget>
        </div>
      </DashboardLayout>

      {/* Floating AI Chart Generator - Always accessible */}
      <AIGeneratorTrigger />
    </>
  );
}
