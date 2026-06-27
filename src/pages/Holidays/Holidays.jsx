import PageHero from "../../kernel/presentation/utils/PageHero.jsx";
import SectionTitle from "../../kernel/presentation/utils/SectionTitle.jsx";
import PackageCard from "./components/PackageCard.jsx";

const packages = [
  { name: "Magical Bali", nights: "5N / 6D", price: 38999, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800", highlights: ["Flights", "4★ Hotels", "Sightseeing"] },
  { name: "Dubai Delight", nights: "4N / 5D", price: 45999, img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800", highlights: ["Desert Safari", "Burj Khalifa", "City Tour"] },
  { name: "Maldives Escape", nights: "3N / 4D", price: 58999, img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800", highlights: ["Water Villa", "Seaplane", "All Meals"] },
  { name: "Singapore Combo", nights: "5N / 6D", price: 49999, img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800", highlights: ["Universal Studios", "Sentosa", "City Tour"] },
  { name: "Thailand Special", nights: "6N / 7D", price: 32999, img: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800", highlights: ["Phuket", "Krabi", "Island Tour"] },
  { name: "Europe Highlights", nights: "8N / 9D", price: 129999, img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800", highlights: ["Paris", "Swiss Alps", "Rome"] },
];

export default function Holidays() {
  return (
    <div>
      <PageHero
        title="Holiday Packages"
        subtitle="Curated trips with flights, stays and experiences included"
        bg="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600"
      />
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <SectionTitle title="Top Holiday Packages" subtitle="Hand-picked deals for unforgettable trips" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => (
            <PackageCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
