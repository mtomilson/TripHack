import express from "express";
import cors from "cors";
import amadeus from "./routes/amadeus";
import { expressMiddleware } from '@as-integrations/express4';
import { typeDefs } from "./graphql/schemas/attractionsSchema";
import { resolvers } from "./graphql/resolvers/attractionsResolver";
import { ApolloServer } from "@apollo/server";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/amadeus", amadeus);

const server = new ApolloServer({typeDefs, resolvers});

await server.start();

app.use("/api/graphql", expressMiddleware(server));


app.listen(5000, () => {
  console.log("server running");
  console.log("GraphQL endpoint: http://localhost:5000/api/graphql");

});
