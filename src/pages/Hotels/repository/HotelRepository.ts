import {HotelInfoRequest, HotelInfoResponse, HotelSearchRequest, HotelSearchResponse} from "../types";
import {axiosClient} from "../../../kernel/api/AxoisClient";

export class HotelRepository{
    async getSearchHotels(request:HotelSearchRequest):Promise<HotelSearchResponse> {
        const response = await axiosClient.post("/hotels/search", request);
        return response.data;
    }
    async getHotelInfoById(id:number, request:HotelInfoRequest):Promise<HotelInfoResponse> {
        const response = await axiosClient.post(`/hotels/${id}/info`,request);
        return response.data;
    }
}
