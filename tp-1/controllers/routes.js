const express           = require('express');
const moduleUser        = require('./users');

let router = express.Router();

moduleUser(router);

module.exports = router;