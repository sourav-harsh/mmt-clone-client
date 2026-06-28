import {HotelRepository} from "../repository/HotelRepository";
import {HotelInfoRequest, HotelInfoResponse, HotelSearchRequest, HotelSearchResponse} from "../types";

const repository = new HotelRepository();

class HotelService {

    async getSearchHotels(request:HotelSearchRequest):Promise<HotelSearchResponse> {
        return await repository.getSearchHotels(request);
    }

    async getHotelInfoById(id:number, request:HotelInfoRequest):Promise<HotelInfoResponse> {
        return await repository.getHotelInfoById(id, request);
    }

}

export const hotelService = new HotelService();
