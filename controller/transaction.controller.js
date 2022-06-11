const db = require("../model");
const Transaction = db.transaction;
const User = db.user;

exports.createTransaction = (acct, amount, tranType, userID) => {
  const now = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
  });
  //generate a random
  const tranNumber = Math.floor(100000 + Math.random() * 900000000000);
  const trans = new Transaction({
    acct: acct,
    amount: amount,
    createdDate: now,
    tranNumber: tranNumber,
    tranType: tranType,
    userID: userID,
  });

  trans.save((err, trans) => {
    if (err) {
      console.log("error saving tranno");
      return;
    }
    console.log("trans: " + trans);
  });
};

exports.getUserTrans = (req, res) => {
  let transactionsList = [];

  //finds the user
  User.findById(req.params.id, function (err, user) {
    if (err) {
      next(err);
    } else {
      Transaction.find(
        {
          userID: user._id,
        },
        function (err, trans) {
          if (err) {
            next(err);
          } else {
            for (let tran of trans) {
              transactionsList.push({
                id: tran._id,
                tranNumber: tran.tranNumber,
                tranType: tran.tranType,
                amount: tran.amount,
                createdDate: tran.createdDate,
              });
            }
            res.json({
              status: "success",
              message: "Transactions found!",
              data: { transactions: transactionsList },
            });
          }
        }
      );
    }
  });
};
