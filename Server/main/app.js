require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const indexRouter = require('./routes')
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const connectStore = require('connect-mongo');

const MongoStore = connectStore(session);

app.disable('x-powered-by')

mongoose.connect(process.env.MONGO,
  { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))

const store = new MongoStore({
    mongooseConnection: db,
    collection: 'session'
  })

store.on("error", function(error) {
  console.log(error);
});

app.use(session({
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  store: store,
  cookie: {
    sameSite: true
  }
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())

app.use(function (req, res, next) {
  res.locals.currentUser = req.session.userId;
  console.log(res.locals.currentUser, " this is res.locals.currentUser")
  next();
});

app.use('/', indexRouter);


// catch 404 and forward to error handler


module.exports = app;

