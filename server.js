require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const { ApolloServer } = require("apollo-server-express");

const {
  APP_PORT,
  MONGOOSE_URL,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME
} = process.env;
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");

// Connects to database
mongoose
  .connect(MONGOOSE_URL, { useNewUrlParser: true })
  .then(() => console.log("DB connected"))
  .catch(error => console.log(error));

const store = new MongoDBStore({
  uri: MONGOOSE_URL,
  collection: "fitSessions"
});

store.on("error", function(error) {
  console.log(error);
});

const app = express();

app.use(
  session({
    store,
    name: SESS_NAME,
    secret: SESS_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: true,
      secure: false
    }
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // cors: false,
  playground: {
    endpoint: `http://localhost:${APP_PORT}/graphql`,
    settings: {
      "editor.theme": "dark",
      "request.credentials": "include"
    }
  },
  context: ({ req, res }) => ({ req, res })
});

server.applyMiddleware({ app });

app.listen(APP_PORT, () => {
  console.log(
    `🚀 App started on http://localhost:${APP_PORT}${server.graphqlPath}`
  );
});
