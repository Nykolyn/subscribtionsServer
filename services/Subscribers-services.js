const { Subscriber } = require("../models");

class SubscribersServices {
  async getSubs() {
    try {
      return await Subscriber.find({});
    } catch (e) {
      console.log(`error while getting subs, ${e}`);
    }
  }

  async addSub(sub) {
    try {
      let newSub = await new Subscriber(sub);
      newSub = await newSub.save();
      return newSub;
    } catch (e) {
      console.log(`error while adding sub, ${e}`);
    }
  }

  async deleteSub(id) {
    try {
      const subTodelete = Subscriber.findById({ _id: id });
      await Subscriber.findOneAndRemove({ _id: id });

      return subTodelete;
    } catch (e) {
      console.log(`error while deleting sub, ${e}`);
    }
  }

  async updateFav(id, favorite) {
    try {
      const updatedSub = await await Subscriber.findOneAndUpdate(
        { _id: id },
        { favorite },
        { new: true }
      );
      return updatedSub;
    } catch (e) {
      console.log(`error while updating sub, ${e}`);
    }
  }
}

module.exports = new SubscribersServices();
