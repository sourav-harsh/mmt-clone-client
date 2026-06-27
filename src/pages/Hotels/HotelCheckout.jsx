import {useMemo, useState} from "react";
import {Link, useParams, useSearchParams} from "react-router-dom";
import {FaCheckCircle, FaLock, FaMapMarkerAlt, FaPlus, FaStar} from "react-icons/fa";
import {getHotelById} from "../../kernel/presentation/utils/hotelsData.js";
import NotFound from "../../kernel/presentation/utils/NotFound.jsx";
import {calcTotals, fmtINR, nightsBetween} from "../../kernel/presentation/utils/bookingUtils.js";
import AddGuestDetails from "./components/AddGuestDetails.jsx";
import {MdEdit} from "react-icons/md";
import {IoMdClose} from "react-icons/io";

export default function HotelCheckout() {
    const {id} = useParams();
    const [params] = useSearchParams();
    const hotel = getHotelById(id);

    const [guest, setGuest] = useState([
        {
            id: 1,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            requests: "",
            isAdded: false
        }
    ]);
    const [guestHistory, setGuestHistory] = useState([
        {
            id: 2,
            firstName: "Shashank",
            lastName: "Shekhar",
            email: "shashank@gmail.com",
            phone: "56754654",
            requests: "fgdf",
            isAdded: false
        }, {
            id: 3,
            firstName: "Sourav",
            lastName: "Kumar",
            email: "asdf@gmail.com",
            phone: "34456676",
            requests: "dfwer",
            isAdded: false
        }
    ]);
    const [payment, setPayment] = useState("card");
    const [confirmed, setConfirmed] = useState(false);

    const room = useMemo(() => {
        if (!hotel) return null;
        const rid = params.get("roomId");
        return hotel.rooms.find((r) => r.id === rid) || hotel.rooms[0];
    }, [hotel, params]);

    if (!hotel) return <NotFound/>;

    const checkIn = params.get("checkIn") || new Date().toISOString().slice(0, 10);
    const checkOut =
        params.get("checkOut") ||
        new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    const nights = nightsBetween(checkIn, checkOut);

    const rooms = params.get("guests")?.slice(0, 1) || 1;
    const totals = calcTotals(room.price, nights, rooms);

    const update = (k) => (e) => {
        const newGuest = [...guest];

        // Update the key on the first element safely
        newGuest[0] = {
            ...newGuest[0],
            [k]: e.target.value
        };

        setGuest(newGuest);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setConfirmed(true);
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    if (confirmed) {
        return (
            <div className="bg-gray-50 min-h-screen py-10">
                <div
                    className="max-w-2xl mx-auto px-4 bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
                    <FaCheckCircle className="text-green-600 text-5xl mx-auto"/>
                    <h1 className="text-2xl font-bold text-mmtDark mt-4">Booking Confirmed!</h1>
                    <p className="text-sm text-gray-600 mt-2">
                        Thanks {guest.firstName || "Guest"}, your stay at <strong>{hotel.name}</strong> is
                        booked from <strong>{checkIn}</strong> to <strong>{checkOut}</strong>.
                    </p>
                    <div className="mt-4 text-left bg-gray-50 rounded p-4 text-sm">
                        <p><strong>Booking ID:</strong> MMT{Math.floor(Math.random() * 9_000_000 + 1_000_000)}</p>
                        <p><strong>Room:</strong> {room.name}</p>
                        <p><strong>Amount Paid:</strong> {fmtINR(totals.total)}</p>
                    </div>
                    <Link
                        to="/hotels"
                        className="inline-block mt-6 bg-mmtBlue hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded"
                    >
                        Back to Hotels
                    </Link>
                </div>
            </div>
        );
    }

    function addGuestOverlay() {
        document.getElementById("add-guest-overlay").classList.toggle("hidden");
    }

    function removeGuest(i) {
        console.log(i)
        const newGuest = [...guest];
        const updatedGuest =newGuest.filter(g => g.id !== i)
        console.log('newGuest', updatedGuest)
        setGuest(updatedGuest);
        guestHistory.find(g => g.id === i).isAdded = false;
    }

    function addGuest() {

    }

    function onCheckboxChange(e, gh, i) {
        const isChecked = e.target.checked;

        if (isChecked) {
            gh.isAdded = true;
            setGuest([...guest, gh]);
        } else {
            gh.isAdded = false;
            const updatedGuest= guest.filter(g => g.id !== gh.id);
            setGuest(updatedGuest);
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen py-6">
            <div className="max-w-6xl mx-auto px-4 grid gap-5 lg:grid-cols-[2fr_1fr]">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                        <h2 className="font-bold text-mmtDark text-lg">Guest Details</h2>
                        <p className="text-xs text-gray-500">As mentioned on your government ID</p>
                        <AddGuestDetails guest={guest} update={update}/>
                        <div className="space-y-3" id="add-guests">
                            {guest?.map((g, i) => (
                                <div className={i === 0 ? "hidden" : "flex items-center justify-between border-b border-b-gray-200"}>
                                    <p>{g.firstName} {g.lastName}</p>
                                    <button type="button" onClick={() => removeGuest(g.id)}><IoMdClose /></button>
                                </div>
                            ))}
                        </div>
                        <div
                            className="fixed inset-0 bg-black/50 rounded-lg shadow-sm border border-gray-100 p-5 flex items-center justify-center hidden"
                            id="add-guest-overlay">
                            <div
                                className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 w-[30rem] h-96 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between border-b border-b-gray-200">
                                        <p className="text-2xl font-bold">Saved Guest</p>
                                        <button
                                            type="button"
                                            onClick={addGuest}
                                            className="text-mmtBlue hover:text-blue-700 font-bold rounded flex items-center gap-2"
                                        >
                                            <FaPlus/> Add Guest
                                        </button>
                                    </div>
                                    <div className="space-y-2 mt-5">
                                        {guestHistory?.map((gh, i) => (
                                            <div
                                                className="flex items-center justify-between border-b border-b-gray-200">
                                                <div className="flex items-center gap-2">
                                                    <input type="checkbox" checked={gh.isAdded}
                                                           onChange={(e) => onCheckboxChange(e, gh, i + 1)}/>
                                                    <p>{gh.firstName} {gh.lastName}</p>
                                                </div>
                                                <button type="button">
                                                    <MdEdit/>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-center border-t border-t-gray-400">
                                    <button
                                        type="button"
                                        className="mt-4 bg-mmtBlue hover:bg-blue-700 text-white font-bold px-20 py-2.5 rounded flex items-center gap-2"
                                        onClick={() => document.getElementById("add-guest-overlay").classList.add("hidden")}
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button onClick={addGuestOverlay}
                                type="button"
                                className="mt-4 bg-mmtBlue hover:bg-blue-700 text-white font-bold px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed rounded flex items-center gap-2"
                                disabled={guest.length === 0}
                        >
                            <FaPlus/> Add Guest
                        </button>
                    </section>

                    <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                        <h2 className="font-bold text-mmtDark text-lg">Payment Method</h2>
                        <div className="mt-3 space-y-2">
                            {[
                                {id: "card", label: "Credit / Debit Card"},
                                {id: "upi", label: "UPI"},
                                {id: "netbanking", label: "Net Banking"},
                                {id: "wallet", label: "Wallet"},
                            ].map((p) => (
                                <label
                                    key={p.id}
                                    className={`flex items-center gap-3 border rounded p-3 cursor-pointer ${
                                        payment === p.id ? "border-mmtBlue bg-blue-50/50" : "border-gray-200"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="pay"
                                        checked={payment === p.id}
                                        onChange={() => setPayment(p.id)}
                                    />
                                    <span className="text-sm font-medium text-mmtDark">{p.label}</span>
                                </label>
                            ))}
                        </div>

                        {payment === "card" && (
                            <div className="grid gap-3 sm:grid-cols-2 mt-4">
                                <Input label="Card Number" placeholder="1234 5678 9012 3456" required/>
                                <Input label="Name on Card" required/>
                                <Input label="Expiry (MM/YY)" placeholder="MM/YY" required/>
                                <Input label="CVV" type="password" maxLength={4} required/>
                            </div>
                        )}
                        {payment === "upi" && (
                            <div className="mt-4">
                                <Input label="UPI ID" placeholder="yourname@bank" required/>
                            </div>
                        )}
                    </section>

                    <button
                        type="submit"
                        className="w-full bg-mmtOrange hover:bg-orange-600 text-white font-bold py-3 rounded flex items-center justify-center gap-2"
                    >
                        <FaLock/> PAY {fmtINR(totals.total)}
                    </button>
                </form>

                <aside className="space-y-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <img src={hotel.img} alt={hotel.name} className="w-full h-40 object-cover"/>
                        <div className="p-4">
                            <h3 className="font-bold text-mmtDark">{hotel.name}</h3>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                <FaMapMarkerAlt/> {hotel.address}
                            </p>
                            <span
                                className="inline-flex items-center gap-1 mt-2 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                <FaStar className="text-[10px]"/> {hotel.rating}
              </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                        <h3 className="font-bold text-mmtDark">Your Booking</h3>
                        <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                            <div>
                                <p className="text-[11px] text-gray-500">Check-in</p>
                                <p className="font-semibold">{checkIn}</p>
                            </div>
                            <div>
                                <p className="text-[11px] text-gray-500">Check-out</p>
                                <p className="font-semibold">{checkOut}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-[11px] text-gray-500">Room</p>
                                <p className="font-semibold">{room.name}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-[11px] text-gray-500">Stay</p>
                                <p className="font-semibold">{nights} {nights > 1 ? "nights" : "night"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                        <h3 className="font-bold text-mmtDark">Price Breakup</h3>
                        <Row label={`Room price (${rooms} × ${fmtINR(room.price)})`} value={fmtINR(totals.subtotal)}/>
                        <Row label="Taxes & fees (18%)" value={fmtINR(totals.taxes)}/>
                        <Row label="Discount" value={`- ${fmtINR(totals.discount)}`} positive/>
                        <div className="border-t mt-2 pt-2 flex justify-between font-bold text-mmtDark">
                            <span>Total Amount</span>
                            <span>{fmtINR(totals.total)}</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function Input({label, ...rest}) {
    return (
        <label className="block">
            <span className="text-xs font-semibold text-gray-600">{label}</span>
            <input
                {...rest}
                className="w-full mt-1 border border-gray-200 rounded p-2 text-sm outline-none focus:border-mmtBlue"
            />
        </label>
    );
}

function Row({label, value, positive}) {
    return (
        <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">{label}</span>
            <span className={positive ? "text-green-600 font-semibold" : "text-mmtDark font-semibold"}>
        {value}
      </span>
        </div>
    );
}
