const mongoose = require("mongoose");

const dbName = process.env.DB_NAME || "name";
const dbUser = process.env.DB_USER || "user";
const dbPass = process.env.DB_PASS || "password";
const host = process.env.DB_HOST || "localhost";

module.exports = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPass}@${host}/${dbName}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log(`connected to db ${dbName}`);
  } catch (err) {
    throw new Error(`Error while starting DB ${err}`);
  }
};
