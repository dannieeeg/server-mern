import { user } from "../model";
import { user as _user, role } from "../model";
const User = _user;
const Role = role;
import { createTransaction } from "./transaction.controller";

// ---------------------------------- Find user by ID ------------------------------
export function getById(req, res) {
  console.log("called: getById");
  User.findById(req.params.id, function (err, user) {
    if (err) {
      next(err);
    } else {
      res.json({
        status: "success",
        message: "User found!",
        data: { user: user },
      });
    }
  });
}

// ---------------------------------- Get user's balance by ID ------------------------------
export function getUserBalanceById(req, res) {
  console.log("called: getUserBalanceById");
  User.findById(req.params.id, function (err, user) {
    if (err) {
      next(err);
    } else {
      res.json({
        status: "success",
        data: { balance: user.balance },
      });
    }
  });
}

// ---------------------------------- Get all the users ------------------------------
export function getAll(req, res) {
  console.log("called: getAll");
  let usersList = [];
  User.find({})
    .populate("roles", "-__v")
    .exec(function (err, users) {
      if (err) {
        next(err);
      } else {
        for (let user of users) {
          var authorities = [];

          for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
          }
          usersList.push({
            id: user._id,
            acct: user.acct,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            roles: authorities,
          });
        }
        res.json({
          status: "success",
          message: "Users list found!",
          data: { users: usersList },
        });
      }
    });
}

// ---------------------------------- Update's user balance by id ------------------------------
export function updateUserBalanceById(req, res) {
  console.log("called: updateUserBalanceById");
  const newBalance = Number(req.body.balance);
  const transAmount = Number(req.body.amount);
  const transType = req.body.transType;
  User.findByIdAndUpdate(
    req.params.id,
    { balance: newBalance },
    function (err, user) {
      if (err) next(err);
      else {
        //now we emulate posting by creating a transaction record in the table
        createTransaction(
          user.acct,
          transAmount,
          transType,
          user._id
        );
        const message = `Your ${transType} has been completed successfully`;
        res.json({
          status: "success",
          message: message,
        });
      }
    }
  );
}

export function getUserById(userID) {
  User.findById(userID, function (err, user) {
    if (err) {
      return;
    } else {
      return user;
    }
  });
}
