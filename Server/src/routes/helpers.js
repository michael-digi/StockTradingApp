const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const axios = require('axios');


checkSession = (req, res) => {
  session = req.session
  return res.send(session)
}

info = (req, res) => {
  ticker = req.query.ticker
  console.log(req.query, "this is stock")
  axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=` + process.env.IEX_SECRET)
    .then(response => {
      console.log(response)
      return res.send( {symbol: response.data.symbol, 
                        companyName: response.data.companyName, 
                        open: response.data.open, 
                        close: response.data.close, 
                        latestPrice: response.data.latestPrice,
                        previousClose: response.data.previousClose,
                        change: response.data.change}
                     )
    })
    .catch(error => res.send("Ticker symbol not found"))
}

login = (req, res) => {
  const { email, password } = req.body
  if (email && password) {
    User.findOne({ email: email })
      .then((user, error) => {
        if (error || ! user) {
          return res.send("User not found")
        }
        bcrypt.compare(password, user.password)
          .then((result, error) => {
            if (result === true) {
              req.session.userId = user._id;
              req.session.firstName = user.firstName
              return res.send({userId:req.session.userId, firstName: req.session.firstName})
            }
            else {
              return res.send("Wrong")
            }
          })
      })
  }
  else {
    return res.status('401').send()
  }
}

logout = (req, res) => {
  let { userId, firstName, cookie } = req.session
  
  if (userId) {
    userId = null;
    firstName = null;
    cookie = null
    req.session.destroy(err => {
      if (err) {
        return(err)
      }
      res.clearCookie(process.env.SESSION_NAME);
    })
  }
  else {
    return res.send("No session")
   }
} 

registerUser = (req, res) => {
  console.log(req.body, "this is register")
  if (req.body.email &&
      req.body.firstName && 
      req.body.lastName &&
      req.body.password) {

      // confirm that user typed same password twice
      // if (req.body.password !== req.body.confirmPassword) {
      //   const err = new Error('Passwords do not match.');
      //   err.status = 400;
      //   return next(err);
      // }

      // create object with form input
    const userData = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    };
    
    User.findOne({ email: userData.email })
      .then((response) => {
        if (response) {
          return res.status('409').send()
        }
        else {
          User.create(userData)
            .then((user, error) => {
              req.session.userId = user._id;
              req.session.firstName = user.firstName
              res.send({userId: req.session.userId, firstName: req.session.firstName}) })
            .catch(error => console.log(error))
        }
      })
  }
     
  else {
      return res.status('400').send()
    }
}

module.exports = {registerUser, logout, login, checkSession, info}

