// dotenv allows use of .env variables, where we hide API keys etc
require('dotenv').config();
const port = process.env.PORT || 5000;
const express = require('express');;
const app = express();
const path = require('path');
const cors = require('cors');

// organize routes for different api calls
const apiRouter = express.Router();
const { userRoutes, sessionRoutes, stockRoutes } = require('./routes/index'); 

// mongo/mongoose connections for our database
const mongoose = require('mongoose');
const session = require('express-session');
const connectStore = require('connect-mongo');
const MongoStore = connectStore(session);

// hides the kind of tech we're using
app.disable('x-powered-by')

//connect to mongo
mongoose.connect(MONGO = process.env.MONGO,
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

// activates sessions for persistent user login, which unfortunately did not work on Heroku
app.use(session({
  secret: process.env.SESSION_SECRET,
  name: process.env.SESSION_NAME,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    sameSite: true,
    //maxAge: parseInt(process.env.SESS_LIFETIME),
    secure: process.env.NODE_ENV === 'production'
  }
}))

app.listen(port, () => console.log(`app listening on port ${port}!`))

// allows express to receive JSON and urls
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use cors for same-site error problems
app.use(cors())

// the main api router
app.use('/api', apiRouter);

// IMPORTANT, this is what allows express the serve the static react components once
// deployed to Heroku
app.use(express.static(path.join(__dirname, '../../Client/build')));
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../../Client/build/')})
});

// the routes
apiRouter.use('/user', userRoutes);
apiRouter.use('/session', sessionRoutes)
apiRouter.use('/stocks', stockRoutes)


module.exports = app;

