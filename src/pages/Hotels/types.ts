import {BaseResponse, PageResponse} from "../../kernel/presentation/SharedTypes";

export interface HotelSearchResponse extends BaseResponse<PageResponse<Hotel>> {}

export interface Hotel{
    id: number,
    name: string,
    city: string,
    photos: [],
    amenities: [],
    contactInfo: {
        address: string,
        email: string,
        location: string,
        phoneNumber: string
    },
    price: number
}

export interface HotelSearchRequest {
    city: string;
    startDate: string;
    endDate: string;
    roomsCount: number;
}

export interface HotelInfoRequest{
    startDate: string;
    endDate: string;
    roomsCount: number;
}
export interface RoomData{
    id: number,
    type:string,
    photos: [],
    amenities: [],
    price: number
}
export interface HotelInfoData{
    hotel:Hotel,
    rooms:RoomData[]
}
export interface HotelInfoResponse extends BaseResponse<HotelInfoData> {}
