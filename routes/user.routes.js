import { authJwt } from "../middleware";
import { getById, getUserBalanceById, updateUserBalanceById, getAll } from "../controller/user.controller";
import { getUserTrans } from "../controller/transaction.controller";

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //find user by ID
  app.get("/api/user/:id", [authJwt.verifyToken], getById);

  //get user balance by id
  app.get(
    "/api/user/balance/:id",
    [authJwt.verifyToken],
    getUserBalanceById
  );
  //update account's balance by id
  /**
   * @param : id - user ID
   */
  app.put(
    "/api/user/balance/:id",
    [authJwt.verifyToken],
    updateUserBalanceById
  );

  app.get(
    "/api/user/transactions/:id",
    [authJwt.verifyToken],
    getUserTrans
  );

  //get all the accounts
  app.get(
    "/api/user/all/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    getAll
  );
};
