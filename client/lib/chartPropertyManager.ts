// Chart Property Manager
// Handles migration between old and new property systems
// Provides consistent property access and validation

import {
  AllVisualizationProperties,
  VisualizationType,
  createDefaultPropertiesForType,
  validateChartProperties,
  chartSupportsAxes,
  chartSupportsLegend,
  getChartSpecificKeys,
  getRelevantPropertyGroups,
} from "./chartProperties";

// Legacy property interface (what we currently have)
export interface LegacyChartProperties {
  title?: string;
  width?: number;
  height?: number;
  color?: string;
  background?: string;
  fontSize?: number;
  fontWeight?: string;
  textAlign?: string;
  showLegend?: boolean;
  showGrid?: boolean;
  opacity?: number;
  borderRadius?: number;
  chartType?: string;
  // Chart-specific legacy properties
  showDataPoints?: boolean;
  smoothCurves?: boolean;
  barSpacing?: number;
  showPercentages?: boolean;
  startAngle?: number;
  value?: string | number;
  showTrend?: boolean;
  subtitle?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showXAxis?: boolean;
  showYAxis?: boolean;
  rotateXLabels?: boolean;
  xLabelAngle?: number;
  yMinValue?: string | number;
  yMaxValue?: string | number;
  startFromZero?: boolean;
  // Table-specific legacy properties
  showHeader?: boolean;
  alternateRows?: boolean;
  showBorders?: boolean;
  editable?: boolean;
  headerColor?: string;
  rowColor?: string;
  alternateRowColor?: string;
}

export class ChartPropertyManager {
  private properties: Map<string, AllVisualizationProperties> = new Map();

  constructor() {
    // Initialize with empty state
  }

  // Get properties for a chart element
  getProperties(elementId: string): AllVisualizationProperties | null {
    return this.properties.get(elementId) || null;
  }

  // Set properties for a chart element
  setProperties(
    elementId: string,
    properties: AllVisualizationProperties,
  ): void {
    // Validate properties before setting
    const errors = validateChartProperties(properties);
    if (errors.length > 0) {
      console.warn(`Property validation errors for ${elementId}:`, errors);
    }

    this.properties.set(elementId, properties);
  }

  // Update a single property
  updateProperty(elementId: string, propertyPath: string, value: any): boolean {
    const currentProperties = this.getProperties(elementId);
    if (!currentProperties) {
      console.warn(`No properties found for element ${elementId}`);
      return false;
    }

    // Handle nested property paths (e.g., "xAxis.label", "margin.top")
    const updatedProperties = this.setNestedProperty(
      currentProperties,
      propertyPath,
      value,
    );

    this.setProperties(elementId, updatedProperties);
    return true;
  }

  // Get a single property value
  getProperty(elementId: string, propertyPath: string): any {
    const properties = this.getProperties(elementId);
    if (!properties) return undefined;

    return this.getNestedProperty(properties, propertyPath);
  }

  // Create default properties for a chart type
  createDefaultProperties(
    type: VisualizationType,
    elementId: string,
  ): AllVisualizationProperties {
    const properties = createDefaultPropertiesForType(type, elementId);
    this.setProperties(elementId, properties);
    return properties;
  }

  // Migrate legacy properties to new normalized format
  migrateLegacyProperties(
    elementId: string,
    legacyProperties: LegacyChartProperties,
    type: VisualizationType,
  ): AllVisualizationProperties {
    // Start with default properties for the type
    const defaultProperties = createDefaultPropertiesForType(type, elementId);

    // Map legacy properties to new structure
    const normalizedProperties = this.mapLegacyToNormalized(
      legacyProperties,
      defaultProperties,
    );

    this.setProperties(elementId, normalizedProperties);
    return normalizedProperties;
  }

  // Convert current properties back to legacy format (for backwards compatibility)
  toLegacyFormat(elementId: string): LegacyChartProperties {
    const properties = this.getProperties(elementId);
    if (!properties) return {};

    return this.mapNormalizedToLegacy(properties);
  }

  // Get all property groups available for a chart type
  getAvailablePropertyGroups(type: VisualizationType): string[] {
    return getRelevantPropertyGroups(type);
  }

