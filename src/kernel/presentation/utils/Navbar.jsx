import {Link, NavLink, useNavigate} from "react-router-dom";
import {FaHome, FaHotel, FaPlane, FaTrain, FaUmbrellaBeach, FaUserCircle,} from "react-icons/fa";
import ComingSoon from "./ComingSoon.jsx";
import {useEffect, useState} from "react";

const links = [
    {to: "/", label: "Home", icon: <FaHome/>, isActive: false, isAvailable: true},
    {to: "/flights", label: "Flights", icon: <FaPlane/>, isActive: false, isAvailable: false},
    {to: "/hotels", label: "Hotels", icon: <FaHotel/>, isActive: false, isAvailable: true},
    {to: "/holidays", label: "Holidays", icon: <FaUmbrellaBeach/>, isActive: false, isAvailable: false},
    {to: "/trains", label: "Trains", icon: <FaTrain/>, isActive: false, isAvailable: false},
];


export default function Navbar() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        localStorage.getItem("accessToken") && setLoggedIn(true);
    }, []);

    return (
        <header className="bg-white  shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
                <Link to="/" className="flex items-center gap-2">
                    <img src="/images/logo.svg" alt="MakeMyTrip" className="h-9 w-9"/>
                    <span className="text-xl font-bold text-mmtDark">
                        make
                        <span className="text-mmtBlue">my</span>
                        <span className="text-mmtOrange">trip</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-1">
                    {links.map((l) => (
                        <div key={l.to} className="relative">
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

                {loggedIn ? <div onClick={() => document.getElementById("profileDropdown").classList.toggle("hidden")} className="cursor-pointer border border-green-400 rounded-full relative">
                        <FaUserCircle className="text-2xl text-green-400 cursor-pointer"/>
                    <div className="absolute top-8 right-0 min-w-40 min-h-20 bg-black/80 rounded-xl flex flex-col items-center justify-center gap-5 p-5 hidden cursor-pointer" id="profileDropdown">
                        <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl text-white w-full" onClick={() => navigate("/profile")}>
                            Profile
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-xl text-white w-full">
                            Logout
                        </button>
                    </div>
                </div> :
                    <button className="flex items-center gap-2 text-gray-700 hover:text-mmtBlue"
                            onClick={() => navigate("/login")}>
                        <FaUserCircle className="text-2xl"/>
                        <span className="hidden sm:inline text-sm font-semibold">Login</span>
                    </button>
                }
            </div>

            {/* mobile nav */}
            <nav className="md:hidden flex overflow-x-auto border-t border-gray-100 z-50">
                {links.map((l) => (
                    <div key={l.to} className="relative">
                        <NavLink
                            key={l.to}
                            to={l.to}
                            end={l.to === "/"}
                            className={({isActive}) =>
                                `flex flex-col items-center justify-center min-w-[80px] px-3 py-2 text-xs font-medium ${l.isAvailable ? '' : 'opacity-25 pointer-events-none'} ${
                                    isActive ? "text-mmtBlue" : "text-gray-600"
                                }`
                            }
                        >
                            <span className="text-lg">{l.icon}</span>
                            {l.label}
                        </NavLink>
                        <ComingSoon isActive={!l.isAvailable} classValue="-top-0 -right-1"/>
                    </div>
                ))}
            </nav>
        </header>
    );
}
