import mongoose from "mongoose";
import user from "./user.model.js";
import Role from "./role.model.js";
import Transaction from "./transaction.model.js";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = user;
db.role = Role;
db.transaction = Transaction;

db.ROLES = ["USER", "ADMIN"];

export default db;
