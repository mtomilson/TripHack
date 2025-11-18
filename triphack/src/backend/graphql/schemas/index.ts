import { attractionsTypeDefs } from "./attractionsSchema";
import { flightsTypeDefs } from "./flightsSchema";
import {hotelTypeDefs } from "./hotelsSchema"
import { mergeTypeDefs } from "@graphql-tools/merge"


export const typeDefs = mergeTypeDefs([attractionsTypeDefs, flightsTypeDefs, hotelTypeDefs])
