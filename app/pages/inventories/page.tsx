import { getInventories } from "../actions/Inventories";

export default async function Inventories() {
  const inventories = await getInventories();
  return (
    <div>
      <h1 className="text-2xl font-bold">Inventories</h1>
      <ul className="w-full max-w-3xl space-y-4">
        {inventories.map((item) => (
          <li key={item.Id} className="p-4 bg-gray-100 rounded shadow-md">
            <strong className="text-xl font-semibold">{item.VehicleId}</strong>
            <span> User: {item.UserID}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
