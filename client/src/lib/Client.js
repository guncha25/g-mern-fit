import ApolloClient from "apollo-boost";

const Client = new ApolloClient({
  uri: "/graphql",
  credentials: "include"
});

export default Client;
