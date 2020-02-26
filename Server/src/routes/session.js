const express = require('express');
const User = require('../models/user');
const helpers = require('./helpers');

// routes to handle sessions
const sessionRouter = express.Router();

sessionRouter.get('/check', helpers.checkSession);
sessionRouter.get('/logout', helpers.logout);
sessionRouter.post('/login', helpers.login);


module.exports = sessionRouter