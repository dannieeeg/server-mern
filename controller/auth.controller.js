const config = require("../config/auth.config");
const db = require("../model");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// ---------------------------------- Create Account functionallity ------------------------------
exports.createAccount = (req, res) => {
  //console.log(`createAccount-email : ${req.body.email}`);
  //generate random acct # with 9 digits
  const acct = Math.floor(100000 + Math.random() * 900000000);
  //console.log("acct :" + acct);
  const now = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
  });
  const user = new User({
    acct: acct,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: new Date(req.body.dob),
    email: req.body.email,
    createdDate: now,
    password: bcrypt.hashSync(req.body.password, 8),
    balance: req.body.balance,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    console.log(req.body.roles);
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "USER" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

// ---------------------------------- Signin functionallity ------------------------------
exports.signin = (req, res) => {
  console.log(`Email: ${req.body.email}`);
  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 900, // 15 minutes
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        acct: user.acct,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};
