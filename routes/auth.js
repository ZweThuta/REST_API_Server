const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const User = require("../models/user");
const authController = require("../controllers/auth");
router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a vaild email!")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email is already existed!");
          }
        });
      }),
    //   .normalizeEmail()
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username is too short!")
      .isLength({ max: 10 })
      .withMessage("Username is too long!")
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Username is already existed!");
          }
        });
      }),

    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Pssword is too short!"),
  ],
  authController.register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a vaild email!"),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Pssword is too short!"),
  ],
  authController.login
);

module.exports = router;
