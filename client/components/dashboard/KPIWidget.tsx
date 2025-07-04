interface KPIWidgetProps {
  properties?: {
    title?: string;
    value?: string;
    subtitle?: string;
    color?: string;
    showTrend?: boolean;
    fontSize?: number;
  };
}

export default function KPIWidget({ properties }: KPIWidgetProps = {}) {
  const title = properties?.title || "Total Revenue";
  const value = properties?.value || "130,5k";
  const subtitle = properties?.subtitle || "this month";
  const color = properties?.color || "#3b82f6";
  const fontSize = properties?.fontSize || 24;
  const showTrend = properties?.showTrend !== false;

  return (
    <div className="flex flex-col justify-center items-center h-full p-4">
      <div className="text-xs text-dashboard-text-muted mb-1 text-center">
        {title}
      </div>
      <div
        className="font-bold mb-1 text-center"
        style={{
          color: color,
          fontSize: `${fontSize}px`,
          lineHeight: 1.2,
        }}
      >
        {value}
      </div>
      {showTrend && (
        <div className="text-xs text-dashboard-text-muted text-center">
          {subtitle}
        </div>
      )}
    </div>
  );
}
