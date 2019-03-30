const mongoose = require("mongoose");
const { UserInputError } = require("apollo-server-express");
const Auth = require("../lib/auth");
const User = require("../models/user");
const Mesurement = require("../models/mesurement");

module.exports = {
  Query: {
    users: (_, arg, ctx) => {
      return User.find({});
    },
    user: (_, { id }, ctx) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError("Ivalid id");
      }
      return User.findById(id);
    },
    mesurements: (_, arg, ctx) => {
      Auth.validateSignedIn(ctx.req);
      return Mesurement.find({});
    }
  },
  Mutation: {
    register: (_, args, ctx) => {
      Auth.validateSignedOut(ctx.req);
      return User.create(args);
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
    logout: async (_, args, { req, res }) => {
      Auth.validateSignedIn(req);
      return await Auth.signOut(req, res);
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
