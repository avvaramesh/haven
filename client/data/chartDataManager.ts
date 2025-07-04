// Comprehensive Chart Data Manager
// Provides realistic, consistent data for all chart types and variants

export interface ChartDataPoint {
  id: string;
  label: string;
  value: number;
  category?: string;
  date?: string;
  metadata?: Record<string, any>;
}

export interface ChartDataset {
  id: string;
  name: string;
  description: string;
  data: ChartDataPoint[];
  multiSeries?: Record<string, ChartDataPoint[]>;
}

// Color palette system for consistency across all charts
export const CHART_COLORS = {
  primary: "hsl(199, 89%, 48%)",
  secondary: "hsl(142, 76%, 36%)",
  tertiary: "hsl(271, 81%, 56%)",
  quaternary: "hsl(48, 96%, 53%)",
  quintenary: "hsl(0, 84%, 60%)",
  palette: [
    "hsl(199, 89%, 48%)", // Blue
    "hsl(142, 76%, 36%)", // Green
    "hsl(271, 81%, 56%)", // Purple
    "hsl(48, 96%, 53%)", // Yellow
    "hsl(0, 84%, 60%)", // Red
    "hsl(24, 95%, 53%)", // Orange
    "hsl(195, 100%, 50%)", // Cyan
    "hsl(142, 70%, 45%)", // Emerald
  ],
};

