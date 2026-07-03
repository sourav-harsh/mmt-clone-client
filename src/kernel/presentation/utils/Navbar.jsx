import {Link, NavLink, useNavigate} from "react-router-dom";
import {
    FaHome,
    FaHotel,
    FaPlane,
    FaSignOutAlt,
    FaSuitcase,
    FaTrain,
    FaUmbrellaBeach,
    FaUserCircle,
} from "react-icons/fa";
import ComingSoon from "./ComingSoon.jsx";
import useAuth from "./useAuth.js";
import {useEffect, useRef, useState} from "react";
import {logout} from "./authStore.js";

const links = [
    {to: "/", label: "Home", icon: <FaHome/>, isActive: false, isAvailable: true},
    {to: "/flights", label: "Flights", icon: <FaPlane/>, isActive: false, isAvailable: false},
    {to: "/hotels", label: "Hotels", icon: <FaHotel/>, isActive: false, isAvailable: true},
    {to: "/holidays", label: "Holidays", icon: <FaUmbrellaBeach/>, isActive: false, isAvailable: false},
    {to: "/trains", label: "Trains", icon: <FaTrain/>, isActive: false, isAvailable: false},
];


export default function Navbar() {
    const user = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, []);

    const handleLogout = () => {
        logout();
        setOpen(false);
        navigate("/");
    };

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
                    {links.map((l,i) => (
                        <div key={l.to + i} className="relative">
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

                <div className="relative" ref={ref}>
                    <button
                        onClick={() => (user ? setOpen((o) => !o) : navigate("/auth"))}
                        className="flex items-center gap-2 text-gray-700 hover:text-mmtBlue"
                    >
                        <FaUserCircle className="text-2xl" />
                        <span className="hidden sm:inline text-sm font-semibold">
              {user ? `Hi, ${user.firstName}` : "Login / Signup"}
            </span>
                    </button>

                    {user && open && (
                        <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-100 rounded-lg shadow-lg py-2">
                            <div className="px-4 py-2 border-b border-gray-100">
                                <p className="font-semibold text-mmtDark text-sm truncate">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                            <DropLink to="/profile" icon={<FaUserCircle />} onClick={() => setOpen(false)}>
                                My Profile
                            </DropLink>
                            <DropLink to="/bookings" icon={<FaSuitcase />} onClick={() => setOpen(false)}>
                                My Bookings
                            </DropLink>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                    )}

                    {!user && open && null}
                </div>
            </div>

            {/* mobile nav */}
            <nav className="md:hidden flex overflow-x-auto border-t border-gray-100 z-50">
                {links.map((l,  i) => (
                    <div key={l.to + i} className="relative">
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


function DropLink({ to, icon, children, onClick }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-mmtBlue"
        >
            {icon} {children}
        </Link>
    );
}
