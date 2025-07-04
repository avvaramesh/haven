# Chart Properties Normalization

## Problem Solved

The original chart system had inconsistent properties across different chart types:

- **Pie charts** had properties like `showPercentages` and `startAngle` but not `xAxis` or `yAxis`
- **Line charts** had `showDataPoints` and `smoothCurves` but not pie-specific properties
- **Bar charts** had `barSpacing` and axis properties but not line-specific ones
- **Property counts varied** unpredictably between chart types
- **No type safety** or validation
- **Mixed applicable/non-applicable** properties causing confusion

## Solution: Normalized Property System

### ✅ Key Features

1. **Consistent Base Properties**: All visualizations share the same foundational properties
2. **Type-Specific Properties**: Only applicable properties for each chart type
3. **Logical Property Grouping**: Properties organized into meaningful categories
4. **Type Safety**: Full TypeScript support with interfaces and validation
5. **Migration Support**: Backwards compatibility with legacy property system

### 📊 Property Structure

#### Base Properties (All Charts)

```typescript
{
  id: string;
  type: VisualizationType;
  title: string;
  width: number;
  height: number;
  backgroundColor: string;
  borderRadius: number;
  opacity: number;
  margin: {
    top, right, bottom, left;
  }
  padding: {
    top, right, bottom, left;
  }
}
```

#### Typography Properties (All Charts)

```typescript
{
  fontSize: number;
  fontFamily: string;
  fontWeight: "normal" | "bold" | "lighter" | "bolder";
  textAlign: "left" | "center" | "right";
  textColor: string;
  titleFontSize: number;
  titleColor: string;
}
```

#### Color Properties (All Charts)

```typescript
{
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  colorPalette: string[];
  gradientEnabled: boolean;
  gradientColors: [string, string];
}
```

#### Chart-Specific Properties

**Line/Area Charts**

```typescript
{
  lineWidth: number;
  pointSize: number;
  showDataPoints: boolean;
  smoothCurve: boolean;
  fillArea: boolean; // area charts only
  areaOpacity: number; // area charts only
  connectNulls: boolean;
}
```

**Bar/Column Charts**

```typescript
{
  barWidth: number;
  barSpacing: number;
  borderWidth: number;
  borderColor: string;
  orientation: "horizontal" | "vertical";
  stackedMode: "none" | "normal" | "percent";
  showDataLabels: boolean;
}
```

**Pie/Donut Charts**

```typescript
{
  innerRadius: number;      // 0 for pie, >0 for donut
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  showLabels: boolean;
  showPercentages: boolean;
  labelPosition: "inside" | "outside" | "none";
  explodeDistance: number;
  explodedSlices: number[];
}
```

**Axis Properties (Line/Bar/Scatter Charts)**

```typescript
{
  xAxis: {
    enabled: boolean;
    label: string;
    showGridLines: boolean;
    tickRotation: number;
    minValue?: number;
    maxValue?: number;
    autoScale: boolean;
  };
  yAxis: {
    enabled: boolean;
    label: string;
    showGridLines: boolean;
    startFromZero: boolean;
    minValue?: number;
    maxValue?: number;
    autoScale: boolean;
  };
}
```

### 🔧 Implementation

#### Core Files

1. **`client/lib/chartProperties.ts`**

   - Defines all property interfaces
   - Type definitions for each chart type
   - Default property factories
   - Validation functions
   - Helper functions for property applicability

2. **`client/lib/chartPropertyManager.ts`**

   - Central property management class
   - Migration from legacy properties
   - Property updates and retrieval
   - Backwards compatibility layer

3. **`client/components/dashboard/PropertiesPanelIntegrated.tsx`**
   - Updated to use normalized properties
   - Dynamic UI based on chart type
   - Type-safe property editing

#### Usage Examples

**Creating Properties**

```typescript
import { createDefaultChartProperties } from "@/lib/chartPropertyManager";

// Create properties for different chart types
const lineChartProps = createDefaultChartProperties("line", "my-line-chart");
const pieChartProps = createDefaultChartProperties("pie", "my-pie-chart");
const kpiProps = createDefaultChartProperties("metric", "my-kpi");
```

**Updating Properties**

```typescript
import { updateChartProperty } from "@/lib/chartPropertyManager";

// Update common properties (works for all chart types)
updateChartProperty("my-chart", "title", "New Title");
updateChartProperty("my-chart", "primaryColor", "#ff6b6b");

// Update chart-specific properties
updateChartProperty("my-line-chart", "smoothCurve", true);
updateChartProperty("my-pie-chart", "startAngle", 45);
updateChartProperty("my-line-chart", "xAxis.label", "Time");
```

