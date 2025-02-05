const jwt = require("jsonwebtoken");
const CustomErrorApi = require("../err/err");
const crypto = require("crypto");

const generateAuthToken = (user) => {
  const { id, email } = user;
  const jti = crypto.randomBytes(32).toString("hex");


  var access_token = jwt.sign({ id, email }, process.env.access_key, {
    expiresIn: "7d",
    jwtid: jti,
  });

  return {
    access_token: access_token,

    jti,
  };
};

const verify = (token) => {
  const decode = jwt.verify(token, process.env.refresh_key);

  if (!decode) {
    throw new CustomErrorApi("Login again ", 400);
  }

  return decode;
};
module.exports = generateAuthToken;