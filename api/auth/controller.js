const config = require("../../settings/config");
let User = require("../users/model");
const jwt = require("jsonwebtoken");

const { promisify } = require("util");
const { decode } = require("punycode");

exports.register = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const bUser = await newUser.save();
    const token = singToken(bUser);
    res.status(201).json({
      status: "success",
      token: token,
      data: {
        user: bUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }
  console.log(email, password);
  const UserExists = await User.findOne({ email }).select("+password");
  console.log(UserExists);

  if (!UserExists || !await UserExists.authenticate(password)) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid credentials" });
  }

  const token = singToken(UserExists);
  res.status(200).json({
    status: "success",
    token: token,
  });
};

const singToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, config.secrets.jwt, {
    expiresIn: config.expireTime,
  });
};
