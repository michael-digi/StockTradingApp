const express = require('express');
const userRouter = express.Router();
const helpers = require('./helpers')


userRouter.post('/register', helpers.registerUser)

module.exports = userRouter