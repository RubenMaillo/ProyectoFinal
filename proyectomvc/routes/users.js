var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/yaboi', function(req, res, next) {
  res.send('respond with yaboi');
});

module.exports = router;