// Realistic sample datasets for different chart types
export const CHART_DATASETS = {
  // Revenue and Sales Data
  quarterlyRevenue: {
    id: "quarterly-revenue",
    name: "Quarterly Revenue",
    description: "Revenue breakdown by quarter",
    data: [
      {
        id: "q1",
        label: "Q1 2024",
        value: 485000,
        category: "revenue",
        metadata: { growth: "+12%" },
      },
      {
        id: "q2",
        label: "Q2 2024",
        value: 520000,
        category: "revenue",
        metadata: { growth: "+7%" },
      },
      {
        id: "q3",
        label: "Q3 2024",
        value: 565000,
        category: "revenue",
        metadata: { growth: "+9%" },
      },
      {
        id: "q4",
        label: "Q4 2024",
        value: 612000,
        category: "revenue",
        metadata: { growth: "+8%" },
      },
    ],
    multiSeries: {
      detailed: [
        {
          id: "q1-product",
          label: "Q1 Products",
          value: 320000,
          category: "products",
        },
        {
          id: "q1-services",
          label: "Q1 Services",
          value: 165000,
          category: "services",
        },
        {
          id: "q2-product",
          label: "Q2 Products",
          value: 342000,
          category: "products",
        },
        {
          id: "q2-services",
          label: "Q2 Services",
          value: 178000,
          category: "services",
        },
      ],
    },
  },

  // Product Categories Data
  productCategories: {
    id: "product-categories",
    name: "Product Categories",
    description: "Sales by product category",
    data: [
      {
        id: "electronics",
        label: "Electronics",
        value: 245000,
        category: "hardware",
        metadata: { units: 1250, avgPrice: 196 },
      },
      {
        id: "software",
        label: "Software",
        value: 180000,
        category: "digital",
        metadata: { licenses: 450, avgPrice: 400 },
      },
      {
        id: "accessories",
        label: "Accessories",
        value: 95000,
        category: "hardware",
        metadata: { units: 2100, avgPrice: 45 },
      },
      {
        id: "services",
        label: "Services",
        value: 140000,
        category: "services",
        metadata: { hours: 2800, avgRate: 50 },
      },
      {
        id: "subscriptions",
        label: "Subscriptions",
        value: 85000,
        category: "recurring",
        metadata: { subscribers: 340, avgMonthly: 25 },
      },
    ],
  },

  // Monthly Trends Data
  monthlyTrends: {
    id: "monthly-trends",
    name: "Monthly Performance",
    description: "Monthly performance metrics over time",
    data: [
      {
        id: "jan",
        label: "Jan",
        value: 42000,
        date: "2024-01",
        metadata: { customers: 1250, conversion: 3.2 },
      },
      {
        id: "feb",
        label: "Feb",
        value: 48000,
        date: "2024-02",
        metadata: { customers: 1340, conversion: 3.4 },
      },
      {
        id: "mar",
        label: "Mar",
        value: 52000,
        date: "2024-03",
        metadata: { customers: 1420, conversion: 3.6 },
      },
      {
        id: "apr",
        label: "Apr",
        value: 58000,
        date: "2024-04",
        metadata: { customers: 1520, conversion: 3.8 },
      },
      {
        id: "may",
        label: "May",
        value: 55000,
        date: "2024-05",
        metadata: { customers: 1480, conversion: 3.7 },
      },
      {
        id: "jun",
        label: "Jun",
        value: 62000,
        date: "2024-06",
        metadata: { customers: 1650, conversion: 4.1 },
      },
      {
        id: "jul",
        label: "Jul",
        value: 59000,
        date: "2024-07",
        metadata: { customers: 1580, conversion: 3.9 },
      },
      {
        id: "aug",
        label: "Aug",
        value: 68000,
        date: "2024-08",
        metadata: { customers: 1720, conversion: 4.3 },
      },
      {
        id: "sep",
        label: "Sep",
        value: 72000,
        date: "2024-09",
        metadata: { customers: 1850, conversion: 4.5 },
      },
      {
        id: "oct",
        label: "Oct",
        value: 78000,
        date: "2024-10",
        metadata: { customers: 1920, conversion: 4.7 },
      },
      {
        id: "nov",
        label: "Nov",
        value: 74000,
        date: "2024-11",
        metadata: { customers: 1880, conversion: 4.4 },
      },
      {
        id: "dec",
        label: "Dec",
        value: 82000,
        date: "2024-12",
        metadata: { customers: 2050, conversion: 4.9 },
      },
    ],
    multiSeries: {
      channels: [
        {
          id: "organic",
          label: "Organic",
          value: 32000,
          category: "acquisition",
        },
        {
          id: "paid",
          label: "Paid Ads",
          value: 28000,
          category: "acquisition",
        },
        {
          id: "social",
          label: "Social",
          value: 15000,
          category: "acquisition",
        },
        { id: "email", label: "Email", value: 7000, category: "retention" },
      ],
    },
  },

  // Regional Distribution
  regionalData: {
    id: "regional-data",
    name: "Regional Distribution",
    description: "Performance by geographic region",
    data: [
      {
        id: "north-america",
        label: "North America",
        value: 340000,
        category: "region",
        metadata: { countries: 3, growth: "+15%" },
      },
      {
        id: "europe",
        label: "Europe",
        value: 285000,
        category: "region",
        metadata: { countries: 12, growth: "+8%" },
      },
      {
        id: "asia-pacific",
        label: "Asia Pacific",
        value: 220000,
        category: "region",
        metadata: { countries: 8, growth: "+22%" },
      },
      {
        id: "latin-america",
        label: "Latin America",
        value: 95000,
        category: "region",
        metadata: { countries: 6, growth: "+18%" },
      },
      {
        id: "middle-east",
        label: "Middle East",
        value: 65000,
        category: "region",
        metadata: { countries: 4, growth: "+12%" },
      },
    ],
  },

  // Customer Segments
  customerSegments: {
    id: "customer-segments",
    name: "Customer Segments",
    description: "Revenue by customer segment",
    data: [
      {
        id: "enterprise",
        label: "Enterprise",
        value: 450000,
        category: "b2b",
        metadata: { accounts: 45, avgDeal: 10000 },
      },
      {
        id: "mid-market",
        label: "Mid-Market",
        value: 280000,
        category: "b2b",
        metadata: { accounts: 140, avgDeal: 2000 },
      },
      {
        id: "smb",
        label: "Small Business",
        value: 180000,
        category: "b2b",
        metadata: { accounts: 450, avgDeal: 400 },
      },
      {
        id: "consumer",
        label: "Consumer",
        value: 95000,
        category: "b2c",
        metadata: { customers: 9500, avgOrder: 10 },
      },
    ],
  },

  // Performance Metrics (for gauges, KPIs)
  performanceMetrics: {
    id: "performance-metrics",
    name: "Performance Metrics",
    description: "Key performance indicators",
    data: [
      {
        id: "customer-satisfaction",
        label: "Customer Satisfaction",
        value: 87,
        category: "satisfaction",
        metadata: { target: 90, unit: "%" },
      },
      {
        id: "revenue-growth",
        label: "Revenue Growth",
        value: 24,
        category: "growth",
        metadata: { target: 20, unit: "%" },
      },
      {
        id: "market-share",
        label: "Market Share",
        value: 15.8,
        category: "market",
        metadata: { target: 18, unit: "%" },
      },
      {
        id: "operational-efficiency",
        label: "Operational Efficiency",
        value: 92,
        category: "efficiency",
        metadata: { target: 95, unit: "%" },
      },
    ],
  },

  // Funnel Data
  conversionFunnel: {
    id: "conversion-funnel",
    name: "Conversion Funnel",
    description: "Sales conversion funnel analysis",
    data: [
      {
        id: "visitors",
        label: "Website Visitors",
        value: 50000,
        category: "awareness",
        metadata: { rate: 100, source: "organic+paid" },
      },
      {
        id: "leads",
        label: "Qualified Leads",
        value: 12500,
        category: "interest",
        metadata: { rate: 25, source: "forms+demos" },
      },
      {
        id: "opportunities",
        label: "Sales Opportunities",
        value: 3750,
        category: "consideration",
        metadata: { rate: 30, source: "sales-qualified" },
      },
      {
        id: "customers",
        label: "New Customers",
        value: 1125,
        category: "conversion",
        metadata: { rate: 30, source: "closed-won" },
      },
      {
        id: "advocates",
        label: "Brand Advocates",
        value: 450,
        category: "loyalty",
        metadata: { rate: 40, source: "referrals" },
      },
    ],
  },

  // Time-based Activity Data (for heatmaps)
  activityHeatmap: {
    id: "activity-heatmap",
    name: "User Activity Heatmap",
    description: "User activity patterns by day and hour",
    data: Array.from({ length: 168 }, (_, i) => {
      const day = Math.floor(i / 24);
      const hour = i % 24;
      const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const baseActivity = day < 5 ? 60 : 30; // Weekday vs weekend
      const hourMultiplier =
        hour >= 9 && hour <= 17 ? 1.5 : hour >= 6 && hour <= 22 ? 1 : 0.3;
      const value = Math.round(
        baseActivity * hourMultiplier * (0.7 + Math.random() * 0.6),
      );

      return {
        id: `${day}-${hour}`,
        label: `${dayNames[day]} ${hour}:00`,
        value,
        category: "activity",
        metadata: { day: dayNames[day], hour, dayOfWeek: day },
      };
    }),
  },

  // Hierarchical Data (for treemaps)
  marketHierarchy: {
    id: "market-hierarchy",
    name: "Market Hierarchy",
    description: "Hierarchical market segment analysis",
    data: [
      // Tech Sector
      {
        id: "tech-saas",
        label: "SaaS",
        value: 285000,
        category: "technology",
        metadata: { parent: "technology", growth: "+25%" },
      },
      {
        id: "tech-hardware",
        label: "Hardware",
        value: 195000,
        category: "technology",
        metadata: { parent: "technology", growth: "+8%" },
      },
      {
        id: "tech-mobile",
        label: "Mobile Apps",
        value: 145000,
        category: "technology",
        metadata: { parent: "technology", growth: "+18%" },
      },

      // Finance Sector
      {
        id: "finance-corporate",
        label: "Corporate",
        value: 220000,
        category: "finance",
        metadata: { parent: "finance", growth: "+12%" },
      },
      {
        id: "finance-retail",
        label: "Retail Banking",
        value: 165000,
        category: "finance",
        metadata: { parent: "finance", growth: "+6%" },
      },
      {
        id: "finance-fintech",
        label: "Fintech",
        value: 95000,
        category: "finance",
        metadata: { parent: "finance", growth: "+35%" },
      },

      // Healthcare Sector
      {
        id: "health-digital",
        label: "Digital Health",
        value: 125000,
        category: "healthcare",
        metadata: { parent: "healthcare", growth: "+28%" },
      },
      {
        id: "health-devices",
        label: "Medical Devices",
        value: 95000,
        category: "healthcare",
        metadata: { parent: "healthcare", growth: "+15%" },
      },
    ],
  },

  // Correlation Data (for scatter plots)
  correlationData: {
    id: "correlation-data",
    name: "Marketing ROI Correlation",
    description: "Marketing spend vs revenue correlation",
    data: Array.from({ length: 50 }, (_, i) => {
      const spend = 5000 + Math.random() * 45000; // $5K to $50K spend
      const efficiency = 0.8 + Math.random() * 0.4; // 80% to 120% efficiency
      const revenue = spend * efficiency * (2 + Math.random() * 1.5); // 2x to 3.5x return
      const category =
        spend < 15000 ? "small" : spend < 30000 ? "medium" : "large";

      return {
        id: `campaign-${i}`,
        label: `Campaign ${i + 1}`,
        value: Math.round(revenue),
        category,
        metadata: {
          spend: Math.round(spend),
          roi: Math.round((revenue / spend) * 100),
          efficiency: Math.round(efficiency * 100),
        },
      };
    }),
  },
};

