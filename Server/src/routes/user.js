const express = require('express');
const userRouter = express.Router();
const helpers = require('./helpers')

userRouter.post('/register', helpers.registerUser);
userRouter.get('/findUser', helpers.findUser);
userRouter.post('/updateportfolio', helpers.updatePortfolio);
userRouter.get('/userStocks', helpers.findUserStocks);

module.exports = userRouter