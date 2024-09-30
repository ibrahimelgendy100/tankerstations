import { getnFCMasters } from "../actions/nFCMasters";


export default async function NFCMasters() {
  const nFCMasters = await getnFCMasters();
  return (
    <div>
      <h1 className="text-2xl font-bold">nFCMasters</h1>
      <ul className="w-full max-w-3xl space-y-4">
        {nFCMasters.map((item) => (
          <li key={item.Id} className="p-4 bg-gray-100 rounded shadow-md">
            <strong className="text-xl font-semibold">{item.NFCID}</strong>
            <span> Num Of Bays: {item.Balance}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
