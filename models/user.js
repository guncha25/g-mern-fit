const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    password: String
  },
  {
    timestamps: true
  }
);

userSchema.methods.matchPassword = function(password) {
  return password === this.password;
};

module.exports = mongoose.model("User", userSchema);
