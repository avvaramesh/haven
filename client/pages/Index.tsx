import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ChartWidget from "@/components/dashboard/ChartWidget";
import SalesOverTimeChart from "@/components/dashboard/SalesOverTimeChart";
import RevenueByCategoryChart from "@/components/dashboard/RevenueByCategoryChart";
import OrderDataTable from "@/components/dashboard/OrderDataTable";
import KPIWidget from "@/components/dashboard/KPIWidget";
import SalesDistributionChart from "@/components/dashboard/SalesDistributionChart";
import ProfitMarginChart from "@/components/dashboard/ProfitMarginChart";

export default function Index() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
        <ChartWidget
          title="Sales Over Time"
          className="md:col-span-1 lg:col-span-1"
        >
          <SalesOverTimeChart />
        </ChartWidget>

        <ChartWidget
          title="Revenue by Category"
          className="md:col-span-1 lg:col-span-1"
        >
          <RevenueByCategoryChart />
        </ChartWidget>

        <ChartWidget
          title="KPI"
          className="md:col-span-1 lg:col-span-1 row-span-2"
        >
          <KPIWidget />
        </ChartWidget>

        <ChartWidget title="Order Data" className="md:col-span-2 lg:col-span-1">
          <OrderDataTable />
        </ChartWidget>

        <ChartWidget
          title="Sales Distribution"
          className="md:col-span-1 lg:col-span-1"
        >
          <SalesDistributionChart />
        </ChartWidget>

        <ChartWidget
          title="Profit Margin"
          className="md:col-span-2 lg:col-span-2"
        >
          <ProfitMarginChart />
        </ChartWidget>
      </div>
    </DashboardLayout>
  );
}
