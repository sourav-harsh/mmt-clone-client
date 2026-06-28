import { Routes, Route } from "react-router-dom";
import Navbar from "../presentation/utils/Navbar.jsx";
import Footer from "../presentation/utils/Footer.jsx";
import Home from "../../pages/Home/Home.jsx";
import Flights from "../../pages/Flights/Flights.jsx";
import Hotels from "../../pages/Hotels/Hotels.jsx";
import Holidays from "../../pages/Holidays/Holidays.jsx";
import Trains from "../../pages/Trains/Trains.jsx";
import NotFound from "../presentation/utils/NotFound.jsx";
import HotelCheckout from "../../pages/Hotels/HotelCheckout.jsx";
import HotelDetail from "../../pages/Hotels/HotelDetail.jsx";
import HotelSearch from "../../pages/Hotels/HotelSearch.jsx";
import LoginForm from "../presentation/utils/LoginForm.jsx";

export default function App() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />
      <main className="flex-1">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/search" element={<HotelSearch />} />
            <Route path="/hotels/:id" element={<HotelDetail />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/hotels/:id/checkout" element={<HotelCheckout />} />
            <Route path="/holidays" element={<Holidays />} />
            <Route path="/trains" element={<Trains />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
