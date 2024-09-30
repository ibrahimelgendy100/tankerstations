import { getVehicles } from "../actions/vehicles";

export default async function Vehicles() {
  const vehicles = await getVehicles();  
  return (
    <div>
      <h1 className="text-2xl font-bold">vehicles</h1>
      <ul className="w-full max-w-3xl space-y-4">
        {vehicles.map((item) => (
          <li key={item.Id} className="p-4 bg-gray-100 rounded shadow-md">
            <strong className="text-xl font-semibold">
              {item.RFID}
            </strong>
            <span> Num Of Allowed: {item.NumberOfTripsAllowedPerDay}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
