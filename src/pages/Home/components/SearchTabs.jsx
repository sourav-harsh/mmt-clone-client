import {useState} from "react";
import {FaHotel, FaPlane, FaTrain, FaUmbrellaBeach} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import ComingSoon from "../../../kernel/presentation/utils/ComingSoon.jsx";

const tabs = [
    {id: "flights", label: "Flights", icon: <FaPlane/>, to: "/flights", isActive: true},
    {id: "hotels", label: "Hotels", icon: <FaHotel/>, to: "/hotels", isActive: false},
    {id: "holidays", label: "Holidays", icon: <FaUmbrellaBeach/>, to: "/holidays", isActive: true},
    {id: "trains", label: "Trains", icon: <FaTrain/>, to: "/trains", isActive: true},
];

export default function SearchTabs() {
    const [active, setActive] = useState("hotels");
    const navigate = useNavigate();
    const current = tabs.find((t) => t.id === active);

    return (
        <div>
            {/*navigation bar*/}
            <div className="flex border-b border-gray-200 pt-1 mb-5 overflow-x-auto">
                {tabs.map((t) => (

                    <div className="relative">
                        <button
                            key={t.id}
                            onClick={() => setActive(t.id)}
                            className={` flex items-center gap-2 px-5 py-3 text-sm font-semibold disabled:opacity-25 disabled:pointer-events-none whitespace-nowrap border-b-2 transition ${
                                active === t.id
                                    ? "border-mmtBlue text-mmtBlue"
                                    : "border-transparent text-gray-600 hover:text-mmtBlue"
                            }`}
                            disabled={t.isActive}
                        >
                            {t.icon} {t.label}
                        </button>
                        <ComingSoon isActive={t.isActive} classValue="-top-1 -right-1" key={`${t.id}-coming-soon`} />
                    </div>
                ))}
            </div>

            <div className="grid gap-3 md:grid-cols-4">
                <Field label={active === "hotels" ? "City" : "From"} placeholder="Enter city"/>
                <Field
                    label={active === "hotels" ? "Check-in" : "Depart"}
                    type="date"
                    defaultValue={new Date().toISOString().slice(0, 10)}
                />
                <Field
                    label={active === "hotels" ? "Check-out" : "Return"}
                    type="date"
                    defaultValue={
                        (() => {
                            const tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            return tomorrow.toISOString().slice(0, 10);
                        })()
                    }

                />
                <Field label="Travellers" placeholder="1 Adult"/>
            </div>

            <div className="text-center mt-6">
                <button
                    onClick={() => navigate(current.to)}
                    className="bg-mmtOrange hover:bg-orange-600 text-white font-bold px-12 py-3 rounded-full shadow"
                >
                    SEARCH
                </button>
            </div>
        </div>
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
