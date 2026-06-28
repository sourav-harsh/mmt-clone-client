import {authService} from "../service/AuthService";
import {useState} from "react";

export function useLogin() {

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const login = async (
        email: string,
        password: string
    ) => {

        setLoading(true);
        setError("");

        try {

            return await authService.login({
                email,
                password,
            });

        } catch (err: any) {

            setError(err.message);

            throw err;

        } finally {

            setLoading(false);

        }
    };

    return {
        login,
        loading,
        error,
    };
}
