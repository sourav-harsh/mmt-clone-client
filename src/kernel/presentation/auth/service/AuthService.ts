import {AuthRepository} from "../repository/AuthRepository";
import {LoginRequest, RegisterRequest} from "../types";

const repository = new AuthRepository();

 class AuthService {

    async login(request: LoginRequest) {

        if (!request.email.trim()) {
            throw new Error("Email is required");
        }

        if (!request.password.trim()) {
            throw new Error("Password is required");
        }

        const data = await repository.login(request);

        localStorage.setItem(
            "accessToken",
            data.data.accessToken
        );

        return data.accessToken;
    }

    async register(request: RegisterRequest) {

        if (!request.email.trim()) {
            throw new Error("Email is required");
        }

        if (!request.password.trim()) {
            throw new Error("Password is required");
        }

        if(!request.name.trim()) {
            throw new Error("Name is required");
        }

        return await repository.register(request);
    }
}

export const authService = new AuthService();
