const { verifyAccount } = require("../middleware");
const controller = require("../controller/auth.controller");

module.exports = function (app) {
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
    controller.createAccount
  );

  app.post("/api/auth/signin", controller.signin);
};
