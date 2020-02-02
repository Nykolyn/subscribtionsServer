const { Subscriber } = require("../models");

class SubscribersServices {
  async getSubs(ownerId) {
    try {
      return await Subscriber.find({ ownerId });
    } catch (e) {
      console.log(`error while getting subs, ${e}`);
    }
  }

  async addSub(sub) {
    try {
      const allSubs = await Subscriber.find({ ownerId: sub.ownerId });
      const existingSub = allSubs.find(
        oldSub => oldSub.name === sub.name || oldSub.userID === sub.userID
      );
      if (existingSub) return { message: "Sub already exists" };
      let newSub = await new Subscriber(sub);
      newSub = await newSub.save();
      return {message: "success", newSub};
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
