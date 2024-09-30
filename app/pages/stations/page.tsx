import { getStations } from "../actions/stations";

export default async function Stations() {
  const fillingStations = await getStations();  
  return (
    <div>
      <h1 className="text-2xl font-bold">Filling Stations</h1>
      <ul className="w-full max-w-3xl space-y-4">
        {fillingStations.map((station) => (
          <li key={station.Id} className="p-4 bg-gray-100 rounded shadow-md">
            <strong className="text-xl font-semibold">{station.StationName}</strong>
            <span> Num Of Bays: {station.NumberOfBays}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