**Property Validation**

```typescript
import { validateChartProperties } from "@/lib/chartProperties";

const errors = validateChartProperties(properties);
if (errors.length > 0) {
  console.warn("Validation errors:", errors);
}
```

### 📈 Property Count Comparison

| Chart Type | Old System | New System | Consistent?     |
| ---------- | ---------- | ---------- | --------------- |
| Line Chart | 8-12 props | 45 props   | ✅ All relevant |
| Bar Chart  | 6-10 props | 47 props   | ✅ All relevant |
| Pie Chart  | 4-8 props  | 39 props   | ✅ All relevant |
| KPI        | 5-9 props  | 32 props   | ✅ All relevant |
| Table      | 7-11 props | 35 props   | ✅ All relevant |

### 🎯 Benefits

#### 1. Consistency

- Same base properties across all chart types
- Predictable property names and structure
- Logical property grouping

#### 2. Type Safety

- Full TypeScript interfaces
- Compile-time type checking
- Property validation at runtime

#### 3. Maintainability

- Centralized property management
- Easy to add new chart types
- Clear separation of concerns

#### 4. Developer Experience

- Auto-completion in IDEs
- Intuitive API for property updates
- Comprehensive documentation

#### 5. UI Benefits

- Dynamic property panels based on chart type
- Only show applicable properties
- Consistent property organization

### 🔄 Migration Strategy

#### Automatic Migration

The system automatically migrates legacy properties:

```typescript
// Legacy properties (old system)
const legacyProps = {
  title: "Revenue Chart",
  color: "#3b82f6",
  showDataPoints: true,
  xAxisLabel: "Months",
};

// Automatically converted to normalized format
const normalizedProps = migrateLegacyProperties(
  "chart-id",
  legacyProps,
  "line",
);
```

#### Backwards Compatibility

Legacy property access still works:

```typescript
// Get properties in legacy format for compatibility
const legacyFormat = chartPropertyManager.toLegacyFormat("chart-id");
```

### 🧪 Testing and Demo

#### Demo Page

Visit `/property-demo` to see the normalized properties in action:

- Interactive chart type selection
- Real-time property viewing
- Property group visualization
- Comparison with old system

#### Running the Demo

```typescript
import { demoChartProperties } from "@/lib/chartPropertyDemo";

// Run comprehensive demo
demoChartProperties.demonstrate();

// Compare old vs new systems
demoChartProperties.compare();
```

### 🔍 Property Groups

Properties are logically grouped for better organization:

1. **Base**: Core properties all charts need
2. **Typography**: Text-related properties
3. **Colors**: Color and styling properties
4. **Animation**: Animation and transition properties
5. **Data Display**: How data is shown (values, tooltips, etc.)
6. **Legend**: Legend configuration (if applicable)
7. **Axis**: X/Y axis configuration (if applicable)
8. **Chart-Specific**: Properties unique to each chart type

### 🛠 Utility Functions

```typescript
// Check if a chart type supports specific features
chartSupportsAxes("line"); // true
chartSupportsAxes("pie"); // false
chartSupportsLegend("bar"); // true

// Get available property groups for a chart type
getRelevantPropertyGroups("line"); // ['base', 'typography', 'colors', 'axis', 'line']

// Validate properties
const errors = validateChartProperties(properties);
```

### 📋 Property Inheritance

```
AllVisualizationProperties
├── BaseProperties (all charts)
├── TypographyProperties (all charts)
├── ColorProperties (all charts)
├── AnimationProperties (all charts)
├── DataDisplayProperties (all charts)
└── Chart-Specific Properties
    ├── LineChartProperties (+ AxisProperties + LegendProperties)
    ├── BarChartProperties (+ AxisProperties + LegendProperties)
    ├── PieChartProperties (+ LegendProperties)
    ├── ScatterChartProperties (+ AxisProperties + LegendProperties)
    ├── KPIProperties
    └── TableProperties
```

### 🚀 Future Enhancements

1. **Property Templates**: Predefined property sets for common use cases
2. **Property Themes**: Consistent styling across multiple charts
3. **Advanced Validation**: Custom validation rules per chart type
4. **Property Animation**: Smooth transitions when properties change
5. **Property History**: Undo/redo for property changes

### 💡 Best Practices

1. **Always use normalized properties** for new charts
2. **Validate properties** before applying them
3. **Use property groups** to organize UI sections
4. **Check property applicability** before showing in UI
5. **Migrate legacy properties** when updating existing charts

This normalized property system provides a solid foundation for consistent, maintainable, and type-safe chart property management across the entire application.