  // Check if a property is applicable to a chart type
  isPropertyApplicable(type: VisualizationType, propertyPath: string): boolean {
    const groups = getRelevantPropertyGroups(type);
    const specificKeys = getChartSpecificKeys(type);

    // Check if it's a base property
    const baseProperties = [
      "title",
      "width",
      "height",
      "backgroundColor",
      "borderRadius",
      "opacity",
    ];
    if (baseProperties.includes(propertyPath)) return true;

    // Check if it's a typography property
    const typographyProperties = [
      "fontSize",
      "fontFamily",
      "fontWeight",
      "textAlign",
      "textColor",
      "titleFontSize",
      "titleColor",
    ];
    if (
      groups.includes("typography") &&
      typographyProperties.includes(propertyPath)
    )
      return true;

    // Check if it's an axis property
    if (
      chartSupportsAxes(type) &&
      (propertyPath.startsWith("xAxis.") || propertyPath.startsWith("yAxis."))
    ) {
      return true;
    }

    // Check if it's a legend property
    if (chartSupportsLegend(type) && propertyPath.startsWith("legend.")) {
      return true;
    }

    // Check if it's a chart-specific property
    if (specificKeys.includes(propertyPath)) return true;

    return false;
  }

  // Get properties grouped by category for UI rendering
  getPropertiesByGroup(elementId: string): Record<string, Record<string, any>> {
    const properties = this.getProperties(elementId);
    if (!properties) return {};

    const groups = getRelevantPropertyGroups(properties.type);
    const result: Record<string, Record<string, any>> = {};

    groups.forEach((group) => {
      result[group] = this.getPropertiesForGroup(properties, group);
    });

    return result;
  }

  // Private helper methods

