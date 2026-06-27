import { FaCheckCircle } from "react-icons/fa";

export default function PackageCard({ name, nights, price, img, highlights }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 flex flex-col">
      <img src={img} alt={name} className="h-48 w-full object-cover" loading="lazy" />
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-mmtDark">{name}</h3>
          <span className="text-xs bg-blue-50 text-mmtBlue px-2 py-0.5 rounded font-semibold">
            {nights}
          </span>
        </div>
        <ul className="mt-3 space-y-1 text-sm text-gray-600">
          {highlights.map((h) => (
            <li key={h} className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500 text-xs" /> {h}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-500">starting from</p>
            <p className="text-xl font-bold text-mmtDark">₹{price.toLocaleString()}</p>
          </div>
          <button className="bg-mmtOrange hover:bg-orange-600 text-white font-bold px-4 py-2 rounded text-sm">
            VIEW
          </button>
        </div>
      </div>
    </div>
  );
}
