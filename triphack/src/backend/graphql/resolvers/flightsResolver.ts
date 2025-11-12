import { getAccessToken } from "../../utils/amadeusAuth";

export const flightsResolver = {
  Query: {
    searchFlights: async (
      _: any,
      {
        origin,
        destination,
        departure,
        returnDate,
        roundTrip,
      }: {
        origin: string;
        destination: string;
        departure: string;
        returnDate: string;
        roundTrip: boolean;
      }
    ) => {
      const token = await getAccessToken();

      const res = await fetch(
        `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departure}&adults=1${
          roundTrip && returnDate ? `&returnDate=${returnDate}` : ""
        }&currencyCode=USD`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      return data.data.map((flight: any) => ({
        price: flight.price,
        departureFlight: {
          duration: flight.itineraries[0]?.duration,
          segments: flight.itineraries[0]?.segments,
        },
        returnFlight: flight.itineraries[1]
          ? {
              duration: flight.itineraries[1]?.duration,
              segments: flight.itineraries[1]?.segments,
            }
          : null,
      }));
    },
  },
};
