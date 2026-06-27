import { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";

export default function FlightSearchForm() {
  const [trip, setTrip] = useState("oneway");
  return (
    <div className="bg-white rounded-lg shadow-lg p-5">
      <div className="flex gap-4 mb-4">
        {[
          { id: "oneway", label: "One Way" },
          { id: "round", label: "Round Trip" },
          { id: "multi", label: "Multi City" },
        ].map((t) => (
          <label key={t.id} className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer">
            <input
              type="radio"
              name="trip"
              checked={trip === t.id}
              onChange={() => setTrip(t.id)}
              className="accent-mmtBlue"
            />
            {t.label}
          </label>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-5 items-stretch">
        <Field label="From" defaultValue="Delhi (DEL)" />
        <div className="hidden md:flex items-center justify-center">
          <button className="rounded-full border border-gray-300 p-2 text-mmtBlue">
            <FaExchangeAlt />
          </button>
        </div>
        <Field label="To" defaultValue="Mumbai (BOM)" />
        <Field label="Departure" type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
        <Field label="Travellers & Class" defaultValue="1 Adult, Economy" />
      </div>
      <div className="text-center mt-5">
        <button className="bg-mmtOrange hover:bg-orange-600 text-white font-bold px-12 py-3 rounded-full shadow">
          SEARCH FLIGHTS
        </button>
      </div>
    </div>
  );
}

function Field({ label, ...rest }) {
  return (
    <label className="block border border-gray-200 rounded-md p-3 hover:border-mmtBlue transition">
      <span className="text-xs text-gray-500 font-semibold">{label}</span>
      <input {...rest} className="w-full outline-none mt-1 text-sm font-medium text-mmtDark bg-transparent" />
    </label>
  );
}
