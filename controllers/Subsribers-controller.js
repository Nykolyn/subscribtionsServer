const { SubscribersServices } = require('../services');

class SubscriberController {
  async getSubs(req, res, next) {
    try {
      const ownerId = req.params.id;
      const subs = await SubscribersServices.getSubs(ownerId);
      return res.json({ message: 'success getting subs', subs });
    } catch (err) {
      next(err);
    }
  }
  async addSub(req, res, next) {
    try {
      const sub = req.body;
      const addedSub = await SubscribersServices.addSub(sub);

      if (!addedSub.newSub) return res.status(400).json(addedSub);

      return res.json(addedSub);
    } catch (err) {
      next(err);
    }
  }
  async deleteSub(req, res, next) {
    try {
      const id = req.params.id;
      const deletedSub = SubscribersServices.deleteSub(id);
      return res.json({ message: 'Success deleting sub', deletedSub });
    } catch (err) {
      next(err);
    }
  }
  async updateSub(req, res, next) {
    try {
      const id = req.params.id;
      const updatedSub = await SubscribersServices.updateSub(id, req.body);
      return res.json({ message: 'Success updating sub', updatedSub });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new SubscriberController();
