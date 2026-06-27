import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HotelCard({ hotel, searchQs = "" }) {
    const { id, name, city, address, rating, reviews, price, img, amenities = [] } = hotel;
    const detailUrl = `/hotels/${id}${searchQs ? `?${searchQs}` : ""}`;

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 flex flex-col sm:flex-row">
            <Link to={detailUrl} className="sm:w-56 shrink-0">
                <img src={img} alt={name} className="w-full h-44 sm:h-full object-cover" loading="lazy" />
            </Link>
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <Link to={detailUrl}>
                        <h3 className="font-bold text-mmtDark text-lg hover:text-mmtBlue">{name}</h3>
                    </Link>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <FaMapMarkerAlt /> {address || city}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
            <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
              <FaStar className="text-[10px]" /> {rating}
            </span>
                        <span className="text-xs text-gray-500">({reviews} reviews)</span>
                    </div>
                    {amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {amenities.slice(0, 4).map((a) => (
                                <span key={a} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {a}
                </span>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div>
                        <p className="text-xl font-bold text-mmtDark">₹{price.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-500">per night, incl. taxes</p>
                    </div>
                    <Link
                        to={detailUrl}
                        className="bg-mmtOrange hover:bg-orange-600 text-white font-bold px-4 py-2 rounded text-sm"
                    >
                        VIEW DETAILS
                    </Link>
                </div>
            </div>
        </div>
    );
}
