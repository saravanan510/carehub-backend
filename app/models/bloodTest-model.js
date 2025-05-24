const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bloodTestSchema = new Schema(
  {
    fullName: String,
    email: String,
    phoneNumber: Number,
    date: String,
    time: String,
    status: String,
    tests: Array,
  },
  { timestamps: true }
);

const BloodTests = model("bloodTest", bloodTestSchema);
module.exports = BloodTests;
