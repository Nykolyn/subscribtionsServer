const { SubscribersServices } = require("../services");
const subsArr = require("../subs");
const neededSubs = subsArr.map(({ favorite, date, name, userID }) => ({
  favorite,
  date,
  name,
  userID
}));

class SubscriberController {
  async getSubs(req, res, next) {
    try {
      const { ownerId } = req.body;
      const subs = await SubscribersServices.getSubs(ownerId);
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
}

module.exports = new SubscriberController();
