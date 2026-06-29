import {BaseResponse} from "../auth/types";

export interface Guest {
    dateOfBirth: string,
    gender: string,
    id: number,
    name: string
}

export interface GuestsResponse extends BaseResponse<Guest>{}

export interface AllGuests extends BaseResponse<Guest[]>{}

export interface GuestRequest {
    dateOfBirth: string,
    gender: string,
    name: string
}
