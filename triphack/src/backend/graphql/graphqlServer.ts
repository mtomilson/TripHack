import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schemas/attractionsSchema";
import { resolvers } from "./resolvers/attractionsResolver";
import { startStandaloneServer } from "@apollo/server/standalone";

const server = new ApolloServer({typeDefs, resolvers});

const { url } = await startStandaloneServer(server, {
    listen: {port: 4000},
})

console.log(`Server ready at ${url}`);