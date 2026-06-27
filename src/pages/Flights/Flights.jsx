import PageHero from "../../kernel/presentation/utils/PageHero.jsx";
import SectionTitle from "../../kernel/presentation/utils/SectionTitle.jsx";
import FlightSearchForm from "./components/FlightSearchForm.jsx";
import FlightCard from "./components/FlightCard.jsx";

const flights = [
  { airline: "IndiGo", code: "6E-204", from: "DEL", to: "BOM", dep: "06:00", arr: "08:15", dur: "2h 15m", price: 4299, stops: "Non-stop" },
  { airline: "Air India", code: "AI-805", from: "DEL", to: "BOM", dep: "09:30", arr: "11:50", dur: "2h 20m", price: 4899, stops: "Non-stop" },
  { airline: "Vistara", code: "UK-995", from: "DEL", to: "BOM", dep: "13:10", arr: "15:25", dur: "2h 15m", price: 5350, stops: "Non-stop" },
  { airline: "SpiceJet", code: "SG-160", from: "DEL", to: "BOM", dep: "18:45", arr: "21:10", dur: "2h 25m", price: 3999, stops: "Non-stop" },
  { airline: "Akasa Air", code: "QP-1407", from: "DEL", to: "BOM", dep: "21:30", arr: "23:55", dur: "2h 25m", price: 4150, stops: "Non-stop" },
];

export default function Flights() {
  return (
    <div>
      <PageHero
        title="Book Flight Tickets"
        subtitle="Best fares guaranteed on domestic & international routes"
        bg="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600"
      />
      <div className="max-w-6xl mx-auto px-4 -mt-12 relative z-10">
        <FlightSearchForm />
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <SectionTitle title="Available Flights" subtitle="Delhi → Mumbai" />
        <div className="space-y-3">
          {flights.map((f) => (
            <FlightCard key={f.code} {...f} />
          ))}
        </div>
      </div>
    </div>
  );
}
