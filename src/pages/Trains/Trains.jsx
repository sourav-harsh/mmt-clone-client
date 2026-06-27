import PageHero from "../../kernel/presentation/utils/PageHero.jsx";
import SectionTitle from "../../kernel/presentation/utils/SectionTitle.jsx";
import TrainSearchForm from "./components/TrainSearchForm.jsx";
import TrainCard from "./components/TrainCard.jsx";

const trains = [
  { number: "12951", name: "Mumbai Rajdhani", from: "NDLS", to: "BCT", dep: "16:55", arr: "08:35", dur: "15h 40m", classes: ["1A", "2A", "3A"] },
  { number: "12009", name: "Shatabdi Express", from: "NDLS", to: "ASR", dep: "07:20", arr: "13:35", dur: "6h 15m", classes: ["CC", "EC"] },
  { number: "12259", name: "Sealdah Duronto", from: "NDLS", to: "SDAH", dep: "20:05", arr: "12:00", dur: "15h 55m", classes: ["1A", "2A", "3A", "SL"] },
  { number: "22691", name: "Rajdhani Express", from: "NDLS", to: "SBC", dep: "20:45", arr: "06:40", dur: "33h 55m", classes: ["1A", "2A", "3A"] },
];

export default function Trains() {
  return (
    <div>
      <PageHero
        title="Book Train Tickets"
        subtitle="IRCTC authorized partner. Quickest train booking experience."
        bg="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1600"
      />
      <div className="max-w-6xl mx-auto px-4 -mt-12 relative z-10">
        <TrainSearchForm />
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <SectionTitle title="Available Trains" subtitle="New Delhi → Mumbai" />
        <div className="space-y-3">
          {trains.map((t) => (
            <TrainCard key={t.number} {...t} />
          ))}
        </div>
      </div>
    </div>
  );
}
