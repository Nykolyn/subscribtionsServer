const { AuthServices } = require("../services");

class AuthController {
  async login(req, res, next) {
    try {
      const response = await AuthServices.login(req.body);
      if (!response.user)
        return res.status(400).json({ message: "Invalid password or email" });
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async register(req, res, next) {
    try {
      const userData = req.body;
      const newUser = await AuthServices.register(userData);
      if (!newUser.token) {
        res.status(400).json(newUser);
        return;
      }

      return res.json(newUser);
    } catch (err) {
      next(err);
    }
  }

  async getUser(req, res, next) {
    try {
      const id = req.params.id;
      const user = await AuthServices.getUser(id);

      return res.json(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
