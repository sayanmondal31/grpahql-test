import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import { readFileSync } from "fs";
import { join } from "path";

import userResolvers from "./resolvers/userResolvers.js";
import todoResolvers from "./resolvers/todoResolvers.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Read schema files
const userSchema = readFileSync(
  join(process.cwd(), "schema", "user.graphql"),
  "utf8"
);
const todoSchema = readFileSync(
  join(process.cwd(), "schema", "todo.graphql"),
  "utf8"
);

// Combine schemas
const typeDefs = `#graphql
  ${userSchema}
  ${todoSchema}
`;

// Combine resolvers
const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...todoResolvers.Query,
  },
  Todo: todoResolvers.Todo,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const apolloServerStart = async () => {
  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.use("/", (req, res) => {
    res.send("hello");
  });

  app.listen(8000, () => {
    console.log("port running on 8000");
  });
};

apolloServerStart();