// Chart-specific data getters
export const getDataForChartType = (chartType: string): ChartDataset => {
  // Normalize chart type
  const normalizedType = chartType.toLowerCase();

  if (normalizedType.includes("bar") || normalizedType.includes("column")) {
    return normalizedType.includes("revenue")
      ? CHART_DATASETS.quarterlyRevenue
      : CHART_DATASETS.productCategories;
  }

  if (normalizedType.includes("line") || normalizedType.includes("trend")) {
    return CHART_DATASETS.monthlyTrends;
  }

  if (normalizedType.includes("pie") || normalizedType.includes("donut")) {
    return CHART_DATASETS.customerSegments;
  }

  if (normalizedType.includes("area") || normalizedType.includes("filled")) {
    return CHART_DATASETS.monthlyTrends;
  }

  if (normalizedType.includes("gauge") || normalizedType.includes("kpi")) {
    return CHART_DATASETS.performanceMetrics;
  }

  if (
    normalizedType.includes("funnel") ||
    normalizedType.includes("conversion")
  ) {
    return CHART_DATASETS.conversionFunnel;
  }

  if (
    normalizedType.includes("heatmap") ||
    normalizedType.includes("activity")
  ) {
    return CHART_DATASETS.activityHeatmap;
  }

  if (
    normalizedType.includes("treemap") ||
    normalizedType.includes("hierarchy")
  ) {
    return CHART_DATASETS.marketHierarchy;
  }

  if (
    normalizedType.includes("scatter") ||
    normalizedType.includes("correlation")
  ) {
    return CHART_DATASETS.correlationData;
  }

  if (
    normalizedType.includes("waterfall") ||
    normalizedType.includes("bridge")
  ) {
    return CHART_DATASETS.quarterlyRevenue;
  }

  // Default fallback
  return CHART_DATASETS.monthlyTrends;
};

