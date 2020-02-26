const express = require('express');
const helpers = require('./helpers');

const stocksRouter = express.Router();

stocksRouter.get('/info', helpers.info);
stocksRouter.get('/batchinfo', helpers.batchInfo);

module.exports = stocksRouter