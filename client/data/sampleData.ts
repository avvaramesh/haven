// Sample datasets for dashboard charts
export interface DataPoint {
  id: string;
  label: string;
  value: number;
  category?: string;
  date?: string;
  metadata?: Record<string, any>;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  category: "hr" | "marketing" | "sales" | "finance";
  data: DataPoint[];
  chartTypes: string[];
}

// HR Data
export const hrEmployeeData: Dataset = {
  id: "hr-employee-count",
  name: "Employee Count by Department",
  description: "Total number of employees across different departments",
  category: "hr",
  chartTypes: ["bar", "pie", "donut"],
  data: [
    { id: "1", label: "Engineering", value: 85, category: "department" },
    { id: "2", label: "Marketing", value: 32, category: "department" },
    { id: "3", label: "Sales", value: 45, category: "department" },
    { id: "4", label: "HR", value: 12, category: "department" },
    { id: "5", label: "Finance", value: 18, category: "department" },
    { id: "6", label: "Operations", value: 28, category: "department" },
  ],
};

export const hrSalaryData: Dataset = {
  id: "hr-salary-trends",
  name: "Average Salary Trends",
  description: "Monthly average salary trends across the organization",
  category: "hr",
  chartTypes: ["line", "area"],
  data: [
    {
      id: "1",
      label: "Jan",
      value: 75000,
      date: "2024-01",
      metadata: { employees: 180 },
    },
    {
      id: "2",
      label: "Feb",
      value: 76200,
      date: "2024-02",
      metadata: { employees: 185 },
    },
    {
      id: "3",
      label: "Mar",
      value: 77500,
      date: "2024-03",
      metadata: { employees: 190 },
    },
    {
      id: "4",
      label: "Apr",
      value: 78800,
      date: "2024-04",
      metadata: { employees: 195 },
    },
    {
      id: "5",
      label: "May",
      value: 79200,
      date: "2024-05",
      metadata: { employees: 200 },
    },
    {
      id: "6",
      label: "Jun",
      value: 80500,
      date: "2024-06",
      metadata: { employees: 205 },
    },
    {
      id: "7",
      label: "Jul",
      value: 81200,
      date: "2024-07",
      metadata: { employees: 210 },
    },
    {
      id: "8",
      label: "Aug",
      value: 82000,
      date: "2024-08",
      metadata: { employees: 215 },
    },
    {
      id: "9",
      label: "Sep",
      value: 82800,
      date: "2024-09",
      metadata: { employees: 220 },
    },
    {
      id: "10",
      label: "Oct",
      value: 83500,
      date: "2024-10",
      metadata: { employees: 225 },
    },
    {
      id: "11",
      label: "Nov",
      value: 84200,
      date: "2024-11",
      metadata: { employees: 230 },
    },
    {
      id: "12",
      label: "Dec",
      value: 85000,
      date: "2024-12",
      metadata: { employees: 235 },
    },
  ],
};

export const hrRetentionData: Dataset = {
  id: "hr-retention-rate",
  name: "Employee Retention Rate",
  description: "Quarterly employee retention rates by department",
  category: "hr",
  chartTypes: ["bar", "line"],
  data: [
    { id: "1", label: "Engineering", value: 94, category: "Q4 2024" },
    { id: "2", label: "Marketing", value: 87, category: "Q4 2024" },
    { id: "3", label: "Sales", value: 82, category: "Q4 2024" },
    { id: "4", label: "HR", value: 96, category: "Q4 2024" },
    { id: "5", label: "Finance", value: 91, category: "Q4 2024" },
    { id: "6", label: "Operations", value: 89, category: "Q4 2024" },
  ],
};

// Marketing Data
export const marketingCampaignData: Dataset = {
  id: "marketing-campaign-performance",
  name: "Campaign Performance",
  description: "Marketing campaign performance across different channels",
  category: "marketing",
  chartTypes: ["bar", "pie", "donut"],
  data: [
    {
      id: "1",
      label: "Social Media",
      value: 45000,
      category: "impressions",
      metadata: { conversion: 3.2 },
    },
    {
      id: "2",
      label: "Email",
      value: 28000,
      category: "impressions",
      metadata: { conversion: 5.8 },
    },
    {
      id: "3",
      label: "Google Ads",
      value: 62000,
      category: "impressions",
      metadata: { conversion: 4.1 },
    },
    {
      id: "4",
      label: "Content Marketing",
      value: 35000,
      category: "impressions",
      metadata: { conversion: 2.9 },
    },
    {
      id: "5",
      label: "SEO",
      value: 42000,
      category: "impressions",
      metadata: { conversion: 6.2 },
    },
    {
      id: "6",
      label: "Influencer",
      value: 18000,
      category: "impressions",
      metadata: { conversion: 4.7 },
    },
  ],
};

