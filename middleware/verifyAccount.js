import User from "../model/user.model.js";

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Email
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: JSON.stringify(req.body) });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Error: Email is already in use!" });
      return;
    }

    next();
  });
  // });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

export const verifyAccount = verifySignUp;
