import {Link} from "react-router-dom";
import {FaBus, FaCar, FaHotel, FaPlane, FaTrain, FaUmbrellaBeach} from "react-icons/fa";
import SearchTabs from "./components/SearchTabs.jsx";
import OfferCard from "./components/OfferCard.jsx";
import DestinationCard from "./components/DestinationCard.jsx";
import SectionTitle from "../../kernel/presentation/utils/SectionTitle.jsx";

const services = [
    {to: "/flights", label: "Flights", icon: <FaPlane/>},
    {to: "/hotels", label: "Hotels", icon: <FaHotel/>},
    {to: "/holidays", label: "Holidays", icon: <FaUmbrellaBeach/>},
    {to: "/trains", label: "Trains", icon: <FaTrain/>},
    {to: "/", label: "Buses", icon: <FaBus/>},
    {to: "/", label: "Cabs", icon: <FaCar/>},
];

const offers = [
    {
        title: "Flat 20% OFF on Flights",
        desc: "Use code MMTFLY and save on your next domestic trip.",
        tag: "FLIGHTS",
        color: "from-blue-500 to-blue-700",
        isAvailable: false,
        to:'/hotels'
    },
    {
        title: "Hotels @ ₹999",
        desc: "Stays in 100+ cities. Limited inventory — book fast.",
        tag: "HOTELS",
        color: "from-pink-500 to-rose-600",
        isAvailable: true,
        to:'/hotels'
    },
    {
        title: "International Holidays",
        desc: "EMI from ₹4,999/month. Bali, Dubai, Maldives & more.",
        tag: "HOLIDAYS",
        color: "from-amber-500 to-orange-600",
        isAvailable: false,
        to:'/hotels'
    },
];

const destinations = [
    {name: "Goa", price: "₹4,500", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800"},
    {name: "Jaipur", price: "₹3,200", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800"},
    {name: "Manali", price: "₹5,800", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800"},
    {name: "Kerala", price: "₹6,900", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800"},
    {
        name: "Ladakh",
        price: "₹12,500",
        img: "https://cdn.trekthehimalayas.com/images/Ladakhsightseeingpackage5nightsand6days/AppCover/171afba5-7189-4c6f-bab4-32491ca35144_ladakh%20sighseeing%20package%20cover%20image%20(2).webp"
    },
    {name: "Andaman", price: "₹14,200", img: "https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=800"},
];

export default function Home() {
    return (
        <div>
            {/* Hero with search */}
            <section className="bg-[url('/images/home_hero_background_1.jpg')]  pt-6 h-[40rem] bg-center bg-no-repeat">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
                        <div className="flex flex-wrap gap-3 md:gap-6 mb-5 hidden">
                            {services.map((s) => (
                                <Link
                                    key={s.label}
                                    to={s.to}
                                    className="flex flex-col items-center text-gray-700 hover:text-mmtBlue transition min-w-[70px]"
                                >
                                    <span className="text-2xl mb-1">{s.icon}</span>
                                    <span className="text-xs font-semibold">{s.label}</span>
                                </Link>
                            ))}
                        </div>
                        <SearchTabs/>
                    </div>
                </div>
            </section>

            {/* Offers */}
            <section className="max-w-7xl mx-auto px-4 -mt-16">
                <div className="grid gap-4 md:grid-cols-3">
                    {offers.map((o) => (
                        <OfferCard key={o.title} {...o} />
                    ))}
                </div>
            </section>

            {/* Destinations */}
            <section className="max-w-7xl mx-auto px-4 mt-14">
                <SectionTitle
                    title="Top Destinations"
                    subtitle="Handpicked getaways at unbeatable prices"
                />
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                    {destinations.map((d) => (
                        <DestinationCard key={d.name} {...d} />
                    ))}
                </div>
            </section>

            {/* Why us */}
            <section className="max-w-7xl mx-auto px-4 mt-14 mb-6">
                <SectionTitle title="Why MakeMyTrip?"/>
                <div className="grid gap-5 md:grid-cols-3">
                    {[
                        {t: "Trusted by Millions", d: "Over 50M+ travellers trust us for their bookings every year."},
                        {t: "24x7 Customer Support", d: "Help, anytime. Our team is available round-the-clock."},
                        {t: "Best Price Guarantee", d: "Found a lower price? We'll match it and add a discount."},
                    ].map((x) => (
                        <div key={x.t} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-mmtDark">{x.t}</h3>
                            <p className="text-sm text-gray-600 mt-2">{x.d}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
