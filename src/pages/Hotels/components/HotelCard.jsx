import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

export default function HotelCard({ name, city, rating, reviews, price, img }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 flex flex-col sm:flex-row">
      <img src={img} alt={name} className="w-full sm:w-56 h-44 object-cover" loading="lazy" />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-mmtDark text-lg">{name}</h3>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <FaMapMarkerAlt /> {city}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
              <FaStar className="text-[10px]" /> {rating}
            </span>
            <span className="text-xs text-gray-500">({reviews} reviews)</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-xl font-bold text-mmtDark">₹{price.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500">per night, incl. taxes</p>
          </div>
          <button className="bg-mmtOrange hover:bg-orange-600 text-white font-bold px-4 py-2 rounded text-sm">
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
}
