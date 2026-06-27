import PageHero from "../../kernel/presentation/utils/PageHero.jsx";
import SectionTitle from "../../kernel/presentation/utils/SectionTitle.jsx";
import HotelSearchForm from "./components/HotelSearchForm.jsx";
import HotelCard from "./components/HotelCard.jsx";
import {useNavigate} from "react-router-dom";
import {hotels} from "../../kernel/presentation/utils/hotelsData.js";

export default function Hotels() {
    const navigate = useNavigate();

    const handleSearch = (params) => {
        const qs = new URLSearchParams(params).toString();
        navigate(`/hotels/search?${qs}`);
    };

  return (
    <div>
      <PageHero
        title="Find your perfect stay"
        subtitle="2M+ hotels, homes and apartments across the globe"
        bg="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600"
      />
      <div className="max-w-6xl mx-auto px-4 -mt-12 relative z-10">
          <HotelSearchForm onSearch={handleSearch} />
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <SectionTitle title="Top Rated Hotels" />
          <div className="grid gap-5 md:grid-cols-2">
              {hotels.slice(0, 4).map((h) => (
                  <HotelCard key={h.id} hotel={h} />
              ))}
          </div>
      </div>
    </div>
  );
}
