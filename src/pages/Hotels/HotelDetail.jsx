import {useEffect, useState} from "react";
import {Link, useParams, useSearchParams} from "react-router-dom";
import {FaCheckCircle, FaMapMarkerAlt, FaStar} from "react-icons/fa";
import NotFound from "../../kernel/presentation/utils/NotFound.jsx";
import RoomSelection from "./components/RoomSelection.jsx";
import {useHotelInfoHook} from "./hooks/HotelInfoHook.ts";

export default function HotelDetail() {


    const {id} = useParams();
    const [params] = useSearchParams();
    const [hotel, sethotel] = useState();
    const [activeImg, setActiveImg] = useState(0);
    const {
        hotelInfo,
        loading,
        error
    } = useHotelInfoHook();

    const getHotelWithId = async (id) => {
        try {
            const startDate = params.get("checkIn");
            const endDate = params.get("checkOut");

            // Safely extract the room number
            const guestsString = params.get("guests") || "";
            const roomsCount = Number(guestsString.split("Room").at(0)) || 1;

            // Await the API call directly
            const getHotel = await hotelInfo(id, {startDate, endDate, roomsCount});

            // Return the clean inner value directly
            return getHotel.data;
        } catch (error) {
            console.error("Failed to fetch hotel info:", error);
            throw error;
        }
    };

    useEffect(() => {
        console.log({
            id,
            city: params.get("city"),
            checkIn: params.get("checkIn"),
            checkOut: params.get("checkOut"),
            guests: params.get("guests")
        });
        const loadData = async () => {
            // Await the function to extract the direct inner data value
            const hotelData = await getHotelWithId(id);

            console.log(hotelData); // This is your clean, direct inner data object!
            sethotel(hotelData);
        };

        loadData();
    }, [id]);

    if (!hotel) return <NotFound/>;

    const qs = params.toString();

    return (
        <div className="bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-6">
                <nav className="text-xs text-gray-500 mb-3">
                    <Link to="/hotels" className="hover:text-mmtBlue">Hotels</Link> /{" "}
                    <Link to={`/hotels/search?${qs}`} className="hover:text-mmtBlue">{hotel.hotel.city}</Link> /{" "}
                    <span className="text-mmtDark">{hotel.hotel.name}</span>
                </nav>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <h1 className="text-2xl font-bold text-mmtDark">{hotel.hotel.name}</h1>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                <FaMapMarkerAlt/> {hotel.hotel.contactInfo.address}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
              <span className="bg-green-600 text-white text-sm font-bold px-2 py-1 rounded flex items-center gap-1">
                <FaStar className="text-xs"/> {hotel.hotel.rating}
              </span>
                            <div>
                                <p className="text-sm font-semibold text-mmtDark">Excellent</p>
                                <p className="text-xs text-gray-500">({hotel.hotel.reviews} reviews)</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-[2fr_1fr] mt-5">
                        <img
                            src={hotel.hotel?.photos.at(activeImg)}
                            alt={hotel.hotel.name}
                            className="w-full h-80 object-cover rounded-lg"
                        />
                        <div className="grid grid-cols-2 gap-3">
                            {hotel.hotel.photos.map((g, i) => (
                                <button key={g} onClick={() => setActiveImg(i)} className={` ${i === 0 ? 'hidden':'block'}`}>
                                    <img
                                        src={g}
                                        alt=""
                                        className={`w-full h-[152px] object-cover rounded-lg border-2 ${
                                            activeImg === i ? "border-mmtOrange" : "border-transparent"
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-[2fr_1fr] mt-5">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                        <h2 className="font-bold text-mmtDark text-lg">About this property</h2>
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{hotel.hotel.description}</p>

                        <h3 className="font-bold text-mmtDark mt-6">Amenities</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                            {hotel.hotel.amenities.map((a) => (
                                <div key={a} className="flex items-center gap-2 text-sm text-gray-700">
                                    <FaCheckCircle className="text-green-600"/> {a}
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 h-fit">
                        <p className="text-xs text-gray-500">Starting from</p>
                        <p className="text-3xl font-bold text-mmtDark">
                            ₹{(Math.min(...hotel.rooms.map(room => room.price))).toLocaleString()}
                            <span className="text-sm text-gray-500 font-normal"> / night</span>
                        </p>
                        <p className="text-[11px] text-gray-500 mt-1">+ taxes & fees</p>
                        <a
                            href="#rooms"
                            className="block text-center mt-4 bg-mmtOrange hover:bg-orange-600 text-white font-bold py-3 rounded"
                        >
                            SELECT ROOMS
                        </a>
                    </aside>
                </div>

                <div id="rooms" className="mt-6">
                    <RoomSelection hotel={hotel} qs={qs}/>
                </div>
            </div>
        </div>
    );
}
