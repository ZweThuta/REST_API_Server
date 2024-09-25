const { validationResult } = require("express-validator");
const { bcrypt } = require("bcrypt");
const User = require("../models/user");

exports.register = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation Failed!",
      errorMessages: errors.array(),
    });
  }
  const { email, username, password } = req.body;
  //   bcrypt
  //     .hash(password, 10)
  //     .then((hashPass) => {
  //       console.log("password: ", hashPass);
  User.create({
    email,
    username,
    password,
  })
    // })
    .then((result) => {
      res.status(201).json({ message: "User Created!", userId: result._id });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Something went wrong!" });
    });
};

// exports.login = (req, res, next) => {
//   const { email, password } = req.body;
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       message: "Validation Failed!",
//       errorMessages: errors.array(),
//     });
//   }

//   User.findOne({ email })
//     .then((userDoc) => {
//       if (!userDoc) {
//         throw new Error("Email is not existed!");
//       }
//       if (password !== userDoc.password) {
//         res.status(401).json({ message: "Please check credentials." });
//       }
//       res.status(200).json({ message: "Login Successful!" });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json({ message: err.message });
//     });
// };

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation Failed!",
        errorMessages: errors.array(),
      });
    }

    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      return res.status(401).json({ message: "Email is not existed!" });
    }

    if (userDoc.password !== password) {
      return res.status(401).json({ message: "Please check credentials." });
    }
    
    return res.status(200).json({ message: "Login Successful!" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};
