import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaBed, FaRulerCombined, FaCoffee, FaUndo, FaCheck } from "react-icons/fa";
import { nightsBetween, calcTotals, fmtINR } from "../../../kernel/presentation/utils/bookingUtils.js";

export default function RoomSelection({ hotel, qs }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const checkIn = params.get("checkIn") || new Date().toISOString().slice(0, 10);
  const checkOut =
    params.get("checkOut") ||
    new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  const nights = nightsBetween(checkIn, checkOut);

  const [selectedId, setSelectedId] = useState(hotel.rooms[0].id);
  const selectedRoom = useMemo(
    () => hotel.rooms.find((r) => r.id === selectedId),
    [hotel.rooms, selectedId]
  );
  const totals = calcTotals(selectedRoom.price, nights);

  const handleBook = () => {
    const search = new URLSearchParams(qs);
    search.set("roomId", selectedId);
    if (!search.get("checkIn")) search.set("checkIn", checkIn);
    if (!search.get("checkOut")) search.set("checkOut", checkOut);
    navigate(`/hotels/${hotel.id}/checkout?${search.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-bold text-mmtDark text-lg">Select Rooms</h2>
        <p className="text-xs text-gray-500">
          {nights} {nights > 1 ? "nights" : "night"} • {checkIn} → {checkOut}
        </p>
      </div>

      <div className="mt-4 grid gap-3">
        {hotel.rooms.map((r) => {
          const active = r.id === selectedId;
          return (
            <div
              key={r.id}
              className={`border rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-4 transition ${
                active ? "border-mmtOrange bg-orange-50/40" : "border-gray-200"
              }`}
            >
              <div className="flex-1">
                <h3 className="font-bold text-mmtDark">{r.name}</h3>
                <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-2">
                  <span className="flex items-center gap-1"><FaBed /> {r.bed}</span>
                  <span className="flex items-center gap-1"><FaRulerCombined /> {r.size}</span>
                  {r.breakfast && (
                    <span className="flex items-center gap-1 text-green-700">
                      <FaCoffee /> Breakfast included
                    </span>
                  )}
                  <span className={`flex items-center gap-1 ${r.refundable ? "text-green-700" : "text-red-600"}`}>
                    <FaUndo /> {r.refundable ? "Free cancellation" : "Non-refundable"}
                  </span>
                </div>
              </div>
              <div className="md:text-right">
                <p className="text-xl font-bold text-mmtDark">{fmtINR(r.price)}</p>
                <p className="text-[11px] text-gray-500">per night + taxes</p>
                <button
                  onClick={() => setSelectedId(r.id)}
                  className={`mt-2 inline-flex items-center gap-1 px-4 py-1.5 rounded text-sm font-semibold border ${
                    active
                      ? "bg-mmtOrange text-white border-mmtOrange"
                      : "border-mmtBlue text-mmtBlue hover:bg-mmtBlue hover:text-white"
                  }`}
                >
                  {active && <FaCheck />} {active ? "Selected" : "Select"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 border-t pt-4 flex flex-wrap justify-between items-center gap-3">
        <div className="text-sm text-gray-600">
          <p>
            <strong className="text-mmtDark">{selectedRoom.name}</strong> × {nights}{" "}
            {nights > 1 ? "nights" : "night"}
          </p>
          <p className="text-xs">Total including taxes & discounts</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-mmtDark">{fmtINR(totals.total)}</p>
          <button
            onClick={handleBook}
            className="mt-2 bg-mmtOrange hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded"
          >
            BOOK THIS ROOM
          </button>
        </div>
      </div>
    </div>
  );
}
