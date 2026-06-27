import { FaTrain } from "react-icons/fa";

export default function TrainCard({ number, name, from, to, dep, arr, dur, classes }) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3 md:w-56">
        <div className="bg-blue-50 text-mmtBlue p-2 rounded">
          <FaTrain />
        </div>
        <div>
          <p className="font-semibold text-mmtDark">{name}</p>
          <p className="text-xs text-gray-500">#{number}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-center">
          <p className="text-lg font-bold text-mmtDark">{dep}</p>
          <p className="text-xs text-gray-500">{from}</p>
        </div>
        <div className="text-center min-w-[90px]">
          <p className="text-xs text-gray-500">{dur}</p>
          <div className="h-px bg-gray-300 my-1" />
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-mmtDark">{arr}</p>
          <p className="text-xs text-gray-500">{to}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {classes.map((c) => (
          <button
            key={c}
            className="text-xs font-bold border border-mmtBlue text-mmtBlue px-3 py-1 rounded hover:bg-mmtBlue hover:text-white transition"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