  private setNestedProperty(
    obj: any,
    path: string,
    value: any,
  ): AllVisualizationProperties {
    const keys = path.split(".");
    const result = JSON.parse(JSON.stringify(obj)); // Deep clone

    let current = result;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current)) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    return result;
  }

  private getNestedProperty(obj: any, path: string): any {
    const keys = path.split(".");
    let current = obj;

    for (const key of keys) {
      if (current === null || current === undefined) return undefined;
      current = current[key];
    }

    return current;
  }

  private mapLegacyToNormalized(
    legacy: LegacyChartProperties,
    defaults: AllVisualizationProperties,
  ): AllVisualizationProperties {
    const result = JSON.parse(JSON.stringify(defaults)); // Deep clone

    // Map basic properties
    if (legacy.title !== undefined) result.title = legacy.title;
    if (legacy.width !== undefined) result.width = legacy.width;
    if (legacy.height !== undefined) result.height = legacy.height;
    if (legacy.background !== undefined)
      result.backgroundColor = legacy.background;
    if (legacy.borderRadius !== undefined)
      result.borderRadius = legacy.borderRadius;
    if (legacy.opacity !== undefined) result.opacity = legacy.opacity;

    // Map typography properties
    if (legacy.fontSize !== undefined) result.fontSize = legacy.fontSize;
    if (legacy.fontWeight !== undefined) result.fontWeight = legacy.fontWeight;
    if (legacy.textAlign !== undefined) result.textAlign = legacy.textAlign;
    if (legacy.color !== undefined) {
      result.primaryColor = legacy.color;
      result.textColor = legacy.color;
    }

    // Map chart-specific properties
    if (chartSupportsLegend(result.type)) {
      if (legacy.showLegend !== undefined) result.enabled = legacy.showLegend;
    }

    if (chartSupportsAxes(result.type)) {
      const axisResult = result as any;
      if (legacy.xAxisLabel !== undefined)
        axisResult.xAxis.label = legacy.xAxisLabel;
      if (legacy.yAxisLabel !== undefined)
        axisResult.yAxis.label = legacy.yAxisLabel;
      if (legacy.showXAxis !== undefined)
        axisResult.xAxis.enabled = legacy.showXAxis;
      if (legacy.showYAxis !== undefined)
        axisResult.yAxis.enabled = legacy.showYAxis;
      if (legacy.rotateXLabels !== undefined)
        axisResult.xAxis.tickRotation = legacy.rotateXLabels ? -45 : 0;
      if (legacy.xLabelAngle !== undefined)
        axisResult.xAxis.tickRotation = legacy.xLabelAngle;
      if (legacy.startFromZero !== undefined)
        axisResult.yAxis.startFromZero = legacy.startFromZero;
      if (legacy.showGrid !== undefined) {
        axisResult.xAxis.showGridLines = legacy.showGrid;
        axisResult.yAxis.showGridLines = legacy.showGrid;
      }

      // Handle min/max values
      if (legacy.yMinValue !== undefined && legacy.yMinValue !== "") {
        axisResult.yAxis.minValue = Number(legacy.yMinValue);
        axisResult.yAxis.autoScale = false;
      }
      if (legacy.yMaxValue !== undefined && legacy.yMaxValue !== "") {
        axisResult.yAxis.maxValue = Number(legacy.yMaxValue);
        axisResult.yAxis.autoScale = false;
      }
    }

    // Map chart type specific properties
    switch (result.type) {
      case "line":
      case "area":
        const lineResult = result as any;
        if (legacy.showDataPoints !== undefined)
          lineResult.showDataPoints = legacy.showDataPoints;
        if (legacy.smoothCurves !== undefined)
          lineResult.smoothCurve = legacy.smoothCurves;
        break;

      case "bar":
      case "column":
        const barResult = result as any;
        if (legacy.barSpacing !== undefined)
          barResult.barSpacing = legacy.barSpacing;
        break;

      case "pie":
      case "donut":
        const pieResult = result as any;
        if (legacy.showPercentages !== undefined)
          pieResult.showPercentages = legacy.showPercentages;
        if (legacy.startAngle !== undefined)
          pieResult.startAngle = legacy.startAngle;
        break;
    }

    // Map KPI properties
    if (result.type === "metric") {
      const kpiResult = result as any;
      if (legacy.value !== undefined) kpiResult.value = legacy.value;
      if (legacy.showTrend !== undefined)
        kpiResult.showTrend = legacy.showTrend;
      if (legacy.subtitle !== undefined) kpiResult.unit = legacy.subtitle;
    }

    // Map table properties
    if (result.type === "table") {
      const tableResult = result as any;
      if (legacy.showHeader !== undefined)
        tableResult.showHeader = legacy.showHeader;
      if (legacy.alternateRows !== undefined)
        tableResult.alternateRowColors = legacy.alternateRows;
      if (legacy.showBorders !== undefined)
        tableResult.borderEnabled = legacy.showBorders;
      if (legacy.editable !== undefined) tableResult.editable = legacy.editable;
      if (legacy.headerColor !== undefined)
        tableResult.headerBackgroundColor = legacy.headerColor;
      if (legacy.alternateRowColor !== undefined)
        tableResult.oddRowColor = legacy.alternateRowColor;
    }

    return result;
  }

  private mapNormalizedToLegacy(
    normalized: AllVisualizationProperties,
  ): LegacyChartProperties {
    const legacy: LegacyChartProperties = {
      title: normalized.title,
      width: normalized.width,
      height: normalized.height,
      background: normalized.backgroundColor,
      borderRadius: normalized.borderRadius,
      opacity: normalized.opacity,
      fontSize: normalized.fontSize,
      fontWeight: normalized.fontWeight,
      textAlign: normalized.textAlign,
      color: normalized.primaryColor,
      chartType: normalized.type,
    };

    // Map chart-specific properties
    if (chartSupportsLegend(normalized.type)) {
      legacy.showLegend = (normalized as any).enabled;
    }

    if (chartSupportsAxes(normalized.type)) {
      const axisProps = normalized as any;
      legacy.xAxisLabel = axisProps.xAxis?.label;
      legacy.yAxisLabel = axisProps.yAxis?.label;
      legacy.showXAxis = axisProps.xAxis?.enabled;
      legacy.showYAxis = axisProps.yAxis?.enabled;
      legacy.rotateXLabels = axisProps.xAxis?.tickRotation !== 0;
      legacy.xLabelAngle = axisProps.xAxis?.tickRotation;
      legacy.startFromZero = axisProps.yAxis?.startFromZero;
      legacy.showGrid = axisProps.xAxis?.showGridLines;
      legacy.yMinValue = axisProps.yAxis?.minValue;
      legacy.yMaxValue = axisProps.yAxis?.maxValue;
    }

    // Map type-specific properties
    switch (normalized.type) {
      case "line":
      case "area":
        const lineProps = normalized as any;
        legacy.showDataPoints = lineProps.showDataPoints;
        legacy.smoothCurves = lineProps.smoothCurve;
        break;

      case "bar":
      case "column":
        const barProps = normalized as any;
        legacy.barSpacing = barProps.barSpacing;
        break;

      case "pie":
      case "donut":
        const pieProps = normalized as any;
        legacy.showPercentages = pieProps.showPercentages;
        legacy.startAngle = pieProps.startAngle;
        break;

      case "metric":
        const kpiProps = normalized as any;
        legacy.value = kpiProps.value;
        legacy.showTrend = kpiProps.showTrend;
        legacy.subtitle = kpiProps.unit;
        break;

      case "table":
        const tableProps = normalized as any;
        legacy.showHeader = tableProps.showHeader;
        legacy.alternateRows = tableProps.alternateRowColors;
        legacy.showBorders = tableProps.borderEnabled;
        legacy.editable = tableProps.editable;
        legacy.headerColor = tableProps.headerBackgroundColor;
        legacy.alternateRowColor = tableProps.oddRowColor;
        break;
    }

    return legacy;
  }

  private getPropertiesForGroup(
    properties: AllVisualizationProperties,
    group: string,
  ): Record<string, any> {
    switch (group) {
      case "base":
        return {
          title: properties.title,
          width: properties.width,
          height: properties.height,
          backgroundColor: properties.backgroundColor,
          borderRadius: properties.borderRadius,
          opacity: properties.opacity,
          margin: properties.margin,
          padding: properties.padding,
        };

      case "typography":
        return {
          fontSize: properties.fontSize,
          fontFamily: properties.fontFamily,
          fontWeight: properties.fontWeight,
          textAlign: properties.textAlign,
          textColor: properties.textColor,
          titleFontSize: properties.titleFontSize,
          titleColor: properties.titleColor,
        };

      case "colors":
        return {
          primaryColor: properties.primaryColor,
          secondaryColor: properties.secondaryColor,
          accentColor: properties.accentColor,
          colorPalette: properties.colorPalette,
          gradientEnabled: properties.gradientEnabled,
          gradientColors: properties.gradientColors,
        };

      case "animation":
        return {
          animationEnabled: properties.animationEnabled,
          animationDuration: properties.animationDuration,
          animationEasing: properties.animationEasing,
          animationDelay: properties.animationDelay,
        };

      case "dataDisplay":
        return {
          showValues: properties.showValues,
          valueFormat: properties.valueFormat,
          valuePrefix: properties.valuePrefix,
          valueSuffix: properties.valueSuffix,
          decimalPlaces: properties.decimalPlaces,
          showTooltip: properties.showTooltip,
          tooltipFormat: properties.tooltipFormat,
        };

      case "legend":
        if (!chartSupportsLegend(properties.type)) return {};
        return {
          enabled: (properties as any).enabled,
          position: (properties as any).position,
          alignment: (properties as any).alignment,
          orientation: (properties as any).orientation,
          fontSize: (properties as any).fontSize,
          fontColor: (properties as any).fontColor,
        };

      case "axis":
        if (!chartSupportsAxes(properties.type)) return {};
        return {
          xAxis: (properties as any).xAxis,
          yAxis: (properties as any).yAxis,
        };

      default:
        // For chart-specific groups (line, bar, pie, etc.)
        const specificKeys = getChartSpecificKeys(properties.type);
        const result: Record<string, any> = {};
        specificKeys.forEach((key) => {
          result[key] = (properties as any)[key];
        });
        return result;
    }
  }

  // Clear all properties
  clear(): void {
    this.properties.clear();
  }

  // Remove properties for a specific element
  removeElement(elementId: string): boolean {
    return this.properties.delete(elementId);
  }

  // Get all element IDs
  getAllElementIds(): string[] {
    return Array.from(this.properties.keys());
  }

  // Export all properties (for saving state)
  exportAll(): Record<string, AllVisualizationProperties> {
    const result: Record<string, AllVisualizationProperties> = {};
    this.properties.forEach((props, id) => {
      result[id] = props;
    });
    return result;
  }

  // Import properties (for loading state)
  importAll(data: Record<string, AllVisualizationProperties>): void {
    this.clear();
    Object.entries(data).forEach(([id, props]) => {
      this.setProperties(id, props);
    });
  }
}

// Global instance
export const chartPropertyManager = new ChartPropertyManager();

// Helper functions for easier access
export const getChartProperties = (elementId: string) =>
  chartPropertyManager.getProperties(elementId);

export const setChartProperties = (
  elementId: string,
  properties: AllVisualizationProperties,
) => chartPropertyManager.setProperties(elementId, properties);

export const updateChartProperty = (
  elementId: string,
  propertyPath: string,
  value: any,
) => chartPropertyManager.updateProperty(elementId, propertyPath, value);

export const getChartProperty = (elementId: string, propertyPath: string) =>
  chartPropertyManager.getProperty(elementId, propertyPath);

export const createDefaultChartProperties = (
  type: VisualizationType,
  elementId: string,
) => chartPropertyManager.createDefaultProperties(type, elementId);

export const migrateLegacyChartProperties = (
  elementId: string,
  legacyProperties: LegacyChartProperties,
  type: VisualizationType,
) =>
  chartPropertyManager.migrateLegacyProperties(
    elementId,
    legacyProperties,
    type,
  );
