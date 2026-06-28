import {authService} from "../service/AuthService";
import {useState} from "react";

export function useRegister() {

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const register = async (
        email: string,
        password: string,
        name: string
    ) => {

        setLoading(true);
        setError("");

        try {

            return await authService.register({
                email,
                password,
                name
            });

        } catch (err: any) {

            setError(err.message);

            throw err;

        } finally {

            setLoading(false);

        }
    };

    return {
        register,
        loading,
        error,
    };
}
