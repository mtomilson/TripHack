import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Attraction {
    name: String
    price: Price
    id: String
    bookingLink: String
    pictures: [String]
  }

  type Price {
    amount: String
    currencyCode: String
  }


  type Query {
    searchAttractions(longitude: Float!, latitude: Float!) : [Attraction]
  }
`;
