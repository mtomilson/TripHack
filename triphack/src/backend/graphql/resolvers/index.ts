import { attractionsResolver } from "./attractionsResolver";
import { flightsResolver } from "./flightsResolver";
import { hotelResolver } from "./hotelResolver";

import {mergeResolvers} from "@graphql-tools/merge"

export const resolvers = mergeResolvers([attractionsResolver, flightsResolver, hotelResolver])