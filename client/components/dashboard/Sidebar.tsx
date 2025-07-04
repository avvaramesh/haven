export default function Sidebar() {
  const navigationItems = [
    "Orders",
    "Customers",
    "Revenue Summary",
    "Product Data",
  ];

  return (
    <div className="w-52 bg-dashboard-background border-r border-dashboard-border flex flex-col">
      <div className="p-6 border-b border-dashboard-border">
        <h1 className="text-xl font-semibold text-dashboard-text">DATA</h1>
      </div>
      <nav className="flex-1 py-4">
        {navigationItems.map((item, index) => (
          <button
            key={index}
            className="w-full px-6 py-3 text-left text-sm text-dashboard-text-muted hover:text-dashboard-text hover:bg-dashboard-muted transition-colors"
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
}
