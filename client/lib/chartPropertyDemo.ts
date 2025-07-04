// Demo script to showcase the normalized chart property system
// This demonstrates how properties are consistent across chart types

import {
  chartPropertyManager,
  createDefaultChartProperties,
  updateChartProperty,
  getChartProperties,
} from "./chartPropertyManager";
import {
  VisualizationType,
  chartSupportsAxes,
  chartSupportsLegend,
  getRelevantPropertyGroups,
  validateChartProperties,
} from "./chartProperties";

// Demo function to show consistent property structure
export function demonstrateNormalizedProperties() {
  console.log("🎯 Chart Property Normalization Demo");
  console.log("=" * 50);

  // Create different chart types with normalized properties
  const chartTypes: VisualizationType[] = [
    "line",
    "bar",
    "pie",
    "scatter",
    "metric",
    "table",
  ];

  chartTypes.forEach((type) => {
    console.log(`\n📊 Creating ${type.toUpperCase()} chart:`);

    // Create default properties
    const elementId = `demo-${type}-chart`;
    const properties = createDefaultChartProperties(type, elementId);

    console.log(`✅ Created with ${Object.keys(properties).length} properties`);
    console.log(
      `📋 Property groups: ${getRelevantPropertyGroups(type).join(", ")}`,
    );
    console.log(`🎨 Supports axes: ${chartSupportsAxes(type)}`);
    console.log(`🏷️  Supports legend: ${chartSupportsLegend(type)}`);

    // Show some key properties that are consistent
    console.log(`📐 Dimensions: ${properties.width}x${properties.height}`);
    console.log(`🎨 Primary color: ${properties.primaryColor}`);
    console.log(`📝 Font size: ${properties.fontSize}px`);

    // Show chart-specific properties
    if (chartSupportsAxes(type)) {
      const axisProps = properties as any;
      console.log(`📊 X-Axis label: "${axisProps.xAxis.label}"`);
      console.log(`📊 Y-Axis enabled: ${axisProps.yAxis.enabled}`);
    }

    if (type === "pie" || type === "donut") {
      const pieProps = properties as any;
      console.log(`🥧 Start angle: ${pieProps.startAngle}°`);
      console.log(`🥧 Show percentages: ${pieProps.showPercentages}`);
    }

    if (type === "metric") {
      const kpiProps = properties as any;
      console.log(`📈 Value: ${kpiProps.value}`);
      console.log(`📈 Show trend: ${kpiProps.showTrend}`);
    }

    // Validate properties
    const errors = validateChartProperties(properties);
    console.log(
      `✅ Validation: ${errors.length === 0 ? "PASSED" : `${errors.length} errors`}`,
    );
  });

  console.log("\n🔄 Testing Property Updates:");

  // Demonstrate property updates
  const lineChartId = "demo-line-chart";

  // Update common properties (works for all chart types)
  updateChartProperty(lineChartId, "title", "Updated Revenue Trends");
  updateChartProperty(lineChartId, "primaryColor", "#ff6b6b");
  updateChartProperty(lineChartId, "width", 800);

  // Update chart-specific properties
  updateChartProperty(lineChartId, "smoothCurve", true);
  updateChartProperty(lineChartId, "xAxis.label", "Time Period");
  updateChartProperty(lineChartId, "yAxis.startFromZero", false);

  const updatedProperties = getChartProperties(lineChartId);
  if (updatedProperties) {
    console.log(`✅ Updated title: "${updatedProperties.title}"`);
    console.log(`✅ Updated color: ${updatedProperties.primaryColor}`);
    console.log(`✅ Updated width: ${updatedProperties.width}px`);
    console.log(`✅ Smooth curves: ${(updatedProperties as any).smoothCurve}`);
  }

  console.log("\n📊 Property Count Comparison:");
  console.log("Before normalization (old system): Variable property counts");

  // Show consistent property counts
  chartTypes.forEach((type) => {
    const props = getChartProperties(`demo-${type}-chart`);
    if (props) {
      const baseCount = 9; // Base properties all charts have
      const typeCount = Object.keys(props).length;
      console.log(
        `${type.padEnd(8)}: ${typeCount} properties (${typeCount - baseCount} specific)`,
      );
    }
  });

  console.log("\n🎯 Key Benefits:");
  console.log("• Consistent property structure across all chart types");
  console.log(
    "• Logical property grouping (base, typography, colors, chart-specific)",
  );
  console.log("• Type-safe property access with validation");
  console.log("• Easy migration from legacy property system");
  console.log("• Predictable API for UI components");

  return chartPropertyManager.exportAll();
}

// Function to compare old vs new property system
export function comparePropertySystems() {
  console.log("\n���� Property System Comparison:");

  // Example of old inconsistent properties
  const oldLineChart = {
    title: "Revenue",
    color: "#3b82f6",
    showDataPoints: true,
    xAxisLabel: "Months",
    showGrid: true,
    // Missing: width, height, background, etc.
  };

  const oldPieChart = {
    title: "Distribution",
    color: "#f59e0b",
    showPercentages: true,
    startAngle: 0,
    // Missing: axis properties (not applicable)
    // Missing: many base properties
  };

  const oldBarChart = {
    title: "Comparison",
    color: "#10b981",
    barSpacing: 0.3,
    xAxisLabel: "Categories",
    yAxisLabel: "Values",
    // Missing: grid options, data points (not applicable)
  };

  console.log("❌ OLD SYSTEM Issues:");
  console.log(`• Line chart: ${Object.keys(oldLineChart).length} properties`);
  console.log(`• Pie chart: ${Object.keys(oldPieChart).length} properties`);
  console.log(`• Bar chart: ${Object.keys(oldBarChart).length} properties`);
  console.log("• Inconsistent property names and counts");
  console.log("• Properties not applicable to chart type still present");
  console.log("• Missing validation and type safety");

  // Show new normalized system
  const newLineChart = createDefaultChartProperties("line", "new-line");
  const newPieChart = createDefaultChartProperties("pie", "new-pie");
  const newBarChart = createDefaultChartProperties("bar", "new-bar");

  console.log("\n✅ NEW SYSTEM Benefits:");
  console.log(
    `• Line chart: ${Object.keys(newLineChart).length} properties (all relevant)`,
  );
  console.log(
    `• Pie chart: ${Object.keys(newPieChart).length} properties (all relevant)`,
  );
  console.log(
    `• Bar chart: ${Object.keys(newBarChart).length} properties (all relevant)`,
  );
  console.log("• Consistent base properties across all types");
  console.log("• Only applicable properties for each chart type");
  console.log("• Type-safe with validation");
  console.log("• Clear property grouping and organization");
}

// Export for use in components or testing
export const demoChartProperties = {
  demonstrate: demonstrateNormalizedProperties,
  compare: comparePropertySystems,
  manager: chartPropertyManager,
};
