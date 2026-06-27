import { FaPlane } from "react-icons/fa";

export default function FlightCard({ airline, code, from, to, dep, arr, dur, price, stops }) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3 md:w-48">
        <div className="bg-blue-50 text-mmtBlue p-2 rounded">
          <FaPlane />
        </div>
        <div>
          <p className="font-semibold text-mmtDark">{airline}</p>
          <p className="text-xs text-gray-500">{code}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <div className="text-center">
          <p className="text-lg font-bold text-mmtDark">{dep}</p>
          <p className="text-xs text-gray-500">{from}</p>
        </div>
        <div className="text-center min-w-[90px]">
          <p className="text-xs text-gray-500">{dur}</p>
          <div className="h-px bg-gray-300 my-1" />
          <p className="text-[10px] text-green-600 font-semibold">{stops}</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-mmtDark">{arr}</p>
          <p className="text-xs text-gray-500">{to}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-xl font-bold text-mmtDark">₹{price.toLocaleString()}</p>
        <button className="bg-mmtOrange hover:bg-orange-600 text-white font-bold px-5 py-2 rounded">
          BOOK
        </button>
      </div>
    </div>
  );
}
