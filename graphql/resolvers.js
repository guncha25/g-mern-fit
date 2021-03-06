const mongoose = require("mongoose");
const { UserInputError } = require("apollo-server-express");
const Auth = require("../lib/auth");
const User = require("../models/user");
const Mesurement = require("../models/mesurement");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
  Query: {
    users: (_, arg, ctx) => {
      return User.find({});
    },
    user: (_, { id }, ctx) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError("Invalid id");
      }
      return User.findById(id);
    },
    mesurements: (_, arg, ctx) => {
      Auth.validateSignedIn(ctx.req);
      return Mesurement.find({});
    },
    login: async (_, { email, password }, ctx) => {
      if (ctx.req.session.userId) {
        return User.findById(ctx.req.session.userId);
      }
      Auth.validateSignedOut(ctx.req);
      const user = await Auth.signIn(email, password);

      ctx.req.session.userId = user.id;

      return user;
    },
    me: async (_, args, ctx) => {
      if (ctx.req.session.userId) {
        return await User.findById(ctx.req.session.userId);
      }
      throw new AuthenticationError("Not logged in");
    },
    logout: async (_, args, { req, res }) => {
      Auth.validateSignedIn(req);
      return await Auth.signOut(req, res);
    }
  },
  Mutation: {
    register: async (_, args, ctx) => {
      Auth.validateSignedOut(ctx.req);
      const user = await Auth.signUp(args);

      ctx.req.session.userId = user.id;

      return user;
    },
    addMesurement: (_, args, ctx) => {
      Auth.validateSignedIn(ctx.req);
      return Mesurement.create(args);
    }
  },
  Mesurement: {
    user: user => {}
  }
};
