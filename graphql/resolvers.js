const mongoose = require("mongoose");
const User = require("../models/user");
const Mesurement = require("../models/mesurement");
const { UserInputError } = require("apollo-server-express");

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
      return Mesurement.find({});
    }
  },
  Mutation: {
    register: (_, args, ctx) => {
      return User.create(args);
    },
    addMesurement: (_, args, ctx) => {
      return Mesurement.create(args);
    }
  },
  Mesurement: {
    user: user => {}
  }
};
