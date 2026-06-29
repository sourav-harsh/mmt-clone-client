import {UserRepository} from "../repository/UserRepository";
import {AllGuests, GuestRequest, GuestsResponse} from "../types";

const userRepository = new UserRepository();

class UserService {
    async getAllUsers(): Promise<AllGuests> {
        return await userRepository.getAllGuests();
    }

    async addNewGuest(request: GuestRequest): Promise<GuestsResponse> {
        return await userRepository.addNewGuest(request);
    }
}
