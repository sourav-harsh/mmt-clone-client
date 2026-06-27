import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import HotelSearchForm from "./components/HotelSearchForm.jsx";
import HotelCard from "./components/HotelCard.jsx";
import { hotels } from "../../kernel/presentation/utils/hotelsData.js";
import { FaFilter } from "react-icons/fa";

export default function HotelSearch() {
  const [params, setParams] = useSearchParams();
  const city = params.get("city") || "";
  const checkIn = params.get("checkIn") || "";
  const checkOut = params.get("checkOut") || "";
  const guests = params.get("guests") || "";

  const [maxPrice, setMaxPrice] = useState(60000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("popular");

  const results = useMemo(() => {
    const q = city.trim().toLowerCase();
    let list = hotels.filter((h) => {
      const matchesCity = q ? h.city.toLowerCase().includes(q) || h.name.toLowerCase().includes(q) : true;
      return matchesCity && h.price <= maxPrice && h.rating >= minRating;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [city, maxPrice, minRating, sort]);

  const qs = params.toString();

  const handleSearch = (form) => {
    setParams(form);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-mmtBlue py-6">
        <div className="max-w-6xl mx-auto px-4">
          <HotelSearchForm
            initial={{ city, checkIn, checkOut, guests }}
            onSearch={handleSearch}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 grid gap-6 md:grid-cols-[260px_1fr]">
        <aside className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-fit">
          <h3 className="font-bold text-mmtDark flex items-center gap-2">
            <FaFilter /> Filters
          </h3>
          <div className="mt-4">
            <label className="text-xs font-semibold text-gray-600">
              Max Price: ₹{maxPrice.toLocaleString()}
            </label>
            <input
              type="range"
              min="3000"
              max="60000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>
          <div className="mt-5">
            <p className="text-xs font-semibold text-gray-600 mb-2">Min Star Rating</p>
            <div className="flex flex-wrap gap-2">
              {[0, 3, 4, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`px-3 py-1 text-xs rounded border ${
                    minRating === r
                      ? "bg-mmtBlue text-white border-mmtBlue"
                      : "border-gray-300 text-gray-600 hover:border-mmtBlue"
                  }`}
                >
                  {r === 0 ? "Any" : `${r}+`}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <p className="text-xs font-semibold text-gray-600 mb-2">Sort By</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
            >
              <option value="popular">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Guest Rating</option>
            </select>
          </div>
        </aside>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-mmtDark">
              {results.length} stays{city ? ` in ${city}` : ""}
            </h2>
          </div>
          <div className="grid gap-4">
            {results.length === 0 ? (
              <div className="bg-white p-8 text-center rounded shadow-sm">
                <p className="text-gray-600">No hotels match your filters. Try adjusting them.</p>
              </div>
            ) : (
              results.map((h) => <HotelCard key={h.id} hotel={h} searchQs={qs} />)
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
