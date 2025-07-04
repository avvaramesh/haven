// Normalized Chart Properties System
// This system provides consistent property structures for different chart types
// while handling the logical differences between chart types

export type ChartType =
  | "line"
  | "area"
  | "bar"
  | "column"
  | "pie"
  | "donut"
  | "scatter"
  | "radar"
  | "funnel"
  | "gauge";

export type KPIType = "metric" | "trend" | "progress" | "comparison";

export type VisualizationType = ChartType | KPIType | "table";

// Base properties that all visualizations share
export interface BaseProperties {
  id: string;
  type: VisualizationType;
  title: string;
  width: number;
  height: number;
  backgroundColor: string;
  borderRadius: number;
  opacity: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

// Typography properties
export interface TypographyProperties {
  fontSize: number;
  fontFamily: string;
  fontWeight: "normal" | "bold" | "lighter" | "bolder";
  textAlign: "left" | "center" | "right";
  textColor: string;
  titleFontSize: number;
  titleColor: string;
}

// Color properties
export interface ColorProperties {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  colorPalette: string[];
  gradientEnabled: boolean;
  gradientColors: [string, string];
}

// Animation properties
export interface AnimationProperties {
  animationEnabled: boolean;
  animationDuration: number;
  animationEasing: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";
  animationDelay: number;
}

// Data display properties
export interface DataDisplayProperties {
  showValues: boolean;
  valueFormat: "number" | "currency" | "percentage" | "custom";
  valuePrefix: string;
  valueSuffix: string;
  decimalPlaces: number;
  showTooltip: boolean;
  tooltipFormat: string;
}

// Chart-specific properties that apply to charts with axes
export interface AxisProperties {
  xAxis: {
    enabled: boolean;
    label: string;
    labelColor: string;
    labelFontSize: number;
    showGridLines: boolean;
    gridLineColor: string;
    tickCount: number;
    tickRotation: number;
    minValue?: number;
    maxValue?: number;
    autoScale: boolean;
  };
  yAxis: {
    enabled: boolean;
    label: string;
    labelColor: string;
    labelFontSize: number;
    showGridLines: boolean;
    gridLineColor: string;
    tickCount: number;
    tickRotation: number;
    minValue?: number;
    maxValue?: number;
    autoScale: boolean;
    startFromZero: boolean;
  };
}

// Chart-specific properties for different chart types
export interface LineChartProperties extends AxisProperties {
  lineWidth: number;
  pointSize: number;
  showDataPoints: boolean;
  smoothCurve: boolean;
  fillArea: boolean;
  areaOpacity: number;
  connectNulls: boolean;
}

export interface BarChartProperties extends AxisProperties {
  barWidth: number;
  barSpacing: number;
  borderWidth: number;
  borderColor: string;
  orientation: "horizontal" | "vertical";
  stackedMode: "none" | "normal" | "percent";
  showDataLabels: boolean;
}

export interface PieChartProperties {
  innerRadius: number; // 0 for pie, >0 for donut
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  showLabels: boolean;
  showPercentages: boolean;
  labelPosition: "inside" | "outside" | "none";
  labelConnectorEnabled: boolean;
  explodeDistance: number;
  explodedSlices: number[];
}

export interface ScatterChartProperties extends AxisProperties {
  pointSize: number;
  pointShape: "circle" | "square" | "triangle" | "diamond";
  showTrendLine: boolean;
  trendLineColor: string;
  trendLineWidth: number;
}

// Legend properties
export interface LegendProperties {
  enabled: boolean;
  position: "top" | "bottom" | "left" | "right";
  alignment: "start" | "center" | "end";
  orientation: "horizontal" | "vertical";
  fontSize: number;
  fontColor: string;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  itemSpacing: number;
  symbolSize: number;
  symbolShape: "circle" | "square" | "line";
}

// KPI-specific properties
export interface KPIProperties {
  value: string | number;
  unit: string;
  previousValue?: string | number;
  target?: string | number;
  trend: "up" | "down" | "neutral";
  trendPercentage?: number;
  showTrend: boolean;
  showTarget: boolean;
  showProgress: boolean;
  progressType: "linear" | "circular";
  icon?: string;
  iconColor: string;
  iconSize: number;
  sparklineData?: number[];
  showSparkline: boolean;
}

// Table-specific properties
export interface TableProperties {
  showHeader: boolean;
  headerBackgroundColor: string;
  headerTextColor: string;
  alternateRowColors: boolean;
  evenRowColor: string;
  oddRowColor: string;
  borderEnabled: boolean;
  borderColor: string;
  borderWidth: number;
  cellPadding: number;
  sortable: boolean;
  filterable: boolean;
  editable: boolean;
  pageSize: number;
  showPagination: boolean;
  columnWidths: Record<string, number>;
  columnAlignment: Record<string, "left" | "center" | "right">;
}

// Complete property interfaces for each visualization type
export interface LineChartCompleteProperties
  extends BaseProperties,
    TypographyProperties,
    ColorProperties,
    AnimationProperties,
    DataDisplayProperties,
    LegendProperties,
    LineChartProperties {}

export interface BarChartCompleteProperties
  extends BaseProperties,
    TypographyProperties,
    ColorProperties,
    AnimationProperties,
    DataDisplayProperties,
    LegendProperties,
    BarChartProperties {}

export interface PieChartCompleteProperties
  extends BaseProperties,
    TypographyProperties,
    ColorProperties,
    AnimationProperties,
    DataDisplayProperties,
    LegendProperties,
    PieChartProperties {}

export interface ScatterChartCompleteProperties
  extends BaseProperties,
    TypographyProperties,
    ColorProperties,
    AnimationProperties,
    DataDisplayProperties,
    LegendProperties,
    ScatterChartProperties {}

export interface KPICompleteProperties
  extends BaseProperties,
    TypographyProperties,
    ColorProperties,
    AnimationProperties,
    DataDisplayProperties,
    KPIProperties {}

export interface TableCompleteProperties
  extends BaseProperties,
    TypographyProperties,
    ColorProperties,
    AnimationProperties,
    DataDisplayProperties,
    TableProperties {}

// Union type for all complete properties
export type AllVisualizationProperties =
  | LineChartCompleteProperties
  | BarChartCompleteProperties
  | PieChartCompleteProperties
  | ScatterChartCompleteProperties
  | KPICompleteProperties
  | TableCompleteProperties;

// Default property factories
export const createDefaultBaseProperties = (
  type: VisualizationType,
  id: string = `${type}-${Date.now()}`,
): BaseProperties => ({
  id,
  type,
  title: `${type.charAt(0).toUpperCase() + type.slice(1)} Chart`,
  width: 400,
  height: 300,
  backgroundColor: "#1e293b",
  borderRadius: 8,
  opacity: 100,
  margin: { top: 20, right: 20, bottom: 20, left: 20 },
  padding: { top: 16, right: 16, bottom: 16, left: 16 },
});

export const createDefaultTypographyProperties = (): TypographyProperties => ({
  fontSize: 12,
  fontFamily: "Inter, system-ui, sans-serif",
  fontWeight: "normal",
  textAlign: "left",
  textColor: "#f8fafc",
  titleFontSize: 16,
  titleColor: "#f8fafc",
});

export const createDefaultColorProperties = (): ColorProperties => ({
  primaryColor: "#3b82f6",
  secondaryColor: "#10b981",
  accentColor: "#f59e0b",
  colorPalette: [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#ec4899",
    "#84cc16",
    "#f97316",
    "#6366f1",
  ],
  gradientEnabled: false,
  gradientColors: ["#3b82f6", "#06b6d4"],
});

export const createDefaultAnimationProperties = (): AnimationProperties => ({
  animationEnabled: true,
  animationDuration: 1000,
  animationEasing: "ease-out",
  animationDelay: 0,
});

export const createDefaultDataDisplayProperties =
  (): DataDisplayProperties => ({
    showValues: false,
    valueFormat: "number",
    valuePrefix: "",
    valueSuffix: "",
    decimalPlaces: 0,
    showTooltip: true,
    tooltipFormat: "default",
  });

export const createDefaultLegendProperties = (): LegendProperties => ({
  enabled: true,
  position: "bottom",
  alignment: "center",
  orientation: "horizontal",
  fontSize: 12,
  fontColor: "#f8fafc",
  backgroundColor: "transparent",
  borderColor: "transparent",
  borderWidth: 0,
  itemSpacing: 8,
  symbolSize: 12,
  symbolShape: "circle",
});

export const createDefaultAxisProperties = (): AxisProperties => ({
  xAxis: {
    enabled: true,
    label: "",
    labelColor: "#f8fafc",
    labelFontSize: 12,
    showGridLines: true,
    gridLineColor: "#374151",
    tickCount: 5,
    tickRotation: 0,
    autoScale: true,
  },
  yAxis: {
    enabled: true,
    label: "",
    labelColor: "#f8fafc",
    labelFontSize: 12,
    showGridLines: true,
    gridLineColor: "#374151",
    tickCount: 5,
    tickRotation: 0,
    autoScale: true,
    startFromZero: true,
  },
});

// Specific chart property factories
export const createDefaultLineChartProperties = (
  id?: string,
): LineChartCompleteProperties => ({
  ...createDefaultBaseProperties("line", id),
  ...createDefaultTypographyProperties(),
  ...createDefaultColorProperties(),
  ...createDefaultAnimationProperties(),
  ...createDefaultDataDisplayProperties(),
  ...createDefaultLegendProperties(),
  ...createDefaultAxisProperties(),
  lineWidth: 2,
  pointSize: 4,
  showDataPoints: true,
  smoothCurve: false,
  fillArea: false,
  areaOpacity: 0.3,
  connectNulls: false,
});

export const createDefaultBarChartProperties = (
  id?: string,
): BarChartCompleteProperties => ({
  ...createDefaultBaseProperties("bar", id),
  ...createDefaultTypographyProperties(),
  ...createDefaultColorProperties(),
  ...createDefaultAnimationProperties(),
  ...createDefaultDataDisplayProperties(),
  ...createDefaultLegendProperties(),
  ...createDefaultAxisProperties(),
  barWidth: 0.6,
  barSpacing: 0.1,
  borderWidth: 0,
  borderColor: "transparent",
  orientation: "vertical",
  stackedMode: "none",
  showDataLabels: false,
});

export const createDefaultPieChartProperties = (
  id?: string,
): PieChartCompleteProperties => ({
  ...createDefaultBaseProperties("pie", id),
  ...createDefaultTypographyProperties(),
  ...createDefaultColorProperties(),
  ...createDefaultAnimationProperties(),
  ...createDefaultDataDisplayProperties(),
  ...createDefaultLegendProperties(),
  innerRadius: 0, // 0 = pie chart, >0 = donut chart
  outerRadius: 100,
  startAngle: 0,
  endAngle: 360,
  showLabels: true,
  showPercentages: true,
  labelPosition: "outside",
  labelConnectorEnabled: true,
  explodeDistance: 0,
  explodedSlices: [],
});

export const createDefaultScatterChartProperties = (
  id?: string,
): ScatterChartCompleteProperties => ({
  ...createDefaultBaseProperties("scatter", id),
  ...createDefaultTypographyProperties(),
  ...createDefaultColorProperties(),
  ...createDefaultAnimationProperties(),
  ...createDefaultDataDisplayProperties(),
  ...createDefaultLegendProperties(),
  ...createDefaultAxisProperties(),
  pointSize: 6,
  pointShape: "circle",
  showTrendLine: false,
  trendLineColor: "#ef4444",
  trendLineWidth: 2,
});

export const createDefaultKPIProperties = (
  id?: string,
): KPICompleteProperties => ({
  ...createDefaultBaseProperties("metric", id),
  ...createDefaultTypographyProperties(),
  ...createDefaultColorProperties(),
  ...createDefaultAnimationProperties(),
  ...createDefaultDataDisplayProperties(),
  value: 0,
  unit: "",
  trend: "neutral",
  showTrend: true,
  showTarget: false,
  showProgress: false,
  progressType: "linear",
  iconColor: "#3b82f6",
  iconSize: 24,
  showSparkline: false,
});

export const createDefaultTableProperties = (
  id?: string,
): TableCompleteProperties => ({
  ...createDefaultBaseProperties("table", id),
  ...createDefaultTypographyProperties(),
  ...createDefaultColorProperties(),
  ...createDefaultAnimationProperties(),
  ...createDefaultDataDisplayProperties(),
  showHeader: true,
  headerBackgroundColor: "#374151",
  headerTextColor: "#f8fafc",
  alternateRowColors: true,
  evenRowColor: "transparent",
  oddRowColor: "#1f2937",
  borderEnabled: true,
  borderColor: "#374151",
  borderWidth: 1,
  cellPadding: 8,
  sortable: true,
  filterable: false,
  editable: false,
  pageSize: 10,
  showPagination: true,
  columnWidths: {},
  columnAlignment: {},
});

// Property validation helpers
export const validateChartProperties = (
  properties: AllVisualizationProperties,
): string[] => {
  const errors: string[] = [];

  // Validate base properties
  if (!properties.id) errors.push("ID is required");
  if (!properties.title) errors.push("Title is required");
  if (properties.width <= 0) errors.push("Width must be greater than 0");
  if (properties.height <= 0) errors.push("Height must be greater than 0");
  if (properties.opacity < 0 || properties.opacity > 100) {
    errors.push("Opacity must be between 0 and 100");
  }

  // Validate chart-specific properties
  if (properties.type === "pie" || properties.type === "donut") {
    const pieProps = properties as PieChartCompleteProperties;
    if (pieProps.startAngle < 0 || pieProps.startAngle >= 360) {
      errors.push("Start angle must be between 0 and 359");
    }
    if (pieProps.endAngle <= pieProps.startAngle || pieProps.endAngle > 360) {
      errors.push("End angle must be greater than start angle and <= 360");
    }
  }

  return errors;
};

// Property group helpers for the UI
export const getRelevantPropertyGroups = (
  type: VisualizationType,
): string[] => {
  const baseGroups = ["base", "typography", "colors", "animation"];

  switch (type) {
    case "line":
    case "area":
      return [...baseGroups, "dataDisplay", "legend", "axis", "line"];
    case "bar":
    case "column":
      return [...baseGroups, "dataDisplay", "legend", "axis", "bar"];
    case "pie":
    case "donut":
      return [...baseGroups, "dataDisplay", "legend", "pie"];
    case "scatter":
      return [...baseGroups, "dataDisplay", "legend", "axis", "scatter"];
    case "metric":
    case "trend":
    case "progress":
    case "comparison":
      return [...baseGroups, "dataDisplay", "kpi"];
    case "table":
      return [...baseGroups, "dataDisplay", "table"];
    default:
      return baseGroups;
  }
};

// Property factory function that returns the correct type
export const createDefaultPropertiesForType = (
  type: VisualizationType,
  id?: string,
): AllVisualizationProperties => {
  switch (type) {
    case "line":
    case "area":
      return createDefaultLineChartProperties(id);
    case "bar":
    case "column":
      return createDefaultBarChartProperties(id);
    case "pie":
    case "donut":
      return createDefaultPieChartProperties(id);
    case "scatter":
      return createDefaultScatterChartProperties(id);
    case "metric":
    case "trend":
    case "progress":
    case "comparison":
      return createDefaultKPIProperties(id);
    case "table":
      return createDefaultTableProperties(id);
    default:
      return createDefaultLineChartProperties(id);
  }
};

// Helper to check if a chart type supports axes
export const chartSupportsAxes = (type: VisualizationType): boolean => {
  return ["line", "area", "bar", "column", "scatter"].includes(type);
};

// Helper to check if a chart type supports legend
export const chartSupportsLegend = (type: VisualizationType): boolean => {
  return ["line", "area", "bar", "column", "pie", "donut", "scatter"].includes(
    type,
  );
};

// Helper to get chart-specific property keys
export const getChartSpecificKeys = (type: VisualizationType): string[] => {
  switch (type) {
    case "line":
    case "area":
      return [
        "lineWidth",
        "pointSize",
        "showDataPoints",
        "smoothCurve",
        "fillArea",
        "areaOpacity",
        "connectNulls",
      ];
    case "bar":
    case "column":
      return [
        "barWidth",
        "barSpacing",
        "borderWidth",
        "borderColor",
        "orientation",
        "stackedMode",
        "showDataLabels",
      ];
    case "pie":
    case "donut":
      return [
        "innerRadius",
        "outerRadius",
        "startAngle",
        "endAngle",
        "showLabels",
        "showPercentages",
        "labelPosition",
        "labelConnectorEnabled",
        "explodeDistance",
        "explodedSlices",
      ];
    case "scatter":
      return [
        "pointSize",
        "pointShape",
        "showTrendLine",
        "trendLineColor",
        "trendLineWidth",
      ];
    case "metric":
    case "trend":
    case "progress":
    case "comparison":
      return [
        "value",
        "unit",
        "previousValue",
        "target",
        "trend",
        "trendPercentage",
        "showTrend",
        "showTarget",
        "showProgress",
        "progressType",
        "icon",
        "iconColor",
        "iconSize",
        "sparklineData",
        "showSparkline",
      ];
    case "table":
      return [
        "showHeader",
        "headerBackgroundColor",
        "headerTextColor",
        "alternateRowColors",
        "evenRowColor",
        "oddRowColor",
        "borderEnabled",
        "borderColor",
        "borderWidth",
        "cellPadding",
        "sortable",
        "filterable",
        "editable",
        "pageSize",
        "showPagination",
        "columnWidths",
        "columnAlignment",
      ];
    default:
      return [];
  }
};