export const marketingBudgetData: Dataset = {
  id: "marketing-budget-allocation",
  name: "Marketing Budget Allocation",
  description: "Monthly marketing budget allocation across channels",
  category: "marketing",
  chartTypes: ["pie", "donut", "bar"],
  data: [
    { id: "1", label: "Digital Ads", value: 85000, category: "budget" },
    { id: "2", label: "Content Creation", value: 35000, category: "budget" },
    { id: "3", label: "Events", value: 45000, category: "budget" },
    { id: "4", label: "PR & Media", value: 25000, category: "budget" },
    { id: "5", label: "Tools & Software", value: 15000, category: "budget" },
    { id: "6", label: "Partnerships", value: 20000, category: "budget" },
  ],
};

export const marketingLeadsData: Dataset = {
  id: "marketing-leads-monthly",
  name: "Monthly Lead Generation",
  description: "Lead generation trends over the past 12 months",
  category: "marketing",
  chartTypes: ["line", "area", "bar"],
  data: [
    {
      id: "1",
      label: "Jan",
      value: 245,
      date: "2024-01",
      metadata: { qualified: 89 },
    },
    {
      id: "2",
      label: "Feb",
      value: 312,
      date: "2024-02",
      metadata: { qualified: 124 },
    },
    {
      id: "3",
      label: "Mar",
      value: 398,
      date: "2024-03",
      metadata: { qualified: 156 },
    },
    {
      id: "4",
      label: "Apr",
      value: 456,
      date: "2024-04",
      metadata: { qualified: 189 },
    },
    {
      id: "5",
      label: "May",
      value: 523,
      date: "2024-05",
      metadata: { qualified: 215 },
    },
    {
      id: "6",
      label: "Jun",
      value: 612,
      date: "2024-06",
      metadata: { qualified: 267 },
    },
    {
      id: "7",
      label: "Jul",
      value: 589,
      date: "2024-07",
      metadata: { qualified: 241 },
    },
    {
      id: "8",
      label: "Aug",
      value: 678,
      date: "2024-08",
      metadata: { qualified: 298 },
    },
    {
      id: "9",
      label: "Sep",
      value: 734,
      date: "2024-09",
      metadata: { qualified: 324 },
    },
    {
      id: "10",
      label: "Oct",
      value: 812,
      date: "2024-10",
      metadata: { qualified: 367 },
    },
    {
      id: "11",
      label: "Nov",
      value: 756,
      date: "2024-11",
      metadata: { qualified: 342 },
    },
    {
      id: "12",
      label: "Dec",
      value: 823,
      date: "2024-12",
      metadata: { qualified: 389 },
    },
  ],
};

// Sales Data
export const salesRevenueData: Dataset = {
  id: "sales-revenue-quarterly",
  name: "Quarterly Revenue",
  description: "Quarterly revenue breakdown by product category",
  category: "sales",
  chartTypes: ["bar", "line", "area"],
  data: [
    { id: "1", label: "Software Licenses", value: 450000, category: "Q4 2024" },
    {
      id: "2",
      label: "Professional Services",
      value: 280000,
      category: "Q4 2024",
    },
    {
      id: "3",
      label: "Support & Maintenance",
      value: 320000,
      category: "Q4 2024",
    },
    { id: "4", label: "Training", value: 125000, category: "Q4 2024" },
    { id: "5", label: "Hardware", value: 180000, category: "Q4 2024" },
  ],
};

// Finance Data
export const financeExpensesData: Dataset = {
  id: "finance-expenses-monthly",
  name: "Monthly Expenses",
  description: "Monthly expense breakdown by category",
  category: "finance",
  chartTypes: ["pie", "bar", "donut"],
  data: [
    {
      id: "1",
      label: "Salaries & Benefits",
      value: 850000,
      category: "expenses",
    },
    {
      id: "2",
      label: "Office & Facilities",
      value: 125000,
      category: "expenses",
    },
    { id: "3", label: "Technology", value: 95000, category: "expenses" },
    { id: "4", label: "Marketing", value: 180000, category: "expenses" },
    { id: "5", label: "Travel & Events", value: 45000, category: "expenses" },
    {
      id: "6",
      label: "Legal & Professional",
      value: 35000,
      category: "expenses",
    },
  ],
};

// Export all datasets
export const allDatasets: Dataset[] = [
  hrEmployeeData,
  hrSalaryData,
  hrRetentionData,
  marketingCampaignData,
  marketingBudgetData,
  marketingLeadsData,
  salesRevenueData,
  financeExpensesData,
];

// Helper function to get datasets by category
export const getDatasetsByCategory = (category: string): Dataset[] => {
  return allDatasets.filter((dataset) => dataset.category === category);
};

// Helper function to get dataset by id
export const getDatasetById = (id: string): Dataset | undefined => {
  return allDatasets.find((dataset) => dataset.id === id);
};
