import {useState} from "react";

const roomOptions = ["1 Room, 2 Adults", "2 Rooms, 4 Adults", "3 Rooms, 6 Adults","4 Rooms, 8 Adults","5 Rooms, 10 Adults","6 Rooms, 12 Adults","7 Rooms, 14 Adults","8 Rooms, 16 Adults","9 Rooms, 18 Adults","10 Rooms, 20 Adults"];

export default function HotelSearchForm({onSearch, initial = {}}) {
    const today = new Date().toISOString().slice(0, 10);
    const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    const [form, setForm] = useState({
        city: initial.city || "Goa",
        checkIn: initial.checkIn || today,
        checkOut: initial.checkOut || tomorrow,
        guests: roomOptions.find(v => v === initial.guests) || ["1 Room, 2 Adults"],
    });

    const update = (k) => (e) => setForm({...form, [k]: e.target.value});

    const submit = (e) => {
        e.preventDefault();
        onSearch?.(form);
    };

    return (
        <form onSubmit={submit} className="bg-white rounded-lg shadow-lg p-5">
            <div className="grid gap-3 md:grid-cols-4">
                <Field label="City, Hotel or Area" value={form.city} onChange={update("city")}/>
                <Field label="Check-In" type="date" value={form.checkIn} onChange={update("checkIn")}/>
                <Field label="Check-Out" type="date" value={form.checkOut} onChange={update("checkOut")}/>
                <List
                    label="Select Rooms"
                    roomOptions={roomOptions}
                    value={form.guests}
                    onChange={update("guests")}
                />
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

function Field({label, ...rest}) {
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

function List({ label, roomOptions = [], ...rest }) {
    return (
        <label className="block border border-gray-200 rounded-md p-3 hover:border-mmtBlue transition cursor-pointer">
            {/* Dropdown Top Label Text */}
            <span className="text-xs text-gray-500 font-semibold block mb-1">
                {label}
            </span>

            {/* The Dropdown Select Menu */}
            <select
                {...rest}
                className="w-full bg-transparent text-sm font-medium text-gray-800 outline-none border-none p-0 cursor-pointer appearance-none"
            >
                {roomOptions.map((v, i) => (
                    <option key={i} value={v}>
                        {v}
                    </option>
                ))}
            </select>
        </label>
    );
}

