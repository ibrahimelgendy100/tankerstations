import { getInvoices } from "../actions/invoices";


export default async function Invoices() {
  const invoices = await getInvoices();
  return (
    <div>
      <h1 className="text-2xl font-bold">Invoices</h1>
      <ul className="w-full max-w-3xl space-y-4">
        {invoices.map((item) => (
          <li key={item.Id} className="p-4 bg-gray-100 rounded shadow-md">
            <strong className="text-xl font-semibold">
              {item.FillingStationId}
            </strong>
            <span> Vehicle-Num: {item.VehicleId}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
