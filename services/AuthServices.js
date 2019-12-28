const { User } = require("../models");
const { createToken } = require("../helpers/jwt");

class AuthServices {
  async login({ email, password }) {
    try {
      const user = await User.findOne({ email, password });
      let token;
      if (user) {
        token = createToken(user);
      }
      return { user: user.getCleanUser(), token };
    } catch (e) {
      console.log(`error while signing up admin, ${e}`);
    }
  }

  async register({ email, password, role }) {
    try {
      if (await User.findOne({ email })) {
        return { message: "User already exist" };
      }

      if (role === "admin") {
        return { message: "no-no-no" };
      }

      const user = new User({
        email,
        password,
        role
      });

      await user.save();

      const newUser = await User.findOne({ email });
      const token = createToken(newUser);
      return { user: newUser.getCleanUser(), token };
    } catch (err) {
      throw err;
    }
  }

  async getUser(id) {
    try {
      const user = await User.findOne({ _id: id });
      let token;
      if (user) {
        token = createToken(user);
      }
      return { user: user.getCleanUser(), token };
    } catch (e) {
      console.log(`error while signing up admin, ${e}`);
    }
  }
}

module.exports = new AuthServices();
