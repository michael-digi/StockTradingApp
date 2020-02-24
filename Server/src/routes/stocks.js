const express = require('express');
const helpers = require('./helpers');

const stocksRouter = express.Router();

stocksRouter.get('/info', helpers.info);

module.exports = stocksRouter