const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const { authCheck } = require("./helpers/jwt");
const { subscribersRoutes } = require("./routes/routes");
const setupDB = require("./helpers/setupDB");
setupDB();

const app = express();

app
  .use(morgan("dev"))
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use("/subscribers", authCheck, subscribersRoutes)
  .use((err, req, res, next) => res.status(500).json(err));

app.listen(process.env.PORT || 8080, () =>
  console.log(`server is running on ${process.env.PORT} port`)
);
