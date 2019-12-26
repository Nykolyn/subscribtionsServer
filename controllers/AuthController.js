const { AuthServices } = require("../services");

class AuthController {
  async login(req, res, next) {
    try {
      const password = req.body;
      const response = await AuthServices.login(password);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async register(req, res, next) {
    try {
      const userData = req.body;
      const newUser = await AuthServices.register(userData);
      res.json(newUser);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
