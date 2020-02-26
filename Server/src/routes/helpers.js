const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const axios = require('axios');


// check to see if there is a user session on express, for log in
checkSession = (req, res) => {
  session = req.session
  return res.send(session)
}

// updates the user's portfolio info in the database, adding transactions, owned stocks
// deducting cash amount from purchase
updatePortfolio = async (req, res) => {
  const { user, transaction, stock, cost } = req.body.entry

  User.findOne({ _id: user[0] })
    .then((res) => {
      res.cash -= cost
      res.transactions.push(transaction)
      stockExists = res.stocks.get(stock.ticker)
      if (stockExists) {
        res.stocks.set(stock.ticker, parseInt(stockExists) + parseInt(stock.shares))
      }
      else {
        res.stocks.set(stock.ticker, stock.shares)
      }
      res.save()
    })
}

// get request for particular ticker, accessed from the BuyStocks/BuyModal component to display
// info to user and prepare to save to database
info = (req, res) => {
  ticker = req.query.ticker
  axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=` + process.env.IEX_SECRET)
    .then(response => {
      return res.send( {ticker: response.data.symbol, 
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

// this is for loading current, up to date information about the user's stocks all at once to display
// in the DataTable component
batchInfo = (req, res) => {
  tickers = req.query.tickers
  axios.get(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=
    ${tickers}&types=quote&filter=symbol,companyName,open,close,latestPrice,previousClose
    &range=1m&last=5&token=` + process.env.IEX_SECRET)
    .then(response => {
      let quotes = []
      for (let i = 0; i < Object.entries(response.data).length; i++){
        quotes.push(Object.entries(response.data)[i][1].quote)
      }
      return res.send(quotes)
    })
}

// used in several places to find information about a user in the database
findUser = (req, res) => {
  User.findOne({ _id: req.query.id })
    .then(user => {
      if (user) {
      user.password = ''
      res.send(user)}
    }).catch(error => res.send("Error"))
}

// pulls the stock information about the user (types and number of shares)
findUserStocks = (req, res) => {
  User.findOne({ _id: req.query.id })
    .then(user => {
      if (user) {
      res.send(user.stocks)}
    }).catch(error=> console.log("user doesnt have stocks"))
}

// the login function that verifies that a user exists and then utilizes bcrypt to check
// submitted password with hashed password
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

// destroys user session on the express-server side and logs them out
logout = (req, res) => {
  let { userId, firstName, cookie } = req.session
  if (userId, firstName, cookie) {
    req.session.destroy(err => {
      if (err) {
        return(err)
      }
      res.clearCookie(process.env.SESSION_NAME, {path: '/'}).status(200).send('ok');
    })
  }
  else {
    return res.send("No session")
   }
} 

// registers user, first confirming they have filled out all fields, then checks to see 
// if there already is a user with this email. If there is, send a Conflict error, but if
// not, successfully input user to the database initialized with $5000
registerUser = (req, res) => {
  if (req.body.email &&
      req.body.firstName && 
      req.body.lastName &&
      req.body.password) {

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

module.exports = {registerUser, 
                  logout, 
                  login, 
                  checkSession, 
                  info, 
                  findUser,
                  updatePortfolio,
                  findUserStocks,
                  batchInfo}

