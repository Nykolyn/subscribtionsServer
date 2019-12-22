const jwt = require("jsonwebtoken");

const key = process.env.SECRET;
const adminPass = process.env.ADMIN_PASSWORD;

module.exports.createToken = password => jwt.sign({ password }, key);

module.exports.authCheck = (req, res, next) => {
  const { authorization } = req.headers;
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
    const { password } = decodedToken;

    if (password !== adminPass)
      return res.status(401).json({ message: "Wrong password" });

    if (password === adminPass) {
      return next();
    }
  });
};
