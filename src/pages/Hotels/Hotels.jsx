import PageHero from "../../kernel/presentation/utils/PageHero.jsx";
import SectionTitle from "../../kernel/presentation/utils/SectionTitle.jsx";
import HotelSearchForm from "./components/HotelSearchForm.jsx";
import HotelCard from "./components/HotelCard.jsx";

const hotels = [
  { name: "The Taj Palace", city: "New Delhi", rating: 4.7, reviews: 2310, price: 8999, img: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800" },
  { name: "Oberoi Grand", city: "Kolkata", rating: 4.8, reviews: 1820, price: 11200, img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800" },
  { name: "Leela Sky Villas", city: "Mumbai", rating: 4.6, reviews: 980, price: 15750, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800" },
  { name: "ITC Royal Bengal", city: "Bengaluru", rating: 4.5, reviews: 1455, price: 7200, img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800" },
];

export default function Hotels() {
  return (
    <div>
      <PageHero
        title="Find your perfect stay"
        subtitle="2M+ hotels, homes and apartments across the globe"
        bg="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600"
      />
      <div className="max-w-6xl mx-auto px-4 -mt-12 relative z-10">
        <HotelSearchForm />
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <SectionTitle title="Top Rated Hotels" />
        <div className="grid gap-5 md:grid-cols-2">
          {hotels.map((h) => (
            <HotelCard key={h.name} {...h} />
          ))}
        </div>
      </div>
    </div>
  );
}
