export default function OrderDataTable() {
  const tableData = [
    {
      orderID: "Order ID",
      date: "Jun. 3",
      customer: "Customer",
      amount: "Amount",
    },
    {
      orderID: "Order ID",
      date: "Jun. 6",
      customer: "Customer",
      amount: "Amount",
    },
    {
      orderID: "Address",
      date: "Jun. 16",
      customer: "Amount",
      amount: "Amount",
    },
  ];

  const headers = ["Order ID", "Date", "Customer", "Amount"];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-4 text-xs text-dashboard-text-muted font-medium">
        {headers.map((header, index) => (
          <div key={index}>{header}</div>
        ))}
      </div>
      {tableData.map((row, index) => (
        <div
          key={index}
          className="grid grid-cols-4 gap-4 text-sm text-dashboard-text py-1"
        >
          <div>{row.orderID}</div>
          <div>{row.date}</div>
          <div>{row.customer}</div>
          <div>{row.amount}</div>
        </div>
      ))}
    </div>
  );
}
