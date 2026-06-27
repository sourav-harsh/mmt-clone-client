import { useState } from "react";

export default function HotelSearchForm({ onSearch, initial = {} }) {
    const today = new Date().toISOString().slice(0, 10);
    const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    const [form, setForm] = useState({
        city: initial.city || "Goa",
        checkIn: initial.checkIn || today,
        checkOut: initial.checkOut || tomorrow,
        guests: initial.guests || "1 Room, 2 Adults",
    });

    const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const submit = (e) => {
        e.preventDefault();
        onSearch?.(form);
    };

    return (
        <form onSubmit={submit} className="bg-white rounded-lg shadow-lg p-5">
            <div className="grid gap-3 md:grid-cols-4">
                <Field label="City, Hotel or Area" value={form.city} onChange={update("city")} />
                <Field label="Check-In" type="date" value={form.checkIn} onChange={update("checkIn")} />
                <Field label="Check-Out" type="date" value={form.checkOut} onChange={update("checkOut")} />
                <Field label="Rooms & Guests" value={form.guests} onChange={update("guests")} />
            </div>
            <div className="text-center mt-5">
                <button
                    type="submit"
                    className="bg-mmtOrange hover:bg-orange-600 text-white font-bold px-12 py-3 rounded-full shadow"
                >
                    SEARCH HOTELS
                </button>
            </div>
        </form>
    );
}

function Field({ label, ...rest }) {
    return (
        <label className="block border border-gray-200 rounded-md p-3 hover:border-mmtBlue transition">
            <span className="text-xs text-gray-500 font-semibold">{label}</span>
            <input
                {...rest}
                className="w-full outline-none mt-1 text-sm font-medium text-mmtDark bg-transparent"
            />
        </label>
    );
}
