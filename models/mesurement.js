const mongoose = require("mongoose");
const { Number, ObjectId } = mongoose.Schema.Types;

const mesurementSchema = new mongoose.Schema(
  {
    weight: Number,
    user: {
      type: ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Mesurement", mesurementSchema);
