const mongoose = require("mongoose");
const { hash, compare } = require("bcryptjs");

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

userSchema.pre("save", async function() {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
});

userSchema.methods.matchPassword = function(password) {
  return compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
