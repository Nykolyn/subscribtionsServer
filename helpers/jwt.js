const jwt = require("jsonwebtoken");
const User = require("../models/User");

const key = process.env.SECRET;

module.exports.createToken = ({ _id, email }) =>
  jwt.sign({ id: _id, email }, key);

module.exports.authCheck = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(400).json({ message: "no token found" });

  const tokenArr = authorization.split(" ");
  let token;

  if (tokenArr.length === 2) {
    token = tokenArr[1];
  } else {
    return res.status(400).json({ message: "Your token is invalid" });
  }

  jwt.verify(token, key, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid auth" });
    }
    console.log(decodedToken);
    const { id } = decodedToken;
    const user = await User.findOne({ _id: id });

    if (!user) return res.status(401).json({ message: "No user found :(" });

    return next();
  });
};
