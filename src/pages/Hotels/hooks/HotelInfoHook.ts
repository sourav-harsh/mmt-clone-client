import {useState} from "react";
import {HotelInfoRequest} from "../types";
import { hotelService } from "../service/HotelService";

export function hotelInfoHook() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const hotelInfo = async (id: number, request: HotelInfoRequest) => {

        setLoading(true);
        setError("");

        try{
            return await hotelService.getHotelInfoById(id, request);
        } catch (err){
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return {
        hotelInfo,
        loading,
        error
    }
}
