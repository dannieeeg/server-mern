import { verifyAccount } from "../middleware";
import { createAccount, signin } from "../controller/auth.controller";

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/createAccount",
    [
      verifyAccount.checkDuplicateUsernameOrEmail,
      verifyAccount.checkRolesExisted,
    ],
    createAccount
  );

  app.post("/api/auth/signin", signin);
};
