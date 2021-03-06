const mongoose = require('mongoose');

const Subscriber = mongoose.Schema({
  ownerId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: true,
  },
  visitedAt: {
    type: String,
    required: false,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('subscribers', Subscriber);
