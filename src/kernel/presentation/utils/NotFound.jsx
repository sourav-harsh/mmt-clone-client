import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-6xl font-bold text-mmtDark">404</h1>
      <p className="mt-2 text-gray-600">Page not found</p>
      <Link to="/" className="mt-6 bg-mmtBlue text-white px-6 py-2 rounded-md font-semibold">
        Back to Home
      </Link>
    </div>
  );
}
