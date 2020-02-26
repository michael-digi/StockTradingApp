const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const axios = require('axios');


checkSession = (req, res) => {
  session = req.session
  return res.send(session)
}

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
  //const doc = await User.findOne({ _id: user[0]})
  //console.log(await User.stocks.exists({_id: user[0]}))
  //doc.cash -= cost
  //doc.cash.toFixed(2)
  //doc.stocks.set(stock.ticker, stock.shares)
  //await doc.save()
}

info = (req, res) => {
  ticker = req.query.ticker
  axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=` + process.env.IEX_SECRET)
    .then(response => {
      console.log(response.data)
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

findUser = (req, res) => {
  console.log(req.query.id, " this is queryid")
  User.findOne({ _id: req.query.id })
    .then(user => {
      if (user) {
      res.send(user)}
    })
}

findUserStocks = (req, res) => {
  console.log(req.query.id, " this is queryid")
  User.findOne({ _id: req.query.id })
    .then(user => {
      if (user) {
      res.send(user.stocks)}
    }).catch(error=> console.log("user doesnt have stocks"))
}

login = (req, res) => {
  const { email, password } = req.body
  console.log(email, password, " email and password")
  if (email && password) {
    User.findOne({ email: email })
      .then((user, error) => {
        console.log(user, " the user")
        if (error || ! user) {
          return res.send("User not found")
        }
        bcrypt.compare(password, user.password)
        .then((result, error) => {
            console.log(result, " ", error, " result and error")
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
              console.log(req.session.cookie)
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

