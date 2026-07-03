import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaVenusMars,
  FaEdit,
  FaSignOutAlt,
  FaSuitcase,
} from "react-icons/fa";
import useAuth from "../../kernel/presentation/utils/useAuth.js";
import { logout, updateProfile, getAllBookings } from "../../kernel/presentation/utils/authStore.js";

export default function Profile() {
  const user = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(() => ({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    city: user?.city || "",
    dob: user?.dob || "",
    gender: user?.gender || "",
  }));

  if (!user) return <Navigate to="/auth?redirect=/profile" replace />;

  const bookings = getAllBookings();
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = (e) => {
    e.preventDefault();
    updateProfile(form);
    setEditing(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 grid gap-5 md:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 h-fit">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-mmtBlue/10 flex items-center justify-center">
              <FaUserCircle className="text-mmtBlue text-6xl" />
            </div>
            <h2 className="mt-3 font-bold text-mmtDark">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <div className="mt-5 space-y-1">
            <Link
              to="/profile"
              className="flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold text-mmtBlue bg-blue-50"
            >
              <FaUserCircle /> My Profile
            </Link>
            <Link
              to="/bookings"
              className="flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <FaSuitcase /> My Bookings
            </Link>
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </aside>

        {/* Main */}
        <section className="space-y-5">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-mmtDark">Personal Information</h1>
                <p className="text-xs text-gray-500">
                  Manage your personal information to keep your account secure.
                </p>
              </div>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 text-mmtBlue font-semibold text-sm hover:underline"
                >
                  <FaEdit /> Edit
                </button>
              )}
            </div>

            {!editing ? (
              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <Info icon={<FaUserCircle />} label="Full Name" value={`${user.firstName} ${user.lastName}`.trim() || "—"} />
                <Info icon={<FaEnvelope />} label="Email" value={user.email} />
                <Info icon={<FaPhone />} label="Mobile" value={user.phone || "—"} />
                <Info icon={<FaMapMarkerAlt />} label="City" value={user.city || "—"} />
                <Info icon={<FaBirthdayCake />} label="Date of Birth" value={user.dob || "—"} />
                <Info icon={<FaVenusMars />} label="Gender" value={user.gender || "—"} />
              </div>
            ) : (
              <form onSubmit={save} className="mt-5 grid sm:grid-cols-2 gap-3">
                <Field label="First Name" value={form.firstName} onChange={update("firstName")} required />
                <Field label="Last Name" value={form.lastName} onChange={update("lastName")} />
                <Field label="Mobile" value={form.phone} onChange={update("phone")} />
                <Field label="City" value={form.city} onChange={update("city")} />
                <Field label="Date of Birth" type="date" value={form.dob} onChange={update("dob")} />
                <label className="block">
                  <span className="text-xs font-semibold text-gray-600">Gender</span>
                  <select
                    value={form.gender}
                    onChange={update("gender")}
                    className="w-full mt-1 border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-mmtBlue"
                  >
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </label>
                <div className="sm:col-span-2 flex gap-2 mt-2">
                  <button className="bg-mmtBlue hover:bg-blue-700 text-white font-bold px-5 py-2 rounded">
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="border border-gray-300 text-gray-700 font-semibold px-5 py-2 rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-mmtDark">Recent Bookings</h2>
              <Link to="/bookings" className="text-sm text-mmtBlue font-semibold hover:underline">
                View all →
              </Link>
            </div>
            {bookings.length === 0 ? (
              <p className="text-sm text-gray-500 mt-3">
                No bookings yet. Plan your next trip and they'll appear here.
              </p>
            ) : (
              <ul className="mt-3 divide-y divide-gray-100">
                {bookings.slice(0, 3).map((b) => (
                  <li key={b.id} className="py-3 flex items-center justify-between text-sm">
                    <div>
                      <p className="font-semibold text-mmtDark">{b.hotelName}</p>
                      <p className="text-xs text-gray-500">
                        {b.checkIn} → {b.checkOut} • {b.id}
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      b.status === "Cancelled"
                        ? "bg-red-50 text-red-600"
                        : "bg-green-50 text-green-700"
                    }`}>
                      {b.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 border border-gray-100 rounded p-3">
      <span className="text-mmtBlue text-lg mt-0.5">{icon}</span>
      <div>
        <p className="text-[11px] uppercase tracking-wide text-gray-500">{label}</p>
        <p className="font-semibold text-mmtDark text-sm">{value}</p>
      </div>
    </div>
  );
}

function Field({ label, ...rest }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-gray-600">{label}</span>
      <input
        {...rest}
        className="w-full mt-1 border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-mmtBlue"
      />
    </label>
  );
}
