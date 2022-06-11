const mongoose = require("mongoose");

const Transaction = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    tranType: String,
    tranNumber: Number,
    amount: Number,
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdDate: Date,
    acct: Number,
  })
);

module.exports = Transaction;
