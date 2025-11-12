import { gql } from "graphql-tag";

export const flightsTypeDefs = gql`
  type Flight {
    price: Price
    departureFlight: FlightLeg
    returnFlight: FlightLeg
  }

  type FlightLeg {
    duration: String
    segments: [Segment]
  }

  type Segment {
    arrival: Arrival
    departure: Departure
    duration: String
    carrierCode: String
  }

  type Arrival {
    iataCode: String
    time: String
  }

  type Departure {
    iataCode: String
    time: String
  }

  type Price {
    total: String
    currency: String
  }

  type Query {
    searchFlights(
      origin: String!
      destination: String!
      departure: String!
      returnDate: String
      roundTrip: Boolean
    ): [Flight]
  }
`;
