import {Link, NavLink} from "react-router-dom";
import {FaHome, FaHotel, FaPlane, FaTrain, FaUmbrellaBeach, FaUserCircle,} from "react-icons/fa";
import ComingSoon from "./ComingSoon.jsx";

const links = [
    {to: "/", label: "Home", icon: <FaHome/>, isActive: false, isAvailable: true},
    {to: "/flights", label: "Flights", icon: <FaPlane/>, isActive: false, isAvailable: false},
    {to: "/hotels", label: "Hotels", icon: <FaHotel/>, isActive: false, isAvailable: true},
    {to: "/holidays", label: "Holidays", icon: <FaUmbrellaBeach/>, isActive: false, isAvailable: false},
    {to: "/trains", label: "Trains", icon: <FaTrain/>, isActive: false, isAvailable: false},
];


export default function Navbar() {
    return (
        <header className="bg-white  shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
                <Link to="/" className="flex items-center gap-2">
                    <img src="/images/logo.svg" alt="MakeMyTrip" className="h-9 w-9"/>
                    <span className="text-xl font-bold text-mmtDark">
            make<span className="text-mmtBlue">my</span>
            <span className="text-mmtOrange">trip</span>
          </span>
                </Link>

                <nav className="hidden md:flex items-center gap-1">
                    {links.map((l) => (
                        <div className="relative">
                            <NavLink
                                key={l.to}
                                to={l.to}
                                end={l.to === "/"}
                                className={({isActive}) =>
                                    `relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition ${l.isAvailable ? '' : 'opacity-25 pointer-events-none'} ${
                                        isActive
                                            ? "text-mmtBlue bg-blue-50"
                                            : "text-gray-700 hover:text-mmtBlue hover:bg-gray-50"
                                    }`
                                }
                            >
                                <span className="text-base">{l.icon}</span>
                                {l.label}
                            </NavLink>
                            <ComingSoon isActive={!l.isAvailable} classValue="-top-2 -right-1"/>
                        </div>
                    ))}
                </nav>

                <button className="flex items-center gap-2 text-gray-700 hover:text-mmtBlue">
                    <FaUserCircle className="text-2xl"/>
                    <span className="hidden sm:inline text-sm font-semibold">Login</span>
                </button>
            </div>

            {/* mobile nav */}
            <nav className="md:hidden flex overflow-x-auto border-t border-gray-100">
                {links.map((l) => (
                    <NavLink
                        key={l.to}
                        to={l.to}
                        end={l.to === "/"}
                        className={({isActive}) =>
                            `flex flex-col items-center justify-center min-w-[80px] px-3 py-2 text-xs font-medium ${
                                isActive ? "text-mmtBlue" : "text-gray-600"
                            }`
                        }
                    >
                        <span className="text-lg">{l.icon}</span>
                        {l.label}
                    </NavLink>
                ))}
            </nav>
        </header>
    );
}
