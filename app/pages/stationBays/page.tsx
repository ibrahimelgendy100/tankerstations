import { getStationBays } from "../../actions/stationBays";


export default async function StationBays() {
  const bays = await getStationBays();
  return (
    <div>
      <h1 className="text-2xl font-bold">Station Bays</h1>
      <ul className="w-full max-w-3xl space-y-4">
        {bays.map((station) => (
          <li key={station.Id} className="p-4 bg-gray-100 rounded shadow-md">
            <strong className="text-xl font-semibold">
              {station.FillingStationId}
            </strong>
            <span> Bay Nm: {station.BayName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
