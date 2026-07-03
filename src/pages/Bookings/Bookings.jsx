import { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  FaHotel,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSuitcase,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";
import useAuth from "../../kernel/presentation/utils/useAuth.js";
import { cancelBooking, getAllBookings } from "../../kernel/presentation/utils/authStore.js";
import { fmtINR } from "../../kernel/presentation/utils/bookingUtils.js";

const TABS = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

export default function Bookings() {
  const user = useAuth();
  const [tab, setTab] = useState("all");
  const [version, setVersion] = useState(0);

  if (!user) return <Navigate to="/auth?redirect=/bookings" replace />;

  const bookings = useMemo(() => getAllBookings(), [user, version]);
  const today = new Date().toISOString().slice(0, 10);

  const filtered = bookings.filter((b) => {
    if (tab === "all") return true;
    if (tab === "cancelled") return b.status === "Cancelled";
    if (tab === "upcoming") return b.status !== "Cancelled" && b.checkOut >= today;
    if (tab === "completed") return b.status !== "Cancelled" && b.checkOut < today;
    return true;
  });

  const handleCancel = (id) => {
    if (confirm("Cancel this booking?")) {
      cancelBooking(id);
      setVersion((v) => v + 1);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-4">
          <FaSuitcase className="text-mmtBlue text-2xl" />
          <h1 className="text-2xl font-bold text-mmtDark">My Bookings</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex overflow-x-auto border-b border-gray-100">
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-5 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition ${
                    active
                      ? "text-mmtBlue border-mmtBlue"
                      : "text-gray-600 border-transparent hover:text-mmtBlue"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <div className="p-5">
            {filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <ul className="space-y-4">
                {filtered.map((b) => (
                  <li
                    key={b.id}
                    className="border border-gray-200 rounded-lg overflow-hidden grid md:grid-cols-[180px_1fr_200px]"
                  >
                    <img
                      src={b.image || "/images/logo.svg"}
                      alt={b.hotelName}
                      className="w-full h-40 md:h-full object-cover bg-gray-100"
                    />
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <FaHotel /> Hotel Booking
                        <span className="text-gray-300">•</span>
                        <span>ID: {b.id}</span>
                      </div>
                      <h3 className="font-bold text-mmtDark text-lg mt-1">{b.hotelName}</h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <FaMapMarkerAlt /> {b.address}
                      </p>
                      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-[11px] text-gray-500 flex items-center gap-1">
                            <FaCalendarAlt /> Check-in
                          </p>
                          <p className="font-semibold">{b.checkIn}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-500 flex items-center gap-1">
                            <FaCalendarAlt /> Check-out
                          </p>
                          <p className="font-semibold">{b.checkOut}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-500">Room</p>
                          <p className="font-semibold">{b.roomName}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-500">Guests</p>
                          <p className="font-semibold">
                            {b.guests || 2} Guest{(b.guests || 2) > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col items-end justify-between">
                      <div className="text-right">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded ${
                            b.status === "Cancelled"
                              ? "bg-red-50 text-red-600"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          {b.status === "Cancelled" ? <FaTimesCircle /> : <FaCheckCircle />}
                          {b.status}
                        </span>
                        <p className="font-bold text-mmtDark mt-2">{fmtINR(b.total)}</p>
                        <p className="text-[11px] text-gray-500">Paid via {b.payment || "Card"}</p>
                      </div>
                      <div className="flex flex-col gap-2 w-full mt-3">
                        <Link
                          to={`/hotels/${b.hotelId}`}
                          className="text-center text-sm font-semibold text-mmtBlue border border-mmtBlue rounded py-1.5 hover:bg-blue-50"
                        >
                          View Hotel
                        </Link>
                        {b.status !== "Cancelled" && (
                          <button
                            onClick={() => handleCancel(b.id)}
                            className="text-sm font-semibold text-red-600 border border-red-200 rounded py-1.5 hover:bg-red-50"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <FaSuitcase className="text-gray-300 text-6xl mx-auto" />
      <h3 className="mt-3 font-bold text-mmtDark">No bookings here</h3>
      <p className="text-sm text-gray-500 mt-1">Once you book a trip, it'll show up on this page.</p>
      <Link
        to="/hotels"
        className="inline-block mt-5 bg-mmtBlue hover:bg-blue-700 text-white font-bold px-5 py-2 rounded"
      >
        Book a Hotel
      </Link>
    </div>
  );
}
