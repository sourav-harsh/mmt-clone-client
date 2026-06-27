import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-mmtDark text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-bold text-white mb-3">About</h4>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Careers</li>
            <li>Investor Relations</li>
            <li>Press</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-3">Support</h4>
          <ul className="space-y-2">
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-3">Explore</h4>
          <ul className="space-y-2">
            <li>Flights</li>
            <li>Hotels</li>
            <li>Holiday Packages</li>
            <li>Trains</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-3">Follow Us</h4>
          <div className="flex gap-3 text-lg">
            <a className="hover:text-mmtBlue" href="#"><FaFacebookF /></a>
            <a className="hover:text-mmtBlue" href="#"><FaTwitter /></a>
            <a className="hover:text-mmtBlue" href="#"><FaInstagram /></a>
            <a className="hover:text-mmtBlue" href="#"><FaYoutube /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} MakeMyTrip Clone. For educational purposes only.
      </div>
    </footer>
  );
}
