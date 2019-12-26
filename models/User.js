const mongoose = require("mongoose");

const User = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 4,
    max: 20
  },
  role: {
    type: String,
    default: "user"
  },
  subscribtions: {
    type: Array,
    default: []
  }
});

User.methods.getCleanUser = function() {
  const { password, ...user } = this._doc;
  return user;
};

module.exports = mongoose.model("user", User);
