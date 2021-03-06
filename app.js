const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const { authCheck } = require('./helpers/jwt');
const {
  subscribersRoutes,
  authRoutes,
  userRoutes,
} = require('./routes/routes');
const setupDB = require('./helpers/setupDB');
setupDB();

const app = express();

app
  .use(cors())
  .use(morgan('dev'))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use('/auth', authRoutes)
  .use('/user', authCheck, userRoutes)
  .use('/subscribers', authCheck, subscribersRoutes)
  .use((err, req, res, next) => {
    console.log('error', err);
    res.status(500).json(err);
  });

app.listen(process.env.PORT || 8080, () => {
  console.log(`server is running on ${process.env.PORT} port`);
});
