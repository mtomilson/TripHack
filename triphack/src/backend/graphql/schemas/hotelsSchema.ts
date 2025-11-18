import {gql} from "graphql-tag"


export const hotelTypeDefs = gql `
    type Hotel {
        hotelId: String
        name: String
        chainCode: String
    }

    type Query {
        searchHotels(
            cityCode: String!
        ): [Hotel]
    }


`