// Standardized tooltip formatter
export const formatTooltipValue = (
  value: number,
  type: "currency" | "percentage" | "number" = "number",
): string => {
  switch (type) {
    case "currency":
      return `$${value.toLocaleString()}`;
    case "percentage":
      return `${value.toFixed(1)}%`;
    default:
      return value.toLocaleString();
  }
};

// Color utilities
export const getColorByIndex = (index: number): string => {
  return CHART_COLORS.palette[index % CHART_COLORS.palette.length];
};

export const getColorPalette = (count: number): string[] => {
  return Array.from({ length: count }, (_, i) => getColorByIndex(i));
};

// Data transformation utilities
export const transformForRechartsBar = (
  dataset: ChartDataset,
  isHorizontal = false,
) => {
  return dataset.data.map((item) => ({
    name: item.label,
    value: item.value,
    category: item.category,
    label: item.label,
    metadata: item.metadata,
    [isHorizontal ? "y" : "x"]: item.label,
    [isHorizontal ? "x" : "y"]: item.value,
  }));
};

export const transformForRechartsPie = (dataset: ChartDataset) => {
  return dataset.data.map((item) => ({
    name: item.label,
    value: item.value,
    label: item.label,
    category: item.category,
    metadata: item.metadata,
  }));
};

export const transformForRechartsLine = (dataset: ChartDataset) => {
  return dataset.data.map((item) => ({
    name: item.label,
    value: item.value,
    label: item.label,
    date: item.date,
    metadata: item.metadata,
  }));
};

export const transformForMultiSeries = (
  dataset: ChartDataset,
  seriesKeys: string[],
) => {
  if (!dataset.multiSeries) {
    // Create multi-series from single series by splitting data
    const itemsPerSeries = Math.ceil(dataset.data.length / seriesKeys.length);
    return dataset.data.map((item, index) => {
      const result: any = { name: item.label, label: item.label };
      seriesKeys.forEach((key, keyIndex) => {
        const seriesIndex = Math.floor(index / itemsPerSeries);
        result[key] =
          seriesIndex === keyIndex
            ? item.value
            : Math.round(item.value * (0.7 + Math.random() * 0.6));
      });
      return result;
    });
  }

  // Use existing multi-series data
  return Object.values(dataset.multiSeries)[0] || dataset.data;
};
