import { attractionsResolver } from "./attractionsResolver";
import { flightsResolver } from "./flightsResolver";
import {mergeResolvers} from "@graphql-tools/merge"

export const resolvers = mergeResolvers([attractionsResolver, flightsResolver])