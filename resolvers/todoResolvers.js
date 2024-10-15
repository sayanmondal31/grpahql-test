import axios from "axios";

const todoResolvers = {
  Todo: {
    user: async (todo) => {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${todo.userId}`
        );
        return res.data;
      } catch (error) {
        console.log(error, "error");
      }
    },
  },
  Query: {
    getTodo: async (_, { tid }) => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/todos/${tid}`
      );
      return res.data;
    },
    getTodos: async () =>
      (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
  },
};

export default todoResolvers;
