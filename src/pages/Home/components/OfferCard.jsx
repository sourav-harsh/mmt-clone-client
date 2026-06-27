import ComingSoon from "../../../kernel/presentation/utils/ComingSoon.jsx";
import {Link} from "react-router-dom";

export default function OfferCard({title, desc, tag, color, isAvailable, to}) {
    return (
        <div className={`rounded-lg p-5 text-white shadow-md bg-gradient-to-br ${color} relative`}>
      <span className="text-[10px] tracking-widest font-bold bg-white/20 px-2 py-1 rounded">
        {tag}
      </span>
            <ComingSoon isActive={!isAvailable} classValue="top-2 -right-3 text-black"/>
            <h3 className="mt-3 font-bold text-lg">{title}</h3>
            <p className="text-sm text-white/90 mt-1">{desc}</p>
            <button
                className={`mt-4 bg-white text-mmtDark text-xs font-bold px-4 py-2 rounded-full ${isAvailable ? '' : 'disabled:opacity-25 disabled:pointer-events-none'}`}
                disabled={!isAvailable}>
                <Link to={to}>
                    Book Now
                </Link>
            </button>
        </div>
    );
}
