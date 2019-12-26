const { User } = require("../models");
const { createToken } = require("../helpers/jwt");

class AuthServices {
  async login({ password }) {
    try {
      if (password !== process.env.ADMIN_PASSWORD)
        return { message: "wrong password" };

      const token = createToken(password);
      return { message: "Success", token };
    } catch (e) {
      console.log(`error while signing up admin, ${e}`);
    }
  }

  async register({ email, password, role }) {
    try {
      if (await User.findOne({ email })) {
        return { message: "User already exists." };
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
}

module.exports = new AuthServices();
