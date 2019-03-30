require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { APP_PORT, MONGOOSE_URL } = process.env;
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");

// Connects to database
mongoose
  .connect(MONGOOSE_URL, { useNewUrlParser: true })
  .then(() => console.log("DB connected"))
  .catch(error => console.log(error));

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: `http://localhost:${APP_PORT}/graphql`,
    settings: {
      "editor.theme": "dark"
    }
  }
});

server.applyMiddleware({ app });

app.listen(APP_PORT, () => {
  console.log(
    `🚀 App started on http://localhost:${APP_PORT}${server.graphqlPath}`
  );
});
