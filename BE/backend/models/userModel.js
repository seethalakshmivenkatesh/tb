const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  age: { type: Number },
  country: { type: String },
  themeColor: { type: String, default: "#ffffff" }
});

module.exports = mongoose.model("users", userSchema);
