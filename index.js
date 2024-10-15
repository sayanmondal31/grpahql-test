import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const server = new ApolloServer({
  typeDefs: `#graphql
     type User {
          id: ID!
          name: String!
          username: String!
          email: String!
          phone: String!
          website: String!

     }
     type Todo{
          id: ID!
          title: String!
          completed: Boolean
          user: User
     }

     type Query{
          getTodo(tid: ID!): Todo
          getTodos: [Todo!]!
          getUsers: [User!]!
          getUser(id: ID!): User
     }
  `,
  resolvers: {
    Todo: {
      user: async (todo) => {
        console.log("2 call");
        try {
          const res = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${todo.id}`
          );

          console.log(res.data);

          return res.data;
        } catch (error) {
          console.log(error, "error");
        }
      },
    },
    Query: {
      getTodo: async (_, { tid }) => {
        console.log("1 call");
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/todos/${tid}`
        );
        return res.data;
      },
      //  getTodos: async () =>
      //    (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
      //  getUsers: async () =>
      //    (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
      //  getUser: async (_, { id }) => {
      //    const link = `https://jsonplaceholder.typicode.com/users/${id}`;

      //    const res = await axios.get(link);

      //    return res.data;
      //  },
    },
  },
});

const apolloServerStart = async () => {
  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.use("/", (req, res) => {
    res.send("hello");
  });

  app.listen(8000, () => {
    console.log("port runing on 8000");
  });
};

apolloServerStart();
