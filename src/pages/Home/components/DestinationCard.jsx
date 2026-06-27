import { FaMapMarkerAlt } from "react-icons/fa";

export default function DestinationCard({ name, price, img }) {
  return (
    <div className="rounded-lg overflow-hidden bg-white shadow-sm border border-gray-100 group">
      <div className="relative h-44 overflow-hidden">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-mmtOrange" />
          <span className="font-semibold text-mmtDark">{name}</span>
        </div>
        <span className="text-sm">
          from <span className="font-bold text-mmtBlue">{price}</span>
        </span>
      </div>
    </div>
  );
}
