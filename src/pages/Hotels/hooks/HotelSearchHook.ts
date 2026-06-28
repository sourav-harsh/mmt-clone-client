// hooks/useHotelSearch.ts

import { useEffect, useState } from "react";
import { hotelService } from "../service/HotelService";
import { HotelSearchRequest } from "../types";

export function useHotelSearch(request: HotelSearchRequest) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let ignore = false;

        async function fetchHotels() {
            try {
                setLoading(true);
                setError("");

                const hotels = await hotelService.getSearchHotels(request);

                if (!ignore) {
                    setData(hotels.data.content);
                }
            } catch (err: any) {
                if (!ignore) {
                    setError(err.message ?? "Something went wrong");
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        fetchHotels();

        return () => {
            ignore = true;
        };
    }, [
        request.city,
        request.startDate,
        request.endDate,
        request.roomsCount,
    ]);

    return {
        data,
        loading,
        error,
    };
}
