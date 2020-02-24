const express = require('express');
const User = require('../models/user');
const helpers = require('./helpers');


const sessionRouter = express.Router();

sessionRouter.get('/check', helpers.checkSession);
sessionRouter.get('/logout', helpers.logout);
sessionRouter.post('/login', helpers.login);


module.exports = sessionRouter