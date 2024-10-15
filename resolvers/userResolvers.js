import axios from "axios";

const userResolvers = {
  Query: {
    getUsers: async () =>
      (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
    getUser: async (_, { id }) => {
      const link = `https://jsonplaceholder.typicode.com/users/${id}`;
      const res = await axios.get(link);
      return res.data;
    },
  },
};

export default userResolvers;
