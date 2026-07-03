import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { login, signup } from "../../kernel/presentation/utils/authStore.js";

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialMode = new URLSearchParams(location.search).get("mode") === "signup" ? "signup" : "login";
  const redirect = new URLSearchParams(location.search).get("redirect") || "/profile";

  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "signup") {
        if (!form.firstName || !form.email || !form.password)
          throw new Error("Please fill all required fields.");
        signup(form);
      } else {
        login({ email: form.email, password: form.password });
      }
      navigate(redirect, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow border border-gray-100 p-7">
        <div className="flex items-center justify-center gap-2 mb-4">
          {mode === "signup" ? (
            <FaUserPlus className="text-mmtBlue text-2xl" />
          ) : (
            <FaSignInAlt className="text-mmtBlue text-2xl" />
          )}
          <h1 className="text-2xl font-bold text-mmtDark">
            {mode === "signup" ? "Create Account" : "Login to MakeMyTrip"}
          </h1>
        </div>
        <p className="text-center text-xs text-gray-500 mb-5">
          {mode === "signup"
            ? "Sign up to manage your trips and bookings."
            : "Welcome back! Please sign in to continue."}
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded p-2 mb-3">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-3">
          {mode === "signup" && (
            <div className="grid grid-cols-2 gap-3">
              <Field label="First Name" value={form.firstName} onChange={update("firstName")} required />
              <Field label="Last Name" value={form.lastName} onChange={update("lastName")} />
            </div>
          )}
          <Field label="Email" type="email" value={form.email} onChange={update("email")} required />
          {mode === "signup" && (
            <Field label="Mobile Number" type="tel" value={form.phone} onChange={update("phone")} />
          )}
          <Field label="Password" type="password" value={form.password} onChange={update("password")} required />

          <button
            type="submit"
            className="w-full bg-mmtBlue hover:bg-blue-700 text-white font-bold py-2.5 rounded mt-2"
          >
            {mode === "signup" ? "Create Account" : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          {mode === "signup" ? "Already have an account?" : "New to MakeMyTrip?"}{" "}
          <button
            onClick={() => setMode(mode === "signup" ? "login" : "signup")}
            className="text-mmtBlue font-semibold hover:underline"
          >
            {mode === "signup" ? "Login" : "Create Account"}
          </button>
        </p>
        <p className="text-center text-xs text-gray-400 mt-3">
          <Link to="/" className="hover:underline">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, ...rest }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-gray-600">{label}</span>
      <input
        {...rest}
        className="w-full mt-1 border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-mmtBlue"
      />
    </label>
  );
}
