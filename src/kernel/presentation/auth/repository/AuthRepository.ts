import {axiosClient} from "../../../api/AxoisClient";
import {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse} from "../types";

export class AuthRepository {

    async login(
        request: LoginRequest
    ): Promise<LoginResponse> {

        const response = await axiosClient.post<LoginResponse>(
            "/auth/login",
            request
        );

        return response.data;
    }

    async register(request: RegisterRequest): Promise<RegisterResponse> {

        const response = await axiosClient.post("/auth/signup", request);

        return response.data;
    }
}
