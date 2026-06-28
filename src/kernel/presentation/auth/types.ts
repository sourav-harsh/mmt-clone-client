export interface LoginRequest {
    email: string;
    password: string;
}

export interface BaseResponse<T> {
data: T;
error: string;
timeStamp: string;
}

export interface LoginResponse  extends BaseResponse<LoginResponse>{
    accessToken: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}
export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    dateOfBirth: string,
    email: string,
    gender: string,
    id: number,
    name: string
}
