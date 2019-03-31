const {
  AuthenticationError,
  UserInputError
} = require("apollo-server-express");
const User = require("../models/user");

const signIn = async (email, password) => {
  const msg = "Invalid creditentials.";
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    throw new AuthenticationError(msg);
  }
  return user;
};

const signUp = async args => {
  if (await User.findOne({ email: args.email })) {
    throw new UserInputError("Email already taken");
  }
  if (await User.findOne({ username: args.username })) {
    throw new UserInputError("Username already taken");
  }
  const user = User.create(args);
  return user;
};

const signOut = (req, res) =>
  new Promise((resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err);
      res.clearCookie(process.env.SESS_NAME);
      resolve(true);
    });
  });

const validateSignedIn = req => {
  if (!req.session.userId)
    throw new AuthenticationError("You are not logged in");
};

const validateSignedOut = req => {
  if (req.session.userId) throw new AuthenticationError("Already signed in");
};

module.exports = {
  validateSignedIn,
  validateSignedOut,
  signIn,
  signOut,
  signUp
};
