const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    saltKey: {
      type: String,
    },
    isAdmin: Boolean,
    info: Array,
  },
  {
    collections: "users",
    timestamp: true,
  }
);

module.exports = mongoose.model("User", userSchema);
