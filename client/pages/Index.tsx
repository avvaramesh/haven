import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ChartWidget from "@/components/dashboard/ChartWidget";
import AIAssistant from "@/components/dashboard/AIAssistant";
import AIInsights from "@/components/dashboard/AIInsights";
import SmartChart from "@/components/dashboard/SmartChart";
import QueryBuilder from "@/components/dashboard/QueryBuilder";
import RevenueByCategoryChart from "@/components/dashboard/RevenueByCategoryChart";
import OrderDataTable from "@/components/dashboard/OrderDataTable";
import KPIWidget from "@/components/dashboard/KPIWidget";
import SalesDistributionChart from "@/components/dashboard/SalesDistributionChart";

export default function Index() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
        {/* AI Assistant Chat - Takes priority position */}
        <ChartWidget
          title=""
          className="md:col-span-1 lg:col-span-1 row-span-2"
        >
          <AIAssistant />
        </ChartWidget>

        {/* Smart Chart with AI Annotations */}
        <ChartWidget title="" className="md:col-span-1 lg:col-span-1">
          <SmartChart />
        </ChartWidget>

        {/* Traditional charts enhanced with AI */}
        <ChartWidget
          title="Revenue by Category"
          className="md:col-span-1 lg:col-span-1"
        >
          <RevenueByCategoryChart />
        </ChartWidget>

        {/* KPI with AI insights */}
        <ChartWidget
          title="KPI Dashboard"
          className="md:col-span-1 lg:col-span-1"
        >
          <KPIWidget />
        </ChartWidget>

        {/* AI Query Builder */}
        <ChartWidget title="" className="md:col-span-1 lg:col-span-1">
          <QueryBuilder />
        </ChartWidget>

        {/* Data table with AI enhancements */}
        <ChartWidget
          title="Smart Data Analysis"
          className="md:col-span-1 lg:col-span-1"
        >
          <OrderDataTable />
        </ChartWidget>

        {/* Sales distribution */}
        <ChartWidget
          title="Sales Distribution"
          className="md:col-span-1 lg:col-span-1"
        >
          <SalesDistributionChart />
        </ChartWidget>

        {/* AI Insights Panel */}
        <ChartWidget title="" className="md:col-span-1 lg:col-span-1">
          <AIInsights />
        </ChartWidget>
      </div>
    </DashboardLayout>
  );
}
