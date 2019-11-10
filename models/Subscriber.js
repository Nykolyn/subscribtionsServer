const mongoose = require("mongoose");

const Subscriber = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  favorite: {
    type: String,
    default: false
  }
});

module.exports = mongoose.model("subscribers", Subscriber);
