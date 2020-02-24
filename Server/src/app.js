require('dotenv').config();
const express = require('express');;
const app = express();
const path = require('path');
const cors = require('cors');
const { userRoutes, sessionRoutes, stockRoutes } = require('./routes/index'); 

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
    collection: 'session',
    //ttl: parseInt(process.env.SESS_LIFETIME) / 1000
  })

store.on("error", function(error) {
  console.log(error);
});

app.use(session({
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    sameSite: true,
    //maxAge: parseInt(process.env.SESS_LIFETIME),
    secure: process.env.NODE_ENV === 'production'
  }
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../Client/build')));
  app.get('/', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, '../../Client/build/')})
  });
}

const apiRouter = express.Router();
app.use('/api', apiRouter);
apiRouter.use('/user', userRoutes);
apiRouter.use('/session', sessionRoutes)
apiRouter.use('/stocks', stockRoutes)

// catch 404 and forward to error handler


module.exports = app;

