import { getAccessToken } from "../../utils/amadeusAuth"

export const resolvers = {
    Query: {
        searchAttractions: async (_: any, {longitude, latitude}: {longitude: number; latitude: number}) => {
            const token = await getAccessToken();

            const res = await fetch(`https://test.api.amadeus.com/v1/shopping/activities?longitude=${longitude}&latitude=${latitude}&radius=4`, 
                {
                    headers: { Authorization: `Bearer ${token}`},
                }
            )

            const data = await res.json();

            return data.data.map((place: any) => ({
                name: place.name,
                price: place.price,
                id: place.id,
                bookingLink: place.bookingLink,
                pictures: place.pictures,
            }))
        }
    }
}