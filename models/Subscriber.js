const mongoose = require("mongoose");

const Subscriber = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: true
  },
  favorite: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("subscribers", Subscriber);
