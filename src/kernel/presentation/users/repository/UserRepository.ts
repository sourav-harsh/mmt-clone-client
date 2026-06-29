import {axiosClient} from "../../../api/AxoisClient";
import {AllGuests, GuestRequest, GuestsResponse} from "../types";

export class UserRepository {
    async getAllGuests(){
        const response = await axiosClient.get<AllGuests>('/users/guests');
        return response.data;
    }

    async addNewGuest(request: GuestRequest){
        const response = await axiosClient.post<GuestsResponse>('/users/guests',request);
        return response.data;
    }
}
