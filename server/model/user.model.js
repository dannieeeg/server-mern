const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    acct: Number,
    firstName: String,
    lastName: String,
    dob:  Date,
    email: String,
    password: String,
    balance: Number,
    createdDate:Date,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

module.exports = User;
