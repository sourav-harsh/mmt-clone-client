import { useState } from "react";
import {useLogin} from "../auth/hooks/UserLogin.ts";
import {useNavigate} from "react-router-dom";

/**
 * useLogin
 * Encapsulates the authentication call. Swap the inside of `login`
 * with your real API call (fetch/axios) whenever you're ready.
 */

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [successUser, setSuccessUser] = useState(null);
    const { login, isLoading, error } = useLogin();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await login(username, password);
            setSuccessUser(username);
            navigate("/");
        } catch {
            // error is already captured by the hook
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
            <form
                onSubmit={handleSubmit}
                className="w-[340px] flex flex-col bg-white rounded-xl px-7 py-8 shadow-lg"
            >
                <h1 className="m-0 text-2xl font-bold text-gray-900">Sign in</h1>
                <p className="mt-1 mb-6 text-sm text-gray-500">
                    Enter your details to continue
                </p>

                <label htmlFor="username" className="mb-1.5 text-[13px] font-semibold text-gray-700">
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="jane.doe"
                    autoComplete="username"
                    className="mb-4.5 px-3 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <label htmlFor="password" className="mb-1.5 text-[13px] font-semibold text-gray-700">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="mb-4.5 px-3 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                {error && <p className="mt-2 mb-3 text-[13px] text-red-600">{error}</p>}
                {successUser && (
                    <p className="mt-2 mb-3 text-[13px] text-green-600">
                        Welcome back, {successUser}!
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 py-2.5 rounded-lg border-none bg-blue-600 text-white text-[15px] font-semibold cursor-pointer hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? "Signing in…" : "Log in"}
                </button>
            </form>
        </div>
    );
}
