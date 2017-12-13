var express = require('express');
var router = express.Router();

var db = require('../models');

/* GET users */
router.get('/', (req, res, next) => {
  db.user.findAll()
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

module.exports = router;
