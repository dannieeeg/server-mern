import pkg from "mongoose";
const {model, Schema} = pkg

const Transaction = model(
  "Transaction",
  new Schema({
    tranType: String,
    tranNumber: Number,
    amount: Number,
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdDate: Date,
    acct: Number,
  })
);

export default Transaction;
