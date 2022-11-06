const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const randomString = require("randomstring");
const SECRET = process.env.SECRET_KEY;

module.exports = {
  registerUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      const userToken = jwt.sign({ _id: user._id, email: user.email }, SECRET);

      res
        .status(201)
        .cookie("userToken", userToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 90000),
        })
        .json({ successMessage: "User is registered", user: user });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  createTempUser: async (req, res) => {
    try {
      const user = await User.create({
        email: randomString.generate(10),
        password: "tempPassword",
        confirmPassword: "tempPassword",
        status: "temp",
        opinions: [],
      });
      const userToken = jwt.sign({ _id: user._id, email: user.email }, SECRET);
      console.log("userToken", userToken);
      res
        .status(201)
        .cookie("userToken", userToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 90000),
          domain: "localhost:3000",
        })
        .json({
          successMessage: "TempUser Created",
          status: user.status,
          user: user.id,
        });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  loginUser: async (req, res) => {
    if (!req.body.email) {
      res.status(400).json({ errorMessage: "Invalid login attempt" });
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      const correctPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!correctPassword) {
        res
          .status(400)
          .json({ errorMessage: "Email and password do not match" });
      } else {
        const userToken = jwt.sign(
          { _id: user._id, email: user.email },
          SECRET
        );
        res
          .cookie("userToken", userToken, SECRET, { httpOnly: true })
          .json({ successMessage: "User is logged in", user: user });
        console.log(res.cookie);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  },
  logoutUser: (req, res) => {
    res.clearCookie("userToken");
    res.json({ successMessage: "User is logged out" });
  },
  checkUser: (req, res) => {
    res.json("Success");
    const decodedJWT = jwt.decode(req.cookies.userToken, { complete: true });
    if (!decodedJWT) {
      res.json({});
    } else {
      res.json(decodedJWT.payload);
    }
  },
};
