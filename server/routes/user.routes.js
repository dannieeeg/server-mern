const { authJwt } = require("../middleware");
const controller = require("../controller/user.controller");
const transController = require("../controller/transaction.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //find user by ID
  app.get("/api/user/:id", [authJwt.verifyToken], controller.getById);

  //get user balance by id
  app.get(
    "/api/user/balance/:id",
    [authJwt.verifyToken],
    controller.getUserBalanceById
  );
  //update account's balance by id
  /**
   * @param : id - user ID
   */
  app.put(
    "/api/user/balance/:id",
    [authJwt.verifyToken],
    controller.updateUserBalanceById
  );

  app.get(
    "/api/user/transactions/:id",
    [authJwt.verifyToken],
    transController.getUserTrans
  );

  //get all the accounts
  app.get(
    "/api/user/all/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAll
  );
};
