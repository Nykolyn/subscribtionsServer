const { SubscribersServices } = require("../services");

class SubscriberController {
  async getSubs(req, res, next) {
    try {
      const subs = await SubscribersServices.getSubs();
      return res.json({ message: "success getting subs", subs });
    } catch (err) {
      next(err);
    }
  }
  async addSub(req, res, next) {
    try {
      const sub = req.body;
      const addedSub = await SubscribersServices.addSub(sub);
      return res.json({ message: "success adding sub", addedSub });
    } catch (err) {
      next(err);
    }
  }
  async deleteSub(req, res, next) {
    try {
      const id = req.params.id;
      const deletedSub = SubscribersServices.deleteSub(id);
      return res.json({ message: "Success deleting sub", deletedSub });
    } catch (err) {
      next(err);
    }
  }
  async updateFav(req, res, next) {
    try {
      const id = req.params.id;
      const updatedSub = await SubscribersServices.updateFav(
        id,
        req.body.favorite
      );
      return res.json({ message: "Success updating sub", updatedSub });
    } catch (err) {
      next(err);
    }
  }

  async signUp(req, res, next) {
    try {
      const password = req.body;
      const response = await SubscribersServices.signUp(password);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new SubscriberController();
