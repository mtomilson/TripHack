import { attractionsTypeDefs } from "./attractionsSchema";
import { flightsTypeDefs } from "./flightsSchema";
import { mergeTypeDefs } from "@graphql-tools/merge"

export const typeDefs = mergeTypeDefs([attractionsTypeDefs, flightsTypeDefs])
