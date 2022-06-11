import { model, Schema } from "mongoose";

const User = model(
  "User",
  new Schema({
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
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

export default User;
