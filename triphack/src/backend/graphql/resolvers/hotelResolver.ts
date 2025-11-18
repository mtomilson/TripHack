import { getAccessToken } from "../../utils/amadeusAuth";

export const hotelResolver = {
    Query: {
        searchHotels: async (_: any, {cityCode}: {cityCode: string}) => {
            const token = await getAccessToken()

            const res = await fetch(`https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            const data = await res.json();
            return data.data.map((hotel: any) => ({
                hotelId: hotel.hotelId,
                name: hotel.name,
                chainCode: hotel.chainCode,
            }))
        }
    }
}